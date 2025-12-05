'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Mic, Type, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { TranscriptEntry } from '@/types';

interface TranscriptPanelProps {
  transcript: TranscriptEntry[];
  topic: string;
}

export function TranscriptPanel({ transcript, topic }: TranscriptPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-4 group"
      >
        <div className="flex items-center gap-2 text-mint-400">
          <FileText className="w-5 h-5" />
          <span className="font-mono text-sm">Live Transcript</span>
          <span className="px-2 py-0.5 rounded-full bg-mint-500/20 text-mint-400 text-xs font-mono">
            {transcript.length} answers
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 0 : 180 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 group-hover:text-white transition-colors"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </motion.div>
      </button>

      {/* Transcript Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-2xl p-4 max-h-[60vh] overflow-y-auto">
              {transcript.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 font-body">
                    Your answers will appear here as you respond to questions.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {transcript.map((entry, index) => (
                      <motion.div
                        key={entry.questionId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="transcript-item"
                      >
                        {/* Question */}
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-6 h-6 rounded-full bg-midnight-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-mono text-gray-400">Q{index + 1}</span>
                          </div>
                          <p className="text-sm text-gray-400 font-body leading-relaxed">
                            {entry.question}
                          </p>
                        </div>
                        
                        {/* Answer */}
                        <div className="flex items-start gap-3 ml-9">
                          <div className="flex-shrink-0 mt-1">
                            {entry.mode === 'voice' ? (
                              <Mic className="w-3.5 h-3.5 text-coral-400" />
                            ) : (
                              <Type className="w-3.5 h-3.5 text-mint-400" />
                            )}
                          </div>
                          <p className="text-white font-body leading-relaxed text-sm">
                            {entry.answer}
                          </p>
                        </div>
                        
                        {/* Divider */}
                        {index < transcript.length - 1 && (
                          <div className="border-b border-midnight-700 mt-4" />
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

