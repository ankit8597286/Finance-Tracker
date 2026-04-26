"use client";
import { useState } from "react";

export default function AddExpenseModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("expenses")) || [];

    const newExpense = {
      ...form,
      amount: Number(form.amount),
    };

    const updated = [...existing, newExpense];
    localStorage.setItem("expenses", JSON.stringify(updated));

    onAdd(updated); 

    setForm({
      amount: "",
      category: "",
      date: "",
      note: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* 🌫️ Blur Background */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* 💎 Glass Card */}
      <div className="relative w-full max-w-md mx-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/40">

        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✖
        </button>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          Add Expense 💸
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Amount */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full mt-1 p-3 text-black bg-white/70 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-1 p-3 text-black bg-white/70 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Food">🍔 Food</option>
              <option value="Rent">🏠 Rent</option>
              <option value="Travel">✈️ Travel</option>
              <option value="Shopping">🛍️ Shopping</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full mt-1 p-3 text-black bg-white/70 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Note */}
          <div>
            <label className="text-sm font-semibold text-gray-400">
              Note (Optional)
            </label>
            <textarea
              name="note"
              placeholder="Write a note..."
              value={form.note}
              onChange={handleChange}
              className="w-full mt-1 p-3 text-black bg-white/70 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}