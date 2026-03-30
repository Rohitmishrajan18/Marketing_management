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
    q: 'Get Fit Gyms is evaluating the lifetime value of a typical gym member. The gym charges $600/year in membership fees. Variable costs per member (staff time, equipment wear, utilities) total $360/year. Each year, 20% of members cancel their membership. The gym spent $150 per member in advertising and promotional offers to acquire them. The firm\'s cost of capital is 9%. Calculate the Relative CLV over a 5-year horizon.',
    context: 'Set up your variables first: m = $600 − $360 = $240/year profit margin. r = 1 − 0.20 = 0.80 (80% retention). i = 0.09. AC = $150. N = 5.\n\nThe key formula is: Year t profit = m × r^(t−1) / (1+i)^t\n\nThe r^(t−1) term is CUMULATIVE retention — a customer in Year 3 had to survive Year 2 AND Year 3, so you use r² not r. This is the most common calculation error.',
    hint: 'Y1: $240 × 1 / 1.09 | Y2: $240 × 0.80 / 1.09² | Y3: $240 × 0.64 / 1.09³ | Y4: $240 × 0.512 / 1.09⁴ | Y5: $240 × 0.4096 / 1.09⁵\n\nAbsolute CLV = sum of all 5 years. Relative CLV = Absolute CLV − AC.',
    options: ['a) $720.45 — adding undiscounted profits', 'b) $651.33 — this is the Absolute CLV', 'c) $501.33 — Relative CLV (Absolute minus AC)', 'd) $420.00 — incorrect discount applied'],
    correct: 'c',
    explanation: 'Walk through each year carefully:\n\nYear 1: $240 × r⁰ / (1.09)¹ = $240 × 1 / 1.09 = $220.18\n→ All acquired customers are still here in Y1. No attrition yet. But money in Y1 is discounted one period.\n\nYear 2: $240 × r¹ / (1.09)² = $240 × 0.80 / 1.188 = $161.60\n→ Only 80% of customers made it to Y2. Discounted two periods.\n\nYear 3: $240 × r² / (1.09)³ = $240 × 0.64 / 1.295 = $118.60\n→ r² = 0.64 because these customers survived Y1 AND Y2. This is cumulative retention.\n\nYear 4: $240 × r³ / (1.09)⁴ = $240 × 0.512 / 1.412 = $87.05\nYear 5: $240 × r⁴ / (1.09)⁵ = $240 × 0.4096 / 1.539 = $63.89\n\nAbsolute CLV = $220.18 + $161.60 + $118.60 + $87.05 + $63.89 = $651.33\nThis is the total NPV of the customer relationship before accounting for what you spent to get them.\n\nRelative CLV = $651.33 − $150 AC = $501.33\nThis answers: "Was acquiring this customer worth it?" At $150 acquisition cost, yes — you netted $501.33 in lifetime value.\n\nWhy option (b) is wrong: $651.33 is technically correct as Absolute CLV, but the question asks for Relative CLV, which nets out the acquisition cost.\nDecision rule: spend up to $501.33 to acquire a new member.',
  },
  {
    qNum: '2',
    topic: 'Conjoint Price Parity',
    section: 'Conjoint Analysis',
    sectionColor: 'text-purple-400',
    pts: 20,
    q: 'A consumer products firm ran a conjoint study on air fryers. The study revealed the following price utility table: $89 → 1,100 utility units; $119 → 800 utility units. A Philips air fryer (4qt, Stainless Steel, 1,800W) has non-price attribute utilities summing to 1,300 units. The De\'Longhi reference product (4qt, Aluminum, 1,700W) at $119 totals 2,150 utility units. At what price does Philips reach utility parity with De\'Longhi — the price where a rational consumer is indifferent between them?',
    context: 'Price parity means: Total Utility(Philips) = Total Utility(De\'Longhi)\nPhilips total utility = non-price utility + price utility = 1,300 + price_utility\nSet equal to 2,150: 1,300 + price_utility = 2,150 → price_utility = 850\n\nNow find what price delivers 850 utility units. You know:\n• $89 → 1,100 utils\n• $119 → 800 utils\nThe price utility you need (850) falls between these two known points.',
    hint: 'Utils/$ = (1,100 − 800) / ($119 − $89) = 300 / 30 = 10 utils per dollar\nAt $119: 800 utils. Need 850 utils (50 more). Lower price = higher utility. So go $5 below $119.',
    options: ['a) $89 — too low, gives 1,100 utils (too much)', 'b) $109 — interpolation error', 'c) $114 — correct parity price', 'd) $119 — same as De\'Longhi, but wrong because attributes differ'],
    correct: 'c',
    explanation: 'Step-by-step parity calculation:\n\nStep 1: What total utility must Philips match?\nDe\'Longhi total utility = 2,150 units\n\nStep 2: What utility do Philips\' non-price attributes provide?\nNon-price utility = 1,300 units (brand + capacity + material + wattage combined)\n\nStep 3: What price utility does Philips need?\nRequired price utility = 2,150 − 1,300 = 850 units\n\nStep 4: Find the price that delivers 850 utility units.\nWe know from the conjoint table:\n• $89 → 1,100 utils\n• $119 → 800 utils\nUtils per dollar = (1,100 − 800) / (119 − 89) = 300/30 = 10 utils per $1\n\nNote: lower price = higher utility. We need 850 utils, which is 50 more than the 800 at $119.\n50 utils ÷ 10 utils per dollar = $5 below $119 → Price = $114\n\nVerification: At $114, price utility = 1,100 − 10×(114−89) = 1,100 − 250 = 850 ✓\nPhilips total utility = 1,300 + 850 = 2,150 = De\'Longhi ✓\n\nWhat this means strategically: Philips can price up to $114 and still be preferred by a rational consumer (higher utility than De\'Longhi at $119). Above $114, De\'Longhi wins on total utility. This is the price ceiling for Philips, not a recommended price.',
  },
  {
    qNum: '3',
    topic: 'Product Line vs Single Product',
    section: 'Product Line Pricing',
    sectionColor: 'text-amber-400',
    pts: 20,
    q: 'Dell sells laptops in a market of 100 customers: 60 personal users and 40 business users. Willingness to pay: Personal users — $500 for the 2GHz model, $1,500 for the 3.5GHz model. Business users — $1,600 for the 2GHz model, $2,000 for the 3.5GHz model. Dell is deciding between (A) selling only the 3.5GHz model at the optimal single price, or (B) a product line with both models priced to get each segment to self-select. Which strategy maximizes profit, and by how much?',
    context: 'Single product analysis — test each possible price:\n• 3.5GHz at $2,000: only business users buy → 40 × $2,000 = $80,000\n• 3.5GHz at $1,500: all 100 buy → 100 × $1,500 = $150,000 ← optimal single product\n\nProduct line — apply IC constraint:\nIC rule: high-type must weakly prefer the high product.\nP_high ≤ WTP_high(high) − WTP_high(low) + P_low\nP_high ≤ $2,000 − $1,600 + $500 = $900\nSet P_low = $500 (personal users\' WTP for 2GHz)',
    hint: 'Product line: 60 × $500 + 40 × $900 = $30,000 + $36,000 = $66,000\nThen check: do personal users switch UP to buy the 3.5GHz at $900?\nSurplus from 3.5GHz = $1,500 − $900 = $600 > $0 → they prefer 3.5GHz → segmentation breaks',
    options: ['a) Product line wins: $66K > $80K', 'b) Single product at $1,500 wins: $150K > $66K', 'c) Product line wins at a higher IC-constrained price', 'd) Both strategies yield equal profit'],
    correct: 'b',
    explanation: 'Full analysis:\n\nSINGLE PRODUCT:\n• Price at $2,000 → only 40 business users buy → $80,000\n• Price at $1,500 → all 100 users buy (both types can afford it) → $150,000\nOptimal single product price = $1,500 → profit = $150,000\n\nPRODUCT LINE:\nStep 1: Price low product for personal users: P_low = $500\nStep 2: IC constraint forces: P_high ≤ $2,000 − $1,600 + $500 = $900\nStep 3: Product line profit = (60 × $500) + (40 × $900) = $30,000 + $36,000 = $66,000\n\nSingle product WINS by $84,000.\n\nWhy does the product line fail so badly?\nTwo compounding problems:\n\n(1) Cannibalization discount: The IC constraint forces Dell to price the 3.5GHz at $900 instead of the $2,000 business users would pay. That\'s a $1,100 discount per business user × 40 users = $44,000 in lost revenue just to keep business users from switching down.\n\n(2) Segmentation breaks anyway: Check personal users at $900 for the 3.5GHz. Their WTP for 3.5GHz = $1,500. Consumer surplus = $1,500 − $900 = $600 > $0. Personal users prefer the $900 3.5GHz over the $500 2GHz (they get more product for only $400 more). The product line cannot actually segment these customers — both types buy the high product at $900.\n\nConclusion: The 2GHz laptop is so valuable to business users ($1,600 WTP) that any budget product offering creates devastating IC constraints. Market expansion ($30K from personal users) does not compensate for the $84K profit loss.',
  },
  {
    qNum: '4',
    topic: 'Coke Case — Psychology & Pricing',
    section: 'Pricing Strategy',
    sectionColor: 'text-red-400',
    pts: 20,
    q: 'In the late 1990s, Coca-Cola\'s CEO floated the idea of temperature-sensitive vending machines: Coke would cost more during hot weather (when demand is highest) and less during cold weather. The concept was economically rational — higher demand, higher EVC, higher price. The idea was immediately and broadly condemned, and Coke publicly abandoned it. Explain specifically why this pricing strategy fails psychologically, and describe TWO alternative applications of the same temperature-sensing technology that would be consumer-acceptable.',
    context: 'Framework: Consumer utility = Economic utility (EVC − Price) + Psychological utility (fairness perception)\n\nThaler\'s Dual Entitlement Theory: consumers judge prices as fair or unfair based on who benefits and what caused the change. Price increases that benefit only the seller and are triggered by factors outside the consumer\'s control are perceived as exploitative.\n\nKey question: Is temperature something the consumer controls? Does Coke benefit while the consumer suffers?',
    options: [
      'a) It fails because Coke lacks the technical infrastructure; alternatives: surge pricing for events and holiday premium pricing',
      'b) It fails because temperature is outside consumer control — charging more when someone is suffering heat violates Thaler\'s dual entitlement (seller profits from buyer\'s hardship). Acceptable alternatives: temperature-targeted messaging ("Hot outside? Cool down with Coke" promos) and inventory/restocking optimization to prevent stockouts during high-demand periods',
      'c) It fails only if consumers discover it; alternatives: tiered loyalty pricing and subscription bundles',
      'd) It fails due to regulatory risk; alternatives: time-of-day pricing and machine-level subscription access',
    ],
    correct: 'b',
    explanation: 'Why it fails — the psychology:\n\nRichard Thaler\'s Dual Entitlement principle states that consumers accept price changes as fair when they reflect the seller\'s legitimate costs, but reject them as unfair when the seller is exploiting the buyer\'s circumstances for profit.\n\nTemperature-based pricing fails on every dimension of fairness:\n• The consumer has no control over the weather (it\'s an "act of god")\n• The consumer is already suffering (it\'s 95°F — they\'re uncomfortable and thirsty)\n• Coke is profiting specifically from that suffering\n• There is no increase in Coke\'s costs that justifies the higher price\n\nResult: Psychological utility loss is so large it overwhelms the economic utility of the purchase. Consumers feel exploited. Brand loyalty — built over decades — is damaged in a single transaction. The press coverage alone cost Coke far more than the pricing experiment could ever generate.\n\nFormally: Consumer utility = (EVC − P) + Fairness perception. Even if EVC is high in heat, Fairness perception becomes strongly negative, making total utility negative. The consumer walks away.\n\nTwo acceptable uses of the SAME technology:\n(1) Temperature-targeted marketing messages: The machine detects 90°F weather and shows messaging like "Stay cool — today only, buy 2 get 1" or highlights iced beverages. Uses temperature data to drive engagement without changing the price. Consumers feel understood, not exploited.\n\n(2) Demand-based inventory optimization: Temperature data predicts which machines will run out first. Operations team restocks high-demand machines proactively, preventing stockouts. Coke captures MORE revenue at normal prices simply by having product available. No price change, no backlash, higher sales.',
  },
  {
    qNum: '5',
    topic: 'Freemium Strategy',
    section: 'Promotions & Freemium',
    sectionColor: 'text-emerald-400',
    pts: 20,
    q: 'Spotify launched with a free, ad-supported tier alongside a paid premium subscription ($9.99/month). The free tier includes ads every few songs, no offline listening, and lower audio quality. Premium removes all three restrictions. This freemium model now serves 600M+ users globally, with ~250M paying subscribers (~42% conversion). The music industry was deeply skeptical — why give music away for free? Describe THREE strategic rationales for offering the free tier, and explain the primary design tradeoff Spotify had to navigate.',
    context: 'This question maps directly to the freemium framework from class.\n\nKey insight: the free tier is NOT charity — it serves specific strategic functions that paid acquisition cannot replicate at scale. Each rationale is a distinct economic mechanism.\n\nExam format: "Describe three important rationales for offering a freemium product. What are the tradeoffs that a company must consider in designing the free tier?"',
    options: [
      'a) Free tier generates ad revenue immediately, lets Spotify test features cheaply, and reduces music licensing costs through volume',
      'b) Free tier scales user base virally without ad spend (each free user recruits others); lets users experience the product and self-select into premium when they hit friction; creates network effects (shared playlists, social features) and switching costs (curated libraries, listening history). Primary tradeoff: Traffic generation requires a generous free tier, but upgrade conversion requires friction — too generous = no upgrades, too restrictive = no users',
      'c) Free tier attracts record label partnerships, builds global brand recognition, and reduces regulatory risk by demonstrating consumer goodwill',
      'd) Free tier creates FOMO for premium features, serves as a perpetual trial that converts on lifecycle events, and provides real-time market research on listening patterns',
    ],
    correct: 'b',
    explanation: 'The four strategic rationales from class (exam asks for three — any three count):\n\n(1) Viral user base scaling without paid acquisition\nPaid advertising to acquire 600M users at even $1/user = $600M in acquisition spend. Instead, Spotify\'s free tier turns every user into a distribution channel. Users share playlists, recommend songs, invite friends to collaborative playlists. The product spreads itself. This is the core economic logic: free tier replaces paid acquisition with organic growth.\n\n(2) Product learning leads to upgrade conversion\nA user who joins Spotify free at 22 may not be willing to pay $9.99/month immediately. But after 2 years of Spotify shaping their music taste, curating their Discover Weekly, building a library of 200 saved songs — now they\'ve experienced the value. The free tier is a patience strategy. Users who spend time with the product develop willingness to pay that didn\'t exist at acquisition.\n\n(3) Network effects expand the installed base for everyone\nSpotify\'s collaborative playlists, social sharing, and integration with social media create network value. More free users = more shared playlists = more reasons to be on Spotify. The free tier expands the network, which makes premium more valuable.\n\n(4) Switching costs lock users in\nAfter years of Discover Weekly curation, 5,000 saved songs, podcast subscriptions, and a personalized homepage — leaving Spotify means starting over. The free tier creates lock-in that makes premium conversion easier and churn lower.\n\nThe PRIMARY design tradeoff:\nTraffic generation requires a generous free tier (enough value to attract and retain users). Upgrade conversion requires friction (users need a reason to pay). These objectives are in direct conflict:\n• Too generous free tier → 600M users, 0% conversion → no business\n• Too restrictive free tier → 10M users, 80% conversion → no scale\n\nSpotify\'s solution: Add a "bad" to the free tier rather than removing features. Ads, no offline, lower quality — these make premium clearly superior without making free worthless. The free tier remains valuable enough to attract 350M non-payers while the "bads" create genuine motivation to upgrade.',
  },
  {
    qNum: '6',
    topic: 'CLV Levers — Which to Pull',
    section: 'Customer Lifetime Value',
    sectionColor: 'text-blue-400',
    pts: 20,
    q: 'A SaaS company has 10,000 customers, $500 annual margin per customer, 75% retention rate, and 12% cost of capital. Their CMO wants to run three separate initiatives: (A) a loyalty program expected to raise retention from 75% to 76%, (B) a pricing initiative to raise margin by 1%, and (C) a digital ad campaign to cut acquisition cost by 1%. Rank these initiatives by impact on firm value.',
    context: 'Use the CLV lever sensitivities from class:\n• 1% improvement in retention → 4.9% improvement in firm value\n• 1% improvement in margin → 1.1% improvement in firm value\n• 1% reduction in acquisition cost → 0.1% improvement in firm value\n\nRetention improves by 1 percentage point (75%→76%), which equals approximately 1.33% improvement in retention rate.',
    hint: 'The ranking holds regardless of exact numbers. Retention dominates because it appears in BOTH numerator (r^t-1) and denominator (1+i-r) of the CLV formula — a compounding effect. Acquisition cost affects only the one-time upfront cost.',
    options: [
      'a) AC reduction > Margin increase > Retention increase (acquisition drives growth)',
      'b) Margin increase > Retention increase > AC reduction (pricing is most controllable)',
      'c) Retention increase > Margin increase > AC reduction (4.9% : 1.1% : 0.1% impact ratio)',
      'd) All three have equal impact on firm value',
    ],
    correct: 'c',
    explanation: 'The CLV lever sensitivities from class are non-negotiable on the exam:\n• +1% Retention → +4.9% firm value\n• +1% Margin → +1.1% firm value\n• −1% Acquisition Cost → +0.1% firm value\n\nRanking: Retention (4.9x) >> Margin (1.1x) >> Acquisition Cost (0.1x)\n\nWhy retention dominates by such a wide margin:\nIn the CLV formula CLV = m × r/(1+i−r), the retention rate r appears in TWO places:\n(1) The numerator r^(t-1) — higher retention means more profit each year\n(2) The denominator (1+i−r) — higher retention reduces the denominator, multiplying all future profits\n\nThis double-compounding effect is why a 1% retention improvement has 49× the impact of a 1% acquisition cost improvement.\n\nPractical implication: Most firms allocate 70-80% of marketing budgets to acquisition. This is economically backwards. The firm should invest in the loyalty program first, pricing second, and only then consider acquisition optimization.\n\nThe retention improvement here (75%→76%) is actually ~1.33% improvement in the rate, making its impact even larger than a clean 1% example.',
  },
  {
    qNum: '7',
    topic: 'Two Sides of Value — Segment Classification',
    section: 'Customer Value Management',
    sectionColor: 'text-violet-400',
    pts: 20,
    q: 'A B2B industrial supplier analyzes its customer base. Customer A generates $2M in annual revenue, requires a dedicated account manager, demands weekly custom reporting, gets 15% volume discounts, and has filed 12 support tickets this year. After accounting for service costs, this customer generates $40K net profit. Customer B generates $180K revenue, orders standard products at list price, requires no custom service, and generates $72K net profit. How should the supplier classify and treat each customer using the Two Sides of Value framework?',
    context: 'Two Sides of Value matrix:\n• x-axis: Customer Experience (how much value the firm CREATES for the customer)\n• y-axis: Customer Profitability (how much value the firm CAPTURES from the customer)\n\nClassify each customer into one of four quadrants: Stars (high/high), Vulnerable (high profit/low experience), Free Riders (high experience/low profit), Lost Cause (low/low).\n\nKey insight: revenue ≠ profitability. The Kanthal case showed that the largest-revenue customers can be the least profitable.',
    hint: 'Customer A: $2M revenue but only $40K profit — they consume massive service resources. High experience (custom reporting, account manager, discounts), Low profitability → which quadrant?\nCustomer B: $180K revenue, $72K profit, standard service → which quadrant?',
    options: [
      'a) Customer A = Star (largest revenue), Customer B = Lost Cause (smallest revenue)',
      'b) Customer A = Free Rider (high experience/low profit → monetize or reduce service cost), Customer B = Star (high profit/low service cost → invest and grow)',
      'c) Customer A = Vulnerable (high profit/low experience), Customer B = Free Rider',
      'd) Both are Stars — any customer generating positive profit should be retained',
    ],
    correct: 'b',
    explanation: 'This question directly mirrors the Kanthal AB case from class.\n\nCustomer A analysis:\n• Revenue: $2M (looks impressive)\n• Net profit: $40K (2% margin — almost nothing after service costs)\n• Experience created: VERY HIGH — dedicated account manager, weekly custom reporting, 15% discounts, active support\n• Value captured: VERY LOW — $40K net profit on $2M revenue\n→ Classification: FREE RIDER\n\nCustomer B analysis:\n• Revenue: $180K (looks small)\n• Net profit: $72K (40% margin — extremely efficient)\n• Experience created: LOW — standard products, list price, no custom service\n• Value captured: HIGH — $72K net profit\n→ Classification: STAR\n\nStrategic prescriptions:\nCustomer A (Free Rider): Two options — (1) Find a monetization path: reduce discounts, charge for custom reporting, apply service fees. (2) Reduce service cost: standardize their ordering to reduce account manager time. If neither works, consider "firing" the customer. They are destroying value relative to their size.\n\nCustomer B (Star): Invest in growing this relationship. Cross-sell, expand the product range they order, deepen the relationship. This is your most profitable customer type.\n\nThe Kanthal lesson: Large revenue customers demanded custom treatment that eroded all their profitability. Small standard customers were the true Stars. The supplier doubled profitability by redirecting resources from large Free Riders to small Stars.',
  },
  {
    qNum: '8',
    topic: 'Conjoint — Attribute Importance',
    section: 'Conjoint Analysis',
    sectionColor: 'text-purple-400',
    pts: 20,
    q: 'A conjoint study on noise-canceling headphones produces the following part-worth utilities. Brand: Sony=6.2, Bose=7.8, Apple=8.4. Battery life: 20hr=4.1, 30hr=5.9, 40hr=7.2. Noise canceling: Good=3.5, Excellent=6.0, Best-in-class=7.8. Price: $199=8.5, $249=6.2, $299=4.8, $349=2.1. Which attribute is most important, and what is the relative importance of Price?',
    context: 'Attribute Importance = MAX utility − MIN utility within that attribute (this is the RANGE).\nThe range measures how much that attribute can swing total consumer utility — a large range = a highly important attribute.\n\nRelative Importance = attribute range ÷ sum of all attribute ranges\n\nCompute range for each attribute first, then total all ranges.',
    hint: 'Brand range: 8.4 − 6.2 = 2.2\nBattery range: 7.2 − 4.1 = 3.1\nNoise canceling range: 7.8 − 3.5 = 4.3\nPrice range: 8.5 − 2.1 = 6.4\nTotal ranges = 2.2 + 3.1 + 4.3 + 6.4 = 16.0',
    options: [
      'a) Brand is most important (highest single utility = 8.4); Price relative importance = 25%',
      'b) Price is most important (largest range = 6.4); Price relative importance = 40%',
      'c) Noise canceling is most important (widest performance spread); Price relative importance = 30%',
      'd) Battery life is most important (most levels tested); Price relative importance = 19%',
    ],
    correct: 'b',
    explanation: 'Step-by-step importance calculation:\n\nStep 1 — Compute each attribute\'s range (MAX − MIN):\n• Brand: 8.4 (Apple) − 6.2 (Sony) = 2.2\n• Battery: 7.2 (40hr) − 4.1 (20hr) = 3.1\n• Noise canceling: 7.8 (Best) − 3.5 (Good) = 4.3\n• Price: 8.5 ($199) − 2.1 ($349) = 6.4 ← LARGEST RANGE\n\nStep 2 — Sum all ranges:\n2.2 + 3.1 + 4.3 + 6.4 = 16.0\n\nStep 3 — Relative importance:\n• Brand: 2.2/16.0 = 13.75%\n• Battery: 3.1/16.0 = 19.4%\n• Noise canceling: 4.3/16.0 = 26.9%\n• Price: 6.4/16.0 = 40.0% ← MOST IMPORTANT\n\nPrice is the most important attribute. It has the largest range (6.4), meaning choosing between the cheapest ($199) and most expensive ($349) option swings consumer utility by 6.4 units — more than any other attribute.\n\nCommon exam trap: Option (a) says Brand is most important because Apple has the highest single utility (8.4). WRONG. Importance is not about which level has the highest number — it\'s about the RANGE. A high-scoring attribute with a narrow range (like Brand at 2.2) matters less than a medium-scoring attribute with a wide range (like Price at 6.4).\n\nImplication for product strategy: When price has 40% relative importance, competing on brand alone (13.75%) is insufficient. Consumers in this category are highly price sensitive — pricing decisions matter more than brand investments.',
  },
  {
    qNum: '9',
    topic: 'Segmentation — STP Application',
    section: 'Segmentation, Targeting & Positioning',
    sectionColor: 'text-cyan-400',
    pts: 20,
    q: 'A credit card company is designing its segmentation strategy. Their analyst proposes four possible segmentation bases: (A) Age 25-35 demographic segment, (B) Income over $75K demographic segment, (C) Lifestyle — "young professionals who value experiences" psychographic segment, (D) Behavioral — customers who carry a monthly balance vs. customers who pay in full each month. Which segmentation base is MOST actionable for maximizing CLV, and why?',
    context: 'The credit card revenue model:\n• Transactors: pay full balance monthly → bank earns only interchange fees (1-2% of purchases)\n• Revolvers: carry a balance → bank earns interest income (15-24% APR) PLUS interchange fees\n• Same product, completely different revenue streams\n\nEvaluate each segmentation basis against two criteria: (1) Does it predict CLV? (2) Is it actionable for strategy?',
    hint: 'Ask yourself: does knowing someone is "age 25-35" tell you whether they\'ll carry a balance? Does knowing their income tell you their payment behavior? Does knowing their lifestyle tell you their credit usage pattern?\n\nWhich segmentation variable DIRECTLY separates high-CLV from low-CLV customers?',
    options: [
      'a) Age 25-35 (demographic) — large, targetable segment with consistent spending patterns',
      'b) Income over $75K (demographic) — higher income predicts higher spending and lower default risk',
      'c) "Young professionals who value experiences" (psychographic) — richer insight into spending motivations',
      'd) Balance carriers vs. full-payers (behavioral) — directly separates high-revenue Revolvers from low-revenue Transactors',
    ],
    correct: 'd',
    explanation: 'This is the core STP lesson from the credit card case in class.\n\nWhy behavioral segmentation wins:\n\nTransactors vs. Revolvers is a behavioral segmentation — it segments by what customers actually DO (payment behavior), not who they are demographically or what they value psychographically.\n\nCLV impact:\n• Revolver CLV: Bank earns 15-24% APR on the carried balance + interchange fees. A customer carrying $5,000/month generates ~$75-100/month in interest alone.\n• Transactor CLV: Bank earns $1-2% interchange only. Same $5,000 spender → $50-100/month, then the balance clears.\n• CLV difference: Revolvers can be 3-5x more valuable than Transactors.\n\nWhy the other options fail:\n• Option (a) Age 25-35: Age doesn\'t predict payment behavior. A 28-year-old with student loans and a 28-year-old trust fund recipient have opposite payment patterns.\n• Option (b) Income $75K+: Higher income is actually associated with LOWER balances (can afford to pay in full), making these customers potentially LESS valuable as Revolvers.\n• Option (c) Lifestyle "experience values": Interesting for creative targeting, but doesn\'t reliably distinguish Transactors from Revolvers. An experience-seeker might pay every month to avoid debt on their travels.\n\nStratagic implication: Banks use this segmentation actively — they offer low intro rates to Transactors specifically to convert them to Revolvers, increasing CLV. The behavioral segment directly maps to the revenue model in a way no demographic or psychographic segment can match.',
  },
  {
    qNum: '10',
    topic: 'Fear Appeals — Advertising Design',
    section: 'Advertising Strategy',
    sectionColor: 'text-orange-400',
    pts: 20,
    q: 'A cybersecurity company is designing an ad campaign targeting small business owners about ransomware risk. They have three creative concepts: (A) A calm informational ad listing ransomware statistics and features of their software. (B) A moderate-fear ad showing a small business owner discovering their files are locked, then showing how the software prevented the attack in another business — with a clear call-to-action and 30-day free trial. (C) A high-fear ad with graphic footage of a business destroyed by ransomware, devastating interviews with affected owners, and messaging that "it will happen to you." Which creative approach is most effective, and why?',
    context: 'Fear appeals follow an inverted-U relationship with effectiveness:\n• Zero/low fear → no motivation to act (audiences tune out, no urgency)\n• Moderate fear → optimal engagement and behavior change\n• High/excessive fear → defensive avoidance (denial, "it won\'t happen to me," change the channel)\n\nKey design principle: fear must always be paired with a SPECIFIC, ACHIEVABLE solution that gives the audience a clear path to safety.',
    hint: 'Concept A has no fear — people ignore it. Concept C has maximum fear — people feel helpless and avoid. Concept B creates concern without overwhelming, then immediately provides the solution (free trial). This is the optimal inverted-U positioning.',
    options: [
      'a) Option A — rational appeals work best for B2B audiences who make analytical decisions',
      'b) Option C — maximum fear maximizes urgency and drives immediate purchase decisions',
      'c) Option B — moderate fear creates engagement; pairing with a clear solution converts anxiety into action',
      'd) Option C is best for awareness, Option A is best for conversion — run sequentially',
    ],
    correct: 'c',
    explanation: 'This is a direct application of the Fear Appeals Inverted-U model.\n\nOption A (No fear — purely rational):\nProblem: In a crowded information environment, a calm informational ad about ransomware statistics gets scrolled past. Small business owners know ransomware is a risk — they need motivation to act NOW, not more information. Without emotional engagement, the rational message doesn\'t overcome inertia.\n\nOption C (Maximum fear):\nThis violates the key principle: too much fear triggers psychological defense mechanisms.\n• Denial: "That won\'t happen to my small business"\n• Avoidance: People change the channel, skip the ad, or mentally disengage\n• Helplessness: When the threat feels unsurvivable, consumers don\'t seek solutions — they freeze\nGraphic footage of destroyed businesses communicates "this is catastrophic and unstoppable," which paradoxically reduces protective behavior.\n\nOption B (Moderate fear + specific solution) — CORRECT:\nThe inverted-U is optimized here:\n• Creates real concern: seeing a locked screen is relatable and immediate\n• Does not overwhelm: the owner discovers the problem but isn\'t destroyed by it\n• Immediately provides a clear, specific, achievable solution: another business that WAS protected, with a 30-day free trial CTA\n• The solution makes the fear actionable — "I can prevent this" rather than "I\'m helpless"\n\nDesign rule for fear appeals: Fear + Specific Solution + Low Barrier to Action = behavior change. Any one of these missing and the ad fails.\n\nOption (d) is wrong because running max-fear awareness ads first would make audiences avoid follow-up ads — you can\'t recover from excessive fear.',
  },
  {
    qNum: '11',
    topic: 'EVC Calculation',
    section: 'Pricing Strategy',
    sectionColor: 'text-red-400',
    pts: 20,
    q: 'TechFlow sells industrial data analytics software. The competing product (DataSuite) is priced at $50,000/year per enterprise license. TechFlow\'s platform offers the following differences vs. DataSuite: processes data 3x faster, saving operations teams 200 hours/year at $80/hour; reduces data errors by 40%, preventing an average of $15,000 in annual compliance penalties; but requires 80 hours of IT setup at $100/hour. What is TechFlow\'s EVC, and what is the maximum rational price a customer would pay?',
    context: 'EVC = Reference Value + Differentiation Value\n• Reference Value = competitor price (DataSuite at $50,000)\n• Differentiation Value = sum of ALL monetary attribute differences (positive = your advantage, negative = your disadvantage)\n\nQuantify each attribute difference in dollar terms:\n1. Speed advantage: 200 hrs × $80/hr = ?\n2. Error reduction: $15,000 compliance savings = ?\n3. Setup cost: 80 hrs × $100/hr = ? (this is a NEGATIVE — customer bears this cost)',
    hint: 'Diff Value = +$16,000 (speed) + $15,000 (compliance) − $8,000 (setup) = +$23,000\nEVC = $50,000 + $23,000 = $73,000',
    options: [
      'a) $50,000 — EVC equals the reference price since competitors set the ceiling',
      'b) $58,000 — only positive differentiation counts toward EVC',
      'c) $73,000 — Reference Value ($50K) + net Differentiation Value ($23K)',
      'd) $81,000 — full sum of all advantages without netting setup cost',
    ],
    correct: 'c',
    explanation: 'EVC calculation step by step:\n\nStep 1 — Reference Value:\nDataSuite price = $50,000. This is what a rational customer pays if they choose the alternative.\n\nStep 2 — Quantify each Differentiation Value component:\n• Speed advantage: 200 hours saved × $80/hour = +$16,000/year\n  (Customer\'s operations team gets 200 hours back. At $80/hr fully loaded cost, that\'s $16K in recovered labor value.)\n\n• Error reduction: 40% fewer compliance errors → prevents $15,000 in annual penalties\n  = +$15,000/year\n\n• Setup cost: 80 hours of IT time × $100/hour = −$8,000\n  (This is a NEGATIVE differentiation value — the customer bears this cost with TechFlow that they don\'t with DataSuite.)\n\nStep 3 — Net Differentiation Value:\n$16,000 + $15,000 − $8,000 = +$23,000\n\nStep 4 — EVC:\nEVC = $50,000 + $23,000 = $73,000\n\nInterpretation: A rational enterprise buyer who understands the full value calculation would pay up to $73,000 for TechFlow before switching to DataSuite at $50,000 becomes more economical.\n\nStrategic pricing zone:\n• Floor = TechFlow\'s cost (not given)\n• Ceiling = EVC = $73,000\n• Actual price might be $60,000-$65,000: gives customer $8-13K in savings vs ceiling (incentive to choose TechFlow), while TechFlow captures $10-15K premium vs DataSuite\n\nWhy option (d) is wrong: Ignoring the setup cost ($8,000) overstates EVC. Differentiation Value includes ALL differences — positive AND negative. A customer doing their own analysis would subtract the setup cost from the value they receive.',
  },
  {
    qNum: '12',
    topic: 'Promotion ROI — Baseline Trap',
    section: 'Marketing Analytics',
    sectionColor: 'text-teal-400',
    pts: 20,
    q: 'A beverage brand runs a $200K consumer promotion in December. Sales in December = $2.4M. Average monthly sales for January-November (non-promotion months) = $1.6M. A junior analyst reports ROI = ($800K incremental − $200K cost) / $200K = 300%. The VP of Marketing questions whether the baseline is correct. After running a regression controlling for December seasonality, the estimated baseline is $2.0M. What is the correct promotion ROI?',
    context: 'Incremental Sales = Actual Sales − Baseline Sales\nROI = (Incremental Revenue − Promotion Cost) / Promotion Cost\n\nThe critical question: what IS the baseline?\n• Naive baseline: average of non-promotion months = $1.6M\n• Regression-adjusted baseline: controls for seasonality, competitor activity, trends = $2.0M\n\nDecember is typically a high-sales month for beverages regardless of promotion. The regression separates the seasonal lift from the promotional lift.',
    hint: 'Correct baseline = $2.0M (from regression, not $1.6M average)\nTrue incremental = $2.4M − $2.0M = $400K\nTrue ROI = ($400K − $200K) / $200K = ?',
    options: [
      'a) 300% — the junior analyst is correct; the average of non-promo months is the right baseline',
      'b) 200% — using the regression-adjusted baseline of $2.0M gives true incremental of $400K',
      'c) 100% — the promotion had no real impact beyond seasonal lift',
      'd) 400% — the full December sales minus the promotion cost is the correct measure',
    ],
    correct: 'b',
    explanation: 'The baseline problem is one of the most important analytics traps in marketing.\n\nNaive calculation (WRONG):\n• Baseline = average of Jan-Nov = $1.6M\n• Incremental = $2.4M − $1.6M = $800K\n• ROI = ($800K − $200K) / $200K = 300%\n\nWhy this is wrong: December is ALREADY a high-sales month due to seasonal demand. Beverages sell more in December regardless of any promotion — holiday gifting, parties, increased consumption. The naive baseline of $1.6M (average of quieter months) doesn\'t reflect what December would have looked like WITHOUT the promotion.\n\nRegression-adjusted calculation (CORRECT):\n• Regression model: Sales = intercept + β₁(promo spend) + β₂(month dummies) + error\n• Setting promo spend = 0 while keeping December month dummy → baseline = $2.0M\n• This $2.0M is the counterfactual: "what December sales would have been with no promotion"\n• True incremental = $2.4M − $2.0M = $400K\n• True ROI = ($400K − $200K) / $200K = 100%\n\nThe promotion still made money (100% ROI is good), but the naive calculation overstated it by 200 percentage points. If the firm used 300% ROI to justify a larger promotion next December, they would significantly overspend.\n\nStockpiling risk: The $400K incremental also includes some forward purchases — consumers who stocked up during the promotion won\'t buy in January. True net incremental may be even lower.\n\nExam takeaway: Baseline MUST come from regression that controls for seasonality, not from averaging non-promotional periods.',
  },
  {
    qNum: '13',
    topic: 'Full Funnel vs Performance Only',
    section: 'Advertising Strategy',
    sectionColor: 'text-orange-400',
    pts: 20,
    q: 'A DTC fashion brand has been running only performance ads (Instagram/Facebook conversion campaigns targeting purchase intent). Their cost per acquisition has risen 40% over 18 months and click-through rates have declined. A brand consultant recommends adding brand awareness campaigns (TikTok, YouTube, influencers) at roughly equal budget. The CFO argues this is wasteful — brand ads don\'t generate measurable conversions. Who is right, and what does the evidence suggest about the relationship between brand and performance advertising?',
    context: 'Full funnel framework from class:\n• Brand advertising (top of funnel): builds awareness, recall, emotional association, consideration\n• Performance advertising (bottom of funnel): captures existing demand, drives conversion\n• These are NOT substitutes — they target different stages of the customer journey\n\nKey evidence: TikTok case study showed that brands running BOTH brand awareness AND performance ads outperformed single-channel campaigns. Brand awareness makes performance ads more effective because the brand is already known when the conversion prompt appears.',
    hint: 'If only running performance ads, you\'re fishing in an increasingly small, competitive pond — people who already know your brand and have purchase intent. Brand ads expand the pond by building consideration earlier in the journey. Rising CAC is a symptom of depleted top-of-funnel.',
    options: [
      'a) CFO is right — brand ads are unmeasurable and DTC brands should focus on performance ROI',
      'b) Brand consultant is right — rising CAC signals depleted top-of-funnel; brand ads create the awareness that makes performance ads more efficient, producing a 1+1=3 complementarity effect',
      'c) Both are right — run performance ads for current customers and brand ads only for new markets',
      'd) Neither — the solution is better targeting algorithms for existing performance campaigns',
    ],
    correct: 'b',
    explanation: 'The CFO\'s position is a common and costly mistake in DTC marketing.\n\nWhy rising CAC signals a structural problem:\nPerformance-only advertising "fishes" from a fixed pool of high-intent consumers — people who already know the brand, have searched for similar products, or are in an active purchase window. As competition grows (more brands bidding on the same intent signals), the cost per click rises and the pool of qualified, unconverted prospects shrinks. This is why CAC rises and CTR falls over 18 months — not because the ads got worse, but because the accessible pool got smaller and more expensive.\n\nWhat brand advertising does:\nBrand campaigns (TikTok awareness, YouTube pre-roll, influencer content) operate at the TOP of the funnel:\n• They create recognition before a purchase need exists\n• They build positive emotional association (crucial for fashion — identity/style brand)\n• They expand the pool of people who will recognize and respond to performance ads later\n\nThe "1+1=3" complementarity effect (from TikTok case):\nWhen someone sees a brand-aware performance ad for a brand they already recognize and positively associate with, they convert at significantly higher rates than cold audiences. Brand advertising "warms" the audience that performance ads then convert. The combination produces results neither campaign achieves alone.\n\nEvidence on CFO\'s concern about measurability:\nBrand advertising IS harder to attribute directly — there\'s no click-to-purchase tracking. But measuring only what\'s easily measurable is the "drunk looking for keys under the lamppost" problem. The 40% CAC increase is the measurable symptom of under-investing in brand. The solution isn\'t better targeting algorithms — it\'s refilling the top of the funnel.\n\nConclusion: Brand consultant is right. The firm should invest in brand awareness now to restore top-of-funnel health and reduce long-term CAC.',
  },
  {
    qNum: '14',
    topic: 'IC Constraint — Product Design',
    section: 'Product Line Pricing',
    sectionColor: 'text-amber-400',
    pts: 20,
    q: 'A streaming service has two customer segments: Casual viewers (200 users) with WTP $8/month for Basic and $12/month for Premium. Power users (100 users) with WTP $15/month for Basic and $25/month for Premium. The firm wants to offer a product line. (a) What is the IC-constrained maximum price for Premium? (b) What is the product line monthly profit? (c) Does the product line beat the single-product alternative?',
    context: 'Step 1: Benchmark single product profit first:\n• Premium at $25 → only power users buy → 100 × $25 = $2,500\n• Premium at $12 → all 300 buy → 300 × $12 = $3,600 ← optimal single product\n\nStep 2: IC constraint for product line:\nP_Premium ≤ WTP_power(Premium) − WTP_power(Basic) + P_Basic\nSet P_Basic = $8 (casual viewers\' WTP)',
    hint: 'IC: P_Premium ≤ $25 − $15 + $8 = $18\nProduct line: 200 × $8 + 100 × $18 = $1,600 + $1,800 = $3,400\nSingle product optimum = $3,600\nCheck: do casual viewers switch to Premium at $18? WTP = $12 < $18 → No, they cannot afford it. Segmentation holds.',
    options: [
      'a) Max Premium = $18; Product line = $3,400/month; Single product ($3,600) wins',
      'b) Max Premium = $17; Product line = $3,300/month; Product line wins',
      'c) Max Premium = $18; Product line = $3,600/month; They tie',
      'd) Max Premium = $25; Product line = $4,100/month; Product line wins',
    ],
    correct: 'a',
    explanation: 'Full product line analysis:\n\nStep 1 — Single product benchmark:\n• Price Premium at $25 → only power users (100) buy → 100 × $25 = $2,500\n• Price Premium at $12 → all 300 buy → 300 × $12 = $3,600 ← OPTIMAL SINGLE PRODUCT\n\nStep 2 — IC constraint:\nPower users must weakly prefer Premium over Basic:\nWTP_power(Premium) − P_Premium ≥ WTP_power(Basic) − P_Basic\n$25 − P_Premium ≥ $15 − $8\n$25 − P_Premium ≥ $7\nP_Premium ≤ $25 − $7 = $18\n\nStep 3 — Product line profit at IC-constrained prices:\n• P_Basic = $8 → 200 casual viewers buy → 200 × $8 = $1,600\n• P_Premium = $18 → 100 power users buy → 100 × $18 = $1,800\n• Total = $3,400/month\n\nStep 4 — Check segmentation integrity:\nDo casual viewers want to upgrade to Premium at $18?\n• Casual WTP for Premium = $12\n• Price = $18\n• $18 > $12 → Casual viewers CANNOT rationalize buying Premium. Segmentation holds. ✓\n\nDo power users switch down to Basic?\n• Power user surplus from Premium: $25 − $18 = $7\n• Power user surplus from Basic: $15 − $8 = $7\n• Equal surplus! At exactly the IC boundary, power users are indifferent. In practice, set Premium slightly below $18 ($17.99) to ensure they prefer Premium.\n\nStep 5 — Compare:\n• Single product: $3,600/month\n• Product line: $3,400/month\n• Single product wins by $200/month\n\nWhy does single product win here? The WTP spread between the two segments for the basic product ($15 vs $8 = $7 gap) forces a $7 IC discount on Premium. That discount costs $7 × 100 power users = $700 in lost revenue, while the product line only gains 200 × $8 = $1,600 from casual viewers. Compare: single product at $12 already captures all 300 users. The market expansion ($1,600 from casual) is offset by the IC discount loss on power users.',
  },
  {
    qNum: '15',
    topic: 'AI Tools — CLV Lever Mapping',
    section: 'AI & Marketing Analytics',
    sectionColor: 'text-teal-400',
    pts: 20,
    q: 'An e-commerce company is evaluating four AI investments for their marketing team: (1) A recommendation engine that suggests complementary products after purchase. (2) A churn prediction model that flags customers with declining purchase frequency and triggers a "we miss you" win-back email. (3) A lookalike modeling tool that finds prospects with behavioral profiles similar to their top 10% customers. (4) Dynamic pricing that adjusts prices in real time based on demand signals and competitor pricing. Map each tool to its PRIMARY CLV lever (Acquisition, Retention, or Expansion) and identify which has the highest potential firm value impact.',
    context: 'CLV levers and their impact on firm value:\n• Retention (+1% → +4.9% firm value): keeping existing customers longer\n• Expansion (+1% margin → +1.1% firm value): getting more from existing customers\n• Acquisition (−1% AC → +0.1% firm value): getting customers more cheaply\n\nMap each AI tool to the lever it primarily activates.',
    hint: 'Recommendation engine → more purchases from existing customers → which lever?\nChurn prediction → prevents customers from leaving → which lever?\nLookalike modeling → finds better acquisition targets → which lever?\nDynamic pricing → adjusts prices to capture more value → which lever?',
    options: [
      'a) All four are Acquisition tools — they all ultimately drive new customer growth',
      'b) (1)=Expansion, (2)=Retention, (3)=Acquisition, (4)=Expansion/Margin. Highest impact: (2) Churn prediction (Retention lever = 4.9% per 1% improvement)',
      'c) (1)=Retention, (2)=Acquisition, (3)=Expansion, (4)=Acquisition. Highest impact: (3) Lookalike modeling',
      'd) (1)=Acquisition, (2)=Retention, (3)=Expansion, (4)=Retention. Highest impact: (1) Recommendation engine',
    ],
    correct: 'b',
    explanation: 'Mapping AI tools to CLV levers:\n\n(1) Recommendation engine → EXPANSION lever\nAmazon\'s recommendation engine (responsible for ~35% of revenue) increases share of wallet from EXISTING customers. It doesn\'t acquire new customers — it gets current customers to buy more (cross-sell, up-sell). This is the Expansion lever: increasing margin m from the existing base.\n\n(2) Churn prediction model → RETENTION lever\nBy identifying customers with declining engagement BEFORE they cancel, the model enables proactive intervention (win-back email, special offer, customer success call). This directly extends the customer relationship — increasing retention rate r. The Retention lever has the highest CLV sensitivity (4.9% firm value per 1% improvement).\n\n(3) Lookalike modeling → ACQUISITION lever\nThis tool finds new prospects who look like your best customers. It doesn\'t touch existing customers at all — it improves the targeting efficiency of acquisition campaigns, effectively reducing acquisition cost AC or improving the quality of acquired customers. This is the Acquisition lever (lowest sensitivity at 0.1%).\n\n(4) Dynamic pricing → EXPANSION lever (primarily)\nReal-time price adjustment based on demand signals captures more value from existing transactions — raising prices when demand is high increases margin m per transaction. This is primarily an Expansion/margin lever, though it also intersects with fairness considerations (the Coke vending case shows the risks).\n\nHighest potential impact: Tool (2) Churn Prediction\nBecause it activates the Retention lever, which at 4.9% firm value per 1% improvement is 49× more impactful than Acquisition (0.1%) and 4.5× more impactful than Expansion (1.1%). A company that can predict churn and prevent even a fraction of it will generate more firm value than any amount of better targeting or price optimization.\n\nExam rule: Always map AI capabilities to CLV levers before evaluating them. The lever determines the value ceiling of the investment.',
  },
];

function pickRandom5() {
  const shuffled = [...mockExamQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

function MockExam() {
  const [questions, setQuestions] = useState(() => pickRandom5());
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answered, setAnswered] = useState({});
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const q = questions[currentQ];
  const totalPts = questions.reduce((a, q) => a + q.pts, 0);
  const earnedPts = questions.reduce((a, q, i) => {
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
    if (currentQ === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQ(q => q + 1);
    }
  };

  const handleRestart = () => {
    setQuestions(pickRandom5());
    setCurrentQ(0); setAnswers({}); setAnswered({});
    setFinished(false); setStreak(0); setMaxStreak(0);
  };

  // Group questions by section
  const sectionProgress = () => {
    const sections = {};
    questions.forEach((q, i) => {
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
            New Random 5 Questions →
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">Each attempt draws 5 random questions from the 15-question pool</p>
        </Card>

        <Card>
          <h3 className="text-white font-semibold mb-3">All Answers Review</h3>
          <div className="space-y-2">
            {questions.map((mq, i) => (
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
            <p className="text-xs text-gray-400">EMBA 206 · 5 random questions from 15-question pool · 100 pts</p>
            <p className={`text-sm font-semibold mt-0.5 ${q.sectionColor}`}>{q.section} — {q.topic}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <StreakBadge streak={streak} />
              <span className="text-blue-400 text-sm font-semibold">{earnedPts}/{totalPts} pts</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">Q {currentQ + 1} of {questions.length}</p>
          </div>
        </div>
        <div className="w-full h-1.5 bg-gray-700 rounded-full">
          <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${(currentQ / questions.length) * 100}%` }} />
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
                {currentQ === questions.length - 1 ? 'See Final Score →' : 'Next Question →'}
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
