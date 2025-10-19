export default function PrimaryButton({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-48 h-14px-6 py-3 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-50 text-sky-900 text-xl font-semibold transition-all flex justify-center items-center ${className}`}
    >
      {children}
    </button>
  );
}
