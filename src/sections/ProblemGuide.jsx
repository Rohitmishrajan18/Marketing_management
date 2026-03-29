import Card from '../components/Card';

const problems = [
  {
    id: 'clv-calculation',
    type: 'CLV Calculation',
    steps: [
      'Identify: margin (m), retention rate (r), discount rate (i), time horizon (N), acquisition cost (AC)',
      'For each year t: Expected Profit = m × r^(t-1)',
      'Discount: PV = Expected Profit / (1+i)^t',
      'Sum all PV values',
      'Subtract AC for Relative CLV',
    ],
    example: {
      title: 'Get Fit Gyms Example',
      setup: 'Revenue $600/yr, Variable Cost $360/yr → margin = $240; Retention = 80%; Discount rate = 9%; AC = $150; N = 5',
      solution: [
        'Year 1: 240/1.09 = $220.18',
        'Year 2: 240 × 0.8 / 1.09² = $161.60',
        'Year 3: 240 × 0.64 / 1.09³ = $118.60',
        'Year 4: 240 × 0.512 / 1.09⁴ = $87.05',
        'Year 5: 240 × 0.4096 / 1.09⁵ = $63.89',
        'Absolute CLV = $651.33',
        'Relative CLV = $651.33 - $150 = $501.33',
      ],
    },
    pitfalls: [
      'Don\'t forget retention is cumulative (r^(t-1) not just r)',
      'Quarterly fees multiply by 4 for annual',
      'Margin = revenue minus variable cost, not revenue alone',
    ],
  },
  {
    id: 'conjoint-analysis',
    type: 'Conjoint Analysis',
    steps: [
      'Look up part-worth utility for each attribute level of each product',
      'Sum all utilities = Total Product Utility',
      'Compare totals to determine preference',
      'For importance: Range (max-min) per attribute',
      'Relative importance = range / sum of all ranges',
    ],
    example: {
      title: 'Laptop Preference Example',
      setup: 'Acer 3.5GHz AMD $1000 vs Dell 2.5GHz Intel $1600',
      solution: [
        'Acer utilities: 4.0 + 6.0 + 4.3 + 6.3 = 20.6',
        'Dell utilities: 5.3 + 5.0 + 6.3 + 3.3 = 19.9',
        'Consumer prefers Acer (20.6 > 19.9)',
      ],
    },
    example2: {
      title: 'Price Parity Example (Air Fryers)',
      setup: 'De\'Longhi reference: 450+400+400+700+200 = 2150 utils; Philips without price: 250+350+400+300 = 1300 utils',
      solution: [
        'Need price utils = 2150 - 1300 = 850',
        'Between $89 (1100 utils) and $119 (800 utils): $30 = 300 utils, so $1 = 10 utils',
        '850 utils = 800 + 50 utils = $119 - $5 = $114',
      ],
    },
    pitfalls: [
      'Always add ALL attribute utilities',
      'Don\'t compare single attributes in isolation',
      'For interpolation, check direction (higher price = lower utility)',
    ],
  },
  {
    id: 'product-line-pricing',
    type: 'Product Line Pricing',
    steps: [
      'Evaluate single product: for each price, calculate profit and find max',
      'Evaluate product line: set low product price = low-type WTP; use IC constraint to find max high product price',
      'IC constraint: WTP_high(high) - P_high ≥ WTP_high(low) - P_low',
      'Compare profits; check for cannibalization',
    ],
    example: {
      title: 'Dell Example',
      setup: 'Personal segment: WTP $1600 for high, $500 for low; Business segment: WTP $2000 for high, $1600 for low',
      solution: [
        'Single product: High at $2000 = 40×$2000 = $80K; High at $1500 = 100×$1500 = $150K ✓',
        'Product line: Low at $500 to personal; IC: 2000 - P = 1600 - 500, P = $900',
        'Profit = 60×$500 + 40×$900 = $66K',
        'Single product wins ($150K > $66K) due to high cannibalization',
      ],
    },
    pitfalls: [
      'Always check IC both ways',
      'Verify cannibalization doesn\'t occur (low-type doesn\'t switch to high)',
      'Segment WTP must be identified correctly',
    ],
  },
  {
    id: 'evc-pricing',
    type: 'EVC Pricing',
    steps: [
      'Identify reference product and its price (= Reference Value)',
      'List all attribute differences, quantify +/- value of each',
      'EVC = Reference Price + Sum of Differentiation Values',
      'Price between cost floor and EVC ceiling',
    ],
    pitfalls: [
      'EVC is the ceiling, not the recommended price',
      'Differentiation value can be negative if your product is inferior',
      'Actual price depends on competitive dynamics',
    ],
  },
  {
    id: 'promotion-evaluation',
    type: 'Promotion Evaluation',
    steps: [
      'Estimate baseline sales using regression on historical non-promotion data',
      'Predict what sales would have been WITHOUT the promotion',
      'Incremental sales = Actual - Baseline',
      'Incremental revenue = Incremental sales × price',
      'ROI = (Incremental revenue - Promotion cost) / Promotion cost',
    ],
    pitfalls: [
      'Don\'t use actual promoted sales as "incremental"',
      'Must control for seasonality and other factors in baseline',
      'Include both consumer and trade promotion spending',
      'Account for long-term reference price shifts',
    ],
  },
];

export default function ProblemGuide({ search }) {
  const filtered = problems.filter(p =>
    p.type.toLowerCase().includes(search.toLowerCase()) ||
    p.steps.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
    p.pitfalls.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      {filtered.map(problem => (
        <Card key={problem.id}>
          <h3 className="text-base font-semibold text-white mb-3">{problem.type}</h3>

          <div className="mb-4">
            <p className="text-xs text-blue-400 font-semibold mb-2">STEPS</p>
            <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
              {problem.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {problem.example && (
            <div className="mb-4 bg-gray-800 rounded-lg p-3">
              <p className="text-xs text-amber-400 font-semibold mb-2">WORKED EXAMPLE: {problem.example.title}</p>
              <p className="text-xs text-gray-300 mb-2 italic">{problem.example.setup}</p>
              <ul className="text-xs text-gray-200 space-y-1">
                {problem.example.solution.map((line, i) => (
                  <li key={i}>• {line}</li>
                ))}
              </ul>
            </div>
          )}

          {problem.example2 && (
            <div className="mb-4 bg-gray-800 rounded-lg p-3">
              <p className="text-xs text-amber-400 font-semibold mb-2">EXAMPLE 2: {problem.example2.title}</p>
              <p className="text-xs text-gray-300 mb-2 italic">{problem.example2.setup}</p>
              <ul className="text-xs text-gray-200 space-y-1">
                {problem.example2.solution.map((line, i) => (
                  <li key={i}>• {line}</li>
                ))}
              </ul>
            </div>
          )}

          {problem.pitfalls && (
            <div className="border-t border-gray-800 pt-3">
              <p className="text-xs text-red-400 font-semibold mb-2">PITFALLS</p>
              <ul className="text-xs text-gray-400 space-y-1">
                {problem.pitfalls.map((pitfall, i) => (
                  <li key={i}>• {pitfall}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
