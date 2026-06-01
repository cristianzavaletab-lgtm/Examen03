"use client";

interface DeleteModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ show, onConfirm, onCancel }: DeleteModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Confirmar eliminacion</h3>
        <p className="text-gray-500 mb-6">
          Esta seguro de que desea eliminar este producto? Esta accion no se puede deshacer.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-5 rounded-lg transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg transition-colors cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
