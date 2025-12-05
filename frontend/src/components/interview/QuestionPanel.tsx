'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { InterviewQuestion, InputMode } from '@/types';
import { ModeToggle } from '@/components/ui/ModeToggle';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { VoiceRecorder } from './VoiceRecorder';
import { TextInput } from './TextInput';

interface QuestionPanelProps {
  question: InterviewQuestion | null;
  questionNumber: number;
  totalQuestions: number;
  progress: number;
  inputMode: InputMode;
  onModeChange: (mode: InputMode) => void;
  onAnswer: (answer: string) => void;
  topic: string;
}

export function QuestionPanel({
  question,
  questionNumber,
  totalQuestions,
  progress,
  inputMode,
  onModeChange,
  onAnswer,
  topic,
}: QuestionPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-coral-400 mb-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-mono text-sm">Interview on {topic}</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Question Card */}
      <div className="glass rounded-2xl p-6 md:p-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-mono text-gray-400">
            Question {questionNumber} of {totalQuestions}
          </span>
          <ModeToggle mode={inputMode} onChange={onModeChange} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl md:text-2xl font-display font-semibold text-white leading-relaxed">
              {question?.question}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="glass rounded-2xl p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={inputMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {inputMode === 'voice' ? (
              <VoiceRecorder onTranscription={onAnswer} />
            ) : (
              <TextInput onSubmit={onAnswer} placeholder="Share your thoughts on this question..." />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

