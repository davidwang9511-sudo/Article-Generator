'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2 font-body">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl 
            bg-midnight-900/50 border border-midnight-700
            text-white placeholder-gray-500
            font-body text-base
            transition-all duration-200
            focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-400 font-body">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

