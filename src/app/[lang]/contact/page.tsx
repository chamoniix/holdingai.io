'use client';
import { useState } from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { lang, dict } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    // Add Web3Forms Access Key here (User needs to add this to .env.local)
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };
  
  return (
    <main className="w-full min-h-screen bg-transparent pt-32 md:pt-40 px-6 relative z-10 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
          {dict.contact?.title || "Let's Build"}
        </h1>
        <p className="text-xl text-[#86868B] font-light">
          {dict.contact?.description}
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-xl"
      >
        <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 flex flex-col gap-8 rounded-3xl relative overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl shadow-black/50">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2997FF] to-[#BF5AF2] opacity-50" />
          
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold tracking-[0.2em] text-[#86868B] uppercase">{dict.contact?.nameLabel || "Name"}</label>
            <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2997FF] focus:bg-white/10 transition-all placeholder:text-white/20" placeholder="John Doe" />
          </div>
          
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold tracking-[0.2em] text-[#86868B] uppercase">{dict.contact?.emailLabel || "Email"}</label>
            <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2997FF] focus:bg-white/10 transition-all placeholder:text-white/20" placeholder="john@company.com" />
          </div>
          
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold tracking-[0.2em] text-[#86868B] uppercase">{dict.contact?.messageLabel || "Message"}</label>
            <textarea name="message" required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2997FF] focus:bg-white/10 transition-all resize-none placeholder:text-white/20" placeholder="Tell us about your project..."></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={status === 'submitting' || status === 'success'}
            className="w-full mt-4 bg-white text-black font-bold py-5 rounded-xl hover:scale-[0.98] transition-transform flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending...' : 
             status === 'success' ? 'Message Sent!' : 
             (dict.contact?.submit || "Submit")}
          </button>
          
          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">Something went wrong. Please try again or email us directly.</p>
          )}
        </form>
      </motion.div>
    </main>
  );
}