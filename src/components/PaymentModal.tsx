import { useState, useEffect } from 'react';
import { X, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledAmount?: number | null;
  selectedPlan?: string | null;
}

export default function PaymentModal({
  isOpen,
  onClose,
  prefilledAmount,
  selectedPlan
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'maya' | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    referenceNumber: '',
    amount: '',
    paymentMethod: '',
    emergencyContactPerson: '',
    emergencyContactNumber: '',
    emergencyAddress: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Auto-fill amount
  useEffect(() => {
    if (prefilledAmount) {
      setFormData(prev => ({
        ...prev,
        amount: prefilledAmount.toString()
      }));
    }
  }, [prefilledAmount, isOpen]);

  const paymentDetails = {
    gcash: {
      number: '09171234567',
      name: 'GRIT GYM',
      qrImage: 'https://via.placeholder.com/300x300?text=GCash+QR+Code'
    },
    maya: {
      number: '09171234567',
      name: 'GRIT GYM',
      qrImage: 'https://via.placeholder.com/300x300?text=Maya+QR+Code'
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return setError('Full name is required'), false;
    if (!formData.contactNumber.trim()) return setError('Contact number is required'), false;
    if (!formData.email.trim()) return setError('Email is required'), false;
    if (!formData.email.includes('@')) return setError('Valid email is required'), false;
    if (!formData.referenceNumber.trim()) return setError('Reference number is required'), false;
    if (!formData.amount || parseFloat(formData.amount) <= 0)
      return setError('Valid amount is required'), false;
    if (!paymentMethod) return setError('Payment method is required'), false;

    // Emergency contact validation
    if (!formData.emergencyContactPerson.trim())
      return setError('Emergency contact person is required'), false;
    if (!formData.emergencyContactNumber.trim())
      return setError('Emergency contact number is required'), false;
    if (!formData.emergencyAddress.trim())
      return setError('Emergency address is required'), false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) return;

    setLoading(true);

    try {
      await addDoc(collection(db, 'payments'), {
        fullName: formData.fullName,
        contactNumber: formData.contactNumber,
        email: formData.email,
        referenceNumber: formData.referenceNumber,
        amount: parseFloat(formData.amount),
        paymentMethod,
        plan: selectedPlan || 'Custom',
        status: 'pending',
        createdAt: serverTimestamp(),
        emergencyContact: {
          person: formData.emergencyContactPerson,
          contactNumber: formData.emergencyContactNumber,
          address: formData.emergencyAddress
        }
      });

      setSuccess(true);
      setFormData({
        fullName: '',
        contactNumber: '',
        email: '',
        referenceNumber: '',
        amount: '',
        paymentMethod: '',
        emergencyContactPerson: '',
        emergencyContactNumber: '',
        emergencyAddress: ''
      });
      setPaymentMethod(null);

      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to process payment. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-red-600/30">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-red-600/30">
          <div>
            <h2 className="text-2xl font-bold text-white">Join GRIT Membership</h2>
            {selectedPlan && (
              <p className="text-red-600 text-sm mt-1">
                Plan: <span className="font-semibold">{selectedPlan}</span>
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Payment Submitted!</h3>
              <p className="text-gray-400 mb-4">
                Your payment has been recorded. We'll verify and activate your membership shortly.
              </p>
              <div className="bg-gray-800 p-4 rounded mb-4 inline-block">
                <p className="text-red-600 font-semibold">
                  Reference: {formData.referenceNumber}
                </p>
                <p className="text-gray-300">
                  Amount: ₱{parseFloat(formData.amount).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Payment Methods */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Select Payment Method</h3>
                <div className="space-y-4">
                  {(['gcash', 'maya'] as const).map(method => (
                    <button
                      key={method}
                      onClick={() => {
                        setPaymentMethod(method);
                        setError('');
                      }}
                      className={`w-full p-4 rounded-lg border-2 transition text-left ${
                        paymentMethod === method
                          ? 'border-red-600 bg-red-600/10'
                          : 'border-gray-700 bg-gray-800 hover:border-red-600/50'
                      }`}
                    >
                      <div className="font-bold text-white mb-1">
                        {method.toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-400">
                        {method === 'gcash'
                          ? 'Fast and convenient mobile payment'
                          : 'Digital wallet payment solution'}
                      </div>
                    </button>
                  ))}
                </div>

                {paymentMethod && (
                  <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-red-600/30">
                    <h4 className="font-bold text-white mb-4">Payment Details</h4>
                    <img
                      src={paymentDetails[paymentMethod].qrImage}
                      alt={`${paymentMethod} QR Code`}
                      className="w-full mb-4 rounded"
                    />
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-400">
                        <span className="text-white font-semibold">Account Name:</span>{' '}
                        {paymentDetails[paymentMethod].name}
                      </p>
                      <p className="text-gray-400">
                        <span className="text-white font-semibold">Number:</span>{' '}
                        {paymentDetails[paymentMethod].number}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Form */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Your Information</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Personal Info */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white rounded px-4 py-3 border border-gray-700 focus:outline-none focus:border-red-600 transition"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Contact Number *</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white rounded px-4 py-3 border border-gray-700 focus:outline-none focus:border-red-600 transition"
                      placeholder="09171234567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white rounded px-4 py-3 border border-gray-700 focus:outline-none focus:border-red-600 transition"
                      placeholder="john@example.com"
                    />
                  </div>

                  

                  {/* Emergency Contact */}
                  <div className="mt-6 border-t border-gray-700 pt-4">
                    <h4 className="text-white font-semibold mb-2">Emergency Contact</h4>

                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Contact Person *</label>
                      <input
                        type="text"
                        name="emergencyContactPerson"
                        value={formData.emergencyContactPerson}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 text-white rounded px-4 py-3 border border-gray-700 focus:outline-none focus:border-red-600 transition"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-1 mt-2">Contact Number *</label>
                      <input
                        type="text"
                        name="emergencyContactNumber"
                        value={formData.emergencyContactNumber}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 text-white rounded px-4 py-3 border border-gray-700 focus:outline-none focus:border-red-600 transition"
                        placeholder="09181234567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-1 mt-2">Address *</label>
                      <textarea
                        name="emergencyAddress"
                        value={formData.emergencyAddress}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full bg-gray-800 text-white rounded px-4 py-3 border border-gray-700 focus:outline-none focus:border-red-600 transition resize-none"
                        placeholder="123 P. Del Rosario St, Cebu City"
                      />
                    </div>
                  </div>
<div>
                    <label className="block text-sm font-semibold text-white mb-2">Reference Number *</label>
                    <input
                      type="text"
                      name="referenceNumber"
                      value={formData.referenceNumber}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white rounded px-4 py-3 border border-gray-700 focus:outline-none focus:border-red-600 transition"
                      placeholder="Provided by GCash/Maya"
                    />
                  </div>
                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Amount (₱) *</label>
                    <div className="bg-gray-800 px-4 py-3 rounded border border-gray-700 text-white font-semibold">
                      ₱{formData.amount ? parseFloat(formData.amount).toLocaleString() : '0'}
                      {selectedPlan && (
                        <span className="text-red-600 text-sm ml-2">({selectedPlan})</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Amount is automatically set based on your selected plan
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-center gap-2 bg-red-600/10 border border-red-600/50 p-3 rounded text-red-400 text-sm">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || !paymentMethod}
                    className={`w-full py-3 rounded font-bold transition flex items-center justify-center gap-2 ${
                      loading || !paymentMethod
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Submit Payment
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center mt-4">
                    Your payment information will be securely stored and verified by our team.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
