import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GoogleIcon } from '../icons';
import { InputForm } from '../common';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import { LoginData } from '../../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const { login, getCurrentUser } = useAuthContext();
  const { register, handleSubmit, formState } = useForm<LoginData>();
  const { errors } = formState;
  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const user = await login(data);
    if (user) {
      navigate('/home');
      return;
    }

    toast.error('Invalid credentials', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });
  };

  const user = getCurrentUser();
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex w-full h-screen">
      <div className="hidden relative w-1/2 h-full xl:flex items-center justify-center bg-gray-200">
        <img src="/img/login-sidebar-bg.png" className="object-fill h-full" />
      </div>
      <div className="w-full flex items-center justify-center xl:w-1/2">
        <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold">Welcome Back to Github Clone</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">hellobuild.co interview process</p>
          <div className="mt-8">
            <div className="flex flex-col">
              <InputForm
                label="Email"
                registerAlias="email"
                register={register}
                required
                type="email"
                pattern={{
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email'
                }}
              />
              {errors.email && <p className="text-red-600 pt-1">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col mt-4">
              <InputForm
                label="Password"
                registerAlias="password"
                register={register}
                required
                minLength={{ value: 1, message: 'Please enter at least 1 chars' }}
                type={'password'}
              />
              {errors.password && <p className="text-red-600 pt-1">{errors.password.message}</p>}
            </div>
            <div className="mt-8 flex justify-between items-center">
              <div>
                <input type="checkbox" id="remember" />
                <label className="ml-2 font-medium text-base" htmlFor="remember">
                  Remember for 30 days
                </label>
              </div>
              <button className="font-medium text-base text-[#48D398]">Forgot password</button>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                onClick={handleSubmit(onSubmit)}
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-[#48D398] rounded-xl text-white font-bold text-lg"
              >
                Sign in
              </button>
              <button className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 ">
                <GoogleIcon />
                Sign in with Google
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base">Don't have an account?</p>
              <button
                onClick={() => navigate('/signup')}
                className="ml-2 f ont-medium text-base text-[#48D398]"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
