import { useNavigate } from 'react-router-dom';


const useHandleNewExpense = () => {
  const navigate = useNavigate();


  const handleNewExpense = () => {
    
    navigate('/createExpensePage');
  };

  return handleNewExpense;
};

export default useHandleNewExpense;