import { useEffect } from 'react';

const s = {
  page: {
    width: '794px', minHeight: '1123px', background: 'white', color: '#000',
    fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '9pt', lineHeight: '1.3',
    padding: '18px 20px', margin: '0 auto', boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '7px', marginTop: '5px' },
  col: { display: 'flex', flexDirection: 'column', gap: '5px' },
  section: { border: '1px solid #bbb', borderRadius: '2px', overflow: 'hidden' },
  sHead: (c) => ({ background: c, color: 'white', fontWeight: 'bold', fontSize: '8pt',
    padding: '2px 5px', letterSpacing: '0.03em' }),
  body: { padding: '3px 5px 4px' },
  code: { background: '#f0f0f0', border: '1px solid #ccc', borderRadius: '2px',
    padding: '1px 4px', fontFamily: 'monospace', fontSize: '8pt', margin: '1px 0', display: 'block' },
  trap: { background: '#fff3cd', border: '1px solid #e6ac00', borderRadius: '2px',
    padding: '1px 4px', fontSize: '8pt', margin: '1px 0' },
  ex: { background: '#e8f5e9', borderLeft: '2px solid #388e3c',
    padding: '1px 4px', fontSize: '8pt', margin: '1px 0', fontFamily: 'monospace' },
  row: { display: 'flex', gap: '3px', margin: '1px 0', fontSize: '8.5pt' },
  lbl: { fontWeight: 'bold', color: '#1a3a6c', minWidth: '28px', flexShrink: 0 },
  sub: { fontWeight: 'bold', fontSize: '7.5pt', color: '#333', marginTop: '3px', marginBottom: '1px' },
  li: { margin: '1px 0', paddingLeft: '8px', fontSize: '8.5pt' },
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
function Trap({ children }) { return <div style={s.trap}>⚠ {children}</div>; }
function Ex({ children }) { return <div style={s.ex}>{children}</div>; }
function Sub({ children }) { return <div style={s.sub}>{children}</div>; }
function Li({ b, children }) {
  return <div style={s.li}>• {b ? <b>{b}</b> : null}{b ? ' ' : ''}{children}</div>;
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
          box-shadow: none !important; padding: 10mm 10mm !important; margin: 0 !important; }
        #cs-page * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `;
    document.head.appendChild(style);
    return () => document.getElementById('cs-print')?.remove();
  }, []);

  return (
    <div>
      {/* Screen controls */}
      <div className="no-print mb-4 flex items-center justify-between bg-gray-900 rounded-lg p-4 border border-gray-700">
        <div>
          <p className="text-white font-semibold">A4 · 1 side · 9pt font · print-ready</p>
          <p className="text-gray-400 text-sm mt-1">Cmd+P (Mac) or Ctrl+P (Windows) · set destination to "Save as PDF" · paper size A4 · no margins</p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg transition-colors"
        >
          🖨 Print / Save PDF
        </button>
      </div>

      {/* A4 Page Preview */}
      <div id="cs-page" style={s.page}>

        {/* Header */}
        <div style={{ borderBottom: '2px solid #1a3a6c', paddingBottom: '4px', marginBottom: '5px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontWeight: 'bold', fontSize: '10.5pt', color: '#1a3a6c' }}>
            EMBA 206 Marketing Management — Final Exam Cheat Sheet
          </span>
          <span style={{ fontSize: '7.5pt', color: '#555' }}>
            Haas · Iyer · Spring 2026 · 100 pts (40/30/30) · 2 help pages allowed
          </span>
        </div>

        <div style={s.grid}>

          {/* ── COLUMN 1 ─────────────────────────────────── */}
          <div style={s.col}>

            <Sec title="CLV — GENERAL FORMULA" color="#1a4a8c">
              <Code>CLV = Σ [m × r^(t-1) / (1+i)^t] − AC</Code>
              <Code>Infinite horizon: CLV = m × [r / (1+i−r)]</Code>
              <Code>Margin Multiple = r / (1+i−r)</Code>
              <Code>Relative CLV = Absolute CLV − AC</Code>
              <div style={{ marginTop: '2px' }}>
                <Row l="m" v="annual profit margin (revenue − COGS)" />
                <Row l="r" v="retention rate (e.g. 0.80)" />
                <Row l="i" v="discount/cost-of-capital rate" />
                <Row l="AC" v="acquisition cost" />
              </div>
              <Trap>r^(t−1) is CUMULATIVE: Y1=r⁰=1, Y2=r¹, Y3=r², Y4=r³</Trap>
              <Trap>Quarterly sub: multiply (Q rev − Q cost) × 4 = annual m FIRST</Trap>
              <Ex>Get Fit: m=240, r=80%, i=9%, AC=150, N=5</Ex>
              <Ex>Y1=220.18 · Y2=161.60 · Y3=118.60 · Y4=87.05 · Y5=63.89</Ex>
              <Ex>Absolute=$651.33 → Relative CLV = $651.33−$150 = $501.33</Ex>
            </Sec>

            <Sec title="CLV LEVERS (1% impact on firm value)" color="#2a6496">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3px', margin: '2px 0' }}>
                <div style={{ background: '#1a4a8c', color: 'white', borderRadius: '3px', padding: '3px 4px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '10pt' }}>4.9%</div>
                  <div style={{ fontSize: '7.5pt' }}>+1% Retention</div>
                </div>
                <div style={{ background: '#2d6a4f', color: 'white', borderRadius: '3px', padding: '3px 4px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '10pt' }}>1.1%</div>
                  <div style={{ fontSize: '7.5pt' }}>+1% Margin</div>
                </div>
                <div style={{ background: '#555', color: 'white', borderRadius: '3px', padding: '3px 4px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '10pt' }}>0.1%</div>
                  <div style={{ fontSize: '7.5pt' }}>−1% Acq Cost</div>
                </div>
              </div>
              <Trap>Retention is 49× more impactful than acquisition cost reduction</Trap>
            </Sec>

            <Sec title="TWO SIDES OF VALUE MATRIX" color="#5a2d82">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', margin: '2px 0', fontSize: '8pt' }}>
                <div style={{ background: '#fff3cd', border: '1px solid #e6ac00', borderRadius: '2px', padding: '3px 4px' }}>
                  <b>⚠ Vulnerable</b><br/>Lo Exp / Hi Profit<br/><i>→ Fix experience fast</i>
                </div>
                <div style={{ background: '#d4edda', border: '1px solid #28a745', borderRadius: '2px', padding: '3px 4px' }}>
                  <b>⭐ Stars</b><br/>Hi Exp / Hi Profit<br/><i>→ Invest, cross-sell</i>
                </div>
                <div style={{ background: '#f8d7da', border: '1px solid #dc3545', borderRadius: '2px', padding: '3px 4px' }}>
                  <b>😵 Lost Cause</b><br/>Lo Exp / Lo Profit<br/><i>→ Exit relationship</i>
                </div>
                <div style={{ background: '#d1ecf1', border: '1px solid #17a2b8', borderRadius: '2px', padding: '3px 4px' }}>
                  <b>🆓 Free Rider</b><br/>Hi Exp / Lo Profit<br/><i>→ Monetize / reduce cost</i>
                </div>
              </div>
              <div style={{ fontSize: '7.5pt', color: '#555', marginTop: '2px' }}>
                x-axis: Customer Experience (creating value) · y-axis: Profitability (capturing value)
              </div>
              <Ex>Kanthal: large accounts = Free Riders/Lost Causes despite big revenue. Small at list price = Stars. Fired largest → profit doubled.</Ex>
            </Sec>

            <Sec title="STP PROCESS" color="#7b4f00">
              <Sub>SEGMENTATION TYPES</Sub>
              <Li b="Geographic:">region, city size, climate</Li>
              <Li b="Demographic:">age, income, gender, MARITAL STATUS</Li>
              <Li b="Psychographic:">LIFESTYLE, values, attitudes</Li>
              <Li b="Behavioral:">USAGE INTENSITY, CONSUMPTION FREQUENCY</Li>
              <Trap>Lifestyle = PSYCHOGRAPHIC (not behavioral) · Marital = DEMOGRAPHIC</Trap>
              <Trap>Exam: behavioral = usage intensity AND consumption frequency</Trap>
              <Sub>POSITIONING TYPES</Sub>
              <Li b="Vertical:">everyone prefers more, WTP differs (BMW 3 vs 7-series)</Li>
              <Li b="Horizontal:">preference differs regardless of income (3-series vs M3)</Li>
              <Trap>Simpson's Paradox: aggregate data can show OPPOSITE of segment reality</Trap>
            </Sec>

          </div>

          {/* ── COLUMN 2 ─────────────────────────────────── */}
          <div style={s.col}>

            <Sec title="EVC — ECONOMIC VALUE TO CUSTOMER" color="#1a6b3c">
              <Code>EVC = Reference Value + Differentiation Value</Code>
              <Code>Price floor = Cost · Price ceiling = EVC</Code>
              <Row l="RefV" v="price of closest competing substitute" />
              <Row l="DiffV" v="Σ(attribute advantages − disadvantages)" />
              <div style={{ ...s.code, marginTop: '2px' }}>
                Consumer utility = Economic utility (EVC−P) + Psychological utility (fairness)
              </div>
              <Ex>Pump: Ref=$10K · elec saving $2K/yr×5yr=+$10K · repairs $500/yr×5yr=+$2.5K · install mod=−$1.5K · DiffV=$11K · EVC=$21,000</Ex>
              <Trap>EVC is the CEILING, not the recommendation. Fairness norms constrain actual price.</Trap>
              <Li>Coke vending: temperature pricing = fairness violation → brand damage</Li>
              <Li>Price discrimination under competition → intensifies price wars per segment</Li>
            </Sec>

            <Sec title="PRODUCT LINE PRICING & IC CONSTRAINT" color="#8b1a1a">
              <Sub>IC CONSTRAINT (Incentive Compatibility)</Sub>
              <Code>WTP_H(H) − P_H ≥ WTP_H(L) − P_L</Code>
              <Code>→ P_H ≤ WTP_H(H) − WTP_H(L) + P_L</Code>
              <Sub>4-STEP PROCESS</Sub>
              <Li>1. Benchmark single product: test each price × segment</Li>
              <Li>2. Set P_low = WTP_low(low). Apply IC to get max P_high</Li>
              <Li>3. Compare product line profit vs single product profit</Li>
              <Li>4. Check low-type surplus from high product: if {'>'} 0 they switch UP → PL fails</Li>
              <Trap>Check BOTH directions: low-type switches up? High-type switches down?</Trap>
              <Ex>Dell: Single $1500×100=$150K | PL: 60×$500+40×$900=$66K → SINGLE WINS</Ex>
              <Ex>IC: 2000−P ≥ 1600−500=1100 → P≤$900. Cannibalization=$1,100/unit</Ex>
              <Ex>Check: personal at $900 → surplus=$1500−$900=$600 {'>'} $0 → they buy high → PL breaks</Ex>
              <Trap>Cannibalization cost = WTP_H(H) − P_H. High if low product is valuable to high-type.</Trap>
              <Li>PL beats single ONLY when market expansion {'>'} cannibalization cost</Li>
            </Sec>

            <Sec title="CONJOINT ANALYSIS" color="#2d5a27">
              <Sub>KEY FORMULAS</Sub>
              <Code>Total Utility = Σ part-worth utilities for ALL attributes</Code>
              <Code>Importance = MAX utility − MIN utility (within attribute)</Code>
              <Code>Rel. Importance = attribute range ÷ Σ(all attribute ranges)</Code>
              <Code>Utils/$ = |Δutility| / |Δprice| between known price levels</Code>
              <Sub>PRICE PARITY — 4 STEPS</Sub>
              <Li>1. Compute reference product total utility</Li>
              <Li>2. Compute your product's non-price utility</Li>
              <Li>3. Needed price utility = ref total − your non-price</Li>
              <Li>4. Interpolate: price = lower_P + (needed−lower_U)/utils_per_$</Li>
              <Trap>Importance = RANGE not the highest value. Never compare single attributes.</Trap>
              <Ex>Laptop: Acer 3.5GHz AMD $1K = 4.0+6.0+4.3+6.3=20.6 {'>'} Dell 2.5GHz Intel $1.6K=19.9</Ex>
              <Ex>Dell parity: non-price=16.6; need 4.0 price utils; $1400=5.3, $1600=3.3 → 0.01u/$</Ex>
              <Ex>Parity = $1400 + (5.3−4.0)/0.01 = $1,530</Ex>
              <Ex>Air fryer: Philips non-price=1300; need 850 utils; utils/$=10 → parity=$89+25=$114</Ex>
            </Sec>

          </div>

          {/* ── COLUMN 3 ─────────────────────────────────── */}
          <div style={s.col}>

            <Sec title="ADVERTISING STRATEGY" color="#4a3500">
              <Row l="Emot." v="differentiate in substitutable/commodity categories" />
              <Row l="Rat." v="high-involvement, research-heavy (cars, software)" />
              <Sub>FEAR APPEALS — INVERTED-U</Sub>
              <Li>Moderate fear = optimal engagement + behavior change</Li>
              <Li>Too much fear → denial/avoidance ("won't happen to me")</Li>
              <Li>Always pair fear with a SPECIFIC, ACHIEVABLE solution</Li>
              <Trap>Fear too high = backfire. Graphic footage → avoidance not action.</Trap>
              <Sub>OTHER PLATFORMS</Sub>
              <Li b="Humor:">memorability tool; must NOT overshadow product benefit; pre-test</Li>
              <Li b="Comparative:">challengers on VERIFIABLE attributes only; leaders avoid (legitimizes rivals)</Li>
              <Sub>FULL FUNNEL</Sub>
              <Code>Brand (awareness) + Performance (conversion) = complementary</Code>
              <Li>TikTok data: brand ads → performance conversion↑. "1+1=3" effect.</Li>
              <Li>Brand awareness makes performance ads more effective. Neither replaces the other.</Li>
            </Sec>

            <Sec title="FREEMIUM & PROMOTIONS" color="#1a4a4a">
              <Sub>FREEMIUM RATIONALES (exam: name 3)</Sub>
              <Li>1. Scale user base virally without ad spend (Dropbox)</Li>
              <Li>2. Product learning → users who experience value upgrade</Li>
              <Li>3. Network effects — free users expand installed base for all</Li>
              <Li>4. Switching costs — free users get locked in (files everywhere)</Li>
              <Code>Key tradeoff: Traffic ↑ (rich free tier) vs Upgrades ↑ (limited free tier)</Code>
              <Li>Fix cannibalization: add a "bad" (Spotify: ads + no offline + quality limits)</Li>
              <Sub>PULL vs PUSH</Sub>
              <Li b="Pull (consumer):">coupons, samples, rebates, contests — build demand</Li>
              <Li b="Push (trade):">quantity discounts, allowances, display fees — motivate channel</Li>
              <Sub>OVER-PROMOTION RISKS</Sub>
              <Li>Reference price shift · Strategic waiting · Stockpiling · Brand erosion</Li>
              <Sub>PROMOTION ROI</Sub>
              <Code>Baseline = regression prediction (NOT simple average)</Code>
              <Code>Incremental = Actual Sales − Baseline</Code>
              <Code>ROI = (Incremental Rev − Promo Cost) / Promo Cost</Code>
              <Trap>Naive baseline overstates ROI — must control for seasonality via regression</Trap>
            </Sec>

            <Sec title="AI & CLV LEVERS" color="#2a3a6c">
              <Li b="Recommendations →">Expansion lever (cross-sell/up-sell). Amazon=35% revenue.</Li>
              <Li b="Churn prediction →">Retention lever (proactive intervention).</Li>
              <Li b="Lookalike modeling →">Acquisition lever (target prospects like Stars).</Li>
              <Li b="Dynamic pricing →">Margin lever. Intersects with EVC and fairness.</Li>
              <Trap>On exam: always map AI capability to the CLV lever it targets</Trap>
            </Sec>

            <Sec title="EXAM TRAPS — HIGH PROBABILITY" color="#7a0000">
              <Trap>r^(t−1) CUMULATIVE: Y1=r⁰=1, Y2=r, Y3=r², Y4=r³ — most common calc error</Trap>
              <Trap>Quarterly subscription → × 4 first to get ANNUAL margin before CLV formula</Trap>
              <Trap>CLV uses MARGIN not price (subtract variable costs)</Trap>
              <Trap>EVC = CEILING not recommended price. Competition + fairness constrain actual price.</Trap>
              <Trap>Conjoint importance = RANGE (max−min) not the highest utility level</Trap>
              <Trap>Never compare products on a SINGLE conjoint attribute — always sum ALL attributes</Trap>
              <Trap>Lifestyle = PSYCHOGRAPHIC · Marital status = DEMOGRAPHIC</Trap>
              <Trap>Behavioral segmentation = usage intensity + consumption frequency (not lifestyle)</Trap>
              <Trap>IC constraint: check BOTH directions — low-type switch up AND high-type switch down</Trap>
              <Trap>Always benchmark SINGLE PRODUCT FIRST before evaluating a product line</Trap>
              <Trap>Two Sides: large revenue ≠ profitable. Map to quadrant before prescribing strategy.</Trap>
              <Trap>Simpson's Paradox: aggregate trend can reverse within segments — always segment first</Trap>
              <Trap>Fear too high = avoidance. Must pair with specific achievable solution.</Trap>
              <Trap>Comparative ads: risky for market leaders — legitimizes the competitor you name</Trap>
              <Trap>Product line beats single ONLY when market expansion {'>'} cannibalization cost</Trap>
              <Trap>Price parity ≠ optimal price. It's where consumer is INDIFFERENT between two products.</Trap>
            </Sec>

          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #bbb', marginTop: '6px', paddingTop: '3px',
          display: 'flex', justifyContent: 'space-between', fontSize: '7pt', color: '#888' }}>
          <span>EMBA 206 · Spring 2026 · UC Berkeley Haas</span>
          <span>Key cases: Kanthal (Two Sides) · Get Fit Gyms (CLV $501.33) · Dell Laptops (PL vs Single $150K vs $66K) · Air Fryer (Conjoint $114) · Amazon Prime (Retention+Expansion) · Spotify (Freemium) · TikTok (Full Funnel)</span>
          <span>Prof. Ganesh Iyer</span>
        </div>

      </div>
    </div>
  );
}
