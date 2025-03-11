import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <textarea
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
                />
                {error && (
                    <p className="mt-1 text-xs text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'TextArea';

export default Textarea;