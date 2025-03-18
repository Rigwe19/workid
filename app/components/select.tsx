import { forwardRef, useEffect, useState, type SelectHTMLAttributes } from 'react';
import { BiError } from 'react-icons/bi';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options?: { label: string | number, value: string | number }[];
    disable_from?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className = '', disable_from, ...props }, ref) => {
        const [filter, setFilter] = useState(options);
        useEffect(() => {
            if (disable_from) {
                setFilter(options?.filter(option => option.value >= disable_from));
            }
        }, [disable_from]);
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
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
                >
                    <option value="">Select</option>
                    {filter?.map(option => <option key={option.label} value={option.value}>{option.label}</option>)}
                </select>
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

Select.displayName = 'Select';

export default Select;