import { useState, useEffect } from 'react';
import Card from '../components/Card';

// ─── SLAY SCORING HELPERS ───────────────────────────────────────────────────

function getSlayGrade(pct) {
  if (pct >= 90) return { label: 'SECURED THE BAG', emoji: '👑', color: 'text-yellow-400', bg: 'bg-yellow-900/30 border-yellow-600' };
  if (pct >= 80) return { label: 'SLAY QUEEN', emoji: '💅', color: 'text-pink-400', bg: 'bg-pink-900/30 border-pink-600' };
  if (pct >= 70) return { label: 'DOING THE WORK', emoji: '📚', color: 'text-blue-400', bg: 'bg-blue-900/30 border-blue-600' };
  if (pct >= 60) return { label: 'NEEDS MORE REPS', emoji: '😤', color: 'text-orange-400', bg: 'bg-orange-900/30 border-orange-600' };
  return { label: 'YOU GOT COOKED', emoji: '🫠', color: 'text-red-400', bg: 'bg-red-900/30 border-red-600' };
}

function SlayGradeCard({ score, total }) {
  const pct = Math.round((score / total) * 100);
  const grade = getSlayGrade(pct);
  return (
    <div className={`rounded-xl p-6 border-2 text-center ${grade.bg}`}>
      <div className="text-5xl mb-2">{grade.emoji}</div>
      <div className={`text-2xl font-black mb-1 ${grade.color}`}>{grade.label}</div>
      <div className="text-4xl font-bold text-white mb-1">{score}/{total}</div>
      <div className="text-lg text-gray-300">{pct}%</div>
    </div>
  );
}

function StreakBadge({ streak }) {
  if (streak < 3) return null;
  const label = streak >= 6 ? '💀 UNSTOPPABLE' : streak >= 5 ? '⚡ ON FIRE' : '🔥 STREAK';
  const color = streak >= 6 ? 'bg-purple-600' : streak >= 5 ? 'bg-orange-600' : 'bg-red-600';
  return (
    <span className={`${color} text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse`}>
      {label} ×{streak}
    </span>
  );
}

// ─── FLASHCARDS ──────────────────────────────────────────────────────────────

const flashcardData = [
  { q: 'What is CLV?', a: 'Net present value of all future profit streams from a customer. Forward-looking, uses margin (not revenue).' },
  { q: 'CLV General Formula', a: 'CLV = Σ [m × r^(t-1) / (1+i)^t] − AC\nKey: retention is CUMULATIVE (r^(t-1)), not just r each year.' },
  { q: 'CLV Simple Formula (infinite horizon)', a: 'CLV = m × r/(1+i−r)\nMargin Multiple = r/(1+i−r)' },
  { q: 'Absolute vs Relative CLV', a: 'Absolute = m × Margin Multiple (no AC)\nRelative = Absolute − AC\nUse Relative for acquisition spend decisions.' },
  { q: '1% improvement in retention = ?', a: '4.9% improvement in firm value (49× more impactful than 1% AC improvement)' },
  { q: '1% improvement in margin = ?', a: '1.1% improvement in firm value' },
  { q: '1% improvement in acquisition cost = ?', a: '0.1% improvement in firm value (least impactful lever)' },
  { q: 'Two Sides of Value — 4 quadrants', a: 'Stars (high exp/high profit), Vulnerable (high profit/low exp), Free Riders (low profit/high exp), Lost Causes (low/low)' },
  { q: 'Free Riders definition', a: 'High customer experience (value created) but low profitability (value captured). Love product, not being monetized.' },
  { q: 'Vulnerable Customers definition', a: 'High profitability but low experience. Profitable today but at high churn risk. Fix the experience fast.' },
  { q: 'Three CLV growth levers', a: 'Acquisition (reduce AC), Retention (increase r), Expansion (increase m via cross-sell/up-sell/bundling)' },
  { q: 'Recommendation systems = which CLV lever?', a: 'EXPANSION — increases share of wallet from existing customers via cross-sell/up-sell.' },
  { q: 'Behavioral segmentation variables', a: 'Usage intensity and consumption frequency. NOT lifestyle (psychographic) or marital status (demographic).' },
  { q: 'Vertical vs Horizontal positioning', a: 'Vertical = quality/performance (everyone prefers more, WTP varies). Horizontal = taste/style (preferences differ).' },
  { q: 'EVC Formula', a: 'EVC = Reference Value + Differentiation Value\nSets the PRICE CEILING, not the recommended price.' },
  { q: 'Differentiation Value', a: 'Monetary value of attribute differences vs nearest substitute. Can be positive OR negative.' },
  { q: 'Conjoint: Total Product Utility', a: 'Sum of part-worth utilities across ALL attributes. Never compare on a single attribute alone.' },
  { q: 'Conjoint: Attribute Importance', a: 'Max utility − Min utility (range) for that attribute. Range = how much this attribute can swing total utility.' },
  { q: 'Conjoint: Price Parity steps', a: '1) Get reference product total utility\n2) Compute your product utility without price\n3) Subtract to get required price utility\n4) Interpolate using utils/$ rate' },
  { q: 'Utils-per-dollar formula', a: 'Utils/$ = |utility change| / |price change| between two known price levels' },
  { q: 'IC Constraint formula', a: 'WTP_high(high) − P_high ≥ WTP_high(low) − P_low\nMax P_high = WTP_high(high) − WTP_high(low) + P_low' },
  { q: 'When does single product beat product line?', a: 'When cannibalization cost > market expansion benefit. Dell example: single at $150K vs product line at $66K.' },
  { q: 'Fear appeals effectiveness', a: 'Inverted-U: moderate fear is optimal. Too much causes denial/avoidance. Always pair with specific achievable solution.' },
  { q: 'Humor in advertising risk', a: 'May overshadow product benefits — humor becomes memorable but brand does not. Always pre-test. Risky for luxury brands.' },
  { q: 'Comparative advertising best for', a: 'Challenger brands on verifiable attributes. Market leaders should avoid (legitimizes competitors).' },
  { q: 'Full funnel advertising', a: 'Brand (top of funnel: awareness) + Performance (bottom of funnel: conversion) are COMPLEMENTARY, not substitutes.' },
  { q: 'Freemium key tradeoff', a: 'Traffic generation (need rich free tier) vs Upgrade conversion (need limited free tier). Control cannibalization with a "bad" in free tier.' },
  { q: 'Freemium 3 rationales', a: '(1) Viral user base scaling without ad spend, (2) Product learning → upgrade over time, (3) Network effects + switching costs' },
  { q: 'Baseline sales definition', a: 'Predicted sales that WOULD HAVE occurred WITHOUT the promotion. Estimated from regression, not historical average.' },
  { q: 'Promotion ROI formula', a: 'ROI = (Incremental Revenue − Promo Cost) / Promo Cost\nIncremental = Actual − Baseline' },
  { q: 'Shrinkflation definition', a: 'Reduce product quantity/size while holding price constant. Short-term margin fix with long-term trust costs.' },
  { q: 'Coke vending machine — why it failed', a: 'Temperature is outside consumer control ("act of god"). Charging more in heat violates fairness norms and breaks the implicit brand-consumer contract.' },
  { q: 'Price discrimination under competition', a: 'Can intensify price wars: instead of competing with one average price for all segments, firms compete head-to-head in each segment.' },
  { q: 'Bundling and churn', a: 'Bundling reduces churn by up to 50%. Cox data: TV+HSI+Phone = 1.4% monthly churn vs TV only = 3.0%.' },
  { q: 'Pull vs Push promotions', a: 'Pull = consumer promos (coupons, samples) to create demand. Push = trade promos (allowances, discounts) to motivate channel.' },
  { q: 'Simpson\'s Paradox relevance', a: 'Aggregate data can reverse within-segment relationships. Example: Hospital A looks worse overall but is better in every patient severity category.' },
  { q: 'Five reasons customers get more profitable over time', a: '(1) Base profit, (2) Increased purchases/cross-buy, (3) Reduced service cost, (4) Referrals at zero AC, (5) Price premiums from loyalty' },
  { q: 'Offensive vs Defensive product launch', a: 'Offensive = capture new segments/grow market. Defensive = protect existing share from competition.' },
  { q: 'Product Proliferation Trap', a: 'Too many SKUs → consumer confusion, retailer pushback (finite shelf space), higher complexity costs. Olay had 60+ products.' },
  { q: 'Quarterly subscription CLV adjustment', a: 'If profits are realized annually from quarterly subscriptions: use (quarterly revenue − quarterly cost) × 4 = annual margin m.' },
  { q: 'Managerial Inertia (Olay case)', a: 'Successful brands resist change because internal incentives reward managing existing SKUs, not cannibalizing them. External disruption (DTC) forced the issue.' },
];

function Flashcards() {
  const [deck, setDeck] = useState(() => flashcardData.map((c, i) => ({ ...c, id: i, known: null })));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState('all'); // 'all' or 'unknown'

  const activeDeck = mode === 'unknown'
    ? deck.filter(c => c.known !== true)
    : deck;

  const card = activeDeck[currentIdx] ?? activeDeck[0];
  const knownCount = deck.filter(c => c.known === true).length;
  const pct = Math.round((knownCount / deck.length) * 100);

  const go = (dir) => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx(prev => {
        const len = activeDeck.length;
        return ((prev + dir) + len) % len;
      });
    }, 150);
  };

  const markCard = (known) => {
    const cardId = card.id;
    setDeck(prev => prev.map(c => c.id === cardId ? { ...c, known } : c));
    go(1);
  };

  const handleShuffle = () => {
    setDeck(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setIsFlipped(false);
  };

  const handleReset = () => {
    setDeck(flashcardData.map((c, i) => ({ ...c, id: i, known: null })));
    setCurrentIdx(0);
    setIsFlipped(false);
    setMode('all');
  };

  if (!card) return (
    <Card className="text-center py-12">
      <div className="text-4xl mb-4">🎉</div>
      <h3 className="text-2xl font-bold text-white mb-2">You slayed the deck!</h3>
      <p className="text-gray-400 mb-4">All cards marked as known.</p>
      <button onClick={handleReset} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Start Over</button>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-gray-400 text-sm">Card {currentIdx + 1}/{activeDeck.length}</p>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-green-400 text-sm font-semibold">{knownCount}/{deck.length} mastered</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setMode(m => m === 'all' ? 'unknown' : 'all'); setCurrentIdx(0); setIsFlipped(false); }}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${mode === 'unknown' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            {mode === 'unknown' ? 'Focus Mode ON' : 'Focus Mode'}
          </button>
          <button onClick={handleShuffle} className="px-3 py-1 rounded text-xs bg-gray-700 text-gray-300 hover:bg-gray-600">Shuffle</button>
          <button onClick={handleReset} className="px-3 py-1 rounded text-xs bg-gray-700 text-gray-300 hover:bg-gray-600">Reset</button>
        </div>
      </div>

      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer h-72"
        style={{ perspective: '1000px' }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.5s',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-8 flex items-center justify-center h-full border border-blue-700 absolute inset-0"
          >
            <div className="text-center max-w-lg">
              <p className="text-gray-400 text-xs mb-3 uppercase tracking-widest">Question</p>
              <p className="text-xl font-semibold text-white">{card.q}</p>
              <p className="text-gray-400 text-xs mt-6">Tap to flip</p>
            </div>
          </div>
          <div
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-xl p-8 flex items-center justify-center h-full border border-emerald-700 absolute inset-0"
          >
            <div className="text-center max-w-lg">
              <p className="text-gray-400 text-xs mb-3 uppercase tracking-widest">Answer</p>
              <p className="text-lg font-semibold text-white whitespace-pre-line">{card.a}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button onClick={() => go(-1)} className="px-5 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">← Prev</button>
        <button
          onClick={() => markCard(false)}
          className="px-5 py-2 bg-red-900/50 border border-red-700 text-red-300 rounded-lg hover:bg-red-800/50 font-medium"
        >
          📚 Need Work
        </button>
        <button
          onClick={() => markCard(true)}
          className="px-5 py-2 bg-green-900/50 border border-green-700 text-green-300 rounded-lg hover:bg-green-800/50 font-medium"
        >
          🔥 Nailed It
        </button>
        <button onClick={() => go(1)} className="px-5 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">Next →</button>
      </div>
    </div>
  );
}

// ─── QUICK QUIZ ───────────────────────────────────────────────────────────────

const quizQuestions = [
  {
    q: 'PMJ Easy: $100/year subscription, 80% renewal, 2-year max, zero variable cost, zero discount rate. What is the CLV?',
    options: ['a) $100', 'b) $180', 'c) $200', 'd) $160'],
    correct: 'b',
    explanation: 'Year 1: $100. Year 2: $100 × 0.80 = $80. Total CLV = $100 + $80 = $180.',
    pts: 5,
  },
  {
    q: 'Dell laptops — Personal WTP: $500 (2GHz), $1500 (3.5GHz). Business WTP: $1600 (2GHz), $2000 (3.5GHz). Sizes: 60 personal, 40 business. Single product optimal profit?',
    options: ['a) $80,000', 'b) $150,000', 'c) $66,000', 'd) $200,000'],
    correct: 'b',
    explanation: '3.5GHz at $2000: 40×$2000=$80K. At $1500: 100×$1500=$150K. Optimal = $150K.',
    pts: 10,
  },
  {
    q: 'Using the Dell data above, what is the max price for the 3.5GHz under a product line strategy (IC constraint)?',
    options: ['a) $2000', 'b) $1600', 'c) $900', 'd) $1100'],
    correct: 'c',
    explanation: 'IC: 2000 − P ≥ 1600 − 500 → P ≤ 2000 − 1100 = $900.',
    pts: 10,
  },
  {
    q: 'Recommendation systems are an example of which CLV lever?',
    options: ['a) Customer retention', 'b) Customer acquisition', 'c) Customer expansion', 'd) None'],
    correct: 'c',
    explanation: 'Recommendations identify cross-sell/up-sell opportunities for existing customers = expansion lever (share of wallet).',
    pts: 5,
  },
  {
    q: 'Get Fit Gyms: m=$240, r=80%, i=9%, AC=$150, N=5 years. What is the Relative CLV?',
    options: ['a) $651.33', 'b) $501.33', 'c) $720.45', 'd) $420.00'],
    correct: 'b',
    explanation: 'Sum Y1-Y5 discounted profits = $651.33 (Absolute). Relative = $651.33 − $150 = $501.33.',
    pts: 10,
  },
  {
    q: 'Air fryer conjoint — Price utils: $89=1100, $119=800. What is the utils-per-dollar rate between these two price points?',
    options: ['a) 300 utils/$', 'b) 10 utils/$', 'c) 30 utils/$', 'd) 100 utils/$'],
    correct: 'b',
    explanation: '(1100−800)/(119−89) = 300/30 = 10 utils per dollar.',
    pts: 5,
  },
  {
    q: 'Using the air fryer data, if a Philips product has non-price utility of 1300 and the De\'Longhi reference totals 2150 utils, what price should Philips charge for parity?',
    options: ['a) $89', 'b) $99', 'c) $114', 'd) $119'],
    correct: 'c',
    explanation: 'Need price utility = 2150−1300 = 850. At $119 = 800 utils. Need 50 more utils. 50/10 utils-per-$ = $5 lower. $119−$5 = $114.',
    pts: 10,
  },
  {
    q: 'Conjoint attribute importance is calculated as:',
    options: ['a) Highest part-worth utility', 'b) Average of all utility levels', 'c) Max utility − Min utility (range)', 'd) Sum of utilities'],
    correct: 'c',
    explanation: 'Importance = range (max − min) within that attribute. Measures how much that attribute can swing total utility.',
    pts: 5,
  },
  {
    q: 'Which of the following is a BEHAVIORAL segmentation variable?',
    options: ['a) Lifestyle', 'b) Income', 'c) Geographic region', 'd) Usage intensity'],
    correct: 'd',
    explanation: 'Behavioral = what customers DO: usage intensity, consumption frequency. Lifestyle = psychographic. Income = demographic.',
    pts: 5,
  },
  {
    q: 'The MAIN reason Coke\'s temperature-based vending machine pricing failed:',
    options: ['a) Technical unreliability', 'b) Temperature is outside consumer control, violating fairness norms', 'c) Prices were too high', 'd) Competitors undercut immediately'],
    correct: 'b',
    explanation: 'Temperature = "act of god." Charging more when someone is hot and thirsty feels exploitative. Breaks the implicit brand-consumer contract. Psychological utility loss overwhelmed economic gain.',
    pts: 5,
  },
  {
    q: 'A company with 200 subscribers charges $99/quarter, variable cost $20/quarter, 45% annual churn, 10% discount rate. What is the annual margin m used in the CLV formula?',
    options: ['a) $79', 'b) $316', 'c) $396', 'd) $237.60'],
    correct: 'b',
    explanation: 'Quarterly margin = $99−$20 = $79. Annual margin = $79 × 4 quarters = $316. Multiply by 4 when subscription is quarterly.',
    pts: 5,
  },
  {
    q: 'Using the professor club data (annual margin $316, r=0.55, i=0.10, 3-year horizon), what is Year 2 discounted profit?',
    options: ['a) $316.00', 'b) $287.27', 'c) $143.63', 'd) $71.87'],
    correct: 'c',
    explanation: 'Year 2 = $316 × 0.55 / (1.10)² = $173.8/1.21 = $143.63.',
    pts: 10,
  },
  {
    q: 'Freemium cannibalization can best be controlled by:',
    options: ['a) Eliminating the free tier', 'b) Adding advertising (a "bad") to the free tier', 'c) Raising the premium price', 'd) Restricting sign-ups'],
    correct: 'b',
    explanation: 'Adding a "bad" increases the value gap between tiers without removing free tier\'s acquisition function. Spotify: ads + no offline = premium clearly superior.',
    pts: 5,
  },
  {
    q: 'EVC sets the:',
    options: ['a) Optimal price', 'b) Price floor', 'c) Price ceiling', 'd) Competitor\'s price'],
    correct: 'c',
    explanation: 'EVC = Reference Value + Differentiation Value = maximum a rational customer would pay = price ceiling. Cost = floor.',
    pts: 5,
  },
  {
    q: 'Fear appeals in advertising follow which effectiveness pattern?',
    options: ['a) Linear — more fear = more effective', 'b) Inverted-U — moderate fear is optimal', 'c) Flat — fear level doesn\'t matter', 'd) S-curve — only extreme levels work'],
    correct: 'b',
    explanation: 'Too little fear = no motivation. Moderate fear = optimal engagement. Too much = denial, avoidance, "won\'t happen to me." Always pair with a specific, achievable solution.',
    pts: 5,
  },
  {
    q: 'In product line pricing, "cannibalization cost" is:',
    options: ['a) Revenue lost from the low product', 'b) The discount forced on high-type customers to ensure IC holds', 'c) The cost to develop the second product', 'd) Marketing spend on both products'],
    correct: 'b',
    explanation: 'Cannibalization cost = WTP_high(high) − P_high = the discount you must give business users below their maximum WTP to ensure they buy the high product rather than the low product.',
    pts: 5,
  },
];

function Quiz() {
  const [questions] = useState(() => [...quizQuestions].sort(() => Math.random() - 0.5));
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [xpPop, setXpPop] = useState(null);

  const q = questions[currentQ];
  const totalPts = questions.reduce((a, q) => a + q.pts, 0);
  const pct = Math.round((score / totalPts) * 100);

  const handleCheck = () => {
    const correct = selected === q.correct;
    const earned = correct ? q.pts : 0;
    if (correct) {
      setScore(s => s + earned);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(m => Math.max(m, newStreak));
      setXp(x => x + earned + (newStreak >= 3 ? 5 : 0));
      setXpPop(`+${earned + (newStreak >= 3 ? 5 : 0)} XP`);
      setTimeout(() => setXpPop(null), 1200);
    } else {
      setStreak(0);
    }
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentQ === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0); setScore(0); setSelected(null);
    setAnswered(false); setFinished(false);
    setStreak(0); setMaxStreak(0); setXp(0);
  };

  if (finished) {
    return (
      <div className="space-y-6">
        <SlayGradeCard score={score} total={totalPts} />
        <Card className="text-center">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div><p className="text-gray-400 text-xs">XP EARNED</p><p className="text-2xl font-bold text-amber-400">{xp}</p></div>
            <div><p className="text-gray-400 text-xs">BEST STREAK</p><p className="text-2xl font-bold text-orange-400">{maxStreak}🔥</p></div>
            <div><p className="text-gray-400 text-xs">SCORE</p><p className="text-2xl font-bold text-blue-400">{pct}%</p></div>
          </div>
          <button onClick={handleRestart} className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            Run It Back
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">Q {currentQ + 1}/{questions.length}</p>
        <div className="flex items-center gap-3">
          <StreakBadge streak={streak} />
          <span className="text-amber-400 text-sm font-semibold">{xp} XP</span>
          <span className="text-blue-400 text-sm font-semibold">{score}/{totalPts} pts</span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-gray-800 rounded-full">
        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${((currentQ) / questions.length) * 100}%` }} />
      </div>

      <Card className="relative">
        {xpPop && (
          <div className="absolute top-3 right-3 text-green-400 font-bold text-sm animate-bounce">{xpPop}</div>
        )}
        <div className="space-y-5">
          <div>
            <span className="text-xs text-amber-400 font-semibold">{q.pts} POINTS</span>
            <h3 className="text-base font-semibold text-white mt-1 leading-snug">{q.q}</h3>
          </div>

          <div className="space-y-2">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => !answered && setSelected(opt[0])}
                disabled={answered}
                className={`w-full p-3 rounded-lg text-left text-sm transition-all ${
                  selected === opt[0]
                    ? answered
                      ? opt[0] === q.correct
                        ? 'bg-green-900/40 border-2 border-green-500 text-green-200'
                        : 'bg-red-900/40 border-2 border-red-500 text-red-200'
                      : 'bg-blue-900/40 border-2 border-blue-500 text-blue-200'
                    : answered && opt[0] === q.correct
                      ? 'bg-green-900/20 border-2 border-green-700 text-green-300'
                      : 'bg-gray-800 border-2 border-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {answered && (
            <div className="border-t border-gray-800 pt-3">
              <p className="text-xs font-semibold text-amber-400 mb-1">Explanation</p>
              <p className="text-sm text-gray-300">{q.explanation}</p>
            </div>
          )}

          <div>
            {!answered ? (
              <button
                onClick={handleCheck}
                disabled={!selected}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${selected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
              >
                Check Answer
              </button>
            ) : (
              <button onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                {currentQ === questions.length - 1 ? 'See Results' : 'Next →'}
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── MOCK EXAM ────────────────────────────────────────────────────────────────

// 5 focused questions — one per key testable concept, teaching-forward with explanations
const mockExamQuestions = [
  {
    qNum: '1',
    topic: 'CLV Calculation',
    section: 'Customer Lifetime Value',
    sectionColor: 'text-blue-400',
    pts: 20,
    q: 'Get Fit Gyms: $600/year revenue, $360/year variable cost, 20% annual churn, $150 acquisition cost, 9% discount rate. What is the Relative CLV over 5 years?',
    context: 'Annual margin m = $600−$360 = $240. Retention r = 80%. i = 9%. Year t profit = m × r^(t-1) / (1+i)^t. Remember: retention is CUMULATIVE.',
    hint: 'Y1: $240/1.09 | Y2: $240×0.8/1.09² | Y3: $240×0.64/1.09³ | Y4: $240×0.512/1.09⁴ | Y5: $240×0.4096/1.09⁵',
    options: ['a) $720.45', 'b) $651.33 (Absolute CLV)', 'c) $501.33 (Relative CLV)', 'd) $420.00'],
    correct: 'c',
    explanation: 'Y1=$220.18, Y2=$161.60, Y3=$118.60, Y4=$87.05, Y5=$63.89 → Sum=$651.33 = Absolute CLV. Relative CLV = $651.33 − $150 AC = $501.33. Key: r^(t-1) is cumulative — Year 3 uses 0.80² = 0.64.',
  },
  {
    qNum: '2',
    topic: 'Conjoint Price Parity',
    section: 'Conjoint Analysis',
    sectionColor: 'text-purple-400',
    pts: 20,
    q: 'Air fryer price utilities: $89=1100 utils, $119=800 utils. A Philips product has non-price utility of 1300. The De\'Longhi reference product totals 2150 utils. What price should Philips charge for utility parity?',
    context: 'Steps: (1) Philips needs total utility = 2150. (2) Non-price utility = 1300. (3) Required price utility = 2150−1300 = 850. (4) Interpolate between $89 and $119.',
    hint: 'Utils/$ between $89 and $119 = (1100−800)/(119−89) = 300/30 = 10 utils per dollar. At $119: 800 utils. Need 850. Difference = 50 utils.',
    options: ['a) $89', 'b) $109', 'c) $114', 'd) $119'],
    correct: 'c',
    explanation: '850 utils needed. At $119 = 800 utils. Need 50 more utils. At 10 utils/$, need to be $5 LOWER than $119. Price = $119 − $5 = $114. Verify: $114 → 1100−10×(114−89) = 1100−250 = 850 ✓. Total Philips utility = 1300+850 = 2150 = De\'Longhi reference.',
  },
  {
    qNum: '3',
    topic: 'Product Line vs Single Product',
    section: 'Product Line Pricing',
    sectionColor: 'text-amber-400',
    pts: 20,
    q: 'Dell laptops: Personal users (60): WTP $500 (2GHz), $1500 (3.5GHz). Business users (40): WTP $1600 (2GHz), $2000 (3.5GHz). Single product profit (optimal) vs product line profit — which wins?',
    context: 'Single product: test 3.5GHz at $2000 (40×$2000=$80K) vs $1500 (100×$1500=$150K). Product line: IC constraint → P_high ≤ WTP_high(high) − WTP_high(low) + P_low = 2000−1600+500 = $900.',
    hint: 'Product line: 60×$500 + 40×$900 = $30K + $36K = $66K. Compare to single product optimum.',
    options: ['a) Product line wins: $66K > $80K', 'b) Single product wins: $150K > $66K', 'c) They are equal', 'd) Product line wins with optimal IC price'],
    correct: 'b',
    explanation: 'Single product at $1500 → 100×$1500 = $150K. Product line → $66K. Single product wins by $84K. Why? The 2GHz laptop is worth $1,600 to business users, forcing a $1,100 IC discount on the 3.5GHz (from $2,000 max to $900). Plus: personal users would actually switch UP to buy 3.5GHz at $900 (surplus $600 > $0), breaking the segmentation entirely.',
  },
  {
    qNum: '4',
    topic: 'Coke Case — Psychology & Pricing',
    section: 'Pricing Strategy',
    sectionColor: 'text-red-400',
    pts: 20,
    q: 'Coke considers temperature-based vending pricing (higher prices in hot weather). Beyond economic analysis, why does this fail — and what TWO alternative uses of the technology would work?',
    context: 'Consumer utility = Economic utility (EVC − Price) + Psychological utility (fairness perception). Temperature is outside consumer control.',
    options: [
      'a) It fails because the technology is unreliable; alternatives: dynamic loyalty pricing and time-based premiums',
      'b) It fails because temperature violates fairness norms (outside consumer control, breaks implicit contract); alternatives: temperature-targeted messaging and inventory optimization to prevent stockouts',
      'c) It fails only if consumers notice; alternatives: subtle price changes under 10% and machine-level discounts for regulars',
      'd) It works economically but fails legally; alternatives: loyalty program pricing and subscription models',
    ],
    correct: 'b',
    explanation: 'Core lesson: Psychological utility can override economic rational pricing. Temperature = "act of god" = fairness violation. Brand loyalty destroyed. Better technology uses that avoid price discrimination backlash: (1) Targeted messaging — serve hot drink promos in cold weather, cold drink promos in heat. (2) Inventory optimization — temperature predicts demand, preventing stockouts and lost sales. Neither requires controversial pricing.',
  },
  {
    qNum: '5',
    topic: 'Freemium Strategy',
    section: 'Promotions & Freemium',
    sectionColor: 'text-emerald-400',
    pts: 20,
    q: 'Spotify offers a free tier with ads and an ad-free premium. Name THREE rationales for the free tier and explain the PRIMARY design tradeoff. Which answer is most complete?',
    context: 'Question format from actual exam: "Describe three important rationales for offering a freemium product. What are the tradeoffs that a company must consider?"',
    options: [
      'a) Free tier generates immediate revenue via ads, tests features before full rollout, and reduces development cost',
      'b) Free tier scales user base without ad spend (viral), lets users learn and experience value before upgrading, and creates network effects + switching costs. Key tradeoff: Traffic generation (need rich free tier) vs Upgrade conversion (need limited free tier). Control with a "bad" — Spotify uses ads + no offline.',
      'c) Free tier attracts investors, builds brand awareness, and reduces customer acquisition cost for premium',
      'd) Free tier builds loyalty through habituation, serves as market research, and creates FOMO for premium features',
    ],
    correct: 'b',
    explanation: 'Four rationales from class: (1) Viral scaling — free users recruit others at zero AC, (2) Product learning — users who experience value upgrade over time, (3) Network effects — larger installed base benefits everyone, (4) Switching costs — deep integration makes leaving painful (Dropbox). Primary tradeoff: Traffic vs Conversion. Solution: add a "bad" to free tier (ads, offline restriction, quality limits) rather than removing features — preserves acquisition value while motivating upgrades.',
  },
];

function MockExam() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answered, setAnswered] = useState({});
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const q = mockExamQuestions[currentQ];
  const totalPts = mockExamQuestions.reduce((a, q) => a + q.pts, 0);
  const earnedPts = mockExamQuestions.reduce((a, q, i) => {
    return answers[i] === q.correct ? a + q.pts : a;
  }, 0);
  const pct = Math.round((earnedPts / totalPts) * 100);

  const handleCheck = () => {
    const correct = answers[currentQ] === q.correct;
    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(m => Math.max(m, newStreak));
    } else {
      setStreak(0);
    }
    setAnswered(prev => ({ ...prev, [currentQ]: true }));
  };

  const handleNext = () => {
    if (currentQ === mockExamQuestions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQ(q => q + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0); setAnswers({}); setAnswered({});
    setFinished(false); setStreak(0); setMaxStreak(0);
  };

  // Group questions by section
  const sectionProgress = () => {
    const sections = {};
    mockExamQuestions.forEach((q, i) => {
      const s = q.section.split(':')[0];
      if (!sections[s]) sections[s] = { total: 0, earned: 0, pts: 0 };
      sections[s].pts += q.pts;
      if (answers[i] === q.correct) sections[s].earned += q.pts;
      sections[s].total += q.pts;
    });
    return sections;
  };

  if (finished) {
    const sections = sectionProgress();
    return (
      <div className="space-y-6">
        <SlayGradeCard score={earnedPts} total={totalPts} />
        <Card>
          <h3 className="text-white font-semibold mb-4">Section Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(sections).map(([section, data]) => (
              <div key={section}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{section}</span>
                  <span className="text-gray-400">{data.earned}/{data.total} pts</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(data.earned / data.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6 pt-4 border-t border-gray-800">
            <div className="text-center flex-1">
              <p className="text-gray-400 text-xs">BEST STREAK</p>
              <p className="text-xl font-bold text-orange-400">{maxStreak}🔥</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-gray-400 text-xs">FINAL SCORE</p>
              <p className="text-xl font-bold text-white">{earnedPts}/{totalPts}</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-gray-400 text-xs">PERCENTAGE</p>
              <p className="text-xl font-bold text-blue-400">{pct}%</p>
            </div>
          </div>
          <button onClick={handleRestart} className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            Retake Mock Exam
          </button>
        </Card>

        <Card>
          <h3 className="text-white font-semibold mb-3">All Answers Review</h3>
          <div className="space-y-2">
            {mockExamQuestions.map((mq, i) => (
              <div key={i} className={`p-3 rounded-lg text-xs ${answers[i] === mq.correct ? 'bg-green-900/20 border border-green-800' : 'bg-red-900/20 border border-red-800'}`}>
                <p className="text-gray-300 font-medium">{mq.qNum}: {answers[i] === mq.correct ? '✓' : '✗'} ({mq.pts} pts)</p>
                <p className="text-gray-400 mt-1">{mq.explanation}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  const isAnswered = answered[currentQ];
  const selected = answers[currentQ];
  const isCorrect = selected === q.correct;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-xs text-gray-400">XMBA 206 · Focused Practice · 5 key concepts · 100 pts</p>
            <p className={`text-sm font-semibold mt-0.5 ${q.sectionColor}`}>{q.section} — {q.topic}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <StreakBadge streak={streak} />
              <span className="text-blue-400 text-sm font-semibold">{earnedPts}/{totalPts} pts</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">Q {currentQ + 1} of {mockExamQuestions.length}</p>
          </div>
        </div>
        <div className="w-full h-1.5 bg-gray-700 rounded-full">
          <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${(currentQ / mockExamQuestions.length) * 100}%` }} />
        </div>
      </div>

      <Card>
        <div className="space-y-5">
          <div>
            <div className="flex gap-3 items-center mb-2">
              <span className="bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded">Q{q.qNum}</span>
              <span className="text-amber-400 text-xs font-semibold">{q.pts} POINTS</span>
            </div>
            {q.context && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 mb-2">
                <p className="text-xs text-gray-400 leading-relaxed">{q.context}</p>
              </div>
            )}
            {q.hint && (
              <div className="bg-amber-950/30 border border-amber-800 rounded-lg p-3 mb-3">
                <p className="text-xs text-amber-400 font-semibold mb-0.5">HINT</p>
                <p className="text-xs text-amber-200 font-mono leading-relaxed">{q.hint}</p>
              </div>
            )}
            <p className="text-base font-medium text-white leading-snug">{q.q}</p>
          </div>

          <div className="space-y-2">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => !isAnswered && setAnswers(prev => ({ ...prev, [currentQ]: opt[0] }))}
                disabled={isAnswered}
                className={`w-full p-3 rounded-lg text-left text-sm transition-all leading-snug ${
                  selected === opt[0]
                    ? isAnswered
                      ? opt[0] === q.correct
                        ? 'bg-green-900/40 border-2 border-green-500 text-green-200'
                        : 'bg-red-900/40 border-2 border-red-500 text-red-200'
                      : 'bg-blue-900/40 border-2 border-blue-500 text-blue-200'
                    : isAnswered && opt[0] === q.correct
                      ? 'bg-green-900/20 border-2 border-green-700 text-green-300'
                      : 'bg-gray-800 border-2 border-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {isAnswered && (
            <div className={`border rounded-lg p-4 ${isCorrect ? 'border-green-700 bg-green-900/20' : 'border-red-700 bg-red-900/20'}`}>
              <p className={`text-sm font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? `✓ Correct! +${q.pts} pts` : `✗ Incorrect (0/${q.pts} pts)`}
              </p>
              <p className="text-sm text-gray-300">{q.explanation}</p>
            </div>
          )}

          <div>
            {!isAnswered ? (
              <button
                onClick={handleCheck}
                disabled={!selected}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${selected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
              >
                Submit Answer
              </button>
            ) : (
              <button onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                {currentQ === mockExamQuestions.length - 1 ? 'See Final Score →' : 'Next Question →'}
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── EXAM TRAPS ───────────────────────────────────────────────────────────────

const traps = [
  { id: 't1', wrong: 'CLV = total revenue from a customer', why: 'CLV is the NPV of future PROFITS (margin), not revenue. Revenue minus variable costs first.' },
  { id: 't2', wrong: 'Year 3 CLV = m × r / (1+i)³', why: 'Retention is CUMULATIVE: Year 3 = m × r² / (1+i)³. The r^(t-1) is the key — you need to survive each prior year.' },
  { id: 't3', wrong: 'Always invest more in retention since 1% = 4.9% firm value', why: 'True only if the marginal cost of retention improvement < marginal CLV gain. If it costs $200 to retain a $50 CLV customer, don\'t do it.' },
  { id: 't4', wrong: 'Conjoint importance = the attribute with the highest part-worth utility', why: 'Importance = RANGE (max − min). An attribute with utilities 700/701 (range=1) matters less than one with 200/1100 (range=900) even though the absolute values are bigger.' },
  { id: 't5', wrong: 'To compare products, look at which has better individual attributes', why: 'Always sum TOTAL product utility across ALL attributes. Acer beats Dell (20.6 vs 19.9) despite Dell having better brand and processor — because price and speed outweigh those advantages.' },
  { id: 't6', wrong: 'Product line always beats single product strategy', why: 'High cannibalization can make single product better. Dell: single at $150K vs product line at $66K. The IC constraint forced a $1,100 discount on the premium product.' },
  { id: 't7', wrong: 'EVC = the price you should charge', why: 'EVC is the CEILING. Actual price depends on competition, your cost floor, and how much value you want to share vs capture. Pricing at EVC leaves no value for the customer.' },
  { id: 't8', wrong: 'Price discrimination is always profitable', why: 'Fairness norms constrain pricing. Coke vending: temperature = outside consumer control = fairness violation. Also: under competition, discrimination can intensify price wars.' },
  { id: 't9', wrong: 'Shrinkflation avoids consumer backlash vs a price increase', why: 'Consumers notice. Shrinkflation damages trust and loyalty, same as a price increase — and has functional limits (you can\'t shrink a product indefinitely).' },
  { id: 't10', wrong: 'More fear = more effective advertising', why: 'Inverted-U: moderate fear is optimal. Too much triggers denial and avoidance. Always pair fear with a specific, actionable solution.' },
  { id: 't11', wrong: 'Comparative advertising is great for market leaders', why: 'Risky for leaders — you legitimize the competitor by directly acknowledging them. Comparative works best for challengers who benefit from the association.' },
  { id: 't12', wrong: 'Lifestyle is a behavioral segmentation variable', why: 'Lifestyle = PSYCHOGRAPHIC (values, attitudes, personality). Behavioral = what people DO (usage intensity, consumption frequency). This is a specific exam trap.' },
  { id: 't13', wrong: 'Baseline sales = average historical sales', why: 'Baseline = predicted sales WITHOUT the promotion, estimated via regression. Simple averages include promotion months which inflate the "baseline" and understate the true incremental effect.' },
  { id: 't14', wrong: 'Recommendations = retention lever', why: 'Recommendations are an EXPANSION lever — they increase share of wallet from existing customers. Churn prediction is retention. Lookalike modeling is acquisition.' },
  { id: 't15', wrong: 'Freemium: make the free tier as rich as possible to maximize users', why: 'This maximizes traffic but minimizes upgrade conversion. Key tradeoff: traffic vs conversion. Need a "bad" in the free tier (ads, limits) to motivate upgrades.' },
  { id: 't16', wrong: 'IC constraint only needs to be checked one way', why: 'Check BOTH: (1) high-type must prefer high product, AND (2) low-type must not want to switch up to high product. Both can break the product line.' },
  { id: 't17', wrong: 'Quarterly subscription: use quarterly margin directly in CLV formula', why: 'If profits are recognized annually: multiply quarterly (revenue − cost) × 4 to get annual margin m, THEN plug into CLV formula.' },
  { id: 't18', wrong: 'Brand advertising and performance advertising are substitutes', why: 'They\'re COMPLEMENTARY. Full funnel: brand builds awareness → makes performance ads more effective. TikTok data: brand-aware users convert at higher rates.' },
  { id: 't19', wrong: 'Bundling is just a volume strategy', why: 'Bundling is primarily a RETENTION strategy. Cox data: bundled customers (TV+HSI+Phone) have 1.4% monthly churn vs TV-only at 3.0%. It creates switching cost and reduces churn by 50%.' },
  { id: 't20', wrong: 'Vertical positioning = premium/luxury, horizontal = budget/economy', why: 'Vertical = quality difference (everyone prefers more, WTP varies). Horizontal = taste/style difference (preferences vary regardless of budget). BMW 3 vs 7 = vertical. BMW 3 vs M3 = horizontal.' },
];

function ExamTraps({ search }) {
  const [expanded, setExpanded] = useState({});

  const filtered = traps.filter(t =>
    !search ||
    t.wrong.toLowerCase().includes(search.toLowerCase()) ||
    t.why.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filtered.map(trap => (
        <Card key={trap.id} className="cursor-pointer" onClick={() => setExpanded(prev => ({ ...prev, [trap.id]: !prev[trap.id] }))}>
          <div className="space-y-2">
            <p className="text-xs text-red-400 font-semibold">WRONG INTUITION</p>
            <p className="text-sm text-gray-100">{trap.wrong}</p>
            {expanded[trap.id] && (
              <div className="border-t border-gray-800 pt-3">
                <p className="text-xs text-amber-400 font-semibold mb-1">WHY IT'S WRONG</p>
                <p className="text-sm text-gray-300">{trap.why}</p>
              </div>
            )}
            <p className="text-xs text-gray-500">{expanded[trap.id] ? '▼ collapse' : '▶ reveal'}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── MAIN TEST EXPORT ─────────────────────────────────────────────────────────

export default function Test({ subtab, search }) {
  return (
    <div className="space-y-6">
      {subtab === 'flashcards' && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Flashcards</h2>
            <p className="text-xs text-gray-400">Mark cards as Nailed It or Need Work to track mastery</p>
          </div>
          <Flashcards />
        </>
      )}

      {subtab === 'quiz' && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Quick Quiz</h2>
            <p className="text-xs text-gray-400">Calculation-based · Exam-style MC · Slay scoring</p>
          </div>
          <Quiz />
        </>
      )}

      {subtab === 'mock' && (
        <>
          <div className="space-y-1 mb-2">
            <h2 className="text-2xl font-bold text-white">Mock Exam ⚡</h2>
            <p className="text-sm text-gray-400">5 questions · 100 points · One per key testable concept · Hints included · Learn as you go</p>
          </div>
          <MockExam />
        </>
      )}

      {subtab === 'traps' && (
        <>
          <h2 className="text-2xl font-bold text-white">Exam Traps</h2>
          <p className="text-gray-400 text-sm mb-4">20 most dangerous wrong intuitions — click to reveal why</p>
          <ExamTraps search={search} />
        </>
      )}
    </div>
  );
}
