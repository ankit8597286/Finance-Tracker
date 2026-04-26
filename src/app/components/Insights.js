"use client";

export default function Insights({ expenses, income }) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md text-gray-500 text-center">
        No insights yet 📊
      </div>
    );
  }

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = income - totalExpense;

  // Category calculation
  const categoryMap = {};
  expenses.forEach((e) => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + e.amount;
  });

  const insights = [];

  // 🚨 Rule 1: Overspending
  if (totalExpense > income) {
    insights.push("⚠️ You are spending more than your income!");
  }

  // 🍔 Rule 2: Food spending high
  if (categoryMap["Food"] > totalExpense * 0.4) {
    insights.push("🍔 High spending on Food (over 40%)");
  }

  // 🛍️ Rule 3: Shopping high
  if (categoryMap["Shopping"] > totalExpense * 0.3) {
    insights.push("🛍️ You are spending a lot on Shopping");
  }

  // 📉 Rule 4: Low savings
  if (balance < income * 0.2) {
    insights.push("📉 Your savings are low (<20%)");
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3">
        Smart Insights 💡
      </h2>

      <ul className="space-y-2">
        {insights.length > 0 ? (
          insights.map((item, index) => (
            <li
              key={index}
              className="bg-gray-100 p-2 rounded text-sm sm:text-base text-gray-700 font-medium"
            >
              {item}
            </li>
          ))
        ) : (
          <li className="text-gray-500">
            ✅ Your spending looks balanced!
          </li>
        )}
      </ul>
    </div>
  );
}