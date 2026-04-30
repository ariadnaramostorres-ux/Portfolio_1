import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { chatWithAI, getGreeting } from '../lib/localAI';

interface Message {
  text: string;
  type: 'bot' | 'user';
}

interface ChatbotDemoProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  context: string;
}

// Componente para efecto de escritura en mensajes del bot
function TypingMessage({ text, delay = 200 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 15); // Velocidad ultra-rápida (antes 200ms, ahora 15ms)
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, delay]);

  return (
    <span>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.4, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

export default function ChatbotDemo({ isOpen, onClose, title, context }: ChatbotDemoProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevTitleRef = useRef<string>('');

  useEffect(() => {
    if (context !== prevTitleRef.current) {
      setMessages([]);
      setInput('');
      setIsTyping(false);
      prevTitleRef.current = context;
    }
  }, [context]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: getGreeting(context),
          type: 'bot',
        },
      ]);
    }
  }, [isOpen, context, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMsg, type: 'user' }]);
    setIsTyping(true);

    const botResponse = await chatWithAI(userMsg, context);
    
    setMessages((prev) => [...prev, { text: botResponse, type: 'bot' }]);
    setIsTyping(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-surface-container rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[600px]"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-surface-container-high/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-secondary flex items-center justify-center text-background">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{title}</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] text-white/50 font-medium tracking-wide uppercase">Asistente Inteligente</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 neural-grid scroll-smooth"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`chat-bubble ${msg.type}`}
                >
                  {msg.type === 'bot' ? (
                    <TypingMessage text={msg.text} delay={i === 0 ? 500 : 200} />
                  ) : (
                    msg.text
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="chat-bubble bot flex items-center gap-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 size={16} className="text-primary" />
                  </motion.div>
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Procesando con IA...
                  </motion.span>
                  <motion.div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-surface-container-high/80 border-t border-white/5 backdrop-blur-sm">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-white/20"
                />
                <button
                  type="submit"
                  disabled={isTyping}
                  className="bg-primary text-background w-12 h-12 flex items-center justify-center rounded-lg font-bold hover:brightness-110 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
