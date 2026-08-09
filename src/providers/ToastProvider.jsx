"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const api = useMemo(
    () => ({
      showToast(message, type = "success") {
        const id = crypto.randomUUID();
        setToasts((items) => [...items, { id, message, type }]);
        setTimeout(() => {
          setToasts((items) => items.filter((toast) => toast.id !== id));
        }, 3200);
      },
    }),
    []
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
      <Toaster position="top-right" />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}
