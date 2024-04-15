import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { addUser, removeUser } from '../utils/userSlice';

import Browse from './Browse';
import Login from './Login';
import Header from './Header';
import EditExpensePage from './EditExpensePage';
import CreateNewExpenses from './CreateNewExpenses';
import ExpenseManagerPage from './ExpenseManagerPage';

const App = () => {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    { path: '/', element: <Login /> },
    {
      path: '/browse',
      element: (
        <div>
          <Header />
          <Browse />
        </div>
      ),
    },
    {
      path: '/createExpensePage',
      element: (
        <div>
          <Header />
          <CreateNewExpenses />
        </div>
      ),
    },
    {
      path: '/edit-expense',
      element: (
        <div>
          <Header />
          <EditExpensePage />
        </div>
      ),
    },
    {
      path: '/expense-manager',
      element: (
        <div>
          <Header />
          <ExpenseManagerPage />
        </div>
      ),
    },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;