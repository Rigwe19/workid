import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options?: string[] | number[];
}

const Textarea = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className = '', ...props }, ref) => {
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
                    <option value="Select">Select</option>
                    {options?.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                {error && (
                    <p className="mt-1 text-xs text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'TextArea';

export default Textarea;