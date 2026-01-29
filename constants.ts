
import { ShedStyleType, ShedData, UpgradeItem, MaterialType, TerrainData, InventoryItem, NatureAsset, DoorType, MaterialEstimate, PricingPackage, Testimonial, Article, RoofingJoke } from './types';

export const SHED_DB: Record<ShedStyleType, ShedData> = {
    'A-Frame': { price: 6531, rVal: 12, baseArea: 180, walls: "", roof: "", gable: "", floor: "" },
    'Modern Studio': { price: 6200, rVal: 19, baseArea: 200, walls: "", roof: "", gable: "", floor: "" },
    'Gable': { price: 5100, rVal: 15, baseArea: 160, walls: "", roof: "", gable: "", floor: "" },
    'Quaker': { price: 7975, rVal: 16, baseArea: 160, walls: "", roof: "", gable: "", floor: "" },
    'Lofted Barn': { price: 8436, rVal: 14, baseArea: 240, walls: "", roof: "", gable: "", floor: "" },
    'Utility': { price: 6415, rVal: 15, baseArea: 120, walls: "", roof: "", gable: "", floor: "" },
    'Nomad Mobile': { price: 28500, rVal: 24, baseArea: 160, walls: "", roof: "", gable: "", floor: "" }
};

export const COMPARISON_DATA = {
    model: "12' x 20' Quaker/Lofted Barn",
    placedPrice: 8436,
    competitorPrice: 9465,
    savings: 1029,
    rto36: 438.19,
    rto60: 350.56
};

export const SHOWROOM_ITEMS = [
    {
        id: 'nomad-mobile-o4',
        style: 'Nomad Mobile' as ShedStyleType,
        title: "LUNAI Nomad Mobile",
        label: "FREEDOM CORE",
        description: "The ultimate tiny home on wheels. 160sqft of architecturally optimized living space. Solar-ready, R24 insulation, and LUNAI command tether integration.",
        image: "/tiny_home_1.jpg",
        badge: "ON WHEELS: LAND INDEPENDENT"
    },
    {
        id: 'garden-oasis-12-16',
        style: 'A-Frame' as ShedStyleType,
        title: "12' x 16' Garden Oasis",
        label: "BACKYARD MVP",
        description: "Spacious and functional. Features dual entry doors, window boxes, and a natural cedar aesthetic. Built to fit your needs and style.",
        image: "/garden_shed_ad.jpg",
        badge: "PROMO: starting at $6,849"
    },
    {
        id: 'modern-studio-12-20',
        style: 'Modern Studio' as ShedStyleType,
        title: "12' x 20' Modern Studio",
        label: "STATE-OF-THE-ART",
        description: "The LUNAI flagship. Floor-to-ceiling glass, black metal siding, and architectural precision. Perfect for a premium backyard office or guest studio.",
        image: "/brain/d00a1654-b7a4-4b43-a697-b3a763181613/modern_studio_render_1769653613139.png",
        badge: "Architect Core V7.2 Pre-Configured"
    },
    {
        id: 'nomad-mobile-o2',
        style: 'Nomad Mobile' as ShedStyleType,
        title: "Nomad O2 Series",
        label: "OFF-GRID COMMAND",
        description: "Vertical loft variant of the Nomad series. High ceilings, panoramic scanning windows, and dual-axle stability.",
        image: "/tiny_home_2.jpg",
        badge: "PREMIUM MOBILE ASSET"
    }
];

export const COLOR_PALETTE = [
    { name: 'Cloud', hex: '#f8fafc' },
    { name: 'Slate', hex: '#334155' },
    { name: 'Red Barn', hex: '#991b1b' },
    { name: 'Forest', hex: '#166534' },
    { name: 'Midnight', hex: '#0f172a' },
    { name: 'Cedar', hex: '#78350f' }
];

export const UPGRADES: UpgradeItem[] = [
    { id: 'ramp', name: 'Aluminium Ramp', cost: 450, icon: '🪜', description: 'Heavy-duty 4ft ramp for easy mower access.' },
    { id: 'power_20a', name: '20A Creator Kit', cost: 1200, icon: '⚡', description: 'Power for laptop, lights, & fan. Professional hookup included.' },
    { id: 'power_30a', name: '30A Comfort Kit', cost: 1850, icon: '🔥', description: 'Heat-pump ready. Integrated sub-panel + sub-service connection.' },
    { id: 'power_50a', name: '50A Pro Service', cost: 3500, icon: '🛠️', description: 'Full workshop power. EV-capable connection. Permits included.' },
    { id: 'ac', name: 'Climate Control (AC)', cost: 1450, icon: '❄️', description: 'Split-unit AC for summer comfort.' },
    { id: 'solar', name: 'Solar Array', cost: 2200, icon: '☀️', description: 'Roof-mounted solar panels for off-grid lighting.' },
    { id: 'loft', name: 'Lofted Storage', cost: 600, icon: '📦', description: 'Built-in overhead storage mezzanine.' },
    { id: 'workbench', name: 'Smart Workbench', cost: 350, icon: '🛠️', description: '8ft custom workbench with tool storage.' },
    { id: 'shedLoo', name: 'The Shed Loo', cost: 850, icon: '🚽', description: 'Composting toilet system with privacy screen.' },
    { id: 'shedcare', name: 'ShedCare (Year 1)', cost: 299, icon: '🛡️', description: 'Bi-annual professional maintenance & foundation level check.' }
];

export const TERRAINS: TerrainData[] = [
    { id: 'grass', name: 'Lush Grass', color: '#14532d', noise: 0.1 },
    { id: 'gravel', name: 'Crushed Rock', color: '#4b5563', noise: 0.8 },
    { id: 'concrete', name: 'Poured Concrete', color: '#94a3b8', noise: 0.2 }
];

export const NATURE_ASSETS: NatureAsset[] = [
    { id: 'tree-1', name: 'Pine', type: 'flora', color: '#064e3b', path: 'M0 0 L-10 20 L10 20 Z M-8 15 L-15 35 L15 35 L8 15 Z' },
    { id: 'bush-1', name: 'Shrub', type: 'flora', color: '#166534', path: 'M0 10 Q10 0 20 10 Q30 20 20 30 Q10 40 0 30 Q-10 20 0 10' }
];

export const DOOR_OPTIONS = [
    { id: 'single', name: 'Single Door', path: 'M0 0 L40 0 L40 80 L0 80 Z M5 5 L35 5 L35 75 L5 75 Z' },
    { id: 'double', name: 'Double Barn', path: 'M0 0 L35 0 L35 80 L0 80 Z M40 0 L75 0 L75 80 L40 80 Z' },
    { id: 'french', name: 'French Doors', path: 'M0 0 L35 0 L35 80 L0 80 Z M40 0 L75 0 L75 80 L40 80 Z' }
];

export const INVENTORY_ITEMS: InventoryItem[] = [
    { id: 'mower', name: 'Lawn Mower', sqft: 12, icon: '🚜', path: 'M0 0 H20 V10 H0 Z' },
    { id: 'bike', name: 'Mountain Bike', sqft: 8, icon: '🚲', path: 'M0 10 A5 5 0 1 0 10 10 A5 5 0 1 0 0 10' }
];

export const calculateMaterials = (w: number, d: number, h: number, pitch: number): MaterialEstimate => {
    const perimeter = (w + d) * 2;
    // Real-world Framing: 16" OC studs + corners + blocking
    const studs = Math.ceil(perimeter / 1.33) + (perimeter > 40 ? 35 : 20);
    const wallArea = perimeter * h;
    const sheathing = Math.ceil((wallArea + (w * d)) / 32); // 4x8 sheets
    const roofArea = (w * d) * (1 + (pitch / 12));
    const shingles = Math.ceil(roofArea / 33); // Bundles
    const trim = Math.ceil(perimeter + (h * 4));

    // Foundation/Roof logic from Placed builder docs
    const joists = Math.ceil(d / 1.33) * 2 + 4; // 2x6 Rim and floor joists
    const dripEdge = Math.ceil(perimeter / 10); // 10ft sections
    const feltSquares = Math.ceil(roofArea / 100); // 15lb Felt rolls

    return { studs, sheathing, shingles, trim, joists, dripEdge, feltSquares };
};

export const PRICING_PACKAGES: PricingPackage[] = [
    { id: 'basic', name: 'Raw Shell', price: '$4,630', description: 'Weather-tight structure ready for your DIY finish.', features: ['2x4 Framework', 'OSB Floor', 'Asphalt Shingles'] },
    { id: 'pro', name: 'Office Ready', price: '$8,950', description: 'The "Plug-in" flagship. Fully powered, insulated, and active.', features: ['R12 Insulation', '20A Power Kit', 'Smart Panel Siding', 'ShedCare Year 1'], isPopular: true },
    { id: 'elite', name: 'Command Elite', price: '$15,950', description: 'Maximum volume (12x28) with 30A Climate Kit and architectural finish.', features: ['Huge 336sqft Floor', '30A Workshop Kit', 'French Glass Doors', 'Heat Pump Prep'] }
];

export const TESTIMONIALS: Testimonial[] = [
    { id: 1, name: "David M.", role: "Saint John Homeowner", text: "Survived the 2024 blizzard without a scratch. Placed builds different.", stars: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop" },
    { id: 2, name: "Sarah L.", role: "Atlantic Artist", text: "My Quaker shed is the perfect studio. The light from that saltbox roof is amazing.", stars: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop" }
];

export const ROOFING_JOKES: RoofingJoke[] = [
    { question: "Why did the roofer go to the doctor?", answer: "He had a bad case of shingles!", icon: "🏠" },
    { question: "Why did the shed get promoted?", answer: "Because it finally showed some current potential.", icon: "⚡" },
    { question: "Why did the shed go to school?", answer: "To become a little more storage-savvy!", icon: "🎓" },
    { question: "What do you call a shed with a toilet?", answer: "A 'Loo' with a view!", icon: "🚽" }
];

export const HANDBOOK_ARTICLES: Article[] = [
    { id: '1', title: "Winterizing Your Shed", subtitle: "Atlantic Ready", excerpt: "How to prepare your structure for heavy snow, ice damming, and low-draw electric heat in New Brunswick.", category: "MAINTENANCE", image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2670&auto=format&fit=crop" },
    { id: '2', title: "Solar Power 101", subtitle: "Off-Grid Dreams", excerpt: "A guide to installing solar kits on small structures for lighting, tool charging, and even feeding the house with the right power kit.", category: "UPGRADES", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop" },
    { id: '3', title: "Permit Guide", subtitle: "Local Regulations", excerpt: "When a plug-in kit is enough, when you need a full wired feed, and how local inspectors tend to view each option in Atlantic Canada.", category: "PLANNING", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop" },
    { id: '4', title: "Plug-In Shed 101", subtitle: "Backyard Power", excerpt: "A homeowner-friendly guide to powering a backyard office or workshop with a heavy-duty tether instead of a trench.", category: "GUIDE", image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2574&auto=format&fit=crop" }
];
