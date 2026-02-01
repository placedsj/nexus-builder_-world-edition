import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
    ChevronRight, Save, Share2, Calculator, Info, Check,
    ArrowLeft, Zap, Box, ArrowUpRight, MessageSquare,
    Sparkles, ShieldAlert, Activity, Globe, LayoutDashboard, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherOverlay from './WeatherOverlay';
import ShedVisualizer from './ShedVisualizer';
import {
    ShedSpec,
    WeatherType,
    ChatMessage,
    ShedStyleType,
    SidingType,
    DoorType,
    CostEstimate,
    RenderMode
} from '../types';
import {
    SHED_DB,
    UPGRADES,
    INVENTORY_ITEMS,
    NATURE_ASSETS,
    COLOR_PALETTE,
    calculateMaterials,
    SHOWROOM_ITEMS
} from '../constants';
import { generateConfigFromPrompt } from '../services/geminiService';
import LivePowerGauge from './LivePowerGauge';
import ROICalculator from './ROICalculator';
import ShareModal from './ShareModal';
import InsurancePartnerIntegration from './InsurancePartnerIntegration';
import ShedTetherHardwarePortal from './ShedTetherHardwarePortal';
import RegionalExpansionDashboard from './RegionalExpansionDashboard';
import AdvancedAnalyticsDashboard from './AdvancedAnalyticsDashboard';
import { jsPDF } from 'jspdf';

const ShowroomCard: React.FC<{ item: typeof SHOWROOM_ITEMS[0], onSelect: () => void }> = ({ item, onSelect }) => (
    <div
        onClick={onSelect}
        className="group relative bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer shadow-2xl"
    >
        <div className="aspect-[16/9] overflow-hidden relative">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            {item.badge && (
                <div className="absolute top-6 right-6 bg-blue-600 text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-2xl">
                    {item.badge}
                </div>
            )}
        </div>
        <div className="p-8 -mt-12 relative z-10">
            <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2 block">{item.label}</span>
            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors tracking-tighter leading-tight uppercase">{item.title}</h3>
            <p className="text-white/40 text-xs leading-relaxed mb-6 font-medium line-clamp-2">{item.description}</p>
            <div className="flex items-center gap-4">
                <span className="text-[8px] font-black text-white uppercase tracking-widest group-hover:text-blue-400 transition-colors">Select Model</span>
                <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-blue-500/40 transition-colors" />
                <span className="text-xl group-hover:translate-x-2 transition-transform text-white group-hover:text-blue-400">→</span>
            </div>
        </div>
    </div>
);

interface EnterpriseBuilderProps {
    initialStyle?: ShedStyleType;
    initialSpec?: ShedSpec;
    onBack?: () => void;
    onCheckout?: (spec: ShedSpec, costs: CostEstimate) => void;
    onSpecChange?: (spec: ShedSpec) => void;
}

const UNIT_PRICES = {
    stud: 5.25,
    sheathing: 32.00,
    shingles: 45.00,
    trim: 2.50,
    joist: 12.00,
    dripEdge: 15.00,
    felt: 25.00
};

const EnterpriseBuilder: React.FC<EnterpriseBuilderProps> = ({ initialStyle = 'Modern Studio', initialSpec, onBack, onCheckout, onSpecChange }) => {
    const [spec, setSpec] = useState<ShedSpec>(initialSpec || {
        style: initialStyle,
        material: initialStyle === 'Modern Studio' ? 'Metal' : 'Vinyl',
        terrain: 'grass',
        time: 50,
        viewMode: 'exterior',
        renderMode: '3D',
        inventory: [],
        landscape: [],
        addons: { ramp: false, solar: false, ac: false, loft: false, workbench: false, shedLoo: false, power_20a: false, power_30a: false, power_50a: false, shedcare: false },
        pitch: 6,
        wallColor: '#f8fafc',
        trimColor: '#334155',
        sidingType: 'lap',
        doorType: 'single',
        width: 10,
        depth: 12,
        electricalTier: null
    });

    useEffect(() => {
        if (onSpecChange) onSpecChange(spec);
    }, [spec, onSpecChange]);

    const [weather, setWeather] = useState<WeatherType>('clear');
    const [activePanelTab, setActivePanelTab] = useState<'lunai' | 'structure' | 'metrics'>('lunai');
    const [chat, setChat] = useState<ChatMessage[]>([
        { role: 'ai', text: `LUNAI Placed Edition active. I can help with structural advice and real-time configuration.` }
    ]);
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [showShowroom, setShowShowroom] = useState(!initialStyle && !initialSpec);
    const [focalPoint, setFocalPoint] = useState<string | null>(null);
    const [showROI, setShowROI] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [showNudge, setShowNudge] = useState(false);
    const [showInsurance, setShowInsurance] = useState(false);
    const [showHardware, setShowHardware] = useState(false);
    const [showRegional, setShowRegional] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const idleTimer = useRef<NodeJS.Timeout | null>(null);

    // Structural Safety Logic
    const safetyMetrics = useMemo(() => {
        const area = spec.width * spec.depth;
        const windLoad = spec.style === 'A-Frame' ? 140 : (spec.style === 'Modern Studio' ? 110 : 120);
        const snowLoad = spec.pitch >= 6 ? 60 : 35;
        const stabilityScore = Math.max(0, 100 - (area / 400) * 10 - (spec.pitch < 4 ? 15 : 0));

        return {
            windLoad,
            snowLoad,
            stabilityScore: Math.round(stabilityScore),
            status: stabilityScore > 85 ? 'Optimal' : (stabilityScore > 70 ? 'Warning' : 'Critical'),
            recommendation: area > 240 && spec.terrain === 'grass' ? "Recommend Gravel Pad" : "Foundation Stable"
        };
    }, [spec]);

    const handleSave = async () => {
        // AWS Integration removed. Simulating local save.
        console.log('Design data:', spec);
        alert('Design saved to local session. (AWS Integration removed)');
    };

    // Smart Nudge Logic
    useEffect(() => {
        const resetTimer = () => {
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => {
                if (!showROI) setShowNudge(true);
            }, 30000); // 30 seconds idle
        };

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keypress', resetTimer);
        resetTimer();

        return () => {
            if (idleTimer.current) clearTimeout(idleTimer.current);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keypress', resetTimer);
        };
    }, [showROI]);

    useEffect(() => {
        if (focalPoint) {
            const timer = setTimeout(() => setFocalPoint(null), 1500);
            return () => clearTimeout(timer);
        }
    }, [focalPoint]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    const mats = useMemo(() => calculateMaterials(spec.width, spec.depth, 8, spec.pitch), [spec]);

    const detailedCosts: Record<string, number> = useMemo(() => ({
        studs: mats.studs * UNIT_PRICES.stud,
        sheathing: mats.sheathing * UNIT_PRICES.sheathing,
        shingles: mats.shingles * UNIT_PRICES.shingles,
        trim: mats.trim * UNIT_PRICES.trim,
        joists: (mats.joists || 0) * UNIT_PRICES.joist,
        dripEdge: (mats.dripEdge || 0) * UNIT_PRICES.dripEdge,
        felt: (mats.feltSquares || 0) * UNIT_PRICES.felt
    }), [mats]);

    const costs: CostEstimate = useMemo(() => {
        let base = SHED_DB[spec.style].price;

        if (spec.style === 'Lofted Barn' && spec.width === 12 && spec.depth === 28) {
            base = 14950;
        } else if (spec.style === 'Utility' && spec.width === 10 && spec.depth === 20) {
            base = 9185;
        } else if (spec.style === 'Quaker' && spec.width === 10 && spec.depth === 16) {
            base = 7975;
        } else if (spec.style === 'A-Frame' && spec.width === 10 && spec.depth === 18) {
            base = 6531;
        }

        const addonTotal = UPGRADES.reduce((acc, curr) => spec.addons[curr.id] ? acc + curr.cost : acc, 0);
        const powerCost = spec.electricalTier === '20A' ? 285 : spec.electricalTier === '30A' ? 895 : spec.electricalTier === '50A' ? 1850 : spec.electricalTier === 'offgrid' ? 2500 : 0;
        const materialTotal = (Object.values(detailedCosts) as number[]).reduce((a, b) => a + b, 0) + addonTotal + base + powerCost;
        const laborTotal = materialTotal * 0.40;
        return { material: materialTotal, labor: laborTotal, total: materialTotal + laborTotal };
    }, [spec, detailedCosts]);

    const powerMetrics = useMemo(() => {
        const max = spec.addons.power_50a ? 50 : spec.addons.power_30a ? 30 : spec.addons.power_20a ? 20 : 15;
        let baseLoad = 2.0; // Minimal idle load
        if (spec.addons.ac) baseLoad += 8.5;
        if (spec.addons.workbench) baseLoad += 4.0;
        if (spec.addons.solar) baseLoad -= 3.0; // Offset from solar

        return {
            maxAmps: max,
            loadFactor: Math.max(0.1, Math.min(0.95, baseLoad / max))
        };
    }, [spec.addons]);


    const downloadSpec = () => {
        const doc = new jsPDF();

        // Brand Header
        doc.setFillColor(15, 23, 42); // slate-900
        doc.rect(0, 0, 210, 40, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('PLACED', 20, 20);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('ENGINEERED SPECIFICATION', 20, 28);
        doc.text(new Date().toLocaleDateString(), 190, 20, { align: 'right' });

        // Content
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(16);
        doc.text(`Configuration: ${spec.style}`, 20, 60);

        doc.setFontSize(12);
        doc.text(`Dimensions: ${spec.width}' x ${spec.depth}'`, 20, 75);
        doc.text(`Siding: ${spec.sidingType === 'lap' ? 'Horizontal Lap' : 'Board & Batten'}`, 20, 85);
        doc.text(`Wall Color: ${spec.wallColor}`, 20, 95);
        doc.text(`Power Kit: ${spec.electricalTier || 'None'}`, 20, 105);

        // Addons Box
        doc.setDrawColor(226, 232, 240); // slate-200
        doc.rect(20, 115, 170, 40);
        doc.setFontSize(10);
        doc.text('SELECTED UPGRADES', 25, 125);

        const activeAddons = Object.entries(spec.addons)
            .filter(([_, v]) => v)
            .map(([k, _]) => k.replace(/_/g, ' '));

        doc.setFontSize(9);
        doc.text(activeAddons.length > 0 ? activeAddons.join(', ') : 'No upgrades selected', 25, 135, { maxWidth: 160 });

        // Pricing Section
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('COST ESTIMATE (CAD)', 20, 175);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Materials', 20, 185);
        doc.text(`$${costs.material.toLocaleString()}`, 190, 185, { align: 'right' });

        doc.text('Labor / Assembly', 20, 195);
        doc.text(`$${costs.labor.toLocaleString()}`, 190, 195, { align: 'right' });

        doc.setDrawColor(15, 23, 42);
        doc.line(20, 205, 190, 205);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('PROJECT TOTAL', 20, 215);
        doc.text(`$${costs.total.toLocaleString()}`, 190, 215, { align: 'right' });

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text('Generated via LUNAI Architectural Intelligence. Prices are estimates and subject to site inspection.', 105, 280, { align: 'center' });

        doc.save(`Placed_Spec_${spec.style.replace(' ', '_')}.pdf`);
    };

    const handleCommand = async (input: string) => {
        if (!input.trim()) return;
        setChat(prev => [...prev, { role: 'user', text: input }]);
        setIsThinking(true);

        try {
            const aiRes = await generateConfigFromPrompt(input, spec);
            if (aiRes) {
                setSpec(prev => ({ ...prev, ...aiRes }));
                if (aiRes.weather) setWeather(aiRes.weather as WeatherType);

                // CONTEXTUAL STRUCTURAL ADVICE
                let advice = aiRes.explanation || "System updated.";
                if (spec.style === 'Quaker' && !input.toLowerCase().includes('roof')) {
                    advice += " Note: The Quaker's saltbox roof is excellent for shedding Atlantic snow loads on the rear side.";
                }
                if (spec.width > 10 && !input.toLowerCase().includes('foundation')) {
                    advice += " For a structure this size, we recommend a gravel pad with 4x4 pressure-treated skids for maximum stability.";
                }

                setChat(prev => [...prev, { role: 'ai', text: advice }]);
            }
        } catch (err) {
            setChat(prev => [...prev, { role: 'ai', text: "LUNAI connection intermittent. Structural manual override active." }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="w-full h-screen transition-all duration-1000 relative flex overflow-hidden font-sans text-white bg-slate-950">
            {/* Structural Advisor HUD */}
            <AnimatePresence>
                {safetyMetrics.status !== 'Optimal' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] glass px-6 py-3 rounded-2xl border border-orange-500/30 flex items-center gap-4 shadow-2xl shadow-orange-950/20"
                    >
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                            <ShieldAlert size={18} />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase text-orange-400 tracking-[0.2em]">LUNAI Structural Alert</div>
                            <div className="text-xs font-bold text-white">{safetyMetrics.recommendation}</div>
                        </div>
                        <button onClick={() => setShowRegional(true)} className="ml-2 text-[10px] font-black uppercase px-3 py-1 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">Details</button>
                    </motion.div>
                )}
            </AnimatePresence>
            {showShowroom && (
                <div className="absolute inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl p-12 overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-500">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4 block">Selection Hub</span>
                                <h1 className="text-6xl font-black tracking-tighter uppercase mb-4">Select Your Base.</h1>
                                <p className="text-white/40 max-w-xl text-lg font-medium">Choose a high-fidelity template to begin your professional configuration.</p>
                            </div>
                            {spec.style && (
                                <button onClick={() => setShowShowroom(false)} className="px-8 py-3 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Cancel</button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {SHOWROOM_ITEMS.map(item => (
                                <ShowroomCard
                                    key={item.id}
                                    item={item}
                                    onSelect={() => {
                                        setSpec(prev => ({ ...prev, style: item.style }));
                                        setShowShowroom(false);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {spec.renderMode === '3D' && <WeatherOverlay type={weather} time={spec.time} />}

            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                className="lg:hidden fixed bottom-10 left-10 z-[300] w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-900/40 border border-blue-400/30 active:scale-95 transition-all"
            >
                <span className="text-xl font-black">{showMobileSidebar ? '✕' : '⚙️'}</span>
            </button>

            <div className={`w-full lg:w-[420px] glass border-r border-white/10 flex flex-col z-[60] fixed lg:relative inset-y-0 left-0 transition-transform duration-500 pt-28 ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex border-b border-white/10">
                    {['lunai', 'structure', 'metrics'].map((tab) => (
                        <button key={tab} onClick={() => setActivePanelTab(tab as any)} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activePanelTab === tab ? 'text-blue-400 bg-blue-600/10 border-b-2 border-blue-400' : 'text-slate-500 hover:text-slate-300'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar glass border border-white/5 rounded-[2.5rem] mb-6">
                    {activePanelTab === 'lunai' && (
                        <div className="p-8 flex flex-col h-full bg-blue-500/5">
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-3 p-4 glass rounded-3xl mb-4 border-placed-blue/20">
                                    <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-blue-500/20 border border-blue-400/30">
                                        <img src="/brain/d00a1654-b7a4-4b43-a697-b3a763181613/lunai_avatar_core_1769653578022.png" className="w-full h-full object-cover animate-pulse" alt="LUNAI Core" />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-black text-placed-blue uppercase tracking-widest leading-none mb-1">Architect Core</div>
                                        <div className="text-sm font-black text-white leading-none">LUNAI v7.2</div>
                                    </div>
                                </div>
                                {chat.map((m, i) => (
                                    <div key={i} className={`flex flex-col ${m.role === 'ai' ? 'items-start' : 'items-end'}`}>
                                        <div className={`max-w-[90%] p-5 rounded-3xl text-xs font-medium leading-relaxed ${m.role === 'ai' ? 'glass border-placed-blue/20 text-blue-100' : 'bg-placed-blue text-white shadow-lg shadow-blue-900/40'}`}>
                                            {m.text}
                                        </div>
                                    </div>
                                ))}
                                {isThinking && (
                                    <div className="flex items-center gap-2 text-blue-500/50 animate-pulse">
                                        <div className="w-1 h-1 bg-current rounded-full" />
                                        <div className="w-1 h-1 bg-current rounded-full" />
                                        <div className="w-1 h-1 bg-current rounded-full" />
                                        <span className="text-[8px] font-black uppercase tracking-widest ml-2">Simulating Parameters...</span>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            <div className="mt-4 flex gap-2 flex-wrap">
                                <button onClick={() => handleCommand("Analyze power load for 30A kit.")} className="px-3 py-1.5 rounded-full glass text-[9px] font-black uppercase tracking-wider text-blue-400 hover:text-white hover:bg-placed-blue/20 transition-all">Optimize Power</button>
                                <button onClick={() => handleCommand("Run snow load simulation for New Brunswick.")} className="px-3 py-1.5 rounded-full glass text-[9px] font-black uppercase tracking-wider text-blue-400 hover:text-white hover:bg-placed-blue/20 transition-all">Snow Load Sim</button>
                            </div>

                            <div className="mt-6">
                                <input disabled={isThinking} className="w-full glass p-5 rounded-[2rem] text-sm focus:border-placed-blue/50 outline-none text-white transition-all placeholder:text-white/20" placeholder="Initialize command..." onKeyDown={(e) => { if (e.key === 'Enter' && e.currentTarget.value.trim()) { handleCommand(e.currentTarget.value); e.currentTarget.value = ''; } }} />
                            </div>
                        </div>
                    )}

                    {activePanelTab === 'metrics' && (
                        <div className="p-8 space-y-6">
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest block">Material Estimator</span>
                                    <div className="text-[8px] font-bold text-white/20 uppercase">Atlantic Pro Ready</div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start border-b border-white/5 pb-3">
                                        <div className="flex flex-col">
                                            <span className="text-slate-200 text-xs font-bold">2x4 Standard Studs</span>
                                            <span className="text-[10px] text-slate-500">{mats.studs} Units</span>
                                        </div>
                                        <span className="font-mono text-xs font-bold text-white">${detailedCosts.studs.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-start border-b border-white/5 pb-3">
                                        <div className="flex flex-col">
                                            <span className="text-slate-200 text-xs font-bold">4x8 CDX Sheathing</span>
                                            <span className="text-[10px] text-slate-500">{mats.sheathing} Sheets</span>
                                        </div>
                                        <span className="font-mono text-xs font-bold text-white">${detailedCosts.sheathing.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-start border-b border-white/5 pb-3">
                                        <div className="flex flex-col">
                                            <span className="text-slate-200 text-xs font-bold">Asphalt Shingles</span>
                                            <span className="text-[10px] text-slate-500">{mats.shingles} Bundles</span>
                                        </div>
                                        <span className="font-mono text-xs font-bold text-white">${detailedCosts.shingles.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <span className="text-slate-200 text-xs font-bold">Structural Hardware</span>
                                            <span className="text-[10px] text-slate-500">Fasteners, Clips, Adhesive</span>
                                        </div>
                                        <span className="font-mono text-xs font-bold text-white">$145.00</span>
                                    </div>
                                </div>
                            </div>

                            <LivePowerGauge
                                maxAmps={powerMetrics.maxAmps}
                                loadFactor={powerMetrics.loadFactor}
                            />

                            {/* Technical Readout HUD */}
                            <div className="glass p-6 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                                    <Activity size={50} className="text-blue-500" />
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-8 flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    Digital Twin: Structural Specs
                                </div>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center group/spec">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover/spec:text-slate-300 transition-colors">Wind Load Limit</span>
                                        <span className="text-[10px] font-black text-white font-mono bg-white/5 px-3 py-1 rounded-lg">{safetyMetrics.windLoad} MPH</span>
                                    </div>
                                    <div className="flex justify-between items-center group/spec">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover/spec:text-slate-300 transition-colors">Max Snow Load</span>
                                        <span className="text-[10px] font-black text-white font-mono bg-white/5 px-3 py-1 rounded-lg">{safetyMetrics.snowLoad} PSF</span>
                                    </div>
                                    <div className="pt-2 border-t border-white/5 transition-all">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Structural Unity</span>
                                            <span className={`text-[10px] font-black font-mono ${safetyMetrics.stabilityScore > 85 ? 'text-emerald-400' : 'text-orange-400'}`}>{safetyMetrics.stabilityScore}%</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${safetyMetrics.stabilityScore}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className={`h-full ${safetyMetrics.stabilityScore > 85 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-orange-500'}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {
                        activePanelTab === 'structure' && (
                            <div className="p-8 space-y-8">
                                <section>
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6 flex justify-between items-baseline">
                                        Architectural Style
                                        <button onClick={() => setShowShowroom(true)} className="text-[9px] text-white/40 hover:text-white transition-colors">Change Base →</button>
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(['A-Frame', 'Modern Studio', 'Quaker'] as ShedStyleType[]).map(style => (
                                            <button
                                                key={style}
                                                onClick={() => {
                                                    setSpec({ ...spec, style });
                                                    setFocalPoint('roof');
                                                }}
                                                className={`py-4 rounded-2xl border-2 text-[9px] font-black uppercase tracking-widest transition-all ${spec.style === style ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/5 text-slate-500 hover:border-white/20'}`}
                                            >
                                                {style.replace(' Studio', '')}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block">Siding Configuration</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => {
                                                setSpec({ ...spec, sidingType: 'lap' });
                                                setFocalPoint('siding');
                                            }}
                                            className={`group py-6 rounded-3xl border-2 flex flex-col items-center justify-center transition-all ${spec.sidingType === 'lap' ? 'border-blue-500 bg-blue-500/10 text-white shadow-lg shadow-blue-900/20' : 'border-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300'}`}
                                        >
                                            <div className="w-8 h-8 mb-2 flex flex-col gap-1 overflow-hidden rounded-md border border-white/5 bg-white/5 p-1 group-hover:scale-110 transition-transform">
                                                <div className="w-full h-1 bg-current opacity-40 shrink-0" />
                                                <div className="w-full h-1 bg-current opacity-40 shrink-0" />
                                                <div className="w-full h-1 bg-current opacity-40 shrink-0" />
                                                <div className="w-full h-1 bg-current opacity-40 shrink-0" />
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-widest">Horizontal Lap</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSpec({ ...spec, sidingType: 'board' });
                                                setFocalPoint('siding');
                                            }}
                                            className={`group py-6 rounded-3xl border-2 flex flex-col items-center justify-center transition-all ${spec.sidingType === 'board' ? 'border-blue-500 bg-blue-500/10 text-white shadow-lg shadow-blue-900/20' : 'border-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300'}`}
                                        >
                                            <div className="w-8 h-8 mb-2 flex gap-1 overflow-hidden rounded-md border border-white/5 bg-white/5 p-1 group-hover:scale-110 transition-transform">
                                                <div className="h-full w-1 bg-current opacity-40 shrink-0" />
                                                <div className="h-full w-1 bg-current opacity-40 shrink-0" />
                                                <div className="h-full w-1 bg-current opacity-40 shrink-0" />
                                                <div className="h-full w-1 bg-current opacity-40 shrink-0" />
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-widest">Board & Batten</span>
                                        </button>
                                    </div>
                                </section>

                                <section>
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block">Material Swatches</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {COLOR_PALETTE.map(c => (
                                            <button
                                                key={c.name}
                                                onClick={() => {
                                                    setSpec({ ...spec, wallColor: c.hex });
                                                    setFocalPoint('siding');
                                                }}
                                                className={`group relative flex flex-col items-center gap-2 p-1 rounded-2xl border-2 transition-all ${spec.wallColor === c.hex ? 'border-blue-500 bg-blue-500/5' : 'border-white/5 hover:border-white/20'}`}
                                            >
                                                <div className="w-full aspect-square rounded-xl shadow-inner overflow-hidden relative">
                                                    <div className="absolute inset-0" style={{ backgroundColor: c.hex }} />
                                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30 mix-blend-overlay" />
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/10" />
                                                </div>
                                                <span className="text-[8px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity pb-2">{c.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block">Electrical Tier</label>
                                    <div className="space-y-4">
                                        {[
                                            { id: null, name: 'Basic (Extension Cord)', cost: 0, desc: 'Simple pass-through port.' },
                                        { id: '20A', name: '20A Weekender', cost: 285, desc: 'Lights, laptop, light tools.' },
                                        { id: '30A', name: 'Current Command (Smart)', cost: 895, desc: '30A Umbilical with smart load manager.' },
                                        { id: '50A', name: '50A Pro Service', cost: 1850, desc: 'Full workshop power. EV-capable connection.' },
                                            { id: 'offgrid', name: 'Off-Grid / Solar', cost: 2500, desc: 'PointGuard system for remote areas.' }
                                        ].map(tier => (
                                            <button
                                                key={tier.id === null ? 'null' : tier.id}
                                                onClick={() => setSpec(s => ({ ...s, electricalTier: tier.id as any }))}
                                                className={`w-full p-5 rounded-2xl border flex items-center justify-between transition-all ${spec.electricalTier === tier.id ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-white/10 text-slate-500 hover:bg-white/5'}`}
                                            >
                                                <div className="flex flex-col items-start w-full">
                                                    <div className="flex justify-between w-full mb-1">
                                                        <span className="text-[10px] font-black uppercase flex items-center gap-2">
                                                            {tier.name}
                                                            {tier.id === '30A' && <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full xs:text-[6px]">POPULAR</span>}
                                                            {tier.id === 'offgrid' && <span className="bg-green-500 text-white px-2 py-0.5 rounded-full xs:text-[6px]">ECO</span>}
                                                        </span>
                                                        <span className="text-[10px] font-black">{tier.cost > 0 ? `+$${tier.cost}` : 'FREE'}</span>
                                                    </div>
                                                    <span className="text-[9px] opacity-60 text-left">{tier.desc}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block">Advanced Features</label>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setShowInsurance(true)}
                                            className="w-full p-5 rounded-2xl border border-green-500/30 text-left transition-all hover:bg-green-500/10 hover:border-green-500"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Insurance Verified</span>
                                                    <span className="text-[9px] text-white/40 mt-1">Qualify for discounts</span>
                                                </div>
                                                <span className="text-xl">🛡️</span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setShowHardware(true)}
                                            className="w-full p-5 rounded-2xl border border-orange-500/30 text-left transition-all hover:bg-orange-500/10 hover:border-orange-500"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Shed Tether Hardware</span>
                                                    <span className="text-[9px] text-white/40 mt-1">Power specs & calculations</span>
                                                </div>
                                                <span className="text-xl">⚡</span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setShowRegional(true)}
                                            className="w-full p-5 rounded-2xl border border-cyan-500/30 text-left transition-all hover:bg-cyan-500/10 hover:border-cyan-500"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Regional Network</span>
                                                    <span className="text-[9px] text-white/40 mt-1">Community nodes & expansion</span>
                                                </div>
                                                <span className="text-xl">🌐</span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setShowAnalytics(true)}
                                            className="w-full p-5 rounded-2xl border border-blue-500/30 text-left transition-all hover:bg-blue-500/10 hover:border-blue-500"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Financial Analytics</span>
                                                    <span className="text-[9px] text-white/40 mt-1">ROI & maintenance forecasts</span>
                                                </div>
                                                <span className="text-xl">💰</span>
                                            </div>
                                        </button>
                                    </div>
                                </section>

                                <section>
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block">Addons</label>
                                    <div className="space-y-2">
                                        {UPGRADES.map(u => (
                                            <button
                                                key={u.id}
                                                onClick={() => setSpec(s => ({ ...s, addons: { ...s.addons, [u.id]: !s.addons[u.id] } }))}
                                                className={`w-full p-5 rounded-2xl border flex items-center gap-4 transition-all ${spec.addons[u.id] ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-white/10 text-slate-500'}`}
                                            >
                                                <span className="text-xl">{u.icon}</span>
                                                <div className="flex flex-col items-start">
                                                    <span className="text-[10px] font-black uppercase">{u.name}</span>
                                                    <span className="text-[9px] opacity-60">+${u.cost}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <button
                                        onClick={() => {
                                            setShowROI(true);
                                            setShowNudge(false);
                                        }}
                                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-white shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform group"
                                    >
                                        <span className="text-xl group-hover:rotate-12 transition-transform">💰</span>
                                        <div className="flex flex-col items-start leading-none">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">Smart Finance</span>
                                            <span className="text-sm font-bold">Stop Renting Storage</span>
                                        </div>
                                    </button>
                                </section>
                            </div>
                        )
                    }
                </div >

                <div className="p-8 border-t border-white/10 bg-black/40 backdrop-blur-3xl relative overflow-hidden group/footer">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />

                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-2 block">Current Estimate</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black tracking-tighter transition-all duration-300 group-hover/footer:text-blue-400">
                                    ${costs.total.toLocaleString()}
                                </span>
                                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">CAD</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Status</span>
                            <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest justify-end">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> {spec.electricalTier ? `${spec.electricalTier} Power` : 'Standard Unit'}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button onClick={downloadSpec} className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:border-white/30 transition-all group">
                            <span className="opacity-40 group-hover:opacity-100 transition-opacity">↓</span> Export Tech Spec
                        </button>
                        <button onClick={() => setSpec(s => ({ ...s, viewMode: s.viewMode === 'exterior' ? 'interior' : 'exterior' }))} className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:border-white/30 transition-all">
                            View {spec.viewMode === 'exterior' ? 'Interior' : 'Exterior'}
                        </button>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-blue-800 shadow-2xl shadow-blue-900/40 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-black tracking-tighter uppercase mb-4">Ready to Start?</h3>
                            <p className="text-white/60 text-[10px] font-medium mb-6 max-w-[200px]">Send this design to our Saint John workshop to start fabrication.</p>
                            <button onClick={() => onCheckout?.(spec, costs)} className="w-full bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">
                                Contact Our Craftsman
                            </button>
                        </div>
                    </div>
                </div>
            </div >

            <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden z-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,64,175,0.05),_transparent_70%)]">
                {/* HUD CONTROLS */}
                <div className="absolute top-32 left-12 right-12 z-50 flex justify-between items-start">
                    <div className="flex gap-4">
                        <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors glass px-6 py-2 rounded-full">← BACK</button>
                        <button onClick={() => setShowShare(true)} className="text-[10px] font-black uppercase tracking-[0.2em] text-placed-blue hover:text-white transition-colors bg-placed-blue/10 backdrop-blur px-6 py-2 rounded-full border border-placed-blue/20 hover:bg-placed-blue">SHARE</button>
                        <button onClick={handleSave} className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-placed-emerald transition-colors bg-placed-emerald/10 backdrop-blur px-6 py-2 rounded-full border border-placed-emerald/20 hover:bg-placed-emerald/20">SAVE</button>
                    </div>
                    <div className="flex items-center gap-2 glass p-1.5 rounded-full">
                        {(['3D', 'BLUEPRINT'] as RenderMode[]).map(m => (
                            <button key={m} onClick={() => setSpec(s => ({ ...s, renderMode: m }))} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${spec.renderMode === m ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-white'}`}>{m}</button>
                        ))}
                    </div>
                </div>

                {/* DIMENSIONS BOX */}
                <div className="absolute top-24 right-12 z-40 glass p-6 rounded-3xl w-64 shadow-2xl border-placed-blue/10 animate-flicker">
                    <span className="text-[10px] font-black text-placed-blue uppercase tracking-widest block mb-2">Architectural Spec</span>
                    <div className="text-3xl font-black text-white">{spec.width}' × {spec.depth}'</div>
                    <div className="text-[10px] text-white/40 mt-2 font-mono">{(spec.width * spec.depth).toLocaleString()} SQ.FT / LUNAI V7.2</div>
                </div>

                {/* LUNAI ARCHITECTURAL OVERLAY */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                    <div className="absolute top-10 left-10 border-l border-t border-blue-500/30 w-20 h-20" />
                    <div className="absolute top-10 right-10 border-r border-t border-blue-500/30 w-20 h-20" />
                    <div className="absolute bottom-10 left-10 border-l border-b border-blue-500/30 w-20 h-20" />
                    <div className="absolute bottom-10 right-10 border-r border-b border-blue-500/30 w-20 h-20" />

                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10" />

                    {/* Scanning Line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-400/20 shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-scan" />
                </div>

                {/* Status Readouts */}
                <div className="absolute bottom-12 right-12 z-10 hidden md:block text-right animate-pulse-soft">
                    <div className="text-[9px] font-black text-emerald-500/60 uppercase tracking-[0.3em] mb-1">Atmospheric Simulation</div>
                    <div className="text-sm font-bold text-white tracking-widest">{weather.toUpperCase()} / {spec.renderMode}</div>
                </div>

                <div className="absolute bottom-12 left-12 z-10 hidden md:block text-left animate-pulse-soft opacity-40">
                    <div className="text-[7px] font-mono text-white/40 leading-tight">
                        &gt; LUNAI CORE ACTIVE<br />
                        &gt; PARAMS: {spec.width}x{spec.depth}x{spec.pitch}<br />
                        &gt; STABILITY: OPTIMAL
                    </div>
                </div>

                <ShedVisualizer spec={spec} weather={weather} focalFeature={focalPoint} />
            </div>

            {
                showROI && (
                    <div className="fixed inset-0 z-[250] bg-[#020617] animate-in slide-in-from-bottom-10 fade-in duration-500">
                        <ROICalculator onClose={() => setShowROI(false)} />
                    </div>
                )
            }

            {
                showShare && (
                    <ShareModal
                        onClose={() => setShowShare(false)}
                        url={window.location.href}
                    />
                )
            }


            {
                showNudge && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
                        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-2xl border border-white/10 flex items-center gap-6 max-w-sm">
                            <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center text-2xl">💡</div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1">Investment Tip</div>
                                <p className="text-sm font-medium leading-tight text-white/80">Comparing this to a storage unit? See how fast it pays for itself.</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowROI(true);
                                    setShowNudge(false);
                                }}
                                className="bg-cyan-500 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-colors"
                            >
                                Calc ROI
                            </button>
                            <button onClick={() => setShowNudge(false)} className="text-white/20 hover:text-white text-xl">×</button>
                        </div>
                    </div>
                )
            }
            {
                showInsurance && (
                    <div className="fixed inset-0 z-[250] bg-[#020617] animate-in slide-in-from-bottom-10 fade-in duration-500 overflow-y-auto no-scrollbar">
                        <InsurancePartnerIntegration
                            spec={spec}
                            costs={costs}
                            onClose={() => setShowInsurance(false)}
                        />
                    </div>
                )
            }

            {
                showHardware && (
                    <div className="fixed inset-0 z-[250] bg-[#020617] animate-in slide-in-from-bottom-10 fade-in duration-500 overflow-y-auto no-scrollbar">
                        <ShedTetherHardwarePortal
                            spec={spec}
                            onClose={() => setShowHardware(false)}
                            onSelect={(tier) => {
                                setSpec(prev => ({ ...prev, electricalTier: tier as any }));
                                setShowHardware(false);
                            }}
                        />
                    </div>
                )
            }

            {
                showRegional && (
                    <div className="fixed inset-0 z-[250] bg-[#020617] animate-in slide-in-from-bottom-10 fade-in duration-500 overflow-y-auto no-scrollbar">
                        <RegionalExpansionDashboard
                            onClose={() => setShowRegional(false)}
                        />
                    </div>
                )
            }

            {
                showAnalytics && (
                    <div className="fixed inset-0 z-[250] bg-[#020617] animate-in slide-in-from-bottom-10 fade-in duration-500 overflow-y-auto no-scrollbar">
                        <AdvancedAnalyticsDashboard
                            spec={spec}
                            costs={costs}
                            onClose={() => setShowAnalytics(false)}
                        />
                    </div>
                )
            }
        </div >
    );
};

export default EnterpriseBuilder;
