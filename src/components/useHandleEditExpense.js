import { useNavigate } from 'react-router-dom';

const useHandleEditExpense = () => {
  const navigate = useNavigate();

  const handleEditExpense = () => {
    navigate('/edit-expense');
  };

  return handleEditExpense;
};

export default useHandleEditExpense;