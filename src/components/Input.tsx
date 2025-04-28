import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

interface InputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  name: string;
  validation: any; // Validation rules for react-hook-form
}

export const Input = ({ label, type, id, placeholder, name, validation }: InputProps) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const inputError = errors[id];

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="text-left">
          {label}
        </label>
      </div>

      <input
        id={id}
        type={type}
        className={`${type === 'checkbox'
          ? 'mr-2'
          : 'w-full p-3 font-medium border text-black rounded-md border-slate-300 placeholder-opacity-60'
          }`}
        placeholder={placeholder}
        {...register(id, validation)}
        onKeyUp={() => trigger(id)}
      />


    </div>
  );
};
