import Card from '../components/Card';

const definitions = [
  {
    id: 'clv-abs-rel',
    term1: 'Absolute CLV',
    def1: 'NPV of future profits from a customer, without subtracting acquisition cost',
    term2: 'Relative CLV',
    def2: 'Absolute CLV minus acquisition cost; true profitability accounting for customer acquisition',
  },
  {
    id: 'clv-levers',
    term1: 'Customer Acquisition',
    def1: 'Gaining new customers, measured by acquisition cost (AC); 1% AC reduction = 0.1% firm value impact',
    term2: 'Customer Retention',
    def2: 'Keeping existing customers, measured by retention rate (r); 1% retention improvement = 4.9% firm value impact',
  },
  {
    id: 'customer-expansion',
    term1: 'Customer Expansion',
    def1: 'Increasing revenue from existing customers via cross-selling, up-selling, bundling, recommendations; 1% margin increase = 1.1% firm value impact',
    term2: 'Share of Wallet',
    def2: 'Percentage of customer\'s total spending in category that your firm captures; expansion increases this',
  },
  {
    id: 'customer-types',
    term1: 'Star Customers',
    def1: 'High customer experience (value created) AND high profitability (value captured); invest for growth',
    term2: 'Free Riders',
    def2: 'High customer experience (value created) but low profitability (value captured); need monetization strategy',
  },
  {
    id: 'customer-types-2',
    term1: 'Vulnerable Customers',
    def1: 'High profitability (value captured) but low experience (value created); risk of churn, focus on retention',
    term2: 'Lost Causes',
    def2: 'Low on both dimensions; unlikely to be profitable, consider divesting or discontinuing service',
  },
  {
    id: 'positioning-types',
    term1: 'Vertical Positioning',
    def1: 'Quality/performance attributes where everyone prefers more; consumers differ in willingness-to-pay',
    term2: 'Horizontal Positioning',
    def2: 'Taste/style attributes where preferences vary by consumer; not about quality superiority',
  },
  {
    id: 'promotion-types',
    term1: 'Consumer Promotion',
    def1: 'Directed at end consumers to drive demand (coupons, rebates, samples, contests); "pull" strategy',
    term2: 'Trade Promotion',
    def2: 'Directed at channel partners to incentivize stocking/merchandising (discounts, allowances); "push" strategy',
  },
  {
    id: 'strategy-types',
    term1: 'Pull Strategy',
    def1: 'Create consumer demand through advertising and consumer promotions, pulling products through channel',
    term2: 'Push Strategy',
    def2: 'Incentivize channel partners through trade promotions and personal selling to push products to consumers',
  },
  {
    id: 'advertising-types',
    term1: 'Emotional Advertising',
    def1: 'Appeals to psychological, social, or identity needs; persuasive; increases involvement in low-differentiation categories',
    term2: 'Rational Advertising',
    def2: 'Provides functional or utilitarian information; informative; works for high-differentiation or complex products',
  },
  {
    id: 'evc-components',
    term1: 'Reference Value',
    def1: 'Price of the best competing substitute product; baseline for value assessment',
    term2: 'Differentiation Value',
    def2: 'Incremental value of your attribute advantages (+) or disadvantages (-) compared to substitute',
  },
  {
    id: 'evc-pricing',
    term1: 'EVC (Economic Value to Customer)',
    def1: 'Maximum price a fully-informed customer would pay = Reference Value + Differentiation Value; the price ceiling',
    term2: 'Actual Price',
    def2: 'What you actually charge, determined by cost floor and competitive dynamics; between floor and EVC ceiling',
  },
  {
    id: 'segmentation-types',
    term1: 'Behavioral Segmentation',
    def1: 'Usage intensity, consumption frequency, loyalty, purchase patterns; how customers interact with product',
    term2: 'Psychographic Segmentation',
    def2: 'Lifestyle, attitudes, values, personality; psychological characteristics and preferences',
  },
  {
    id: 'segmentation-types-2',
    term1: 'Demographic Segmentation',
    def1: 'Age, income, marital status, education, gender; measurable population characteristics',
    term2: 'Geographic Segmentation',
    def2: 'Region, city size, climate, population density; location-based characteristics',
  },
  {
    id: 'product-launch-types',
    term1: 'Offensive Product Launch',
    def1: 'Capture new market segments and grow category size; expand total addressable market',
    term2: 'Defensive Product Launch',
    def2: 'Protect existing market share from competitive entry; block competitor from gaining foothold',
  },
  {
    id: 'promotion-sales',
    term1: 'Baseline Sales',
    def1: 'Sales that would have occurred WITHOUT the promotion, estimated via regression using non-promotion periods',
    term2: 'Incremental Sales',
    def2: 'Additional sales attributable TO the promotion = Actual Sales - Baseline Sales',
  },
  {
    id: 'business-model-types',
    term1: 'Freemium',
    def1: 'Free version with limited features to drive user acquisition; monetize through premium upgrades',
    term2: 'Premium',
    def2: 'Paid product with no free tier; monetize through direct payment; typically lower user volume',
  },
  {
    id: 'pricing-tactics',
    term1: 'Shrinkflation',
    def1: 'Reduce quantity/size while maintaining price to offset cost increases; perception risk',
    term2: 'Price Increase',
    def2: 'Raise price while maintaining quantity; more transparent but direct WTP test',
  },
  {
    id: 'credit-card-segments',
    term1: 'Transactors',
    def1: 'Pay full credit card balance each month; issuer revenue from interchange fees (per transaction)',
    term2: 'Revolvers',
    def2: 'Carry balance on credit card; issuer revenue from interest charges (APR on outstanding balance)',
  },
  {
    id: 'advertising-special',
    term1: 'Fear Appeals',
    def1: 'Motivate action through anxiety about negative consequences; inverted-U effectiveness (too much causes avoidance)',
    term2: 'Humor in Advertising',
    def2: 'Cuts through clutter and aids memorability; risk is overshadowing product benefits or cheapening brand',
  },
  {
    id: 'market-effects',
    term1: 'Cannibalization',
    def1: 'New product steals sales from existing product lines; occurs when price/positioning too similar',
    term2: 'Market Expansion',
    def2: 'New product attracts new customers to category; grows total market rather than stealing share',
  },
];

export default function Definitions({ search }) {
  const filtered = definitions.filter(d =>
    d.term1.toLowerCase().includes(search.toLowerCase()) ||
    d.def1.toLowerCase().includes(search.toLowerCase()) ||
    d.term2.toLowerCase().includes(search.toLowerCase()) ||
    d.def2.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      {filtered.map(def => (
        <Card key={def.id}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-2">{def.term1}</h4>
              <p className="text-sm text-gray-300">{def.def1}</p>
            </div>
            <div className="md:border-l md:border-gray-800 md:pl-4">
              <h4 className="text-sm font-semibold text-amber-400 mb-2">{def.term2}</h4>
              <p className="text-sm text-gray-300">{def.def2}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
