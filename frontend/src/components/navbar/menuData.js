import tradingImage from "../../assets/images/tradingImage.png"

export const menuItems = {
  cryptocurrencies: null,
  individuals: {
    sections: [
      {
        heading: 'Products',
        items: [
          { name: 'Buy & Sell',      description: 'Buy, sell and grow your crypto',             href: '/', iconId: 'buySell' },
          { name: 'Premium Plan',    description: 'Membership with zero trading fees',           href: '/', iconId: 'coinbaseOne' },
          { name: 'Web Wallet',      description: 'A simple self-custody wallet experience',     href: '/', iconId: 'wallet' },
          { name: 'Rewards Card',    description: 'Spend crypto and earn rewards',               href: '/', iconId: 'card' },
        ],
      },
      {
        heading: 'Learning',
        items: [
          { name: 'Learning Hub',    description: 'Beginner to advanced crypto education',       href: '/', iconId: 'book' },
          { name: 'Market Bytes',    description: 'Weekly crypto newsletter',                    href: '/', iconId: 'mail' },
        ],
      },
    ],
    card: { heading: 'Get started with Crypto App', body: 'Buy, sell, and track cryptocurrency in a student-built experience.', image: tradingImage },
  },
  businesses: {
    sections: [
      {
        heading: 'Accept Payments',
        items: [
          { name: 'Commerce',        description: 'Accept crypto payments on your site',         href: '/', iconId: 'shoppingBag' },
          { name: 'Onramp',          description: 'Let users buy crypto inside your app',        href: '/', iconId: 'arrowUpDown' },
        ],
      },
      {
        heading: 'Manage Crypto',
        items: [
          { name: 'Paymaster',       description: 'Sponsor gas fees for your users',             href: '/', iconId: 'lightning' },
          { name: 'Prime Desk',      description: 'Institutional-grade crypto management',       href: '/', iconId: 'building' },
        ],
      },
    ],
    card: { heading: 'Grow your business with crypto', body: 'Accept crypto payments and manage digital assets at scale.', image: tradingImage },
  },
  institutions: {
    sections: [
      {
        heading: 'Prime',
        items: [
          { name: 'Trading and Financing', description: 'Professional prime brokerage services', href: '/', iconId: 'chartBars' },
          { name: 'Custody',               description: 'Securely store all your digital assets',href: '/', iconId: 'shield' },
          { name: 'Staking',               description: 'Explore staking across our products',   href: '/', iconId: 'layers' },
        ],
      },
      {
        heading: 'Markets',
        items: [
          { name: 'Exchange',              description: 'Spot markets for high-frequency trading',href: '/', iconId: 'exchange' },
          { name: 'International Exchange',description: 'Access perpetual futures markets',      href: '/', iconId: 'globe' },
        ],
      },
    ],
    card: { heading: 'Enterprise solutions', body: 'Custody and trading solutions built for institutions.', image: tradingImage },
  },
  developers: {
    sections: [
      {
        heading: 'Build',
        items: [
          { name: 'Base',       description: 'The blockchain for building onchain apps',         href: '/', iconId: 'cube' },
          { name: 'Cloud',      description: 'Node and API infrastructure',                      href: '/', iconId: 'cloud' },
          { name: 'Wallet SDK', description: 'Integrate a crypto wallet into your app',          href: '/', iconId: 'code' },
          { name: 'Pay SDK',    description: 'Onboard users with crypto payments',               href: '/', iconId: 'paySdk' },
        ],
      },
      {
        heading: 'Explore',
        items: [
          { name: 'Asset Hub', description: 'List and manage digital assets',                    href: '/', iconId: 'database' },
          { name: 'Rosetta',   description: 'Blockchain data standardisation API',               href: '/', iconId: 'atom' },
        ],
      },
    ],
    card: { heading: 'Build on Crypto App', body: 'APIs, SDKs, and tools for building crypto-powered apps.', image: tradingImage },
  },
  company: {
    sections: [
      {
        heading: 'Who We Are',
        items: [
          { name: 'About',               description: 'Our mission and story',                   href: '/', iconId: 'info' },
          { name: 'Blog',                description: 'Insights and announcements',               href: '/', iconId: 'document' },
          { name: 'Careers',             description: 'Join the team building the open financial system', href: '/', iconId: 'users' },
          { name: 'Investor Relations',  description: 'Financials and shareholder information',  href: '/', iconId: 'trendingUp' },
        ],
      },
      {
        heading: 'Legal',
        items: [
          { name: 'Legal & Privacy',     description: 'Terms, privacy policy, and compliance',   href: '/', iconId: 'scales' },
          { name: 'Cookie Preferences',  description: 'Manage your cookie settings',             href: '/', iconId: 'sliders' },
        ],
      },
    ],
    card: { heading: 'Join our team', body: 'Careers, press, and community around this student project.', image: tradingImage },
  },
}
