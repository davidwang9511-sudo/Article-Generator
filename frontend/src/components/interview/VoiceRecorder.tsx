'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  disabled?: boolean;
}

export function VoiceRecorder({ onTranscription, disabled = false }: VoiceRecorderProps) {
  const [transcribedText, setTranscribedText] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const {
    isRecording,
    isProcessing,
    setIsProcessing,
    audioLevel,
    duration,
    startRecording,
    stopRecording,
  } = useVoiceRecording({
    onError: setError,
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleRecording = useCallback(async () => {
    if (isRecording) {
      setIsProcessing(true);
      setError(null);
      
      try {
        const audioBase64 = await stopRecording();
        
        if (audioBase64) {
          const result = await api.transcribeAudio(audioBase64);
          setTranscribedText(result.text);
        }
      } catch (err) {
        setError('Failed to transcribe audio. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    } else {
      setTranscribedText('');
      setError(null);
      await startRecording();
    }
  }, [isRecording, startRecording, stopRecording, setIsProcessing]);

  const handleSubmit = () => {
    if (transcribedText.trim()) {
      onTranscription(transcribedText.trim());
      setTranscribedText('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        {/* Recording Button */}
        <div className="relative">
          {/* Pulse rings when recording */}
          <AnimatePresence>
            {isRecording && (
              <>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-coral-500"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  className="absolute inset-0 rounded-full bg-coral-500"
                />
              </>
            )}
          </AnimatePresence>
          
          <motion.button
            type="button"
            onClick={handleToggleRecording}
            disabled={disabled || isProcessing}
            whileTap={{ scale: 0.95 }}
            className={`
              relative z-10 w-20 h-20 rounded-full flex items-center justify-center
              transition-all duration-300 shadow-lg
              ${isRecording 
                ? 'bg-coral-500 shadow-coral-500/50' 
                : 'bg-midnight-800 border-2 border-midnight-600 hover:border-coral-500 hover:shadow-coral-500/20'
              }
              ${disabled || isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {isProcessing ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : isRecording ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-gray-300" />
            )}
          </motion.button>
        </div>

        {/* Recording Status */}
        <div className="mt-4 text-center">
          {isRecording ? (
            <div className="space-y-2">
              <p className="text-coral-400 font-medium font-body animate-pulse">
                Recording...
              </p>
              <p className="text-2xl font-mono text-white">
                {formatDuration(duration)}
              </p>
              {/* Audio Level Indicator */}
              <div className="flex items-center justify-center gap-1 h-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-coral-500 rounded-full"
                    animate={{
                      height: audioLevel > (i + 1) * 0.15 ? 16 + audioLevel * 20 : 6,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                ))}
              </div>
            </div>
          ) : isProcessing ? (
            <p className="text-gray-400 font-body">Processing audio...</p>
          ) : (
            <p className="text-gray-500 font-body">
              Click to start recording
            </p>
          )}
        </div>
      </div>

      {/* Transcribed Text Preview */}
      <AnimatePresence>
        {transcribedText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-xl p-4"
          >
            <p className="text-sm text-gray-400 mb-2 font-body">Transcribed:</p>
            <p className="text-white font-body">{transcribedText}</p>
            
            <div className="flex justify-end mt-4">
              <Button onClick={handleSubmit} size="sm">
                Submit Answer
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-sm text-center font-body"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

