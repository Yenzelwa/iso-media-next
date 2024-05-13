import { findInputError, isFormInvalid } from '../utils'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
export const Input = ({ label, type, id, placeholder, name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = errors[name];

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="text-left">
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {inputError && (
            <InputError message={inputError.message} key={inputError.message} />
          )}
        </AnimatePresence>
      </div>
      <input
        id={id}
        type={type}
        className="w-full p-3 font-medium border text-black rounded-md border-slate-300 placeholder-opacity-60"
        placeholder={placeholder}
        {...register(id, {
          required: {
            value: true,
            message: "required",
          },
        })}
      />
    </div>
  );
};
