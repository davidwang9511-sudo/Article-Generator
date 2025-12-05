'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface TopicFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

export function TopicForm({ onSubmit, isLoading }: TopicFormProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic.trim());
    }
  };

  const suggestions = [
    'Artificial Intelligence',
    'Remote Work Culture',
    'Sustainable Technology',
    'Digital Marketing',
    'Startup Growth',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-coral-500 to-coral-600 mb-6 shadow-lg shadow-coral-500/30"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          What would you like to discuss?
        </h2>
        <p className="text-gray-400 font-body text-lg">
          Enter a topic and we&apos;ll generate personalized interview questions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass rounded-2xl p-6">
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Web Development, Leadership, Climate Change..."
            className="text-lg py-4"
            disabled={isLoading}
          />
          
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-3 font-body">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setTopic(suggestion)}
                  className="px-3 py-1.5 rounded-lg bg-midnight-800 text-gray-300 text-sm font-body
                           hover:bg-midnight-700 hover:text-white transition-colors duration-200
                           border border-midnight-700 hover:border-midnight-600"
                  disabled={isLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={!topic.trim() || isLoading}
          loading={isLoading}
          className="w-full"
        >
          Generate Questions
          <ArrowRight className="w-5 h-5" />
        </Button>
      </form>
    </motion.div>
  );
}

