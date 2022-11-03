import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { FieldValues, Path } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';
import { ValidationRule } from 'react-hook-form/dist/types/validator';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import * as React from 'react';

interface IInputForm<T extends FieldValues> {
  label: string;
  registerAlias: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  type?: HTMLInputTypeAttribute;
  pattern?: ValidationRule<RegExp>;
  minLength?: ValidationRule<number>;
}

const InputForm = <T extends FieldValues>({
  label,
  registerAlias,
  register,
  required,
  type,
  pattern,
  minLength
}: IInputForm<T>) => {
  return (
    <>
      <label className="text-lg font-medium">{label}</label>
      <input
        {...register(registerAlias, { required, pattern, minLength })}
        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
        type={type}
      />
    </>
  );
};

export { InputForm };
