import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
    return (
        <section id="contact" className="py-40 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-start">

                    {/* Left: Info */}
                    <div>
                        <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">Direct Access</span>
                        <h2 className="text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mt-4 mb-12">Let's Build <br />The <span className="text-slate-300">Future</span></h2>

                        <div className="space-y-10 group">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 bg-slate-50 flex items-center justify-center rounded-2xl text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Our Craftsmen</div>
                                    <div className="text-2xl font-black text-slate-900">hello@placed.life</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 bg-slate-50 flex items-center justify-center rounded-2xl text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Immediate Inquiries</div>
                                    <div className="text-2xl font-black text-slate-900">1-800-PLACED-NB</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 bg-slate-50 flex items-center justify-center rounded-2xl text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Headquarters</div>
                                    <div className="text-2xl font-black text-slate-900 leading-tight">Saint John, NB <br />Canada, E2L 4K4</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 bg-slate-950 p-10 rounded-[3rem] text-white">
                            <h4 className="text-xl font-black mb-2">Book a Visual Design Session</h4>
                            <p className="text-slate-500 font-medium mb-8">Schedule a 15-min screen-share where we use the Nexus Engine together.</p>
                            <button className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all">
                                Reserve Slot
                            </button>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-slate-50 p-12 md:p-16 rounded-[4rem] shadow-2xl shadow-slate-100 border border-slate-100 relative">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl opacity-50"></div>

                        <form className="space-y-8 relative z-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-white border-2 border-slate-100 rounded-2xl py-5 px-6 font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                                    <input type="email" placeholder="john@company.com" className="w-full bg-white border-2 border-slate-100 rounded-2xl py-5 px-6 font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-all" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Service Required</label>
                                <select className="w-full bg-white border-2 border-slate-100 rounded-2xl py-5 px-6 font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-all appearance-none cursor-pointer">
                                    <option>Shed Builder Assistance</option>
                                    <option>Roofing Quote Request</option>
                                    <option>General Home Maintenance</option>
                                    <option>Order Status Check</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Project Details</label>
                                <textarea placeholder="Tell us about your home dreams..." rows={5} className="w-full bg-white border-2 border-slate-100 rounded-2xl py-5 px-6 font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-all"></textarea>
                            </div>

                            <button className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-black text-base uppercase tracking-widest shadow-2xl shadow-blue-500/20 flex gap-4 items-center justify-center group transition-all">
                                Dispatch Request <Send size={20} className="group-hover:translate-x-2 transition-transform" />
                            </button>

                            <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                By submitting you agree to our privacy framework.
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;
