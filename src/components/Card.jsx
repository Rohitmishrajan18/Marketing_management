export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-gray-700 transition-colors ${className}`}
    >
      {children}
    </div>
  );
}
