import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputForm } from '../common';
import { useNavigate } from 'react-router-dom';

interface ISignupInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<ISignupInput>();
  const { errors } = formState;
  const onSubmit: SubmitHandler<ISignupInput> = (data) => console.log(data);

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center xl:w-1/2">
        <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold">Start the adventure!</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">hellobuild.co interview process</p>
          <div className="mt-8">
            <div className="flex flex-col">
              <InputForm label="Firstname" registerAlias="firstname" register={register} required />
              {errors.firstname && <p className="text-red-600 pt-1">{errors.firstname.message}</p>}
            </div>
            <div className="flex flex-col mt-4">
              <InputForm label="Lastname" registerAlias="lastname" register={register} required />
              {errors.lastname && <p className="text-red-600 pt-1">{errors.lastname.message}</p>}
            </div>
            <div className="flex flex-col mt-4">
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
                minLength={{ value: 8, message: 'Please enter at least 8 chars' }}
                type={'password'}
              />
              {errors.password && <p className="text-red-600 pt-1">{errors.password.message}</p>}
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                onClick={handleSubmit(onSubmit)}
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-[#48D398] rounded-xl text-white font-bold text-lg"
              >
                Create account
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base">Already have an account?</p>
              <button
                onClick={() => navigate('/login')}
                className="ml-2 f ont-medium text-base text-[#48D398]"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden relative w-1/2 h-full xl:flex items-center justify-center bg-gray-200">
        <img src="/img/signup-sidebar-bg.png" className="object-fill h-full" />
      </div>
    </div>
  );
};

export { Signup };
