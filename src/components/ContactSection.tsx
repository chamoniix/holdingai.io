"use client";

import { motion } from 'framer-motion';
import { MagneticButton } from './ui/MagneticButton';
import { useState } from 'react';
import { motionTokens } from '@/lib/design-system';
import LuxuryText from './ui/LuxuryText';

export default function ContactSection() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const inputClasses = "w-full bg-transparent border-b border-white/20 px-0 py-4 text-white text-xl md:text-2xl font-light placeholder:text-white/20 focus:outline-none focus:border-brand-neon transition-colors duration-300";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "5047e6e2-ede1-4dbe-a14b-54a7d333d0cd");

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
    <section className="relative py-40 bg-transparent overflow-hidden pointer-events-none z-10">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl pointer-events-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column: Text */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={motionTokens.presets.slideUp}
          >
            <LuxuryText as="h2" className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">
              READY TO BUILD?
            </LuxuryText>
            <p className="text-xl text-white/60 mb-12 max-w-md">
              Whether you need a massive enterprise platform or an award-winning mobile app, we are the partner you trust to deliver.
            </p>

            <div className="space-y-8 text-white/50">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-white mb-2">Email</p>
                <a href="mailto:info@holdingai.io" className="text-2xl hover:text-brand-neon transition-colors">info@holdingai.io</a>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-white mb-2">Phone</p>
                <a href="tel:+447537106967" className="text-2xl hover:text-brand-neon transition-colors">+44 7537 106967</a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            className="glass-panel p-8 md:p-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={motionTokens.presets.slideUp}
          >
            <form className="space-y-12" onSubmit={handleSubmit}>
              <div className="relative">
                <input 
                  name="name"
                  type="text" 
                  required
                  placeholder="Your Name" 
                  className={inputClasses}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-brand-neon"
                  initial={{ width: "0%" }}
                  animate={{ width: focusedField === 'name' ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="relative">
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="Email Address" 
                  className={inputClasses}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-brand-cyan"
                  initial={{ width: "0%" }}
                  animate={{ width: focusedField === 'email' ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="relative">
                <textarea 
                  name="message"
                  required
                  placeholder="Tell us about your project..." 
                  rows={4}
                  className={`${inputClasses} resize-none`}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />
                <motion.div 
                  className="absolute bottom-1 left-0 h-0.5 bg-brand-purple"
                  initial={{ width: "0%" }}
                  animate={{ width: focusedField === 'message' ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="pt-4 flex flex-col md:flex-row items-center gap-6 justify-start md:justify-end">
                {status === 'error' && (
                  <p className="text-red-400 text-sm">Something went wrong.</p>
                )}
                <button type="submit" disabled={status === 'submitting' || status === 'success'} className="w-full md:w-auto">
                  <MagneticButton className="group w-full md:w-auto">
                    <div className="relative overflow-hidden rounded-full p-[1px] w-full md:w-auto">
                      <span className="absolute inset-0 bg-gradient-to-r from-brand-neon to-brand-purple rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative bg-black px-12 py-4 rounded-full transition-transform duration-300 group-hover:scale-[0.98] w-full text-center">
                        <span className="text-lg font-bold text-white tracking-wide">
                          {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                        </span>
                      </div>
                    </div>
                  </MagneticButton>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
