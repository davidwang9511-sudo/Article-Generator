'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
}

export function ProgressBar({ progress, showLabel = true }: ProgressBarProps) {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-400 font-body">Progress</span>
          <span className="text-sm font-semibold text-coral-400 font-mono">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-midnight-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-coral-500 via-coral-400 to-mint-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

