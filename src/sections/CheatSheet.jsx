import { useEffect } from 'react';

// ─── Print-optimised inline SVG charts (light-theme, black ink) ──────────────

function CLVBarsMini() {
  const bars = [
    { yr: 'Y1', val: 220.18, r: 'r⁰=1' },
    { yr: 'Y2', val: 161.60, r: 'r¹' },
    { yr: 'Y3', val: 118.60, r: 'r²' },
    { yr: 'Y4', val: 87.05,  r: 'r³' },
    { yr: 'Y5', val: 63.89,  r: 'r⁴' },
  ];
  const max = 220.18; const W = 230; const H = 90; const pad = 20; const bw = 28; const gap = 14;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }}>
      <line x1={pad} y1={H-14} x2={W-4} y2={H-14} stroke="#333" strokeWidth="1"/>
      {bars.map((b, i) => {
        const bh = ((b.val / max) * (H - 28));
        const x = pad + 4 + i * (bw + gap);
        const y = H - 14 - bh;
        const shade = ['#1a4a8c','#2a5fa0','#3a74b4','#4a89c8','#5a9edc'][i];
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} fill={shade} opacity="0.85"/>
            <text x={x + bw/2} y={H-2} textAnchor="middle" fontSize="6" fill="#333">{b.yr}</text>
            <text x={x + bw/2} y={y - 2} textAnchor="middle" fontSize="5.5" fill="#333">${Math.round(b.val)}</text>
            <text x={x + bw/2} y={y + 9} textAnchor="middle" fontSize="5" fill="white">{b.r}</text>
          </g>
        );
      })}
      <text x={pad} y={8} fontSize="6.5" fontWeight="bold" fill="#1a4a8c">Get Fit Gyms CLV — discounted profit by year</text>
      <text x={W-4} y={H-16} textAnchor="end" fontSize="6" fill="#666">Sum=$651.33→Rel CLV=$501.33</text>
    </svg>
  );
}

function CLVLeversMini() {
  const data = [
    { label: '+1% Retention', pct: 4.9, color: '#1a4a8c' },
    { label: '+1% Margin',    pct: 1.1, color: '#2d6a4f' },
    { label: '−1% Acq Cost', pct: 0.1, color: '#555' },
  ];
  const W = 230; const H = 60; const labelW = 80;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }}>
      <text x="0" y="9" fontSize="6.5" fontWeight="bold" fill="#1a4a8c">Impact on Firm Value</text>
      {data.map((d, i) => {
        const barW = ((d.pct / 4.9) * (W - labelW - 40));
        const y = 16 + i * 15;
        return (
          <g key={i}>
            <text x="0" y={y + 7} fontSize="7" fill="#222">{d.label}</text>
            <rect x={labelW} y={y} width={barW} height={10} fill={d.color} opacity="0.85" rx="1"/>
            <text x={labelW + barW + 3} y={y + 8} fontSize="7" fontWeight="bold" fill={d.color}>{d.pct}%</text>
          </g>
        );
      })}
      <text x="0" y={H} fontSize="5.5" fill="#888">Retention is 49× more impactful than acquisition cost</text>
    </svg>
  );
}

function TwoSidesMini() {
  const W = 230; const H = 130;
  const qData = [
    { x: 5,   y: 5,   w: 108, h: 58, bg: '#fff3cd', border: '#e6ac00', title: '⚠ VULNERABLE', sub: 'Lo Exp / Hi Profit', action: '→ Fix experience fast', tc: '#7b4f00' },
    { x: 117, y: 5,   w: 108, h: 58, bg: '#d4edda', border: '#28a745', title: '⭐ STARS',      sub: 'Hi Exp / Hi Profit', action: '→ Invest, grow, cross-sell', tc: '#1a5c2a' },
    { x: 5,   y: 67,  w: 108, h: 58, bg: '#f8d7da', border: '#dc3545', title: '😵 LOST CAUSE', sub: 'Lo Exp / Lo Profit', action: '→ Minimize / exit', tc: '#721c24' },
    { x: 117, y: 67,  w: 108, h: 58, bg: '#d1ecf1', border: '#17a2b8', title: '🆓 FREE RIDER', sub: 'Hi Exp / Lo Profit', action: '→ Monetize / cut service', tc: '#0c5460' },
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }}>
      {qData.map((q, i) => (
        <g key={i}>
          <rect x={q.x} y={q.y} width={q.w} height={q.h} fill={q.bg} stroke={q.border} strokeWidth="1" rx="2"/>
          <text x={q.x+q.w/2} y={q.y+14} textAnchor="middle" fontSize="8" fontWeight="bold" fill={q.tc}>{q.title}</text>
          <text x={q.x+q.w/2} y={q.y+26} textAnchor="middle" fontSize="6.5" fill={q.tc}>{q.sub}</text>
          <text x={q.x+q.w/2} y={q.y+39} textAnchor="middle" fontSize="6" fill={q.tc}>{q.action}</text>
        </g>
      ))}
      <text x="115" y={H} textAnchor="middle" fontSize="6" fill="#555">← Customer Experience (value created) →</text>
    </svg>
  );
}

function FearCurveMini() {
  const W = 230; const H = 80;
  const pts = [[15,68],[40,55],[70,30],[115,14],[160,30],[195,55],[220,65]];
  const d = pts.map((p,i) => `${i===0?'M':'L'}${p[0]},${p[1]}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }}>
      <text x="0" y="8" fontSize="6.5" fontWeight="bold" fill="#4a3500">Fear Appeals — Inverted-U</text>
      <line x1="10" y1="70" x2={W-5} y2="70" stroke="#333" strokeWidth="1"/>
      <line x1="10" y1="10" x2="10" y2="70" stroke="#333" strokeWidth="1"/>
      <text x="115" y={H} textAnchor="middle" fontSize="6" fill="#555">← Fear Intensity →</text>
      <text x="6" y="40" textAnchor="middle" fontSize="6" fill="#555" transform="rotate(-90 6 40)">Effectiveness</text>
      <path d={d} fill="none" stroke="#c0392b" strokeWidth="2"/>
      {/* Zone annotations */}
      <rect x="12" y="50" width="42" height="18" fill="#ffeeba" opacity="0.7" rx="1"/>
      <text x="33" y="60" textAnchor="middle" fontSize="5.5" fill="#7b4f00">Low fear</text>
      <text x="33" y="67" textAnchor="middle" fontSize="5.5" fill="#7b4f00">= no action</text>
      <rect x="88" y="12" width="54" height="14" fill="#d4edda" opacity="0.8" rx="1"/>
      <text x="115" y="22" textAnchor="middle" fontSize="5.5" fill="#1a5c2a">Moderate = optimal</text>
      <rect x="178" y="50" width="47" height="18" fill="#f8d7da" opacity="0.7" rx="1"/>
      <text x="201" y="60" textAnchor="middle" fontSize="5.5" fill="#721c24">Too much</text>
      <text x="201" y="67" textAnchor="middle" fontSize="5.5" fill="#721c24">= avoidance</text>
      {/* Optimal dot */}
      <circle cx="115" cy="14" r="3" fill="#1a5c2a"/>
    </svg>
  );
}

function EVCLineMini() {
  const W = 230; const H = 60;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }}>
      <text x="0" y="9" fontSize="6.5" fontWeight="bold" fill="#1a6b3c">EVC Price Spectrum — Industrial Pump</text>
      {/* Line */}
      <line x1="10" y1="35" x2={W-10} y2="35" stroke="#555" strokeWidth="1.5"/>
      {/* Cost marker */}
      <line x1="30" y1="28" x2="30" y2="42" stroke="#dc3545" strokeWidth="1.5"/>
      <text x="30" y="25" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#dc3545">$8K</text>
      <text x="30" y="50" textAnchor="middle" fontSize="6" fill="#dc3545">Cost Floor</text>
      {/* Ref Value */}
      <line x1="100" y1="28" x2="100" y2="42" stroke="#555" strokeWidth="1.5"/>
      <text x="100" y="25" textAnchor="middle" fontSize="7" fill="#555">$10K</text>
      <text x="100" y="50" textAnchor="middle" fontSize="6" fill="#555">Ref Value</text>
      {/* Price zone */}
      <rect x="30" y="30" width="170" height="10" fill="#2d6a4f" opacity="0.15" rx="1"/>
      <text x="130" y="36" textAnchor="middle" fontSize="5.5" fill="#2d6a4f">← Pricing Zone →</text>
      {/* EVC */}
      <line x1="200" y1="28" x2="200" y2="42" stroke="#1a6b3c" strokeWidth="2"/>
      <text x="200" y="25" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1a6b3c">$21K</text>
      <text x="200" y="50" textAnchor="middle" fontSize="6" fill="#1a6b3c">EVC Ceiling</text>
    </svg>
  );
}

function ConjointMini() {
  const data = [
    { label: 'Price',            pct: 49, color: '#1a4a8c' },
    { label: 'Noise Canceling',  pct: 27, color: '#2d6a4f' },
    { label: 'Battery Life',     pct: 19, color: '#7b4f00' },
    { label: 'Brand',            pct: 13, color: '#555' },
  ];
  const W = 230; const H = 72; const lW = 76;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }}>
      <text x="0" y="9" fontSize="6.5" fontWeight="bold" fill="#2d5a27">Attribute Importance = MAX−MIN Range</text>
      {data.map((d, i) => {
        const bw = (d.pct / 49) * (W - lW - 30);
        const y = 14 + i * 13;
        return (
          <g key={i}>
            <text x="0" y={y+8} fontSize="7" fill="#222">{d.label}</text>
            <rect x={lW} y={y} width={bw} height={10} fill={d.color} opacity="0.8" rx="1"/>
            <text x={lW + bw + 3} y={y+8} fontSize="7" fontWeight="bold" fill={d.color}>{d.pct}%</text>
          </g>
        );
      })}
      <text x="0" y={H} fontSize="5.5" fill="#888">Price almost always has the widest range → most important</text>
    </svg>
  );
}

function ICConstraintMini() {
  const W = 230; const H = 90;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }}>
      <text x="0" y="9" fontSize="6.5" fontWeight="bold" fill="#8b1a1a">IC Constraint — Dell Laptops</text>
      {/* Personal bars */}
      <text x="2" y="20" fontSize="6.5" fill="#2d5a27">Personal (60)</text>
      <rect x="80" y="12" width="42" height="9" fill="#2d5a27" opacity="0.7" rx="1"/>
      <text x="125" y="20" fontSize="6.5" fill="#2d5a27">WTP 2GHz=$500</text>
      <rect x="80" y="22" width="126" height="9" fill="#2d5a27" opacity="0.3" rx="1"/>
      <text x="125" y="30" fontSize="6.5" fill="#2d5a27">WTP 3.5GHz=$1,500</text>
      {/* Business bars */}
      <text x="2" y="46" fontSize="6.5" fill="#1a4a8c">Business (40)</text>
      <rect x="80" y="38" width="134" height="9" fill="#1a4a8c" opacity="0.7" rx="1"/>
      <text x="217" y="46" fontSize="6" fill="#1a4a8c">$1,600</text>
      <rect x="80" y="49" width="168" height="9" fill="#1a4a8c" opacity="0.3" rx="1"/>
      <text x="217" y="57" fontSize="6" fill="#1a4a8c">$2,000</text>
      {/* IC line */}
      <line x1="155" y1="60" x2="155" y2="80" stroke="#c0392b" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="155" y="76" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#c0392b">P_H≤$900</text>
      {/* Results */}
      <text x="0" y={H} fontSize="6" fill="#8b1a1a">PL: 60×$500+40×$900=$66K vs Single: 100×$1,500=$150K → SINGLE WINS</text>
    </svg>
  );
}

function FullFunnelMini() {
  const W = 230; const H = 85;
  const stages = [
    { label: 'AWARENESS', w: 200, y: 5,  fill: '#1a4a8c', sub: 'Brand ads — TikTok, YouTube, social' },
    { label: 'CONSIDERATION', w: 160, y: 22, fill: '#2a6496', sub: 'Content, reviews, comparison' },
    { label: 'INTENT', w: 120, y: 39, fill: '#2d6a4f', sub: 'Search, retargeting' },
    { label: 'CONVERSION', w: 80,  y: 56, fill: '#388e3c', sub: 'Performance ads — direct response' },
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }}>
      <text x="0" y="8" fontSize="6.5" fontWeight="bold" fill="#4a3500">Full Funnel — Brand + Performance = Complementary</text>
      {stages.map((st, i) => {
        const x = (W - st.w) / 2;
        return (
          <g key={i}>
            <rect x={x} y={st.y+10} width={st.w} height={14} fill={st.fill} opacity="0.85" rx="2"/>
            <text x={W/2} y={st.y+20} textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="white">{st.label}</text>
            <text x={W/2} y={st.y+10+19} textAnchor="middle" fontSize="5.5" fill="#444">{st.sub}</text>
          </g>
        );
      })}
      <text x="0" y={H} fontSize="5.5" fill="#888">TikTok data: brand-aware users convert 1+1=3× better on performance ads</text>
    </svg>
  );
}

function FreemiumMini() {
  const W = 230; const H = 75;
  const trafficPts = [[15,60],[60,40],[110,28],[160,22],[210,18]];
  const upgradePts = [[15,20],[60,25],[110,35],[160,48],[210,62]];
  const dTraffic  = trafficPts.map((p,i)=>`${i===0?'M':'L'}${p[0]},${p[1]}`).join(' ');
  const dUpgrade  = upgradePts.map((p,i)=>`${i===0?'M':'L'}${p[0]},${p[1]}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }}>
      <text x="0" y="9" fontSize="6.5" fontWeight="bold" fill="#1a4a4a">Freemium Design Tradeoff</text>
      <line x1="10" y1="65" x2={W-5} y2="65" stroke="#333" strokeWidth="1"/>
      <text x="115" y={H} textAnchor="middle" fontSize="6" fill="#555">← Free Tier Richness →</text>
      <path d={dTraffic} fill="none" stroke="#1a4a8c" strokeWidth="2"/>
      <text x="215" y="15" fontSize="6.5" fill="#1a4a8c" fontWeight="bold">Traffic↑</text>
      <path d={dUpgrade} fill="none" stroke="#c0392b" strokeWidth="2"/>
      <text x="215" y="65" fontSize="6.5" fill="#c0392b" fontWeight="bold">Upgrades↓</text>
      {/* Optimal zone */}
      <rect x="85" y="12" width="60" height="50" fill="#2d6a4f" opacity="0.08" rx="2"/>
      <line x1="115" y1="12" x2="115" y2="62" stroke="#2d6a4f" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="115" y="47" textAnchor="middle" fontSize="6" fill="#2d6a4f">Balance</text>
      <text x="115" y="56" textAnchor="middle" fontSize="5.5" fill="#2d6a4f">zone</text>
    </svg>
  );
}

// ─── Shared style tokens ─────────────────────────────────────────────────────

const s = {
  page: {
    width: '794px', minHeight: '1120px', background: 'white', color: '#000',
    fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '8pt', lineHeight: '1.25',
    padding: '12px 14px', margin: '0 auto', boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
    boxSizing: 'border-box',
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', marginTop: '4px' },
  col: { display: 'flex', flexDirection: 'column', gap: '4px' },
  section: { border: '1px solid #bbb', borderRadius: '2px', overflow: 'hidden' },
  sHead: (c) => ({ background: c, color: 'white', fontWeight: 'bold', fontSize: '7pt',
    padding: '1px 4px', letterSpacing: '0.04em', textTransform: 'uppercase' }),
  body: { padding: '2px 4px 3px' },
  code: { background: '#f0f0f0', border: '1px solid #ccc', borderRadius: '2px',
    padding: '1px 3px', fontFamily: 'monospace', fontSize: '7.5pt', margin: '1px 0', display: 'block' },
  ex: { background: '#e8f5e9', borderLeft: '2px solid #388e3c',
    padding: '1px 4px', fontSize: '7pt', margin: '1px 0', fontFamily: 'monospace' },
  note: { background: '#e8f0ff', borderLeft: '2px solid #1a4a8c',
    padding: '1px 4px', fontSize: '7pt', margin: '1px 0' },
  row: { display: 'flex', gap: '3px', margin: '0.5px 0', fontSize: '7.5pt' },
  lbl: { fontWeight: 'bold', color: '#1a3a6c', minWidth: '26px', flexShrink: 0 },
  sub: { fontWeight: 'bold', fontSize: '6.5pt', color: '#444', marginTop: '3px', marginBottom: '1px',
    borderBottom: '1px dotted #ccc' },
  li: { margin: '0.5px 0', paddingLeft: '7px', fontSize: '7.5pt' },
  trap: { fontWeight: 'bold', color: '#a00', fontSize: '7pt' },
  pg: { marginBottom: '10px' },
};

function Sec({ title, color = '#1a3a6c', children }) {
  return (
    <div style={s.section}>
      <div style={s.sHead(color)}>{title}</div>
      <div style={s.body}>{children}</div>
    </div>
  );
}
function Code({ children }) { return <span style={s.code}>{children}</span>; }
function Ex({ children }) { return <div style={s.ex}>{children}</div>; }
function Note({ children }) { return <div style={s.note}>{children}</div>; }
function Sub({ children }) { return <div style={s.sub}>{children}</div>; }
function Li({ b, red, children }) {
  return (
    <div style={{ ...s.li, ...(red ? { color: '#a00', fontWeight: 'bold' } : {}) }}>
      • {b ? <b>{b}</b> : null}{b ? ' ' : ''}{children}
    </div>
  );
}
function Row({ l, v }) {
  return <div style={s.row}><span style={s.lbl}>{l}</span><span>{v}</span></div>;
}
function PageHeader({ page, title }) {
  return (
    <div style={{ borderBottom: '2px solid #1a3a6c', paddingBottom: '3px', marginBottom: '4px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontWeight: 'bold', fontSize: '9.5pt', color: '#1a3a6c' }}>
        EMBA 206 Marketing Management — {title}
      </span>
      <span style={{ fontSize: '7pt', color: '#555' }}>
        Haas · Spring 2026 · 100 pts (40/30/30) · 2 help pages · Built by Rohit Mishra · p{page}/2
      </span>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function CheatSheet() {
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'cs-print';
    style.textContent = `
      @media print {
        @page { size: A4 portrait; margin: 0; }
        header, footer, .no-print { display: none !important; }
        main { padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
        .cs-page {
          width: 100% !important; min-height: 100vh !important; height: 100vh !important;
          box-shadow: none !important; padding: 8mm 9mm !important; margin: 0 !important;
          font-size: 8pt !important; page-break-after: always; break-after: page;
          box-sizing: border-box !important;
        }
        .cs-page:last-child { page-break-after: auto; break-after: auto; }
        .cs-page * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `;
    document.head.appendChild(style);
    return () => document.getElementById('cs-print')?.remove();
  }, []);

  return (
    <div>
      {/* Controls */}
      <div className="no-print mb-4 flex items-center justify-between bg-gray-900 rounded-lg p-4 border border-gray-700">
        <div>
          <p className="text-white font-semibold">2-page A4 · 8pt font · charts included · print-ready</p>
          <p className="text-gray-400 text-sm mt-1">Cmd+P → Save as PDF → Paper: A4 → Margins: None → Background graphics: ON</p>
        </div>
        <button onClick={() => window.print()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg transition-colors">
          🖨 Print / Save PDF
        </button>
      </div>

      {/* ═══════════════════════════ PAGE 1 ═══════════════════════════ */}
      <div className="cs-page" style={s.page}>
        <PageHeader page="1" title="Formulas, Frameworks & Visuals" />

        <div style={s.grid}>

          {/* ── P1 COL 1 ── */}
          <div style={s.col}>

            <Sec title="CLV — General Formula" color="#1a4a8c">
              <Code>CLV = Σ [m × r^(t−1) / (1+i)^t] − AC</Code>
              <Code>Infinite: CLV = m × [r / (1+i−r)]</Code>
              <Code>Margin Multiple = r/(1+i−r) · Rel CLV = Abs − AC</Code>
              <Row l="m" v="annual profit margin (revenue − variable cost)" />
              <Row l="r" v="retention rate (e.g. 0.80 = 80%)" />
              <Row l="i" v="discount rate / cost of capital" />
              <Row l="t-1" v="cumulative retention power (EXAM TRAP ↓)" />
              <Li red b="TRAP:">r^(t−1) is CUMULATIVE: Y1=r⁰=1, Y2=r¹, Y3=r², Y4=r³</Li>
              <Li red b="TRAP:">Quarterly sub → ×4 = annual margin FIRST, then formula</Li>
              <Li red b="TRAP:">CLV uses MARGIN not revenue — subtract variable cost first</Li>
              <Note>Interpretation: Relative CLV = the maximum you should rationally spend to acquire a customer. If AC {">"} Rel CLV, the customer destroys value before they're acquired.</Note>
              <div style={{ marginTop: '3px' }}><CLVBarsMini /></div>
              <Ex>Get Fit: m=240, r=80%, i=9%, AC=150, N=5 → Y1=$220 Y2=$162 Y3=$119 Y4=$87 Y5=$64 → Abs=$651.33 → Rel=$501.33</Ex>
            </Sec>

            <Sec title="CLV Levers — 1% improvement impact" color="#2a6496">
              <CLVLeversMini />
              <Note>Why retention dominates: r appears in BOTH numerator (r^t-1) and denominator (1+i−r) of the CLV formula — a double-compounding effect. A 1% retention gain is worth 49× more than a 1% AC reduction, yet most firms allocate 70-80% of marketing spend to acquisition.</Note>
              <Li b="5 reasons customers get MORE profitable over time:"> base profit → cross-buy → lower service cost → referrals at zero AC → price premiums from loyalty</Li>
            </Sec>

          </div>

          {/* ── P1 COL 2 ── */}
          <div style={s.col}>

            <Sec title="Two Sides of Value Matrix" color="#5a2d82">
              <TwoSidesMini />
              <Note>Interpretation: Map customers on TWO dimensions — not just revenue. A $2M revenue customer with $40K net profit is a Free Rider. A $180K revenue customer with $72K profit is a Star. Kanthal AB discovered this and doubled profitability by "firing" their largest accounts.</Note>
              <Li b="Stars:">invest, cross-sell, deepen — your most valuable segment</Li>
              <Li b="Vulnerable:">profitable but at high churn risk — fix experience fast</Li>
              <Li b="Free Riders:">monetize (raise prices, add fees) or reduce service cost</Li>
              <Li b="Lost Cause:">exit or minimize — every interaction destroys value</Li>
              <Li red b="TRAP:">Large revenue ≠ profitable. Always map to quadrant first.</Li>
            </Sec>

            <Sec title="STP — Segmentation, Targeting, Positioning" color="#7b4f00">
              <Sub>SEGMENTATION TYPES</Sub>
              <Li b="Geographic:">region, city size, climate</Li>
              <Li b="Demographic:">age, income, gender, marital status</Li>
              <Li b="Psychographic:">lifestyle, values, attitudes, personality</Li>
              <Li b="Behavioral:">usage intensity, consumption frequency, loyalty</Li>
              <Li red b="TRAP:">Lifestyle = PSYCHOGRAPHIC (not behavioral)</Li>
              <Li red b="TRAP:">Marital status = DEMOGRAPHIC (not psychographic)</Li>
              <Li red b="TRAP:">Behavioral = usage intensity AND consumption frequency</Li>
              <Sub>POSITIONING TYPES</Sub>
              <Li b="Vertical:">everyone prefers more, WTP differs (BMW 3-series vs 7-series — both "better" but one costs more)</Li>
              <Li b="Horizontal:">preferences genuinely differ regardless of income (BMW 3-series vs M3 — not objectively better, just different taste)</Li>
              <Note>Simpson's Paradox: aggregate data can show the EXACT OPPOSITE of what's true within each segment. Hospital A looks worse overall but is better in every patient severity tier — it just treats sicker patients. Never draw strategic conclusions from aggregate data alone.</Note>
              <Ex>Credit cards: Transactors (pay in full = interchange only, low CLV) vs Revolvers (carry balance = interest 15-24% APR, high CLV). Same demographic, completely different CLV — behavioral segmentation reveals what demographic segmentation hides.</Ex>
            </Sec>

          </div>

          {/* ── P1 COL 3 ── */}
          <div style={s.col}>

            <Sec title="EVC — Economic Value to Customer" color="#1a6b3c">
              <Code>EVC = Reference Value + Differentiation Value</Code>
              <Code>Price floor = Cost · Price ceiling = EVC</Code>
              <Row l="RefV" v="price of the closest competing substitute" />
              <Row l="DiffV" v="Σ(your advantages − your disadvantages) in $" />
              <EVCLineMini />
              <Note>Interpretation: EVC is what a perfectly rational homo economicus would pay. Actual price ≠ EVC — it's constrained by competition, fairness norms, and how much value you want to share with the customer. Consumer utility = Economic utility (EVC−Price) + Psychological utility (fairness perception). Even if EVC is very high, charging it can destroy loyalty if it feels exploitative.</Note>
              <Ex>Pump: Ref=$10K · +$16K elec saving · +$2.5K repairs · −$1.5K install → DiffV=$11K → EVC=$21,000</Ex>
              <Li>Coke vending: temperature pricing = "act of god" = fairness violation → brand damage even if EVC is high in heat</Li>
              <Li red b="TRAP:">EVC = CEILING, not recommendation. Fairness and competition constrain real price.</Li>
            </Sec>

            <Sec title="Conjoint Analysis" color="#2d5a27">
              <Code>Total Utility = Σ part-worths for ALL attributes</Code>
              <Code>Importance = MAX − MIN within attribute (RANGE)</Code>
              <Code>Rel. Importance = range ÷ Σ(all attribute ranges)</Code>
              <Code>Utils/$ = |Δutility| / |Δprice| between known levels</Code>
              <ConjointMini />
              <Note>Interpretation: Importance measures how much an attribute can SWING total utility — not which attribute level scores highest. An attribute with a wide range is a competitive battleground; a narrow-range attribute is a "table stakes" feature. Price almost always has the widest range.</Note>
              <Sub>PRICE PARITY — 4 STEPS</Sub>
              <Li>1. Reference product total utility</Li>
              <Li>2. Your product non-price utility</Li>
              <Li>3. Needed price utility = ref total − your non-price</Li>
              <Li>4. Interpolate: price = lower_P + (needed−lower_U)/utils_per_$</Li>
              <Li red b="TRAP:">Sum ALL attributes — never compare products on one attribute alone</Li>
              <Ex>Air fryer: Philips non-price=1300, need 850 utils, 10u/$  → parity=$89+25=$114</Ex>
              <Ex>Laptop: Dell parity = $1400+(5.3−4.0)/0.01 = $1,530</Ex>
            </Sec>

          </div>
        </div>

        {/* P1 Footer */}
        <div style={{ borderTop: '1px solid #bbb', marginTop: '5px', paddingTop: '2px',
          fontSize: '6.5pt', color: '#888', display: 'flex', justifyContent: 'space-between' }}>
          <span>EMBA 206 · Spring 2026 · UC Berkeley Haas</span>
          <span>Key cases: Kanthal (Two Sides) · Get Fit Gyms (CLV $501.33) · Credit Cards (STP behavioral) · Coke Vending (EVC + fairness) · Air Fryer (Conjoint $114)</span>
          <span>Page 1 of 2 — Built by Rohit Mishra</span>
        </div>
      </div>

      {/* Screen gap between pages */}
      <div className="no-print" style={{ height: '20px' }} />

      {/* ═══════════════════════════ PAGE 2 ═══════════════════════════ */}
      <div className="cs-page" style={s.page}>
        <PageHeader page="2" title="Pricing, Communication & Analytics" />

        <div style={s.grid}>

          {/* ── P2 COL 1 ── */}
          <div style={s.col}>

            <Sec title="Product Line Pricing & IC Constraint" color="#8b1a1a">
              <Code>IC: WTP_H(H) − P_H ≥ WTP_H(L) − P_L</Code>
              <Code>→ Max P_H = WTP_H(H) − WTP_H(L) + P_low</Code>
              <ICConstraintMini />
              <Note>Interpretation: The IC constraint forces a DISCOUNT on the premium product equal to how much the high-type values the low product. If the low product is very attractive to the high segment (high WTP), the forced discount is large and the product line likely fails vs. single product. Cannibalization cost = WTP_high(high) − P_high.</Note>
              <Sub>4-STEP PROCESS</Sub>
              <Li>1. Benchmark single product: test every price × segment</Li>
              <Li>2. Set P_low = WTP_low for low product</Li>
              <Li>3. Apply IC → max P_high</Li>
              <Li>4. Check both: low-type won't switch UP, high-type won't switch DOWN</Li>
              <Li>5. Compare product line profit vs single product profit</Li>
              <Li red b="TRAP:">ALWAYS benchmark single product first before evaluating PL</Li>
              <Li red b="TRAP:">Check BOTH switching directions, not just one</Li>
              <Ex>Dell: Single $1,500×100=$150K | PL 60×$500+40×$900=$66K → SINGLE WINS by $84K</Ex>
              <Ex>Why PL fails: Personal at $900 get surplus $600 ($1500−$900) {">"} $0 → they buy high product → segmentation breaks</Ex>
              <Note>PL beats single ONLY when market expansion revenue {">"} total cannibalization cost. In Dell, $1,100 IC discount × 40 business users = $44K loss, plus segmentation failure on top.</Note>
            </Sec>

          </div>

          {/* ── P2 COL 2 ── */}
          <div style={s.col}>

            <Sec title="Advertising Strategy" color="#4a3500">
              <Li b="Emotional:">differentiate in substitutable/commodity categories; increase involvement in low-interest categories</Li>
              <Li b="Rational:">informative; best for high-involvement, research-heavy categories (cars, software, B2B)</Li>
              <Sub>FEAR APPEALS — INVERTED-U (exam tested)</Sub>
              <FearCurveMini />
              <Note>Design rule: Fear creates urgency, but only works if paired with a SPECIFIC, ACHIEVABLE solution. "Here's the threat + here's exactly how to prevent it." Without the solution, fear creates helplessness, not action. Michelin tires "a lot is riding on your tires" = moderate fear + brand as solution.</Note>
              <Li b="Humor:">memorability tool; must NOT overshadow the product benefit; always pre-test; risky for luxury/premium brands</Li>
              <Li b="Comparative:">challengers on VERIFIABLE (measurable) attributes only; market leaders should avoid — naming a competitor legitimizes them as an equal</Li>
              <Sub>FULL FUNNEL — 1+1=3 EFFECT</Sub>
              <FullFunnelMini />
              <Note>Brand and performance advertising are NOT substitutes — they address different stages of the purchase journey. Brand ads build the awareness and trust that make performance ads work. Running only performance ads depletes the top-of-funnel pool, causing rising CAC over time (symptom of brand underinvestment, not ad quality).</Note>
            </Sec>

          </div>

          {/* ── P2 COL 3 ── */}
          <div style={s.col}>

            <Sec title="Freemium & Promotions" color="#1a4a4a">
              <Sub>FREEMIUM — 4 RATIONALES (exam: name 3)</Sub>
              <Li>1. Viral user base scaling — free users recruit others at zero AC</Li>
              <Li>2. Product learning — users who experience value self-select to upgrade</Li>
              <Li>3. Network effects — larger installed base benefits all users</Li>
              <Li>4. Switching costs — deep integration makes leaving costly (Dropbox)</Li>
              <FreemiumMini />
              <Note>Key design insight: The free tier must be good enough to create genuine value (so viral growth works) but limited enough that users want more. The best mechanism is adding a "bad" rather than removing features — Spotify uses ads + no offline + lower audio quality. This preserves acquisition value while motivating upgrades.</Note>
              <Li red b="TRAP:">Traffic generation (rich free) and Upgrade conversion (limited free) are in direct conflict — balance is the strategic decision</Li>
              <Sub>PULL vs PUSH PROMOTIONS</Sub>
              <Li b="Pull (consumer):">coupons, samples, rebates, contests → build consumer demand that forces retailers to stock you</Li>
              <Li b="Push (trade):">quantity discounts, allowances, slotting fees → motivate channel to stock and feature you</Li>
              <Li>Over-promotion risks: reference price shift · strategic waiting · stockpiling · brand equity erosion</Li>
              <Sub>PROMOTION ROI</Sub>
              <Code>Baseline = regression prediction (NOT simple average)</Code>
              <Code>Incremental = Actual Sales − Baseline</Code>
              <Code>ROI = (Incremental Rev − Promo Cost) / Promo Cost</Code>
              <Note>The baseline must come from a regression model that controls for seasonality, competitor activity, and trends. Using the average of non-promotional months overstates ROI because seasonal peaks (December, etc.) inflate the "incremental" — you're attributing the seasonal lift to the promotion.</Note>
              <Sub>AI → CLV LEVER MAPPING</Sub>
              <Li b="Recommendations →">Expansion (cross-sell/up-sell from existing customers — Amazon 35% of revenue)</Li>
              <Li b="Churn prediction →">Retention (intervene before customer leaves — highest-leverage lever)</Li>
              <Li b="Lookalike modeling →">Acquisition (target prospects like your Stars)</Li>
              <Li b="Dynamic pricing →">Margin/Expansion (intersects with EVC and fairness considerations)</Li>
              <Li red b="EXAM:">Always map AI tool to its CLV lever — then use lever sensitivity to rank impact</Li>
            </Sec>

          </div>
        </div>

        {/* P2 Footer */}
        <div style={{ borderTop: '1px solid #bbb', marginTop: '5px', paddingTop: '2px',
          fontSize: '6.5pt', color: '#888', display: 'flex', justifyContent: 'space-between' }}>
          <span>HIGH-PROBABILITY EXAM TRAPS: r^(t−1) cumulative · quarterly ×4 · EVC=ceiling · Importance=range · Lifestyle=psycho · Marital=demo · IC both directions · single product benchmark first · large revenue ≠ profitable · aggregate data (Simpson's) · fear too high = avoidance · comparative risky for leaders · price parity ≠ optimal price</span>
          <span>Page 2 of 2 — Built by Rohit Mishra</span>
        </div>
      </div>
    </div>
  );
}
