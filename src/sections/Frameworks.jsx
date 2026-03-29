import Card from '../components/Card';

const frameworks = [
  {
    id: 'two-sides-value',
    name: 'Two Sides of Value Matrix',
    when: 'Classify customers and determine segment-specific strategies',
    components: '2×2: Customer Experience (Creating Value) vs Customer Profitability (Capturing Value)',
    intuition: 'Creating value without capturing it = Free Riders. Capturing without creating = Vulnerable (will churn). Stars = both. Lost Causes = neither.',
    details: [
      'Star (high/high): Best customers — invest in growth, cross-sell, deepen relationship',
      'Vulnerable (high profit / low experience): At risk of leaving — invest in experience before they churn',
      'Free Rider (low profit / high experience): Love your product, not paying for it — find monetization path or reduce service cost',
      'Lost Cause (low/low): Divest, fire, or exit the relationship',
    ],
    example: 'Kanthal AB: Large industrial customers demanded custom orders, rush deliveries, and heavy discounts → mapped to Free Riders and Lost Causes despite large revenue. Small accounts with standard orders at list prices = Stars. Action: fired largest accounts, profitability doubled.',
  },
  {
    id: 'clv-framework',
    name: 'CLV Framework — Three Levers of Growth',
    when: 'Decide where to invest marketing dollars for maximum ROI on firm value',
    components: 'Acquisition (reduce AC), Retention (increase r), Expansion (increase m via cross-sell/up-sell/bundling)',
    intuition: 'Retention has 49× more impact than reducing acquisition cost. Most firms spend the most on acquisition. This is backwards.',
    details: [
      'Acquisition: reduce AC via better targeting, channel optimization, referrals',
      'Retention: increase retention via loyalty programs, bundling (up to 50% churn reduction per Cox data)',
      'Expansion: cross-selling, up-selling, product recommendations (AI-driven), bundling',
      '1% retention = 4.9% firm value | 1% margin = 1.1% | 1% AC = 0.1%',
    ],
    example: 'Amazon Prime: Bundling (Prime = shipping + video + music + shopping) reduced churn vs non-Prime customers. Prime members spend 2-3× more annually. This is Retention (bundling reduces churn) AND Expansion (Prime drives more purchases) simultaneously.',
  },
  {
    id: 'stp-process',
    name: 'STP Process',
    when: 'Develop market strategy — who to serve and how to win',
    components: 'Segmentation → Targeting → Positioning',
    intuition: 'Without segmentation, you optimize for an "average" customer who doesn\'t exist. STP forces the hard choices.',
    details: [
      'Segmentation types: Geographic, Demographic (age/income/marital), Psychographic (lifestyle/values), Behavioral (usage/frequency)',
      'Key exam trap: Lifestyle = PSYCHOGRAPHIC, not behavioral. Marital status = DEMOGRAPHIC.',
      'Vertical positioning: quality/performance — everyone prefers more, WTP varies (BMW 3 vs 7 series)',
      'Horizontal positioning: taste/style — preferences differ regardless of income (BMW 3 vs M3)',
      'Behavioral variables for exam: usage intensity AND consumption frequency (not lifestyle, not marital status)',
    ],
    example: 'Credit card market: Demographic segmentation (age 25-35) misses the key distinction. Behavioral segmentation reveals Transactors (pay in full monthly, low revenue) vs Revolvers (carry balance, high interest revenue). Same demographic, completely different CLV. This is why behavioral segmentation is often most actionable.',
  },
  {
    id: 'evc-framework',
    name: 'EVC Framework (Price Ceiling)',
    when: 'Set the maximum rational price based on competitive value delivered',
    components: 'Reference Value (competitor price) + Differentiation Value (attribute differences, can be + or −) = EVC',
    intuition: 'EVC is the maximum a rational customer would pay before switching to the next best alternative. Actual price depends on how much value you share vs capture.',
    details: [
      'Reference Value = price of closest substitute that customer would otherwise buy',
      'Differentiation Value = sum of all attribute advantages and disadvantages vs substitute',
      'Price floor = cost; Price ceiling = EVC; optimal price somewhere between',
      'EVC is a ceiling, not a recommendation — competition and fairness constrain actual price',
      'Psychological utility (fairness) can make a price below EVC feel unacceptable',
    ],
    example: 'Coke vending machine: In extreme heat, the EVC for a cold Coke is very high (high thirst = high value). But charging EVC during a heat wave violates fairness norms (temperature is outside consumer control). Result: brand damage far exceeds the revenue gain from dynamic pricing. The psychological utility loss overwhelms the economic utility gain.',
  },
  {
    id: 'product-line-strategy',
    name: 'Product Line Strategy',
    when: 'Decide whether to launch a second product and how to price it',
    components: 'Offensive vs Defensive rationale + IC Constraint + Cannibalization Cost vs Market Expansion Benefit',
    intuition: 'Product line expands market but forces a discount on the premium product. If the discount (cannibalization cost) exceeds the market expansion, single product wins.',
    details: [
      'Step 1: Benchmark single product profit first',
      'Step 2: Apply IC constraint: P_high ≤ WTP_high(high) − WTP_high(low) + P_low',
      'Step 3: Compare product line profit to single product profit',
      'Step 4: Check that low-type doesn\'t switch up to buy the high product',
      'Perverse targeting: can design a pricing where segments swap products (high-type buys low product)',
    ],
    example: 'Dell laptops: Single product (3.5GHz at $1,500 to all 100 customers) = $150,000 profit. Product line (2GHz at $500 for personal + 3.5GHz at $900 for business) = $66,000. Single product wins by $84,000. Reason: the 2GHz laptop is so valuable to business users ($1,600 WTP) that the IC constraint forces a $1,100 discount on the premium product — far outweighing market expansion benefits.',
  },
  {
    id: 'advertising-strategy',
    name: 'Advertising Strategy Framework',
    when: 'Choose creative platform — emotional vs rational, and decide on fear, humor, or comparative',
    components: 'Emotional (involvement) vs Rational (information) + Fear (inverted-U) + Humor (memorability) + Comparative (challengers)',
    intuition: 'The creative platform must match the category\'s differentiation level, the brand\'s competitive position, and what action you\'re trying to drive.',
    details: [
      'Emotional: high competition, substitutable products — emotional connection differentiates',
      'Rational: high-involvement, high-information categories where consumers research',
      'Fear: inverted-U — moderate fear is optimal. Too much causes avoidance/denial. Always pair with specific solution.',
      'Humor: memorability, cuts through clutter — must not overshadow product benefit, pre-test always',
      'Comparative: challengers on verifiable attributes. Market leaders should avoid (legitimizes competitors)',
      'Full funnel: Brand (top) + Performance (bottom) are complementary, not substitutes',
    ],
    example: 'TikTok advertising case: Brands running both brand awareness (full funnel) AND performance ads outperformed single-channel campaigns. Brand ads increased recall and association, making performance ads more effective because the brand was already top-of-mind when the conversion prompt appeared. This is the "1+1=3" full funnel complementarity effect.',
  },
  {
    id: 'promotion-framework',
    name: 'Promotion Decision Framework',
    when: 'Design a promotion strategy — consumer pull vs trade push, and evaluate freemium',
    components: 'Pull (consumer promos) vs Push (trade promos), Integration, Freemium design (traffic vs conversion tradeoff)',
    intuition: 'Promotions can build trial and loyalty or destroy brand equity and train consumers to wait for deals. The long-term costs of bad promotion design often dwarf short-term sales gains.',
    details: [
      'Consumer (pull): coupons, samples, rebates, contests — create demand at consumer level',
      'Trade (push): quantity discounts, allowances, display fees — motivate channel partners',
      'Risks of over-promotion: reference price shift, strategic waiting, stockpiling, brand dilution',
      'Freemium rationale: viral scaling, product learning, network effects, switching costs',
      'Freemium key tradeoff: traffic generation (rich free tier) vs upgrade conversion (limited free tier)',
      'Control freemium cannibalization: add "bad" to free tier — Spotify model (ads + offline restrictions)',
    ],
    example: 'Spotify: Free tier with ads and no offline listening = controlled freemium. The ads are the "bad" that makes premium attractive. Without ads in the free tier, there\'d be less reason to upgrade. Spotify must also manage: too-good free = no upgrades, too-bad free = no users. Their data suggests the right balance is reached when ~5-10% of free users convert to premium annually.',
  },
  {
    id: 'conjoint-process',
    name: 'Conjoint Analysis Process',
    when: 'Understand what drives consumer choice, set prices, design products, run competitive simulations',
    components: 'Part-worth utilities → Attribute importances → Price parity → Market simulation',
    intuition: 'Conjoint decomposes a consumer\'s overall preference into ingredient-level scores for each attribute. Total utility = sum of all ingredient scores. Importance = how much swapping one ingredient changes the total.',
    details: [
      'Part-worth utilities: value consumers assign to each attribute level (from conjoint survey)',
      'Total product utility: SUM all attribute utilities — never compare on a single attribute',
      'Attribute importance = MAX − MIN range within that attribute (NOT the absolute level)',
      'Relative importance = attribute range / sum of all attribute ranges',
      'Price parity: solve for price where two products have equal total utility, interpolate',
      'Utils/$ = utility change / price change between two known price points',
    ],
    example: 'Air Fryer study (actual exam format): Price range = 1100−200 = 900 (most important). Material range = 400−250 = 150 (least important). Consumer comparison: Philips 4qt Stainless 1800W $89 utility = 3000 vs De\'Longhi 2qt Aluminum 1700W $119 utility = 2600 → consumer prefers Philips. Price parity calculation gives Philips price parity point at $114 vs De\'Longhi at $159.',
  },
];

export default function Frameworks({ search }) {
  const filtered = frameworks.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.when.toLowerCase().includes(search.toLowerCase()) ||
    f.components.toLowerCase().includes(search.toLowerCase()) ||
    (f.example && f.example.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filtered.map(fw => (
        <Card key={fw.id}>
          <h3 className="text-base font-semibold text-white mb-3">{fw.name}</h3>

          <p className="text-xs text-blue-400 mb-1 font-medium">WHEN TO USE</p>
          <p className="text-sm text-gray-300 mb-3">{fw.when}</p>

          <p className="text-xs text-amber-400 mb-1 font-medium">KEY COMPONENTS</p>
          <p className="text-sm text-gray-300 mb-3">{fw.components}</p>

          <p className="text-xs text-green-400 mb-1 font-medium">INTUITION</p>
          <p className="text-sm text-gray-300 mb-3">{fw.intuition}</p>

          {fw.details && (
            <div className="border-t border-gray-800 pt-3 mt-2 mb-3">
              <p className="text-xs text-gray-400 mb-2 font-medium">DETAILS</p>
              <ul className="text-xs text-gray-400 space-y-1">
                {fw.details.map((detail, i) => (
                  <li key={i} className="pl-2">• {detail}</li>
                ))}
              </ul>
            </div>
          )}

          {fw.example && (
            <div className="bg-blue-950/40 border border-blue-800 rounded-lg p-3 mt-2">
              <p className="text-xs text-blue-400 font-semibold mb-1">REAL EXAMPLE</p>
              <p className="text-xs text-blue-200 leading-relaxed">{fw.example}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
