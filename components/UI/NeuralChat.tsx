import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Message {
    id: string;
    sender: 'USER' | 'SYSTEM';
    text: string;
    timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: 'init-1',
        sender: 'SYSTEM',
        text: 'LUMA_NEURAL_LINK // V.4.2 ONLINE.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
        id: 'init-2',
        sender: 'SYSTEM',
        text: 'Identity verified. How can the grid assist you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
];

const NeuralChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // UI State for "Ghost Mode"
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    // Open/Close Animation
    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
            );
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Footer Detection Logic (Hide HUD when reaching footer)
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const footerThreshold = 100; // px from bottom

            if (documentHeight - scrollPosition < footerThreshold) {
                setIsFooterVisible(true);
            } else {
                setIsFooterVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            sender: 'USER',
            text: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            const responses = [
                "Processing request through quantum node...",
                "Accessing encrypted archives...",
                "Grid load optimized. Please specify parameters.",
                "Connecting you to a Level 5 specialist."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const newSysMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'SYSTEM',
                text: randomResponse,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, newSysMsg]);
            setIsTyping(false);
        }, 1500);
    };

    // Global Visibility Class (Ghost Mode)
    // - Hidden when footer is visible
    // - Low opacity (30%) when idle
    // - Full opacity (100%) when hovered or open
    const visibilityClass = isFooterVisible
        ? 'translate-y-32 opacity-0' // Hide completely below screen
        : (isOpen || isHovered) ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-40 hover:opacity-100';

    return (
        <div
            className={`pointer-events-none fixed bottom-0 left-0 w-full h-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            {/* --- LEFT HUD: SECURE UPLINK (WHATSAPP) --- */}
            {/* HIDDEN ON MOBILE (md:flex) to prevent clutter */}
            <div className={`absolute bottom-8 left-8 pointer-events-auto hidden md:flex items-center justify-center transition-all duration-500 ${visibilityClass}`}>
                <a
                    href="https://wa.me/905555555555"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 relative overflow-hidden shadow-lg"
                    aria-label="Contact via WhatsApp"
                >
                    {/* Technical Corners */}
                    <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/30 group-hover:border-[#25D366] transition-colors"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/30 group-hover:border-[#25D366] transition-colors"></div>

                    {/* Icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-[#25D366] transition-colors duration-300">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>

                    {/* Hover Label */}
                    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 backdrop-blur border border-white/10 rounded text-[9px] font-mono text-[#25D366] uppercase tracking-widest opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                        SECURE_UPLINK
                    </div>
                </a>
            </div>

            {/* --- RIGHT HUD: NEURAL LINK (CHATBOT) --- */}
            <div className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col items-end gap-6 pointer-events-auto transition-all duration-500 ${visibilityClass}`}>

                {/* Chat Window */}
                {isOpen && (
                    <div
                        ref={containerRef}
                        className="w-[90vw] md:w-[380px] h-[450px] md:h-[500px] bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden flex flex-col relative mb-4"
                    >
                        {/* Decorative Corner Borders */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#2997FF]"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#2997FF]"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#2997FF]"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2997FF]"></div>

                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/40 relative z-10">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-[#2997FF] rounded-full animate-pulse"></div>
                                <span className="font-mono text-[10px] text-gray-300 tracking-widest uppercase">LUMA_NET</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-white transition-colors text-[10px] uppercase tracking-widest"
                            >
                                CLOSE
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 scrollbar-hide">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${msg.sender === 'USER' ? 'items-end' : 'items-start'}`}
                                >
                                    <div className={`max-w-[85%] p-3 text-xs leading-relaxed border backdrop-blur-sm rounded-sm ${msg.sender === 'USER'
                                            ? 'bg-white/5 border-white/20 text-white'
                                            : 'bg-[#2997FF]/5 border-[#2997FF]/20 text-gray-300 font-mono'
                                        }`}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[8px] text-gray-700 mt-1 font-mono uppercase tracking-widest">
                                        {msg.sender === 'USER' ? 'TX' : 'RX'} // {msg.timestamp}
                                    </span>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-start">
                                    <div className="bg-[#2997FF]/5 border border-[#2997FF]/10 p-2 rounded-sm">
                                        <div className="flex gap-1">
                                            <span className="w-0.5 h-0.5 bg-[#2997FF] animate-pulse"></span>
                                            <span className="w-0.5 h-0.5 bg-[#2997FF] animate-pulse delay-100"></span>
                                            <span className="w-0.5 h-0.5 bg-[#2997FF] animate-pulse delay-200"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/40 relative z-10">
                            <div className="relative flex items-center bg-white/5 border border-white/10 rounded px-3 py-2">
                                <span className="text-[#2997FF] font-mono mr-2 text-xs">{'>'}</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Execute command..."
                                    className="w-full bg-transparent border-none text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-0 font-mono"
                                />
                            </div>
                        </form>
                    </div>
                )}

                {/* Main Trigger Button (Smaller & Cleaner) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-12 h-12 md:w-14 md:h-14 group outline-none"
                    aria-label="Open Neural Link"
                >
                    {/* Outer Ring */}
                    <div className={`absolute inset-0 border border-dashed border-gray-700 rounded-full transition-all duration-700 ${isOpen ? 'rotate-180 border-[#2997FF] scale-110' : 'animate-[spin_10s_linear_infinite] group-hover:border-gray-500'}`}></div>

                    {/* Inner Core */}
                    <div className={`absolute inset-1.5 rounded-full backdrop-blur-md border transition-all duration-500 flex items-center justify-center overflow-hidden ${isOpen
                            ? 'bg-[#2997FF] border-[#2997FF] shadow-[0_0_20px_rgba(41,151,255,0.3)]'
                            : 'bg-black/60 border-white/10 group-hover:border-[#2997FF]/50 group-hover:bg-[#2997FF]/10'
                        }`}>
                        {isOpen ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400 group-hover:text-[#2997FF] transition-colors">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.5"></path>
                            </svg>
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
};

export default NeuralChat;
