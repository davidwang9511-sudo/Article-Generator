'use client';

import { motion } from 'framer-motion';
import { Mic, Type } from 'lucide-react';
import { InputMode } from '@/types';

interface ModeToggleProps {
  mode: InputMode;
  onChange: (mode: InputMode) => void;
  disabled?: boolean;
}

export function ModeToggle({ mode, onChange, disabled = false }: ModeToggleProps) {
  return (
    <div className={`relative flex items-center p-1 rounded-full bg-midnight-900 border border-midnight-700 ${disabled ? 'opacity-50' : ''}`}>
      <motion.div
        className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-coral-500 to-coral-600"
        initial={false}
        animate={{
          left: mode === 'voice' ? '4px' : '50%',
          width: 'calc(50% - 8px)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      
      <button
        type="button"
        onClick={() => !disabled && onChange('voice')}
        disabled={disabled}
        className={`
          relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
          transition-colors duration-200
          ${mode === 'voice' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <Mic className="w-4 h-4" />
        Voice
      </button>
      
      <button
        type="button"
        onClick={() => !disabled && onChange('text')}
        disabled={disabled}
        className={`
          relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
          transition-colors duration-200
          ${mode === 'text' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <Type className="w-4 h-4" />
        Text
      </button>
    </div>
  );
}

