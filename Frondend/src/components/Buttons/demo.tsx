export default function Modal({ open, onClose, children }) {
  return (
    // Backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-lg p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
        <div
          className="absolute right-0 top-0 p-1 rounded-lg hover:bg-gray-200"
          onClick={onClose}
        >
          X
        </div>
      </div>
    </div>
  );
}
