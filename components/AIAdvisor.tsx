import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, AlertCircle } from 'lucide-react';
import { getHairAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIAdvisor: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm your HairSphere expert. I can help diagnose your hair type, suggest products, or build a custom routine. Describe your hair texture and main concerns to get started!"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Safe check for API key presence to toggle UI state
  const hasApiKey = typeof process !== 'undefined' && process.env && process.env.API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Call Gemini API (or mock service)
    const responseText = await getHairAdvice(userMessage.text);

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] flex flex-col bg-white rounded-2xl shadow-sm border border-peach-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-peach-100 bg-peach-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-peach-300 flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-bold text-charcoal">HairSphere Expert</h2>
            <p className="text-xs text-softbrown">Powered by Gemini AI</p>
          </div>
        </div>
        <div className="text-xs text-peach-600 bg-peach-100 px-3 py-1 rounded-full font-medium">
          Beta
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                ${msg.role === 'user' ? 'bg-charcoal text-white' : 'bg-peach-100 text-peach-600'}`}
            >
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div 
              className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                ${msg.role === 'user' 
                  ? 'bg-charcoal text-white rounded-tr-none' 
                  : 'bg-peach-50 text-charcoal border border-peach-100 rounded-tl-none'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-peach-100 text-peach-600 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-peach-50 p-4 rounded-2xl rounded-tl-none border border-peach-100">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-peach-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-peach-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-peach-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-peach-100">
        {!hasApiKey && (
          <div className="mb-2 p-2 bg-peach-50 text-peach-700 text-xs rounded-lg border border-peach-200 flex items-center gap-2">
            <AlertCircle size={14} />
            <span>Demo Mode: Responses are simulated (No API Key detected).</span>
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="E.g., My hair is dry and breaks easily..."
            className="flex-1 px-4 py-3 rounded-xl border border-peach-200 focus:outline-none focus:ring-2 focus:ring-peach-300 bg-peach-50/30 text-charcoal placeholder-peach-300/70"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-peach-300 text-white p-3 rounded-xl hover:bg-peach-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-peach-200"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};