import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { LogIn, Mail, Lock, AlertCircle, Shield } from 'lucide-react';

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW = 5 * 60 * 1000; // 5 minutes

interface LoginAttempt {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(MAX_ATTEMPTS);
  const navigate = useNavigate();

  // Check if account is locked on mount
  useEffect(() => {
    checkLockoutStatus();
    const interval = setInterval(checkLockoutStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStorageKey = () => {
    // Use IP-based key (in production, this would be server-side)
    return 'login_attempts';
  };

  const checkLockoutStatus = () => {
    const key = getStorageKey();
    const stored = localStorage.getItem(key);
    
    if (stored) {
      const attempts: LoginAttempt = JSON.parse(stored);
      const now = Date.now();

      if (attempts.lockedUntil && attempts.lockedUntil > now) {
        setIsLocked(true);
        setLockoutTime(Math.ceil((attempts.lockedUntil - now) / 1000));
        return;
      } else if (attempts.lockedUntil && attempts.lockedUntil <= now) {
        // Lockout expired, reset
        localStorage.removeItem(key);
        setIsLocked(false);
        setRemainingAttempts(MAX_ATTEMPTS);
      } else if (now - attempts.firstAttempt > ATTEMPT_WINDOW) {
        // Attempt window expired, reset
        localStorage.removeItem(key);
        setRemainingAttempts(MAX_ATTEMPTS);
      } else {
        setRemainingAttempts(MAX_ATTEMPTS - attempts.count);
      }
    } else {
      setIsLocked(false);
      setRemainingAttempts(MAX_ATTEMPTS);
    }
  };

  const recordFailedAttempt = () => {
    const key = getStorageKey();
    const stored = localStorage.getItem(key);
    const now = Date.now();

    let attempts: LoginAttempt;

    if (stored) {
      attempts = JSON.parse(stored);
      
      // Reset if outside window
      if (now - attempts.firstAttempt > ATTEMPT_WINDOW) {
        attempts = { count: 1, firstAttempt: now };
      } else {
        attempts.count += 1;
      }
    } else {
      attempts = { count: 1, firstAttempt: now };
    }

    // Lock account if max attempts reached
    if (attempts.count >= MAX_ATTEMPTS) {
      attempts.lockedUntil = now + LOCKOUT_DURATION;
      setIsLocked(true);
      setLockoutTime(Math.ceil(LOCKOUT_DURATION / 1000));
      setError(`Too many failed attempts. Account locked for ${Math.ceil(LOCKOUT_DURATION / 60000)} minutes.`);
    } else {
      setRemainingAttempts(MAX_ATTEMPTS - attempts.count);
    }

    localStorage.setItem(key, JSON.stringify(attempts));
  };

  const resetAttempts = () => {
    const key = getStorageKey();
    localStorage.removeItem(key);
    setRemainingAttempts(MAX_ATTEMPTS);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if account is locked
    if (isLocked) {
      setError(`Account temporarily locked. Try again in ${Math.floor(lockoutTime / 60)} minutes ${lockoutTime % 60} seconds.`);
      return;
    }

    // Basic input validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Password minimum length
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      resetAttempts(); // Clear failed attempts on success
      navigate('/admin');
    } catch (err: any) {
      recordFailedAttempt();
      
      // User-friendly error messages
      let errorMessage = 'Failed to sign in. Please check your credentials.';
      
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (err.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      setError(`${errorMessage} (${remainingAttempts - 1} attempts remaining)`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');

    // Check if account is locked
    if (isLocked) {
      setError(`Account temporarily locked. Try again in ${Math.floor(lockoutTime / 60)} minutes ${lockoutTime % 60} seconds.`);
      return;
    }

    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      resetAttempts(); // Clear failed attempts on success
      navigate('/admin');
    } catch (err: any) {
      // Don't count Google auth popup cancellation as failed attempt
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        recordFailedAttempt();
      }
      
      let errorMessage = 'Failed to sign in with Google.';
      
      if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked. Please allow popups for this site.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign in cancelled.';
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with this email using a different sign-in method.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A1F] via-[#1A1A2F] to-[#0A0A1F] flex items-center justify-center px-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#BF9B30]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#BF9B30]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#BF9B30]/20 border-2 border-[#BF9B30] mb-4">
            <LogIn className="w-10 h-10 text-[#BF9B30]" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            GRIT <span className="text-[#BF9B30]">Admin</span>
          </h1>
          <p className="text-[#D8C08E]">Content Management System</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#0A0A1F]/80 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-8 shadow-2xl">
          {/* Security Status */}
          {!isLocked && remainingAttempts < MAX_ATTEMPTS && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-400 text-sm">
                <strong>Security Alert:</strong> {remainingAttempts} login attempts remaining before temporary lockout.
              </p>
            </div>
          )}

          {/* Lockout Warning */}
          {isLocked && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-red-400 text-sm">
                <p className="font-bold mb-1">Account Temporarily Locked</p>
                <p>Too many failed login attempts. Please try again in:</p>
                <p className="text-lg font-mono mt-2">
                  {Math.floor(lockoutTime / 60)}:{(lockoutTime % 60).toString().padStart(2, '0')}
                </p>
              </div>
            </div>
          )}

          {/* Error Messages */}
          {error && !isLocked && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BF9B30]" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#D8C08E]/50 focus:outline-none focus:border-[#BF9B30] transition-colors"
                  placeholder="admin@gritfitness.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-white font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BF9B30]" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#D8C08E]/50 focus:outline-none focus:border-[#BF9B30] transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isLocked}
              className="w-full bg-[#BF9B30] text-[#0A0A1F] py-3 rounded-xl font-bold text-lg hover:bg-[#D8C08E] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#BF9B30]/30"
            >
              {loading ? 'Signing in...' : isLocked ? 'Account Locked' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#BF9B30]/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0A0A1F] text-[#D8C08E]">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading || isLocked}
            className="w-full bg-white text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[#D8C08E]/70 text-sm mt-6">
          © 2025 GRIT Fitness Gym. All rights reserved.
        </p>
      </div>
    </div>
  );
}
