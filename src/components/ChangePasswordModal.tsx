import { useState } from "react";
import Modal from "./Modal";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (currentPassword: string, newPassword: string) => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  onSave,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const handleSave = () => {
    if (currentPassword && newPassword && newPassword === confirmPassword) {
      onSave(currentPassword, newPassword);
      onClose();
      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const isValid =
    currentPassword &&
    newPassword &&
    newPassword === confirmPassword &&
    newPassword.length >= 8;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <div className="space-y-4">
        <div>
          <label className="block text-app-gray text-sm font-medium mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 bg-app-header border border-app-border/30 rounded-lg text-white placeholder-app-gray focus:outline-none focus:border-app-red/50 transition-colors duration-200 pr-12"
              placeholder="Enter current password"
            />
          </div>
        </div>

        <div>
          <label className="block text-app-gray text-sm font-medium mb-2">
            New Password
          </label>
          <input
            type={showPasswords ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 bg-app-header border border-app-border/30 rounded-lg text-white placeholder-app-gray focus:outline-none focus:border-app-red/50 transition-colors duration-200"
            placeholder="Enter new password"
          />
          {newPassword && newPassword.length < 8 && (
            <p className="text-app-error text-sm mt-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        <div>
          <label className="block text-app-gray text-sm font-medium mb-2">
            Confirm New Password
          </label>
          <input
            type={showPasswords ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-app-header border border-app-border/30 rounded-lg text-white placeholder-app-gray focus:outline-none focus:border-app-red/50 transition-colors duration-200"
            placeholder="Confirm new password"
          />
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="text-app-error text-sm mt-1">
              Passwords do not match
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showPasswords"
            checked={showPasswords}
            onChange={(e) => setShowPasswords(e.target.checked)}
            className="w-4 h-4 text-app-red bg-app-header border border-app-border/30 rounded focus:ring-app-red focus:ring-2"
          />
          <label htmlFor="showPasswords" className="text-app-gray text-sm">
            Show passwords
          </label>
        </div>

        <div className="bg-app-header/30 border border-app-border/20 rounded-lg p-4">
          <p className="text-app-gray text-sm">
            <span className="text-white font-medium">
              Password requirements:
            </span>
          </p>
          <ul className="text-app-gray text-sm mt-1 space-y-1">
            <li>• At least 8 characters long</li>
            <li>• Mix of letters, numbers, and symbols recommended</li>
          </ul>
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
            Update Password
          </button>
        </div>
      </div>
    </Modal>
  );
}
