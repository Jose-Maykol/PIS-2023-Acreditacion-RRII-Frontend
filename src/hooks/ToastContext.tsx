import React, { createContext, useContext, useState } from 'react';
import Toast from '@/components/Toast/Toast';


type ToastContextType = {
    showToast: (message: string, variant: 'info' | 'danger' | 'warning' | 'success' | 'default', autoClose?: boolean) => void;
};

type ToastState = {
    message: string;
    variant: 'info' | 'danger' | 'warning' | 'success' | 'default';
    autoClose?: boolean;
  };

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast debe ser utilizado dentro de un ToastProvider");
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toastState, setToastState] = useState<ToastState | null>(null);

  const showToast = (message: string, variant: 'info' | 'danger' | 'warning' | 'success' | 'default', autoClose: boolean = true) => {
    setToastState({message, variant, autoClose});
    if (autoClose) {
        setTimeout(() => {
          setToastState(null);
        }, 3000);
    }
  };

  const hideToast = () => {
    setToastState(null);
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      {toastState && <Toast message={toastState.message} variant={toastState.variant} autoClose={toastState.autoClose} onClose={hideToast} />}
    </ToastContext.Provider>
  );
};
