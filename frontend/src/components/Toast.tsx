"use client";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div
      className={`fixed top-5 right-5 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-semibold animate-slide-in ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer">
          X
        </button>
      </div>
    </div>
  );
}
