import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, X, Send, Mic, MicOff, 
  User, Bot, Loader2, Maximize2, Minimize2, 
  ChevronRight, Sparkles, AlertCircle 
} from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! I'm Dr. Lucky's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: text,
          history: messages.slice(-10).map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      
      if (response.ok && data.reply) {
        setMessages(prev => [...prev, { role: "bot", content: data.reply }]);
      } else {
        // Specific error handling based on backend response
        const errorMsg = data.error || "Failed to get a response from the assistant.";
        console.error("Chat API Error:", errorMsg);
        setMessages(prev => [...prev, { 
          role: "bot", 
          content: `⚠️ ${errorMsg}`,
          isError: true 
        }]);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: "📡 Connection lost. Please check if the clinic server is running and try again.",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const quickReplies = [
    "Book an Appointment",
    "Clinic Timings",
    "Services Offered",
    "Emergency Contact"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              width: isFullscreen ? "90vw" : "380px",
              height: isFullscreen ? "80vh" : "550px",
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`pointer-events-auto mb-4 flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-white shadow-2xl transition-all duration-300 ${isFullscreen ? 'fixed inset-x-0 top-10 mx-auto' : ''}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-primary to-blue-600 p-5 text-white">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner">
                    <Bot size={26} className="animate-float" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 shadow-sm"></span>
                </div>
                <div>
                  <h3 className="font-display font-black leading-tight text-lg tracking-tight">Lucky AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-white/60 animate-pulse"></div>
                    <p className="text-[10px] text-white/80 uppercase tracking-widest font-bold">Medical Assistant</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="rounded-xl p-2 hover:bg-white/10 transition-all text-white/80 hover:text-white"
                >
                  {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl p-2 hover:bg-white/10 transition-all text-white/80 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/80 scrollbar-hide">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-[90%] items-end gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[10px] font-black tracking-tighter ${
                      msg.role === "user" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white shadow-md text-primary border border-slate-100"
                    }`}>
                      {msg.role === "user" ? "YOU" : "BOT"}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className={`rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                        msg.role === "user" 
                          ? "bg-primary text-white rounded-br-none font-medium" 
                          : msg.isError
                            ? "bg-red-50 text-red-700 border border-red-100 rounded-bl-none font-bold"
                            : "bg-white text-slate-700 rounded-bl-none border border-slate-200/50 font-medium"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm border border-slate-100 shadow-sm">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                    <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Processing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && !isLoading && (
              <div className="px-6 py-3 flex flex-wrap gap-2 bg-white/50 backdrop-blur-sm border-t border-slate-100">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-[10px] font-black uppercase tracking-wider bg-white border border-slate-200 hover:border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-sm"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="bg-white p-5 border-t border-slate-100">
              <div className="flex items-center gap-2 rounded-[1.5rem] bg-slate-50 border border-slate-200/60 p-2 pl-5 focus-within:border-primary/40 focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-primary/5 transition-all duration-300">
                <input
                  type="text"
                  placeholder="Ask about treatments, fees..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400 font-bold text-slate-700"
                />
                <div className="flex items-center gap-1">
                  <button 
                    onClick={toggleVoice}
                    className={`rounded-xl p-2.5 transition-all ${isListening ? 'bg-red-500 text-white shadow-lg animate-pulse' : 'hover:bg-slate-200 text-slate-400'}`}
                  >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                  <button 
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="rounded-xl bg-primary p-3 text-white hover:bg-blue-600 disabled:opacity-30 shadow-lg shadow-primary/20 transition-all active:scale-90"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 px-1 justify-center">
                <ShieldAlert size={12} className="text-amber-500" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Medical Disclaimer: No Diagnosis Provided</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl transition-all duration-500 ${
          isOpen ? 'bg-white text-primary ring-1 ring-slate-100' : 'bg-primary text-white hover:shadow-primary/30'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <Sparkles size={28} className="absolute -top-3 -right-3 text-accent animate-pulse" />
              <MessageSquare size={30} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-primary"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default Chatbot;
