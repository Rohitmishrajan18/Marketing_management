import Card from '../components/Card';

const traps = [
  {
    id: 'clv-revenue',
    wrong: 'CLV = total revenue from customer',
    why: 'CLV is the NPV of future PROFITS, not revenue. Revenue minus variable costs (margin) is what matters.',
    correct: 'CLV is NPV of all future profit margins minus acquisition cost',
  },
  {
    id: 'retention-spend',
    wrong: 'Higher retention always means spend more on retention',
    why: 'Depends on marginal cost. While 1% retention improvement = 4.9% firm value, if it costs more than 1% margin improvement, it\'s a worse investment.',
    correct: 'Invest in retention if ROI exceeds other channels, not just because retention is high-impact',
  },
  {
    id: 'all-customers-equal',
    wrong: 'All customers are equally profitable',
    why: 'Kanthal example: top 5% of customers generate majority of profit; many customers are unprofitable.',
    correct: 'Segment by profitability; treat customer tiers differently',
  },
  {
    id: 'conjoint-importance',
    wrong: 'Conjoint importance = highest part-worth utility',
    why: 'Importance is the RANGE (MAX - MIN) within an attribute, not the absolute value.',
    correct: 'Attribute importance = Max utility - Min utility (for that attribute)',
  },
  {
    id: 'utility-preference',
    wrong: 'Higher part-worth utility = consumer prefers that level (WRONG application)',
    why: 'True within an attribute, but must always sum TOTAL product utility across all attributes to compare products.',
    correct: 'Compare total product utilities; highest utility level within one attribute doesn\'t guarantee product preference',
  },
  {
    id: 'product-line-always-wins',
    wrong: 'Product line always beats single product',
    why: 'High cannibalization can make single product more profitable. Dell example: single product at $1500 = $150K vs product line = $66K.',
    correct: 'Evaluate both and choose based on profit, not on market coverage',
  },
  {
    id: 'evc-price',
    wrong: 'EVC = what you should charge',
    why: 'EVC is the CEILING for price. Actual price depends on competition and how much value you want to capture vs create.',
    correct: 'Price ranges from cost floor to EVC ceiling',
  },
  {
    id: 'price-discrimination-profit',
    wrong: 'Price discrimination always increases profit',
    why: 'Fairness concerns can destroy value. Coke vending machine: temperature-based pricing violated fairness norms.',
    correct: 'Price discrimination only works if it aligns with consumer fairness perceptions',
  },
  {
    id: 'shrinkflation',
    wrong: 'Shrinkflation avoids consumer backlash',
    why: 'Consumers notice; it damages trust. Shrinkflation is limited by product functionality.',
    correct: 'Shrinkflation is a stop-gap; transparent pricing is more sustainable',
  },
  {
    id: 'fear-appeals',
    wrong: 'More fear = more effective advertising',
    why: 'Inverted-U relationship: moderate fear is most effective; too much fear causes denial/avoidance.',
    correct: 'Calibrate fear appeals to moderate level; avoid extreme fear',
  },
  {
    id: 'comparative-ads',
    wrong: 'Comparative advertising always helps',
    why: 'Works for challenger brands on verifiable attributes; can backfire for market leaders and damage credibility.',
    correct: 'Comparative ads best for challengers; risky for market leaders',
  },
  {
    id: 'promotions-profit',
    wrong: 'Promotions always increase profit',
    why: 'Much of "promoted" sales may have happened anyway (baseline effect). Also train customers to wait for deals.',
    correct: 'Measure incremental sales, not promoted sales; account for reference price shifts',
  },
  {
    id: 'freemium-features',
    wrong: 'Freemium: give away lots of features to maximize users',
    why: 'Rich free tier = few upgrades. Key tradeoff: traffic generation vs upgrade conversion.',
    correct: 'Calibrate free tier based on whether goal is users (rich) or revenue (limited)',
  },
  {
    id: 'horizontal-positioning',
    wrong: 'Horizontal positioning = low quality',
    why: 'Horizontal = taste/style difference at similar quality. Vertical = quality/performance difference.',
    correct: 'Horizontal and vertical are different positioning dimensions, not quality indicators',
  },
  {
    id: 'high-type-targeting',
    wrong: 'In product line, high-type always buys high product',
    why: 'If price is wrong, perverse targeting occurs. Business users might prefer cheaper low-quality product.',
    correct: 'Verify IC constraint; test whether actual targeting matches intent',
  },
  {
    id: 'acquisition-important',
    wrong: 'Customer acquisition is most important CLV lever',
    why: 'Retention has 49x more impact: 1% retention = 4.9% firm value vs 1% AC = 0.1%.',
    correct: 'Prioritize retention and expansion over acquisition',
  },
  {
    id: 'recommendations-retention',
    wrong: 'Recommendation systems = customer retention',
    why: 'Recommendations increase share of wallet from existing customers = customer EXPANSION, not retention.',
    correct: 'Recommendations are an expansion tool, not a retention tool',
  },
  {
    id: 'behavioral-segmentation',
    wrong: 'Lifestyle and marital status are both behavioral segmentation',
    why: 'Lifestyle = psychographic; marital status = demographic; behavioral = usage intensity, frequency.',
    correct: 'Know the segmentation variable types: demographic, geographic, psychographic, behavioral',
  },
  {
    id: 'baseline-promotion',
    wrong: 'Baseline sales in promotions = average historical sales',
    why: 'Baseline is PREDICTED sales absent the promotion, estimated via regression controlling for seasonality.',
    correct: 'Use regression with non-promotion periods to estimate baseline',
  },
  {
    id: 'bundling-volume',
    wrong: 'Bundling is just about selling more products',
    why: 'Bundling reduces churn by up to 50% (Cox Communications data) = retention strategy, not volume strategy.',
    correct: 'Bundling is a powerful retention lever, not just cross-selling',
  },
];

export default function ExamTraps({ search }) {
  const filtered = traps.filter(t =>
    t.wrong.toLowerCase().includes(search.toLowerCase()) ||
    t.why.toLowerCase().includes(search.toLowerCase()) ||
    t.correct.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filtered.map(trap => (
        <Card key={trap.id}>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-red-400 font-semibold mb-1">WRONG INTUITION</p>
              <p className="text-sm text-gray-100">{trap.wrong}</p>
            </div>

            <div className="border-t border-gray-800 pt-3">
              <p className="text-xs text-amber-400 font-semibold mb-1">WHY IT'S WRONG</p>
              <p className="text-sm text-gray-300">{trap.why}</p>
            </div>

            <div className="border-t border-gray-800 pt-3">
              <p className="text-xs text-green-400 font-semibold mb-1">CORRECT ANSWER</p>
              <p className="text-sm text-gray-100">{trap.correct}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
