import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, Hammer, CheckCircle2, Search, ArrowRight } from 'lucide-react';

const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [searching, setSearching] = useState(false);
    const [status, setStatus] = useState<any>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearching(true);
        setTimeout(() => {
            setSearching(false);
            setStatus({
                id: orderId || "PL-2026-88XC",
                stage: 2, // 0 to 3
                lastUpdate: "Arrived at Saint John Distribution Center",
                estDelivery: "Feb 14, 2026"
            });
        }, 800);
    };

    const stages = [
        { name: "Blueprint Design", icon: <Hammer size={20} /> },
        { name: "Precision Build", icon: <Package size={20} /> },
        { name: "Transit to NB", icon: <Truck size={20} /> },
        { name: "Setup Complete", icon: <CheckCircle2 size={20} /> }
    ];

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Abstract DNA/Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]">Real-Time Monitoring</span>
                        <h2 className="text-5xl font-black text-white mt-4 leading-none tracking-tighter">Track Your <span className="text-slate-500">Structure</span></h2>
                        <p className="text-slate-400 mt-6 font-medium text-lg">Enter your PLACED order ID to see your build's live progress.</p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative mb-16">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter Order ID (e.g. PL-88XC)"
                            className="w-full bg-slate-900 border-2 border-slate-800 rounded-[2rem] py-8 px-10 text-xl font-bold text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-700"
                        />
                        <button className="absolute right-4 top-4 bottom-4 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
                            {searching ? 'Verifying...' : 'Track Build'}
                        </button>
                    </form>

                    {/* Progress Visualizer */}
                    <AnimatePresence>
                        {status && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[3rem] p-12 shadow-2xl"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                                    <div>
                                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Active Shipment</div>
                                        <div className="text-3xl font-black text-white leading-none">{status.id}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Est. Installation</div>
                                        <div className="text-3xl font-black text-blue-500 leading-none">{status.estDelivery}</div>
                                    </div>
                                </div>

                                <div className="relative">
                                    {/* Line */}
                                    <div className="absolute top-10 left-0 right-0 h-1 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(status.stage / (stages.length - 1)) * 100}%` }}
                                            className="h-full bg-blue-600 shadow-[0_0_20px_#2563eb]"
                                        />
                                    </div>

                                    {/* Stages */}
                                    <div className="relative flex justify-between">
                                        {stages.map((s, i) => (
                                            <div key={i} className="flex flex-col items-center gap-6">
                                                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all duration-700 relative z-10
                                                    ${i <= status.stage ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
                                                    {s.icon}
                                                </div>
                                                <div className={`text-center max-w-[80px] text-[10px] font-black uppercase tracking-widest leading-tight
                                                    ${i <= status.stage ? 'text-white' : 'text-slate-600'}`}>
                                                    {s.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-16 flex items-center gap-4 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    <p className="text-sm font-bold text-blue-300">Latest: {status.lastUpdate}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default OrderTracking;
