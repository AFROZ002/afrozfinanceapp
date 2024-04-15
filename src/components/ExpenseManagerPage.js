import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { editExpense, deleteExpense } from '../utils/expensesSlice';
import useHandleNewExpense from './useHandleNewExpense';
import useHandleEditExpense from './useHandleEditExpense';
import { parseISO, format } from 'date-fns';

const ExpenseManagerPage = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);
  const handleNewExpense = useHandleNewExpense();
  const handleEditExpense = useHandleEditExpense();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredExpenses = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter expenses by date
  const filteredExpensesByDate = filterDate
    ? filteredExpenses.filter((expense) => {
        const expenseDate = parseISO(expense.dateOfExpense);
        const filterDateObj = parseISO(filterDate);
        return (
          expenseDate.getDate() === filterDateObj.getDate() &&
          expenseDate.getMonth() === filterDateObj.getMonth() &&
          expenseDate.getFullYear() === filterDateObj.getFullYear()
        );
      })
    : filteredExpenses;

  const totalPages = Math.ceil(filteredExpensesByDate.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedExpenses = filteredExpensesByDate.slice(startIndex, endIndex);

  const handleDeleteConfirmation = (expense) => {
    setSelectedExpense(expense);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteExpense = () => {
    // Delete the selected expense from the Redux store
    dispatch(deleteExpense(selectedExpense));

    // Hide the delete confirmation dialog
    setShowDeleteConfirmation(false);
  };

  const handleUpdateExpense = (id, updatedExpense) => {
    dispatch(editExpense({ id, updatedExpense }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Expense Manager</h1>
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="filter-date" className="mr-2">
            Filter by Date of Expense:
          </label>
          <input
            type="date"
            id="filter-date"
            className="border rounded px-2 py-1"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search Expense by Name"
            className="border rounded px-2 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleNewExpense}
        >
          + New Expense
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Date of Expense</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2 text-left">Updated At</th>
            <th className="px-4 py-2 text-left">Created by</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedExpenses.map((expense, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              <td className="px-4 py-2">{expense.name}</td>
              <td className="px-4 py-2">{expense.category}</td>
              <td className="px-4 py-2">{expense.dateOfExpense}</td>
              <td className="px-4 py-2 text-right">{expense.amount}</td>
              <td className="px-4 py-2">{expense.updatedAt}</td>
              <td className="px-4 py-2">{expense.createdBy}</td>
              <td className="px-4 py-2">
                <button
                  className="mr-2 text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditExpense(expense)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteConfirmation(expense)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination flex justify-center mt-4">
        {currentPage > 1 && (
          <button
            className="bg-gray-200 hover:bg-green bg-lime-400 px-4 py-2 rounded mr-2"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded mr-2 ${
                currentPage === page ? 'bg-gray-300' : ''
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
        {currentPage < totalPages && (
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded ml-2"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this Expense?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                No
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={handleDeleteExpense}
              >
                Yes, Delete!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseManagerPage;
