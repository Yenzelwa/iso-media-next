import { findInputError, isFormInvalid } from '../utils'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
export const Input = ({ label, type, id, placeholder, name, validation }) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const inputError = errors[name];

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="text-left">
          {label}
        </label>
      </div>
      {inputError && (
            <pre className='text-red' style={{marginTop:'-27px'}}> {inputError.message}</pre>
        )}
 <input
    id={id}
    type={type}
    className={`${type === 'checkbox' ? 'mr-2' : 'w-full p-3 font-medium border text-black rounded-md border-slate-300 placeholder-opacity-60'}`}
    placeholder={placeholder}
    {...register(id, validation)}
    onKeyUp={() => trigger(id)}
/>
    </div>
  );
};
