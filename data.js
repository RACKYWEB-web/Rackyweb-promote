// ================================================
// RACKYWEB PROMOTE — PLATFORM DATA
// ================================================

export const STATS = [
  { label: 'Active Advertisers',   value: 48200,   suffix: '+', icon: '📢', color: '#f59e0b' },
  { label: 'Global Campaign Reach',value: 12000000,suffix: '+', icon: '🌍', color: '#3b82f6' },
  { label: 'Businesses Promoted',  value: 31500,   suffix: '+', icon: '🏢', color: '#fbbf24' },
  { label: 'Monthly Visitors',     value: 4200000, suffix: '+', icon: '👁',  color: '#93c5fd' },
];

export const CATEGORIES = [
  'All', 'Technology', 'Fashion', 'Education', 'Food & Dining',
  'Media', 'AI & Tech', 'Finance', 'Real Estate', 'Events',
  'Jobs', 'Startups', 'Healthcare', 'Travel', 'E-Commerce',
];

export const ADS = [
  {
    id: 1, logo: '🚀', cat: 'Technology',
    name: 'LaunchPad Global',
    tagline: 'The World-Class Startup Accelerator',
    desc: 'We help early-stage startups raise funding, build products, and scale globally. Join 500+ alumni who have raised over $500M in combined funding.',
    price: '$299/mo', views: 84200, clicks: 9800, wa: '2347087806251',
    featured: true, trending: true, verified: true, color: '#3b82f6',
    tags: ['Startup', 'Funding', 'Tech'],
  },
  {
    id: 2, logo: '👗', cat: 'Fashion',
    name: 'LuxeStyle Co.',
    tagline: 'Premium Fashion for the Modern Professional',
    desc: 'Contemporary luxury fashion for men and women. Handcrafted collections, bespoke designs, and ready-to-wear lines shipping worldwide.',
    price: '$199/mo', views: 62300, clicks: 7200, wa: '2347087806251',
    featured: true, trending: false, verified: true, color: '#ec4899',
    tags: ['Fashion', 'Luxury', 'Style'],
  },
  {
    id: 3, logo: '📚', cat: 'Education',
    name: 'SkillForge Academy',
    tagline: 'Learn In-Demand Skills. Get Hired.',
    desc: 'World-class online bootcamps in software development, data science, and design. 96% job placement rate with career-first approach.',
    price: '$149/mo', views: 108000, clicks: 14200, wa: '2347087806251',
    featured: false, trending: true, verified: true, color: '#8b5cf6',
    tags: ['Coding', 'Bootcamp', 'Career'],
  },
  {
    id: 4, logo: '🍽️', cat: 'Food & Dining',
    name: 'TableOne Restaurants',
    tagline: 'Fine Dining Experiences, Globally Curated',
    desc: 'A collection of award-winning restaurants offering world-cuisine dining experiences. Reservations, private dining and catering available worldwide.',
    price: '$179/mo', views: 45600, clicks: 5300, wa: '2347087806251',
    featured: true, trending: false, verified: true, color: '#f59e0b',
    tags: ['Dining', 'Fine Food', 'Lifestyle'],
  },
  {
    id: 5, logo: '📺', cat: 'Media',
    name: 'PulseMedia Global',
    tagline: 'Breaking News, Entertainment & Insights',
    desc: 'A fast-growing digital media network reaching 30 million monthly readers across 40 countries with high-quality journalism and entertainment.',
    price: '$349/mo', views: 189000, clicks: 22100, wa: '2347087806251',
    featured: false, trending: true, verified: true, color: '#06b6d4',
    tags: ['Media', 'News', 'Digital'],
  },
  {
    id: 6, logo: '🤖', cat: 'AI & Tech',
    name: 'NexusAI Solutions',
    tagline: 'Enterprise AI for Modern Businesses',
    desc: 'Custom AI automation, intelligent chatbots, and ML-powered analytics for forward-thinking enterprises. Trusted by Fortune 500 companies.',
    price: '$499/mo', views: 38900, clicks: 5200, wa: '2347087806251',
    featured: true, trending: true, verified: true, color: '#8b5cf6',
    tags: ['AI', 'Automation', 'Enterprise'],
  },
  {
    id: 7, logo: '🏠', cat: 'Real Estate',
    name: 'Prime Property Group',
    tagline: 'Premium Real Estate. Global Reach.',
    desc: 'International real estate marketplace with over 200,000 listings across 60 countries. Residential, commercial, and investment properties.',
    price: '$279/mo', views: 92400, clicks: 11200, wa: '2347087806251',
    featured: false, trending: false, verified: true, color: '#10b981',
    tags: ['Real Estate', 'Property', 'Investment'],
  },
  {
    id: 8, logo: '💰', cat: 'Finance',
    name: 'WealthVault Capital',
    tagline: 'Smart Investing for Global Citizens',
    desc: 'Licensed investment platform offering diversified global portfolios, ETFs, crypto, and high-yield savings. Start with any amount.',
    price: '$229/mo', views: 67800, clicks: 8900, wa: '2347087806251',
    featured: false, trending: false, verified: true, color: '#f59e0b',
    tags: ['Finance', 'Investing', 'Wealth'],
  },
  {
    id: 9, logo: '🎤', cat: 'Events',
    name: 'WorldStage Events',
    tagline: 'World-Class Events. Unforgettable Experiences.',
    desc: 'Global events management company producing concerts, conferences, product launches, and brand activations across 6 continents.',
    price: '$189/mo', views: 134000, clicks: 18700, wa: '2347087806251',
    featured: false, trending: true, verified: false, color: '#ec4899',
    tags: ['Events', 'Entertainment', 'Experiences'],
  },
];

export const PLANS = [
  {
    name: 'Free', price: '$0', period: 'forever',
    color: '#64748b', glow: 'rgba(100,116,139,.2)', badge: 'GET STARTED', popular: false,
    on:  ['1 business listing', 'Basic profile page', 'Standard search placement', 'Email support'],
    off: ['Analytics dashboard', 'Featured badge', 'Priority ranking', 'Homepage placement', 'AI tools'],
  },
  {
    name: 'Starter', price: '$49', period: '/month',
    color: '#3b82f6', glow: 'rgba(59,130,246,.3)', badge: 'MOST POPULAR', popular: true,
    on:  ['5 business listings', 'Featured badge', 'Basic analytics', 'Better visibility', 'WhatsApp button', 'Priority support'],
    off: ['Homepage placement', 'AI assistant', 'Global reach boost'],
  },
  {
    name: 'Pro', price: '$149', period: '/month',
    color: '#f59e0b', glow: 'rgba(245,158,11,.35)', badge: 'RECOMMENDED', popular: false,
    on:  ['20 listings', 'Homepage carousel', 'Priority ranking', 'Full analytics', 'AI campaign assistant', 'Verification badge', 'Custom banners', '24/7 support'],
    off: ['Hero banners', 'Dedicated manager'],
  },
  {
    name: 'Enterprise', price: '$499', period: '/month',
    color: '#fbbf24', glow: 'rgba(251,191,36,.45)', badge: '👑 ELITE', popular: false,
    on:  ['Unlimited listings', 'Hero banner placement', 'Top-page priority', 'Global reach boost', 'Dedicated manager', 'Custom AI strategy', 'Gold verification', 'API access', 'White-label options', 'Revenue share program'],
    off: [],
  },
];

export const POSTS = [
  { id:1, cat:'Strategy',    title:'10 Proven Digital Advertising Strategies That Drive Real Results',         excerpt:'Discover the tactics top global brands use to dominate digital advertising and generate exponential ROI.',        date:'Jan 15, 2025', rt:'7 min',  views:42400, emoji:'📈' },
  { id:2, cat:'AI & Tech',   title:'How AI Is Revolutionizing the Future of Digital Advertising',              excerpt:'From programmatic buying to AI-generated creatives — the ad industry is being transformed forever.',             date:'Jan 22, 2025', rt:'5 min',  views:38900, emoji:'🤖' },
  { id:3, cat:'Case Study',  title:'How a Startup 10x\'d Their Customer Base Using Rackyweb Promote',          excerpt:'A real story of how smart digital advertising transformed a small startup into a market leader in 12 months.',  date:'Feb 2, 2025',  rt:'9 min',  views:71300, emoji:'🚀' },
  { id:4, cat:'Growth',      title:'The Ultimate Guide to Social Commerce in 2025',                             excerpt:'Social commerce is projected to hit $1.2 trillion. Here\'s your complete playbook to capture your share.',     date:'Feb 10, 2025', rt:'8 min',  views:56700, emoji:'💬' },
  { id:5, cat:'Industry',    title:'Global Digital Ad Spend Set to Hit $870 Billion by 2027',                  excerpt:'New research reveals where the money is flowing — and how smart advertisers are positioning to win.',            date:'Feb 18, 2025', rt:'4 min',  views:29200, emoji:'💰' },
  { id:6, cat:'SEO',         title:'How to Dominate Search Rankings and Drive Organic Traffic in 2025',        excerpt:'SEO strategies that actually work right now. From technical foundations to AI-powered content optimization.',    date:'Mar 1, 2025',  rt:'11 min', views:81500, emoji:'🔍' },
];

export const EARN = [
  { icon:'📈', title:'Massive Traffic Growth',    desc:'Place your brand in front of 4.2M+ monthly visitors actively seeking products and services like yours.',       stat:'10x avg traffic increase',       color:'#f59e0b' },
  { icon:'🎯', title:'Precision Lead Generation', desc:'Smart targeting connects you with purchase-ready buyers at the exact right moment in their buying journey.',     stat:'8x more qualified leads',        color:'#3b82f6' },
  { icon:'🌍', title:'Global Brand Visibility',   desc:'Reach premium audiences across 60+ countries with homepage placements, category features, and search priority.',  stat:'50M+ monthly impressions',       color:'#fbbf24' },
  { icon:'👥', title:'Customer Acquisition',       desc:'Seamless contact options including direct messaging, phone, and website links that convert browsers into buyers.', stat:'72% lower cost per acquisition', color:'#10b981' },
  { icon:'📊', title:'Real-Time Analytics',        desc:'Track every impression, click, lead, and conversion with our live analytics dashboard and AI-powered insights.',  stat:'Live performance data',          color:'#8b5cf6' },
  { icon:'💰', title:'Revenue Growth',             desc:'Our advertisers average 340% ROI within 90 days. Every dollar invested in Rackyweb Promote works harder.',       stat:'340% average ROI',               color:'#f59e0b' },
];

export const CAMPAIGNS = [
  { id:1, name:'Q1 Brand Awareness Campaign',   status:'active',    views:82400,  clicks:9200,  leads:640,  budget:5000,  spent:3420 },
  { id:2, name:'Product Launch — ProSuite 3.0', status:'paused',    views:34600,  clicks:3800,  leads:210,  budget:2000,  spent:1200 },
  { id:3, name:'Holiday Season Promo',           status:'completed', views:218900, clicks:24100, leads:1840, budget:8000,  spent:8000 },
];

export const TEAM = [
  { name:'Edward Prince', role:'Founder & CEO', emoji:'👔', color:'#f59e0b', bio:'Serial entrepreneur and digital marketing visionary. Founded Rackyweb Global to build the world\'s most powerful business promotion ecosystem.' },
  { name:'Sarah Mitchell',role:'Chief Technology Officer', emoji:'💻', color:'#3b82f6', bio:'15+ years in software engineering and platform architecture. Led engineering teams at multiple unicorn startups.' },
  { name:'James Okafor',  role:'Head of Global Growth', emoji:'📊', color:'#fbbf24', bio:'Growth strategist who has scaled platforms from zero to millions of users across three continents.' },
  { name:'Priya Sharma',  role:'AI & Data Science Lead', emoji:'🤖', color:'#8b5cf6', bio:'ML engineer specializing in ad targeting, predictive analytics, and large-scale campaign optimization.' },
];
