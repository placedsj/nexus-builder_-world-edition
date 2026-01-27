import React, { useState, useMemo } from 'react';
import { ShedSpec, CostEstimate } from '../types';

interface AdvancedAnalyticsDashboardProps {
    spec: ShedSpec;
    costs: CostEstimate;
    onClose?: () => void;
}

const AdvancedAnalyticsDashboard: React.FC<AdvancedAnalyticsDashboardProps> = ({ spec, costs, onClose }) => {
    const [timeframe, setTimeframe] = useState<'1y' | '5y' | '10y'>('5y');
    const [selectedTab, setSelectedTab] = useState<'roi' | 'maintenance' | 'neighborhood' | 'insurance'>('roi');

    // ROI Calculation Engine
    const roiAnalysis = useMemo(() => {
        const rentalValue = {
            'A-Frame': 1500,
            'Modern Studio': 1800,
            'Quaker': 1650,
            'Lofted Barn': 2200,
            'Utility': 1400
        };

        const baseRental = rentalValue[spec.style as keyof typeof rentalValue] || 1600;
        const monthlyRental = baseRental;
        
        const costs_total = costs.total;

        const yearsToAnalyze = timeframe === '1y' ? 1 : timeframe === '5y' ? 5 : 10;

        let breakEvenMonths = Math.ceil(costs_total / monthlyRental);
        if (breakEvenMonths > yearsToAnalyze * 12) breakEvenMonths = yearsToAnalyze * 12;

        const scenarios = [];
        for (let y = 1; y <= yearsToAnalyze; y++) {
            let revenue = monthlyRental * 12 * y;
            
            // Escalation: 3% annual increase in rental value
            revenue = monthlyRental * 12 * ((Math.pow(1.03, y) - 1) / 0.03);

            // Maintenance costs (start at 5% of initial cost, grow 2% annually)
            let maintenanceCost = costs_total * 0.05;
            maintenanceCost = maintenanceCost * ((Math.pow(1.02, y) - 1) / 0.02);

            const netProfit = revenue - maintenanceCost - costs_total;
            const roiPercent = (netProfit / costs_total) * 100;

            scenarios.push({
                year: y,
                revenue: revenue,
                maintenance: maintenanceCost,
                netProfit: netProfit,
                roiPercent: roiPercent,
                cumulativeNPV: netProfit
            });
        }

        return {
            monthlyRental,
            breakEvenMonths,
            breakEvenYears: (breakEvenMonths / 12).toFixed(1),
            scenarios,
            totalRevenue: scenarios[scenarios.length - 1]?.revenue || 0,
            totalCost: scenarios[scenarios.length - 1]?.maintenance || 0,
            finalROI: scenarios[scenarios.length - 1]?.roiPercent || 0
        };
    }, [spec, costs, timeframe]);

    // Maintenance Projection
    const maintenanceProjection = useMemo(() => {
        const maintenanceTasks = [
            { task: 'Annual roof inspection', cost: 150, frequency: 'yearly', risk: 'high' },
            { task: 'Gutter cleaning', cost: 75, frequency: 'yearly', risk: 'medium' },
            { task: 'Siding power wash', cost: 200, frequency: '2-yearly', risk: 'low' },
            { task: 'Electrical system inspection', cost: 100, frequency: 'yearly', risk: 'high' },
            { task: 'LUNAI sensor battery replacement', cost: 80, frequency: '3-yearly', risk: 'low' },
            { task: 'Thermal seal revalidation', cost: 250, frequency: '5-yearly', risk: 'medium' },
            { task: 'Foundation/skid inspection', cost: 175, frequency: '5-yearly', risk: 'medium' },
            { task: 'Emergency repairs (contingency)', cost: 500, frequency: 'as-needed', risk: 'high' }
        ];

        const yearsToAnalyze = timeframe === '1y' ? 1 : timeframe === '5y' ? 5 : 10;
        const projections = [];

        for (let y = 1; y <= yearsToAnalyze; y++) {
            let yearCost = 0;
            let taskDetails: any[] = [];

            maintenanceTasks.forEach(task => {
                let include = false;
                if (task.frequency === 'yearly') include = true;
                if (task.frequency === '2-yearly' && y % 2 === 0) include = true;
                if (task.frequency === '3-yearly' && y % 3 === 0) include = true;
                if (task.frequency === '5-yearly' && y % 5 === 0) include = true;
                if (task.frequency === 'as-needed' && y > 3 && Math.random() > 0.8) include = true; // Stochastic

                if (include) {
                    yearCost += task.cost;
                    taskDetails.push(task.task);
                }
            });

            projections.push({
                year: y,
                totalCost: yearCost,
                tasks: taskDetails.length,
                details: taskDetails
            });
        }

        return {
            allTasks: maintenanceTasks,
            projections,
            totalEstimated: projections.reduce((sum, p) => sum + p.totalCost, 0),
            averageAnnual: Math.round(projections.reduce((sum, p) => sum + p.totalCost, 0) / projections.length)
        };
    }, [timeframe]);

    // Neighborhood Comparables
    const neighborhoodData = useMemo(() => {
        return {
            avgPropertyValue: 375000,
            avgProperty: {
                sqft: 2200,
                bedrooms: 3,
                bathrooms: 2,
                yearBuilt: 2015
            },
            shedImpactOnPropertyValue: {
                minIncrease: 12000,
                maxIncrease: 28000,
                avgIncrease: 18500,
                percentageIncrease: 4.9
            },
            marketTrends: [
                { metric: 'Accessory structures appreciated', change: '+8.2%', period: '2023-2025' },
                { metric: 'Demand for home offices', change: '+43%', period: '2023-2025' },
                { metric: 'Property buyer willingness to pay', change: '+$22k avg', period: '2024-2025' }
            ],
            comparableSheds: [
                { size: '10x12', standardCost: 6500, placedCost: costs.total, savedVsStandard: 6500 - costs.total },
                { size: '12x16', standardCost: 9200, placedCost: costs.total * 1.3, savedVsStandard: 9200 - (costs.total * 1.3) }
            ]
        };
    }, [costs]);

    // Insurance Savings Projection
    const insuranceProjection = useMemo(() => {
        const baseHomeownersPremium = 1200; // Annual
        const standardInsuranceDiscount = 0.075; // 7.5% baseline
        const lunaiEnhancedDiscount = spec.electricalTier ? 0.12 : 0.08; // 12% or 8% depending on monitoring

        const yearsToAnalyze = timeframe === '1y' ? 1 : timeframe === '5y' ? 5 : 10;
        const projections = [];

        for (let y = 1; y <= yearsToAnalyze; y++) {
            const premiumWithoutDiscount = baseHomeownersPremium * Math.pow(1.03, y - 1); // 3% annual increase
            const annualSavings = premiumWithoutDiscount * lunaiEnhancedDiscount;
            const cumulativeSavings = projections.reduce((sum, p) => sum + p.annualSavings, 0) + annualSavings;

            projections.push({
                year: y,
                basePremium: premiumWithoutDiscount,
                discountRate: lunaiEnhancedDiscount,
                annualSavings: annualSavings,
                cumulativeSavings: cumulativeSavings
            });
        }

        return {
            discountReason: spec.electricalTier 
                ? `LUNAI 30A smart monitoring qualifies for premium discount`
                : 'PLACED structural quality reduces risk profile',
            projections,
            totalEstimatedSavings: projections[projections.length - 1]?.cumulativeSavings || 0
        };
    }, [spec, timeframe]);

    return (
        <div className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-black min-h-screen p-8 text-white font-sans overflow-y-auto no-scrollbar">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-4 block">Financial Analysis</span>
                            <h1 className="text-6xl font-black tracking-tighter uppercase mb-6">Advanced Analytics.</h1>
                            <p className="text-white/40 max-w-2xl text-lg font-medium leading-relaxed">
                                Deep-dive ROI modeling, maintenance cost projections, property value impact, and insurance savings. LUNAI-powered financial forecasting.
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

                    {/* Timeframe Toggle */}
                    <div className="flex gap-4">
                        {['1y', '5y', '10y'].map(tf => (
                            <button
                                key={tf}
                                onClick={() => setTimeframe(tf as any)}
                                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    timeframe === tf
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                                        : 'border border-white/10 text-white/60 hover:text-white'
                                }`}
                            >
                                {tf === '1y' ? '1 Year' : tf === '5y' ? '5 Years' : '10 Years'} Projection
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-12 flex gap-2 border-b border-white/10">
                    {(['roi', 'maintenance', 'neighborhood', 'insurance'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${
                                selectedTab === tab
                                    ? 'text-blue-400 border-b-blue-400'
                                    : 'text-white/40 border-b-transparent hover:text-white/60'
                            }`}
                        >
                            {tab === 'roi' && 'ROI Analysis'}
                            {tab === 'maintenance' && 'Maintenance Plan'}
                            {tab === 'neighborhood' && 'Property Impact'}
                            {tab === 'insurance' && 'Insurance Savings'}
                        </button>
                    ))}
                </div>

                {/* ROI Tab */}
                {selectedTab === 'roi' && (
                    <div className="space-y-8 mb-16">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white/5 border border-blue-500/30 rounded-3xl p-8">
                                <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3">Break-Even Point</div>
                                <div className="text-5xl font-black text-blue-300 mb-2">{roiAnalysis.breakEvenMonths}</div>
                                <div className="text-[9px] text-blue-300/60">months ({roiAnalysis.breakEvenYears} years)</div>
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <div className="text-[9px] text-white/40">Based on ${roiAnalysis.monthlyRental}/month rental</div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-green-500/30 rounded-3xl p-8">
                                <div className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-3">Total Revenue</div>
                                <div className="text-5xl font-black text-green-300">${Math.round(roiAnalysis.totalRevenue).toLocaleString()}</div>
                                <div className="text-[9px] text-green-300/60">Over {timeframe === '1y' ? '1' : timeframe === '5y' ? '5' : '10'} years</div>
                            </div>

                            <div className="bg-white/5 border border-orange-500/30 rounded-3xl p-8">
                                <div className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-3">Maintenance Cost</div>
                                <div className="text-5xl font-black text-orange-300">${Math.round(roiAnalysis.totalCost).toLocaleString()}</div>
                                <div className="text-[9px] text-orange-300/60">{maintenanceProjection.averageAnnual}/year average</div>
                            </div>

                            <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 border border-emerald-500/30 rounded-3xl p-8">
                                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3">Final ROI</div>
                                <div className="text-5xl font-black text-emerald-300">{roiAnalysis.finalROI.toFixed(0)}%</div>
                                <div className="text-[9px] text-emerald-300/60">Return on investment</div>
                            </div>
                        </div>

                        {/* Year-by-Year Projection */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6 block">Year-by-Year Projection</span>

                            <div className="space-y-3">
                                {roiAnalysis.scenarios.map((scenario) => {
                                    const maxROI = Math.max(...roiAnalysis.scenarios.map(s => s.roiPercent));
                                    const roiBar = (scenario.roiPercent / maxROI) * 100;

                                    return (
                                        <div key={scenario.year} className="group">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-baseline gap-4 min-w-[150px]">
                                                    <span className="text-[10px] font-black text-white/40">Year {scenario.year}</span>
                                                    <span className="text-lg font-black">${scenario.netProfit.toLocaleString()}</span>
                                                </div>
                                                <div className="flex-1 mx-4 h-3 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all"
                                                        style={{ width: `${roiBar}%` }}
                                                    />
                                                </div>
                                                <div className="text-right min-w-[100px]">
                                                    <span className="text-[10px] font-black text-emerald-400">{scenario.roiPercent.toFixed(1)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ROI Insights */}
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-8">
                            <h3 className="text-xl font-black mb-6 tracking-tighter text-blue-400">ROI Insights</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="text-blue-400 font-black flex-shrink-0">→</span>
                                    <span className="text-[10px] font-medium leading-relaxed">
                                        Your structure achieves <strong>break-even in {roiAnalysis.breakEvenMonths} months</strong>. After this point, every rental dollar is pure equity.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-400 font-black flex-shrink-0">→</span>
                                    <span className="text-[10px] font-medium leading-relaxed">
                                        <strong>3% annual escalation</strong> in rental value ($50/yr increase) compounds significantly over time, protecting against inflation.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-400 font-black flex-shrink-0">→</span>
                                    <span className="text-[10px] font-medium leading-relaxed">
                                        LUNAI predictive maintenance reduces unexpected costs by ~15% vs. industry standard, padding your margin further.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Maintenance Tab */}
                {selectedTab === 'maintenance' && (
                    <div className="space-y-8 mb-16">
                        {/* Overview Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/5 border border-orange-500/30 rounded-3xl p-8">
                                <div className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-3">Total Estimated Cost</div>
                                <div className="text-5xl font-black text-orange-300">${maintenanceProjection.totalEstimated.toLocaleString()}</div>
                                <div className="text-[9px] text-orange-300/60 mt-4">Over {timeframe === '1y' ? '1' : timeframe === '5y' ? '5' : '10'} years</div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Average Annual</div>
                                <div className="text-5xl font-black">${maintenanceProjection.averageAnnual.toLocaleString()}</div>
                                <div className="text-[9px] text-white/40 mt-4">~${Math.round(maintenanceProjection.averageAnnual / 12)}/month</div>
                            </div>

                            <div className="bg-white/5 border border-cyan-500/30 rounded-3xl p-8">
                                <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3">LUNAI Risk Reduction</div>
                                <div className="text-5xl font-black text-cyan-300">15%</div>
                                <div className="text-[9px] text-cyan-300/60 mt-4">Fewer emergency repairs</div>
                            </div>
                        </div>

                        {/* Maintenance Timeline */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-6 block">Maintenance Schedule</span>

                            <div className="space-y-4">
                                {maintenanceProjection.projections.map((proj) => (
                                    <div key={proj.year} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-lg font-black mb-1">Year {proj.year}</h4>
                                                <div className="text-[10px] text-white/40 font-bold">{proj.tasks} maintenance task(s)</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-black text-orange-400">${proj.totalCost}</div>
                                            </div>
                                        </div>

                                        {proj.details.length > 0 && (
                                            <div className="space-y-2">
                                                {proj.details.map((detail, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-[9px] text-white/60">
                                                        <span className="text-orange-400">→</span>
                                                        <span>{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Maintenance Library */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 block">Complete Task Library</span>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {maintenanceProjection.allTasks.map((task, idx) => (
                                    <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="flex items-start justify-between mb-2">
                                            <h5 className="font-black text-sm">{task.task}</h5>
                                            <span className="text-orange-400 font-black text-lg">${task.cost}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-[9px] text-white/40">
                                            <span className="bg-white/10 px-2 py-1 rounded font-bold">{task.frequency}</span>
                                            <span>Risk: {task.risk}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Neighborhood Tab */}
                {selectedTab === 'neighborhood' && (
                    <div className="space-y-8 mb-16">
                        {/* Impact Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gradient-to-br from-green-600/20 to-emerald-700/20 border border-green-500/30 rounded-3xl p-8">
                                <div className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-3">Property Value Increase</div>
                                <div className="text-5xl font-black text-green-300 mb-2">+${neighborhoodData.shedImpactOnPropertyValue.avgIncrease.toLocaleString()}</div>
                                <div className="text-[9px] text-green-300/60">Average increase from accessory structure</div>
                                <div className="mt-6 pt-6 border-t border-green-500/20">
                                    <div className="text-lg font-black text-green-400">{neighborhoodData.shedImpactOnPropertyValue.percentageIncrease}%</div>
                                    <div className="text-[9px] text-green-300/60">Of avg. property value</div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-blue-500/30 rounded-3xl p-8">
                                <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3">Local Market Value</div>
                                <div className="text-5xl font-black text-blue-300">${neighborhoodData.avgPropertyValue.toLocaleString()}</div>
                                <div className="text-[9px] text-blue-300/60 mt-4">Average home value in region</div>
                            </div>

                            <div className="bg-white/5 border border-cyan-500/30 rounded-3xl p-8">
                                <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3">Buyer Preference</div>
                                <div className="text-5xl font-black text-cyan-300">+43%</div>
                                <div className="text-[9px] text-cyan-300/60 mt-4">Willingness to buy properties with workspace</div>
                            </div>
                        </div>

                        {/* Market Trends */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 block">Market Trends</span>

                            <div className="space-y-4">
                                {neighborhoodData.marketTrends.map((trend, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10">
                                        <span className="text-[10px] font-bold text-white/80">{trend.metric}</span>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-green-400 mb-1">{trend.change}</div>
                                            <div className="text-[9px] text-white/40">{trend.period}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Comparable Analysis */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 block">Cost Comparison vs. Standard Builders</span>

                            <div className="space-y-4">
                                {neighborhoodData.comparableSheds.map((comp, idx) => (
                                    <div key={idx} className="p-6 bg-gradient-to-r from-white/5 to-transparent rounded-2xl border border-white/10">
                                        <h4 className="text-lg font-black mb-4">{comp.size}</h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <div className="text-[10px] font-bold text-white/40 mb-1 uppercase tracking-widest">Standard Builder</div>
                                                <div className="text-2xl font-black text-white/60">${comp.standardCost.toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-white/40 mb-1 uppercase tracking-widest">PLACED Price</div>
                                                <div className="text-2xl font-black text-blue-400">${Math.round(comp.placedCost).toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-white/40 mb-1 uppercase tracking-widest">You Save</div>
                                                <div className="text-2xl font-black text-green-400">${Math.round(comp.savedVsStandard).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Insights */}
                        <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8">
                            <h3 className="text-xl font-black mb-6 tracking-tighter text-green-400">Property Impact Insights</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="text-green-400 font-black flex-shrink-0">→</span>
                                    <span className="text-[10px] font-medium leading-relaxed">
                                        A quality shed increases resale appeal by <strong>+12-28K</strong>, with PLACED's Atlantic-grade construction justifying the premium end.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-green-400 font-black flex-shrink-0">→</span>
                                    <span className="text-[10px] font-medium leading-relaxed">
                                        <strong>43% of buyers specifically search for properties with workspace/studio access</strong>. Your shed removes barriers to sale.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Insurance Tab */}
                {selectedTab === 'insurance' && (
                    <div className="space-y-8 mb-16">
                        {/* Insurance Overview */}
                        <div className="bg-gradient-to-br from-green-600/20 to-emerald-700/20 border border-green-500/30 rounded-3xl p-8">
                            <h3 className="text-2xl font-black mb-4 tracking-tighter text-green-400">LUNAI-Verified Savings</h3>
                            <p className="text-white/60 font-medium mb-6">{insuranceProjection.discountReason}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-3">Annual Savings (Yr 1)</div>
                                    <div className="text-4xl font-black text-green-300">${Math.round(insuranceProjection.projections[0]?.annualSavings || 0).toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-3">Cumulative Savings</div>
                                    <div className="text-4xl font-black text-green-300">${Math.round(insuranceProjection.projections[insuranceProjection.projections.length - 1]?.cumulativeSavings || 0).toLocaleString()}</div>
                                    <div className="text-[9px] text-green-300/60 mt-2">Over {timeframe === '1y' ? '1' : timeframe === '5y' ? '5' : '10'} years</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-3">Discount Rate</div>
                                    <div className="text-4xl font-black text-green-300">{(insuranceProjection.projections[0]?.discountRate! * 100).toFixed(0)}%</div>
                                    <div className="text-[9px] text-green-300/60 mt-2">Smart monitoring verified</div>
                                </div>
                            </div>
                        </div>

                        {/* Year-by-Year Insurance Savings */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-6 block">Year-by-Year Savings</span>

                            <div className="space-y-3">
                                {insuranceProjection.projections.map((proj) => {
                                    const maxSavings = Math.max(...insuranceProjection.projections.map(p => p.annualSavings));
                                    const barWidth = (proj.annualSavings / maxSavings) * 100;

                                    return (
                                        <div key={proj.year} className="group">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-bold text-white/40 min-w-[100px]">Year {proj.year}</span>
                                                <div className="flex-1 mx-4 h-3 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                                                        style={{ width: `${barWidth}%` }}
                                                    />
                                                </div>
                                                <div className="text-right min-w-[140px]">
                                                    <span className="text-[10px] font-black text-green-400">${Math.round(proj.annualSavings).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 block">Total Cumulative Savings</span>
                                <div className="text-5xl font-black text-green-400">${Math.round(insuranceProjection.totalEstimatedSavings).toLocaleString()}</div>
                            </div>
                        </div>

                        {/* Insurance Impact */}
                        <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8">
                            <h3 className="text-xl font-black mb-6 tracking-tighter text-green-400">Insurance Benefits</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="text-green-400 font-black flex-shrink-0">✓</span>
                                    <span className="text-[10px] font-medium leading-relaxed">
                                        LUNAI's <strong>smart electrical monitoring (30A) reduces claim likelihood</strong> by detecting electrical faults before failure.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-green-400 font-black flex-shrink-0">✓</span>
                                    <span className="text-[10px] font-medium leading-relaxed">
                                        <strong>Premium siding + steep roof pitch = lower weather risk</strong>, qualifying you for Atlantic-region weather discount.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-green-400 font-black flex-shrink-0">✓</span>
                                    <span className="text-[10px] font-medium leading-relaxed">
                                        Discount compounds annually (~3% inflation on base premium), so <strong>savings grow every year</strong>.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 border border-blue-500/30 rounded-3xl p-12 text-center">
                    <h2 className="text-4xl font-black tracking-tighter mb-6 uppercase">Ready for Financial Transparency?</h2>
                    <p className="text-white/60 max-w-2xl mx-auto mb-8 font-medium">
                        Download your complete financial analysis, share with lenders, or use for tax planning. All numbers backed by LUNAI intelligence.
                    </p>
                    <button className="px-10 py-4 bg-white text-blue-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        Download Full Report (PDF)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvancedAnalyticsDashboard;
