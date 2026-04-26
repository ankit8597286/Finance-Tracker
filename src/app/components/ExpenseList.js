"use client";

export default function ExpenseList({ expenses, setExpenses }) {
  // Delete function
  const handleDelete = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md text-center text-gray-500">
        No expenses added yet 📭
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
        Expense History 📋
      </h2>

      <div className="space-y-3">
        {expenses.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
          >
            <div>
              <p className="font-semibold text-gray-700">
                ₹{item.amount} - {item.category}
              </p>
              <p className="text-sm text-gray-500">
                {item.date} | {item.note}
              </p>
            </div>

            <button
              onClick={() => handleDelete(index)}
              className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}