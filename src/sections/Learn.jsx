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
        explanation: 'CLV is the net present value of all future profit streams from a customer over their relationship with the firm. It is forward-looking, not historical profitability. The general formula is: CLV = Sum from t=1 to N of [m_t * r^(t-1) / (1+i)^t] minus AC. Here m_t is profit margin in year t, r is retention rate, i is discount rate, AC is acquisition cost, and N is the time horizon. When margins are constant and the horizon is infinite, this simplifies to CLV = m * r/(1+i-r), where r/(1+i-r) is called the Margin Multiple.\n\nCustomers become more profitable over time through five mechanisms: (1) base profit from repeat purchases, (2) increased purchases and cross-buying, (3) reduced cost to serve as you learn their needs, (4) referrals that bring new customers at zero AC, and (5) price premiums from loyal customers who are less price-sensitive.\n\nThere are two versions of CLV. Absolute CLV = m * Margin Multiple (no AC subtracted). Relative CLV = Absolute CLV minus AC. Relative CLV is what you use to decide acquisition spending: you should spend up to the Relative CLV to acquire a customer. The Thrive Market example: membership $60 + 15% margin on $300 groceries = $105 annual margin, r=0.7, i=0.1, 5-year CLV = $235.11.',
        takeaways: [
          'General CLV = Sum of [m * r^(t-1) / (1+i)^t] - AC; Simplified = m * r/(1+i-r)',
          'Margin Multiple = r/(1+i-r); converts annual margin into lifetime value',
          'Absolute CLV has no AC subtracted; Relative CLV = Absolute minus AC',
          'Retention has the biggest impact on firm value (1% improvement = 4.9% vs 1.1% for margin, 0.1% for AC)',
          'Three levers of growth: Acquisition (reduce AC), Retention (increase r), Expansion (increase m via cross-sell, up-sell, bundling)',
          'Bundling reduces churn by up to 50% (Cox Communications data: TV+HSI+Phone churn = 1.4% vs TV only = 3.0%)',
          'Five reasons customers become more profitable over time: base profit, increased purchases, reduced cost, referrals, price premiums',
          'When computing CLV year-by-year: Year t profit = m * r^(t-1) / (1+i)^t. Retention is cumulative: r^(t-1), not just r',
          'If subscription is quarterly but profits recognized annually, multiply quarterly (revenue - cost) by 4',
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
        explanation: 'Conjoint analysis measures consumer preferences by presenting product profiles with different attribute combinations and asking consumers to rank or rate them. The output is part-worth utilities: a number for each level of each attribute representing how much consumers value it. Higher utility = more preferred.\n\nTotal Product Utility = sum of part-worth utilities across ALL attributes for a given product configuration. To compare two products, compute total utility for each and the higher one is preferred. Example: Acer 3.5GHz AMD $1000 = 4.0+6.0+4.3+6.3 = 20.6 vs Dell 2.5GHz Intel $1600 = 5.3+5.0+6.3+3.3 = 19.9, so consumer prefers Acer.\n\nAttribute Importance = Max utility minus Min utility within that attribute. This measures the RANGE of impact that attribute has on choice. Relative Importance = one attribute\'s range divided by sum of all ranges. Example: if OEM Brand range=1.3, Processor Speed range=2.3, Processor Brand range=2.3, Price range=3.0, then Price is most important (3.0/8.9 = 34%) and OEM Brand is least important (1.3/8.9 = 15%).\n\nPrice Parity analysis: to find what price makes your product equal in utility to a competitor, (1) compute the reference product\'s total utility, (2) compute your product\'s utility WITHOUT the price attribute, (3) the difference is the utility your price must provide, (4) interpolate between known price-utility pairs. Utils-per-dollar = (utility change)/(price change) between two known price levels. Example from Air Fryers: between $89 (1100 utils) and $119 (800 utils), a $30 increase drops 300 utils, so each $1 = 10 utils.',
        takeaways: [
          'Part-worth utility = numerical value of how much consumers value a specific attribute level',
          'Total Product Utility = sum of part-worths across ALL attributes (always add every attribute)',
          'Attribute Importance = Max minus Min range within that attribute (NOT the highest single utility)',
          'Relative Importance = attribute range / sum of all attribute ranges (gives percentage)',
          'To compare products: compute total utility for each, higher total wins',
          'Price parity: set total utilities equal, solve for unknown price utility, then interpolate',
          'Utils-per-dollar: (utility difference) / (price difference) between two known price levels',
          'Common trap: comparing single attributes instead of total utilities across ALL attributes',
          'Conjoint enables: product design optimization, competitive analysis, pricing, market simulation',
        ],
      },
      {
        id: 'pricing-strategy',
        title: 'Pricing Strategy',
        why: 'Price is where you capture value. Set it wrong and you either leave money on the table or lose the customer.',
        explanation: 'The EVC (Economic Value to Customer) framework determines your price ceiling. EVC = Reference Value + Differentiation Value. Reference Value is the price of the closest competing substitute. Differentiation Value is the monetary value of your product\'s attribute differences versus that substitute (can be positive or negative). Your cost sets the price floor. You price between the floor and ceiling based on competitive dynamics and value capture strategy.\n\nConsumer utility from a purchase has two components: Economic utility = EVC minus Price (the rational value), and Psychological utility = fairness perception. Thaler\'s beer experiment demonstrates this: identical beer, but people pay $2.65 from a fancy hotel vs $1.50 from a rundown store. The beer, consumption context, and strategic situation are identical, yet willingness to pay differs purely due to fairness expectations about what each venue "should" charge.\n\nThe Coke vending machine case extends this: temperature-based pricing violates fairness norms because temperature is outside consumer control (an "act of god"). This breaks the implicit contract between firm and consumer. Even if economically rational, it can destroy brand loyalty. Better uses of the technology: targeted communication, inventory planning, or lowering prices in cold weather.\n\nPrice discrimination under competition can backfire. Instead of competing with one average price across all segments, firms now compete head-to-head in each segment with tailored prices, which can intensify price wars. Shrinkflation (reducing quantity at same price) is an alternative to price increases but consumers notice and it has functional limits.',
        takeaways: [
          'EVC = Reference Value + Differentiation Value = price ceiling',
          'Reference Value = price of closest competing substitute',
          'Differentiation Value = monetary value of attribute differences vs substitute (can be + or -)',
          'Price floor = cost; actual price falls between floor and ceiling',
          'Consumer utility = Economic (EVC - Price) + Psychological (fairness)',
          'Fairness norms constrain pricing: consumers punish firms that exploit uncontrollable circumstances',
          'Thaler beer experiment: identical product, different WTP based on vendor context',
          'Price discrimination under competition can intensify price wars (more head-to-head competition per segment)',
          'Shrinkflation: reduces quantity not price, but has limits and trust costs',
          'Netflix example: 60% price hike led to 800K subscriber exodus',
        ],
      },
      {
        id: 'product-line-pricing',
        title: 'Product Line Pricing & Utility Analysis',
        why: 'Most companies sell multiple products. Pricing them together requires balancing extraction from each segment against cannibalization.',
        explanation: 'In product line pricing, you offer different quality levels for different segments and price them so each segment buys the product intended for them. The analysis starts with a Willingness-to-Pay (WTP) table showing how much each segment values each product.\n\nStep 1 - Single Product Benchmark: For each product, find the profit-maximizing price. You can price at the high-type WTP (sell only to high-type) or at the low-type WTP (sell to everyone). Compare profits. Example (Dell): 3.5GHz at $2000 sells to 40 business users = $80K; at $1500 sells to all 100 = $150K. Single product optimum = $150K.\n\nStep 2 - Product Line: Price the low product at the low-type\'s WTP for it. Then find the max price for the high product using the Incentive Compatibility (IC) constraint: WTP_high(high) - P_high >= WTP_high(low) - P_low. This ensures the high-type prefers the high product. Rearranging: P_high <= WTP_high(high) - WTP_high(low) + P_low.\n\nStep 3 - Check for Problems: (a) Can the low-type profitably switch UP to the high product at its price? If surplus from high product > surplus from low product, they will switch and your product line breaks. (b) Compare product line profit to single product profit. Cannibalization cost = the discount you give the high-type relative to their max WTP.\n\nDell Example: Low product (2.0GHz) at $500 to personal users. IC: 2000 - P = 1600 - 500, so P = $900. Product line profit = 60*500 + 40*900 = $66K. But personal users get surplus of 1500-900 = $600 from buying the 3.5GHz vs $0 from the 2.0GHz, so they switch! Single product at $150K dominates.',
        takeaways: [
          'IC constraint: WTP_high(high) - P_high >= WTP_high(low) - P_low ensures high-type buys high product',
          'Always evaluate single product strategy first as a benchmark',
          'Cannibalization cost = WTP_high(high) - P_high (discount given to high-type)',
          'Check both directions: can low-type switch up? Can high-type switch down?',
          'If low product is too valuable to high-type, cannibalization destroys product line profits',
          'Perverse targeting can occur: high-type rationally buys low product, or you price so that segments swap products',
          'Consumer surplus = WTP - Price. Each segment buys the product giving them the highest surplus (or zero if negative)',
          'Product line is only worth it when cannibalization cost < market expansion benefit',
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