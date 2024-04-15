import React, { useState } from 'react';

const EditExpensePage = () => {
  const [expense, setExpense] = useState({
    name: '',
    description: '',
    category: '',
    dateOfExpense: '',
    amount: '',
  });

  const handleInputChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSaveExpense = () => {
    // Add your logic to save the updated expense here
    console.log('Updated Expense:', expense);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 border-4 border-gray-800 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Expense</h1>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={expense.name}
              onChange={handleInputChange}
              placeholder="Pre fill Description from database"
              className="border-2 border-gray-400 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={expense.description}
              onChange={handleInputChange}
              placeholder="Pre fill Description from database"
              className="border-2 border-gray-400 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-bold mb-2"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={expense.category}
              onChange={handleInputChange}
              placeholder="Category from database (option selected)"
              className="border-2 border-gray-400 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="dateOfExpense"
              className="block text-gray-700 font-bold mb-2"
            >
              Date of Expense
            </label>
            <input
              type="text"
              id="dateOfExpense"
              name="dateOfExpense"
              value={expense.dateOfExpense}
              onChange={handleInputChange}
              placeholder="Pre fill Date of Expense from database"
              className="border-2 border-gray-400 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-gray-700 font-bold mb-2"
            >
              Expense Amount
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={expense.amount}
              onChange={handleInputChange}
              placeholder="Pre fill Amount from database"
              className="border-2 border-gray-400 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={() => setExpense({
              name: '',
              description: '',
              category: '',
              dateOfExpense: '',
              amount: '',
            })}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={handleSaveExpense}
          >
            Save Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpensePage;
