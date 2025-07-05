import { forwardRef, type ReactNode } from 'react';

interface FormInputProps {
  id: string;
  name?: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  icon?: ReactNode;
  className?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, name, type, placeholder, autoComplete, error, icon, className = '', ...props }, ref) => {
    return (
      <div className={`relative rounded-md shadow-sm ${error ? 'ring-1 ring-red-500' : ''} transition-all duration-200 hover:shadow-md focus-within:shadow-md ${className}`}>
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          ref={ref}
          className={`${icon ? '!pl-10' : ''} block w-full rounded-lg border ${
            error ? 'border-red-500 text-red-900 placeholder-red-300' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all p-3 text-base`}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
