import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ModernInput from './ModernInput';
import ModernSelect from './ModernSelect';
import ModernButton from './ModernButton';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: RegExp;
    message?: string;
    minLength?: number;
    maxLength?: number;
  };
}

interface ModernFormProps {
  fields: Field[];
  onSubmit: (data: any) => void;
  submitText?: string;
  loading?: boolean;
  className?: string;
}

const ModernForm: React.FC<ModernFormProps> = ({
  fields,
  onSubmit,
  submitText = 'Enviar',
  loading = false,
  className = ''
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: any, field: Field): string => {
    if (field.required && !value) {
      return `${field.label} es requerido`;
    }

    if (value && field.validation) {
      const { pattern, message, minLength, maxLength } = field.validation;

      if (pattern && !pattern.test(value)) {
        return message || `${field.label} no es válido`;
      }

      if (minLength && value.length < minLength) {
        return `${field.label} debe tener al menos ${minLength} caracteres`;
      }

      if (maxLength && value.length > maxLength) {
        return `${field.label} debe tener máximo ${maxLength} caracteres`;
      }
    }

    return '';
  };

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const field = fields.find(f => f.name === name);
    if (field) {
      const error = validateField(name, value, field);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      const error = validateField(field.name, formData[field.name], field);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    // If no errors, submit
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const renderField = (field: Field) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'select':
        return (
          <ModernSelect
            options={field.options || []}
            value={value}
            onChange={(value) => handleChange(field.name, value)}
            placeholder={field.placeholder}
            error={error}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={`
              w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200 resize-none
              ${error ? 'border-red-300 focus:ring-red-500' : ''}
            `}
            rows={4}
          />
        );

      case 'password':
        return (
          <div className="relative">
            <input
              type={showPassword[field.name] ? 'text' : 'password'}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={`
                w-full px-4 py-3 pr-12 border border-gray-200 dark:border-gray-600 rounded-xl
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200
                ${error ? 'border-red-300 focus:ring-red-500' : ''}
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => ({ ...prev, [field.name]: !prev[field.name] }))}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword[field.name] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={`
              w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200
              ${error ? 'border-red-300 focus:ring-red-500' : ''}
            `}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
          {errors[field.name] && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      <ModernButton
        type="submit"
        disabled={loading || Object.keys(errors).length > 0}
        loading={loading}
        className="w-full"
      >
        {submitText}
      </ModernButton>
    </form>
  );
};

export default ModernForm; 