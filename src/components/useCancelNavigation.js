import { useNavigate } from 'react-router-dom';

const useCancelNavigation = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/expense-manager'); // Navigate to ExpenseManagerPage using useNavigate
  };

  return handleCancel;
};

export default useCancelNavigation;
