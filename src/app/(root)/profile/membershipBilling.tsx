import React, { useState } from 'react';
import { CreditCard, Edit3, Calendar, History, X, Eye, EyeOff } from 'lucide-react';

interface MembershipBillingProps {
  user: any;
  updateUser: (updates: any) => void;
}

export const MembershipBilling: React.FC<MembershipBillingProps> = ({ user, updateUser }) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showCardPopup, setShowCardPopup] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [editValues, setEditValues] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    cardholderName: user.cardholderName,
    cardNumber: "",
    cardExpiry: user.cardExpiry,
    cvv: "",
    billingAddress: { ...user.billingAddress }
  });

  const handleSave = (field: string) => {
    updateUser({ [field]: editValues[field as keyof typeof editValues] });
    setIsEditing(null);
  };

  const handleBillingUpdate = () => {
    updateUser({
      cardholderName: editValues.cardholderName,
      cardExpiry: editValues.cardExpiry,
      billingAddress: editValues.billingAddress,
      paymentMethod: editValues.cardNumber ? `Visa ****-****-****-${editValues.cardNumber.slice(-4)}` : user.paymentMethod
    });
    setShowCardPopup(false);
    setEditValues(prev => ({ ...prev, cardNumber: "", cvv: "" }));
  };

  const handleEmailChange = () => {
    const newEmail = prompt("Enter new email address:", user.email);
    if (newEmail && newEmail !== user.email) {
      updateUser({ email: newEmail });
    }
  };

  const handlePhoneChange = () => {
    const newPhone = prompt("Enter new phone number:", user.phone);
    if (newPhone && newPhone !== user.phone) {
      updateUser({ phone: newPhone });
    }
  };

  // Mock billing history data
  const allBillingHistory = [
    { id: 1, date: "2024-01-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
    { id: 2, date: "2023-12-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
    { id: 3, date: "2023-11-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
    { id: 4, date: "2023-10-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
    { id: 5, date: "2023-09-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
    { id: 6, date: "2023-08-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
    { id: 7, date: "2023-07-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
    { id: 8, date: "2023-06-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
    { id: 9, date: "2023-05-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" },
    { id: 10, date: "2023-04-15", amount: "$19.99", method: "Visa ****-1234", status: "Paid", description: "Premium Monthly Subscription" }
  ];

  const billingHistory = showAllTransactions ? allBillingHistory : allBillingHistory.slice(0, 5);

  return (
    <div className="space-y-8">
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

          {/* Email Field */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div>
                  <label className="text-gray-400 text-sm font-medium">Email Address</label>
                  <p className="text-white font-semibold mt-1">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleEmailChange}
                className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600/30 transition-colors border border-red-500/30"
              >
                Change
              </button>
            </div>
          </div>

          {/* Phone Field */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div>
                  <label className="text-gray-400 text-sm font-medium">Phone Number</label>
                  <p className="text-white font-semibold mt-1">{user.phone}</p>
                </div>
              </div>
              <button
                onClick={handlePhoneChange}
                className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600/30 transition-colors border border-red-500/30"
              >
                Change
              </button>
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
            
            <div className="space-y-3">
              {billingHistory.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{transaction.description}</p>
                      <p className="text-gray-400 text-sm">{transaction.date} • {transaction.method}</p>
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
          </div>
        </div>
      </div>

      {/* Update Card Popup Modal */}
      {showCardPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Update Payment Details</h3>
              <button
                onClick={() => setShowCardPopup(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-gray-400 text-sm font-medium">Cardholder Name</label>
                <input
                  type="text"
                  value={editValues.cardholderName}
                  onChange={(e) => setEditValues(prev => ({ ...prev, cardholderName: e.target.value }))}
                  className="mt-1 w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm font-medium">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={editValues.cardNumber}
                  onChange={(e) => setEditValues(prev => ({ ...prev, cardNumber: e.target.value }))}
                  className="mt-1 w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm font-medium">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={editValues.cardExpiry}
                  onChange={(e) => setEditValues(prev => ({ ...prev, cardExpiry: e.target.value }))}
                  className="mt-1 w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm font-medium">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={editValues.cvv}
                  onChange={(e) => setEditValues(prev => ({ ...prev, cvv: e.target.value }))}
                  className="mt-1 w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Billing Address Form */}
            <div className="mb-6">
              <h4 className="text-white font-medium mb-4">Billing Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-gray-400 text-sm font-medium">Street Address</label>
                  <input
                    type="text"
                    value={editValues.billingAddress.street}
                    onChange={(e) => setEditValues(prev => ({
                      ...prev,
                      billingAddress: { ...prev.billingAddress, street: e.target.value }
                    }))}
                    className="mt-1 w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm font-medium">City</label>
                  <input
                    type="text"
                    value={editValues.billingAddress.city}
                    onChange={(e) => setEditValues(prev => ({
                      ...prev,
                      billingAddress: { ...prev.billingAddress, city: e.target.value }
                    }))}
                    className="mt-1 w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm font-medium">State</label>
                  <input
                    type="text"
                    value={editValues.billingAddress.state}
                    onChange={(e) => setEditValues(prev => ({
                      ...prev,
                      billingAddress: { ...prev.billingAddress, state: e.target.value }
                    }))}
                    className="mt-1 w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm font-medium">ZIP Code</label>
                  <input
                    type="text"
                    value={editValues.billingAddress.zipCode}
                    onChange={(e) => setEditValues(prev => ({
                      ...prev,
                      billingAddress: { ...prev.billingAddress, zipCode: e.target.value }
                    }))}
                    className="mt-1 w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm font-medium">Country</label>
                  <input
                    type="text"
                    value={editValues.billingAddress.country}
                    onChange={(e) => setEditValues(prev => ({
                      ...prev,
                      billingAddress: { ...prev.billingAddress, country: e.target.value }
                    }))}
                    className="mt-1 w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleBillingUpdate}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
              >
                Update Payment Method
              </button>
              <button
                onClick={() => setShowCardPopup(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
