
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Bot, User, ChevronRight, RotateCcw, Ticket, MapPin, CreditCard, Coffee, Film } from 'lucide-react';
import { THEATRE_NAME } from '../../constants';
import { useData } from '../context/DataContext';

interface Message {
  role: 'bot' | 'user';
  text: string;
  options?: string[];
}

const Chatbot: React.FC = () => {
  const { chatbotOptions } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: `Namaste! Welcome to ${THEATRE_NAME} Support. How can I help you today?`,
      options: chatbotOptions.map(opt => opt.label)
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOptionClick = (optionLabel: string) => {
    if (optionLabel === 'Back to Menu') {
      setMessages(prev => [...prev, { role: 'user', text: optionLabel }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: "What else can I help you with?", 
          options: chatbotOptions.map(opt => opt.label) 
        }]);
      }, 400);
      return;
    }

    setMessages(prev => [...prev, { role: 'user', text: optionLabel }]);
    
    const matchedOption = chatbotOptions.find(opt => opt.label === optionLabel);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: matchedOption ? matchedOption.response : "I'm sorry, I don't have information on that.",
        options: ['Back to Menu']
      }]);
    }, 400);
  };

  const getIcon = (label: string) => {
    if (label.includes('Showing')) return <Film className="h-4 w-4" />;
    if (label.includes('Book')) return <Ticket className="h-4 w-4" />;
    if (label.includes('Pass')) return <CreditCard className="h-4 w-4" />;
    if (label.includes('Location')) return <MapPin className="h-4 w-4" />;
    if (label.includes('Snacks')) return <Coffee className="h-4 w-4" />;
    if (label === 'Back to Menu') return <RotateCcw className="h-4 w-4" />;
    return <ChevronRight className="h-4 w-4" />;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 border-2 ${
          isOpen ? 'bg-white text-black border-transparent' : 'bg-red-600 text-white border-red-500/50'
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[320px] md:w-[380px] h-[500px] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-red-600 to-red-900 p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">RK Assistant</h3>
                <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar bg-black/20">
            {messages.map((m, i) => (
              <div key={i} className="space-y-3">
                <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-red-600 text-white rounded-tr-none' 
                      : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                  }`}>
                    {m.text}
                  </div>
                </div>
                {m.role === 'bot' && m.options && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {m.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="flex items-center space-x-2 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/50 text-gray-300 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all transform active:scale-95"
                      >
                        {getIcon(opt)}
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 bg-white/5 border-t border-white/10 text-center">
            <p className="text-[10px] text-gray-500 font-medium">Radhakrishna Cinemax Support Team</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
