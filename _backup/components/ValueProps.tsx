import React from 'react';
import { ShieldCheck, Zap, TrendingUp, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const ValueProps = () => {
    const props = [
        {
            icon: <MapPin className="text-orange-500" />,
            title: "Atlantic Craftsmanship",
            desc: "Precision-built in New Brunswick for the rugged Atlantic climate."
        },
        {
            icon: <ShieldCheck className="text-blue-500" />,
            title: "Precision Engineering",
            desc: "Structurally verified designs that exceed local building codes."
        },
        {
            icon: <Zap className="text-amber-500" />,
            title: "Rapid Deployment",
            desc: "From final blueprint to backyard delivery in under 14 days."
        },
        {
            icon: <TrendingUp className="text-emerald-500" />,
            title: "Guaranteed ROI",
            desc: "Our structures add significant appraised value to your property."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {props.map((prop, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-100 transition-all group"
                        >
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                {prop.icon}
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
                                {prop.title}
                            </h3>
                            <p className="text-slate-500 font-medium leading-relaxed text-sm">
                                {prop.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValueProps;
