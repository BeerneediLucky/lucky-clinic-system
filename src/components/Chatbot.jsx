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
            <div className="flex items-center justify-between bg-primary p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                    <Bot size={22} />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-primary bg-green-400"></span>
                </div>
                <div>
                  <h3 className="font-display font-bold leading-none text-sm">Lucky AI Assistant</h3>
                  <p className="mt-1 text-[10px] text-white/70 uppercase tracking-widest font-semibold">Online Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="rounded-lg p-1.5 hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                  title="Fullscreen"
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-[85%] items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      msg.role === "user" ? "bg-primary text-white" : "bg-white shadow-sm text-primary border border-primary/10"
                    }`}>
                      {msg.role === "user" ? "ME" : "AI"}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                        msg.role === "user" 
                          ? "bg-primary text-white rounded-tr-none" 
                          : msg.isError
                            ? "bg-red-50 text-red-700 border border-red-100 rounded-tl-none font-medium"
                            : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                      }`}>
                        {msg.content}
                      </div>
                      {msg.isError && (
                        <button 
                          onClick={() => handleSend(messages[messages.length - 2]?.content)}
                          className="text-[10px] text-primary font-bold hover:underline self-start ml-2"
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm border border-slate-100 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span className="text-slate-400 font-medium animate-pulse">Assistant is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && !isLoading && (
              <div className="px-4 py-2 flex flex-wrap gap-2 bg-slate-50/80">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-[11px] font-semibold bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 hover:text-primary px-3 py-1.5 rounded-full transition-all duration-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-slate-100 bg-white p-4">
              <div className="flex items-center gap-2 rounded-2xl bg-slate-100/50 border border-slate-200/50 p-1.5 pl-4 focus-within:border-primary/30 focus-within:bg-white focus-within:shadow-inner transition-all duration-200">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-slate-400 font-medium"
                />
                <div className="flex items-center">
                  <button 
                    onClick={toggleVoice}
                    className={`rounded-xl p-2 transition-all ${isListening ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'hover:bg-slate-200 text-slate-400'}`}
                    title="Voice Input"
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                  <button 
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="ml-1 rounded-xl bg-primary p-2.5 text-white hover:bg-primary/90 disabled:opacity-50 shadow-md shadow-primary/20 transition-all active:scale-95"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 px-1 justify-center opacity-60">
                <AlertCircle size={10} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">AI Assistant - Non-Diagnostic Only</span>
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
