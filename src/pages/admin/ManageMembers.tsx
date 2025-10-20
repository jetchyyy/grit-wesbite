import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Search, Filter, Calendar, DollarSign, User, Phone, X, Check, Clock, AlertCircle } from 'lucide-react';

interface EmergencyContact {
  person: string;
  contactNumber: string;
  address: string;
}

interface Payment {
  id: string;
  fullName: string;
  contactNumber: string;
  email: string;
  referenceNumber: string;
  amount: number;
  paymentMethod: string;
  plan: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Timestamp;
  emergencyContact: EmergencyContact;
}

export default function ManageMembers() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<Payment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const paymentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Payment));
      setPayments(paymentsData);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (paymentId: string, newStatus: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'payments', paymentId), {
        status: newStatus
      });
      await fetchPayments();
      setIsModalOpen(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Failed to update status');
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.contactNumber.includes(searchTerm) ||
      payment.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-400 bg-green-400/20';
      case 'rejected':
        return 'text-red-400 bg-red-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'N/A';
    return timestamp.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: payments.length,
    pending: payments.filter(p => p.status === 'pending').length,
    approved: payments.filter(p => p.status === 'approved').length,
    rejected: payments.filter(p => p.status === 'rejected').length,
    revenue: payments
      .filter(p => p.status === 'approved')
      .reduce((sum, p) => sum + p.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Member Management</h1>
        <p className="text-[#D8C08E]">Manage membership applications and payments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#D8C08E] text-sm">Total Applications</p>
            <User className="w-5 h-5 text-[#BF9B30]" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>

        <div className="bg-[#1A1A2F] border border-yellow-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#D8C08E] text-sm">Pending</p>
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.pending}</p>
        </div>

        <div className="bg-[#1A1A2F] border border-green-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#D8C08E] text-sm">Approved</p>
            <Check className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.approved}</p>
        </div>

        <div className="bg-[#1A1A2F] border border-red-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#D8C08E] text-sm">Rejected</p>
            <X className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.rejected}</p>
        </div>

        <div className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#D8C08E] text-sm">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-[#BF9B30]" />
          </div>
          <p className="text-3xl font-bold text-white">₱{stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D8C08E]" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or reference number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D8C08E]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl pl-12 pr-8 py-3 text-white focus:outline-none focus:border-[#BF9B30] appearance-none cursor-pointer min-w-[180px]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF9B30]"></div>
            <p className="text-[#D8C08E] mt-4">Loading members...</p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="p-12 text-center">
            <User className="w-16 h-16 text-[#BF9B30]/50 mx-auto mb-4" />
            <p className="text-[#D8C08E] text-lg">No members found</p>
            {searchTerm && (
              <p className="text-[#D8C08E]/70 text-sm mt-2">Try adjusting your search or filters</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0A0A1F] border-b border-[#BF9B30]/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9B30]">Member</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9B30]">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9B30]">Plan</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9B30]">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9B30]">Reference</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9B30]">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9B30]">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9B30]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#BF9B30]/10">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-[#BF9B30]/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-semibold">{payment.fullName}</p>
                        <p className="text-[#D8C08E] text-sm">{payment.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[#D8C08E]">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{payment.contactNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{payment.plan}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#BF9B30] font-bold">₱{payment.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#D8C08E] text-sm font-mono">{payment.referenceNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[#D8C08E] text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(payment.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedMember(payment);
                          setIsModalOpen(true);
                        }}
                        className="text-[#BF9B30] hover:text-[#D8C08E] font-semibold text-sm transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Member Details Modal */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A2F] border-2 border-[#BF9B30] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#1A1A2F] border-b border-[#BF9B30]/30 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">Member Details</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#D8C08E] hover:text-[#BF9B30]">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#BF9B30] mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#D8C08E] text-sm mb-1">Full Name</p>
                    <p className="text-white font-semibold">{selectedMember.fullName}</p>
                  </div>
                  <div>
                    <p className="text-[#D8C08E] text-sm mb-1">Email</p>
                    <p className="text-white font-semibold">{selectedMember.email}</p>
                  </div>
                  <div>
                    <p className="text-[#D8C08E] text-sm mb-1">Contact Number</p>
                    <p className="text-white font-semibold">{selectedMember.contactNumber}</p>
                  </div>
                  <div>
                    <p className="text-[#D8C08E] text-sm mb-1">Payment Method</p>
                    <p className="text-white font-semibold">{selectedMember.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#BF9B30] mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#D8C08E] text-sm mb-1">Plan</p>
                    <p className="text-white font-semibold">{selectedMember.plan}</p>
                  </div>
                  <div>
                    <p className="text-[#D8C08E] text-sm mb-1">Amount</p>
                    <p className="text-[#BF9B30] font-bold text-xl">₱{selectedMember.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[#D8C08E] text-sm mb-1">Reference Number</p>
                    <p className="text-white font-semibold font-mono">{selectedMember.referenceNumber}</p>
                  </div>
                  <div>
                    <p className="text-[#D8C08E] text-sm mb-1">Date Submitted</p>
                    <p className="text-white font-semibold">{formatDate(selectedMember.createdAt)}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-[#D8C08E] text-sm mb-1">Status</p>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedMember.status)}`}>
                      {getStatusIcon(selectedMember.status)}
                      {selectedMember.status.charAt(0).toUpperCase() + selectedMember.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#BF9B30] mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#D8C08E] text-sm mb-1">Contact Person</p>
                    <p className="text-white font-semibold">{selectedMember.emergencyContact.person}</p>
                  </div>
                  <div>
                    <p className="text-[#D8C08E] text-sm mb-1">Contact Number</p>
                    <p className="text-white font-semibold">{selectedMember.emergencyContact.contactNumber}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-[#D8C08E] text-sm mb-1">Address</p>
                    <p className="text-white font-semibold">{selectedMember.emergencyContact.address}</p>
                  </div>
                </div>
              </div>

              {/* Status Update Actions */}
              {selectedMember.status === 'pending' && (
                <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#BF9B30] mb-4">Update Application Status</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => updatePaymentStatus(selectedMember.id, 'approved')}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all"
                    >
                      <Check className="w-5 h-5" />
                      Approve
                    </button>
                    <button
                      onClick={() => updatePaymentStatus(selectedMember.id, 'rejected')}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all"
                    >
                      <X className="w-5 h-5" />
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
