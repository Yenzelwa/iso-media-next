import { useState } from "react";
import Modal from "./Modal";

interface UpdatePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPaymentMethod: string;
  onSave: (paymentData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
  }) => void;
}

export default function UpdatePaymentModal({
  isOpen,
  onClose,
  currentPaymentMethod,
  onSave,
}: UpdatePaymentModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
    }
  };

  const handleSave = () => {
    if (cardNumber && expiryDate && cvv && nameOnCard) {
      onSave({
        cardNumber,
        expiryDate,
        cvv,
        nameOnCard,
      });
      onClose();
      // Reset form
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setNameOnCard("");
    }
  };

  const isValid =
    cardNumber.length >= 19 &&
    expiryDate.length === 5 &&
    cvv.length >= 3 &&
    nameOnCard.length >= 2;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Payment Method">
      <div className="space-y-4">
        <div>
          <label className="block text-app-gray text-sm font-medium mb-2">
            Current Payment Method
          </label>
          <input
            type="text"
            value={currentPaymentMethod}
            disabled
            className="w-full px-4 py-3 bg-app-header/50 border border-app-border/20 rounded-lg text-app-gray"
          />
        </div>

        <div>
          <label className="block text-app-gray text-sm font-medium mb-2">
            Card Number
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            className="w-full px-4 py-3 bg-app-header border border-app-border/30 rounded-lg text-white placeholder-app-gray focus:outline-none focus:border-app-red/50 transition-colors duration-200"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-app-gray text-sm font-medium mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => handleExpiryChange(e.target.value)}
              className="w-full px-4 py-3 bg-app-header border border-app-border/30 rounded-lg text-white placeholder-app-gray focus:outline-none focus:border-app-red/50 transition-colors duration-200"
              placeholder="MM/YY"
              maxLength={5}
            />
          </div>

          <div>
            <label className="block text-app-gray text-sm font-medium mb-2">
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              className="w-full px-4 py-3 bg-app-header border border-app-border/30 rounded-lg text-white placeholder-app-gray focus:outline-none focus:border-app-red/50 transition-colors duration-200"
              placeholder="123"
              maxLength={4}
            />
          </div>
        </div>

        <div>
          <label className="block text-app-gray text-sm font-medium mb-2">
            Name on Card
          </label>
          <input
            type="text"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            className="w-full px-4 py-3 bg-app-header border border-app-border/30 rounded-lg text-white placeholder-app-gray focus:outline-none focus:border-app-red/50 transition-colors duration-200"
            placeholder="John Doe"
          />
        </div>

        <div className="bg-app-header/30 border border-app-border/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white font-medium text-sm">
              Secure Payment
            </span>
          </div>
          <p className="text-app-gray text-sm">
            Your payment information is encrypted and securely stored. We never
            store your CVV.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-app-header border border-app-border/30 text-app-gray rounded-lg font-medium hover:text-white hover:border-app-border/50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
              isValid
                ? "bg-app-red text-white hover:bg-app-red/80"
                : "bg-app-header/50 text-app-gray cursor-not-allowed"
            }`}
          >
            Update Payment
          </button>
        </div>
      </div>
    </Modal>
  );
}
