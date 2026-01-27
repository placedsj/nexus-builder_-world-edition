import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const SocialProof = () => {
    const testimonials = [
        {
            name: "Marc Leblanc",
            location: "Moncton, NB",
            text: "The Nexus Builder allowed me to visualize my studio before a single nail was driven. The precision is unmatched in the Maritimes.",
            rating: 5
        },
        {
            name: "Sarah Jenkins",
            location: "Saint John, NB",
            text: "Finally, a company that understands NB winters. My shed stayed bone-dry and solid through the February blizzards.",
            rating: 5
        },
        {
            name: "Paul Thompson",
            location: "Fredericton, NB",
            text: "I used the ROI calculator and realized I was wasting $200/mo on storage. Best investment I've made in years.",
            rating: 5
        }
    ];

    return (
        <section className="py-32 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">Testimonials</span>
                    <h2 className="text-6xl font-black text-slate-900 mt-4 leading-none tracking-tighter">Trusted Across the <span className="text-blue-600">Maritimes</span></h2>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 relative group"
                        >
                            <Quote className="absolute top-8 right-10 text-slate-100 w-16 h-16 group-hover:text-blue-50 transition-colors" />
                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="#fbbf24" className="text-amber-400" />
                                ))}
                            </div>
                            <p className="text-xl font-bold text-slate-700 leading-relaxed mb-8 relative z-10 italic">
                                "{t.text}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full"></div>
                                <div>
                                    <div className="font-black text-slate-900 leading-none mb-1">{t.name}</div>
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t.location}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Logos */}
                <div className="mt-24 pt-12 border-t border-slate-200">
                    <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-12">As Featured In & Partnered With</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                        {['NB Home Builders', 'Maritime Living', 'Precision Tech', 'Atlantic Supply'].map(logo => (
                            <span key={logo} className="text-2xl font-black tracking-tighter text-slate-900">{logo}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
