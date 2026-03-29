import { useState } from 'react';
import Card from '../components/Card';
import { TwoSidesMatrix, CLVLevers, CLVYearBars, FearAppealsU, EVCSpectrum, ProductLineComparison, ConjointImportance, FreemiumTradeoff, STPFlow, FullFunnelDiagram, ICConstraintVisual } from '../components/Charts';

const CHART_MAP = {
  'two-sides': TwoSidesMatrix,
  'clv-levers': CLVLevers,
  'clv-bars': CLVYearBars,
  'fear': FearAppealsU,
  'evc': EVCSpectrum,
  'product-line': ProductLineComparison,
  'conjoint': ConjointImportance,
  'freemium': FreemiumTradeoff,
  'stp': STPFlow,
  'funnel': FullFunnelDiagram,
  'ic-constraint': ICConstraintVisual,
};

const blocks = {
  block1: {
    title: 'Block 1: Customer Value Management',
    topics: [
      {
        id: 'marketing-concept',
        title: 'The Marketing Concept',
        why: 'Everything starts here: a firm\'s value is only as good as its customers\' value.',
        explanation: 'The primary source of a firm\'s cash flow is paying customers. Customers pay when they believe the firm\'s product delivers better value than the alternatives. All assets on a balance sheet — plants, technology, brand — only matter because they help the firm acquire, retain, and grow customers. Marketing strategy is the bridge: it connects what customers value to what the firm captures as profit.\n\nNot all customers are equally valuable. The Kanthal case is the classic example: when management mapped their customers onto a two-sided value framework, they discovered that the top 5% of customers generated ALL the profitability, while half the customer base was actively loss-making. This forced a radical strategy shift — including "firing" unprofitable customers. Sprint did this with termination letters. Delta does it with no-fly lists. Costco does it by revoking memberships. The lesson: managing who you serve is as important as how you serve them.',
        mentalModel: 'Mental model: Think of your firm as a pipeline. Customers flow in (acquisition), stay inside (retention), and grow bigger over time (expansion). The market cap of your company is essentially the discounted NPV of that pipeline. Marketing\'s job is to maximize that pipeline\'s value — not just fill it.',
        workedExample: 'Kanthal AB (Sweden): Analyzed profitability by customer. Result — the largest accounts demanded custom orders, dedicated service, rush deliveries, and heavy discounts. Their "size" masked that they were deeply unprofitable. Meanwhile, small accounts placed standard orders at list prices with minimal service demands. Action: management "fired" their 10 biggest accounts and profitability doubled.',
        takeaways: [
          'Firm value = f(customer value) — not the other way around',
          'Two sides of value: what customers receive vs what the firm captures',
          'Not all customers are worth keeping — some destroy value (Kanthal: 5% generate all profit)',
          'Firing customers is a real strategy: Sprint, Delta, Costco all do it',
          'Marketing strategy must address BOTH creating value and capturing it',
        ],
      },
      {
        id: 'customer-lifetime-value',
        title: 'Customer Lifetime Value (CLV)',
        why: 'CLV tells you exactly how much a customer is worth, so you know what to invest to get — and keep — them.',
        explanation: 'CLV is the net present value (NPV) of all future profit streams from a customer over their relationship with the firm. It is forward-looking — not historical. The general formula is:\n\nCLV = Σ(t=1 to N) [m × r^(t-1) / (1+i)^t] − AC\n\nm = annual profit margin per customer, r = retention rate, i = discount rate (cost of capital), AC = acquisition cost, N = time horizon.\n\nThe retention rate is CUMULATIVE: in year 3, r^(t-1) = r² because a customer in year 3 had to survive year 2 AND year 3. This is the most common calculation error on exams.\n\nWhen margins are constant and the horizon is infinite, the formula simplifies to CLV = m × [r/(1+i−r)]. The term r/(1+i−r) is called the Margin Multiple — it converts annual margin into lifetime value.\n\nAbsolute CLV = m × Margin Multiple (no acquisition cost). Relative CLV = Absolute CLV − AC. You use Relative CLV to make acquisition spend decisions: spend up to Relative CLV to acquire a customer.\n\nCustomers become more profitable over time through FIVE mechanisms: (1) base profit from repeat purchases, (2) increased purchases and cross-buying over time, (3) reduced cost to serve as you learn their needs, (4) referrals that bring new customers at zero acquisition cost, (5) price premiums — loyal customers are less price-sensitive.\n\nThe three levers of CLV growth:\n- Retention (r): 1% improvement = 4.9% increase in firm value — the highest-leverage lever by far\n- Margin (m): 1% improvement = 1.1% increase in firm value\n- Acquisition cost (AC): 1% improvement = 0.1% increase in firm value\n\nRetention is 49× more impactful than reducing acquisition cost. Yet most firms spend the majority of their marketing budget on acquisition.',
        mentalModel: 'Mental model: If a gym member gives you $240 margin per year, don\'t think of them as "$240/year." Think: what\'s the NPV of 5 years of that cash flow, discounted at 9%, accounting for 20% annual attrition, minus the $150 I paid to acquire them? That\'s what they\'re ACTUALLY worth — and the answer is $501.33. That\'s the maximum I should rationally spend to keep them.',
        workedExample: 'Get Fit Gyms (actual exam format): m = $600−$360 = $240/yr, r = 80%, i = 9%, AC = $150, N = 5 years.\nYear 1: $240 × 1/(1.09)¹ = $220.18\nYear 2: $240 × 0.80/(1.09)² = $161.60\nYear 3: $240 × 0.64/(1.09)³ = $118.60\nYear 4: $240 × 0.512/(1.09)⁴ = $87.05\nYear 5: $240 × 0.4096/(1.09)⁵ = $63.89\nAbsolute CLV = $651.33\nRelative CLV = $651.33 − $150 = $501.33\n\nQuarterly version (PMJ Software-style): If subscription is quarterly but profits realized annually, multiply quarterly margin × 4 first. PMJ Easy: $100/yr, r=80%, 2-year horizon, i=0% → $100 + $80 = $180 total CLV.',
        takeaways: [
          'CLV = NPV of future profits, NOT revenue — always use margin, not price',
          'Retention is CUMULATIVE: Year 3 profit = m × r² / (1+i)³ (r squared, not r)',
          'Absolute CLV = no AC; Relative CLV = Absolute minus AC',
          'Margin Multiple = r/(1+i−r) — memorize this for the exam',
          '1% retention = 4.9% firm value; 1% margin = 1.1%; 1% AC = 0.1%',
          'Quarterly subscription: multiply (quarterly revenue − quarterly cost) × 4 = annual margin',
          'Bundling reduces churn up to 50% (Cox: TV+HSI+Phone = 1.4% churn vs TV alone = 3.0%)',
          'Five reasons customers get more profitable over time: base profit, cross-buy, lower service cost, referrals, price premiums',
        ],
        chartIds: ['clv-bars', 'clv-levers'],
      },
      {
        id: 'two-sides-value',
        title: 'Two Sides of Value Framework',
        why: 'Not every customer who loves your product is profitable. Not every profitable customer is loyal. Strategy must address both.',
        explanation: 'The Two Sides of Value matrix plots Customer Experience (x-axis: how much value the firm creates for the customer) against Customer Profitability (y-axis: how much value the firm captures from the customer). Four quadrants result:\n\nStar Customers (high/high): High experience, high profit. Invest to grow these relationships. These are your best customers.\n\nVulnerable Customers (low experience, high profitability): Profitable today but getting bad service or low satisfaction. They will churn. Fix the experience before they leave — their value justifies the investment.\n\nFree Riders (high experience, low profitability): They love your product but you\'re not capturing much value. They enjoy heavy discounts, use premium support excessively, or are in unprofitable segments. Strategy: find a way to monetize, OR reduce the service they receive.\n\nLost Causes (low/low): Unprofitable AND dissatisfied. These customers are destroying value. The strategy here is to minimize investment or exit the relationship.\n\nThe Kanthal case showed most companies have far more Free Riders and Lost Causes than they realize, because they only look at revenue, not profitability.',
        mentalModel: 'Mental model: A high-end restaurant. Star = the regular who pays full price and leaves great Yelp reviews. Vulnerable = the corporate account paying full price but always getting the wrong table. Free Rider = the friend-of-the-owner who gets comped wine every time. Lost Cause = the Yelp tourist who orders the cheapest item, complains, and never returns.',
        workedExample: 'Kanthal AB: Mapped their full customer base onto the 2×2. Large industrial accounts with big revenue = "Free Riders" and "Lost Causes" (massive customization costs, rush orders, heavy discounts). Small accounts at list prices = "Stars." Result: fired the largest accounts, redirected service investment to profitable smaller accounts. Profitability doubled.',
        takeaways: [
          'Creating value without capturing it = Free Riders (need monetization strategy)',
          'Capturing without creating = Vulnerable (need experience investment or they\'ll churn)',
          'Not all customers deserve equal investment — prioritize Stars, fix Vulnerable, monetize Free Riders',
          'Kanthal: biggest accounts by revenue were unprofitable; smallest were Stars',
          'Exam application: when asked about customer strategy, first classify the quadrant, then prescribe',
        ],
        chartIds: ['two-sides'],
      },
      {
        id: 'segmentation-targeting-positioning',
        title: 'Segmentation, Targeting, and Positioning (STP)',
        why: 'You can\'t serve everyone equally well. STP forces the hard choices about WHO you serve and HOW you beat alternatives for them.',
        explanation: 'Segmentation divides the market into groups with similar needs and behaviors. Four variable types:\n\n1. Geographic: region, city size, climate — useful for distribution and messaging\n2. Demographic: age, income, gender, marital status — easy to measure, commonly used\n3. Psychographic: lifestyle, values, attitudes — captures "why" behind behavior; lifestyle is PSYCHOGRAPHIC not behavioral\n4. Behavioral: usage intensity, consumption frequency, loyalty status — captures what customers actually DO\n\nCritical distinction on exams: Marital status = demographic. Lifestyle = psychographic. Usage intensity = behavioral. Consumption frequency = behavioral.\n\nTargeting: evaluate which segments to serve based on attractiveness (size, growth, competition, fit with firm capabilities).\n\nPositioning is how you differentiate. Two types:\n- Vertical positioning: quality/performance attributes where everyone agrees "more is better," but consumers differ in willingness to pay. BMW 3-series vs 7-series. Safety in cars. Everyone wants safer; high-income buyers pay for it.\n- Horizontal positioning: taste/style attributes where preferences genuinely differ regardless of income. Car color. BMW 3-series vs M3. Neither is objectively "better" — it depends on preference.\n\nSimpson\'s Paradox explains why segmentation is analytically critical: aggregate data can show the OPPOSITE relationship from what exists within segments. Example: Hospital A looks worse than Hospital B on average mortality. But when you segment by patient severity, Hospital A is better for EVERY category. Hospital B just gets healthier patients. Without segmentation, you\'d make the wrong call.',
        mentalModel: 'Mental model (Simpson\'s Paradox): Imagine two schools. School A has 60% pass rate. School B has 70% pass rate. "School B is better." But when you split by student income level, School A beats School B in EVERY income bracket. School B just has wealthier students. This is why you never trust aggregate data — always segment first.',
        workedExample: 'Credit card segmentation — Transactors vs Revolvers:\nTransactors: pay balance in full monthly. Revenue to bank = fees only (~1-2% interchange). Low CLV.\nRevolvers: carry a balance. Revenue = interest (15-24% APR) + fees. High CLV.\nSame product, completely different value to the firm. Banks actively try to convert Transactors to Revolvers with low intro rates. Strategy is fundamentally different for each segment — which shows why demographic segmentation alone ("age 25-35") misses the point.',
        takeaways: [
          'Segmentation types: Geographic, Demographic (income, age, marital status), Psychographic (lifestyle, values), Behavioral (usage, frequency)',
          'Lifestyle = PSYCHOGRAPHIC (not behavioral) — exam trap',
          'Marital status = DEMOGRAPHIC — exam trap',
          'Vertical positioning = quality/performance (everyone prefers more, WTP differs)',
          'Horizontal positioning = taste/style (preferences differ regardless of budget)',
          'Simpson\'s Paradox: always segment before drawing conclusions from aggregate data',
          'Exam: behavioral segmentation variables = usage intensity AND consumption frequency (a and c, not b and d)',
        ],
        chartIds: ['stp'],
      },
    ],
  },
  block2: {
    title: 'Block 2: Creating & Capturing Value',
    topics: [
      {
        id: 'product-strategy-branding',
        title: 'Product Strategy & Branding',
        why: 'Product launch decisions — offensive vs defensive, single vs line — determine who you serve and at what profit.',
        explanation: 'Product launches serve two distinct strategic purposes:\n\nOffensive launch: Capture new market segments or grow the total market. Economic rationale: expand revenue with minimal cannibalization. Example: Reese\'s launching Reese\'s Pieces — same brand, new format, new snacking occasions, new customers.\n\nDefensive launch: Protect existing market share from competition. Economic rationale: prevent a competitor from establishing a beachhead in your market. Example: when P&G noticed direct-to-consumer disruptors eating into their shelf space (Dollar Shave Club, Harry\'s), they launched direct channels.\n\nThe Olay case illustrates Managerial Inertia: a successful legacy brand that resisted change (DTC disruption, millennial shift, clean beauty) because internal incentives rewarded managing existing SKUs, not cannibalizing them. The solution required: social media/influencer investment, DTC channel, Skin Advisor tool, and SKU rationalization.\n\nProduct Proliferation Trap: More SKUs lead to consumer confusion, retailer pushback (shelf space is finite), and higher complexity costs. Olay had 60+ products; they cut to a focused line and saw sales improve.\n\nKey rule: always evaluate single product vs product line by comparing profits, because the product line can LOSE to single product when cannibalization is high.',
        mentalModel: 'Mental model: Offensive = "We\'re going into new territory." Defensive = "We\'re protecting the walls." Product line risk = you build a door in your wall for segment 2, but segment 1 also walks through it.',
        workedExample: 'Dell Laptops — Product Line vs Single Product:\nPersonal users (60 customers): WTP $500 for 2GHz, $1500 for 3.5GHz\nBusiness users (40 customers): WTP $1600 for 2GHz, $2000 for 3.5GHz\n\nSingle product option: 3.5GHz laptop\n- Price at $2000 → only business users buy → 40 × $2000 = $80,000\n- Price at $1500 → all 100 buy → 100 × $1500 = $150,000\nSingle product optimum = $1500 → $150,000 profit\n\nProduct line: 2GHz for personal at $500, 3.5GHz for business at max IC price\nIC: 2000 − P ≥ 1600 − 500 → P ≤ $900\nProduct line profit = 60 × $500 + 40 × $900 = $30K + $36K = $66,000\n\nSingle product ($150K) beats product line ($66K) by $84,000. Reason: the 2GHz product is SO valuable to business users ($1,600 WTP) that the IC constraint forces a $1,100 discount on the premium product.',
        takeaways: [
          'Offensive launch = expand market/new segments; Defensive = protect existing share',
          'Olay: managerial inertia delayed necessary repositioning — internal incentives mattered',
          'Product Proliferation Trap: more SKUs → consumer confusion + retailer pushback',
          'Always benchmark single product profit before evaluating product line',
          'IC constraint: WTP_high(high) − P_high ≥ WTP_high(low) − P_low',
          'When cannibalization cost > market expansion benefit, single product wins',
        ],
        chartIds: ['product-line'],
      },
      {
        id: 'conjoint-analysis',
        title: 'Conjoint Analysis',
        why: 'Conjoint reveals what customers actually value so you can design products and set prices based on data, not guesses.',
        explanation: 'Conjoint analysis measures consumer preferences by presenting product profiles with different attribute combinations and having consumers rank or rate them. The output is part-worth utilities — a number for each level of each attribute representing how much consumers value it.\n\nStep 1 — Total Product Utility: Sum all part-worth utilities across EVERY attribute for a given product configuration. Always add ALL attributes, even the ones that seem small.\n\nStep 2 — Compare Products: Compute total utility for each product. Higher total = consumer preference.\n\nStep 3 — Attribute Importance: Importance = Max utility − Min utility WITHIN that attribute. This measures the RANGE of impact. A $1 price change might matter a lot (high range = high importance) while brand might matter little (low range = low importance). Relative Importance = attribute range ÷ sum of all attribute ranges.\n\nStep 4 — Price Parity: To find what price makes your product equal in utility to a competitor:\n(a) Compute the reference product\'s total utility\n(b) Compute your product\'s utility WITHOUT the price attribute\n(c) The difference = the utility your price must provide\n(d) Find what price delivers that utility using linear interpolation between known price-utility pairs\n\nUtils-per-dollar: Between two known price points, utils-per-dollar = (utility change) ÷ (price change). Use this rate to interpolate.\n\nKey trap: Never compare single attributes between products. A Dell laptop might have a higher brand utility than Acer, but if Acer has a much better speed and lower price, the total utility wins for Acer.',
        mentalModel: 'Mental model: Conjoint is like a recipe scorecard. A burger\'s total score = bun score + patty score + sauce score + price score. To compare two burgers, add up ALL the scores. Importance = how much does swapping ONE ingredient change the total score? Price almost always has the biggest range → most important "ingredient" in the score.',
        workedExample: 'Laptop Conjoint (from practice set):\nOEM Brand: Acer=4.0, Dell=5.3 (range=1.3 → LEAST important)\nProcessor: Intel=6.3, AMD=4.3 (range=2.0)\nSpeed: 2.0GHz=4.1, 2.5GHz=5.0, 3.5GHz=6.0 (range=1.9)\nPrice: $800=8.3, $1000=6.3, $1400=5.3, $1600=3.3 (range=5.0 → MOST important)\n\nProduct comparison:\nAcer 3.5GHz AMD $1000: 4.0 + 6.0 + 4.3 + 6.3 = 20.6 utils\nDell 2.5GHz Intel $1600: 5.3 + 5.0 + 6.3 + 3.3 = 19.9 utils\nConsumer prefers Acer (higher total utility despite weaker brand).\n\nPrice Parity — what price makes Dell equal utility to Acer at 20.6?\nDell non-price utility = 5.3 + 5.0 + 6.3 = 16.6\nNeed Dell price utility = 20.6 − 16.6 = 4.0\nBetween $1400 (5.3 utils) and $1600 (3.3 utils):\nUtils/$ = (5.3−3.3)/200 = 0.01 per dollar\nDrop needed: 5.3 → 4.0 = 1.3 utils = $130 price increase\nPrice parity for Dell = $1400 + $130 = $1,530',
        takeaways: [
          'Total Product Utility = SUM of part-worths across ALL attributes — never skip one',
          'Attribute Importance = MAX − MIN range within that attribute (NOT the highest utility level)',
          'Relative Importance = attribute range ÷ sum of all attribute ranges → gives percentage',
          'Price is almost always the most important attribute (highest range)',
          'Price parity: (1) get reference total utility, (2) compute your utility without price, (3) solve for needed price utility, (4) interpolate',
          'Utils-per-dollar = utility change / price change between two known price levels',
          'Common exam trap: comparing individual attribute utilities instead of total product utility',
        ],
        chartIds: ['conjoint'],
      },
      {
        id: 'pricing-strategy',
        title: 'Pricing Strategy & EVC',
        why: 'Price is where you capture value. The EVC framework gives you the rational ceiling; psychology tells you where the real constraints are.',
        explanation: 'EVC (Economic Value to Customer) = Reference Value + Differentiation Value. This is the theoretical MAXIMUM a rational customer would pay.\n\nReference Value = price of the closest competing substitute. This anchors what you\'re worth relative to competition.\n\nDifferentiation Value = the monetary value of your product\'s attribute differences vs that substitute. Can be positive (your product is better in ways worth money) or negative (your product has drawbacks). Sum all positive and negative differentiation values.\n\nPrice floor = your cost. Your price must fall between cost (floor) and EVC (ceiling). Where exactly depends on competitive dynamics — how much value you want to create for customers vs capture for yourself.\n\nBut rational economics is only PART of the story. Consumer utility = Economic utility (EVC − Price) + Psychological utility (fairness perception). Thaler\'s beer experiment: identical beer, but people pay $2.65 from a fancy hotel vs $1.50 from a rundown store. The beer, the thirst, and the consumption are identical. The only difference is FAIRNESS EXPECTATIONS — what feels reasonable to pay based on the venue.\n\nThe Coke Vending Machine case extends this: temperature-based pricing raised Cokes in hot weather, which violated fairness norms. Why? Temperature is outside consumer control — an "act of god." Charging more when someone is suffering heat feels exploitative. It breaks the implicit contract between Coke and its consumers. Economically rational, psychologically toxic.\n\nPrice discrimination can backfire under competition: instead of competing with ONE average price across all segments, firms now compete head-to-head in EACH segment with tailored prices, multiplying competitive intensity. This can intensify price wars.\n\nShrinkflation = reducing quantity while holding price constant. Works short-term but consumers notice and it has functional limits.',
        mentalModel: 'Mental model: EVC is what a perfectly rational homo economicus would pay. Actual price is limited by (1) competition, (2) fairness norms, and (3) how much value you want to share with customers. The Coke case: EVC for cold Coke in 95-degree weather is very high. But charging that EVC destroys loyalty because it feels like exploitation. Firm value = economics + psychology.',
        workedExample: 'Industrial pump EVC example:\nCompetitor pump price (Reference Value) = $10,000\nYour pump advantages:\n- Uses $2,000 less electricity/year × 5-year lifespan = +$10,000\n- Superior reliability: $500 fewer repairs/year × 5 years = +$2,500\nYour pump disadvantages:\n- Larger size requires $1,500 installation modification = −$1,500\nDifferentiation Value = $10,000 + $2,500 − $1,500 = $11,000\nEVC = $10,000 + $11,000 = $21,000\nIf your cost = $8,000, price between $8,000 and $21,000.\nPrice at $15,000 → customer saves $6,000 vs EVC → high incentive to buy.',
        takeaways: [
          'EVC = Reference Value + Differentiation Value = PRICE CEILING, not recommended price',
          'Reference Value = price of closest competing substitute',
          'Differentiation Value can be + or − depending on attribute advantages/disadvantages',
          'Cost = price floor; actual price sits between floor and ceiling',
          'Consumer utility = Economic utility (EVC−Price) + Psychological utility (fairness)',
          'Thaler beer: same product, different WTP based on fairness expectations about vendor',
          'Coke vending: temperature-based pricing failed because temperature is outside consumer control',
          'Price discrimination under competition intensifies price wars (competing per segment, not per market)',
          'Shrinkflation: short-term fix, long-term trust cost',
        ],
        chartIds: ['evc'],
      },
      {
        id: 'product-line-pricing',
        title: 'Product Line Pricing & Incentive Compatibility',
        why: 'Pricing two products for two segments sounds simple but has counterintuitive traps — and the exam WILL have a calculation on this.',
        explanation: 'Product line pricing: you offer two quality levels (high and low) for two segments (high-type and low-type), priced so each segment buys the product intended for them.\n\nStep 1 — Single Product Benchmark:\nFor each product, compare: (a) price at high-type\'s WTP × high-type segment size vs (b) price at low-type\'s WTP × total segment size. Choose the higher profit. This is your benchmark to beat with the product line.\n\nStep 2 — Product Line IC Constraint:\nLow product: Price the low product at the low-type\'s WTP for it (or anywhere that maximizes low-type profit).\nHigh product: The maximum price for the high product comes from the Incentive Compatibility (IC) constraint. The high-type must weakly prefer the high product:\n\nWTP_high(high) − P_high ≥ WTP_high(low) − P_low\nRearranging: P_high ≤ WTP_high(high) − WTP_high(low) + P_low\n\nStep 3 — Check for Problems:\n(a) Will the low-type switch UP to the high product? Compare their surplus from high vs low. If surplus from high > 0, they\'ll buy high — which destroys your product line segmentation.\n(b) Does product line profit exceed single product profit? If not, stick with single product.\n\nCannibalization cost = the discount you must give the high-type (WTP_high(high) − P_high). This is the cost of offering a product line. If the low product is very valuable to the high-type, this cost is huge and single product wins.\n\nPerverse targeting can occur: you can design pricing where the high-type buys the low product (if low product is cheap and very good for them). Firms must actively prevent this through product design.',
        mentalModel: 'Mental model: A restaurant menu. The $14 pasta exists partly to make the $28 steak look reasonable. But if the pasta is SO good that all your business dinner clients order it, you\'ve just shot yourself in the foot. IC constraint is the menu-design rule that ensures each customer type "self-selects" into the right product.',
        workedExample: 'Dell Product Line (from practice set — high exam probability):\nPersonal users (60 people): WTP $500 for 2GHz, $1500 for 3.5GHz\nBusiness users (40 people): WTP $1600 for 2GHz, $2000 for 3.5GHz\n\nSingle Product Analysis:\n3.5GHz at $2000 → 40 × $2000 = $80,000\n3.5GHz at $1500 → 100 × $1500 = $150,000 ← optimal single product\n\nProduct Line:\nLow (2GHz) targeted at personal users: Price = $500 (their WTP)\nIC for high (3.5GHz) targeting business users:\n2000 − P_high ≥ 1600 − 500 → P_high ≤ $900\nProduct line profit = 60 × $500 + 40 × $900 = $30,000 + $36,000 = $66,000\n\nProblem check — do personal users switch to 3.5GHz at $900?\nSurplus if they buy high: $1500 − $900 = $600 (positive!)\nSurplus if they buy low: $500 − $500 = $0\nPersonal users prefer to buy the 3.5GHz at $900. Product line breaks.\n\nConclusion: Single product at $1500 → $150,000 is the correct strategy. Cannibalization cost makes the product line unviable.',
        takeaways: [
          'IC Constraint: WTP_high(high) − P_high ≥ WTP_high(low) − P_low',
          'Max P_high = WTP_high(high) − WTP_high(low) + P_low',
          'Always benchmark single product first: evaluate every possible price × segment combination',
          'Cannibalization cost = the discount forced on high-type by offering a low product',
          'Check both ways: can low-type switch UP? Can high-type switch DOWN?',
          'If low product is too attractive to high-type, product line fails — single product wins',
          'Product line beats single only when market expansion > cannibalization cost',
          'Consumer surplus = WTP − Price; each segment buys whichever product maximizes their surplus',
        ],
        chartIds: ['ic-constraint', 'product-line'],
      },
    ],
  },
  block3: {
    title: 'Block 3: Communicating & Delivering Value',
    topics: [
      {
        id: 'advertising-strategy',
        title: 'Advertising Strategy',
        why: 'Your creative strategy determines whether the message lands or gets ignored. The exam tests whether you know when each approach works — and when it backfires.',
        explanation: 'Two fundamental advertising approaches:\n\nEmotional appeals: Target psychological, social, or identity needs. Work best when: (1) many substitutable products with little functional differentiation — emotional connection becomes the differentiator, (2) you want to increase consumer involvement in low-interest categories. Example: Michelin tire ads showing a baby in a tire ("Because so much is riding on your tires"). Purely emotional, drives involvement in a low-interest category.\n\nRational appeals: Provide functional, utilitarian information about product performance. Work best in high-involvement categories where consumers actively research (cars, software, financial products).\n\nSpecial creative platforms:\n\nFear appeals: Follow an inverted-U relationship with effectiveness. Zero fear = no motivation to act. Moderate fear = optimal engagement and behavior change. Too much fear = psychological defense mechanisms kick in (denial, avoidance, "it won\'t happen to me"). Design principle: always pair fear with a clear, specific, achievable solution. "This could happen to you, and here\'s exactly how to prevent it." Best for: insurance, healthcare, safety products, security software.\n\nHumor: Aids memorability and cuts through advertising clutter. BUT must not overshadow the product benefit. The humor is the delivery vehicle, not the message. Risk: people remember the joke but not the brand. Always pre-test. Risk is higher for luxury/premium brands where humor can cheapen positioning.\n\nComparative advertising: Directly names or implies a competitor. Credible on VERIFIABLE attributes (measurable claims that consumers can confirm). Works for challengers — helps challengers punch up, raises profile. Risky for market leaders — legitimizes competitors, opens you to counter-attacks.\n\nFull Funnel: Brand (top-of-funnel: awareness, consideration) and Performance (bottom-of-funnel: conversion, activation) advertising are COMPLEMENTARY. TikTok data shows brand-aware users convert at much higher rates on performance ads. Neither replaces the other.',
        mentalModel: 'Mental model: Advertising is a conversation. Rational = giving someone facts. Emotional = making someone feel something. Fear = warning someone. Humor = making someone laugh so they remember you. Comparative = arguing you\'re better. The best campaigns combine multiple of these — but the creative choice must match the category, the brand, and what you\'re trying to move.',
        workedExample: 'Fear appeals — Michelin tires:\nModerate fear: "A baby sitting inside a Michelin tire, with copy: a lot is riding on your tires." Creates concern (moderate fear) without graphic horror. Immediately positions Michelin as the solution. Effective.\n\nToo much fear (what to avoid): An insurance ad showing graphic car accident footage. Creates anxiety that people want to escape by NOT looking at your ad. They look away, change the channel, skip the ad. Fear backfires.\n\nComparative advertising — Challengers vs Leaders:\nPepsi Challenge (challenger): "Blind taste test — people prefer Pepsi over Coke!" Classic comparative move by a challenger. Raised Pepsi\'s profile, forced Coke to respond with (disastrously) New Coke.\nCoke (leader) does NOT run comparative ads — it would only legitimize Pepsi as an equal competitor.',
        takeaways: [
          'Emotional = involvement and differentiation in commodity categories',
          'Rational = informative, high-involvement categories',
          'Fear appeals: inverted-U — moderate fear is optimal; too much causes avoidance/denial',
          'Pair fear with a specific, achievable solution or the ad backfires',
          'Humor: memorability device — must NOT overshadow product benefit; always pre-test',
          'Comparative: best for challengers on VERIFIABLE attributes; risky for market leaders',
          'Full funnel: Brand (awareness) + Performance (conversion) are complementary, not substitutes',
          'TikTok case: brand campaigns increased performance ad conversion — evidence of complementarity',
        ],
        chartIds: ['fear', 'funnel'],
      },
      {
        id: 'promotions-strategy',
        title: 'Promotions Strategy & Freemium',
        why: 'Promotions can drive short-term sales or destroy long-term brand equity. Freemium is a special case the exam tests directly.',
        explanation: 'Pull vs Push promotions:\n\nConsumer promotions (Pull): Directed at end consumers to pull demand through the channel. Examples: coupons, rebates, samples, contests, price cuts, loyalty points. Goal: generate consumer demand that forces retailers to stock your product.\n\nTrade promotions (Push): Directed at channel partners (retailers, distributors) to push product into the channel. Examples: quantity discounts, advertising allowances, display allowances, slotting fees. Goal: get shelf space, displays, and channel partner effort behind your product.\n\nOptimal strategy integrates both: create consumer pull AND incentivize channel push simultaneously.\n\nRisks of over-promoting:\n- Reference price shift: consumers learn the "real" price is the promoted price, won\'t buy at full price\n- Strategic waiting: consumers time purchases to promotions only\n- Stockpiling: consumers buy ahead, reducing future sales (promotion "borrows" from itself)\n- Brand equity erosion: heavy discounting cheapens positioning\n\nFreemium strategy:\nRationale for offering free tier: (1) scale user base without ad spend (Dropbox, LinkedIn grew virally), (2) product learning — users who experience value upgrade over time, (3) network effects — larger free base increases value for everyone, (4) switching costs — free users get locked in (Dropbox: files everywhere = hard to leave).\n\nDesign tradeoff — key exam question: Too few free features = no traffic, no viral growth. Too many free features = no reason to upgrade.\n\nCannibalization control: Add a "bad" to the free tier (Spotify: ads, no offline, quality limits). This makes the premium tier clearly superior without removing the free tier\'s value for acquisition.\n\nFreemium + advertising: The free tier with ads (Spotify, Pandora) creates a three-tier model: paid premium, ad-supported free, and paid ad-free. Each segment self-selects.',
        mentalModel: 'Mental model for freemium: A buffet restaurant. The free appetizers in the lobby (freemium) get you in the door. But if the appetizers are SO good that people are full and don\'t buy a meal, you\'ve cannibalized yourself. The appetizers need to be good enough to prove value, but leave you hungry for the main course.',
        workedExample: 'Freemium design — Dropbox:\nFree tier: 2GB storage. Rationale: enough to store important files and experience the product.\nRationale for free tier: viral referral program ("invite a friend, get 500MB") turned users into sales force — zero acquisition cost scaling.\nNetworking effect: shared folders only work if others also have Dropbox → free users expand the installed base.\nSwitching cost: once you have 2,000 files in Dropbox, the migration cost is enormous.\nConversion: 10-20% of free users eventually upgrade when they hit the 2GB limit.\n\nKey: The 2GB limit is the "bad" — it forces a decision point without making the free product worthless.',
        takeaways: [
          'Pull (consumer) = coupons, samples, price cuts — creates demand at consumer level',
          'Push (trade) = quantity discounts, allowances — motivates channel partners',
          'Over-promotion risks: reference price shifts, strategic waiting, stockpiling, brand erosion',
          'Freemium rationale: user base scaling, product learning, network effects, switching costs',
          'Key tradeoff: Traffic generation (rich free tier) vs Upgrade conversion (limited free tier)',
          'Control freemium cannibalization by adding a "bad" to free tier (ads, limits) — Spotify model',
          'Exam question format: "describe THREE rationales for freemium and the key tradeoff"',
        ],
        chartIds: ['freemium'],
      },
      {
        id: 'distribution-channels',
        title: 'Distribution & Channels',
        why: 'The best product fails if customers can\'t find or access it — and channel choice locks in your pricing and positioning.',
        explanation: 'Channel strategy determines how your product reaches the end customer. Key decision: direct-to-consumer (DTC) vs traditional retail vs hybrid.\n\nDTC advantages: control over price, positioning, customer data, and experience. No retailer margin to give up. Direct relationship with customer enables CLV management. Enables personalization.\n\nDTC disadvantages: requires investment in customer acquisition (you don\'t get foot traffic). Must build your own logistics. Harder to scale fast.\n\nRetail advantages: existing traffic, trial-inducing shelf presence, immediate scale. Consumer sees product in context of competitors.\n\nRetail disadvantages: retailer takes margin (typically 30-50%). Retailers control shelf placement, promotion, and display. Your product is one of many competing for attention.\n\nOlay case: Legacy brand with too many SKUs, getting crushed by DTC disruptors (no7, Drunk Elephant) who had cleaner lines and better digital marketing. Solution required BOTH product line rationalization AND DTC investment — one without the other wouldn\'t have worked.\n\nFormlabs case: Industrial 3D printer manufacturer. Had to choose between DTC (high margin, direct customer relationship, slow) and distributors/resellers (lower margin, faster penetration, less control). Channel selection drives market penetration speed and ultimately CLV at the business level.',
        mentalModel: 'Mental model: DTC = owning a store. Retail = wholesaling. DTC gives you more margin and control but you have to attract your own traffic. Retail gives you access to traffic but you give up margin, control, and the customer relationship. Neither is universally better — it depends on your category, resources, and strategy.',
        workedExample: 'Olay channel evolution:\nProblem: Department store retail → declining (foot traffic down 30%), heavy promotions needed for shelf space, product proliferation (60+ SKUs) causing confusion.\nSolution: Launched Olay.com DTC + Skin Advisor (AI skincare recommendation tool). Reduced SKUs from 60+ to a focused core line. Invested in social media/influencer vs traditional TV advertising.\nResult: Higher-margin DTC sales, better customer data, improved conversion through personalization.',
        takeaways: [
          'DTC: higher margin and data, but requires own customer acquisition investment',
          'Retail: scale and traffic, but gives up margin, control, and customer relationship',
          'Channel choice must align with product positioning and price point',
          'In-store placement and displays drive significant sales — don\'t underestimate retail power',
          'Olay: DTC + digital + SKU rationalization was a package solution, not one lever alone',
          'Distribution is part of integrated marketing (4Ps) — channel misalignment kills products',
        ],
      },
    ],
  },
  block4: {
    title: 'Block 4: Marketing Analytics & AI',
    topics: [
      {
        id: 'promotion-evaluation',
        title: 'Promotion Evaluation & Baseline Sales',
        why: 'If you can\'t distinguish the promotion\'s effect from everything else happening, you\'re lying to yourself about ROI. This is a high-probability exam topic.',
        explanation: 'The fundamental problem: When sales go up during a promotion, how much of that increase is BECAUSE of the promotion vs because of other factors (season, competitor issues, economic conditions)?\n\nBaseline Sales = the level of sales that would have occurred WITHOUT any promotion. This is NOT the same as average sales, because average sales includes promotion periods which inflate the baseline.\n\nYou estimate baseline using regression analysis. Model: Sales = intercept + β₁ × Consumer_Promo_Spend + β₂ × Trade_Promo_Spend + β₃ × Month_Dummy + error. Build the regression on historical data. Then set Consumer_Promo_Spend = 0 and Trade_Promo_Spend = 0 to predict baseline for a given period.\n\nIncremental Sales = Actual Sales − Baseline Sales.\nPromotion ROI = (Incremental Revenue − Promotion Cost) / Promotion Cost.\n\nKey complications:\n- Seasonality: must control for it in the baseline model, otherwise you\'ll attribute Christmas sales lift to the promotion\n- Stockpiling: some of the "incremental" sales come from consumers buying ahead, which reduces sales in subsequent periods\n- Cross-channel effects: a consumer promotion might drive trade response that also boosts sales\n- Reference price effects: repeated promotions lower the consumer\'s reference price, making full-price purchases less likely over time\n\nThe StreamABCDE case demonstrates this with real data across multiple months with varying promotion levels. The regression separates consumer vs trade promo effects on sales.',
        mentalModel: 'Mental model: Baseline is your "control group" created via time series regression. You\'re asking: "In a parallel universe where I did no promotion this month, what would my sales have been?" The promotion\'s value is exactly the gap between actual and that counterfactual. Without regression, you have no counterfactual.',
        workedExample: 'Promotion evaluation example:\nMonths without promotion: Average sales = $800K\nMonths with consumer promo ($50K spend): Average sales = $1,100K\nSimple calculation (WRONG): Incremental = $1,100K − $800K = $300K. ROI = ($300K − $50K)/$50K = 500%.\n\nBut: regression shows that $100K of the $300K lift is attributable to a seasonal trend (December). True baseline = $900K (not $800K, because December is always up).\nTrue incremental = $1,100K − $900K = $200K\nTrue ROI = ($200K − $50K)/$50K = 300%\n\nStill good, but 40% less than the naive calculation. Without the regression, you\'d overstate ROI and overspend on promotions.',
        takeaways: [
          'Baseline = predicted sales without promotion (from regression), NOT historical average',
          'Regression model: Sales = f(consumer promo spend, trade promo spend, seasonality controls)',
          'Incremental Sales = Actual − Baseline',
          'ROI = (Incremental Revenue − Promotion Cost) / Promotion Cost',
          'Must control for seasonality — otherwise you attribute holiday demand to the promotion',
          'Stockpiling: consumers buy forward during promotions, reducing future sales',
          'Repeated promotions lower reference prices, making full-price future sales harder',
          'On exam: "define baseline sales and why it matters" is a common short-answer question',
        ],
      },
      {
        id: 'ai-personalization',
        title: 'AI & Personalization in Marketing',
        why: 'AI tools map directly to CLV levers. The exam tests whether you know which lever each AI capability targets.',
        explanation: 'AI and machine learning transform marketing by enabling scale personalization. But the strategic value of each AI capability is best understood through the CLV lens — which lever does it activate?\n\nRecommendation Systems (Amazon, Netflix, Spotify): Collaborative filtering and content-based methods identify what customers are likely to value next. This is an EXPANSION lever — it increases share of wallet from existing customers by identifying cross-sell and upsell opportunities. Amazon\'s recommendation engine drives ~35% of revenue.\n\nChurn Prediction Models: Use behavioral signals (decreasing purchase frequency, customer support contacts, competitive activity) to identify customers at risk before they leave. This is a RETENTION lever — enables proactive intervention before churn occurs.\n\nLookalike Modeling (acquisition): Analyze your best current customers to identify prospects with similar profiles. This is an ACQUISITION lever — reduces AC by targeting high-quality prospects more efficiently.\n\nPredictive Pricing: Dynamic pricing that adjusts in real time based on demand, competition, and customer attributes. Intersects with both margin improvement (expansion) and pricing strategy considerations.\n\nPersonalization at Scale: Allows one-to-one marketing to millions simultaneously. Enables moving customers from Free Rider / Vulnerable to Star quadrant by tailoring offers and experiences.',
        mentalModel: 'Mental model: Each AI tool is a machine learning CLV optimizer. Recommendations = expansion engine. Churn prediction = retention shield. Lookalike modeling = acquisition sieve. When asked about AI in marketing, always anchor your answer to which CLV lever it targets and how.',
        workedExample: 'Netflix recommendation system:\nExpansion lever: Netflix users who engage with recommendations watch 40% more content than non-recommendation users. More content watched = lower churn = better retention AND higher expansion (more time on platform = higher LTV).\nRecommendation system prevents the "I don\'t know what to watch" abandonment moment that causes churn.\nWhen a user finishes a series and gets an immediate "you\'d also like..." that\'s AI working simultaneously as a retention lever AND expansion lever — increasing watch time (expansion of margin) while preventing cancelation (retention).',
        takeaways: [
          'Recommendation systems = Expansion lever (share of wallet / cross-sell / up-sell)',
          'Churn prediction = Retention lever (proactive intervention before churn)',
          'Lookalike modeling = Acquisition lever (find customers like your Stars)',
          'Always map AI tools to CLV levers on the exam — this is how the course frames it',
          'Amazon recommendations = 35% of revenue = massive expansion lever',
          'Privacy and consent are constraints — sustainable AI requires ethical data practices',
          'Test AI like any marketing investment: measure ROI across the CLV lever it targets',
        ],
      },
    ],
  },
};

function ExpandableTopicCard({ topic, search }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const matchesSearch =
    !search ||
    topic.title.toLowerCase().includes(search.toLowerCase()) ||
    topic.why.toLowerCase().includes(search.toLowerCase()) ||
    topic.explanation.toLowerCase().includes(search.toLowerCase()) ||
    (topic.mentalModel && topic.mentalModel.toLowerCase().includes(search.toLowerCase())) ||
    (topic.workedExample && topic.workedExample.toLowerCase().includes(search.toLowerCase())) ||
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
          <div className="border-t border-gray-800 pt-4 space-y-5">
            <div>
              <p className="text-xs font-semibold text-amber-400 mb-2">EXPLANATION</p>
              <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{topic.explanation}</div>
            </div>

            {topic.mentalModel && (
              <div className="bg-blue-950/40 border border-blue-800 rounded-lg p-4">
                <p className="text-xs font-semibold text-blue-400 mb-2">MENTAL MODEL</p>
                <p className="text-sm text-blue-100 leading-relaxed">{topic.mentalModel}</p>
              </div>
            )}

            {topic.workedExample && (
              <div className="bg-green-950/40 border border-green-800 rounded-lg p-4">
                <p className="text-xs font-semibold text-green-400 mb-2">WORKED EXAMPLE</p>
                <p className="text-sm text-green-100 leading-relaxed font-mono whitespace-pre-line">{topic.workedExample}</p>
              </div>
            )}

            {topic.chartIds && topic.chartIds.length > 0 && (
              <div className="space-y-4">
                <p className="text-xs font-semibold text-purple-400">VISUAL</p>
                {topic.chartIds.map(id => {
                  const ChartComponent = CHART_MAP[id];
                  return ChartComponent ? <ChartComponent key={id} /> : null;
                })}
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-emerald-400 mb-2">KEY TAKEAWAYS</p>
              <ul className="space-y-2">
                {topic.takeaways.map((takeaway, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex gap-2">
                    <span className="text-emerald-500 flex-shrink-0 mt-0.5">•</span>
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
        <p className="text-gray-400 text-sm">Each topic has full explanation, mental model, and worked example — click to expand</p>
      </div>

      <div className="space-y-4">
        {block.topics.map(topic => (
          <ExpandableTopicCard key={topic.id} topic={topic} search={search} />
        ))}
      </div>
    </div>
  );
}
