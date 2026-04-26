export default function Navbar({ setOpenModal }) {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        <h1 className="text-lg sm:text-xl font-bold tracking-wide">
          Finance Tracker 💰
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="w-full sm:w-auto bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-100 active:scale-95 transition"
        >
          + Add Expense
        </button>

      </div>
    </nav>
  );
}