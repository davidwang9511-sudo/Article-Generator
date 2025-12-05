'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';

interface TextInputProps {
  onSubmit: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function TextInput({ onSubmit, disabled = false, placeholder = 'Type your answer...' }: TextInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={4}
        className="text-base"
      />
      
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 font-body">
          Press Ctrl+Enter to submit
        </p>
        <Button
          type="submit"
          disabled={!text.trim() || disabled}
          size="sm"
        >
          Submit Answer
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}

