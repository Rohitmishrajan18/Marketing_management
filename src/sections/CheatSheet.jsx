import { useEffect } from 'react';

const s = {
  page: {
    width: '794px', minHeight: '1123px', background: 'white', color: '#000',
    fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '8pt', lineHeight: '1.2',
    padding: '12px 14px', margin: '0 auto', boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
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
    padding: '1px 3px', fontSize: '7pt', margin: '1px 0', fontFamily: 'monospace' },
  row: { display: 'flex', gap: '3px', margin: '0.5px 0', fontSize: '7.5pt' },
  lbl: { fontWeight: 'bold', color: '#1a3a6c', minWidth: '26px', flexShrink: 0 },
  sub: { fontWeight: 'bold', fontSize: '6.5pt', color: '#444', marginTop: '2px', marginBottom: '1px',
    borderBottom: '1px dotted #ccc' },
  li: { margin: '0.5px 0', paddingLeft: '7px', fontSize: '7.5pt' },
  trap: { fontWeight: 'bold', color: '#a00', fontSize: '7pt' },
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

export default function CheatSheet() {
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'cs-print';
    style.textContent = `
      @media print {
        @page { size: A4 portrait; margin: 0; }
        header, footer, .no-print { display: none !important; }
        main { padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
        #cs-page { width: 100% !important; min-height: 100vh !important;
          box-shadow: none !important; padding: 8mm 8mm !important; margin: 0 !important; font-size: 8pt !important; }
        #cs-page * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `;
    document.head.appendChild(style);
    return () => document.getElementById('cs-print')?.remove();
  }, []);

  return (
    <div>
      <div className="no-print mb-4 flex items-center justify-between bg-gray-900 rounded-lg p-4 border border-gray-700">
        <div>
          <p className="text-white font-semibold">A4 · 1 side · 8pt font · print-ready</p>
          <p className="text-gray-400 text-sm mt-1">Cmd+P → Save as PDF → Paper: A4 → Margins: None</p>
        </div>
        <button onClick={() => window.print()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg transition-colors">
          🖨 Print / Save PDF
        </button>
      </div>

      <div id="cs-page" style={s.page}>

        {/* Header */}
        <div style={{ borderBottom: '2px solid #1a3a6c', paddingBottom: '3px', marginBottom: '4px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontWeight: 'bold', fontSize: '9.5pt', color: '#1a3a6c' }}>
            EMBA 206 Marketing Management — Final Exam Cheat Sheet
          </span>
          <span style={{ fontSize: '7pt', color: '#555' }}>
            Haas · Iyer · Spring 2026 · 100 pts (40/30/30) · 2 help pages allowed
          </span>
        </div>

        <div style={s.grid}>

          {/* ── COL 1 ── */}
          <div style={s.col}>

            <Sec title="CLV — GENERAL FORMULA" color="#1a4a8c">
              <Code>CLV = Σ [m × r^(t−1) / (1+i)^t] − AC</Code>
              <Code>Infinite: CLV = m × [r/(1+i−r)]   Margin Multiple = r/(1+i−r)</Code>
              <Code>Relative CLV = Absolute CLV − AC</Code>
              <Row l="m" v="annual profit margin (revenue − COGS)" />
              <Row l="r" v="retention rate · i = discount rate · AC = acquisition cost" />
              <Li red b="TRAP:">r^(t−1) is CUMULATIVE: Y1=1, Y2=r, Y3=r², Y4=r³</Li>
              <Li red b="TRAP:">Quarterly sub → × 4 = annual margin FIRST, then formula</Li>
              <Ex>Get Fit: m=240, r=80%, i=9%, AC=150, N=5</Ex>
              <Ex>Y1=220.18 · Y2=161.60 · Y3=118.60 · Y4=87.05 · Y5=63.89</Ex>
              <Ex>Absolute=$651.33 → Relative CLV = $651.33−$150 = $501.33</Ex>
            </Sec>

            <Sec title="CLV LEVERS (1% impact on firm value)" color="#2a6496">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', margin: '2px 0' }}>
                <div style={{ background: '#1a4a8c', color: 'white', borderRadius: '2px', padding: '2px 3px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '9pt' }}>4.9%</div>
                  <div style={{ fontSize: '6.5pt' }}>+1% Retention</div>
                </div>
                <div style={{ background: '#2d6a4f', color: 'white', borderRadius: '2px', padding: '2px 3px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '9pt' }}>1.1%</div>
                  <div style={{ fontSize: '6.5pt' }}>+1% Margin</div>
                </div>
                <div style={{ background: '#555', color: 'white', borderRadius: '2px', padding: '2px 3px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '9pt' }}>0.1%</div>
                  <div style={{ fontSize: '6.5pt' }}>−1% Acq Cost</div>
                </div>
              </div>
              <Li>Retention is 49× more impactful than acquisition cost. Most firms spend wrong.</Li>
              <Li>Bundling reduces churn up to 50% (Cox: TV+HSI+Phone=1.4% vs TV alone=3.0%)</Li>
            </Sec>

            <Sec title="TWO SIDES OF VALUE MATRIX" color="#5a2d82">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', margin: '2px 0', fontSize: '7.5pt' }}>
                <div style={{ background: '#fff3cd', border: '1px solid #e6ac00', borderRadius: '2px', padding: '2px 3px' }}>
                  <b>⚠ Vulnerable</b> Lo Exp/Hi Profit<br/>→ Fix experience fast (will churn)
                </div>
                <div style={{ background: '#d4edda', border: '1px solid #28a745', borderRadius: '2px', padding: '2px 3px' }}>
                  <b>⭐ Stars</b> Hi Exp/Hi Profit<br/>→ Invest, cross-sell, grow
                </div>
                <div style={{ background: '#f8d7da', border: '1px solid #dc3545', borderRadius: '2px', padding: '2px 3px' }}>
                  <b>😵 Lost Cause</b> Lo/Lo<br/>→ Minimize, exit relationship
                </div>
                <div style={{ background: '#d1ecf1', border: '1px solid #17a2b8', borderRadius: '2px', padding: '2px 3px' }}>
                  <b>🆓 Free Rider</b> Hi Exp/Lo Profit<br/>→ Monetize or reduce service
                </div>
              </div>
              <Ex>Kanthal: large accounts = Free Riders despite big revenue. Small at list price = Stars. Fired largest → profit doubled.</Ex>
              <Li red b="TRAP:">Large revenue ≠ profitable. Always map to quadrant first.</Li>
            </Sec>

            <Sec title="STP PROCESS" color="#7b4f00">
              <Li b="Geographic:">region, city size, climate</Li>
              <Li b="Demographic:">age, income, gender, marital status</Li>
              <Li b="Psychographic:">lifestyle, values, attitudes</Li>
              <Li b="Behavioral:">usage intensity, consumption frequency</Li>
              <Li red b="TRAP:">Lifestyle = PSYCHOGRAPHIC · Marital = DEMOGRAPHIC</Li>
              <Li red b="TRAP:">Behavioral = usage intensity + consumption FREQUENCY</Li>
              <Li b="Vertical:">everyone prefers more, WTP differs (BMW 3 vs 7-series)</Li>
              <Li b="Horizontal:">preferences differ regardless of income (3-series vs M3)</Li>
              <Li red b="TRAP:">Simpson's Paradox — aggregate can show OPPOSITE of segment reality</Li>
            </Sec>

          </div>

          {/* ── COL 2 ── */}
          <div style={s.col}>

            <Sec title="EVC — PRICE CEILING" color="#1a6b3c">
              <Code>EVC = Reference Value + Differentiation Value</Code>
              <Code>Price floor = Cost · Price ceiling = EVC</Code>
              <Row l="RefV" v="price of closest competing substitute" />
              <Row l="DiffV" v="Σ(attribute advantages − disadvantages)" />
              <Li>Consumer utility = Economic (EVC−P) + Psychological (fairness)</Li>
              <Li red b="TRAP:">EVC = CEILING, not recommendation. Fairness constrains actual price.</Li>
              <Li>Coke vending: heat-based pricing = fairness violation → brand damage</Li>
              <Ex>Pump: Ref=$10K · +$10K elec · +$2.5K repairs · −$1.5K install · DiffV=$11K · EVC=$21,000</Ex>
              <Li>Price discrimination under competition → intensifies price wars per segment</Li>
            </Sec>

            <Sec title="PRODUCT LINE PRICING & IC CONSTRAINT" color="#8b1a1a">
              <Code>IC: WTP_H(H) − P_H ≥ WTP_H(L) − P_L</Code>
              <Code>→ P_H ≤ WTP_H(H) − WTP_H(L) + P_L</Code>
              <Sub>4-STEP PROCESS</Sub>
              <Li>1. Benchmark single product: test each price × segment combo</Li>
              <Li>2. Set P_low = WTP_low(low). Apply IC → get max P_high</Li>
              <Li>3. Compare product line profit vs single product profit</Li>
              <Li>4. Check low-type surplus from high product: if {'>'} 0 they switch UP → PL fails</Li>
              <Li red b="TRAP:">Check BOTH directions. ALWAYS benchmark single product first.</Li>
              <Ex>Dell: Single $1500×100=$150K | PL: 60×$500+40×$900=$66K → SINGLE WINS</Ex>
              <Ex>IC: 2000−P ≥ 1600−500 → P_high≤$900. Cannibalization=$1,100/unit.</Ex>
              <Ex>Personal at $900: surplus=$1500−$900=$600 {'>'} $0 → they switch up → PL breaks</Ex>
              <Li>PL beats single ONLY when market expansion {'>'} cannibalization cost</Li>
            </Sec>

            <Sec title="CONJOINT ANALYSIS" color="#2d5a27">
              <Code>Total Utility = Σ part-worths for ALL attributes (never skip)</Code>
              <Code>Importance = MAX − MIN within attribute (RANGE, not level)</Code>
              <Code>Rel. Importance = attribute range ÷ Σ(all attribute ranges)</Code>
              <Code>Utils/$ = |Δutility| / |Δprice| between known price levels</Code>
              <Sub>PRICE PARITY</Sub>
              <Li>1. Ref total utility · 2. Your non-price utility · 3. Needed price utility = ref − non-price · 4. Interpolate</Li>
              <Li red b="TRAP:">Importance = RANGE not the highest value. Sum ALL attributes.</Li>
              <Ex>Laptop: Acer 3.5GHz AMD $1K=20.6 {'>'} Dell 2.5GHz Intel $1.6K=19.9 → Acer wins</Ex>
              <Ex>Dell parity: non-price=16.6; need 4.0; $1400=5.3, $1600=3.3 → 0.01u/$ → $1,530</Ex>
              <Ex>Air fryer: Philips non-price=1300; need 850 utils; 10u/$ → $89+25=$114</Ex>
            </Sec>

          </div>

          {/* ── COL 3 ── */}
          <div style={s.col}>

            <Sec title="ADVERTISING STRATEGY" color="#4a3500">
              <Li b="Emotional:">differentiate in substitutable/commodity categories</Li>
              <Li b="Rational:">high-involvement, research-heavy (cars, software, financial)</Li>
              <Sub>FEAR APPEALS — INVERTED-U</Sub>
              <Li>Moderate fear = optimal. Too much → denial/avoidance.</Li>
              <Li>Always pair fear with a SPECIFIC, ACHIEVABLE solution.</Li>
              <Li red b="TRAP:">Fear too high = backfire. Graphic footage → avoidance not action.</Li>
              <Li b="Humor:">memorability; must NOT overshadow product benefit; always pre-test</Li>
              <Li b="Comparative:">challengers on VERIFIABLE attributes. Leaders avoid (legitimizes rivals).</Li>
              <Sub>FULL FUNNEL</Sub>
              <Code>Brand (awareness) + Performance (conversion) = complementary</Code>
              <Li>TikTok: brand ads → performance conversion↑. "1+1=3" effect. Neither replaces the other.</Li>
            </Sec>

            <Sec title="FREEMIUM & PROMOTIONS" color="#1a4a4a">
              <Sub>FREEMIUM RATIONALES (name 3 on exam)</Sub>
              <Li>1. Scale user base virally without ad spend (Dropbox referral)</Li>
              <Li>2. Product learning → users who experience value upgrade over time</Li>
              <Li>3. Network effects — free users expand installed base for everyone</Li>
              <Li>4. Switching costs — free users get locked in (files, history)</Li>
              <Code>Tradeoff: Traffic ↑ (rich free) vs Upgrades ↑ (limited free)</Code>
              <Li>Fix cannibalization: add a "bad" — Spotify: ads + no offline + quality limits</Li>
              <Sub>PULL vs PUSH</Sub>
              <Li b="Pull (consumer):">coupons, samples, rebates → build consumer demand</Li>
              <Li b="Push (trade):">quantity discounts, allowances → motivate channel</Li>
              <Li>Over-promo risks: ref price shift · strategic waiting · stockpiling · brand erosion</Li>
              <Sub>PROMOTION ROI</Sub>
              <Code>Baseline = regression prediction (NOT simple historical average)</Code>
              <Code>Incremental = Actual − Baseline · ROI = (Incr. Rev − Cost) / Cost</Code>
              <Li red b="TRAP:">Naive baseline overstates ROI — must control for seasonality</Li>
            </Sec>

            <Sec title="AI & CLV LEVERS + QUICK TRAPS" color="#2a3a6c">
              <Li b="Recommendations →">Expansion (cross-sell/up-sell). Amazon = 35% revenue.</Li>
              <Li b="Churn prediction →">Retention (proactive intervention before churn).</Li>
              <Li b="Lookalike modeling →">Acquisition (target prospects like your Stars).</Li>
              <Li red b="EXAM:">Always map AI tool to the CLV lever it targets.</Li>
              <Sub>KEY TRAPS — QUICK REFERENCE</Sub>
              <Li red>CLV uses MARGIN not revenue (subtract COGS first)</Li>
              <Li red>r^(t−1) cumulative: Y3=r² · Quarterly → ×4 annual margin first</Li>
              <Li red>EVC = ceiling not rec · Importance = range not highest value</Li>
              <Li red>IC constraint: check BOTH directions</Li>
              <Li red>Lifestyle=PSYCHOGRAPHIC · Marital=DEMOGRAPHIC</Li>
              <Li red>Behavioral = usage intensity + consumption frequency</Li>
              <Li red>Comparative: risky for market leaders (legitimizes rivals)</Li>
              <Li red>Single product vs PL: ALWAYS benchmark single first</Li>
              <Li red>Two Sides: large revenue ≠ profitable — map to quadrant</Li>
              <Li red>Price parity = indifference point, NOT optimal price</Li>
            </Sec>

          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #bbb', marginTop: '5px', paddingTop: '2px',
          display: 'flex', justifyContent: 'space-between', fontSize: '6.5pt', color: '#888' }}>
          <span>EMBA 206 · Spring 2026 · UC Berkeley Haas</span>
          <span>Cases: Kanthal · Get Fit ($501.33) · Dell ($150K vs $66K) · Air Fryer ($114) · Amazon Prime · Spotify · TikTok · Coke Vending · Industrial Pump ($21K EVC)</span>
          <span>Built by Rohit Mishra</span>
        </div>

      </div>
    </div>
  );
}
