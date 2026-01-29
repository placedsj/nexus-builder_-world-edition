import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, ArrowUpRight } from 'lucide-react';

const LUNAIBanner = () => {
    return (
        <section className="py-20 px-6">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-[4rem] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 p-12 md:p-20 overflow-hidden shadow-2xl shadow-blue-500/10 border border-white/5"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-blue-200 text-[10px] font-black uppercase tracking-widest mb-8 border border-white/10">
                                <Sparkles size={12} className="text-blue-400" />
                                LUNAI v7.2 Active
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
                                ARCHITECTURAL <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">INTELLIGENCE.</span>
                            </h2>
                            <p className="text-xl text-white/60 font-medium leading-relaxed mb-10 max-w-xl">
                                Meet LUNAI—Your custom-trained Architect Core. From load factor simulations
                                to parametric optimization, LUNAI ensures your PLACED asset is engineered to perfection.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/40 hover:scale-105 transition-all flex items-center gap-3">
                                    Initialize LUNAI <ArrowUpRight size={18} />
                                </button>
                                <button className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                                    View Specs
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="w-64 h-64 md:w-80 md:h-80 bg-white/5 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <img
                                    src="/placed_logo_wall.jpg"
                                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 relative z-10"
                                    alt="LUNAI Core"
                                />
                                <div className="absolute inset-0 border-2 border-dashed border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                            </div>

                            {/* Floating Tech Badges */}
                            <div className="absolute -top-4 -right-4 glass p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float animation-delay-500">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <div className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">Simulation Speed</div>
                                    <div className="text-sm font-black text-white leading-none mt-1">Real-time</div>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float">
                                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <div className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">Accuracy Rate</div>
                                    <div className="text-sm font-black text-white leading-none mt-1">99.98%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LUNAIBanner;
