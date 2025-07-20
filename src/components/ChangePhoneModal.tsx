import { useState } from "react";
import Modal from "./Modal";

interface ChangePhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhone: string;
  onSave: (newPhone: string) => void;
}

export default function ChangePhoneModal({
  isOpen,
  onClose,
  currentPhone,
  onSave,
}: ChangePhoneModalProps) {
  const [phone, setPhone] = useState(currentPhone);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, "");

    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    }
    if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6,
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhone(formatted);
  };

  const handleSave = () => {
    if (phone && phone !== currentPhone) {
      onSave(phone);
      onClose();
    }
  };

  const isValid = phone && phone !== currentPhone && phone.length >= 14;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Phone Number">
      <div className="space-y-4">
        <div>
          <label className="block text-app-gray text-sm font-medium mb-2">
            New Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className="w-full px-4 py-3 bg-app-header border border-app-border/30 rounded-lg text-white placeholder-app-gray focus:outline-none focus:border-app-red/50 transition-colors duration-200"
            placeholder="(555) 123-4567"
            maxLength={14}
          />
          <p className="text-app-gray text-xs mt-1">Format: (XXX) XXX-XXXX</p>
        </div>

        <div className="bg-app-header/30 border border-app-border/20 rounded-lg p-4">
          <p className="text-app-gray text-sm">
            <span className="text-white font-medium">Note:</span> We'll send a
            verification code to your new phone number. Your phone number won't
            be changed until you verify it.
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
            Send Verification
          </button>
        </div>
      </div>
    </Modal>
  );
}
