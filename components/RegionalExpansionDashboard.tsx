import React, { useState, useMemo } from 'react';

interface RegionalExpansionDashboardProps {
    onClose?: () => void;
}

interface CommunityNode {
    id: string;
    city: string;
    province: string;
    status: 'active' | 'coming-soon' | 'planned';
    craftsmen: number;
    sheds_built: number;
    avg_roi_months: number;
    community_score: number;
    lat: number;
    lng: number;
    highlights: string[];
    upcomingDate?: string;
}

const RegionalExpansionDashboard: React.FC<RegionalExpansionDashboardProps> = ({ onClose }) => {
    const [selectedRegion, setSelectedRegion] = useState<string>('atlantic');
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

    const communityNodes: CommunityNode[] = [
        // Atlantic Canada (Active)
        {
            id: 'saint-john',
            city: 'Saint John',
            province: 'NB',
            status: 'active',
            craftsmen: 4,
            sheds_built: 23,
            avg_roi_months: 18,
            community_score: 92,
            lat: 45.2769,
            lng: -66.0692,
            highlights: [
                'PLACED Flagship Workshop',
                'Maritime-grade construction',
                'Quick turnaround (3-4 weeks)'
            ]
        },
        {
            id: 'quispamsis',
            city: 'Quispamsis',
            province: 'NB',
            status: 'active',
            craftsmen: 3,
            sheds_built: 18,
            avg_roi_months: 16,
            community_score: 88,
            lat: 45.3344,
            lng: -65.7128,
            highlights: [
                'Suburban high-demand area',
                'Zero-setback residential sheds',
                'Premium finishes'
            ]
        },
        {
            id: 'rothesay',
            city: 'Rothesay',
            province: 'NB',
            status: 'active',
            craftsmen: 2,
            sheds_built: 12,
            avg_roi_months: 22,
            community_score: 85,
            lat: 45.3775,
            lng: -65.6500,
            highlights: [
                'Waterfront community focus',
                'Premium aesthetics',
                'Property value boost documented'
            ]
        },
        {
            id: 'moncton',
            city: 'Moncton',
            province: 'NB',
            status: 'coming-soon',
            craftsmen: 0,
            sheds_built: 0,
            avg_roi_months: 20,
            community_score: 0,
            lat: 46.0884,
            lng: -64.7755,
            highlights: [
                'Regional hub expansion',
                'Forecast: 15 units/year',
                'Distribution center planned'
            ],
            upcomingDate: 'Q2 2026'
        },
        {
            id: 'fredericton',
            city: 'Fredericton',
            province: 'NB',
            status: 'coming-soon',
            craftsmen: 0,
            sheds_built: 0,
            avg_roi_months: 20,
            community_score: 0,
            lat: 45.9636,
            lng: -66.6431,
            highlights: [
                'Capital region potential',
                'Government + institutional buyers',
                'Educational partnerships'
            ],
            upcomingDate: 'Q3 2026'
        },
        // Nova Scotia (Planned)
        {
            id: 'halifax',
            city: 'Halifax',
            province: 'NS',
            status: 'planned',
            craftsmen: 0,
            sheds_built: 0,
            avg_roi_months: 0,
            community_score: 0,
            lat: 44.6426,
            lng: -63.2181,
            highlights: [
                'Atlantic gateway',
                'High market demand',
                'Partnership with local builders'
            ],
            upcomingDate: 'Q4 2026'
        },
        {
            id: 'cape-breton',
            city: 'Cape Breton',
            province: 'NS',
            status: 'planned',
            craftsmen: 0,
            sheds_built: 0,
            avg_roi_months: 0,
            community_score: 0,
            lat: 46.1667,
            lng: -60.5667,
            highlights: [
                'Rural expansion',
                'Tourism + residential',
                'Remote monitoring focused'
            ],
            upcomingDate: 'Q1 2027'
        },
        // PEI (Planned)
        {
            id: 'charlottetown',
            city: 'Charlottetown',
            province: 'PE',
            status: 'planned',
            craftsmen: 0,
            sheds_built: 0,
            avg_roi_months: 0,
            community_score: 0,
            lat: 46.2382,
            lng: -63.1305,
            highlights: [
                'Island community hub',
                'Agriculture sector focus',
                'High ROI potential'
            ],
            upcomingDate: 'Q2 2027'
        }
    ];

    const activeNodes = communityNodes.filter(n => n.status === 'active');
    const comingSoonNodes = communityNodes.filter(n => n.status === 'coming-soon');
    const plannedNodes = communityNodes.filter(n => n.status === 'planned');

    const regionalStats = useMemo(() => {
        return {
            totalActive: activeNodes.length,
            totalCraftsmen: activeNodes.reduce((sum, n) => sum + n.craftsmen, 0),
            totalBuilt: activeNodes.reduce((sum, n) => sum + n.sheds_built, 0),
            avgROI: Math.round(
                activeNodes.reduce((sum, n) => sum + n.avg_roi_months, 0) / activeNodes.length
            ),
            avgCommunityScore: Math.round(
                activeNodes.reduce((sum, n) => sum + n.community_score, 0) / activeNodes.length
            )
        };
    }, [activeNodes]);

    return (
        <div className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-black min-h-screen p-8 text-white font-sans overflow-y-auto no-scrollbar">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500 mb-4 block">Network Expansion</span>
                            <h1 className="text-6xl font-black tracking-tighter uppercase mb-6">Regional Network.</h1>
                            <p className="text-white/40 max-w-2xl text-lg font-medium leading-relaxed">
                                PLACED is building a hyperlocal network across Atlantic Canada. Every community node strengthens referral loops and reduces logistics costs.
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

                    {/* Regional Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Active Nodes</div>
                            <div className="text-4xl font-black text-cyan-400">{regionalStats.totalActive}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Craftsmen</div>
                            <div className="text-4xl font-black text-white">{regionalStats.totalCraftsmen}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Built & Shipping</div>
                            <div className="text-4xl font-black text-orange-400">{regionalStats.totalBuilt}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Avg ROI</div>
                            <div className="text-4xl font-black text-blue-400">{regionalStats.avgROI}</div>
                            <div className="text-[8px] text-blue-400 mt-1">months</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Community Score</div>
                            <div className="text-4xl font-black text-green-400">{regionalStats.avgCommunityScore}</div>
                        </div>
                    </div>
                </div>

                {/* View Mode Toggle */}
                <div className="mb-12 flex gap-4">
                    <button
                        onClick={() => setViewMode('map')}
                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            viewMode === 'map'
                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                                : 'border border-white/10 text-white/60 hover:text-white'
                        }`}
                    >
                        Geographic Map
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            viewMode === 'list'
                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                                : 'border border-white/10 text-white/60 hover:text-white'
                        }`}
                    >
                        Detailed List
                    </button>
                </div>

                {/* Map View */}
                {viewMode === 'map' && (
                    <div className="mb-16">
                        <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-950 to-slate-950 rounded-3xl border border-white/10 overflow-hidden">
                            {/* Simplified SVG Map of Atlantic Canada */}
                            <svg
                                className="w-full h-full"
                                viewBox="0 0 600 500"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                {/* Water background */}
                                <rect width="600" height="500" fill="#0f172a" />

                                {/* Nova Scotia outline (simplified) */}
                                <path d="M 480 250 L 520 240 L 530 280 L 510 290 Z" fill="#334155" opacity="0.3" />

                                {/* Community Markers */}
                                {communityNodes.map((node) => {
                                    // Simplified coordinates for visualization
                                    const posMap: Record<string, [number, number]> = {
                                        'saint-john': [250, 180],
                                        'quispamsis': [270, 160],
                                        'rothesay': [280, 155],
                                        'moncton': [300, 200],
                                        'fredericton': [220, 150],
                                        'halifax': [450, 280],
                                        'cape-breton': [520, 150],
                                        'charlottetown': [350, 120]
                                    };

                                    const [x, y] = posMap[node.id] || [300, 250];

                                    return (
                                        <g key={node.id}>
                                            {/* Outer glow */}
                                            <circle
                                                cx={x}
                                                cy={y}
                                                r={node.status === 'active' ? 12 : node.status === 'coming-soon' ? 10 : 8}
                                                fill={
                                                    node.status === 'active'
                                                        ? '#06b6d4'
                                                        : node.status === 'coming-soon'
                                                            ? '#f97316'
                                                            : '#64748b'
                                                }
                                                opacity="0.2"
                                            />

                                            {/* Core marker */}
                                            <circle
                                                cx={x}
                                                cy={y}
                                                r={node.status === 'active' ? 8 : node.status === 'coming-soon' ? 6 : 4}
                                                fill={
                                                    node.status === 'active'
                                                        ? '#06b6d4'
                                                        : node.status === 'coming-soon'
                                                            ? '#f97316'
                                                            : '#64748b'
                                                }
                                                className="cursor-pointer hover:r-10 transition-all"
                                                onClick={() => setSelectedRegion(node.id)}
                                            />

                                            {/* Label */}
                                            <text
                                                x={x}
                                                y={y - 20}
                                                textAnchor="middle"
                                                fill="white"
                                                fontSize="11"
                                                fontWeight="bold"
                                                className="pointer-events-none"
                                            >
                                                {node.city}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Legend */}
                                <g transform="translate(20, 20)">
                                    <rect width="140" height="100" fill="black" opacity="0.6" rx="8" />
                                    <text x="70" y="20" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Legend</text>

                                    <circle cx="15" cy="40" r="4" fill="#06b6d4" />
                                    <text x="30" y="45" fill="white" fontSize="9">Active</text>

                                    <circle cx="15" cy="60" r="4" fill="#f97316" />
                                    <text x="30" y="65" fill="white" fontSize="9">Coming Soon</text>

                                    <circle cx="15" cy="80" r="3" fill="#64748b" />
                                    <text x="30" y="85" fill="white" fontSize="9">Planned</text>
                                </g>
                            </svg>
                        </div>

                        <div className="mt-8 text-center text-white/40 text-sm">
                            Click on any node to view details
                        </div>
                    </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                    <div className="space-y-12 mb-16">
                        {/* Active Nodes */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white">Active Communities ({activeNodes.length})</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeNodes.map((node) => (
                                    <div
                                        key={node.id}
                                        onClick={() => setSelectedRegion(node.id)}
                                        className="group cursor-pointer bg-white/5 border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-2xl font-black tracking-tighter mb-1">{node.city}</h3>
                                                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{node.province}</span>
                                            </div>
                                            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
                                        </div>

                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between">
                                                <span className="text-[9px] text-white/40 uppercase font-bold">Craftsmen</span>
                                                <span className="font-black text-lg">{node.craftsmen}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[9px] text-white/40 uppercase font-bold">Units Built</span>
                                                <span className="font-black text-lg text-orange-400">{node.sheds_built}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[9px] text-white/40 uppercase font-bold">Avg ROI</span>
                                                <span className="font-black text-lg text-blue-400">{node.avg_roi_months}mo</span>
                                            </div>
                                            <div className="flex justify-between pt-4 border-t border-white/10">
                                                <span className="text-[9px] text-white/40 uppercase font-bold">Community Score</span>
                                                <span className="font-black text-lg text-green-400">{node.community_score}</span>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 rounded-xl p-4 mb-6">
                                            {node.highlights.map((h, idx) => (
                                                <div key={idx} className="flex items-start gap-2 text-[9px] text-white/60 mb-2">
                                                    <span className="text-cyan-400 font-black mt-0.5">→</span>
                                                    <span>{h}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <button className="w-full py-3 bg-cyan-600/20 border border-cyan-500/50 text-cyan-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-cyan-600/40 transition-all group-hover:border-cyan-500">
                                            View Details
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Coming Soon Nodes */}
                        {comingSoonNodes.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                                    <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white">Coming Soon ({comingSoonNodes.length})</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {comingSoonNodes.map((node) => (
                                        <div
                                            key={node.id}
                                            className="bg-white/5 border border-orange-500/30 rounded-3xl p-8 relative overflow-hidden group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className="relative z-10">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-black tracking-tighter mb-1">{node.city}</h3>
                                                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{node.province}</span>
                                                    </div>
                                                    <div className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-[8px] font-black uppercase">
                                                        {node.upcomingDate}
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    {node.highlights.map((h, idx) => (
                                                        <div key={idx} className="flex items-start gap-2 text-[9px] text-white/60">
                                                            <span className="text-orange-400 font-black mt-0.5">→</span>
                                                            <span>{h}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button className="w-full mt-6 py-3 bg-orange-600/20 border border-orange-500/50 text-orange-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-orange-600/40 transition-all">
                                                    Notify Me
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Planned Nodes */}
                        {plannedNodes.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-slate-500" />
                                    <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white">Planned Expansion ({plannedNodes.length})</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {plannedNodes.map((node) => (
                                        <div
                                            key={node.id}
                                            className="bg-white/5 border border-white/10 rounded-3xl p-8 opacity-75"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-black tracking-tighter mb-1">{node.city}</h3>
                                                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{node.province}</span>
                                                </div>
                                                <div className="bg-white/10 text-white/40 px-3 py-1 rounded-full text-[8px] font-black uppercase">
                                                    {node.upcomingDate}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {node.highlights.map((h, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 text-[9px] text-white/40">
                                                        <span className="text-white/40 font-black mt-0.5">→</span>
                                                        <span>{h}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 text-white/40 rounded-xl text-[9px] font-black uppercase tracking-widest cursor-not-allowed">
                                                Coming Soon
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-cyan-600/20 border border-cyan-500/30 rounded-3xl p-12">
                    <h2 className="text-4xl font-black tracking-tighter mb-6 uppercase">Join the PLACED Network</h2>
                    <p className="text-white/60 max-w-2xl mb-8 font-medium">
                        Are you a craftsperson, builder, or community organizer in Atlantic Canada? Partner with PLACED to bring premium structures to your region.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="px-10 py-4 bg-white text-cyan-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-xl">
                            Partner with PLACED
                        </button>
                        <button className="px-10 py-4 border border-white/20 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:border-white/40 transition-all">
                            Franchise Info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegionalExpansionDashboard;
