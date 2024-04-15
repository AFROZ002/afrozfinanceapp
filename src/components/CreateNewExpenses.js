import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../utils/expensesSlice';
import { v4 as uuidv4 } from 'uuid';
import { formatDistanceToNow } from 'date-fns';
// import useCancelNavigation from './hooks/useCancelNavigation'; 
import useCancelNavigation from './useCancelNavigation';


const CreateNewExpenses = () => {
  const dispatch = useDispatch();
  const handleCancel = useCancelNavigation(); 
  const [newExpense, setNewExpense] = useState({
    id: '',
    name: '',
    description: '',
    category: '',
    dateOfExpense: '',
    amount: 0,
    updatedAt: '',
    createdBy: '',
  });

  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleCreateExpense = () => {
    // Generate a unique ID for the new expense
    const newExpenseId = uuidv4();

    // Get the current timestamp for the updatedAt field
    const currentTimestamp = new Date();

    // Get the name of the logged-in user for the createdBy field (assuming it's available)
    // Replace with the actual user's name
    const loggedInUserName="Afroz Alam";
    // Create the new expense object with the generated ID, updatedAt, and createdBy
    const newExpenseData = {
      id: newExpenseId,
      name: newExpense.name,
      description: newExpense.description,
      category: newExpense.category,
      dateOfExpense: newExpense.dateOfExpense,
      amount: newExpense.amount,
      updatedAt: formatDistanceToNow(currentTimestamp),
      createdBy: loggedInUserName,
    };

    // Dispatch the addExpense action to the Redux store
    dispatch(addExpense(newExpenseData));

    // Reset the newExpense state
    setNewExpense({
      id: '',
      name: '',
      description: '',
      category: '',
      dateOfExpense: '',
      amount: 0,
      updatedAt: '',
      createdBy: '',
    });
  };
  // const handleCancel = () => {
  //   navigate('/expense-manager'); // Navigate to ExpenseManagerPage using useNavigate
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 border-4 border-gray-800 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Create New Expense</h1>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name the Expense"
              value={newExpense.name}
              onChange={handleInputChange}
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
              placeholder="Describe the Expense"
              value={newExpense.description}
              onChange={handleInputChange}
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
            <select
              id="category"
              name="category"
              value={newExpense.category}
              onChange={handleInputChange}
              className="border-2 border-gray-400 rounded-md px-3 py-2 w-full"
            >
              <option value="">Select category (drop-down)</option>
              <option value="Books">Books</option>
              <option value="Health">Health</option>
              <option value="Electronics">Electronics</option>
              <option value="Travel">Travel</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="dateOfExpense"
              className="block text-gray-700 font-bold mb-2"
            >
              Date of Expense
            </label>
            <input
              type="date"
              id="dateOfExpense"
              name="dateOfExpense"
              placeholder="Date of Expense (date-picker)"
              value={newExpense.dateOfExpense}
              onChange={handleInputChange}
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
              type="number"
              id="amount"
              name="amount"
              placeholder="Expense Amount in INR"
              value={newExpense.amount}
              onChange={handleInputChange}
              className="border-2 border-gray-400 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={handleCreateExpense}
          >
            Create Expense
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default CreateNewExpenses;