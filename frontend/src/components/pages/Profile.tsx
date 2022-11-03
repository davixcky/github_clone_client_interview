import { useAuthContext } from '../../context/authContext';
import {Navigate} from "react-router-dom";

const Profile = () => {
  const { getCurrentUser } = useAuthContext();
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className=" bg-white flex font-medium items-center justify-center h-screen">
      <section className="bg-[#48D398]/50 rounded-2xl px-8 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-emerald-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </span>
        </div>
        <div className="mt-6 w-fit mx-auto">
          <img
            src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
            className="rounded-full w-28 "
            alt="profile picture"
            srcSet=""
          />
        </div>

        <div className="mt-8 px-10">
          <h2 className="text-white font-bold text-2xl tracking-wide">
            {user.firstname + ' ' + user.lastname}
          </h2>
        </div>
        <p className="text-white font-semibold mt-2.5">Active</p>
        <p className="text-white font-semibold mt-2.5 underline cursor-pointer">{ user.email}</p>
      </section>
      <button>
        See repositories
      </button>
    </section>
  );
};

export { Profile };
