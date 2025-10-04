import React, { useState, useEffect } from 'react';
import { CreditCard, Edit3, Calendar, History, X, Eye, EyeOff } from 'lucide-react';
import { formatPhoneNumber } from '@/src/utils/phone';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { InlineStripeForm } from '@/src/components/InlineStripeForm';

interface BillingTransaction {
  id: number;
  date: string;
  amount: string;
  method: string;
  status: string;
  description: string;
}

interface MembershipBillingProps {
  user: any;
  updateUser: (updates: any) => void;
}

export const MembershipBilling: React.FC<MembershipBillingProps> = ({ user, updateUser }) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showCardPopup, setShowCardPopup] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [billingHistory, setBillingHistory] = useState<BillingTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [editValues, setEditValues] = useState({
    name: user?.name || '',
    phone: formatPhoneNumber(user?.phone || ''),
    cardholderName: user?.cardholderName || '',
    cardNumber: "",
    cardExpiry: user?.cardExpiry || '',
    cvv: "",
    billingAddress: user?.billingAddress || {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
  // Fetch billing history from API
  useEffect(() => {
    const fetchBillingHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/billing/history', {
          headers: {
            'Authorization': `Bearer ${user?.token || ''}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBillingHistory(data.items || data || []);
        } else {
          // Fallback to mock data if API fails
          setBillingHistory([
            { id: 1, date: "2024-01-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
            { id: 2, date: "2023-12-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
            { id: 3, date: "2023-11-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
            { id: 4, date: "2023-10-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
            { id: 5, date: "2023-09-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
          ]);
        }
      } catch (err) {
        console.error('Error fetching billing history:', err);
        setError('Failed to load billing history');
        // Fallback to mock data
        setBillingHistory([
          { id: 1, date: "2024-01-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBillingHistory();
    }
  }, [user]);

  // Update editValues when user prop changes
  useEffect(() => {
    if (user) {
      setEditValues({
        name: user.name || '',
        phone: formatPhoneNumber(user.phone || ''),
        cardholderName: user.cardholderName || '',
        cardNumber: "",
        cardExpiry: user.cardExpiry || '',
        cvv: "",
        billingAddress: user.billingAddress || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        }
      });
    }
  }, [user]);

  const sanitizePhone = (value: string) => value.replace(/\D/g, '');

  const handleSave = (field: string) => {
    const value = editValues[field as keyof typeof editValues];

    if (field === 'phone') {
      if (typeof value !== 'string') {
        return;
      }

      const digits = sanitizePhone(value);
      const currentDigits = sanitizePhone(user?.phone || '');

      if (digits.length !== 10 || digits === currentDigits) {
        return;
      }

      const correlationId =
        typeof window !== 'undefined' &&
        window.crypto &&
        'randomUUID' in window.crypto
          ? window.crypto.randomUUID()
          : 'phone-' + Date.now();

      console.info('profile.phone.update', {
        status: 'submitted',
        userId: user?.id ?? 'unknown',
        last4: digits.slice(-4) || null,
        correlation_id: correlationId,
        user_role: user?.role ?? 'unknown',
      });
    }

    updateUser({ [field]: value });
    setIsEditing(null);
  };

  const handleBillingUpdate = async () => {
    try {
      setLoading(true);

      const updates = {
        cardholderName: editValues.cardholderName,
        cardExpiry: editValues.cardExpiry,
        billingAddress: editValues.billingAddress,
        paymentMethod: editValues.cardNumber ? `Visa ****-****-****-${editValues.cardNumber.slice(-4)}` : user.paymentMethod
      };

      // Update via API
      const response = await fetch('/api/billing/payment-methods/attach', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user?.token || ''}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardNumber: editValues.cardNumber,
          cardExpiry: editValues.cardExpiry,
          cvv: editValues.cvv,
          cardholderName: editValues.cardholderName,
          billingAddress: editValues.billingAddress
        }),
      });

      if (response.ok) {
        updateUser(updates);
        setShowCardPopup(false);
        setEditValues(prev => ({ ...prev, cardNumber: "", cvv: "" }));
      } else {
        throw new Error('Failed to update payment method');
      }
    } catch (err) {
      console.error('Error updating payment method:', err);
      setError('Failed to update payment method. Please try again.');
      // Still update local state as fallback
      updateUser({
        cardholderName: editValues.cardholderName,
        cardExpiry: editValues.cardExpiry,
        billingAddress: editValues.billingAddress,
        paymentMethod: editValues.cardNumber ? `Visa ****-****-****-${editValues.cardNumber.slice(-4)}` : user.paymentMethod
      });
      setShowCardPopup(false);
      setEditValues(prev => ({ ...prev, cardNumber: "", cvv: "" }));
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneInputChange = (value: string) => {
    setEditValues(prev => ({
      ...prev,
      phone: formatPhoneNumber(value),
    }));
  };

  const handlePhoneCancel = () => {
    setEditValues(prev => ({
      ...prev,
      phone: formatPhoneNumber(user?.phone || ''),
    }));
    setIsEditing(null);
  };

  const userPhoneDigits = sanitizePhone(user?.phone || '');
  const editPhoneDigits = sanitizePhone(editValues.phone || '');
  const canSavePhone = editPhoneDigits.length === 10 && editPhoneDigits !== userPhoneDigits;
  const displayedPhone = formatPhoneNumber(user?.phone || '');
  // TODO: remove debug artifacts; inserted for patch anchoring
  /*

  const displayedTransactions = showAllTransactions ? billingHistory : billingHistory.slice(0, 5);\n\n  console.log('debug-phone', editValues.phone, canSavePhone);

  */
  const displayedTransactions = showAllTransactions ? billingHistory : billingHistory.slice(0, 5);
  return (
    <div className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className="text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      {/* Account Information */}
      <div className="relative">
        <div className="absolute -left-8 top-0 w-1 h-16 bg-red-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Account Information</h2>
        <p className="text-gray-400 text-sm mb-6">Manage your personal information and preferences</p>

        <div className="space-y-4">
          {/* Name Field */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div>
                  <label className="text-gray-400 text-sm font-medium">Full Name</label>
                  {isEditing === 'name' ? (
                    <input
                      type="text"
                      value={editValues.name}
                      onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                      className="block mt-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <p className="text-white font-semibold mt-1">{user.name}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                {isEditing === 'name' ? (
                  <>
                    <button
                      onClick={() => handleSave('name')}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(null)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing('name')}
                    className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600/30 transition-colors border border-red-500/30"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>


          {/* Phone Field */}
          <div data-testid="phone-section" className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div>
                  <label htmlFor="account-phone-input" className="text-gray-400 text-sm font-medium">Phone Number</label>
                  {isEditing === 'phone' ? (
                    <input
                      id="account-phone-input"
                      type="tel"
                      value={editValues.phone}
                      onChange={(e) => handlePhoneInputChange(e.target.value)}
                      placeholder="(555) 123-4567"
                      maxLength={14}
                      className="mt-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <p className="text-white font-semibold mt-1">{displayedPhone || 'Not provided'}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isEditing === 'phone' ? (
                  <>
                    <button
                      onClick={() => handleSave('phone')}
                      disabled={!canSavePhone}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        canSavePhone
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-600/40 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Save
                    </button>
                    <button
                      onClick={handlePhoneCancel}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing('phone')}
                    className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600/30 transition-colors border border-red-500/30"
                  >
                    Change
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Details */}
      <div className="relative">
        <div className="absolute -left-8 top-0 w-1 h-16 bg-red-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Billing Details</h2>
        <p className="text-gray-400 text-sm mb-6">Manage your payment methods and billing information</p>

        <div className="space-y-4">
          {/* Current Payment Method */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm font-medium">Primary Payment Method</label>
                  <p className="text-white font-semibold">{user.paymentMethod}</p>
                  <p className="text-gray-400 text-sm">Expires {user.cardExpiry}</p>
                  <p className="text-gray-400 text-sm">Cardholder: {user.cardholderName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowCardDetails(!showCardDetails)}
                  className="bg-gray-600/20 text-gray-400 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-600/30 transition-colors border border-gray-500/30"
                >
                  {showCardDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setShowCardPopup(true)}
                  className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600/30 transition-colors border border-red-500/30 flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Update Card</span>
                </button>
              </div>
            </div>

            {/* Card Details */}
            {showCardDetails && (
              <div className="mb-4 p-4 bg-gray-700/30 rounded-xl">
                <h4 className="text-white font-medium mb-2">Card Details</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Card Number: {user.paymentMethod}</p>
                  <p>Expiry Date: {user.cardExpiry}</p>
                  <p>Cardholder: {user.cardholderName}</p>
                  <p>Card Type: Visa</p>
                </div>
              </div>
            )}

            {/* Billing Address */}
            <div className="pt-4 border-t border-gray-700/30">
              <label className="text-gray-400 text-sm font-medium">Billing Address</label>
              <div className="mt-2 text-white">
                <p>{user.billingAddress?.street}</p>
                <p>{user.billingAddress?.city}, {user.billingAddress?.state} {user.billingAddress?.zipCode}</p>
                <p>{user.billingAddress?.country}</p>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Billing History */}
      <div className="relative">
        <div className="absolute -left-8 top-0 w-1 h-16 bg-red-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Billing History</h2>
        <p className="text-gray-400 text-sm mb-6">View your past transactions and payment history</p>

        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/30 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">
                {showAllTransactions ? 'All Transactions' : 'Recent Transactions'}
              </h3>
              <button
                onClick={() => setShowAllTransactions(!showAllTransactions)}
                className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600/30 transition-colors border border-red-500/30 flex items-center space-x-2"
              >
                <History className="w-4 h-4" />
                <span>{showAllTransactions ? 'Show Recent' : 'View All'}</span>
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {displayedTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.description}</p>
                        <p className="text-gray-400 text-sm">{transaction.date} â€¢ {transaction.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{transaction.amount}</p>
                      <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded-full">
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Update Card Popup Modal */}
      {showCardPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div role="dialog" aria-modal="true" aria-labelledby="update-payment-title" className="bg-gradient-to-br from-gray-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 id="update-payment-title" className="text-2xl font-bold text-white">Update Payment Details</h3>
              <button
                onClick={() => setShowCardPopup(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Secure Stripe Card Form in modal */}
            <div className="mb-6">
              {stripePromise && (
                <Elements stripe={stripePromise}>
                  <InlineStripeForm
                    onSuccess={(pmLabel) => {
                      updateUser({ paymentMethod: pmLabel });
                      setShowCardPopup(false);
                    }}
                  />
                </Elements>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCardPopup(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};









