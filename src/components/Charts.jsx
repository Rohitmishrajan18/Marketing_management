// Pure SVG/React chart components — no external deps, dark-theme native

// ─── Two Sides of Value 2×2 ───────────────────────────────────────────────
export function TwoSidesMatrix() {
  return (
    <svg viewBox="0 0 400 340" className="w-full max-w-md mx-auto" aria-label="Two Sides of Value Matrix">
      {/* Axes */}
      <line x1="60" y1="280" x2="380" y2="280" stroke="#6b7280" strokeWidth="2" />
      <line x1="60" y1="20" x2="60" y2="280" stroke="#6b7280" strokeWidth="2" />
      {/* Axis arrows */}
      <polygon points="380,275 388,280 380,285" fill="#6b7280" />
      <polygon points="55,20 60,12 65,20" fill="#6b7280" />
      {/* Axis labels */}
      <text x="220" y="318" textAnchor="middle" fill="#9ca3af" fontSize="11">Customer Experience (Creating Value) →</text>
      <text x="18" y="155" textAnchor="middle" fill="#9ca3af" fontSize="11" transform="rotate(-90 18 155)">Customer Profitability (Capturing Value) →</text>
      {/* Midlines */}
      <line x1="220" y1="20" x2="220" y2="280" stroke="#374151" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="60" y1="150" x2="380" y2="150" stroke="#374151" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Quadrants */}
      {/* Bottom-left: Lost Causes */}
      <rect x="61" y="151" width="158" height="128" fill="#1f2937" rx="4" />
      <text x="140" y="195" textAnchor="middle" fill="#6b7280" fontSize="18">😵</text>
      <text x="140" y="216" textAnchor="middle" fill="#9ca3af" fontSize="13" fontWeight="bold">Lost Causes</text>
      <text x="140" y="233" textAnchor="middle" fill="#6b7280" fontSize="9">Low exp / Low profit</text>
      <text x="140" y="248" textAnchor="middle" fill="#6b7280" fontSize="9">→ Minimize investment</text>
      <text x="140" y="263" textAnchor="middle" fill="#6b7280" fontSize="9">or exit relationship</text>
      {/* Bottom-right: Free Riders */}
      <rect x="221" y="151" width="158" height="128" fill="#1c2e1c" rx="4" />
      <text x="300" y="195" textAnchor="middle" fill="#f59e0b" fontSize="18">🆓</text>
      <text x="300" y="216" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">Free Riders</text>
      <text x="300" y="233" textAnchor="middle" fill="#92400e" fontSize="9">High exp / Low profit</text>
      <text x="300" y="248" textAnchor="middle" fill="#92400e" fontSize="9">→ Find monetization</text>
      <text x="300" y="263" textAnchor="middle" fill="#92400e" fontSize="9">or reduce service cost</text>
      {/* Top-left: Vulnerable */}
      <rect x="61" y="21" width="158" height="128" fill="#1e1a0e" rx="4" />
      <text x="140" y="65" textAnchor="middle" fill="#f59e0b" fontSize="18">⚠️</text>
      <text x="140" y="86" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Vulnerable</text>
      <text x="140" y="103" textAnchor="middle" fill="#92400e" fontSize="9">Low exp / High profit</text>
      <text x="140" y="118" textAnchor="middle" fill="#92400e" fontSize="9">→ Fix experience fast</text>
      <text x="140" y="133" textAnchor="middle" fill="#92400e" fontSize="9">they will churn soon</text>
      {/* Top-right: Stars */}
      <rect x="221" y="21" width="158" height="128" fill="#052e16" rx="4" />
      <text x="300" y="65" textAnchor="middle" fill="#4ade80" fontSize="18">⭐</text>
      <text x="300" y="86" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold">Stars</text>
      <text x="300" y="103" textAnchor="middle" fill="#16a34a" fontSize="9">High exp / High profit</text>
      <text x="300" y="118" textAnchor="middle" fill="#16a34a" fontSize="9">→ Invest in growth</text>
      <text x="300" y="133" textAnchor="middle" fill="#16a34a" fontSize="9">cross-sell, deepen</text>
      {/* Low/High labels */}
      <text x="70" y="295" fill="#6b7280" fontSize="9">Low</text>
      <text x="365" y="295" fill="#6b7280" fontSize="9">High</text>
      <text x="42" y="283" fill="#6b7280" fontSize="9">Low</text>
      <text x="42" y="28" fill="#6b7280" fontSize="9">High</text>
    </svg>
  );
}

// ─── CLV Lever Sensitivity Bars ──────────────────────────────────────────────
export function CLVLevers() {
  const data = [
    { label: '1% Retention ↑', value: 4.9, color: '#4ade80', note: '49× more than AC' },
    { label: '1% Margin ↑', value: 1.1, color: '#60a5fa', note: '' },
    { label: '1% Acquisition Cost ↓', value: 0.1, color: '#f87171', note: 'Least impactful' },
  ];
  const max = 5.5;
  const barW = 260;

  return (
    <svg viewBox="0 0 400 170" className="w-full max-w-lg mx-auto" aria-label="CLV Lever Sensitivity">
      <text x="200" y="16" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="bold">Impact on Firm Value (per 1% improvement)</text>
      {data.map((d, i) => {
        const y = 35 + i * 42;
        const w = (d.value / max) * barW;
        return (
          <g key={i}>
            <text x="8" y={y + 12} fill="#d1d5db" fontSize="9.5">{d.label}</text>
            <rect x="8" y={y + 18} width={w} height="16" rx="3" fill={d.color} opacity="0.9" />
            <text x={w + 14} y={y + 30} fill={d.color} fontSize="11" fontWeight="bold">{d.value}%</text>
            {d.note && <text x={w + 44} y={y + 30} fill="#9ca3af" fontSize="9">← {d.note}</text>}
          </g>
        );
      })}
      <line x1="8" y1="155" x2="280" y2="155" stroke="#374151" strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5].map(v => (
        <g key={v}>
          <line x1={8 + (v / max) * barW} y1="152" x2={8 + (v / max) * barW} y2="158" stroke="#6b7280" strokeWidth="1" />
          <text x={8 + (v / max) * barW} y="167" textAnchor="middle" fill="#6b7280" fontSize="8">{v}%</text>
        </g>
      ))}
    </svg>
  );
}

// ─── CLV Year-by-Year Bar Chart (Get Fit Gyms) ───────────────────────────────
export function CLVYearBars() {
  const years = [
    { y: 1, val: 220.18 },
    { y: 2, val: 161.60 },
    { y: 3, val: 118.60 },
    { y: 4, val: 87.05 },
    { y: 5, val: 63.89 },
  ];
  const maxVal = 250;
  const chartH = 120;
  const barW = 40;
  const gap = 20;
  const startX = 40;

  return (
    <svg viewBox="0 0 380 190" className="w-full max-w-md mx-auto" aria-label="CLV Year-by-Year Discounted Profits">
      <text x="190" y="14" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="bold">Get Fit Gyms: Discounted Profit per Year</text>
      <text x="190" y="27" textAnchor="middle" fill="#9ca3af" fontSize="9">m=$240, r=80%, i=9% — retention is CUMULATIVE</text>
      {/* Y-axis */}
      <line x1="38" y1="35" x2="38" y2="155" stroke="#4b5563" strokeWidth="1" />
      {[0, 100, 200].map(v => (
        <g key={v}>
          <line x1="34" y1={155 - (v / maxVal) * chartH} x2="38" y2={155 - (v / maxVal) * chartH} stroke="#4b5563" strokeWidth="1" />
          <text x="30" y={159 - (v / maxVal) * chartH} textAnchor="end" fill="#6b7280" fontSize="8">${v}</text>
        </g>
      ))}
      {/* X-axis */}
      <line x1="38" y1="155" x2="340" y2="155" stroke="#4b5563" strokeWidth="1" />
      {/* Bars */}
      {years.map((d, i) => {
        const x = startX + i * (barW + gap);
        const h = (d.val / maxVal) * chartH;
        const opacity = 1 - i * 0.12;
        return (
          <g key={i}>
            <rect x={x} y={155 - h} width={barW} height={h} rx="3" fill="#3b82f6" opacity={opacity} />
            <text x={x + barW / 2} y={150 - h} textAnchor="middle" fill="#93c5fd" fontSize="8.5">${d.val}</text>
            <text x={x + barW / 2} y="166" textAnchor="middle" fill="#9ca3af" fontSize="8">Yr {d.y}</text>
            <text x={x + barW / 2} y="176" textAnchor="middle" fill="#6b7280" fontSize="7">r^{i}={(0.8 ** i).toFixed(3)}</text>
          </g>
        );
      })}
      {/* Total label */}
      <text x="300" y="100" fill="#4ade80" fontSize="9">Absolute</text>
      <text x="300" y="112" fill="#4ade80" fontSize="11" fontWeight="bold">CLV=$651</text>
      <text x="300" y="124" fill="#34d399" fontSize="9">Relative</text>
      <text x="300" y="136" fill="#34d399" fontSize="11" fontWeight="bold">=$501</text>
    </svg>
  );
}

// ─── Fear Appeals Inverted-U ──────────────────────────────────────────────────
export function FearAppealsU() {
  // Quadratic curve: y = -a(x-peak)^2 + maxY
  const points = [];
  for (let x = 0; x <= 200; x += 5) {
    const t = x / 200;
    const y = 100 * (1 - 4 * (t - 0.5) ** 2);
    points.push(`${40 + x},${130 - y}`);
  }
  const pathD = `M ${points.join(' L ')}`;

  return (
    <svg viewBox="0 0 380 200" className="w-full max-w-md mx-auto" aria-label="Fear Appeals Inverted-U Effectiveness">
      <text x="190" y="14" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="bold">Fear Appeals: Inverted-U Effectiveness</text>
      {/* Axes */}
      <line x1="40" y1="30" x2="40" y2="145" stroke="#4b5563" strokeWidth="1.5" />
      <line x1="40" y1="145" x2="250" y2="145" stroke="#4b5563" strokeWidth="1.5" />
      <polygon points="250,141 258,145 250,149" fill="#4b5563" />
      <polygon points="36,30 40,22 44,30" fill="#4b5563" />
      {/* Axis labels */}
      <text x="150" y="168" textAnchor="middle" fill="#9ca3af" fontSize="10">Amount of Fear in Message →</text>
      <text x="18" y="90" textAnchor="middle" fill="#9ca3af" fontSize="10" transform="rotate(-90 18 90)">Effectiveness →</text>
      {/* X-axis markers */}
      <text x="50" y="158" fill="#6b7280" fontSize="9">None</text>
      <text x="130" y="158" fill="#6b7280" fontSize="9">Moderate</text>
      <text x="220" y="158" fill="#6b7280" fontSize="9">Extreme</text>
      {/* Curve */}
      <path d={pathD} stroke="#f87171" strokeWidth="2.5" fill="none" />
      {/* Shaded area under curve */}
      <path d={`${pathD} L 240,145 L 40,145 Z`} fill="#f87171" opacity="0.08" />
      {/* Peak dot + label */}
      <circle cx="140" cy="30" r="4" fill="#4ade80" />
      <text x="145" y="26" fill="#4ade80" fontSize="9" fontWeight="bold">Optimal</text>
      {/* Zone annotations */}
      <text x="52" y="100" fill="#6b7280" fontSize="8">No motivation</text>
      <text x="52" y="112" fill="#6b7280" fontSize="8">to act</text>
      <text x="190" y="100" fill="#6b7280" fontSize="8">Denial /</text>
      <text x="190" y="112" fill="#6b7280" fontSize="8">Avoidance</text>
      {/* Zone dividers */}
      <line x1="90" y1="30" x2="90" y2="145" stroke="#374151" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="190" y1="30" x2="190" y2="145" stroke="#374151" strokeWidth="1" strokeDasharray="3 3" />
      {/* Example annotations */}
      <text x="260" y="60" fill="#fbbf24" fontSize="8.5">Michelin baby</text>
      <text x="260" y="72" fill="#fbbf24" fontSize="8.5">tire ad = optimal</text>
      <line x1="258" y1="60" x2="145" y2="38" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="2 2" />
      <text x="260" y="110" fill="#f87171" fontSize="8.5">Graphic accident</text>
      <text x="260" y="122" fill="#f87171" fontSize="8.5">footage = backfires</text>
      <line x1="258" y1="115" x2="225" y2="115" stroke="#f87171" strokeWidth="0.8" strokeDasharray="2 2" />
    </svg>
  );
}

// ─── EVC Pricing Number Line ──────────────────────────────────────────────────
export function EVCSpectrum({ refValue = 10000, diffValue = 11000, cost = 8000 }) {
  const total = refValue + diffValue;
  const scale = 280 / total;
  const cx = 50;

  const costX = cx + cost * scale;
  const refX = cx + refValue * scale;
  const evcX = cx + total * scale;

  return (
    <svg viewBox="0 0 420 160" className="w-full max-w-lg mx-auto" aria-label="EVC Pricing Spectrum">
      <text x="210" y="14" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="bold">EVC Pricing: Floor to Ceiling</text>
      {/* Main line */}
      <line x1={cx} y1="75" x2={evcX + 10} y2="75" stroke="#4b5563" strokeWidth="2" />
      {/* Cost (floor) */}
      <line x1={costX} y1="60" x2={costX} y2="90" stroke="#f87171" strokeWidth="2" />
      <text x={costX} y="55" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Cost</text>
      <text x={costX} y="104" textAnchor="middle" fill="#f87171" fontSize="8">(Price Floor)</text>
      <text x={costX} y="115" textAnchor="middle" fill="#f87171" fontSize="8">${cost.toLocaleString()}</text>
      {/* Reference value marker */}
      <line x1={refX} y1="65" x2={refX} y2="85" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x={refX} y="57" textAnchor="middle" fill="#60a5fa" fontSize="8">Ref Value</text>
      <text x={refX} y="97" textAnchor="middle" fill="#60a5fa" fontSize="8">${refValue.toLocaleString()}</text>
      {/* EVC (ceiling) */}
      <line x1={evcX} y1="60" x2={evcX} y2="90" stroke="#4ade80" strokeWidth="2" />
      <text x={evcX} y="55" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">EVC</text>
      <text x={evcX} y="104" textAnchor="middle" fill="#4ade80" fontSize="8">(Price Ceiling)</text>
      <text x={evcX} y="115" textAnchor="middle" fill="#4ade80" fontSize="8">${total.toLocaleString()}</text>
      {/* Red zone: below cost */}
      <rect x={cx} y="68" width={costX - cx} height="14" fill="#ef4444" opacity="0.2" rx="2" />
      {/* Green zone: pricing range */}
      <rect x={costX} y="68" width={evcX - costX} height="14" fill="#22c55e" opacity="0.2" rx="2" />
      <text x={(costX + evcX) / 2} y="80" textAnchor="middle" fill="#4ade80" fontSize="8">Pricing Zone</text>
      {/* Suggested price dot */}
      <circle cx={(costX + evcX) / 2} cy="75" r="5" fill="#fbbf24" />
      <text x={(costX + evcX) / 2} y="46" textAnchor="middle" fill="#fbbf24" fontSize="8">Suggested</text>
      <text x={(costX + evcX) / 2} y="36" textAnchor="middle" fill="#fbbf24" fontSize="8">Price</text>
      <line x1={(costX + evcX) / 2} y1="48" x2={(costX + evcX) / 2} y2="70" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
      {/* EVC formula breakdown */}
      <text x="50" y="140" fill="#9ca3af" fontSize="9">EVC = Ref Value (${refValue.toLocaleString()}) + Diff Value (${diffValue.toLocaleString()}) = ${total.toLocaleString()}</text>
    </svg>
  );
}

// ─── Product Line vs Single Product Comparison ───────────────────────────────
export function ProductLineComparison() {
  const bars = [
    { label: 'Single Product\n(@$1,500)', value: 150000, color: '#4ade80', note: '100 × $1,500' },
    { label: 'Product Line\n(2GHz+3.5GHz)', value: 66000, color: '#f87171', note: '60×$500 + 40×$900' },
  ];
  const maxVal = 170000;
  const chartH = 110;
  const barW = 80;

  return (
    <svg viewBox="0 0 340 210" className="w-full max-w-sm mx-auto" aria-label="Single Product vs Product Line Profits">
      <text x="170" y="14" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="bold">Dell Laptops: Profit Comparison</text>
      {/* Y-axis */}
      <line x1="55" y1="25" x2="55" y2="145" stroke="#4b5563" strokeWidth="1" />
      {[0, 50000, 100000, 150000].map(v => (
        <g key={v}>
          <line x1="51" y1={145 - (v / maxVal) * chartH} x2="55" y2={145 - (v / maxVal) * chartH} stroke="#4b5563" strokeWidth="1" />
          <text x="48" y={148 - (v / maxVal) * chartH} textAnchor="end" fill="#6b7280" fontSize="7.5">${(v / 1000).toFixed(0)}K</text>
        </g>
      ))}
      {/* X-axis */}
      <line x1="55" y1="145" x2="290" y2="145" stroke="#4b5563" strokeWidth="1" />
      {/* Bars */}
      {bars.map((d, i) => {
        const x = 70 + i * 120;
        const h = (d.value / maxVal) * chartH;
        return (
          <g key={i}>
            <rect x={x} y={145 - h} width={barW} height={h} rx="4" fill={d.color} opacity="0.85" />
            <text x={x + barW / 2} y={138 - h} textAnchor="middle" fill={d.color} fontSize="10" fontWeight="bold">${(d.value / 1000).toFixed(0)}K</text>
            {d.label.split('\n').map((line, li) => (
              <text key={li} x={x + barW / 2} y={158 + li * 11} textAnchor="middle" fill="#d1d5db" fontSize="8">{line}</text>
            ))}
            <text x={x + barW / 2} y={158 + 22} textAnchor="middle" fill="#6b7280" fontSize="7.5">{d.note}</text>
          </g>
        );
      })}
      {/* Gap annotation */}
      <line x1="152" y1="97" x2="152" y2="40" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="192" y1="97" x2="192" y2="97" stroke="#fbbf24" strokeWidth="1" />
      <line x1="152" y1="97" x2="192" y2="97" stroke="#fbbf24" strokeWidth="1.5" />
      <text x="172" y="55" textAnchor="middle" fill="#fbbf24" fontSize="8.5">Gap =</text>
      <text x="172" y="67" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">$84K</text>
      <text x="172" y="79" textAnchor="middle" fill="#fbbf24" fontSize="7.5">cannibalization</text>
      <text x="170" y="200" textAnchor="middle" fill="#4ade80" fontSize="8.5">✓ Single product wins — high IC discount destroys product line</text>
    </svg>
  );
}

// ─── Conjoint Importance Bar Chart ───────────────────────────────────────────
export function ConjointImportance() {
  const attrs = [
    { name: 'Price', range: 5.0, pct: 49, color: '#f59e0b' },
    { name: 'Processor Brand', range: 2.3, pct: 23, color: '#60a5fa' },
    { name: 'Processor Speed', range: 1.9, pct: 19, color: '#34d399' },
    { name: 'OEM Brand', range: 1.3, pct: 13, color: '#a78bfa' },
  ];
  const maxRange = 5.5;
  const barW = 200;

  return (
    <svg viewBox="0 0 400 175" className="w-full max-w-md mx-auto" aria-label="Conjoint Attribute Importance">
      <text x="200" y="14" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="bold">Laptop Conjoint: Attribute Importance (Range = Max−Min)</text>
      {attrs.map((a, i) => {
        const y = 30 + i * 35;
        const w = (a.range / maxRange) * barW;
        return (
          <g key={i}>
            <text x="5" y={y + 13} fill="#d1d5db" fontSize="9.5">{a.name}</text>
            <rect x="105" y={y} width={w} height="18" rx="3" fill={a.color} opacity="0.85" />
            <text x={105 + w + 6} y={y + 13} fill={a.color} fontSize="10" fontWeight="bold">{a.pct}%</text>
            <text x={105 + w + 36} y={y + 13} fill="#6b7280" fontSize="9">range={a.range}</text>
          </g>
        );
      })}
      <line x1="105" y1="160" x2="310" y2="160" stroke="#374151" strokeWidth="1" />
      <text x="105" y="172" fill="#6b7280" fontSize="8">0</text>
      <text x="207" y="172" fill="#6b7280" fontSize="8">2.5</text>
      <text x="304" y="172" fill="#6b7280" fontSize="8">5.0 (utils)</text>
      <text x="205" y="172" textAnchor="middle" fill="#9ca3af" fontSize="8">Importance = Max − Min utility within attribute</text>
    </svg>
  );
}

// ─── Freemium Tradeoff Diagram ────────────────────────────────────────────────
export function FreemiumTradeoff() {
  // Two curves sharing the same x-axis (free tier richness 0→100)
  // Traffic: rises with richness → concave up
  // Conversion: falls with richness → concave down

  const trafficPts = [];
  const convPts = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const x = 50 + t * 220;
    trafficPts.push(`${x},${130 - Math.pow(t, 0.5) * 90}`);
    convPts.push(`${x},${130 - Math.pow(1 - t, 0.5) * 90}`);
  }

  return (
    <svg viewBox="0 0 380 200" className="w-full max-w-md mx-auto" aria-label="Freemium Traffic vs Conversion Tradeoff">
      <text x="190" y="14" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="bold">Freemium Design Tradeoff</text>
      {/* Axes */}
      <line x1="50" y1="30" x2="50" y2="135" stroke="#4b5563" strokeWidth="1.5" />
      <line x1="50" y1="135" x2="280" y2="135" stroke="#4b5563" strokeWidth="1.5" />
      <polygon points="280,131 288,135 280,139" fill="#4b5563" />
      {/* Axis labels */}
      <text x="165" y="155" textAnchor="middle" fill="#9ca3af" fontSize="9">Free Tier Richness →</text>
      <text x="22" y="90" textAnchor="middle" fill="#9ca3af" fontSize="9" transform="rotate(-90 22 90)">Rate (%)</text>
      <text x="52" y="145" fill="#6b7280" fontSize="8">Minimal</text>
      <text x="235" y="145" fill="#6b7280" fontSize="8">Feature-rich</text>
      {/* Traffic curve (green, rises) */}
      <path d={`M ${trafficPts.join(' L ')}`} stroke="#4ade80" strokeWidth="2" fill="none" />
      {/* Conversion curve (blue, falls) */}
      <path d={`M ${convPts.join(' L ')}`} stroke="#60a5fa" strokeWidth="2" fill="none" />
      {/* Intersection zone */}
      <line x1="160" y1="30" x2="160" y2="135" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="160" cy="85" r="5" fill="#fbbf24" />
      <text x="165" y="73" fill="#fbbf24" fontSize="8.5" fontWeight="bold">Optimal</text>
      <text x="165" y="85" fill="#fbbf24" fontSize="8">balance</text>
      {/* Labels */}
      <text x="240" y="50" fill="#4ade80" fontSize="9">User Traffic</text>
      <text x="240" y="120" fill="#60a5fa" fontSize="9">Upgrade %</text>
      {/* Spotify annotation */}
      <text x="55" y="170" fill="#a78bfa" fontSize="8.5">Spotify solution: Add "bad" to free tier (ads, no offline)</text>
      <text x="55" y="183" fill="#a78bfa" fontSize="8.5">→ Keeps traffic high while making premium clearly superior</text>
    </svg>
  );
}

// ─── STP Process Flow ─────────────────────────────────────────────────────────
export function STPFlow() {
  const steps = [
    {
      label: 'SEGMENT', color: '#3b82f6', bg: '#1e3a5f',
      lines: ['Geo: region, climate', 'Demo: age, income,', '  marital status', 'Psycho: lifestyle,', '  values ← NOT behavioral', 'Behavioral: usage,', '  frequency'],
    },
    {
      label: 'TARGET', color: '#f59e0b', bg: '#3d2a00',
      lines: ['Evaluate attractiveness:', '• Size & growth', '• Competition level', '• Fit with capabilities', '', 'Pick segments to serve'],
    },
    {
      label: 'POSITION', color: '#4ade80', bg: '#052e16',
      lines: ['Vertical: quality', '  (BMW 3 vs 7)', '  WTP varies', 'Horizontal: taste', '  (BMW 3 vs M3)', '  preferences differ'],
    },
  ];

  return (
    <svg viewBox="0 0 420 210" className="w-full max-w-lg mx-auto" aria-label="STP Process Flow">
      <text x="210" y="14" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="bold">STP Process</text>
      {steps.map((s, i) => {
        const x = 10 + i * 138;
        return (
          <g key={i}>
            <rect x={x} y="22" width="125" height="170" rx="6" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
            <rect x={x} y="22" width="125" height="22" rx="6" fill={s.color} opacity="0.3" />
            <text x={x + 62} y="38" textAnchor="middle" fill={s.color} fontSize="12" fontWeight="bold">{s.label}</text>
            {s.lines.map((line, li) => (
              <text key={li} x={x + 8} y={58 + li * 14} fill="#d1d5db" fontSize="8.5">{line}</text>
            ))}
            {/* Arrow */}
            {i < 2 && (
              <g>
                <line x1={x + 125} y1="107" x2={x + 138} y2="107" stroke="#4b5563" strokeWidth="1.5" />
                <polygon points={`${x + 136},103 ${x + 144},107 ${x + 136},111`} fill="#4b5563" />
              </g>
            )}
          </g>
        );
      })}
      <text x="210" y="202" textAnchor="middle" fill="#9ca3af" fontSize="8.5">Key trap: Lifestyle = Psychographic (NOT behavioral) · Marital status = Demographic</text>
    </svg>
  );
}

// ─── Full Funnel Advertising ──────────────────────────────────────────────────
export function FullFunnelDiagram() {
  const stages = [
    { label: 'AWARENESS', sublabel: 'Brand Ads', width: 260, color: '#7c3aed', note: 'Top of funnel' },
    { label: 'CONSIDERATION', sublabel: 'Brand + Content', width: 200, color: '#2563eb', note: '' },
    { label: 'INTENT', sublabel: 'Retargeting', width: 150, color: '#0891b2', note: '' },
    { label: 'CONVERSION', sublabel: 'Performance Ads', width: 100, color: '#059669', note: 'Bottom of funnel' },
  ];
  const startY = 20;

  return (
    <svg viewBox="0 0 400 210" className="w-full max-w-md mx-auto" aria-label="Full Funnel Advertising">
      <text x="200" y="14" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="bold">Full Funnel: Brand + Performance = Complementary</text>
      {stages.map((s, i) => {
        const y = startY + i * 42;
        const x = (280 - s.width) / 2 + 20;
        return (
          <g key={i}>
            <rect x={x} y={y} width={s.width} height="34" rx="3" fill={s.color} opacity="0.7" />
            <text x={x + s.width / 2} y={y + 14} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{s.label}</text>
            <text x={x + s.width / 2} y={y + 27} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8.5">{s.sublabel}</text>
            {s.note && <text x={x + s.width + 10} y={y + 20} fill="#9ca3af" fontSize="8.5">{s.note}</text>}
          </g>
        );
      })}
      <text x="200" y="195" textAnchor="middle" fill="#fbbf24" fontSize="9">TikTok data: brand-aware users convert at higher rates on performance ads</text>
      <text x="200" y="207" textAnchor="middle" fill="#fbbf24" fontSize="9">Brand (top) and Performance (bottom) are NOT substitutes — they multiply each other</text>
    </svg>
  );
}

// ─── IC Constraint Visual (Product Line) ─────────────────────────────────────
export function ICConstraintVisual() {
  // Show: two WTP bars per segment, the IC-constrained price, and the surplus comparison
  return (
    <svg viewBox="0 0 420 200" className="w-full max-w-lg mx-auto" aria-label="IC Constraint Visualization">
      <text x="210" y="14" textAnchor="middle" fill="#e5e7eb" fontSize="11" fontWeight="bold">IC Constraint: High-type Must Prefer High Product</text>

      {/* Legend */}
      <rect x="10" y="22" width="10" height="10" fill="#60a5fa" rx="2" />
      <text x="24" y="31" fill="#d1d5db" fontSize="9">Personal users (60)</text>
      <rect x="130" y="22" width="10" height="10" fill="#f59e0b" rx="2" />
      <text x="144" y="31" fill="#d1d5db" fontSize="9">Business users (40)</text>

      {/* Y axis */}
      <line x1="55" y1="40" x2="55" y2="155" stroke="#4b5563" strokeWidth="1" />
      {[0, 500, 1000, 1500, 2000].map(v => (
        <g key={v}>
          <line x1="51" y1={155 - (v / 2200) * 115} x2="55" y2={155 - (v / 2200) * 115} stroke="#4b5563" strokeWidth="1" />
          <text x="48" y={158 - (v / 2200) * 115} textAnchor="end" fill="#6b7280" fontSize="7.5">${(v / 1000).toFixed(1)}K</text>
        </g>
      ))}
      {/* X axis */}
      <line x1="55" y1="155" x2="350" y2="155" stroke="#4b5563" strokeWidth="1" />

      {/* Personal WTPs */}
      <rect x="70" y={155 - (500 / 2200) * 115} width="50" height={(500 / 2200) * 115} rx="3" fill="#60a5fa" opacity="0.5" />
      <text x="95" y="165" textAnchor="middle" fill="#d1d5db" fontSize="8">2GHz</text>
      <text x="95" y="175" textAnchor="middle" fill="#60a5fa" fontSize="8">$500</text>

      <rect x="130" y={155 - (1500 / 2200) * 115} width="50" height={(1500 / 2200) * 115} rx="3" fill="#60a5fa" opacity="0.8" />
      <text x="155" y="165" textAnchor="middle" fill="#d1d5db" fontSize="8">3.5GHz</text>
      <text x="155" y="175" textAnchor="middle" fill="#60a5fa" fontSize="8">$1,500</text>

      {/* Business WTPs */}
      <rect x="210" y={155 - (1600 / 2200) * 115} width="50" height={(1600 / 2200) * 115} rx="3" fill="#f59e0b" opacity="0.5" />
      <text x="235" y="165" textAnchor="middle" fill="#d1d5db" fontSize="8">2GHz</text>
      <text x="235" y="175" textAnchor="middle" fill="#f59e0b" fontSize="8">$1,600</text>

      <rect x="270" y={155 - (2000 / 2200) * 115} width="50" height={(2000 / 2200) * 115} rx="3" fill="#f59e0b" opacity="0.8" />
      <text x="295" y="165" textAnchor="middle" fill="#d1d5db" fontSize="8">3.5GHz</text>
      <text x="295" y="175" textAnchor="middle" fill="#f59e0b" fontSize="8">$2,000</text>

      {/* IC price line at $900 */}
      <line x1="55" y1={155 - (900 / 2200) * 115} x2="350" y2={155 - (900 / 2200) * 115} stroke="#f87171" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="355" y={158 - (900 / 2200) * 115} fill="#f87171" fontSize="9" fontWeight="bold">IC Max P=$900</text>

      {/* P_low line at $500 */}
      <line x1="55" y1={155 - (500 / 2200) * 115} x2="270" y2={155 - (500 / 2200) * 115} stroke="#6b7280" strokeWidth="1" strokeDasharray="2 2" />

      <text x="210" y="192" textAnchor="middle" fill="#9ca3af" fontSize="8.5">IC: 2000−P ≥ 1600−500  →  P ≤ $900   Cannibalization cost = $2000−$900 = $1,100</text>
    </svg>
  );
}
