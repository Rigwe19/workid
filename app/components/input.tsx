import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { BiError } from 'react-icons/bi';
import { RiEyeCloseLine, RiEye2Line } from 'react-icons/ri';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, type, className = '', ...props }, ref) => {
        const [processType, setProcessType] = useState(type);
        const [open, setOpen] = useState(false);
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        type={processType}
                        className={`
                        w-full
                        pl-4
                        py-4
                        pr-9
                        rounded-md
                        shadow-sm
                        bg-[#F1F4FF]
                        placeholder-gray-400
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary
                        focus:border-primary
                        ${error ? 'border-red-500' : ''}
                        ${className}
                    `}
                        {...props}
                    />
                    {type === "password" && <button onClick={()=>setProcessType(pv=>pv==='text'?'password':'text')} type="button" className="absolute right-4 top-4 text-primary">
                        {processType==="text" && <RiEye2Line size={24} />}
                        {processType==="password" && <RiEyeCloseLine size={24} />}
                    </button>}
                </div>

                {error && (
                    <span className='flex items-center text-red-500 gap-x-2 text-xs'>
                        <BiError />
                        <span>{error}</span>
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;