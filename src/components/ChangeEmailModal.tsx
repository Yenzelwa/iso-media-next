import { useState } from "react";
import Modal from "./Modal";

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string;
  onSave: (newEmail: string) => void;
}

export default function ChangeEmailModal({
  isOpen,
  onClose,
  currentEmail,
  onSave,
}: ChangeEmailModalProps) {
  const [email, setEmail] = useState(currentEmail);
  const [confirmEmail, setConfirmEmail] = useState("");

  const handleSave = () => {
    if (email && email === confirmEmail && email !== currentEmail) {
      onSave(email);
      onClose();
    }
  };

  const isValid = email && email === confirmEmail && email !== currentEmail;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Email">
      <div className="space-y-4">
        <div>
          <label className="block text-app-gray text-sm font-medium mb-2">
            Current Email
          </label>
          <input
            type="email"
            value={currentEmail}
            disabled
            className="w-full px-4 py-3 bg-app-header/50 border border-app-border/20 rounded-lg text-app-gray"
          />
        </div>

        <div>
          <label className="block text-app-gray text-sm font-medium mb-2">
            New Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-app-header border border-app-border/30 rounded-lg text-white placeholder-app-gray focus:outline-none focus:border-app-red/50 transition-colors duration-200"
            placeholder="Enter new email address"
          />
        </div>

        <div>
          <label className="block text-app-gray text-sm font-medium mb-2">
            Confirm New Email
          </label>
          <input
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="w-full px-4 py-3 bg-app-header border border-app-border/30 rounded-lg text-white placeholder-app-gray focus:outline-none focus:border-app-red/50 transition-colors duration-200"
            placeholder="Confirm new email address"
          />
          {confirmEmail && email !== confirmEmail && (
            <p className="text-app-error text-sm mt-1">Emails do not match</p>
          )}
        </div>

        <div className="bg-app-header/30 border border-app-border/20 rounded-lg p-4">
          <p className="text-app-gray text-sm">
            <span className="text-white font-medium">Note:</span> You'll receive
            a verification email at your new address. Your email won't be
            changed until you verify it.
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
