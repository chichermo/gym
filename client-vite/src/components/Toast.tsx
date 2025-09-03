import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

// Configuración global del toast
export const toastConfig = {
  duration: 4000,
  position: 'top-right' as const,
  style: {
    background: 'var(--toast-bg)',
    color: 'var(--toast-text)',
    border: '1px solid var(--toast-border)',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
};

// Funciones helper para diferentes tipos de toast
export const showSuccess = (message: string) => {
  return toast.success(message, {
    ...toastConfig,
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
  });
};

export const showError = (message: string) => {
  return toast.error(message, {
    ...toastConfig,
    icon: <XCircle className="w-5 h-5 text-red-500" />,
  });
};

export const showWarning = (message: string) => {
  return toast(message, {
    ...toastConfig,
    icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  });
};

export const showInfo = (message: string) => {
  return toast(message, {
    ...toastConfig,
    icon: <Info className="w-5 h-5 text-blue-500" />,
  });
};

// Componente Toaster personalizado
export const CustomToaster: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-text)',
          border: '1px solid var(--toast-border)',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        },
        success: {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        },
        error: {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
        },
      }}
    />
  );
};

export default CustomToaster; 