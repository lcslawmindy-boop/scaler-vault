import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AssistantMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-2.5', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Bot className="w-3.5 h-3.5 text-primary" />
        </div>
      )}

      <div className={cn(
        'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
        isUser
          ? 'bg-primary text-primary-foreground rounded-tr-sm'
          : 'bg-secondary text-foreground rounded-tl-sm'
      )}>
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <ReactMarkdown
            className="prose prose-sm prose-invert max-w-none
              [&>p]:my-1 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0
              [&>ul]:my-1.5 [&>ul]:ml-4 [&>ul]:list-disc
              [&>ol]:my-1.5 [&>ol]:ml-4 [&>ol]:list-decimal
              [&>li]:my-0.5
              [&>h2]:text-sm [&>h2]:font-bold [&>h2]:mt-3 [&>h2]:mb-1
              [&>h3]:text-xs [&>h3]:font-semibold [&>h3]:mt-2 [&>h3]:mb-1
              [&>strong]:font-semibold [&>strong]:text-foreground
              [&>code]:bg-background/50 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs [&>code]:text-primary
              [&>pre]:bg-background/50 [&>pre]:p-3 [&>pre]:rounded-lg [&>pre]:my-2 [&>pre]:overflow-x-auto [&>pre]:text-xs"
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}