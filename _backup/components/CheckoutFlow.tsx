import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Shield, Truck, Package, CheckCircle2 } from 'lucide-react';

interface CheckoutProps {
    isOpen: boolean;
    onClose: () => void;
    spec: any;
    total: number;
}

const CheckoutFlow = ({ isOpen, onClose, spec, total }: CheckoutProps) => {
    const [step, setStep] = React.useState(1);
    const [success, setSuccess] = React.useState(false);

    const handleComplete = () => {
        setSuccess(true);
        setTimeout(() => {
            onClose();
            setSuccess(false);
            setStep(1);
        }, 3000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[4rem] overflow-hidden shadow-2xl z-10 min-h-[600px] flex flex-col md:flex-row"
                    >
                        {/* Left: Summary */}
                        <div className="w-full md:w-96 bg-slate-50 p-12 border-r border-slate-100 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Order Summary</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center group">
                                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{spec.size} {spec.style}</div>
                                        <div className="text-sm font-black text-slate-900">${spec.basePrice?.toLocaleString() || '4,500'}</div>
                                    </div>
                                    {Object.keys(spec.addons).map(key => {
                                        if (spec.addons[key]) return (
                                            <div key={key} className="flex justify-between items-center animate-fade-in">
                                                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{key}</div>
                                                <div className="text-xs font-bold text-emerald-600">Included</div>
                                            </div>
                                        )
                                        return null;
                                    })}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-200">
                                <div className="flex justify-between items-end mb-2">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Investment</div>
                                    <div className="text-4xl font-black text-slate-900 tracking-tighter">${total.toLocaleString()}</div>
                                </div>
                                <p className="text-[9px] font-bold text-slate-400 text-right uppercase tracking-widest">NB Local Taxes Included</p>
                            </div>
                        </div>

                        {/* Right: Interaction */}
                        <div className="flex-1 p-12 md:p-20 relative flex flex-col justify-center">
                            <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full transition-all">
                                <X size={20} className="text-slate-400" />
                            </button>

                            <AnimatePresence mode="wait">
                                {!success ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-10"
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            {[1, 2].map(i => (
                                                <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-600' : 'bg-slate-100'}`} />
                                            ))}
                                        </div>

                                        {step === 1 ? (
                                            <div className="space-y-8 animate-fade-in">
                                                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Installation Details</h2>
                                                <div className="space-y-5">
                                                    <input type="text" placeholder="NB Physical Address" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-900 focus:outline-none focus:border-blue-600" />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <input type="text" placeholder="Moncton" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-900 focus:outline-none focus:border-blue-600" />
                                                        <input type="text" placeholder="E1C 1A1" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-900 focus:outline-none focus:border-blue-600" />
                                                    </div>
                                                </div>
                                                <button onClick={() => setStep(2)} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all">
                                                    Continue to Payment
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-8 animate-fade-in">
                                                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Secure Payment</h2>
                                                <div className="p-6 border-2 border-blue-600/20 bg-blue-50/50 rounded-3xl flex items-center gap-4">
                                                    <CreditCard className="text-blue-600" />
                                                    <div className="flex-1">
                                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Smart-Sync Active</div>
                                                        <div className="text-sm font-bold text-slate-700">Encrypted Processing</div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <input type="text" placeholder="Card Information" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-900 focus:outline-none focus:border-blue-600" />
                                                </div>
                                                <div className="flex gap-4">
                                                    <button onClick={() => setStep(1)} className="flex-1 py-5 border-2 border-slate-100 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-400 hover:border-slate-200 transition-all">
                                                        Back
                                                    </button>
                                                    <button onClick={handleComplete} className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
                                                        Complete Order
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                                    <Shield size={12} /> SSL Secure Checkout Partner
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-8 py-20"
                                    >
                                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-10">
                                            <CheckCircle2 size={48} className="text-emerald-600" />
                                        </div>
                                        <h2 className="text-5xl font-black text-slate-900 tracking-tight">Order Launched!</h2>
                                        <p className="text-slate-500 font-medium max-w-sm mx-auto">Your design has been dispatched to our Saint John workshop. Check your email for tracking info.</p>
                                        <div className="pt-10 flex gap-10 opacity-30 justify-center">
                                            <Package size={24} />
                                            <Truck size={24} />
                                            <CheckCircle2 size={24} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CheckoutFlow;
