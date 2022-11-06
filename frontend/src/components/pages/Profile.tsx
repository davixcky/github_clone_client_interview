import { useAuthContext } from '../../context/authContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Header } from '../common';
import { GitHubIcon, PlusIcon } from '../icons';
import { GithubAuthServiceInstanceController } from '../../services';

const Profile = () => {
  const { getCurrentUser } = useAuthContext();
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleSyncRequest = async () => {
    const res = await GithubAuthServiceInstanceController.requestLoginUrl();
    window.location.replace(res.data.redirect_url);
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 w-screen h-screen flex p-10 flex-col">
      <Header mainButtonHref="/home" mainButtonTitle="Favorites" />
      <div className="flex flex-col flex-1 mt-9 px-4 capitalize">
        <p className="text-white text-3xl mb-2">My profile</p>
        <p className="font-semibold mx-3 text-gray-500">
          Full name{' '}
          <span className="font-bold text-2xl text-white">
            {user.firstname + ' ' + user.lastname}
          </span>
        </p>
        <p className="font-semibold mx-3 text-gray-500">
          Email <span className="font-bold text-2xl text-white">{user.email}</span>
        </p>
        <div className="flex flex-col flex-wrap mt-10">
          <p className="text-white text-3xl mb-2">Extra account</p>
          <button
            onClick={handleSyncRequest}
            className="rounded-xl py-4 hover:bg-indigo-300 drop-shadow-2xl flex gap-3 bg-white text-green-300 text-2xl font-semibold justify-center items-center"
          >
            Sync with Github Account
            <div className="w-[20px] h-[20px]">
              {' '}
              <GitHubIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export { Profile };
