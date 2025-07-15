import React, { forwardRef } from 'react';

interface ModernInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helper?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  className?: string;
  name?: string;
  id?: string;
}

const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  helper,
  disabled = false,
  required = false,
  icon,
  className = '',
  name,
  id
}, ref) => {
  const inputClasses = `
    input-modern
    w-full
    ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
    ${icon ? 'pl-10' : ''}
    ${className}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
        />
      </div>
      
      {error && (
        <p className="text-sm text-danger-600 dark:text-danger-400 animate-fade-in">
          {error}
        </p>
      )}
      
      {helper && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {helper}
        </p>
      )}
    </div>
  );
});

ModernInput.displayName = 'ModernInput';

export default ModernInput; 