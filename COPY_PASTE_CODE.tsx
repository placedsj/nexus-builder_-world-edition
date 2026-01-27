// COPY THIS EXACT CODE INTO EnterpriseBuilder.tsx

// ============================================
// STEP 1: ADD IMPORTS (top of file)
// ============================================

import InsurancePartnerIntegration from './InsurancePartnerIntegration';
import ShedTetherHardwarePortal from './ShedTetherHardwarePortal';
import RegionalExpansionDashboard from './RegionalExpansionDashboard';
import AdvancedAnalyticsDashboard from './AdvancedAnalyticsDashboard';

// ============================================
// STEP 2: ADD STATE (inside EnterpriseBuilder component function, near other useState calls)
// ============================================

const [showInsurance, setShowInsurance] = useState(false);
const [showHardware, setShowHardware] = useState(false);
const [showRegional, setShowRegional] = useState(false);
const [showAnalytics, setShowAnalytics] = useState(false);

// ============================================
// STEP 3: ADD THESE BUTTONS (in the left sidebar, in the 'structure' tab panel)
// Find the line with: "label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block">Addons"
// Right BEFORE that line, add this section:
// ============================================

<section>
    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block">Advanced Features</label>
    <div className="space-y-3">
        {/* Insurance Partner Integration */}
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

        {/* Shed Tether Hardware Portal */}
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

        {/* Regional Expansion Dashboard */}
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

        {/* Advanced Analytics Dashboard */}
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

// ============================================
// STEP 4: ADD MODALS (at the very end of return statement, right before the final closing </div>)
// Find the closing </div> tag at the very end of the component and add this BEFORE it:
// ============================================

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

// ============================================
// THAT'S IT! All done!
// ============================================
//
// What you just added:
// 1. 4 new full-screen modal components
// 2. 4 buttons in the advanced features section
// 3. All styled to match existing PLACED aesthetic
// 4. All animations match existing patterns (slide-in, fade-in)
// 5. All z-index properly managed
// 6. All responsive and production-ready
//
// Next: Save file and run: npm run dev
// The 4 new buttons will appear in the left sidebar structure panel
//
// ============================================
