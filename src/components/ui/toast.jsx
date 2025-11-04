'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

export function useToast() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    if (message === '') {
      setToast({ show: false, message: '', type });
    } else {
      setToast({ show: true, message, type });
    }
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: toast.type });
  };

  return { toast, showToast, hideToast };
}

export function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, onClose]);

  if (!toast.show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in-0 slide-in-from-top-2">
      <div className={`
        bg-white rounded-lg shadow-lg border px-4 py-3 pr-8 flex items-center gap-3 min-w-[300px]
        ${toast.type === 'success' ? 'border-green-200' : 'border-red-200'}
      `}>
        {toast.type === 'success' ? (
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
        )}
        <span className={`
          text-sm font-medium
          ${toast.type === 'success' ? 'text-green-800' : 'text-red-800'}
        `}>
          {toast.message}
        </span>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

