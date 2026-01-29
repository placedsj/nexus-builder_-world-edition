import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertTriangle,
    Activity,
    ShieldAlert,
    Scale,
    FileText,
    Clock,
    TrendingDown,
    TrendingUp,
    CheckCircle2,
    Calendar,
    ChevronRight,
    Search,
    Zap
} from 'lucide-react';

interface MedicalTruthHUDProps {
    onClose?: () => void;
}

interface EvidencePillar {
    id: string;
    title: string;
    dateRange: string;
    status: 'critical' | 'warning' | 'resolved';
    impact: number; // 0-100
    description: string;
    findings: string[];
    technicalData: {
        label: string;
        value: string;
        trend: 'down' | 'up' | 'stable';
    }[];
}

const MedicalTruthHUD: React.FC<MedicalTruthHUDProps> = ({ onClose }) => {
    const [selectedPillar, setSelectedPillar] = useState<string | null>('crisis');
    const [isScanning, setIsScanning] = useState(false);

    const pillars: EvidencePillar[] = [
        {
            id: 'crisis',
            title: 'Initial Crisis Event',
            dateRange: 'December 16, 2024',
            status: 'critical',
            impact: 98,
            description: 'The "Auden Incident" marks the baseline for medical negligence. Systemic failure to recognize acute respiratory distress during the hand-off window.',
            findings: [
                'Documented wheeze and respiratory distress at 17:30.',
                'Failure of secondary parent to administer prescribed rescue inhaler.',
                'Critical delay in seeking professional medical evaluation (4+ hours).',
                'ER triage records verify "Acute Exacerbation" upon arrival.'
            ],
            technicalData: [
                { label: 'O2 Saturation', value: '88%', trend: 'down' },
                { label: 'Respiratory Rate', value: '42 bpm', trend: 'up' },
                { label: 'Time to Med', value: '240m delay', trend: 'stable' }
            ]
        },
        {
            id: 'neglect',
            title: 'Systematic Neglect Window',
            dateRange: 'Jan - June 2025',
            status: 'critical',
            impact: 92,
            description: 'A prolonged period of preventative maintenance failure. 42 individual missed doses of daily controller medication documented via sensor telemetry.',
            findings: [
                'Inconsistent inhaler logging in the Transition Summary.',
                'Refusal to follow the Pediatric Asthma Action Plan.',
                'Exposure to documented environmental triggers (pet dander/smoke).',
                'Unexplained "wellness gap" in the custodial communication log.'
            ],
            technicalData: [
                { label: 'Adherence Rate', value: '42%', trend: 'down' },
                { label: 'Exacerbation Count', value: '4 Major', trend: 'up' },
                { label: 'Compliance Gap', value: '180 Days', trend: 'stable' }
            ]
        },
        {
            id: 'assault',
            title: 'Toxicological Assault',
            dateRange: 'July 2025',
            status: 'critical',
            impact: 100,
            description: 'Intentional administration of a contra-indicated substance. The technical summary confirms the presence of sedative residuals not prescribed by the attending physician.',
            findings: [
                'Toxicology report confirms trace benzodiazepine exposure.',
                'Symptoms: Extreme lethargy, shallow breathing, delayed motor response.',
                'Coincides with the "Hidden Cam" footage of the July 12th transition.',
                'Categorized as "Assault with Intent to Subdue" in the Master Index.'
            ],
            technicalData: [
                { label: 'Tox Score', value: 'Positive', trend: 'up' },
                { label: 'Motor Function', value: '-60%', trend: 'down' },
                { label: 'Risk to Life', value: 'Extreme', trend: 'up' }
            ]
        },
        {
            id: 'sovereignty',
            title: 'Parental Sovereignty',
            dateRange: 'Aug - Sept 2025',
            status: 'resolved',
            impact: 15,
            description: 'Stabilization phase. Direct intervention and medical custody shift resulted in 100% adherence and zero respiratory events.',
            findings: [
                'Full implementation of LUNAI Health Monitoring.',
                '100% medication adherence (verifiable via SmartTether).',
                'Optimization of environmental conditions in the Primary Residence.',
                'Restoration of the Child\'s baseline physical activity levels.'
            ],
            technicalData: [
                { label: 'O2 Saturation', value: '99%', trend: 'up' },
                { label: 'Adherence', value: '100%', trend: 'up' },
                { label: 'Event Count', value: '0', trend: 'down' }
            ]
        }
    ];

    const currentPillar = useMemo(() =>
        pillars.find(p => p.id === selectedPillar) || pillars[0]
        , [selectedPillar]);

    const runScan = () => {
        setIsScanning(true);
        setTimeout(() => setIsScanning(false), 2000);
    };

    return (
        <div className="w-full bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-red-500/30 overflow-y-auto no-scrollbar">
            {/* Header / Identity Layer */}
            <div className="max-w-7xl mx-auto px-8 pt-12 pb-16">
                <div className="flex justify-between items-start mb-12">
                    <div className="flex items-center gap-8">
                        <div className="w-24 h-24 rounded-[2rem] glass p-1 border-red-500/20 overflow-hidden shrink-0 relative">
                            <img src="/brain/d00a1654-b7a4-4b43-a697-b3a763181613/lunai_avatar_core_1769653578022.png" className="w-full h-full object-cover grayscale brightness-75 animate-pulse" alt="LUNAI Justice" />
                            <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay"></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500 underline decoration-red-500/30 underline-offset-4">LUNAI Justice Engine v1.0</span>
                                <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-[8px] font-black uppercase border border-red-500/20">Active Discovery</span>
                            </div>
                            <h1 className="text-7xl font-black tracking-tighter uppercase mb-4">Medical <span className="text-white/20">Truth.</span></h1>
                            <p className="text-slate-400 max-w-2xl text-lg font-medium leading-relaxed">
                                Evidentiary timeline of medical neglect and toxicological interference. Structural integrity analysis of parental care-giving protocols.
                            </p>
                        </div>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-all">← Back to Ops</button>
                    )}
                </div>

                {/* Master Impact HUD */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
                    <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                            <Scale className="w-64 h-64 text-red-500" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-red-500/10 rounded-2xl">
                                    <Activity className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight">Timeline of Exposure</h3>
                            </div>

                            <div className="flex gap-4 mb-12">
                                {pillars.map((pillar) => (
                                    <button
                                        key={pillar.id}
                                        onClick={() => { setSelectedPillar(pillar.id); runScan(); }}
                                        className={`flex-1 p-6 rounded-[2rem] border-2 transition-all text-left relative overflow-hidden ${selectedPillar === pillar.id
                                                ? 'border-red-500 bg-red-500/10 shadow-2xl shadow-red-900/20'
                                                : 'border-white/5 bg-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{pillar.dateRange}</div>
                                        <div className="text-lg font-black leading-tight mb-2">{pillar.title}</div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pillar.impact}%` }}
                                                    className={`h-full ${pillar.status === 'resolved' ? 'bg-emerald-500' : 'bg-red-500'}`}
                                                />
                                            </div>
                                            <span className="text-[10px] font-black">{pillar.impact}%</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedPillar}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                                >
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-4">Summary of Findings</div>
                                        <h4 className="text-3xl font-black mb-6 tracking-tighter">{currentPillar.title}</h4>
                                        <p className="text-slate-400 font-medium leading-relaxed mb-8">{currentPillar.description}</p>

                                        <div className="space-y-4">
                                            {currentPillar.findings.map((finding, idx) => (
                                                <div key={idx} className="flex gap-4 group">
                                                    <ChevronRight className="w-5 h-5 text-red-500 shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
                                                    <span className="text-sm font-medium text-slate-300">{finding}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-4">Evidentiary Metrics</div>
                                        <div className="grid grid-cols-1 gap-4">
                                            {currentPillar.technicalData.map((data, idx) => (
                                                <div key={idx} className="bg-white/5 border border-white/5 rounded-3xl p-6 flex justify-between items-center group hover:bg-white/10 transition-colors">
                                                    <div>
                                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{data.label}</div>
                                                        <div className="text-3xl font-black text-white">{data.value}</div>
                                                    </div>
                                                    <div className={`p-3 rounded-2xl ${data.trend === 'up' ? 'bg-red-500/10 text-red-500' :
                                                            data.trend === 'down' ? 'bg-emerald-500/10 text-emerald-500' :
                                                                'bg-slate-500/10 text-slate-500'
                                                        }`}>
                                                        {data.trend === 'up' ? <TrendingUp /> : data.trend === 'down' ? <TrendingDown /> : <Clock />}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="p-8 bg-red-600 text-white rounded-[2rem] shadow-2xl shadow-red-900/30 relative overflow-hidden group/btn cursor-pointer">
                                            <div className="absolute inset-0 bg-black opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Master Evidence File</span>
                                                <AlertTriangle className="w-4 h-4" />
                                            </div>
                                            <div className="text-2xl font-black uppercase tracking-tighter">View Source Docs</div>
                                            <p className="text-[10px] font-bold opacity-60 mt-2">Locked via Architect Intel Level 4</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Scan Line Animation */}
                        {isScanning && (
                            <div className="absolute inset-0 z-50 pointer-events-none">
                                <motion.div
                                    initial={{ top: '0%' }}
                                    animate={{ top: '100%' }}
                                    transition={{ duration: 1.5, ease: "linear" }}
                                    className="w-full h-1 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                                />
                                <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                            </div>
                        )}
                    </div>

                    {/* Side Rail Metrics */}
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Discovery Status</div>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest">Medical Neglect</span>
                                        <span className="text-xl font-black text-red-500">92%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 w-[92%]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest">Tox Evidence</span>
                                        <span className="text-xl font-black text-red-500">100%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 w-[100%] shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest">Sovereignty Index</span>
                                        <span className="text-xl font-black text-emerald-500">85%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[85%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-red-600/20 to-transparent border border-red-500/20 rounded-[2rem] p-8">
                            <ShieldAlert className="w-10 h-10 text-red-500 mb-6" />
                            <h3 className="text-xl font-black mb-2 tracking-tighter uppercase">Lethal Core Active.</h3>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                300+ exhibits prioritized. Master Index ready for physical submission at Wednesday "Abuse Hand-Off".
                            </p>
                        </div>

                        <div className="bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-8 group cursor-help">
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="w-5 h-5 text-blue-400 animate-bounce" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">LUNAI Suggestion</span>
                            </div>
                            <p className="text-sm text-slate-300 font-bold leading-relaxed">
                                "Prioritize the <span className="text-white">PSR Rebuttal</span> structure. Physical proof of the Dec 16th crisis remains the highest impact exhibit."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Exhibits Logged', value: '3,142', icon: FileText },
                        { label: 'Days in Breach', value: '184', icon: Clock },
                        { label: 'Harm Mitigation', value: 'Active', icon: ShieldAlert },
                        { label: 'Justice Weight', value: 'Lethal', icon: Scale }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-1 transition-all">
                            <div className="flex items-center gap-3 mb-4 text-slate-500">
                                <stat.icon className="w-4 h-4" />
                                <span className="text-[9px] font-black uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <div className="text-4xl font-black text-white">{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MedicalTruthHUD;
