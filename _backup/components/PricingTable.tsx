import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, ArrowRight } from 'lucide-react';

const PricingTable = () => {
    const [billing, setBilling] = useState<'once' | 'sub'>('once');

    const tiers = [
        {
            name: "Standard",
            price: billing === 'once' ? "4,900" : "89",
            unit: billing === 'once' ? "" : "/mo",
            desc: "Essential storage for every backyard.",
            features: ["8x10 Footprint", "Standard Vinyl Siding", "HD Ramp Included", "5-Year Structural Warranty", "Basic Delivery"]
        },
        {
            name: "Premium",
            price: billing === 'once' ? "7,200" : "129",
            unit: billing === 'once' ? "" : "/mo",
            desc: "The professional choice for workshops.",
            popular: true,
            features: ["10x12 Footprint", "Premium Siding Options", "Insulated Windows", "Electric-Ready Pkg", "Free Local Setup"]
        },
        {
            name: "Studio",
            price: billing === 'once' ? "12,900" : "249",
            unit: billing === 'once' ? "" : "/mo",
            desc: "Boutique home-office performance.",
            features: ["12x16 Footprint", "Cedar Shingle Polish", "R-19 Performance Insulation", "Smart Climate Control", "Full Interior Finish"]
        }
    ];

    return (
        <section id="pricing" className="py-40 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                    <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs">2026 PRICING ENGINE</span>
                    <h2 className="text-7xl font-black text-slate-900 mt-4 leading-none tracking-tighter">Transparent <span className="text-slate-300">Investment</span></h2>

                    {/* Toggle */}
                    <div className="mt-12 inline-flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                        <button
                            onClick={() => setBilling('once')}
                            className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${billing === 'once' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            One-Time Purchase
                        </button>
                        <button
                            onClick={() => setBilling('sub')}
                            className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${billing === 'sub' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Subscription Packages
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative p-12 rounded-[3.5rem] border transition-all ${tier.popular ? 'border-orange-500 bg-slate-900 text-white shadow-2xl scale-105 z-10' : 'border-slate-100 bg-white text-slate-900 hover:border-blue-200'}`}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-10">
                                <h3 className={`text-2xl font-black mb-2 ${tier.popular ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                                <p className={`text-sm font-medium ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>{tier.desc}</p>
                            </div>

                            <div className="mb-12 flex items-baseline gap-2">
                                <span className="text-5xl font-black tracking-tighter">${tier.price}</span>
                                <span className={`text-sm font-bold uppercase tracking-widest ${tier.popular ? 'text-slate-500' : 'text-slate-300'}`}>{tier.unit}</span>
                            </div>

                            <ul className="space-y-5 mb-12">
                                {tier.features.map(f => (
                                    <li key={f} className="flex gap-3 items-center">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${tier.popular ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-50 text-blue-500'}`}>
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        <span className={`text-sm font-bold ${tier.popular ? 'text-slate-300' : 'text-slate-600'}`}>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all
                                ${tier.popular
                                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20'
                                    : 'bg-slate-900 hover:bg-black text-white'}`}>
                                Get Started <ArrowRight size={16} className="inline ml-2" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Info Footnote */}
                <div className="mt-20 flex justify-center">
                    <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-full border border-slate-100">
                        <Info size={14} className="text-blue-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">All prices include NB local taxes. Financing O.A.C.</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingTable;
