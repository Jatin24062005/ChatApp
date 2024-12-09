import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  return (
    <div
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwnMessage
            ? 'bg-indigo-600 text-white'
            : 'bg-white border border-gray-200'
        }`}
      >
        <div className="flex items-baseline gap-2">
          <span
            className={`text-sm font-medium ${
              isOwnMessage ? 'text-indigo-100' : 'text-indigo-600'
            }`}
          >
            {message.sender}
          </span>
          <span
            className={`text-xs ${
              isOwnMessage ? 'text-indigo-200' : 'text-gray-400'
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className={`mt-1 ${isOwnMessage ? 'text-white' : 'text-gray-800'}`}>
          {message.content}
        </p>
      </div>
    </div>
  );
}