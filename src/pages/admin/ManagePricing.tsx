import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Plus, Edit2, Trash2, X, Loader, Check, DollarSign } from 'lucide-react';

interface PricingPlan {
  id?: string;
  name: string;
  price: number;
  period: string;
  originalPrice: number;
  savings: string;
  features: string[];
  highlighted: boolean;
  badge: string;
  description: string;
  order: number;
}

export default function ManagePricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PricingPlan>({
    name: '',
    price: 0,
    period: '/month',
    originalPrice: 0,
    savings: '',
    features: [''],
    highlighted: false,
    badge: '',
    description: '',
    order: 0,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pricing'));
      const plansData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as PricingPlan[];
      // Sort by order
      plansData.sort((a, b) => a.order - b.order);
      setPlans(plansData);
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
      alert('Failed to load pricing plans');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter empty features
    const filteredFeatures = formData.features.filter(f => f.trim() !== '');
    
    if (filteredFeatures.length === 0) {
      alert('Please add at least one feature');
      return;
    }

    setLoading(true);
    try {
      const planData = {
        ...formData,
        features: filteredFeatures,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        order: Number(formData.order),
      };

      if (editingPlan?.id) {
        // Update existing plan
        await updateDoc(doc(db, 'pricing', editingPlan.id), planData);
        alert('Pricing plan updated successfully!');
      } else {
        // Add new plan
        await addDoc(collection(db, 'pricing'), planData);
        alert('Pricing plan added successfully!');
      }
      handleCloseModal();
      fetchPlans();
    } catch (error) {
      console.error('Error saving pricing plan:', error);
      alert('Failed to save pricing plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      originalPrice: plan.originalPrice || 0,
      savings: plan.savings || '',
      features: plan.features.length > 0 ? plan.features : [''],
      highlighted: plan.highlighted,
      badge: plan.badge || '',
      description: plan.description,
      order: plan.order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (plan: PricingPlan) => {
    if (!window.confirm(`Are you sure you want to delete the ${plan.name} plan?`)) {
      return;
    }

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'pricing', plan.id!));
      alert('Pricing plan deleted successfully!');
      fetchPlans();
    } catch (error) {
      console.error('Error deleting pricing plan:', error);
      alert('Failed to delete pricing plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
    setFormData({
      name: '',
      price: 0,
      period: '/month',
      originalPrice: 0,
      savings: '',
      features: [''],
      highlighted: false,
      badge: '',
      description: '',
      order: 0,
    });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures.length > 0 ? newFeatures : [''] });
  };

  if (loading && plans.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 text-[#BF9B30] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Manage Pricing</h1>
          <p className="text-[#D8C08E]">Create and manage membership pricing plans</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Pricing Plan
        </button>
      </div>

      {/* Pricing Plans Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl p-6 transition-all ${
              plan.highlighted
                ? 'bg-[#1A1A2F] border-2 border-[#BF9B30] shadow-lg'
                : 'bg-[#1A1A2F] border border-[#BF9B30]/30'
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="inline-block bg-[#BF9B30] text-[#0A0A1F] px-3 py-1 rounded-full text-xs font-bold mb-4">
                {plan.badge}
              </div>
            )}

            {/* Plan Name */}
            <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
            <p className="text-[#D8C08E] text-sm mb-4">
              {plan.description.replace(/<[^>]*>/g, '')}
            </p>

            {/* Pricing */}
            <div className="mb-4">
              {plan.originalPrice > 0 && (
                <div className="text-[#D8C08E] text-sm line-through">
                  ₱{plan.originalPrice.toLocaleString()}
                </div>
              )}
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-black text-[#BF9B30]">
                  ₱{plan.price.toLocaleString()}
                </span>
                <span className="text-[#D8C08E]">{plan.period}</span>
              </div>
              {plan.savings && (
                <div className="text-green-400 text-sm font-semibold">{plan.savings}</div>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-6">
              {plan.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#D8C08E] text-sm">
                  <Check className="w-4 h-4 text-[#BF9B30] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
              {plan.features.length > 3 && (
                <li className="text-[#BF9B30] text-sm font-semibold">
                  +{plan.features.length - 3} more features
                </li>
              )}
            </ul>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(plan)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#BF9B30]/20 text-[#BF9B30] px-4 py-2 rounded-lg font-semibold hover:bg-[#BF9B30]/30 transition-all"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(plan)}
                className="flex items-center justify-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-lg font-semibold hover:bg-red-600/30 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Order indicator */}
            <div className="mt-4 text-center text-[#D8C08E] text-xs">
              Display Order: {plan.order}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {plans.length === 0 && (
        <div className="text-center py-16">
          <DollarSign className="w-16 h-16 text-[#BF9B30] mx-auto mb-4" />
          <p className="text-[#D8C08E] text-lg mb-4">No pricing plans yet</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all"
          >
            Add Your First Plan
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0A0A1F] border border-[#BF9B30] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#BF9B30]/30 sticky top-0 bg-[#0A0A1F] z-10">
              <h2 className="text-2xl font-black text-white">
                {editingPlan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
              </h2>
              <button onClick={handleCloseModal} className="text-[#D8C08E] hover:text-[#BF9B30]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Plan Name & Order */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-white font-semibold mb-2">Plan Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                    placeholder="e.g., 1 Month, 3 Months"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-semibold mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  placeholder="Brief description of the plan"
                  required
                />
              </div>

              {/* Pricing */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Price (₱)</label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Period</label>
                  <select
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  >
                    <option value="/day">/day</option>
                    <option value="/week">/week</option>
                    <option value="/month">/month</option>
                    <option value="/3 months">/3 months</option>
                    <option value="/6 months">/6 months</option>
                    <option value="/year">/year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Original Price (₱)</label>
                  <input
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                    min="0"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Badge & Savings */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Badge (Optional)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                    placeholder="e.g., Most Popular, Best Value"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Savings Text (Optional)</label>
                  <input
                    type="text"
                    value={formData.savings}
                    onChange={(e) => setFormData({ ...formData, savings: e.target.value })}
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                    placeholder="e.g., Save ₱900"
                  />
                </div>
              </div>

              {/* Highlighted */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="highlighted"
                  checked={formData.highlighted}
                  onChange={(e) => setFormData({ ...formData, highlighted: e.target.checked })}
                  className="w-5 h-5 rounded accent-[#BF9B30]"
                />
                <label htmlFor="highlighted" className="text-white font-semibold cursor-pointer">
                  Highlight this plan (makes it stand out visually)
                </label>
              </div>

              {/* Features */}
              <div>
                <label className="block text-white font-semibold mb-2">Features</label>
                <div className="space-y-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                        placeholder={`Feature ${index + 1}`}
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="bg-red-600/20 text-red-400 px-4 py-3 rounded-xl hover:bg-red-600/30 transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center gap-2 text-[#BF9B30] hover:text-[#D8C08E] transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>{editingPlan ? 'Update Plan' : 'Add Plan'}</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 rounded-xl font-bold border border-[#BF9B30]/30 text-[#D8C08E] hover:border-[#BF9B30] transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
