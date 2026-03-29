import { useState } from 'react';
import Card from '../components/Card';

const blocks = {
  block1: {
    title: 'Block 1: Customer Value Management',
    topics: [
      {
        id: 'marketing-concept',
        title: 'The Marketing Concept',
        why: 'Everything starts with paying customers - they are the firm\'s most valuable asset.',
        explanation: 'The primary source of cash flow is paying customers. Customers provide revenue when they believe the firm\'s products offer better value than competitive alternatives. Balance-sheet assets only matter because they contribute to acquiring, retaining, and growing customers. Marketing strategy links customer value to firm value through profits and cash flow.',
        takeaways: [
          'Firm value is driven by customer value',
          'Marketing connects customers to profits',
          'Two sides of value: what customers receive vs what firm captures',
          'Not all customers are equally valuable (Kanthal: top 5% generate most profit)',
          'Sometimes you should "fire" customers (Sprint termination letters, Delta no-fly lists, Costco membership)',
        ],
      },
      {
        id: 'customer-lifetime-value',
        title: 'Customer Lifetime Value (CLV)',
        why: 'CLV tells you how much a customer is worth over time, so you know what to invest in acquiring and keeping them.',
        explanation: 'CLV is the net present value of all future profit streams from a customer over their relationship with the firm. It\'s a forward-looking concept - not historical profitability. The formula accounts for profit margin per period, retention probability, discount rate, and acquisition cost. Customers become more profitable over time through: base profit, increased purchases, reduced cost to serve, referrals, and price premiums. CLV = Sum of [margin * retention^(t-1)] / (1+i)^t for t=1 to N, minus acquisition cost.',
        takeaways: [
          'CLV is NPV of future profits, not revenue',
          'Retention has the biggest impact on firm value (1% improvement = 4.9% firm value)',
          'Three levers: Acquisition (reduce AC), Retention (increase r), Expansion (increase m)',
          'Simple formula when margins constant: m * r/(1+i-r)',
          'Bundling reduces churn by up to 50% (Cox Communications)',
        ],
      },
      {
        id: 'two-sides-value',
        title: 'Two Sides of Value Framework',
        why: 'Not every customer who loves your product is profitable, and not every profitable customer is loyal.',
        explanation: 'The Two Sides of Value matrix plots Customer Experience (Creating Value) on the x-axis against Customer Profitability (Capturing Value) on the y-axis. This creates four quadrants: Star Customers (high/high - ideal), Vulnerable Customers (high profitability but low experience - at risk of leaving), Free Riders (high experience but low profitability - love your product but you\'re not monetizing), and Lost Causes (low/low - consider firing). Strategy differs by quadrant: retain Stars, improve experience for Vulnerable, find ways to monetize Free Riders, minimize investment in Lost Causes.',
        takeaways: [
          'Creating value without capturing it = Free Riders',
          'Capturing without creating = Vulnerable customers who will leave',
          'Strategy must address BOTH sides',
          'Example: Kanthal found their biggest customers were unprofitable while small customers were highly profitable',
        ],
      },
      {
        id: 'segmentation-targeting-positioning',
        title: 'Segmentation, Targeting, and Positioning (STP)',
        why: 'You can\'t serve everyone equally well. STP helps you choose who to serve and how to win.',
        explanation: 'Segmentation divides the market into groups with similar needs. There are four types of segmentation variables: Geographic (region, city size), Demographic (age, income, marital status), Psychographic (lifestyle, attitudes, values), and Behavioral (usage intensity, consumption frequency, loyalty). Targeting evaluates which segments are most attractive. Positioning determines how to differentiate your offering. There\'s a critical distinction between Vertical positioning (quality/performance attributes where everyone agrees more is better, but differ in willingness to pay - e.g., BMW 3-series vs 7-series) and Horizontal positioning (taste/style attributes where preferences genuinely differ - e.g., car color, BMW 3 vs M3 sport).',
        takeaways: [
          'Simpson\'s Paradox illustrates why segmentation matters (Hospital A vs B example)',
          'Vertical = quality differences (WTP varies by income)',
          'Horizontal = taste differences (preferences vary regardless of price)',
          'Behavioral variables: usage intensity, consumption frequency',
          'Psychographic: lifestyle, attitudes; Demographic: age, income, marital status',
        ],
      },
    ],
  },
  block2: {
    title: 'Block 2: Creating & Capturing Value',
    topics: [
      {
        id: 'product-strategy-branding',
        title: 'Product Strategy & Branding',
        why: 'Your product is the foundation of all value creation. Get it wrong and no marketing can save you.',
        explanation: 'Product launches serve two purposes: Offensive (capture new segments, grow revenue) and Defensive (protect existing share from competition). The key tradeoff in product line design is Market Expansion vs Cannibalization. When you add a product, will it bring new customers or steal from your existing product? The Dell example illustrates this: a product line can actually be LESS profitable than a single product if the cannibalization cost is too high. Successful brands also face "Managerial Inertia" - the Olay case shows how successful legacy brands resist change even as markets shift (DTC competition, millennial segment growth).',
        takeaways: [
          'Offensive vs Defensive product launches',
          'Cannibalization is the key risk of product lines',
          'Product Proliferation Trap: more SKUs lead to consumer confusion and retailer pushback',
          'Repositioning requires more than just product changes (Olay needed social media, influencers, DTC, Skin Advisor)',
          'Always check Incentive Compatibility in product line pricing',
        ],
      },
      {
        id: 'conjoint-analysis',
        title: 'Conjoint Analysis',
        why: 'Conjoint reveals what customers actually value, so you can design products and set prices based on data, not guesses.',
        explanation: 'Conjoint analysis measures consumer preferences by presenting product profiles with different combinations of attributes and asking consumers to rank or rate them. The output is part-worth utilities - a numerical value for each level of each attribute showing how much consumers value it. Total Product Utility = sum of part-worth utilities across all attributes. Attribute Importance = range (max minus min) of utilities within an attribute. This tells you which features matter most. You can also use conjoint for competitive analysis (compare total utility of your product vs competitor\'s) and pricing (find the price that gives your product equal utility to a competitor).',
        takeaways: [
          'Part-worth utility = how much consumers value a specific attribute level',
          'Total utility = sum of ALL part-worths',
          'Importance = max minus min range (NOT the highest utility)',
          'Relative importance = one attribute\'s range divided by sum of all ranges',
          'For price parity: set total utilities equal, solve for price',
        ],
      },
      {
        id: 'pricing-strategy',
        title: 'Pricing Strategy',
        why: 'Price is where you capture value. Set it wrong and you either leave money on the table or lose the customer.',
        explanation: 'The EVC (Economic Value to Customer) framework sets your price ceiling. EVC = Reference Value (price of closest substitute) + Differentiation Value (value of your attribute differences vs that substitute, which can be positive or negative). Your cost sets the price floor. Where you actually price between floor and ceiling depends on competitive dynamics and how much value you want to capture vs share with the customer. Psychology matters enormously in pricing: Thaler\'s beer experiment shows people pay more for identical beer from a fancy hotel vs a rundown store. Fairness perceptions constrain pricing - the Coke vending machine case shows that temperature-based pricing violates norms because temperature is outside consumer control. Shrinkflation (reducing quantity while maintaining price) is an alternative to price increases but has limits.',
        takeaways: [
          'EVC = Reference Value + Differentiation Value (this is the ceiling)',
          'Price between cost floor and EVC ceiling',
          'Fairness psychology can override economic utility',
          'Price discrimination under competition can intensify price wars',
          'Shrinkflation: reduces quantity not price, but consumers notice',
        ],
      },
      {
        id: 'product-line-pricing',
        title: 'Product Line Pricing',
        why: 'Most companies sell multiple products. Pricing them together requires balancing extraction from each segment against cannibalization.',
        explanation: 'In product line pricing, you design different quality levels for different customer segments and price them so each segment buys the product intended for them. The key constraint is Incentive Compatibility (IC): the high-type customer must prefer the high product at its price over the low product at its price. Formally: WTP_high(high) - P_high >= WTP_high(low) - P_low. The cannibalization cost is how much you must discount the high product to prevent the high-type from "trading down." If the low product is too attractive to the high-type, cannibalization cost is enormous and a single product strategy may dominate. The Dell problem demonstrates this clearly.',
        takeaways: [
          'IC constraint: each segment must prefer their targeted product',
          'Cannibalization cost = WTP_high(high) - P_high',
          'If low product highly valued by high-type, product line may lose to single product',
          'Always check if segments can profitably "switch" products',
          'Perverse targeting: sometimes high-type customers rationally buy the low product',
        ],
      },
    ],
  },
  block3: {
    title: 'Block 3: Communicating & Delivering Value',
    topics: [
      {
        id: 'advertising-strategy',
        title: 'Advertising Strategy',
        why: 'Advertising is how you communicate your value proposition. The creative strategy determines whether the message lands.',
        explanation: 'There are two fundamental advertising approaches: Emotional appeals (psychological, social, identity needs - typically persuasive) and Rational appeals (functional, utilitarian information - typically informative). Emotional advertising works well when: there\'s high competition with many substitutable products (e.g., Michelin tires), and it helps increase consumer involvement in categories with less differentiation. Special creative platforms include: Fear appeals (inverted-U effectiveness - too much fear causes denial), Humor (aids memorability and cuts through clutter, but must not overshadow the product benefit - always pre-test), and Comparative advertising (credible on verifiable attributes, works better for challengers than leaders). The full funnel approach recognizes that Brand (top of funnel) and Performance (bottom of funnel) advertising are complementary.',
        takeaways: [
          'Emotional for persuasion, Rational for information',
          'Fear appeals: inverted-U (moderate fear is optimal)',
          'Humor: memorability device, must not clutter product benefit',
          'Comparative: works for challengers on verifiable attributes',
          'Full funnel: brand + performance are complementary',
        ],
      },
      {
        id: 'promotions-strategy',
        title: 'Promotions Strategy',
        why: 'Promotions drive short-term sales but can damage long-term brand value if misused.',
        explanation: 'Consumer promotions (pull) are directed at end consumers: coupons, rebates, samples, price cuts. Trade promotions (push) are directed at channel partners: quantity discounts, advertising allowances. Good strategy involves integration - pull and push working together. Freemium is a special promotional model: offer a free version to generate traffic and user learning, then convert to paid. Key tradeoff: too few free features = no traffic, too many = few upgrades. Cannibalization can be controlled by adding a "bad" (like ads in Spotify free). Evaluating promotions requires estimating baseline sales - what would have happened WITHOUT the promotion - then calculating incremental impact.',
        takeaways: [
          'Consumer (pull) vs Trade (push) promotions',
          'Integration of pull and push for best results',
          'Risks: changing reference prices, strategic waiting, stockpiling, killing brand loyalty',
          'Freemium tradeoff: traffic generation vs upgrade conversion',
          'Baseline sales: predicted sales absent the promotion',
        ],
      },
      {
        id: 'distribution-channels',
        title: 'Distribution & Channels',
        why: 'Even the best product fails if customers can\'t find or access it.',
        explanation: 'Distribution channel strategy involves decisions about how to get your product to the end customer. This includes direct-to-consumer (DTC) channels vs traditional retail vs hybrid approaches. The Formlabs case examines these tradeoffs. The Olay case also illustrates channel evolution: the shift toward DTC as a response to retailer pushback and changing consumer behavior. Channel strategy must align with overall marketing strategy - product positioning, pricing, and communication all need to work together.',
        takeaways: [
          'Channel choice affects pricing, positioning, and customer experience',
          'DTC gives more control but requires investment in customer acquisition',
          'Retailer relationships matter for shelf space and display',
          'In-store displays and shelf placement drive significant sales',
          'Distribution is part of the integrated marketing strategy (4Ps)',
        ],
      },
    ],
  },
  block4: {
    title: 'Block 4: Marketing Analytics & AI',
    topics: [
      {
        id: 'promotion-evaluation',
        title: 'Promotion Evaluation & Marketing Analytics',
        why: 'If you can\'t measure it, you can\'t improve it. Analytics turns marketing from art into science.',
        explanation: 'The promotion evaluation exercise demonstrates how to measure whether a promotion actually worked. The key concept is baseline sales - what sales would have been without the promotion. You estimate this using regression analysis on historical data, using consumer promotion spend and trade promotion spend as independent variables, along with seasonal controls. Incremental sales = actual minus baseline. Then ROI = (incremental revenue - promotion cost) / promotion cost. The StreamABCDE case provides real data showing how different months with different promotion levels lead to different sales outcomes. The regression approach separates the effects of consumer vs trade promotions.',
        takeaways: [
          'Baseline sales must be estimated, not assumed',
          'Use regression with promo spend and seasonal variables',
          'Incremental impact = actual minus baseline',
          'Separate consumer promo effects from trade promo effects',
          'Don\'t confuse correlation with causation in promo analysis',
        ],
      },
      {
        id: 'ai-personalization',
        title: 'AI & Personalization in Marketing',
        why: 'AI enables scale in personalization, allowing one-to-one marketing to billions of customers.',
        explanation: 'AI and machine learning transform marketing through recommendation systems, predictive analytics, and personalization at scale. Recommendation systems (like Amazon\'s, Netflix\'s) use collaborative filtering and content-based methods to predict what each customer will value. These systems increase customer expansion (share of wallet) by identifying cross-sell and upsell opportunities. Predictive analytics uses customer data to forecast churn risk, identify high-value prospects for acquisition, and optimize pricing. The key is understanding that these tools are customer levers: which CLV lever do they activate? Recommendations = expansion; churn prediction = retention; lookalike modeling = acquisition.',
        takeaways: [
          'Recommendation systems are an expansion lever (share of wallet)',
          'Predictive analytics identifies opportunities across acquisition, retention, and expansion',
          'Privacy and data governance matter for sustainable AI adoption',
          'Personalization should be based on customer data and consent',
          'Test and measure AI initiatives like any other marketing investment',
        ],
      },
    ],
  },
};

function ExpandableTopicCard({ topic, search }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter based on search
  const matchesSearch =
    !search ||
    topic.title.toLowerCase().includes(search.toLowerCase()) ||
    topic.why.toLowerCase().includes(search.toLowerCase()) ||
    topic.explanation.toLowerCase().includes(search.toLowerCase()) ||
    topic.takeaways.some(t => t.toLowerCase().includes(search.toLowerCase()));

  if (!matchesSearch) return null;

  return (
    <Card className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="space-y-3">
        <div>
          <h4 className="text-lg font-semibold text-blue-400 mb-1">{topic.title}</h4>
          <p className="text-sm text-gray-400 italic">{topic.why}</p>
        </div>

        {isExpanded && (
          <div className="border-t border-gray-800 pt-4 space-y-3">
            <div>
              <p className="text-xs font-semibold text-amber-400 mb-2">DETAILED EXPLANATION</p>
              <p className="text-sm text-gray-300 leading-relaxed">{topic.explanation}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-green-400 mb-2">KEY TAKEAWAYS</p>
              <ul className="space-y-1">
                {topic.takeaways.map((takeaway, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex gap-2">
                    <span className="text-green-500 flex-shrink-0">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 mt-2">
          {isExpanded ? '▼ Click to collapse' : '▶ Click to expand'}
        </div>
      </div>
    </Card>
  );
}

export default function Learn({ subtab, search }) {
  const block = blocks[subtab] || blocks.block1;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{block.title}</h2>
        <p className="text-gray-400">Click on any topic to expand and learn the full explanation</p>
      </div>

      <div className="space-y-4">
        {block.topics.map(topic => (
          <ExpandableTopicCard key={topic.id} topic={topic} search={search} />
        ))}
      </div>
    </div>
  );
}