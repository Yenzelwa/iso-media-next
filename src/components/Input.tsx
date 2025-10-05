import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

interface InputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  name: string;
  validation: any; // Validation rules for react-hook-form
  hideLabel?: boolean; // Visually hide label but keep for a11y
}

export const Input = ({ label, type, id, placeholder, name, validation, hideLabel = false }: InputProps) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const inputError = errors[name];

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className={`text-left ${hideLabel ? 'sr-only' : ''}`}>
          {label}
        </label>
      </div>

      <input
        id={id}
        type={type}
        className={`${type === 'checkbox'
          ? 'mr-2'
          : `w-full p-3 font-medium border text-black rounded-md placeholder-opacity-60 ${
              inputError ? 'border-red-500' : 'border-slate-300'
            }`
          }`}
        placeholder={placeholder}
        aria-label={hideLabel ? label : undefined}
        {...register(id, validation)}
        onKeyUp={() => trigger(name)}
      />

      <AnimatePresence mode="wait" initial={false}>
        {inputError && (
          <motion.p className="text-red-500 text-sm mt-1" {...framer_error}>
            {String((inputError as any)?.message ?? '')}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
