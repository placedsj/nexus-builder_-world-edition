# NEXUS BUILDER CONSOLIDATED CODEBASE 
 
## FILE: App.tsx 
```typescript 

import React, { useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import EnterpriseBuilder from './components/EnterpriseBuilder';
import Handbook from './components/Handbook';
import ROICalculator from './components/ROICalculator';
import CheckoutFlow from './components/CheckoutFlow';
import LivePowerGauge from './components/LivePowerGauge';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import ProcessPage from './components/ProcessPage';
import ExteriorInspectionPage from './components/ExteriorInspectionPage';
import BlogIndex from './components/BlogIndex';
import BlogPost from './components/BlogPost';
import PaymentPage from './components/PaymentPage';
import { Amplify } from 'aws-amplify';
import outputs from './amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

import PaymentSuccessPage from './components/PaymentSuccessPage';
import BossQuarters from './components/StaffDashboard';
import ShedLanding from './components/ShedLanding';
import RoofingLanding from './components/RoofingLanding';
import PowerLanding from './components/PowerLanding';
import ElectricianPortal from './components/ElectricianPortal';

import { SHOWROOM_ITEMS, PRICING_PACKAGES, TESTIMONIALS } from './constants';
import { ShedStyleType, ShedSpec, CostEstimate } from './types';
import { BRAND_CONFIG, CURRENT_BRAND } from './config/branding';

const Header = ({ onHome, onBuild, onHandbook, onCalculator, onContact, onDashboard, onProcess, onInspection, onBlog }: any) => {
    const [secretCount, setSecretCount] = useState(0);
    const brand = BRAND_CONFIG[CURRENT_BRAND];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/5 backdrop-blur-xl px-10 py-5 flex justify-between items-center border-b border-white/10">
            <div
                onClick={() => {
                    if (secretCount + 1 >= 5) {
                        // Secret Boss Access
                        window.location.hash = 'boss-quarters';
                        window.location.reload();
                    } else {
                        setSecretCount(p => p + 1);
                        if (secretCount === 0) onHome();
                    }
                }}
                className="flex items-center gap-3 cursor-pointer group"
            >
                <div className={`w-10 h-10 ${brand.logoColor} rounded-xl flex items-center justify-center font-black text-white text-xl transition-transform shadow-lg shadow-orange-900/40 ${secretCount > 0 ? 'scale-90 bg-red-600' : 'group-hover:rotate-6'}`}>
                    {secretCount > 0 ? '🔒' : brand.logoLetter}
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">{brand.headerTitle}</span>
                    <span className="text-sm font-bold text-orange-500 tracking-tighter">{brand.headerSubtitle}</span>
                </div>
            </div>
            <div className="hidden xl:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                {brand.showShedBuilder && <button onClick={onBuild} className="hover:text-white transition-colors uppercase">Builder</button>}

                {brand.showRoofingProcess && (
                    <>
                        <button onClick={onProcess} className="hover:text-white transition-colors uppercase">Process</button>
                        <button onClick={onInspection} className="hover:text-white transition-colors uppercase text-cyan-400">Inspections</button>
                    </>
                )}

                <button onClick={onHandbook} className="hover:text-white transition-colors uppercase">Handbook</button>
                <button onClick={onBlog} className="hover:text-white transition-colors uppercase">Blog</button>
                <button onClick={onCalculator} className="hover:text-white transition-colors uppercase">ROI</button>
                <button onClick={onContact} className="bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-500 transition-all shadow-xl shadow-orange-900/20 text-[10px] font-black tracking-widest uppercase">Get Quote</button>
            </div>
        </nav>
    );
};


const Showroom = ({ onSelect }: { onSelect: (style: ShedStyleType) => void }) => (
    <div className="min-h-screen bg-[#020617] pt-40 pb-20 px-10 overflow-y-auto no-scrollbar">
        <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center md:text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-600 mb-6 block">Architectural Gallery</span>
                <h2 className="text-7xl font-black text-white mb-8 tracking-tighter uppercase">Select Template.</h2>
                <p className="text-white/40 text-xl max-w-2xl font-medium leading-relaxed">Every structure starts as a core geometric primitive. Select your base and unlock the Level 12 Parametric Engine.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {SHOWROOM_ITEMS.map((item) => (
                    <div key={item.id} className="group relative bg-white/5 rounded-[4rem] overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all cursor-pointer shadow-2xl" onClick={() => onSelect(item.style)}>
                        <div className="aspect-[16/10] overflow-hidden relative">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                            {item.badge && <div className="absolute top-10 right-10 bg-orange-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-2xl">{item.badge}</div>}
                        </div>
                        <div className="p-16 -mt-24 relative z-10">
                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4 block">{item.label}</span>
                            <h3 className="text-5xl font-black text-white mb-6 group-hover:text-orange-400 transition-colors tracking-tighter leading-tight uppercase">{item.title}</h3>
                            <p className="text-white/40 text-lg leading-relaxed mb-10 max-w-md font-medium">{item.description}</p>
                            <div className="flex items-center gap-6">
                                <span className="text-[10px] font-black text-white uppercase tracking-widest group-hover:text-orange-400 transition-colors">Deploy Parametrics</span>
                                <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-orange-500/40 transition-colors" />
                                <span className="text-3xl group-hover:translate-x-4 transition-transform text-white group-hover:text-orange-400">→</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const App: React.FC = () => {
    const [view, setView] = useState<'landing' | 'showroom' | 'builder' | 'handbook' | 'calculator' | 'checkout' | 'tracking' | 'contact' | 'dashboard' | 'admin' | 'blog' | 'blog-post' | 'power' | 'partners'>('landing');
    const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);

    // URL State Parsing
    const getInitialSpecFromURL = (): ShedSpec | null => {
        const params = new URLSearchParams(window.location.search);
        if (!params.has('style')) return null;

        return {
            style: params.get('style') as ShedStyleType || 'Modern Studio',
            width: parseInt(params.get('width') || '10'),
            depth: parseInt(params.get('depth') || '12'),
            wallColor: params.get('color') ? `#${params.get('color')}` : '#f8fafc',
            sidingType: (params.get('siding') as any) || 'lap',
            addons: {
                ramp: params.get('ramp') === 'true',
                solar: params.get('solar') === 'true',
                ac: params.get('ac') === 'true',
                loft: params.get('loft') === 'true',
                workbench: params.get('workbench') === 'true',
                shedLoo: params.get('shedLoo') === 'true',
                power_20a: params.get('power_20a') === 'true',
                power_30a: params.get('power_30a') === 'true',
                power_50a: params.get('power_50a') === 'true',
                shedcare: params.get('shedcare') === 'true'
            },
            electricalTier: null,
            // Defaults
            material: 'Metal', terrain: 'grass', time: 50, viewMode: 'exterior',
            renderMode: '3D', inventory: [], landscape: [], pitch: 6, trimColor: '#334155', doorType: 'single'
        };
    };

    const initialSpecFromURL = getInitialSpecFromURL();
    const [initialStyle, setInitialStyle] = useState<ShedStyleType>(initialSpecFromURL?.style || 'Modern Studio');
    const [currentSpec, setCurrentSpec] = useState<ShedSpec | null>(initialSpecFromURL);

    // Auto-launch builder if URL params exist
    React.useEffect(() => {
        if (initialSpecFromURL) {
            setView('builder');
        }

        const handlePowerNav = () => setView('power');
        const handlePartnerNav = () => setView('partners');
        window.addEventListener('nav-power', handlePowerNav);
        window.addEventListener('nav-partners', handlePartnerNav);
        return () => {
            window.removeEventListener('nav-power', handlePowerNav);
            window.removeEventListener('nav-partners', handlePartnerNav);
        };
    }, []);

    const updateURL = (spec: ShedSpec) => {
        const params = new URLSearchParams();
        params.set('style', spec.style);
        params.set('width', spec.width.toString());
        params.set('depth', spec.depth.toString());
        params.set('color', spec.wallColor.replace('#', ''));
        params.set('siding', spec.sidingType);
        if (spec.electricalTier) params.set('power', spec.electricalTier);
        Object.entries(spec.addons).forEach(([k, v]) => {
            if (v) params.set(k, 'true');
        });
        window.history.replaceState({}, '', `?${params.toString()}`);
    };
    const [currentCosts, setCurrentCosts] = useState<CostEstimate | null>(null);
    const [chatbotOpen, setChatbotOpen] = useState(false);
    const [activeLoads, setActiveLoads] = useState<string[]>(['Idle']);

    const virtualLoadValues: Record<string, number> = {
        'Idle': 0.8,
        'Laptop/Monitor': 2.5,
        'Space Heater': 12.0,
        'Table Saw': 13.5,
        'LED Lighting': 0.4,
        'Ventilation': 1.2
    };

    const totalVirtualLoad = activeLoads.reduce((acc, load) => acc + (virtualLoadValues[load] || 0), 0);

    const handleSelect = (style: ShedStyleType) => {
        setInitialStyle(style);
        setView('builder');
    };

    const handleCheckout = (spec: ShedSpec, costs: CostEstimate) => {
        setCurrentSpec(spec);
        setCurrentCosts(costs);
        setView('checkout');
    };

    return (
        <main className="w-full h-screen overflow-hidden font-sans">
            <Header
                onHome={() => setView('landing')}
                onBuild={() => setView('showroom')}
                onHandbook={() => setView('handbook')}
                onCalculator={() => setView('calculator')}
                onContact={() => setView('contact')}
                onDashboard={() => setView('admin')}
                onBlog={() => setView('blog')}
            />

            <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
                <div key={view} className="animate-in fade-in duration-700">
                    {/* Dynamic Landing Page */}
                    {view === 'landing' && (
                        BRAND_CONFIG[CURRENT_BRAND].landingComponent === 'ShedLanding'
                            ? <ShedLanding onStart={() => setView('showroom')} onHandbook={() => setView('handbook')} onCalculator={() => setView('calculator')} />
                            : <RoofingLanding onStart={() => setView('showroom')} onHandbook={() => setView('handbook')} onCalculator={() => setView('calculator')} />
                    )}
                    {view === 'showroom' && <Showroom onSelect={handleSelect} />}
                    {view === 'builder' && (
                        <EnterpriseBuilder
                            initialStyle={initialStyle}
                            initialSpec={initialSpecFromURL || undefined}
                            onBack={() => {
                                window.history.replaceState({}, '', '/');
                                setView('showroom');
                            }}
                            onCheckout={handleCheckout}
                            onSpecChange={(s) => {
                                setCurrentSpec(s);
                                updateURL(s);
                            }}
                        />
                    )}
                    {view === 'handbook' && <Handbook />}
                    {view === 'calculator' && <ROICalculator />}
                    {view === 'contact' && <Contact />}
                    {view === 'power' && <PowerLanding onBack={() => setView('landing')} onBuild={() => setView('showroom')} />}
                    {view === 'partners' && <ElectricianPortal onBack={() => setView('landing')} />}
                    {view === 'blog' && (
                        <BlogIndex
                            onHome={() => setView('landing')}
                            onPostSelect={(slug) => {
                                setSelectedPostSlug(slug);
                                setView('blog-post');
                            }}
                        />
                    )}
                    {view === 'blog-post' && selectedPostSlug && (
                        <BlogPost
                            slug={selectedPostSlug}
                            onBack={() => setView('blog')}
                            onHome={() => setView('landing')}
                        />
                    )}
                    {view === 'checkout' && currentSpec && currentCosts && (
                        <CheckoutFlow
                            spec={currentSpec}
                            costs={currentCosts}
                            onCancel={() => setView('builder')}
                            onComplete={() => setView('tracking')}
                        />
                    )}
                    {view === 'tracking' && <div className="p-40 text-white text-center"><h2 className="text-4xl font-black uppercase mb-4">Order Confirmed!</h2><p className="text-white/40">Your structure is scheduled for fabrication in Saint John.</p></div>}
                    {view === 'admin' && <AdminDashboard />}
                    {view === 'dashboard' && (
                        <div className="min-h-screen pt-40 pb-20 px-10 bg-[#020617]">
                            <div className="max-w-6xl mx-auto">
                                <header className="mb-20">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-6 block">Shed Dashboard</span>
                                    <h2 className="text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">MY <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">PLACED ASSET.</span></h2>
                                </header>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                    <div className="lg:col-span-1">
<<<<<<< HEAD
                                        <LivePowerGauge loadFactor={totalVirtualLoad / 15} status={totalVirtualLoad > 14 ? "SHEDDING LOAD" : "All Systems Go"} />
=======
                                        <LivePowerGauge loadFactor={totalVirtualLoad} status={totalVirtualLoad > 14 ? "SHEDDING LOAD" : "All Systems Go"} />
>>>>>>> 9c23c87c58dc54af963b38fc41e34cefdad16c6b

                                        <div className="mt-8 bg-white/5 border border-white/10 p-8 rounded-[3rem]">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 font-mono">Virtual Workday Simulator</h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                {Object.keys(virtualLoadValues).map(load => (
                                                    <button
                                                        key={load}
                                                        onClick={() => {
                                                            if (activeLoads.includes(load)) {
                                                                setActiveLoads(prev => prev.filter(l => l !== load));
                                                            } else {
                                                                setActiveLoads(prev => [...prev, load]);
                                                            }
                                                        }}
                                                        className={`flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${activeLoads.includes(load) ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-white/5 text-slate-500 hover:border-white/10'}`}
                                                    >
                                                        <span className="text-[10px] font-black uppercase tracking-tight">{load}</span>
                                                        <span className="text-[9px] font-mono">{virtualLoadValues[load]}A</span>
                                                    </button>
                                                ))}
                                            </div>
                                            <p className="mt-6 text-[8px] font-bold text-white/20 uppercase tracking-widest leading-loose">
                                                Toggle devices to see how the Current Command manages the 15A threshold.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem]">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Environment</h4>
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-white font-bold">Temperature</span>
                                                    <span className="text-cyan-400 font-black">22°C</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-white font-bold">Humidity</span>
                                                    <span className="text-cyan-400 font-black">45%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem]">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Device Info</h4>
                                            <div className="space-y-2">
                                                <div className="text-white font-black text-xs">ID: SHED_802_NB</div>
                                                <div className="text-slate-500 text-[10px] font-bold">Firmware: v1.2.0-placed</div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Connected (Signal: -42dBm)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="fixed bottom-10 right-10 z-[200]">
                {chatbotOpen && (
                    <div className="absolute bottom-full right-0 mb-6 w-96 bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-10 fade-in duration-500">
                        <button onClick={() => setChatbotOpen(false)} className="absolute top-6 right-8 text-slate-300 hover:text-slate-900 transition-colors text-xl">✕</button>
                        <div className="flex items-center gap-5 mb-8">
                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" className="w-16 h-16 rounded-2xl shadow-xl" alt="Harper" />
                            <div>
                                <div className="font-black text-slate-900 text-lg leading-none mb-1 uppercase tracking-tighter">Harper AI</div>
                                <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500" /> Online Assistant
                                </div>
                            </div>
                        </div>
                        <p className="text-slate-500 leading-relaxed font-medium mb-8">
                            Hi! I'm Harper, your Placed Contractor Liaison. I can help you with material specifics or financing options.
                        </p>
                    </div>
                )}
                <button
                    onClick={() => setChatbotOpen(!chatbotOpen)}
                    className="w-20 h-20 bg-orange-600 rounded-[2rem] flex items-center justify-center text-white text-3xl shadow-2xl shadow-orange-900/40 hover:scale-110 active:scale-95 transition-all relative z-10 group"
                >
                    <span className="group-hover:rotate-12 transition-transform uppercase font-black text-xs">Help</span>
                </button>
            </div>
            <SpeedInsights />
            <Analytics />
        </main>
    );
};

export default App;
``` 
 
## FILE: package.json 
```typescript 
{
  "name": "nexus-builder-world-edition",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@aws-amplify/ui-react": "^6.13.2",
    "@google/genai": "^1.38.0",
    "@tailwindcss/vite": "^4.1.18",
    "@vercel/analytics": "^1.4.1",
    "@vercel/speed-insights": "^1.3.1",
    "autoprefixer": "^10.4.23",
    "aws-amplify": "^6.16.0",
    "framer-motion": "^12.29.2",
    "jspdf": "^4.0.0",
    "lucide-react": "^0.563.0",
    "postcss": "^8.5.6",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "tailwindcss": "^4.1.18"
  },
  "devDependencies": {
    "@aws-amplify/backend": "^1.0.0",
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
``` 
 
## FILE: types.ts 
```typescript 

export type WeatherType = 'clear' | 'rain' | 'snow';
export type MaterialType = 'Vinyl' | 'Cedar' | 'Metal';
export type ShedStyleType = 'A-Frame' | 'Modern Studio' | 'Gable' | 'Quaker' | 'Lofted Barn' | 'Utility';
export type TerrainType = 'grass' | 'gravel' | 'concrete';
export type ViewMode = 'exterior' | 'interior';
export type RenderMode = '3D' | 'BLUEPRINT';
export type SidingType = 'lap' | 'board';
export type DoorType = 'single' | 'double' | 'french';
export type BuilderAppMode = 'BUILDER' | 'QUOTE' | 'CHECKOUT' | 'TRACKING' | 'HANDBOOK' | 'CALCULATOR';

export interface ROIResult {
  totalSavings: number;
  breakEvenMonths: number;
  isProfitable: boolean;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  image: string;
  isFeatured?: boolean;
}

export interface RoofingJoke {
  question: string;
  answer: string;
  icon: string;
}

export interface MaterialEstimate {
  studs: number;
  sheathing: number;
  shingles: number;
  trim: number;
  joists?: number;
  dripEdge?: number;
  feltSquares?: number;
}

export interface CostEstimate {
  material: number;
  labor: number;
  total: number;
}

export interface LandscapeItem {
  id: string;
  x: number;
  y: number;
  scale: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  sqft: number;
  icon: string;
  path: string;
}

export interface ShedAddons {
  ramp: boolean;
  solar: boolean;
  ac: boolean;
  loft: boolean;
  workbench: boolean;
  shedLoo: boolean;
  power_20a: boolean;
  power_30a: boolean;
  power_50a: boolean;
  shedcare: boolean;
}

export interface ShedSpec {
  style: ShedStyleType;
  material: MaterialType;
  terrain: TerrainType;
  time: number; // 0 to 100
  viewMode: ViewMode;
  renderMode: RenderMode;
  inventory: InventoryItem[];
  landscape: LandscapeItem[];
  addons: ShedAddons;
  pitch: number;
  wallColor: string;
  trimColor: string;
  sidingType: SidingType;
  doorType: DoorType;
  width: number;
  depth: number;
  electricalTier: '20A' | '30A' | 'offgrid' | null;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

export interface ShedData {
  price: number;
  rVal: number;
  walls: string;
  roof: string;
  gable: string;
  floor: string;
  baseArea: number;
}

export interface UpgradeItem {
  id: keyof ShedAddons;
  name: string;
  cost: number;
  icon: string;
  description: string;
}

export interface TerrainData {
  id: TerrainType;
  name: string;
  color: string;
  noise: number;
}

export interface NatureAsset {
  id: string;
  name: string;
  type: 'flora' | 'structure' | 'flat';
  path: string;
  color: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  stars: number;
  avatar: string;
}
``` 
 
## FILE: components\EnterpriseBuilder.tsx 
```typescript 

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { client } from '../lib/amplify';
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
    const [showLogin, setShowLogin] = useState(false);
    const [showInsurance, setShowInsurance] = useState(false);
    const [showHardware, setShowHardware] = useState(false);
    const [showRegional, setShowRegional] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const idleTimer = useRef<NodeJS.Timeout | null>(null);

    const { user } = useAuthenticator((context) => [context.user]);

    const handleSave = async () => {
        if (!user) {
            setShowLogin(true);
            return;
        }

        try {
            await client.models.ShedDesign.create({
                style: spec.style,
                width: spec.width,
                depth: spec.depth,
                wallColor: spec.wallColor,
                sidingType: spec.sidingType,
                addonsJson: JSON.stringify(spec.addons),
                specJson: JSON.stringify(spec),
                name: `My ${spec.style} - ${new Date().toLocaleDateString()}`
            });
            alert('Design saved successfully!');
            setShowLogin(false);
        } catch (error) {
            console.error('Error saving design:', error);
            alert('Failed to save design. Please try again.');
        }
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
        const powerCost = spec.electricalTier === '20A' ? 300 : spec.electricalTier === '30A' ? 900 : spec.electricalTier === 'offgrid' ? 2500 : 0;
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
        const content = `
PLACED ENGINEERED SPECIFICATION
-------------------------------
Model: ${spec.style}
Dimensions: ${spec.width}' x ${spec.depth}'
Siding: ${spec.sidingType === 'lap' ? 'Horizontal Lap' : 'Board & Batten'}
Wall Color: ${spec.wallColor}
Addons: ${Object.entries(spec.addons).filter(([_, v]) => v).map(([k, _]) => k).join(', ') || 'None'}
Power Kit: ${spec.electricalTier || 'None'}

ESTIMATED COSTS
---------------
Materials: $${costs.material.toLocaleString()}
Labor: $${costs.labor.toLocaleString()}
Total: $${costs.total.toLocaleString()}
        `;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Placed_Spec_${spec.style.replace(' ', '_')}.txt`;
        a.click();
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

            <div className="w-[420px] bg-black/40 backdrop-blur-3xl border-r border-white/10 flex flex-col z-[60]">
                <div className="flex border-b border-white/10">
                    {['lunai', 'structure', 'metrics'].map((tab) => (
                        <button key={tab} onClick={() => setActivePanelTab(tab as any)} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activePanelTab === tab ? 'text-blue-400 bg-blue-600/10 border-b-2 border-blue-400' : 'text-slate-500 hover:text-slate-300'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {activePanelTab === 'lunai' && (
                        <div className="p-8 flex flex-col h-full">
                            <div className="flex-1 space-y-6">
                                {chat.map((m, i) => (
                                    <div key={i} className={`flex flex-col ${m.role === 'ai' ? 'items-start' : 'items-end'}`}>
                                        <div className={`max-w-[90%] p-5 rounded-3xl text-xs font-medium leading-relaxed ${m.role === 'ai' ? 'bg-white/5 border border-white/10 text-slate-200' : 'bg-blue-600 text-white'}`}>
                                            {m.text}
                                        </div>
                                    </div>
                                ))}
                                {isThinking && <div className="animate-pulse bg-white/5 h-16 w-3/4 rounded-3xl" />}
                                <div ref={chatEndRef} />
                            </div>

                            <div className="mt-4 flex gap-2 flex-wrap">
                                <button onClick={() => handleCommand("What power options do I have for this size?")} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/10 transition-all">What power options?</button>
                                <button onClick={() => handleCommand("Can I run a heater, PC, and lights on a 30A kit?")} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/10 transition-all">Can I run a heater?</button>
                                <button onClick={() => handleCommand("What's the easiest way to power this without trenching in New Brunswick?")} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/10 transition-all">No trenching power?</button>
                            </div>

                            <div className="mt-6">
                                <input disabled={isThinking} className="w-full bg-white/5 border border-white/10 p-5 rounded-[2rem] text-sm focus:border-blue-500/50 outline-none text-white transition-all" placeholder="Ask LUNAI about Placed designs..." onKeyDown={(e) => { if (e.key === 'Enter' && e.currentTarget.value.trim()) { handleCommand(e.currentTarget.value); e.currentTarget.value = ''; } }} />
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
                        </div>
                    )}

                    {activePanelTab === 'structure' && (
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
                                        { id: '20A', name: '20A Weekender', cost: 300, desc: 'Lights, laptop, light tools.' },
                                        { id: '30A', name: 'Current Command (Smart)', cost: 900, desc: '30A Umbilical with smart load manager.' },
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
                    )}
                </div>

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
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden z-10">
                <div className="absolute top-8 left-12 right-12 z-50 flex justify-between items-start">
                    <div className="flex gap-4">
                        <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors bg-white/5 backdrop-blur px-6 py-2 rounded-full border border-white/10">← BACK</button>
                        <button onClick={() => setShowShare(true)} className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 hover:text-white transition-colors bg-cyan-500/10 backdrop-blur px-6 py-2 rounded-full border border-cyan-500/20 hover:bg-cyan-500">SHARE</button>
                        <button onClick={handleSave} className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-green-400 transition-colors bg-green-500/10 backdrop-blur px-6 py-2 rounded-full border border-green-500/20 hover:bg-green-500/20">SAVE</button>
                    </div>
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-2xl border border-white/10 p-1.5 rounded-full">
                        {(['3D', 'BLUEPRINT'] as RenderMode[]).map(m => (
                            <button key={m} onClick={() => setSpec(s => ({ ...s, renderMode: m }))} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${spec.renderMode === m ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-white'}`}>{m}</button>
                        ))}
                    </div>
                </div>

                <div className="absolute top-24 right-12 z-40 bg-black/60 backdrop-blur-3xl border border-white/10 p-6 rounded-3xl w-64 shadow-2xl">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-2">{spec.style}</span>
                    <div className="text-3xl font-black">{spec.width}' × {spec.depth}'</div>
                    <div className="text-[10px] text-white/40 mt-2">{(spec.width * spec.depth).toLocaleString()} Sq Ft</div>
                </div>

                <ShedVisualizer spec={spec} weather={weather} focalFeature={focalPoint} />
            </div>

            {showROI && (
                <div className="fixed inset-0 z-[250] bg-[#020617] animate-in slide-in-from-bottom-10 fade-in duration-500">
                    <ROICalculator onClose={() => setShowROI(false)} />
                </div>
            )}

            {showShare && (
                <ShareModal
                    onClose={() => setShowShare(false)}
                    url={window.location.href}
                />
            )}

            {/* Authenticator Modal for Saving */}
            {showLogin && (
                <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 relative max-w-md w-full">
                        <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">✕</button>
                        <Authenticator>
                            {({ signOut, user }) => {
                                if (user) {
                                    // Auto-save once logged in? Or just show user state?
                                    // For now, let's just show a button to confirm save
                                    return (
                                        <div className="text-center">
                                            <h3 className="text-xl font-bold mb-4 text-slate-900">Welcome, {user.signInDetails?.loginId}</h3>
                                            <p className="mb-6 text-slate-500">You are signed in. Ready to save your design?</p>
                                            <div className="flex gap-4 justify-center">
                                                <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700">Confirm Save</button>
                                                <button onClick={signOut} className="text-slate-500 hover:text-slate-900 px-6 py-2">Sign Out</button>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        </Authenticator>
                    </div>
                </div>
            )}

            {showNudge && (
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
            )}
            {showInsurance && (
                <div className="fixed inset-0 z-[250] bg-[#020617] animate-in slide-in-from-bottom-10 fade-in duration-500 overflow-y-auto no-scrollbar">
                    <InsurancePartnerIntegration
                        spec={spec}
                        costs={costs}
                        onClose={() => setShowInsurance(false)}
                    />
                </div>
            )}

            {showHardware && (
                <div className="fixed inset-0 z-[250] bg-[#020617] animate-in slide-in-from-bottom-10 fade-in duration-500 overflow-y-auto no-scrollbar">
                    <ShedTetherHardwarePortal
                        spec={spec}
                        onClose={() => setShowHardware(false)}
                    />
                </div>
            )}

            {showRegional && (
                <div className="fixed inset-0 z-[250] bg-[#020617] animate-in slide-in-from-bottom-10 fade-in duration-500 overflow-y-auto no-scrollbar">
                    <RegionalExpansionDashboard
                        onClose={() => setShowRegional(false)}
                    />
                </div>
            )}

            {showAnalytics && (
                <div className="fixed inset-0 z-[250] bg-[#020617] animate-in slide-in-from-bottom-10 fade-in duration-500 overflow-y-auto no-scrollbar">
                    <AdvancedAnalyticsDashboard
                        spec={spec}
                        costs={costs}
                        onClose={() => setShowAnalytics(false)}
                    />
                </div>
            )}
        </div >
    );
};

export default EnterpriseBuilder;
``` 
 
## FILE: components\LivePowerGauge.tsx 
```typescript 
import React, { useState, useEffect } from 'react';

interface LivePowerGaugeProps {
    maxAmps?: number;
    loadFactor?: number; // 0 to 1
    status?: string;
}

const LivePowerGauge: React.FC<LivePowerGaugeProps> = ({ maxAmps = 15, loadFactor = 0.5, status: propStatus }) => {
    const [amps, setAmps] = useState(maxAmps * loadFactor);
    const [status, setStatus] = useState(propStatus || 'All Systems Go');
    const [history, setHistory] = useState<number[]>(new Array(20).fill(maxAmps * loadFactor));

    useEffect(() => {
        const interval = setInterval(() => {
            const fluctuation = (Math.random() - 0.5) * (maxAmps * 0.05);
            setAmps(prev => {
                const targetBase = maxAmps * loadFactor;
                const next = Math.max(0, Math.min(maxAmps + 0.5, prev + fluctuation + (targetBase - prev) * 0.1));
                
                setHistory(h => [...h.slice(1), next]);
                
                if (!propStatus) {
                    if (next > maxAmps * 0.9) setStatus('Critical Load Warning');
                    else if (next > maxAmps * 0.7) setStatus('High Demand');
                    else setStatus('All Systems Go');
                }
                return next;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [maxAmps, loadFactor, propStatus]);

    const percentage = (amps / maxAmps) * 100;
    const isOverloaded = amps > maxAmps * 0.85;

    return (
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            
            <div className="flex justify-between items-center mb-8 relative z-10">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-2 block">Live Power Stream</span>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Current Command</h3>
                </div>
                <div className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse border transition-colors duration-500 ${
                    isOverloaded 
                    ? 'bg-orange-600/20 text-orange-400 border-orange-500/30' 
                    : 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30'
                }`}>
                    {propStatus || status}
                </div>
            </div>

            <div className="relative h-48 flex items-center justify-center relative z-10">
                <svg className="w-full h-full -rotate-90 filter drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="75"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        className="text-white/5"
                        strokeDasharray="471"
                    />
                    <circle
                        cx="50%"
                        cy="50%"
                        r="75"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        className={`transition-all duration-1000 ease-out ${isOverloaded ? 'text-orange-500' : 'text-cyan-500'}`}
                        strokeDasharray="471"
                        strokeDashoffset={471 - (471 * percentage) / 100}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute text-center">
                    <div className="text-5xl font-black tracking-tighter text-white tabular-nums">{amps.toFixed(1)}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-cyan-500/40">Amps Output</div>
                </div>
            </div>

            {/* Pro Sparkline */}
            <div className="h-10 w-full mt-6 flex items-end gap-[2px] px-2">
                {history.map((h, i) => (
                    <div
                        key={i}
                        className={`flex-1 rounded-t-sm transition-all duration-1000 ${
                            h > maxAmps * 0.85 ? 'bg-orange-500/40' : 'bg-cyan-500/20'
                        }`}
                        style={{ height: `${Math.min(100, (h / maxAmps) * 100)}%` }}
                    />
                ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                    <span className="text-[8px] font-black uppercase text-slate-500 block mb-1">Grid Limit</span>
                    <span className="text-sm font-bold uppercase tracking-tight text-white">{maxAmps}A TETHER</span>
                </div>
                <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                    <span className="text-[8px] font-black uppercase text-slate-500 block mb-1">Efficiency</span>
                    <span className="text-sm font-bold uppercase tracking-tight text-white">{percentage < 40 ? 'EXCELLENT' : (percentage < 80 ? 'NOMINAL' : 'WARM')}</span>
                </div>
            </div>

            <p className="mt-6 text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] leading-relaxed relative z-10">
                PLACED V12 Smart Management Active. <br/>
                Optimizing for Atlantic Power Cycles.
            </p>
        </div>
    );
};

export default LivePowerGauge;
``` 
 
## FILE: components\PowerLanding.tsx 
```typescript 
import React from 'react';

const PowerLanding = ({ onBack, onBuild }: { onBack: () => void, onBuild: () => void }) => {
    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-orange-600 overflow-y-auto no-scrollbar pb-40">
            {/* HERO */}
            <header className="relative pt-40 pb-20 px-10 border-b border-white/5">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?q=80&w=2544&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <button onClick={onBack} className="mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors bg-white/5 backdrop-blur px-6 py-2 rounded-full border border-white/10">← Return to HQ</button>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-500/20 rounded-full mb-8 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">Critical Safety Advisory</span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
                        The Cord <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Stops Here.</span>
                    </h1>
                    <p className="text-white/40 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-12">
                        Stop running extension cords across the lawn in February. It’s dangerous, inefficient, and frankly, amateur hour.
                    </p>
                    <button onClick={onBuild} className="bg-orange-600 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-500 transition-all shadow-2xl shadow-orange-900/50 hover:-translate-y-1">
                        Build a Powered Shed →
                    </button>
                </div>
            </header>

            {/* THE PROBLEM */}
            <section className="py-40 px-10">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-6 block">The DIY Reality</span>
                        <h2 className="text-5xl font-black mb-8 tracking-tighter uppercase">Extension Cords Are <br /> Temporary.</h2>
                        <p className="text-white/40 text-lg mb-8 leading-relaxed">
                            You buy a shed for $5k and power it with a $40 cord from Home Depot. Then snow covers it. Then you mow over it. Then volt drop kills your tools.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-4 text-white/80 font-bold">
                                <span className="text-red-500 text-2xl">✕</span> Fire Hazard in Snow/Rain
                            </li>
                            <li className="flex items-center gap-4 text-white/80 font-bold">
                                <span className="text-red-500 text-2xl">✕</span> Voltage Drop Damages Motors
                            </li>
                            <li className="flex items-center gap-4 text-white/80 font-bold">
                                <span className="text-red-500 text-2xl">✕</span> Looks Like Trash
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-red-600/5 group-hover:bg-red-600/10 transition-colors" />
                        <img src="https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?q=80&w=2544&auto=format&fit=crop" className="w-full h-96 object-cover rounded-2xl grayscale mix-blend-luminosity opacity-50 group-hover:opacity-80 transition-opacity" alt="Messy cords" />
                    </div>
                </div>
            </section>

            {/* THE SOLUTION */}
            <section className="py-40 px-10 bg-white text-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600 mb-6 block">The Placed Standard</span>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-8">Professional Power <br /> Pre-Installed.</h2>
                        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">
                            We rough-in the wiring, panels, and outlets in our factory. Your electrician just hooks up the final connection. Safe, coded, done.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-200">
                            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-3xl mb-8">⚡</div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">20A Weekender</h3>
                            <p className="text-slate-500 font-bold text-sm mb-6">For lights, laptops, and chargers.</p>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-center gap-2 text-xs font-bold text-slate-700">✓ 4 Interior Outlets</li>
                                <li className="flex items-center gap-2 text-xs font-bold text-slate-700">✓ LED Overhead Light</li>
                                <li className="flex items-center gap-2 text-xs font-bold text-slate-700">✓ Exterior GFI Plug</li>
                            </ul>
                            <div className="text-3xl font-black tracking-tighter">$300</div>
                        </div>
                        <div className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden transform md:-translate-y-8 shadow-2xl shadow-slate-900/40">
                            <div className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-black px-4 py-2 rounded-bl-xl uppercase tracking-widest">Most Popular</div>
                            <div className="w-16 h-16 bg-orange-600 text-white rounded-2xl flex items-center justify-center text-3xl mb-8">🛠️</div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">30A Workshop</h3>
                            <p className="text-white/40 font-bold text-sm mb-6">For heaters, saws, and serious work.</p>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-center gap-2 text-xs font-bold text-white/80">✓ 6 Interior Outlets (20A)</li>
                                <li className="flex items-center gap-2 text-xs font-bold text-white/80">✓ 30A Sub-Panel</li>
                                <li className="flex items-center gap-2 text-xs font-bold text-white/80">✓ Dedicated Heater Circuit</li>
                            </ul>
                            <div className="text-3xl font-black tracking-tighter text-orange-500">$900</div>
                        </div>
                        <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-200">
                            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-3xl mb-8">🏠</div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">50A Guest Suite</h3>
                            <p className="text-slate-500 font-bold text-sm mb-6">Full living capability. Requires permit.</p>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-center gap-2 text-xs font-bold text-slate-700">✓ Full Kitchen/Bath Prep</li>
                                <li className="flex items-center gap-2 text-xs font-bold text-slate-700">✓ 50A Panel</li>
                                <li className="flex items-center gap-2 text-xs font-bold text-slate-700">✓ 240V Heating Config</li>
                            </ul>
                            <div className="text-3xl font-black tracking-tighter">$1,500</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SAFETY CTA */}
            <section className="py-40 px-10 text-center">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-600 to-red-600 rounded-[4rem] p-20 shadow-2xl shadow-orange-900/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
                    <div className="relative z-10">
                        <h2 className="text-5xl font-black mb-8 tracking-tighter uppercase">Stop Playing with Fire.</h2>
                        <p className="text-white/80 text-xl font-bold mb-10 max-w-2xl mx-auto">
                            Get a shed that's built like a house, not a plastic toy. Book your consultation today and let's talk power.
                        </p>
                        <button onClick={onBuild} className="bg-white text-orange-600 px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-xl">
                            Configure Your Workshop Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PowerLanding;
``` 
 
## FILE: components\ElectricianPortal.tsx 
```typescript 
import React, { useState } from 'react';

const ElectricianPortal = ({ onBack }: { onBack: () => void }) => {
    const [step, setStep] = useState<'intro' | 'apply' | 'success'>('intro');

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500 overflow-y-auto no-scrollbar pb-40">
            {step === 'intro' && (
                <div className="pt-40 px-10 max-w-7xl mx-auto">
                    <button onClick={onBack} className="mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors bg-white/5 backdrop-blur px-6 py-2 rounded-full border border-white/10">← Return to HQ</button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-900/20 border border-cyan-500/20 rounded-full mb-8">
                                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Trade Partners Only</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
                                Stop Chasing <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Attic Wire.</span>
                            </h1>
                            <p className="text-white/40 text-xl font-medium leading-relaxed mb-10 max-w-xl">
                                Join the Placed Network. We deliver the shed with the rough-in done. You just handle the final hookup.
                                <br /><br />
                                <span className="text-white">Flat Rate. Zero Crawling. Volume Work.</span>
                            </p>
                            <button onClick={() => setStep('apply')} className="bg-cyan-500 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all shadow-2xl shadow-cyan-900/50 hover:-translate-y-1">
                                Apply for Access →
                            </button>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 relative overflow-hidden">
                            <div className="absolute top-10 right-10 flex flex-col gap-4 opacity-50">
                                <div className="bg-white/10 p-4 rounded-xl w-64 backdrop-blur-md">
                                    <div className="h-2 w-20 bg-cyan-500 rounded mb-2" />
                                    <div className="h-2 w-32 bg-white/20 rounded" />
                                </div>
                                <div className="bg-white/10 p-4 rounded-xl w-64 backdrop-blur-md translate-x-8">
                                    <div className="h-2 w-20 bg-cyan-500 rounded mb-2" />
                                    <div className="h-2 w-32 bg-white/20 rounded" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-8 relative z-10">The Placed Promise</h3>
                            <ul className="space-y-6 relative z-10">
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-cyan-900/40 rounded-xl flex items-center justify-center text-cyan-400 text-xl">⚡</div>
                                    <div>
                                        <h4 className="font-black uppercase tracking-widest text-xs mb-1">Pre-Wired Panels</h4>
                                        <p className="text-white/40 text-sm font-medium">Every shed arrives with a sub-panel and circuits tested. No rough-in needed.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-cyan-900/40 rounded-xl flex items-center justify-center text-cyan-400 text-xl">🤝</div>
                                    <div>
                                        <h4 className="font-black uppercase tracking-widest text-xs mb-1">Referral Pipeline</h4>
                                        <p className="text-white/40 text-sm font-medium">When a customer in your zone buys a shed, you get the alert first.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-cyan-900/40 rounded-xl flex items-center justify-center text-cyan-400 text-xl">📱</div>
                                    <div>
                                        <h4 className="font-black uppercase tracking-widest text-xs mb-1">Digital Paperwork</h4>
                                        <p className="text-white/40 text-sm font-medium">Permits and specs are auto-generated and sent to your phone.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {step === 'apply' && (
                <div className="pt-40 px-10 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-500">
                    <button onClick={() => setStep('intro')} className="mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">← Back</button>
                    <h2 className="text-4xl font-black mb-10 tracking-tighter uppercase">Partner Application</h2>
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep('success'); }}>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Business Name</label>
                            <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-cyan-500 outline-none transition-colors" placeholder="e.g. Saint John Electric" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Red Seal #</label>
                            <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-cyan-500 outline-none transition-colors" placeholder="######" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Service Area</label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-cyan-500 outline-none transition-colors appearance-none">
                                <option>Saint John & Valley</option>
                                <option>Moncton / Dieppe</option>
                                <option>Fredericton</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-cyan-500 text-white p-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all shadow-xl mt-6">
                            Submit Application
                        </button>
                    </form>
                </div>
            )}

            {step === 'success' && (
                <div className="pt-40 px-10 max-w-xl mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-4xl mb-8 mx-auto shadow-2xl shadow-green-900/50">✓</div>
                    <h2 className="text-4xl font-black mb-6 tracking-tighter uppercase">Application Received.</h2>
                    <p className="text-white/40 font-medium mb-10">We're reviewing your credentials. Expect a call from our Contractor Relations team within 24 hours.</p>
                    <button onClick={onBack} className="text-white hover:text-cyan-400 font-black text-xs uppercase tracking-[0.2em] transition-colors">Return to Homepage</button>
                </div>
            )}
        </div>
    );
};

export default ElectricianPortal;
``` 
 
## FILE: components\CheckoutFlow.tsx 
```typescript 

import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import { ShedSpec, CostEstimate } from '../types';
import { UPGRADES } from '../constants';

interface CheckoutFlowProps {
  spec: ShedSpec;
  costs: CostEstimate;
  onCancel: () => void;
  onComplete: () => void;
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ spec, costs, onCancel, onComplete }) => {
  const [step, setStep] = useState<'review' | 'delivery' | 'payment' | 'confirm'>('review');
  const [showPowerOptions, setShowPowerOptions] = useState(false);
  const [shedCare, setShedCare] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Saint John',
    province: 'NB',
    paymentMethod: 'full' as 'full' | 'rto36' | 'rto60'
  });

  const activeAddons = Object.entries(spec.addons)
    .filter(([_, active]) => active)
    .map(([id]) => UPGRADES.find(u => u.id === id));

  const steps = [
    { id: 'review', label: 'Review' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirm', label: 'Confirm' }
  ];

  const [isProcessing, setIsProcessing] = useState(false);

  const generateReceipt = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Header
    doc.setFillColor(249, 115, 22); // Orange-500
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("PLACED | Construction Receipt", 20, 25);

    // Order Details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    let y = 60;
    doc.text(`Customer: ${formData.firstName} ${formData.lastName}`, 20, y);
    doc.text(`Date: ${date}`, 150, y);
    y += 10;
    doc.text(`Email: ${formData.email}`, 20, y);
    y += 20;

    doc.setFont("helvetica", "bold");
    doc.text("Build Specification", 20, y);
    doc.line(20, y + 2, 190, y + 2);
    y += 15;

    doc.setFont("helvetica", "normal");
    doc.text(`Model: ${spec.width}' x ${spec.depth}' ${spec.style}`, 20, y);
    doc.text(`$${costs.material.toLocaleString()}`, 170, y, { align: 'right' });
    y += 10;

    if (spec.electricalTier) {
      doc.text(`Power Kit: ${spec.electricalTier === '20A' ? '20A Creator' : '30A Comfort'}`, 20, y);
      doc.text(`$${(spec.electricalTier === '20A' ? 1200 : 1850).toLocaleString()}`, 170, y, { align: 'right' });
      y += 10;
    }

    Object.entries(spec.addons).forEach(([key, val]) => {
      if (val) {
        const up = UPGRADES.find(u => u.id === key);
        if (up) {
          doc.text(`Addon: ${up.name}`, 20, y);
          doc.text(`$${up.cost.toLocaleString()}`, 170, y, { align: 'right' });
          y += 10;
        }
      }
    });

    if (shedCare) {
      y += 10;
      doc.setTextColor(0, 100, 0);
      doc.setFont("helvetica", "bold");
      doc.text("ShedCare Subscription (Monthly)", 20, y);
      doc.text("$29.00/mo", 170, y, { align: 'right' });
      doc.setTextColor(0, 0, 0);
    }

    y += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, 190, y);
    y += 15;

    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL PROJECT VALUATION`, 20, y);
    doc.text(`$${costs.total.toLocaleString()}`, 170, y, { align: 'right' });

    doc.save(`Placed_Receipt_${date.replace(/\//g, '-')}.pdf`);
  };

  const handleNext = async () => {
    if (step === 'review') setStep('delivery');
    else if (step === 'delivery') setStep('payment');
    else if (step === 'payment') setStep('confirm');
    else {
      setIsProcessing(true);
      // Simulate API call
      await new Promise(r => setTimeout(r, 2000));
      generateReceipt();
      setIsProcessing(false);
      onComplete();
    }
  };

  const handleBack = () => {
    if (step === 'delivery') setStep('review');
    else if (step === 'payment') setStep('delivery');
    else if (step === 'confirm') setStep('payment');
    else onCancel();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-40 px-6 md:px-10 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-16 px-4 md:px-20 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0 mx-20" />
          {steps.map((s, i) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all ${steps.findIndex(x => x.id === step) >= i ? 'bg-orange-600 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                {i + 1}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${step === s.id ? 'text-slate-950' : 'text-slate-400'
                }`}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200 border border-slate-100">
            {step === 'review' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-4xl font-black tracking-tighter uppercase mb-10">Review Your Build</h2>
                <div className="space-y-8">
                  <div className="flex items-center gap-8 border-b border-slate-100 pb-8">
                    <div className="w-32 h-32 bg-slate-100 rounded-3xl flex items-center justify-center text-5xl">🏠</div>
                    <div>
                      <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block mb-2">Structure Primitive</span>
                      <h3 className="text-2xl font-black uppercase tracking-tight">{spec.width}' × {spec.depth}' {spec.style}</h3>
                      <p className="text-slate-500 font-medium">{spec.sidingType === 'lap' ? 'Horizontal Lap' : 'Board & Batten'} Siding • {spec.wallColor} Finish</p>
                    </div>
                  </div>

                  {activeAddons.length > 0 && (
                    <div className="py-2">
                      <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-6">Selected Addons</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeAddons.map(addon => addon && (
                          <div key={addon.id} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <span className="text-2xl">{addon.icon}</span>
                            <span className="text-xs font-bold uppercase tracking-tight">{addon.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Power Check Section */}
                  <div className="bg-slate-50 border-2 border-slate-100 p-8 rounded-[2rem] mb-8">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">Did you plan your power?</h3>
                    <p className="text-slate-500 text-sm mb-6 max-w-md">Most homeowners add a plug-in power kit now so their shed is ready for heat, lights, and work from day one.</p>

                    {!showPowerOptions ? (
                      <div className="flex gap-4">
                        <button onClick={() => setStep('delivery')} className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800">Yes, Power Handled</button>
                        <button onClick={() => setShowPowerOptions(true)} className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-orange-500 hover:text-orange-600">Show Plug-in Options</button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {[
                          { t: "20A Creator Kit", d: "Lights, laptop, light tools", p: "+$1,200" },
                          { t: "30A Comfort Kit", d: "Heater, PC, serious tools, fully active", p: "+$1,850" },
                          { t: "50A Pro Service", d: "Heavy heating/cooling (Requires Permit)", p: "+$3,500" }
                        ].map((opt, i) => (
                          <button key={i} className="w-full flex justify-between items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all text-left group">
                            <div>
                              <div className="font-black uppercase text-sm group-hover:text-orange-700">{opt.t}</div>
                              <div className="text-xs text-slate-500">{opt.d}</div>
                            </div>
                            <div className="font-bold text-slate-900">{opt.p}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-orange-50 border border-orange-100 p-8 rounded-[2rem]">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">🚛</span>
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-tight text-orange-800 mb-1">Saint John Direct Delivery</h4>
                        <p className="text-xs text-orange-700/80 font-medium">Your location qualifies for free localized delivery within the Saint John city limits.</p>
                      </div>
                    </div>
                  </div>

                  {/* ShedCare Subscription */}
                  <div className={`p-8 rounded-[2rem] border-2 transition-all cursor-pointer ${shedCare ? 'bg-green-50 border-green-500' : 'bg-white border-slate-100 hover:border-green-200'}`} onClick={() => setShedCare(!shedCare)}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${shedCare ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {shedCare ? '✓' : '+'}
                        </div>
                        <div>
                          <h4 className="text-lg font-black uppercase tracking-tight text-slate-900">ShedCare™ Protection</h4>
                          <p className="text-xs text-slate-500 font-medium max-w-sm mt-1">
                            Proactive maintenance, 24/7 power monitoring alerts, and priority storm response.
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-slate-900">$19<span className="text-xs text-slate-400 font-bold">/mo</span></div>
                        {shedCare && <div className="text-[10px] font-black uppercase text-green-600 tracking-widest mt-1">Active</div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'delivery' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-4xl font-black tracking-tighter uppercase mb-10">Delivery Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">First Name</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 text-sm font-bold outline-none focus:border-slate-900 transition-all"
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">Last Name</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 text-sm font-bold outline-none focus:border-slate-900 transition-all"
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">Delivery Address</label>
                    <input
                      type="text"
                      placeholder="123 Uptown St"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 text-sm font-bold outline-none focus:border-slate-900 transition-all"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">City</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 text-sm font-bold outline-none"
                      value={formData.city}
                      readOnly
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">Email</label>
                    <input
                      type="email"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 text-sm font-bold outline-none focus:border-slate-900 transition-all"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-4xl font-black tracking-tighter uppercase mb-10">Payment Plan</h2>
                <div className="space-y-4">
                  {[
                    { id: 'full', label: 'Pay In Full', sub: 'Single secure transaction', price: costs.total },
                    { id: 'rto36', label: '36 Month RTO', sub: 'No credit check', price: Math.ceil(costs.total / 36 * 1.3) },
                    { id: 'rto60', label: '60 Month RTO', sub: 'Lowest monthly cost', price: Math.ceil(costs.total / 60 * 1.5) }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: option.id as any })}
                      className={`w-full flex items-center justify-between p-8 rounded-3xl border-2 transition-all ${formData.paymentMethod === option.id ? 'border-orange-600 bg-orange-50' : 'border-slate-100 hover:border-slate-200'
                        }`}
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-6 h-6 rounded-full border-4 ${formData.paymentMethod === option.id ? 'border-orange-600 bg-white' : 'border-slate-200'}`} />
                        <div className="text-left">
                          <span className="text-lg font-black uppercase tracking-tight block">{option.label}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{option.sub}</span>
                        </div>
                      </div>
                      <span className="text-xl font-black">${option.price.toLocaleString()}{option.id.startsWith('rto') ? '/mo' : ''}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'confirm' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center py-10">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-10">✓</div>
                <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">Almost There!</h2>
                <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto mb-10">Please review your delivery details and order summary before finalizing your Placed asset.</p>
                <div className="bg-slate-50 p-10 rounded-[3rem] text-left border border-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-4">Delivery Recipient</span>
                  <div className="text-xl font-black uppercase mb-1">{formData.firstName} {formData.lastName}</div>
                  <div className="text-slate-500 font-medium">{formData.address}, {formData.city}, NB</div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-16 flex gap-6">
              <button
                onClick={handleBack}
                className="flex-1 p-8 rounded-[2rem] text-xs font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all"
              >
                {step === 'review' ? 'Cancel' : 'Back'}
              </button>
              <button
                onClick={handleNext}
                className="flex-[2] p-8 rounded-[2rem] bg-slate-900 text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
              >
                {step === 'confirm' ? (isProcessing ? 'Securing Slot...' : 'Reserve Construction Slot') : 'Continue'}
              </button>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 sticky top-40">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-8 pb-4 border-b border-slate-100">Order Summary</h4>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-500">Base Structure</span>
                  <span className="font-black font-mono">${costs.material.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-500">Fabrication/Labor</span>
                  <span className="font-black font-mono">${costs.labor.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-500">Delivery</span>
                  <span className="font-black uppercase text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-500">Tax (HST)</span>
                  <span className="font-black font-mono">${Math.ceil(costs.total * 0.15).toLocaleString()}</span>
                </div>
                {shedCare && (
                  <div className="flex justify-between text-sm py-3 border-t border-slate-100 border-dashed">
                    <span className="font-bold text-green-600">ShedCare™ (Monthly)</span>
                    <span className="font-black font-mono text-green-600">$29.00</span>
                  </div>
                )}
              </div>
              <div className="pt-8 border-t border-slate-100">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Price</span>
                  <span className="text-4xl font-black tracking-tighter">${costs.total.toLocaleString()}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase text-slate-400 tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Secure SSL Encrypted
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase text-slate-400 tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> 10-Year Structural Warranty
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
``` 
 
## FILE: components\ErrorBoundary.tsx 
```typescript 
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white p-4">
                    <div className="bg-zinc-800 p-8 rounded-2xl border border-red-500/30 max-w-md w-full">
                        <h1 className="text-2xl font-bold mb-4 text-red-400">Something went wrong.</h1>
                        <p className="text-zinc-400 mb-6">The dashboard encountered an unexpected error.</p>

                        {this.state.error && (
                            <div className="bg-black/50 p-4 rounded-lg text-xs font-mono text-zinc-500 mb-6 overflow-auto max-h-40">
                                {this.state.error.toString()}
                            </div>
                        )}

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-bold transition-all"
                        >
                            Reload Page
                        </button>
                        <a href="/" className="block text-center mt-4 text-zinc-500 hover:text-white text-sm">Return to Home</a>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
``` 
 
## FILE: components\AdminDashboard.tsx 
```typescript 
import React, { useState } from 'react';

const MOCK_LEADS = [
    { id: 'L-101', name: 'James H.', model: '12x20 Modern Studio', status: 'deposit', value: 18500, date: '2h ago' },
    { id: 'L-102', name: 'Sarah M.', model: '10x16 Quaker', status: 'framing', value: 12400, date: '1d ago' },
    { id: 'L-103', name: 'Robert B.', model: '24x24 Lofted Barn', status: 'finishing', value: 32000, date: '3d ago' },
    { id: 'L-104', name: 'Emily C.', model: '8x12 A-Frame', status: 'ready', value: 6500, date: '5d ago' },
];

const COLUMNS = [
    { id: 'deposit', label: 'Deposit Paid', color: 'bg-blue-500' },
    { id: 'framing', label: 'Framing / Shell', color: 'bg-orange-500' },
    { id: 'finishing', label: 'Finishing', color: 'bg-purple-500' },
    { id: 'ready', label: 'Ready for Delivery', color: 'bg-green-500' }
];

const LeadDetailModal = ({ lead, onClose }: { lead: any, onClose: () => void }) => (
    <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#0f172a] border border-white/10 w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
            <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white text-2xl">×</button>
            <div className="mb-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2 block">Lead Spec # {lead.id}</span>
                <h2 className="text-4xl font-black text-white">{lead.name}</h2>
                <div className="flex gap-4 mt-4">
                    <span className="bg-white/5 px-4 py-2 rounded-full text-[10px] font-bold uppercase text-slate-400 border border-white/10">{lead.date}</span>
                    <span className="bg-green-500/20 px-4 py-2 rounded-full text-[10px] font-black uppercase text-green-400 border border-green-500/30">Valor: ${lead.value.toLocaleString()}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-4">Structure</h4>
                    <div className="text-xl font-bold text-white mb-1">{lead.model}</div>
                    <div className="text-sm text-slate-400">Standard Framing</div>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-4">Contact</h4>
                    <div className="text-lg font-bold text-white mb-1">user@{lead.id.toLowerCase()}.com</div>
                    <div className="text-sm text-slate-400">+1 (506) 555-0123</div>
                </div>
            </div>

            <div className="flex gap-4">
                <button className="flex-1 bg-cyan-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-cyan-500 transition-colors">Print Work Order</button>
                <button className="flex-1 bg-white/5 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10">Email Client</button>
            </div>
        </div>
    </div>
);

const AdminDashboard: React.FC = () => {
    const [leads, setLeads] = useState(MOCK_LEADS);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [selectedLead, setSelectedLead] = useState<any>(null);

    const onDragStart = (e: React.DragEvent, id: string) => {
        setDraggedItem(id);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const onDrop = (e: React.DragEvent, status: string) => {
        if (!draggedItem) return;
        setLeads(prev => prev.map(l => l.id === draggedItem ? { ...l, status } : l));
        setDraggedItem(null);
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-10 font-sans selection:bg-cyan-500">
            <header className="flex justify-between items-end mb-16 max-w-7xl mx-auto">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-4 block">Command Center</span>
                    <h1 className="text-6xl font-black uppercase tracking-tighter">Placed <span className="text-white/20">Admin</span></h1>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black text-white mb-1">$69,400</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Active Pipeline Value</span>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20">
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Total Active Builds</h3>
                    <div className="text-5xl font-black text-white">4</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Avg. Ticket Size</h3>
                    <div className="text-5xl font-black text-white">$17.3k</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] lg:col-span-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                        <span className="text-6xl">🤖</span>
                    </div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">LUNAI Insight</h3>
                    <p className="text-lg font-medium text-white/80 leading-relaxed max-w-lg">
                        "The new <span className="text-white font-bold">$1,850 Comfort Kit</span> has seen a 45% lift in conversion since prioritizing the 'Plug-In Lifestyle' messaging. ShedCare adoption is at 60%."
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto overflow-x-auto pb-10">
                <div className="flex gap-8 min-w-[1200px]">
                    {COLUMNS.map(col => (
                        <div
                            key={col.id}
                            className="flex-1 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 min-h-[500px] flex flex-col"
                            onDragOver={onDragOver}
                            onDrop={(e) => onDrop(e, col.id)}
                        >
                            <div className="flex items-center gap-3 mb-8 px-2">
                                <div className={`w-3 h-3 rounded-full ${col.color}`} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{col.label}</span>
                                <span className="ml-auto text-[10px] font-bold text-white/20">{leads.filter(l => l.status === col.id).length}</span>
                            </div>

                            <div className="space-y-4 flex-1">
                                {leads.filter(l => l.status === col.id).map(lead => (
                                    <div
                                        key={lead.id}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, lead.id)}
                                        onClick={() => setSelectedLead(lead)}
                                        className="bg-[#1e293b] p-6 rounded-3xl border border-white/5 hover:border-cyan-500/50 cursor-grab active:cursor-grabbing shadow-xl transition-all group hover:scale-[1.02]"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{lead.id}</span>
                                            <span className="text-[9px] font-bold text-slate-600">{lead.date}</span>
                                        </div>
                                        <h4 className="text-lg font-black text-white mb-1">{lead.name}</h4>
                                        <p className="text-xs text-cyan-400 font-bold uppercase tracking-tight mb-4">{lead.model}</p>
                                        <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                                            <span className="text-[10px] text-slate-400">Value</span>
                                            <span className="font-mono text-sm font-bold">${lead.value.toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedLead && <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />}
        </div>
    );
};

export default AdminDashboard;
``` 
 
## FILE: amplify\data\resource.ts 
```typescript 
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/**
 * Define the data schema for saving sheds.
 */
const schema = a.schema({
    ShedDesign: a
        .model({
            style: a.string().required(),
            width: a.integer().required(),
            depth: a.integer().required(),
            wallColor: a.string(),
            sidingType: a.string(),
            // JSON stringify complex objects for simplicity in v1, or break them out
            addonsJson: a.string(),
            specJson: a.string().required(), // Full spec backup

            // Metadata
            name: a.string(),
            isOrdered: a.boolean(),
        })
        .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'userPool',
    },
});
``` 
 
