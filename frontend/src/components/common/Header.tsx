import { useAuthContext } from '../../context/authContext';
import { Navigate, useNavigate } from 'react-router-dom';

export type HeaderProps = {
  mainButtonTitle: string;
  mainButtonHref: string;
};

const Header = ({ mainButtonTitle, mainButtonHref }: HeaderProps) => {
  const { getCurrentUser, logout } = useAuthContext();
  const user = getCurrentUser();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex justify-between">
      <div className="flex text-white capitalize text-4xl">
        <p>
          Welcome, <span className="font-bold">{user.firstname}</span>
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => navigate(mainButtonHref)}
          className="bg-[#48D398] drop-shadow-2xl rounded px-5 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform"
        >
          {mainButtonTitle}
        </button>
        <button onClick={handleLogout} className="bg-indigo-200 drop-shadow-2xl rounded px-5">
          Logout
        </button>
      </div>
    </div>
  );
};

export { Header };
