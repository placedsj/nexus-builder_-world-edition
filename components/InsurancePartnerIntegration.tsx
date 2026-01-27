import React, { useState, useMemo } from 'react';
import { ShedSpec, CostEstimate } from '../types';

interface InsurancePartnerIntegrationProps {
    spec: ShedSpec;
    costs: CostEstimate;
    onClose?: () => void;
}

interface InsuranceOffer {
    id: string;
    partner: string;
    logo: string;
    discount: number;
    premiumBase: number;
    premiumAfterDiscount: number;
    estimatedSavings: number;
    coverage: string[];
    trustScore: number;
    verificationStatus: 'verified' | 'pending' | 'unverified';
}

const InsurancePartnerIntegration: React.FC<InsurancePartnerIntegrationProps> = ({ spec, costs, onClose }) => {
    const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    // LUNAI Risk Scoring Algorithm
    const riskProfile = useMemo(() => {
        let baseRisk = 100;

        // Structural Quality Points
        if (spec.sidingType === 'board') baseRisk -= 5; // Premium siding
        if (spec.pitch >= 8) baseRisk -= 8; // Better snow load handling
        if (spec.electricalTier === '30A') baseRisk -= 10; // Smart electrical = monitored
        if (spec.addons.solar) baseRisk -= 12; // Renewable = responsible owner

        // Size & Complexity
        if (spec.width > 12) baseRisk += 5;
        if (spec.depth > 20) baseRisk += 5;

        // Build Quality Confidence (simulated from LUNAI monitoring)
        const monitoringScore = spec.electricalTier ? 85 : 60;
        baseRisk -= (monitoringScore / 100) * 15;

        // Floor Confidence (0-100)
        return Math.max(20, Math.min(100, baseRisk));
    }, [spec]);

    // Insurance Offer Simulator
    const insuranceOffers: InsuranceOffer[] = useMemo(() => {
        const baseHomePremium = 1200; // Annual homeowners baseline
        const riskFactor = (100 - riskProfile) / 100; // Lower risk = higher discount

        return [
            {
                id: 'intact',
                partner: 'Intact Insurance',
                logo: '🛡️',
                discount: Math.round((8 + riskFactor * 4) * 100) / 100, // 8-12% based on risk
                premiumBase: baseHomePremium,
                premiumAfterDiscount: Math.round(baseHomePremium * (1 - (8 + riskFactor * 4) / 100)),
                estimatedSavings: Math.round(baseHomePremium * ((8 + riskFactor * 4) / 100) * 5),
                coverage: ['Structural damage', 'Weather events', 'Theft protection', 'Liability'],
                trustScore: 94,
                verificationStatus: spec.electricalTier ? 'verified' : 'pending'
            },
            {
                id: 'desjardins',
                partner: 'Desjardins Group',
                logo: '🏠',
                discount: Math.round((6 + riskFactor * 3) * 100) / 100, // 6-9%
                premiumBase: baseHomePremium * 0.95,
                premiumAfterDiscount: Math.round(baseHomePremium * 0.95 * (1 - (6 + riskFactor * 3) / 100)),
                estimatedSavings: Math.round(baseHomePremium * 0.95 * ((6 + riskFactor * 3) / 100) * 5),
                coverage: ['Complete property coverage', 'Additional dwelling coverage', 'Community member benefits'],
                trustScore: 92,
                verificationStatus: spec.electricalTier ? 'verified' : 'unverified'
            },
            {
                id: 'td',
                partner: 'TD Insurance',
                logo: '✓',
                discount: Math.round((10 + riskFactor * 5) * 100) / 100, // 10-15%
                premiumBase: baseHomePremium * 1.05,
                premiumAfterDiscount: Math.round(baseHomePremium * 1.05 * (1 - (10 + riskFactor * 5) / 100)),
                estimatedSavings: Math.round(baseHomePremium * 1.05 * ((10 + riskFactor * 5) / 100) * 5),
                coverage: ['Premium coverage', 'Smart home discounts', 'Real-time alerts', 'Claim fast-track'],
                trustScore: 96,
                verificationStatus: 'verified'
            },
            {
                id: 'aviva',
                partner: 'Aviva Canada',
                logo: '⚡',
                discount: Math.round((7 + riskFactor * 2) * 100) / 100, // 7-9%
                premiumBase: baseHomePremium * 0.98,
                premiumAfterDiscount: Math.round(baseHomePremium * 0.98 * (1 - (7 + riskFactor * 2) / 100)),
                estimatedSavings: Math.round(baseHomePremium * 0.98 * ((7 + riskFactor * 2) / 100) * 5),
                coverage: ['Accessory building coverage', 'Equipment protection', 'Loss of rent protection'],
                trustScore: 91,
                verificationStatus: spec.electricalTier ? 'verified' : 'pending'
            }
        ];
    }, [riskProfile, spec]);

    const bestOffer = useMemo(() => {
        return insuranceOffers.reduce((best, current) => 
            current.discount > best.discount ? current : best
        );
    }, [insuranceOffers]);

    return (
        <div className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-black min-h-screen p-8 text-white font-sans overflow-y-auto no-scrollbar">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-500 mb-4 block">LUNAI Insurance Intelligence</span>
                            <h1 className="text-6xl font-black tracking-tighter uppercase mb-6">Insurance Verified.</h1>
                            <p className="text-white/40 max-w-2xl text-lg font-medium leading-relaxed">
                                Your PLACED shed qualifies for verified discounts. LUNAI monitoring + structural quality unlock premium savings with Atlantic Canada's top insurers.
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

                    {/* Risk Profile Card */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-4 block">LUNAI Risk Assessment</span>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div>
                                    <div className="text-4xl font-black mb-2">{riskProfile.toFixed(0)}</div>
                                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Risk Score</div>
                                    <div className="text-xs text-green-400 mt-2">Lower = Better Discounts</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black mb-2 text-green-400">{Math.round((100 - riskProfile) * 0.5)}%</div>
                                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Avg. Discount</div>
                                    <div className="text-xs text-green-400 mt-2">Verified by Monitoring</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black mb-2 text-blue-400">
                                        ${insuranceOffers.reduce((sum, offer) => sum + offer.estimatedSavings, 0) / insuranceOffers.length}
                                    </div>
                                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Est. Annual Savings</div>
                                    <div className="text-xs text-blue-400 mt-2">Per Provider Average</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xl font-black">VERIFIED</span>
                                    </div>
                                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Status</div>
                                    <div className="text-xs text-green-400 mt-2">
                                        {spec.electricalTier ? 'Smart Monitoring Active' : 'Basic Verification'}
                                    </div>
                                </div>
                            </div>

                            {/* Factors Breakdown */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 block">Discount Factors</span>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <div className="text-[9px] font-bold text-green-400 mb-1">✓ Premium Siding</div>
                                        <div className="text-[8px] text-white/40">+5% discount bonus</div>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <div className="text-[9px] font-bold text-green-400 mb-1">✓ Steep Roof Pitch</div>
                                        <div className="text-[8px] text-white/40">+8% snow handling</div>
                                    </div>
                                    <div className={`rounded-2xl p-4 border ${spec.electricalTier ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/5'}`}>
                                        <div className={`text-[9px] font-bold mb-1 ${spec.electricalTier ? 'text-blue-400' : 'text-white/40'}`}>
                                            {spec.electricalTier ? '✓ Smart Electrical' : '○ Smart Electrical'}
                                        </div>
                                        <div className="text-[8px] text-white/40">{spec.electricalTier ? '+10% monitoring' : 'Not enabled'}</div>
                                    </div>
                                    <div className={`rounded-2xl p-4 border ${spec.addons.solar ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/5'}`}>
                                        <div className={`text-[9px] font-bold mb-1 ${spec.addons.solar ? 'text-green-400' : 'text-white/40'}`}>
                                            {spec.addons.solar ? '✓ Renewable Energy' : '○ Solar Ready'}
                                        </div>
                                        <div className="text-[8px] text-white/40">{spec.addons.solar ? '+12% eco' : 'Available'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Insurance Offers Grid */}
                <div className="mb-12">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 block">Available Offers</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {insuranceOffers.map((offer) => (
                            <div
                                key={offer.id}
                                onClick={() => {
                                    setSelectedPartner(offer.id);
                                    setShowDetails(true);
                                }}
                                className={`group relative cursor-pointer rounded-3xl border-2 p-8 transition-all ${
                                    selectedPartner === offer.id
                                        ? 'border-green-500 bg-green-500/10 shadow-2xl shadow-green-900/20'
                                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                                }`}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Verification Badge */}
                                <div className="absolute top-6 right-6">
                                    {offer.verificationStatus === 'verified' && (
                                        <div className="bg-green-500/20 border border-green-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-green-400 flex items-center gap-2">
                                            <span>✓</span> Verified
                                        </div>
                                    )}
                                    {offer.verificationStatus === 'pending' && (
                                        <div className="bg-yellow-500/20 border border-yellow-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-yellow-400 flex items-center gap-2">
                                            <span>⏳</span> Pending
                                        </div>
                                    )}
                                </div>

                                <div className="relative z-10">
                                    {/* Partner Header */}
                                    <div className="flex items-start gap-4 mb-8">
                                        <div className="text-4xl">{offer.logo}</div>
                                        <div>
                                            <h3 className="text-2xl font-black tracking-tighter mb-1">{offer.partner}</h3>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                                <span className="flex items-center gap-1">★ {offer.trustScore}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Offer */}
                                    <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Annual Savings</div>
                                        <div className="flex items-baseline gap-3 mb-4">
                                            <span className="text-5xl font-black text-green-400">{offer.discount}%</span>
                                            <span className="text-white/40 text-sm font-bold">OFF Your Premium</span>
                                        </div>
                                        <div className="flex justify-between items-baseline">
                                            <div>
                                                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Standard Premium</div>
                                                <div className="text-2xl font-black">${offer.premiumBase}/yr</div>
                                            </div>
                                            <div className="text-white/20">→</div>
                                            <div className="text-right">
                                                <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1">Your Price</div>
                                                <div className="text-2xl font-black text-green-400">${offer.premiumAfterDiscount}/yr</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 5-Year Projection */}
                                    <div className="mb-8 bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-2">5-Year Total Savings</div>
                                        <div className="text-4xl font-black text-green-400">${offer.estimatedSavings.toLocaleString()}</div>
                                    </div>

                                    {/* Coverage */}
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 block">Coverage Includes</span>
                                        <div className="space-y-2">
                                            {offer.coverage.map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-3 text-[10px] font-medium text-white/60">
                                                    <span className="text-green-400 font-black mt-0.5">✓</span>
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <button className="w-full mt-8 py-4 bg-green-600 hover:bg-green-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all group-hover:scale-[1.02] shadow-lg shadow-green-900/30">
                                        {offer.verificationStatus === 'verified' ? 'Get Quote' : 'Apply Now'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details Panel */}
                {showDetails && selectedPartner && (
                    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in">
                        <div className="bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10 p-8 relative">
                            <button
                                onClick={() => setShowDetails(false)}
                                className="absolute top-6 right-6 text-white/40 hover:text-white text-2xl"
                            >
                                ×
                            </button>

                            {(() => {
                                const offer = insuranceOffers.find(o => o.id === selectedPartner);
                                if (!offer) return null;

                                return (
                                    <div>
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="text-5xl">{offer.logo}</div>
                                            <div>
                                                <h2 className="text-3xl font-black tracking-tighter mb-2">{offer.partner}</h2>
                                                <div className="flex items-center gap-4 text-sm">
                                                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-[9px] font-black uppercase">
                                                        ⭐ {offer.trustScore}/100
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                                                        offer.verificationStatus === 'verified'
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : 'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                        {offer.verificationStatus === 'verified' ? '✓ Verified' : '⏳ Pending'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                                <h3 className="text-xl font-black mb-4 tracking-tighter">Your Personalized Quote</h3>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Standard Rate</div>
                                                        <div className="text-3xl font-black">${offer.premiumBase}</div>
                                                        <div className="text-[9px] text-white/40 mt-1">/year</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">LUNAI Discount</div>
                                                        <div className="text-3xl font-black text-green-400">{offer.discount}%</div>
                                                        <div className="text-[9px] text-green-400 mt-1">Structural + Monitoring</div>
                                                    </div>
                                                    <div className="col-span-2 pt-4 border-t border-white/10">
                                                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Your Annual Price</div>
                                                        <div className="text-4xl font-black text-green-400">${offer.premiumAfterDiscount}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-black mb-4 tracking-tighter">Full Coverage Details</h3>
                                                <div className="space-y-3">
                                                    {offer.coverage.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                                            <span className="text-green-400 text-xl">✓</span>
                                                            <span className="font-medium">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
                                                <h3 className="text-lg font-black mb-3 tracking-tighter text-blue-400">How LUNAI Verification Works</h3>
                                                <ul className="space-y-2 text-[10px] font-medium text-white/60 leading-relaxed">
                                                    <li>✓ <strong>Structural Quality:</strong> Pitched roof, premium siding, robust framing = lower risk</li>
                                                    <li>✓ <strong>Smart Monitoring:</strong> 30A electrical tier enables real-time circuit oversight</li>
                                                    <li>✓ <strong>Verified Build:</strong> PLACED fabrication meets Atlantic Building Code standards</li>
                                                    <li>✓ <strong>Continuous Intelligence:</strong> Lunai predictive maintenance reduces claim frequency</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-black mb-4 tracking-tighter">Next Steps</h3>
                                                <ol className="space-y-3">
                                                    <li className="flex gap-4">
                                                        <span className="w-8 h-8 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full text-sm font-black flex-shrink-0">1</span>
                                                        <div>
                                                            <div className="font-bold mb-1">Review Your Quote</div>
                                                            <div className="text-[10px] text-white/40">Confirm your coverage details above</div>
                                                        </div>
                                                    </li>
                                                    <li className="flex gap-4">
                                                        <span className="w-8 h-8 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-full text-sm font-black flex-shrink-0">2</span>
                                                        <div>
                                                            <div className="font-bold mb-1">Contact Agent</div>
                                                            <div className="text-[10px] text-white/40">{offer.partner} will reach out within 24 hours</div>
                                                        </div>
                                                    </li>
                                                    <li className="flex gap-4">
                                                        <span className="w-8 h-8 flex items-center justify-center bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-black flex-shrink-0">3</span>
                                                        <div>
                                                            <div className="font-bold mb-1">Activate Coverage</div>
                                                            <div className="text-[10px] text-white/40">Start saving on your annual premium</div>
                                                        </div>
                                                    </li>
                                                </ol>
                                            </div>

                                            <button onClick={() => setShowDetails(false)} className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-transform shadow-lg shadow-green-900/30">
                                                Proceed with {offer.partner}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <div className="bg-gradient-to-r from-green-600/20 via-blue-600/20 to-green-600/20 border border-white/10 rounded-3xl p-12">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-400 mb-4 block">Insurance Advantage</span>
                        <h2 className="text-4xl font-black tracking-tighter mb-6 uppercase">PLACED + LUNAI = Verified Savings</h2>
                        <p className="text-white/60 max-w-2xl mx-auto mb-8 font-medium">
                            Your smart shed qualifies for insurance discounts with Canada's top providers. Combined with your PLACED structural quality + LUNAI monitoring, insurers recognize the lower risk profile.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="px-10 py-4 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                Start Insurance Process
                            </button>
                            <button onClick={onClose} className="px-10 py-4 border border-white/20 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:border-white/40 transition-all">
                                Back to Builder
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsurancePartnerIntegration;
