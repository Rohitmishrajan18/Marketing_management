import Card from '../components/Card';

const frameworks = [
  {
    id: 'two-sides-value',
    name: 'Two Sides of Value Matrix',
    when: 'Classify customers and determine segment-specific strategies',
    components: '2x2 matrix: Customer Experience (Creating Value) vs Customer Profitability (Capturing Value)',
    intuition: 'Star customers drive profit; vulnerable customers need retention; free riders need monetization; lost causes are write-offs',
    details: [
      'Star Customers (high/high): High experience, high profit - invest in growth',
      'Vulnerable Customers (high creating/low capturing): High experience but low profit - improve monetization',
      'Free Riders (low creating/high capturing): Low experience but high profit - simplify/reduce service',
      'Lost Causes (low/low): Neither - divest or discontinue',
    ],
  },
  {
    id: 'clv-framework',
    name: 'CLV Framework / Three Levers of Growth',
    when: 'Decide where to invest marketing dollars for maximum ROI',
    components: 'Acquisition (reduce AC), Retention (increase r), Expansion (increase m through cross-sell, up-sell, bundling)',
    intuition: 'Retention has 49x more impact than acquisition cost reduction on firm value',
    details: [
      'Customer Acquisition: reduce acquisition cost via channel optimization, targeting',
      'Customer Retention: increase retention rate via loyalty programs, bundling (up to 50% churn reduction)',
      'Customer Expansion: cross-selling, up-selling, product recommendations',
    ],
  },
  {
    id: 'stp-process',
    name: 'STP Process',
    when: 'Develop market positioning and targeting strategy',
    components: 'Segmentation (geographic, demographic, psychographic, behavioral), Targeting (evaluate segment attractiveness), Positioning (vertical vs horizontal)',
    intuition: 'Find valuable segments and differentiate on attributes that matter to them',
    details: [
      'Segmentation variables: Geographic (region, climate), Demographic (age, income), Psychographic (lifestyle, values), Behavioral (usage, loyalty)',
      'Positioning: Vertical = quality/performance (everyone prefers more, vary in WTP), Horizontal = taste/style (preferences vary)',
    ],
  },
  {
    id: 'evc-framework',
    name: 'EVC Framework (Pricing)',
    when: 'Set price ceiling based on competitive value delivery',
    components: 'Reference Value (competitor price) + Differentiation Value (attribute differences) = EVC ceiling',
    intuition: 'Price between cost floor and EVC ceiling based on how much value you want to capture vs create',
    details: [
      'Reference Value = price of closest competing substitute',
      'Differentiation Value = +/- value of your attribute advantages/disadvantages vs substitute',
      'Price Floor = your cost, Price Ceiling = EVC',
    ],
  },
  {
    id: 'product-line-strategy',
    name: 'Product Line Strategy',
    when: 'Decide whether to launch multiple products or stick with single offering',
    components: 'Offensive (capture new segments) vs Defensive (protect share), Market Expansion vs Cannibalization tradeoff',
    intuition: 'Product line expands market but risks cannibalizing existing product; single product maximizes extraction from target segment',
    details: [
      'Offensive launch: attract new customers to category, expand market size',
      'Defensive launch: prevent competition from stealing share, block competitor entry',
      'Key constraint: Incentive Compatibility - ensure each segment prefers product designed for them',
    ],
  },
  {
    id: 'advertising-strategy',
    name: 'Advertising Strategy Framework',
    when: 'Design creative strategy - emotional vs rational appeals',
    components: 'Emotional (psychological/social/identity needs) vs Rational (functional/utilitarian information), Special types (fear, humor, comparative)',
    intuition: 'Emotional appeals increase involvement; rational appeals inform; use fear/humor carefully',
    details: [
      'Emotional: drives involvement in low-differentiation categories, appeals to identity',
      'Rational: informative, works for high-involvement categories with clear benefits',
      'Fear appeals: inverted-U effectiveness (too much causes avoidance)',
      'Humor: aids memorability but must not overshadow product benefits',
      'Comparative: credible on verifiable attributes, risky for market leaders',
      'Full funnel: Brand + Performance ads are complementary, both needed',
    ],
  },
  {
    id: 'promotion-framework',
    name: 'Promotion Decision Framework',
    when: 'Choose between consumer pull vs trade push strategies',
    components: 'Consumer promotions (pull, direct to customers) vs Trade promotions (push, to channel partners), Integration',
    intuition: 'Pull and push work together; promotions train customers to wait for deals (reference price shift risk)',
    details: [
      'Consumer promotions: coupons, rebates, samples - create demand pull',
      'Trade promotions: quantity discounts, advertising allowances - incentivize channel',
      'Risks: reference price changes, strategic waiting by consumers, stockpiling, loyalty erosion',
      'Freemium: key tradeoff between traffic generation (rich free tier) vs upgrade conversion (limited free tier)',
    ],
  },
  {
    id: 'conjoint-process',
    name: 'Conjoint Analysis Process',
    when: 'Understand attribute importances, design products, set prices, simulate markets',
    components: 'Survey consumers on product preferences, calculate part-worth utilities, derive importances and WTP',
    intuition: 'Decompose preferences to understand which attributes drive choice',
    details: [
      'Part-worth utilities: value consumers assign to each attribute level',
      'Attribute importance: range (max-min) of utilities within that attribute',
      'Applications: product design, pricing, competitive analysis, market simulation',
    ],
  },
];

export default function Frameworks({ search }) {
  const filtered = frameworks.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.when.toLowerCase().includes(search.toLowerCase()) ||
    f.components.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filtered.map(fw => (
        <Card key={fw.id}>
          <h3 className="text-base font-semibold text-white mb-2">{fw.name}</h3>
          <p className="text-xs text-blue-400 mb-2 font-medium">WHEN TO USE</p>
          <p className="text-sm text-gray-300 mb-3">{fw.when}</p>

          <p className="text-xs text-amber-400 mb-2 font-medium">KEY COMPONENTS</p>
          <p className="text-sm text-gray-300 mb-3">{fw.components}</p>

          <p className="text-xs text-green-400 mb-2 font-medium">INTUITION</p>
          <p className="text-sm text-gray-300 mb-3">{fw.intuition}</p>

          {fw.details && (
            <div className="border-t border-gray-800 pt-3 mt-3">
              <p className="text-xs text-gray-400 mb-2">DETAILS</p>
              <ul className="text-xs text-gray-400 space-y-1">
                {fw.details.map((detail, i) => (
                  <li key={i} className="pl-2">• {detail}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
