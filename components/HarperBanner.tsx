import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, ArrowUpRight } from 'lucide-react';

const HarperBanner = () => {
    return (
        <section className="py-20 px-6">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-[4rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 p-12 md:p-20 overflow-hidden shadow-2xl shadow-blue-500/20"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-blue-100 text-[10px] font-black uppercase tracking-widest mb-8 border border-white/20">
                                <Sparkles size={12} className="text-blue-300" />
                                Smart Support Ready
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                                Meet <span className="text-blue-200">Harper</span>—Your <br />AI Design Specialist
                            </h2>
                            <p className="text-xl text-blue-100/80 font-medium leading-relaxed mb-10 max-w-xl">
                                Stuck on sizing? Want to know about R-values? Harper is our custom-trained
                                expert ready to help you design your dream structure in seconds.
                            </p>
                            <button className="bg-white text-blue-700 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                                Start Chatting with Harper <ArrowUpRight size={18} />
                            </button>
                        </div>

                        <div className="relative">
                            <div className="w-64 h-64 md:w-80 md:h-80 bg-white/10 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                                <div className="text-8xl md:text-9xl animate-pulse">✨</div>
                            </div>
                            {/* Floating Stats */}
                            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Response Time</div>
                                    <div className="text-sm font-black text-slate-900 leading-none mt-1">&lt; 1 Second</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HarperBanner;
