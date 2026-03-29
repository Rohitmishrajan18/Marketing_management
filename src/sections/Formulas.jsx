import Card from '../components/Card';
import { CLVYearBars, CLVLevers, ConjointImportance, EVCSpectrum, ICConstraintVisual, ProductLineComparison, FreemiumTradeoff } from '../components/Charts';

const formulas = [
  {
    id: 'clv-general',
    title: 'CLV — General Formula',
    category: 'Customer Lifetime Value',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
          CLV = Σ(t=1 to N) [m × r<sup>t-1</sup>] / (1+i)<sup>t</sup> − AC
        </div>
        <div className="text-sm text-gray-300 grid grid-cols-2 gap-x-4 gap-y-1">
          <p><span className="text-blue-400">m</span> = annual profit margin</p>
          <p><span className="text-blue-400">r</span> = retention rate</p>
          <p><span className="text-blue-400">i</span> = discount rate</p>
          <p><span className="text-blue-400">AC</span> = acquisition cost</p>
          <p><span className="text-blue-400">N</span> = time horizon (years)</p>
          <p><span className="text-blue-400">t-1</span> = cumulative retention power</p>
        </div>
        <div className="bg-green-950/40 border border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">WORKED EXAMPLE — Get Fit Gyms</p>
          <p className="text-xs text-green-200 font-mono leading-relaxed">
            m=$240, r=80%, i=9%, AC=$150, N=5<br/>
            Y1: $240 × 1/(1.09)¹ = $220.18<br/>
            Y2: $240 × 0.80/(1.09)² = $161.60<br/>
            Y3: $240 × 0.64/(1.09)³ = $118.60<br/>
            Y4: $240 × 0.512/(1.09)⁴ = $87.05<br/>
            Y5: $240 × 0.4096/(1.09)⁵ = $63.89<br/>
            Sum = $651.33 → Relative CLV = $651.33 − $150 = <span className="text-green-300 font-bold">$501.33</span>
          </p>
        </div>
        <p className="text-xs text-amber-400">Key trap: r^(t-1) is CUMULATIVE — Year 3 uses r², not just r</p>
        <CLVYearBars />
      </div>
    ),
  },
  {
    id: 'clv-simple',
    title: 'CLV — Simple Formula (Infinite Horizon)',
    category: 'Customer Lifetime Value',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
          CLV = m × [r / (1+i−r)]
        </div>
        <p className="text-sm text-amber-400 font-semibold">Margin Multiple = r / (1+i−r)</p>
        <p className="text-sm text-gray-300">Use when margins are constant and N is effectively infinite (perpetuity)</p>
        <div className="bg-green-950/40 border border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">WORKED EXAMPLE</p>
          <p className="text-xs text-green-200 font-mono leading-relaxed">
            m=$100, r=0.75, i=0.10<br/>
            Margin Multiple = 0.75/(1+0.10−0.75) = 0.75/0.35 = 2.14<br/>
            CLV = $100 × 2.14 = <span className="text-green-300 font-bold">$214</span><br/>
            (Interpretation: each $1 of annual margin is worth $2.14 in lifetime value)
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'clv-relative-absolute',
    title: 'CLV — Relative vs Absolute',
    category: 'Customer Lifetime Value',
    content: (
      <div className="space-y-4">
        <div className="space-y-2 text-sm text-gray-300">
          <div>
            <p className="text-blue-400 font-semibold mb-1">Absolute CLV</p>
            <p className="bg-gray-800 rounded p-2 font-mono">= m × Margin Multiple (no AC subtracted)</p>
          </div>
          <div>
            <p className="text-blue-400 font-semibold mb-1">Relative CLV</p>
            <p className="bg-gray-800 rounded p-2 font-mono">= Absolute CLV − AC</p>
          </div>
        </div>
        <div className="bg-green-950/40 border border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">EXAMPLE — When to use each</p>
          <p className="text-xs text-green-200 leading-relaxed">
            Absolute CLV ($651.33): answers "how much lifetime value does this customer generate?"<br/>
            Relative CLV ($501.33): answers "is this customer profitable after what I spent to acquire them?"<br/>
            <span className="text-green-300">Decision rule: spend up to Relative CLV to acquire. Absolute CLV is the value if AC=0.</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'clv-insight',
    title: 'CLV — Value Lever Sensitivities',
    category: 'Customer Lifetime Value',
    content: (
      <div className="space-y-4">
        <div className="text-sm text-gray-300 space-y-2">
          <p><span className="text-amber-400 font-semibold">1% better retention</span> → <span className="text-green-400 font-bold">4.9% firm value increase</span></p>
          <p><span className="text-amber-400 font-semibold">1% better margin</span> → <span className="text-green-400 font-bold">1.1% firm value increase</span></p>
          <p><span className="text-amber-400 font-semibold">1% lower acquisition cost</span> → <span className="text-green-400">0.1% firm value increase</span></p>
        </div>
        <div className="bg-green-950/40 border border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">INTUITION</p>
          <p className="text-xs text-green-200 leading-relaxed">
            Retention appears in BOTH the numerator (r^t-1) and denominator (1+i−r) of the CLV formula — this double-compounding effect is why it has 49× more impact than acquisition cost reduction. Most firms spend the majority on acquisition. This is backwards.
          </p>
        </div>
        <p className="text-xs text-amber-400">Exam: retention improvement is ALWAYS the best lever</p>
        <CLVLevers />
      </div>
    ),
  },
  {
    id: 'conjoint-utility',
    title: 'Conjoint — Total Product Utility',
    category: 'Conjoint Analysis',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
          Total Utility = Σ Part-worth utilities for each chosen attribute level
        </div>
        <p className="text-sm text-gray-300">Always add ALL attributes. Never compare products on a single attribute.</p>
        <div className="bg-green-950/40 border border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">WORKED EXAMPLE — Laptop Comparison</p>
          <p className="text-xs text-green-200 font-mono leading-relaxed">
            Acer 3.5GHz AMD $1000: 4.0+6.0+4.3+6.3 = <span className="text-green-300 font-bold">20.6</span><br/>
            Dell 2.5GHz Intel $1600: 5.3+5.0+6.3+3.3 = <span className="text-green-300 font-bold">19.9</span><br/>
            Consumer prefers Acer (20.6 {'>'} 19.9) despite weaker brand<br/>
            Key: Dell has better brand AND better processor, but worse speed and much higher price
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'conjoint-importance',
    title: 'Conjoint — Attribute Importance',
    category: 'Conjoint Analysis',
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
            Importance = Max utility − Min utility (within that attribute)
          </div>
          <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
            Relative Importance = Importance / Σ (all attribute importances)
          </div>
        </div>
        <div className="bg-green-950/40 border border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">WORKED EXAMPLE — Laptop Attributes</p>
          <p className="text-xs text-green-200 font-mono leading-relaxed">
            OEM Brand (Acer=4.0 to Dell=5.3): range = 1.3<br/>
            Processor (AMD=4.3 to Intel=6.3): range = 2.0<br/>
            Speed (2.0GHz=4.1 to 3.5GHz=6.0): range = 1.9<br/>
            Price ($1600=3.3 to $800=8.3): range = 5.0<br/>
            Total ranges = 10.2<br/>
            Price importance = 5.0/10.2 = <span className="text-green-300 font-bold">49%</span> (most important)<br/>
            OEM Brand = 1.3/10.2 = <span className="text-green-300 font-bold">13%</span> (least important)
          </p>
        </div>
        <p className="text-xs text-amber-400">Trap: Importance is the RANGE, not the highest value</p>
        <ConjointImportance />
      </div>
    ),
  },
  {
    id: 'conjoint-parity',
    title: 'Conjoint — Price Parity Calculation',
    category: 'Conjoint Analysis',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
          Set: Utility(your product) = Utility(reference product)<br/>
          Solve for: required price utility → interpolate to find price
        </div>
        <div className="bg-green-950/40 border border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">WORKED EXAMPLE — Air Fryer (Actual Exam Format)</p>
          <p className="text-xs text-green-200 font-mono leading-relaxed">
            Reference: De'Longhi 4qt Stainless 1700W at $159 = 2150 utils<br/>
            Your product: Philips 4qt Aluminum 1500W (price unknown) = 1300 + price_utils<br/>
            Set equal: 1300 + price_utils = 2150 → price_utils = 850<br/>
            <br/>
            Price table: $89=1100 utils, $119=800 utils<br/>
            Utils/$ between $89 and $119 = (1100−800)/(119−89) = 10 utils/$<br/>
            Need 850 utils: 1100 − 10×(price−89) = 850<br/>
            10×(price−89) = 250 → price − 89 = 25 → <span className="text-green-300 font-bold">price = $114</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'conjoint-utils-per-dollar',
    title: 'Conjoint — Utils-per-Dollar',
    category: 'Conjoint Analysis',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
          Utils/$ = |Utility change| / |Price change|<br/>
          (between two known price levels)
        </div>
        <div className="bg-green-950/40 border border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">EXAMPLE</p>
          <p className="text-xs text-green-200 font-mono leading-relaxed">
            Air fryer: $89 → 1100 utils, $119 → 800 utils<br/>
            Utils/$ = (1100−800)/(119−89) = 300/30 = <span className="text-green-300 font-bold">10 utils per dollar</span><br/>
            Meaning: every $1 price increase loses 10 utils of consumer value<br/>
            Use to interpolate between table values for price parity
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'evc-pricing',
    title: 'EVC Framework — Price Ceiling',
    category: 'Pricing',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
          EVC = Reference Value + Differentiation Value
        </div>
        <div className="text-sm text-gray-300 space-y-1">
          <p><span className="text-blue-400">Reference Value</span> = price of closest competing substitute</p>
          <p><span className="text-blue-400">Differentiation Value</span> = monetary value of attribute differences (+ or −)</p>
          <p><span className="text-amber-400">Price floor</span> = Cost | <span className="text-amber-400">Price ceiling</span> = EVC</p>
        </div>
        <div className="bg-green-950/40 border border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">EXAMPLE — Industrial Pump</p>
          <p className="text-xs text-green-200 font-mono leading-relaxed">
            Competitor pump price = $10,000 (Reference Value)<br/>
            Your pump: saves $2,000/yr electricity × 5 yrs = +$10,000<br/>
            Your pump: $500 fewer repairs × 5 yrs = +$2,500<br/>
            Your pump: larger, needs $1,500 install mod = −$1,500<br/>
            Differentiation Value = $11,000<br/>
            EVC = $10,000 + $11,000 = <span className="text-green-300 font-bold">$21,000</span><br/>
            Price your pump between your cost and $21,000
          </p>
        </div>
        <p className="text-xs text-amber-400">EVC is the CEILING, not the recommended price</p>
        <EVCSpectrum refValue={10000} diffValue={11000} cost={8000} />
      </div>
    ),
  },
  {
    id: 'product-line-ic',
    title: 'Product Line — Incentive Compatibility',
    category: 'Product Line Pricing',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
          WTP<sub>high</sub>(high) − P<sub>high</sub> ≥ WTP<sub>high</sub>(low) − P<sub>low</sub>
        </div>
        <p className="text-sm text-gray-300">Rearranged: P<sub>high</sub> ≤ WTP<sub>high</sub>(high) − WTP<sub>high</sub>(low) + P<sub>low</sub></p>
        <div className="bg-green-950/40 border border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">WORKED EXAMPLE — Dell Laptops</p>
          <p className="text-xs text-green-200 font-mono leading-relaxed">
            Business WTP: $2000 (3.5GHz), $1600 (2GHz)<br/>
            P_low = $500 (personal users' WTP for 2GHz)<br/>
            IC: 2000 − P_high ≥ 1600 − 500<br/>
            2000 − P_high ≥ 1100<br/>
            P_high ≤ <span className="text-green-300 font-bold">$900</span><br/>
            Product line profit = 60×$500 + 40×$900 = $66,000<br/>
            vs Single product at $1500 = $150,000 → Single product WINS
          </p>
        </div>
        <p className="text-xs text-amber-400 font-semibold">Cannibalization Cost = WTP_high − P_high = $1,100 discount forced on business users</p>
        <ICConstraintVisual />
        <ProductLineComparison />
      </div>
    ),
  },
  {
    id: 'promotion-incremental',
    title: 'Promotion — Incremental Sales & ROI',
    category: 'Promotion Evaluation',
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
            Incremental Sales = Actual Sales − Baseline Sales
          </div>
          <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
            Promotion ROI = (Incremental Revenue − Promo Cost) / Promo Cost
          </div>
        </div>
        <div className="bg-green-950/40 border border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">EXAMPLE</p>
          <p className="text-xs text-green-200 font-mono leading-relaxed">
            Actual sales during promotion = $1,100,000<br/>
            Baseline (from regression, controlling for season) = $900,000<br/>
            Incremental Sales = $200,000<br/>
            Consumer + Trade Promo Cost = $50,000<br/>
            ROI = ($200,000 − $50,000) / $50,000 = <span className="text-green-300 font-bold">300%</span><br/>
            <br/>
            Warning: Naive baseline (average of non-promo months) = $800K<br/>
            Would give ROI = 500% — overstated by 40%
          </p>
        </div>
        <p className="text-xs text-amber-400">Baseline must come from regression, not simple average — controls for seasonality</p>
      </div>
    ),
  },
  {
    id: 'freemium-tradeoff',
    title: 'Freemium — Design Tradeoff',
    category: 'Promotions Strategy',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
          Free tier value ↑ → Traffic ↑, Upgrades ↓<br/>
          Free tier value ↓ → Traffic ↓, Upgrades ↑
        </div>
        <div className="text-sm text-gray-300 space-y-1">
          <p><span className="text-blue-400">Rationales:</span> User base scaling, product learning, network effects, switching costs</p>
          <p><span className="text-blue-400">Cannibalization control:</span> Add a "bad" to free tier (ads, limits)</p>
        </div>
        <div className="bg-green-950/40 border border-green-800 rounded-lg p-3">
          <p className="text-xs text-green-400 font-semibold mb-2">EXAM ANSWER FORMAT</p>
          <p className="text-xs text-green-200 leading-relaxed">
            Three rationales: (1) Scale user base without ad spend — viral referrals, (2) Users who learn product value upgrade over time, (3) Network effects — free users expand installed base, increasing value for all.<br/>
            Key tradeoff: Traffic generation (need rich free tier) vs Upgrade conversion (need limited free tier).<br/>
            Solution: Add "bad" to free tier (Spotify: ads + no offline + lower quality).
          </p>
        </div>
        <FreemiumTradeoff />
      </div>
    ),
  },
];

export default function Formulas({ search }) {
  const filtered = formulas.filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase()) ||
    f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {filtered.map(formula => (
        <div key={formula.id}>
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-white">{formula.title}</h3>
            <p className="text-sm text-blue-400">{formula.category}</p>
          </div>
          <Card>{formula.content}</Card>
        </div>
      ))}
    </div>
  );
}
