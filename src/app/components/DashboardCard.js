export default function DashboardCard({ title, amount }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition duration-300 border border-gray-100">
      
      {/* Title */}
      <h2 className="text-sm sm:text-base font-medium text-gray-500">
        {title}
      </h2>

      {/* Amount */}
      <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">
        ₹{Number(amount).toLocaleString()}
      </p>

      {/* Small indicator line */}
      <div className="mt-3 h-1 w-12 rounded-full bg-blue-500"></div>
    </div>
  );
}