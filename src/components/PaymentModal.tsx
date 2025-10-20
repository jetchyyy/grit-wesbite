import { useState, useEffect, memo } from 'react';
import { X, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledAmount?: number | null;
  selectedPlan?: string | null;
}

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  savings?: string;
  features: string[];
}

const PaymentModal = memo(function PaymentModal({
  isOpen,
  onClose,
  prefilledAmount,
  selectedPlan
}: PaymentModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'maya' | null>(null);
  const [selectedMembershipPlan, setSelectedMembershipPlan] = useState<MembershipPlan | null>(null);
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

  const membershipPlans: MembershipPlan[] = [
    {
      id: 'walk-in',
      name: 'Walk-in',
      price: 200,
      period: '/day',
      features: ['Daily gym access', 'All equipment', 'Locker & shower']
    },
    {
      id: '1-month',
      name: '1 Month',
      price: 1800,
      period: '/month',
      features: ['Full gym access', 'Unlimited classes', 'Progress tracking']
    },
    {
      id: '3-months',
      name: '3 Months',
      price: 4500,
      period: '/3 months',
      savings: 'Save ₱900',
      features: ['Everything in 1 Month', 'Priority booking', 'Nutrition consultation']
    },
    {
      id: '6-months',
      name: '6 Months',
      price: 7800,
      period: '/6 months',
      savings: 'Save ₱3,000',
      features: ['Everything in 3 Months', '1 PT session', 'Custom workout plans']
    },
    {
      id: '12-months',
      name: '12 Months',
      price: 14000,
      period: '/year',
      savings: 'Save ₱7,600',
      features: ['Everything included', 'Monthly PT', 'VIP benefits', 'Guest passes']
    }
  ];

  // Auto-fill amount and plan
  useEffect(() => {
    if (prefilledAmount && selectedPlan) {
      const plan = membershipPlans.find(p => p.name === selectedPlan);
      if (plan) {
        setSelectedMembershipPlan(plan);
        setFormData(prev => ({
          ...prev,
          amount: plan.price.toString()
        }));
        setCurrentStep(2);
      }
    }
  }, [prefilledAmount, selectedPlan, isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setPaymentMethod(null);
      setSelectedMembershipPlan(null);
      setError('');
      setSuccess(false);
    }
  }, [isOpen]);

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
    <div className="fixed inset-0 bg-[#0A0A1F]/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#1A1A2F] to-[#0A0A1F] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#BF9B30]/40 shadow-2xl shadow-[#BF9B30]/20">
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-[#BF9B30]/30 bg-[#0A0A1F]/50 backdrop-blur-sm">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">Join GRIT Membership</h2>
            <p className="text-[#D8C08E]">Transform your fitness journey with us</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#BF9B30]/20 border border-[#BF9B30] hover:bg-[#BF9B30] text-[#BF9B30] hover:text-[#0A0A1F] transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-8 py-6 bg-[#0A0A1F]/30">
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: 'Choose Plan' },
              { num: 2, label: 'Payment Method' },
              { num: 3, label: 'Your Info' },
              { num: 4, label: 'Confirm' }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      currentStep >= step.num
                        ? 'bg-[#BF9B30] text-[#0A0A1F] shadow-lg shadow-[#BF9B30]/50'
                        : 'bg-[#0A0A1F] text-[#D8C08E] border-2 border-[#BF9B30]/30'
                    }`}
                  >
                    {step.num}
                  </div>
                  <span
                    className={`text-xs mt-2 font-semibold ${
                      currentStep >= step.num ? 'text-[#BF9B30]' : 'text-[#D8C08E]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 mb-6 rounded transition-all duration-300 ${
                      currentStep > step.num ? 'bg-[#BF9B30]' : 'bg-[#BF9B30]/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          {success ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-[#BF9B30]/20 border-4 border-[#BF9B30] flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-[#BF9B30]" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Payment Submitted!</h3>
              <p className="text-[#D8C08E] text-lg mb-8 max-w-md mx-auto">
                Your payment has been recorded. We'll verify and activate your membership shortly.
              </p>
              <div className="bg-[#0A0A1F]/80 backdrop-blur-sm p-6 rounded-2xl mb-6 inline-block border-2 border-[#BF9B30]/40">
                <p className="text-[#BF9B30] font-bold text-lg mb-2">
                  Reference: {formData.referenceNumber}
                </p>
                <p className="text-white text-2xl font-black">
                  ₱{parseFloat(formData.amount).toLocaleString()}
                </p>
                {selectedMembershipPlan && (
                  <p className="text-[#D8C08E] text-sm mt-2">{selectedMembershipPlan.name}</p>
                )}
              </div>
              <p className="text-[#D8C08E] text-sm">
                Check your email for confirmation details
              </p>
            </div>
          ) : currentStep === 1 ? (
            // Step 1: Choose Membership Plan
            <div>
              <h3 className="text-2xl font-black text-white mb-6">Select Your Membership Plan</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {membershipPlans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => {
                      setSelectedMembershipPlan(plan);
                      setFormData(prev => ({ ...prev, amount: plan.price.toString() }));
                      setError('');
                    }}
                    className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                      selectedMembershipPlan?.id === plan.id
                        ? 'bg-[#BF9B30]/20 border-[#BF9B30] shadow-lg shadow-[#BF9B30]/30'
                        : 'bg-[#0A0A1F]/60 border-[#BF9B30]/30 hover:border-[#BF9B30]/60'
                    }`}
                  >
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-black text-white mb-2">{plan.name}</h4>
                      {plan.savings && (
                        <div className="text-green-400 text-xs font-bold mb-2">{plan.savings}</div>
                      )}
                      <div className="text-3xl font-black text-[#BF9B30]">
                        ₱{plan.price.toLocaleString()}
                      </div>
                      <div className="text-[#D8C08E] text-sm">{plan.period}</div>
                    </div>
                    <ul className="space-y-2 text-sm text-[#D8C08E]">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#BF9B30] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 p-4 rounded-xl text-red-400 mb-4">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    if (!selectedMembershipPlan) {
                      setError('Please select a membership plan');
                      return;
                    }
                    setCurrentStep(2);
                    setError('');
                  }}
                  disabled={!selectedMembershipPlan}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    selectedMembershipPlan
                      ? 'bg-[#BF9B30] text-[#0A0A1F] hover:bg-[#D8C08E] shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl'
                      : 'bg-[#3A3A4F] text-[#D8C08E]/50 cursor-not-allowed'
                  }`}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          ) : currentStep === 2 ? (
            // Step 2: Payment Method
            <div>
              <h3 className="text-2xl font-black text-white mb-2">Select Payment Method</h3>
              <p className="text-[#D8C08E] mb-6">Choose how you'd like to pay for your membership</p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {(['gcash', 'maya'] as const).map(method => (
                  <button
                    key={method}
                    onClick={() => {
                      setPaymentMethod(method);
                      setError('');
                    }}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      paymentMethod === method
                        ? 'border-[#BF9B30] bg-[#BF9B30]/20 shadow-lg shadow-[#BF9B30]/30'
                        : 'border-[#BF9B30]/30 bg-[#0A0A1F]/60 hover:border-[#BF9B30]/60'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#BF9B30] flex items-center justify-center">
                        <span className="text-3xl font-black text-[#0A0A1F]">
                          {method === 'gcash' ? 'G' : 'M'}
                        </span>
                      </div>
                      <div className="text-2xl font-black text-white mb-2">
                        {method.toUpperCase()}
                      </div>
                      <div className="text-sm text-[#D8C08E]">
                        {method === 'gcash'
                          ? 'Fast and convenient mobile payment'
                          : 'Digital wallet payment solution'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {paymentMethod && (
                <div className="bg-[#0A0A1F]/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-[#BF9B30]/40 mb-8">
                  <h4 className="text-xl font-black text-white mb-6">Payment Details</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex justify-center items-center">
                      <img
                        src={paymentDetails[paymentMethod].qrImage}
                        alt={`${paymentMethod} QR Code`}
                        className="w-full max-w-xs rounded-xl border-2 border-[#BF9B30]/30"
                      />
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                      <div className="bg-[#0A0A1F] p-4 rounded-xl border border-[#BF9B30]/30">
                        <p className="text-[#D8C08E] text-sm mb-1">Account Name</p>
                        <p className="text-white font-bold text-lg">
                          {paymentDetails[paymentMethod].name}
                        </p>
                      </div>
                      <div className="bg-[#0A0A1F] p-4 rounded-xl border border-[#BF9B30]/30">
                        <p className="text-[#D8C08E] text-sm mb-1">Account Number</p>
                        <p className="text-white font-bold text-lg">
                          {paymentDetails[paymentMethod].number}
                        </p>
                      </div>
                      <div className="bg-[#0A0A1F] p-4 rounded-xl border border-[#BF9B30]/30">
                        <p className="text-[#D8C08E] text-sm mb-1">Amount to Pay</p>
                        <p className="text-[#BF9B30] font-black text-2xl">
                          ₱{selectedMembershipPlan?.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-yellow-100/10 border-l-4 border-[#BF9B30] p-4 rounded-xl mt-2">
                        <p className="text-[#BF9B30] text-sm font-semibold">
                          <span className="font-bold">Important:</span> Please take note of your reference number after payment. You will need to enter it in the next form to complete your registration.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 p-4 rounded-xl text-red-400 mb-4">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-[#BF9B30] text-[#BF9B30] hover:bg-[#BF9B30] hover:text-[#0A0A1F] transition-all duration-300"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (!paymentMethod) {
                      setError('Please select a payment method');
                      return;
                    }
                    setCurrentStep(3);
                    setError('');
                  }}
                  disabled={!paymentMethod}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    paymentMethod
                      ? 'bg-[#BF9B30] text-[#0A0A1F] hover:bg-[#D8C08E] shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl'
                      : 'bg-[#3A3A4F] text-[#D8C08E]/50 cursor-not-allowed'
                  }`}
                >
                  Continue to Form
                </button>
              </div>
            </div>
          ) : currentStep === 3 ? (
            // Step 3: Personal Info Form
            <div>
              <h3 className="text-2xl font-black text-white mb-2">Your Information</h3>
              <p className="text-[#D8C08E] mb-6">Please provide your personal details</p>

              <form className="space-y-6">
                {/* Personal Info Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-[#0A0A1F]/80 backdrop-blur-sm text-white rounded-xl px-6 py-4 border-2 border-[#BF9B30]/30 focus:outline-none focus:border-[#BF9B30] transition-all placeholder-[#D8C08E]/50"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-2">Contact Number *</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full bg-[#0A0A1F]/80 backdrop-blur-sm text-white rounded-xl px-6 py-4 border-2 border-[#BF9B30]/30 focus:outline-none focus:border-[#BF9B30] transition-all placeholder-[#D8C08E]/50"
                      placeholder="09171234567"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-white mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#0A0A1F]/80 backdrop-blur-sm text-white rounded-xl px-6 py-4 border-2 border-[#BF9B30]/30 focus:outline-none focus:border-[#BF9B30] transition-all placeholder-[#D8C08E]/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Emergency Contact Section */}
                <div className="bg-[#0A0A1F]/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-[#BF9B30]/20">
                  <h4 className="text-lg font-black text-white mb-4">Emergency Contact</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-[#D8C08E] mb-2">Contact Person *</label>
                      <input
                        type="text"
                        name="emergencyContactPerson"
                        value={formData.emergencyContactPerson}
                        onChange={handleInputChange}
                        className="w-full bg-[#0A0A1F]/80 backdrop-blur-sm text-white rounded-xl px-6 py-4 border-2 border-[#BF9B30]/30 focus:outline-none focus:border-[#BF9B30] transition-all placeholder-[#D8C08E]/50"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#D8C08E] mb-2">Contact Number *</label>
                      <input
                        type="text"
                        name="emergencyContactNumber"
                        value={formData.emergencyContactNumber}
                        onChange={handleInputChange}
                        className="w-full bg-[#0A0A1F]/80 backdrop-blur-sm text-white rounded-xl px-6 py-4 border-2 border-[#BF9B30]/30 focus:outline-none focus:border-[#BF9B30] transition-all placeholder-[#D8C08E]/50"
                        placeholder="09181234567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#D8C08E] mb-2">Address *</label>
                      <textarea
                        name="emergencyAddress"
                        value={formData.emergencyAddress}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full bg-[#0A0A1F]/80 backdrop-blur-sm text-white rounded-xl px-6 py-4 border-2 border-[#BF9B30]/30 focus:outline-none focus:border-[#BF9B30] transition-all resize-none placeholder-[#D8C08E]/50"
                        placeholder="123 P. Del Rosario St, Cebu City"
                      />
                    </div>
                  </div>
                </div>

                {/* Reference Number */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Reference Number *</label>
                  <input
                    type="text"
                    name="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A0A1F]/80 backdrop-blur-sm text-white rounded-xl px-6 py-4 border-2 border-[#BF9B30]/30 focus:outline-none focus:border-[#BF9B30] transition-all placeholder-[#D8C08E]/50"
                    placeholder="Provided by GCash/Maya after payment"
                  />
                  <p className="text-xs text-[#D8C08E] mt-2">
                    Enter the reference number from your {paymentMethod?.toUpperCase()} transaction
                  </p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 p-4 rounded-xl text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-[#BF9B30] text-[#BF9B30] hover:bg-[#BF9B30] hover:text-[#0A0A1F] transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!validateForm()) return;
                      setCurrentStep(4);
                    }}
                    className="px-8 py-4 rounded-xl font-bold text-lg bg-[#BF9B30] text-[#0A0A1F] hover:bg-[#D8C08E] shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl transition-all duration-300"
                  >
                    Review & Submit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Step 4: Review & Confirm
            <div>
              <h3 className="text-2xl font-black text-white mb-2">Review Your Information</h3>
              <p className="text-[#D8C08E] mb-6">Please review your details before submitting</p>

              <div className="space-y-6 mb-8">
                {/* Plan Summary */}
                <div className="bg-[#0A0A1F]/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-[#BF9B30]/40">
                  <h4 className="text-lg font-black text-white mb-4">Membership Plan</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-black text-[#BF9B30]">{selectedMembershipPlan?.name}</p>
                      <p className="text-[#D8C08E]">{selectedMembershipPlan?.period}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-white">₱{selectedMembershipPlan?.price.toLocaleString()}</p>
                      {selectedMembershipPlan?.savings && (
                        <p className="text-green-400 text-sm font-bold">{selectedMembershipPlan.savings}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-[#0A0A1F]/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-[#BF9B30]/40">
                  <h4 className="text-lg font-black text-white mb-2">Payment Method</h4>
                  <p className="text-[#BF9B30] font-bold text-xl">{paymentMethod?.toUpperCase()}</p>
                  <p className="text-[#D8C08E] text-sm mt-1">Ref: {formData.referenceNumber}</p>
                </div>

                {/* Personal Info */}
                <div className="bg-[#0A0A1F]/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-[#BF9B30]/40">
                  <h4 className="text-lg font-black text-white mb-4">Personal Information</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#D8C08E]">Name</p>
                      <p className="text-white font-bold">{formData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-[#D8C08E]">Contact</p>
                      <p className="text-white font-bold">{formData.contactNumber}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-[#D8C08E]">Email</p>
                      <p className="text-white font-bold">{formData.email}</p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-[#0A0A1F]/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-[#BF9B30]/40">
                  <h4 className="text-lg font-black text-white mb-4">Emergency Contact</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-[#D8C08E]">Contact Person</p>
                      <p className="text-white font-bold">{formData.emergencyContactPerson}</p>
                    </div>
                    <div>
                      <p className="text-[#D8C08E]">Number</p>
                      <p className="text-white font-bold">{formData.emergencyContactNumber}</p>
                    </div>
                    <div>
                      <p className="text-[#D8C08E]">Address</p>
                      <p className="text-white font-bold">{formData.emergencyAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 p-4 rounded-xl text-red-400 mb-4">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={loading}
                  className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-[#BF9B30] text-[#BF9B30] hover:bg-[#BF9B30] hover:text-[#0A0A1F] transition-all duration-300 disabled:opacity-50"
                >
                  Back to Edit
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                    loading
                      ? 'bg-[#3A3A4F] text-[#D8C08E]/50 cursor-not-allowed'
                      : 'bg-[#BF9B30] text-[#0A0A1F] hover:bg-[#D8C08E] shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0A0A1F] border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Submit Payment
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-[#D8C08E] text-center mt-6">
                By submitting, you agree to our terms and conditions. Your payment will be verified within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default PaymentModal;
