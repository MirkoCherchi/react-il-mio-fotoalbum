import React from "react";

const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg mb-4">
          Sei sicuro di voler eliminare questa foto?
        </p>
        <div className="flex justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-4"
          >
            Conferma
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
