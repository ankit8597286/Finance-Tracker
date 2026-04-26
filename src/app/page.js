"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import DashboardCard from "./components/DashboardCard";
import ExpenseChart from "./components/ExpenseChart";
import Insights from "./components/Insights";
import ExpenseList from "./components/ExpenseList";
import AddExpenseModal from "./components/AddExpenseModal";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState("");
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  
  useEffect(() => {
    const storedExpenses =
      JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);

    const savedIncome = localStorage.getItem("income");
    if (savedIncome) {
      setIncome(savedIncome);
    }
  }, []);


  const totalExpense = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const balance = (Number(income) || 0) - totalExpense;

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Navbar */}
      <Navbar setOpenModal={setOpenModal} />


      {/* Main Container */}
      <div className="p-4 sm:p-6 max-w-5xl mx-auto">

        {/* 💰 Income Section */}
        <div className="mb-6 bg-white p-4 rounded-xl shadow-lg">
          <h2 className="font-bold text-gray-700 mb-2">
            Set Monthly Income
          </h2>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="number"
              placeholder="Enter income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className=" text-black border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {message && (
              <p className="text-green-600 font-medium mt-2 text-sm">
                {message}
              </p>
            )}

            <button
              onClick={() => {
                localStorage.setItem("income", income);
                setMessage("✅ Income saved successfully!");

                setTimeout(() => {
                  setMessage("");
                }, 2000);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Save
            </button>
          </div>
        </div>

        {/* 📊 Dashboard Cards */}
        <div className="mb-6">
          <h1 className="text-2xl text-violet-700 font-bold mb-4">Dashboard</h1>

          <div className=" text-gray-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <DashboardCard title="Total Balance" amount={balance} />
            <DashboardCard title="Income" amount={income} />
            <DashboardCard title="Expense" amount={totalExpense} />
          </div>
        </div>

        {/* 📈 Charts */}
        <div className="mb-6">
          <ExpenseChart expenses={expenses} />
        </div>

        {/* 🤖 Insights */}
        <div className="mb-6">
          <Insights expenses={expenses} income={Number(income) || 0} />
        </div>

        {/* 📋 Expense List */}
        <div className="mb-6">
          <ExpenseList
            expenses={expenses}
            setExpenses={setExpenses}
          />
        </div>

        <AddExpenseModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onAdd={setExpenses}
        />

      </div>
    </div>
  );
}
