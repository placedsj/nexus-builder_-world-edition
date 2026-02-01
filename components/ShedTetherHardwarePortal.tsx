import React, { useState, useMemo } from 'react';
import { ShedSpec } from '../types';

interface ShedTetherHardwarePortalProps {
    spec: ShedSpec;
    onClose?: () => void;
    onSelect?: (tier: string) => void;
}

interface TetherKit {
    id: string;
    name: string;
    amperage: number;
    voltage: number;
    wireGauge: string;
    maxLength: number;
    price: number;
    features: string[];
    use_cases: string[];
    installation_hours: number;
    cable_type: string;
}

const ShedTetherHardwarePortal: React.FC<ShedTetherHardwarePortalProps> = ({ spec, onClose, onSelect }) => {
    const [selectedKit, setSelectedKit] = useState<string>('30A');
    const [showCalculator, setShowCalculator] = useState(false);
    const [distance, setDistance] = useState(50); // feet

    const tetherKits: TetherKit[] = [
        {
            id: '20A',
            name: 'Weekender Tether',
            amperage: 20,
            voltage: 120,
            wireGauge: '#10 AWG',
            maxLength: 150,
            price: 285,
            features: [
                'Single phase 120V supply',
                'Compact NEMA 3 enclosure',
                'GFCI protected',
                'Weather-sealed connections',
                'Standard duplex outlets'
            ],
            use_cases: ['Home office', 'Art studio', 'Garden room', 'Backyard workshop'],
            installation_hours: 2,
            cable_type: 'SOOW jacket outdoor-rated'
        },
        {
            id: '30A',
            name: 'Current Command (Smart)',
            amperage: 30,
            voltage: 240,
            wireGauge: '#8 AWG',
            maxLength: 200,
            price: 895,
            features: [
                'Dual voltage 120/240V capability',
                'Smart circuit monitoring (App-enabled)',
                'LUNAI predictive load management',
                'Heavy-duty NEMA 4 enclosure',
                'Hot-swap connector design',
                'Built-in surge suppression',
                'Real-time amp gauge + digital display'
            ],
            use_cases: [
                'Maker studios (30A heating + power tools)',
                'Home gyms (cardio + lighting)',
                'Small residential buildings',
                'Design studios with equipment',
                'LUNAI monitoring compatible'
            ],
            installation_hours: 4,
            cable_type: 'SOOW/SJOW hybrid marine-grade 4/0'
        },
        {
            id: '50A',
            name: 'Industrial Umbilical',
            amperage: 50,
            voltage: 240,
            wireGauge: '4 AWG',
            maxLength: 150,
            price: 1850,
            features: [
                'Heavy-duty 50A 240V service',
                'NEMA 4X stainless steel enclosure',
                'Tri-pole locking connector',
                'Industrial-grade weatherproofing',
                'Multi-circuit distribution',
                'Advanced monitoring suite',
                'Hardwired installation'
            ],
            use_cases: [
                'Multi-unit installations',
                'Commercial applications',
                'Heavy production facilities',
                'Future expansion potential'
            ],
            installation_hours: 6,
            cable_type: 'THHN/THWN copper in conduit'
        }
    ];

    const selectedTether = useMemo(() => {
        return tetherKits.find(k => k.id === selectedKit) || tetherKits[1];
    }, [selectedKit]);

    // Voltage Drop Calculation
    const voltageDropCalc = useMemo(() => {
        const current = selectedTether.amperage;
        const resistance = selectedTether.id === '20A' ? 1.24 : selectedTether.id === '30A' ? 0.62 : 0.31; // ohms per 1000 feet
        const totalDistance = distance * 2; // Round trip
        const voltageDrop = (current * totalDistance * resistance) / 1000;
        const dropPercent = (voltageDrop / selectedTether.voltage) * 100;
        
        return {
            drop: voltageDrop.toFixed(2),
            percent: dropPercent.toFixed(2),
            isAcceptable: dropPercent < 5, // NEC standard
            recommendation: dropPercent > 5 ? 'Consider upgrading to heavier gauge' : 'Voltage drop acceptable'
        };
    }, [selectedTether, distance]);

    // Load Capacity Calculator
    const loadCapacity = useMemo(() => {
        const maxWatts = selectedTether.voltage === 120 
            ? selectedTether.amperage * 120 * 0.8 // 80% continuous rating
            : selectedTether.amperage * 240 * 0.8;

        return {
            maxWatts: Math.round(maxWatts),
            recommended: Math.round(maxWatts * 0.7), // 70% for safety margin
            circuits: selectedTether.id === '20A' ? 2 : selectedTether.id === '30A' ? 4 : 6
        };
    }, [selectedTether]);

    return (
        <div className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-black min-h-screen p-8 text-white font-sans overflow-y-auto no-scrollbar">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-4 block">Hardware Integration</span>
                            <h1 className="text-6xl font-black tracking-tighter uppercase mb-6">Shed Tether Specs.</h1>
                            <p className="text-white/40 max-w-2xl text-lg font-medium leading-relaxed">
                                PLACED-certified power umbilicals. Shore-grade tethers for safe, permanent structures without trenching. LUNAI-compatible smart monitoring on 30A & above.
                            </p>
                        </div>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-all"
                            >
                                ← Back
                            </button>
                        )}
                    </div>
                </div>

                {/* Tether Kit Selection */}
                <div className="mb-16">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 block">Available Kits</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {tetherKits.map(kit => (
                            <button
                                key={kit.id}
                                onClick={() => setSelectedKit(kit.id)}
                                className={`group relative rounded-3xl border-2 p-8 transition-all text-left ${
                                    selectedKit === kit.id
                                        ? 'border-orange-500 bg-orange-500/10 shadow-2xl shadow-orange-900/20'
                                        : 'border-white/10 bg-white/5 hover:border-white/20'
                                }`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10">
                                    <div className="text-3xl font-black mb-4 tracking-tighter">{kit.amperage}A</div>
                                    <h3 className="text-xl font-black mb-2 tracking-tighter">{kit.name}</h3>
                                    <div className="space-y-2 text-[9px] text-white/60 mb-6">
                                        <div className="flex justify-between">
                                            <span>Voltage:</span>
                                            <span className="text-white font-bold">{kit.voltage}V</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Wire Gauge:</span>
                                            <span className="text-white font-bold">{kit.wireGauge}</span>
                                        </div>
                                        <div className="flex justify-between border-t border-white/10 pt-2">
                                            <span>Price:</span>
                                            <span className="text-orange-400 font-black">${kit.price}</span>
                                        </div>
                                    </div>
                                    {kit.id === '30A' && (
                                        <div className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-[8px] font-black uppercase inline-block">
                                            ⭐ MOST POPULAR
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Detailed Specifications */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* Specs Card */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-6 block">Technical Specifications</span>

                        <div className="space-y-6">
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Electrical Specs</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="text-[9px] text-white/40 font-bold mb-1">RATING</div>
                                        <div className="text-2xl font-black">{selectedTether.amperage}A</div>
                                        <div className="text-[8px] text-white/30 mt-1">{selectedTether.voltage}V Service</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="text-[9px] text-white/40 font-bold mb-1">WIRE GAUGE</div>
                                        <div className="text-2xl font-black">{selectedTether.wireGauge}</div>
                                        <div className="text-[8px] text-white/30 mt-1">Copper conductor</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="text-[9px] text-white/40 font-bold mb-1">MAX RUN</div>
                                        <div className="text-2xl font-black">{selectedTether.maxLength}'</div>
                                        <div className="text-[8px] text-white/30 mt-1">Recommended max</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="text-[9px] text-white/40 font-bold mb-1">TYPE</div>
                                        <div className="text-sm font-black leading-tight">{selectedTether.cable_type}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Features</div>
                                <div className="space-y-3">
                                    {selectedTether.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <span className="text-orange-400 font-black mt-1">✓</span>
                                            <span className="text-[10px] font-medium leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Ideal For</div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedTether.use_cases.map((useCase, idx) => (
                                        <div key={idx} className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-lg text-[8px] font-bold uppercase tracking-wider">
                                            {useCase}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Installation Time</div>
                                <div className="text-3xl font-black text-orange-400">{selectedTether.installation_hours}h</div>
                                <div className="text-[9px] text-white/40 mt-1">Average professional install</div>
                            </div>
                        </div>
                    </div>

                    {/* Load Calculator */}
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6 block">Load Capacity</span>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Maximum Wattage (80% Rule)</div>
                                    <div className="text-5xl font-black text-blue-400 mb-1">{loadCapacity.maxWatts.toLocaleString()}W</div>
                                    <div className="text-[9px] text-white/40">Continuous rating per NEC standards</div>
                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Recommended Safe Load</div>
                                    <div className="text-3xl font-black text-blue-300">{loadCapacity.recommended.toLocaleString()}W</div>
                                    <div className="text-[9px] text-blue-300/60 mt-2">70% capacity = optimal efficiency</div>
                                </div>

                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Available Circuits</div>
                                    <div className="text-4xl font-black text-white mb-3">{loadCapacity.circuits}</div>
                                    <div className="grid gap-2">
                                        {Array.from({ length: loadCapacity.circuits }).map((_, idx) => (
                                            <div key={idx} className="bg-white/5 rounded-xl p-3 flex items-center justify-between text-[9px] font-bold text-white/60">
                                                <span>Circuit {idx + 1}</span>
                                                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">Available</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Voltage Drop Calculator */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-6 block">Voltage Drop Estimator</span>

                            <div className="mb-6">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 block">
                                    Distance from House: {distance} feet
                                </label>
                                <input
                                    type="range"
                                    min="10"
                                    max="250"
                                    value={distance}
                                    onChange={(e) => setDistance(Number(e.target.value))}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-[8px] text-white/30 mt-2">
                                    <span>10 ft (Short)</span>
                                    <span>250 ft (Max)</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className={`rounded-2xl p-4 border ${
                                    voltageDropCalc.isAcceptable
                                        ? 'bg-green-500/10 border-green-500/30'
                                        : 'bg-red-500/10 border-red-500/30'
                                }`}>
                                    <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{
                                        color: voltageDropCalc.isAcceptable ? '#4ade80' : '#f87171'
                                    }}>
                                        Voltage Drop Result
                                    </div>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-3xl font-black" style={{
                                            color: voltageDropCalc.isAcceptable ? '#4ade80' : '#f87171'
                                        }}>{voltageDropCalc.drop}V</span>
                                        <span className="text-white/60">({voltageDropCalc.percent}%)</span>
                                    </div>
                                    <div className="text-[9px]" style={{
                                        color: voltageDropCalc.isAcceptable ? '#86efac' : '#fca5a5'
                                    }}>
                                        {voltageDropCalc.recommendation}
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                    <div className="text-[9px] text-white/40 font-bold mb-2">NEC STANDARD: &lt;5% Acceptable</div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${
                                                voltageDropCalc.isAcceptable ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                            style={{ width: `${Math.min(100, parseFloat(voltageDropCalc.percent) * 20)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Installation Guide */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-16">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 block">Installation Checklist</span>

                    <div className="space-y-4">
                        {[
                            { step: 'Site Assessment', details: 'Measure distance, check local codes (e.g., Province of NB Residential Building Code)' },
                            { step: 'Electrical Disconnect', details: 'Turn off main breaker at house before installation' },
                            { step: 'Cable Run', details: `Route ${selectedTether.wireGauge} ${selectedTether.cable_type} through conduit or bury per code` },
                            { step: 'Connector Installation', details: 'Attach NEMA-rated connector at shed and subpanel at house' },
                            { step: 'Breaker Setup', details: `Install ${selectedTether.amperage}A breaker in main panel with GFCI protection` },
                            { step: 'Testing & Verification', details: 'Licensed electrician verifies voltage, load, and grounding' },
                            { step: 'LUNAI Sync (30A+)', details: 'Connect smart monitoring via WiFi/Cellular for real-time telemetry' }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/5 rounded-2xl p-6 border border-white/10 flex items-start gap-4">
                                <div className="w-8 h-8 flex items-center justify-center bg-orange-500/20 text-orange-400 rounded-lg font-black text-sm flex-shrink-0">
                                    {idx + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="font-black text-white mb-1">{item.step}</div>
                                    <div className="text-[10px] text-white/60">{item.details}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing & CTA */}
                <div className="bg-gradient-to-r from-orange-600/20 via-orange-600/10 to-orange-600/20 border border-orange-500/30 rounded-3xl p-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">Hardware Kit</div>
                            <div className="text-3xl font-black">{selectedTether.name}</div>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">Capacity</div>
                            <div className="text-3xl font-black">{loadCapacity.maxWatts.toLocaleString()}W</div>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">Price</div>
                            <div className="text-3xl font-black text-orange-400">${selectedTether.price}</div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => {
                                if (onSelect) {
                                    onSelect(selectedKit);
                                    onClose?.();
                                }
                            }}
                            className="flex-1 py-4 bg-white text-orange-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-xl"
                        >
                            Order {selectedTether.name}
                        </button>
                        <button className="flex-1 py-4 border border-white/20 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:border-white/40 transition-all">
                            Schedule Install
                        </button>
                    </div>

                    <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Includes</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[9px] font-bold text-white/60">
                            <div className="flex items-center gap-2">
                                <span className="text-orange-400">✓</span> Hardware kit
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-orange-400">✓</span> Installation guide
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-orange-400">✓</span> Support + warranty
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-orange-400">✓</span> LUNAI ready (30A+)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShedTetherHardwarePortal;
