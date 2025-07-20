import { useState } from "react";
import Modal from "./Modal";
import { set } from "lodash";

interface EditNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSave: (newName: string) => void;
}

export default function EditNameModal({
  isOpen,
  onClose,
  currentName,
  onSave,
}: EditNameModalProps) {
  const [fullName, setFullName] = useState(currentName || "");

  const handleSave = () => {
    if (fullName) {
      onSave(fullName);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Name">
      <div className="space-y-4">
        <div>
          <label className="block text-app-gray text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 bg-app-header border border-app-border/30 rounded-lg text-white placeholder-app-gray focus:outline-none focus:border-app-red/50 transition-colors duration-200"
            placeholder="Enter first name"
          />
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
            className="flex-1 px-4 py-3 bg-app-red text-white rounded-lg font-medium hover:bg-app-red/80 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
