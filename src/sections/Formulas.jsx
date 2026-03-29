import Card from '../components/Card';

const formulas = [
  {
    id: 'clv-general',
    title: 'CLV - General Formula',
    category: 'Customer Lifetime Value',
    content: (
      <div>
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm mb-3 text-gray-100">
          CLV = ∑(t=1 to N) [m<sub>t</sub> × r<sup>t-1</sup>] / (1+i)<sup>t</sup> - AC
        </div>
        <div className="text-sm text-gray-300">
          <p className="mb-2"><span className="text-blue-400">m<sub>t</sub></span> = profit margin in year t</p>
          <p className="mb-2"><span className="text-blue-400">r</span> = retention rate</p>
          <p className="mb-2"><span className="text-blue-400">i</span> = discount rate</p>
          <p className="mb-2"><span className="text-blue-400">AC</span> = acquisition cost</p>
          <p className="mb-2"><span className="text-blue-400">N</span> = years</p>
        </div>
      </div>
    ),
  },
  {
    id: 'clv-simple',
    title: 'CLV - Simple Formula (Constant Margins)',
    category: 'Customer Lifetime Value',
    content: (
      <div>
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm mb-3 text-gray-100">
          CLV = m × [r / (1+i-r)]
        </div>
        <div className="text-sm text-gray-300">
          <p className="mb-2">Infinite horizon, attrition at end of period</p>
          <p className="text-amber-400">Margin Multiple = r / (1+i-r)</p>
        </div>
      </div>
    ),
  },
  {
    id: 'clv-relative-absolute',
    title: 'CLV - Relative vs Absolute',
    category: 'Customer Lifetime Value',
    content: (
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="text-blue-400 font-semibold mb-1">Absolute CLV</p>
          <p className="bg-gray-800 rounded p-2 font-mono">= m × Margin Multiple</p>
        </div>
        <div>
          <p className="text-blue-400 font-semibold mb-1">Relative CLV</p>
          <p className="bg-gray-800 rounded p-2 font-mono">= Absolute CLV - AC</p>
        </div>
      </div>
    ),
  },
  {
    id: 'clv-insight',
    title: 'CLV - Key Insight on Value Levers',
    category: 'Customer Lifetime Value',
    content: (
      <div className="text-sm text-gray-300 space-y-2">
        <p><span className="text-amber-400 font-semibold">1% improvement in retention</span> = <span className="text-green-400">4.9% improvement in firm value</span></p>
        <p><span className="text-amber-400 font-semibold">1% improvement in margin</span> = <span className="text-green-400">1.1% improvement in firm value</span></p>
        <p><span className="text-amber-400 font-semibold">1% improvement in AC</span> = <span className="text-green-400">0.1% improvement in firm value</span></p>
        <p className="pt-2 italic text-gray-400">Retention is the highest-impact lever for marketing investment</p>
      </div>
    ),
  },
  {
    id: 'conjoint-utility',
    title: 'Conjoint Analysis - Product Utility',
    category: 'Conjoint Analysis',
    content: (
      <div>
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm mb-3 text-gray-100">
          Total Product Utility = ∑ Part-worth utilities for each attribute level
        </div>
        <p className="text-sm text-gray-300">Sum utilities of all selected attribute levels to compare products</p>
      </div>
    ),
  },
  {
    id: 'conjoint-importance',
    title: 'Conjoint Analysis - Attribute Importance',
    category: 'Conjoint Analysis',
    content: (
      <div className="space-y-3">
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
          Importance = Max utility - Min utility (for that attribute)
        </div>
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100">
          Relative Importance = Attribute Importance / ∑ All Importances
        </div>
        <p className="text-sm text-gray-300 italic">Importance measures the range of utilities, not the absolute level</p>
      </div>
    ),
  },
  {
    id: 'conjoint-parity',
    title: 'Conjoint Analysis - Price Parity',
    category: 'Conjoint Analysis',
    content: (
      <div>
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm mb-3 text-gray-100">
          At price parity: Utility of Product A = Utility of Product B
        </div>
        <p className="text-sm text-gray-300">Set unknown price utility and solve algebraically, then interpolate</p>
      </div>
    ),
  },
  {
    id: 'conjoint-utils-per-dollar',
    title: 'Conjoint Analysis - Utils-per-Dollar',
    category: 'Conjoint Analysis',
    content: (
      <div>
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm mb-3 text-gray-100">
          Utils-per-dollar = (Utility change) / (Price change)
        </div>
        <p className="text-sm text-gray-300">Calculate from two known price points, then apply to price utility curve</p>
      </div>
    ),
  },
  {
    id: 'evc-pricing',
    title: 'EVC Framework - Pricing',
    category: 'Pricing',
    content: (
      <div className="space-y-3">
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100 mb-2">
          EVC = Reference Value + Differentiation Value
        </div>
        <div className="text-sm text-gray-300 space-y-2">
          <p><span className="text-blue-400">Reference Value</span> = price of closest competing substitute</p>
          <p><span className="text-blue-400">Differentiation Value</span> = value of attribute differences vs substitute (+/-)</p>
          <p className="pt-2"><span className="text-amber-400">Price Floor</span> = Cost</p>
          <p><span className="text-amber-400">Price Ceiling</span> = EVC</p>
        </div>
      </div>
    ),
  },
  {
    id: 'product-line-profit',
    title: 'Product Line - Single Product Profit',
    category: 'Product Line Pricing',
    content: (
      <div>
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm mb-3 text-gray-100">
          Profit = Price × Segment Size (for each candidate price, select maximum)
        </div>
        <p className="text-sm text-gray-300">Evaluate each possible price point; choose the one maximizing total profit</p>
      </div>
    ),
  },
  {
    id: 'product-line-ic',
    title: 'Product Line - Incentive Compatibility',
    category: 'Product Line Pricing',
    content: (
      <div className="space-y-3">
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-100 mb-2">
          WTP<sub>high</sub>(high) - P<sub>high</sub> ≥ WTP<sub>high</sub>(low) - P<sub>low</sub>
        </div>
        <p className="text-sm text-gray-300">High-value customers must prefer the high product. Solve for max P<sub>high</sub>.</p>
        <p className="text-sm text-amber-400 font-semibold">Cannibalization Cost = WTP<sub>high</sub> - P<sub>high</sub></p>
      </div>
    ),
  },
  {
    id: 'promotion-incremental',
    title: 'Promotion - Incremental Sales',
    category: 'Promotion Evaluation',
    content: (
      <div>
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm mb-3 text-gray-100">
          Incremental Sales = Actual Sales - Baseline Sales
        </div>
        <p className="text-sm text-gray-300 mb-2">Baseline = predicted sales WITHOUT promotion (from regression)</p>
        <p className="text-sm text-amber-400">Key: Use regression on non-promotion periods to avoid bias</p>
      </div>
    ),
  },
  {
    id: 'promotion-roi',
    title: 'Promotion - ROI',
    category: 'Promotion Evaluation',
    content: (
      <div>
        <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm mb-3 text-gray-100">
          Promotion ROI = (Incremental Revenue - Promotion Cost) / Promotion Cost
        </div>
        <p className="text-sm text-gray-300">Factor in both consumer promo and trade promo spending</p>
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
