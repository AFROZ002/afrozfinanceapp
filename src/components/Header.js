import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="w-screen px-8 py-2 bg-gradient-to-b from-black flex justify-between items-center">
      {user && (
        <div className="flex justify-end flex-grow">
          <button
            onClick={handleSignOut}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
