import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Loader2, ChevronDown, Sparkles } from 'lucide-react';
import AssistantMessage from './AssistantMessage';
import QuickPrompts from './QuickPrompts';

const SYSTEM_PROMPT = (buildsContext) => `You are an expert engineering assistant for Scalar Venture Vault — a premium platform for advanced engineering builds.

You help engineers:
1. Understand how to BUILD systems step-by-step
2. Break down COMPONENTS and BOMs (Bills of Materials)
3. Estimate COSTS accurately
4. Plan EXECUTION sequences from scratch to working prototype
5. Recommend NEXT BUILDS based on skill progression

Available builds in the vault:
${buildsContext}

Response rules:
- Be concise but technically precise
- Use bullet points and numbered steps for clarity
- Always include estimated costs when discussing components
- When recommending builds, reference actual vault builds by name
- For beginners: explain WHY each step matters
- For component questions: include part numbers if known, and where to source (Mouser, DigiKey, Amazon)
- Encourage curiosity — this is what separates real builders from theorists
- Format responses with clear sections using markdown (## headers, **bold**, \`code\`)
- Keep responses under 400 words unless a detailed breakdown is explicitly requested`;

function buildContext(builds) {
  if (!builds?.length) return 'No builds loaded yet.';
  return builds.map(b =>
    `• ${b.title} [${b.category}] — ${b.short_description} | Est. cost: $${b.estimated_build_cost || 'N/A'} | Tier: ${b.tier_required}`
  ).join('\n');
}

export default function EngineeringAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey — I'm your engineering assistant. Ask me how to build anything in the vault, break down a BOM, or figure out your next project.\n\n**What are you working on?**",
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);

  const { data: builds = [] } = useQuery({
    queryKey: ['builds-for-ai'],
    queryFn: () => base44.entities.Build.list('-created_date', 50),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      scrollToBottom();
    }
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
  };

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    const history = newMessages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n\n');

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `${SYSTEM_PROMPT(buildContext(builds))}\n\n---\nConversation so far:\n${history}\n\nAssistant:`,
    });

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClear = () => {
    setMessages([{
      role: 'assistant',
      content: "Fresh start. What do you want to build?",
    }]);
  };

  return (
    <>
      {/* ── Floating trigger button ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-2xl flex items-center justify-center glow-cyan-strong"
          >
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-background" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-5rem)] flex flex-col rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/90 backdrop-blur flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center glow-cyan">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none">Engineering Assistant</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg hover:bg-secondary transition-colors"
                >
                  Clear
                </button>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="w-8 h-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            >
              {messages.map((msg, i) => (
                <AssistantMessage key={i} message={msg} />
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-[72px] right-4 w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center shadow"
                >
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Quick prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex-shrink-0">
                <QuickPrompts onSelect={sendMessage} />
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-border/50 flex-shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about any build, component, or cost..."
                  rows={1}
                  className="flex-1 resize-none bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors min-h-[40px] max-h-[100px]"
                  style={{ height: 'auto' }}
                  onInput={e => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                  }}
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  size="icon"
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0 disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-center text-[10px] text-muted-foreground/40 mt-1.5">
                Powered by Scalar AI · Press Enter to send
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}