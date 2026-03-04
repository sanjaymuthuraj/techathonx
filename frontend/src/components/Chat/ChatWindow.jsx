import { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: 'bot', text: 'How can I assist your recovery today?' }]);

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput("");
    // Mock Response
    setTimeout(() => setMessages(prev => [...prev, { role: 'bot', text: "I've noted that. Keep resting and stay hydrated." }]), 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
          <MessageCircle size={28} />
        </button>
      ) : (
        <div className="w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
          <div className="bg-blue-600 p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-semibold">AI Care Assistant</span>
            </div>
            <X size={20} className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 shadow-sm border border-slate-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white border-t flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type a message..." />
            <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-full"><Send size={18} /></button>
          </div>
        </div>
      )}
    </div>
  );
}