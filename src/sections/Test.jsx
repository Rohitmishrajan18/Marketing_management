import { useState, useEffect } from 'react';
import Card from '../components/Card';
import ExamTraps from './ExamTraps';

const flashcardData = [
  { q: 'What is CLV?', a: 'Net present value of all future profit streams from a customer over their relationship with the firm' },
  { q: 'CLV Simple Formula (constant margins)', a: 'CLV = m * r/(1+i-r) where m=margin, r=retention, i=discount rate' },
  { q: 'Margin Multiple', a: 'r/(1+i-r) - converts annual margin to CLV' },
  { q: 'EVC Formula', a: 'EVC = Reference Value + Differentiation Value' },
  { q: 'Conjoint Attribute Importance', a: 'Max utility - Min utility for that attribute' },
  { q: 'Total Product Utility', a: 'Sum of part-worth utilities for each attribute level' },
  { q: 'Incentive Compatibility (Product Line)', a: 'WTP_high(high) - P_high >= WTP_high(low) - P_low' },
  { q: '1% improvement in retention = ?', a: '4.9% improvement in firm value' },
  { q: 'Two Sides of Value quadrants', a: 'Star (high/high), Vulnerable (high profit/low experience), Free Riders (low profit/high experience), Lost Causes (low/low)' },
  { q: 'Three CLV Levers', a: 'Acquisition (reduce AC), Retention (increase r), Expansion (increase m)' },
  { q: 'Pull vs Push', a: 'Pull = advertising/consumer promos to create demand; Push = trade promos/personal selling through channel' },
  { q: 'Vertical vs Horizontal Positioning', a: 'Vertical = quality (everyone prefers more, differ in WTP); Horizontal = taste/style (preferences differ)' },
  { q: 'Freemium key tradeoff', a: 'Traffic generation vs upgrade conversion' },
  { q: 'Baseline sales', a: 'Predicted sales that would have occurred WITHOUT the promotion' },
  { q: 'Fear appeals effectiveness', a: 'Inverted-U: moderate fear is optimal; too much causes denial/avoidance' },
  { q: 'What is Absolute CLV?', a: 'NPV of future profits from a customer, without subtracting acquisition cost' },
  { q: 'What is Relative CLV?', a: 'Absolute CLV minus acquisition cost; true profitability accounting for customer acquisition' },
  { q: 'Customer Acquisition impact on firm value', a: '1% AC reduction = 0.1% firm value impact' },
  { q: 'Customer Expansion definition', a: 'Increasing revenue from existing customers via cross-selling, up-selling, bundling, recommendations' },
  { q: '1% margin increase = ?', a: '1.1% firm value impact' },
  { q: 'Star Customers definition', a: 'High customer experience (value created) AND high profitability (value captured); invest for growth' },
  { q: 'Free Riders definition', a: 'High customer experience (value created) but low profitability (value captured); need monetization strategy' },
  { q: 'Vulnerable Customers definition', a: 'High profitability (value captured) but low experience (value created); risk of churn' },
  { q: 'Lost Causes definition', a: 'Low on both dimensions; unlikely to be profitable, consider divesting' },
  { q: 'Bundling impact on churn', a: 'Reduces churn by up to 50% (Cox Communications data)' },
  { q: 'Cannibalization definition', a: 'New product steals sales from existing product lines; occurs when price/positioning too similar' },
  { q: 'Consumer Promotion examples', a: 'Coupons, rebates, samples, contests, price cuts' },
  { q: 'Trade Promotion examples', a: 'Quantity discounts, advertising allowances, display allowances' },
  { q: 'Emotional Advertising works best when', a: 'High competition with substitutable products; helps increase involvement in low-differentiation categories' },
  { q: 'Humor in advertising risk', a: 'May overshadow product benefits or cheapen brand - must pre-test' },
  { q: 'Comparative advertising best for', a: 'Challenger brands on verifiable attributes; risky for market leaders' },
  { q: 'Shrinkflation definition', a: 'Reduce quantity/size while maintaining price to offset cost increases' },
  { q: 'Price floor set by', a: 'Production cost plus desired margin' },
  { q: 'Price ceiling set by', a: 'EVC (Economic Value to Customer)' },
  { q: 'Simpson\'s Paradox in marketing', a: 'Illustrates why segmentation matters; aggregate data can reverse relationships shown in segments' },
];

const quizQuestions = [
  {
    q: 'Recommendation systems are an example of:',
    options: [
      'a) Customer retention',
      'b) Customer acquisition',
      'c) Customer expansion',
      'd) None',
    ],
    correct: 'c',
    explanation: 'Recommendation systems identify cross-sell and upsell opportunities, increasing share of wallet from existing customers = expansion lever'
  },
  {
    q: 'Creating more customer value without capturing it creates more:',
    options: [
      'a) Star Customers',
      'b) Free Riders',
      'c) Lost Causes',
      'd) Vulnerable Customers',
    ],
    correct: 'b',
    explanation: 'Free Riders have high customer experience (value created) but low profitability (value captured)'
  },
  {
    q: 'Behavioral segmentation variables include:',
    options: [
      'a) Usage intensity and consumption frequency',
      'b) Lifestyle and marital status',
      'c) Income and age',
      'd) Region and climate',
    ],
    correct: 'a',
    explanation: 'Behavioral variables measure how customers interact with products: usage intensity, consumption frequency, loyalty'
  },
  {
    q: 'Vertical positioning attributes include:',
    options: [
      'a) Safety',
      'b) Styling',
      'c) Color',
      'd) Location',
    ],
    correct: 'a',
    explanation: 'Vertical positioning = quality/performance attributes where everyone prefers more. Safety is quality; styling/color are taste (horizontal)'
  },
  {
    q: 'CLV is best described as:',
    options: [
      'a) Total lifetime revenue',
      'b) NPV of future profits',
      'c) Historical customer profitability',
      'd) Annual margin times years',
    ],
    correct: 'b',
    explanation: 'CLV = Net Present Value of all future profit streams, forward-looking not historical'
  },
  {
    q: 'Attribute importance in conjoint is calculated as:',
    options: [
      'a) Highest part-worth',
      'b) Average of utilities',
      'c) Max minus Min range',
      'd) Sum of utilities',
    ],
    correct: 'c',
    explanation: 'Attribute Importance = Range = Max utility - Min utility for that attribute'
  },
  {
    q: 'EVC sets the:',
    options: [
      'a) Price floor',
      'b) Optimal price',
      'c) Price ceiling',
      'd) Competitor\'s price',
    ],
    correct: 'c',
    explanation: 'EVC (Economic Value to Customer) = Reference Value + Differentiation Value; this is the maximum price a customer would pay = ceiling'
  },
  {
    q: '1% improvement in retention improves firm value by:',
    options: [
      'a) 0.1%',
      'b) 1.1%',
      'c) 4.9%',
      'd) 10%',
    ],
    correct: 'c',
    explanation: 'Retention has 49x more impact on firm value than acquisition cost reduction'
  },
  {
    q: 'Shrinkflation is:',
    options: [
      'a) Raising prices',
      'b) Reducing quantity at same price',
      'c) Offering discounts',
      'd) Bundling products',
    ],
    correct: 'b',
    explanation: 'Shrinkflation reduces size/quantity while maintaining price to offset cost increases'
  },
  {
    q: 'The Coke vending machine case illustrates:',
    options: [
      'a) Dynamic pricing success',
      'b) Fairness constraints on pricing',
      'c) Temperature-based demand',
      'd) Channel optimization',
    ],
    correct: 'b',
    explanation: 'Temperature-based pricing violated fairness norms because temperature is outside consumer control'
  },
  {
    q: 'In product line pricing, cannibalization occurs when:',
    options: [
      'a) New product attracts new customers',
      'b) High-type buys the low product',
      'c) Both segments buy high product',
      'd) Prices are too high',
    ],
    correct: 'b',
    explanation: 'Cannibalization = high-type customer buys low product instead of intended high product (IC constraint violation)'
  },
  {
    q: 'Freemium cannibalization can be controlled by:',
    options: [
      'a) Removing free tier',
      'b) Adding ads to free tier',
      'c) Raising premium price',
      'd) Limiting sign-ups',
    ],
    correct: 'b',
    explanation: 'Adding a "bad" (like ads in Spotify free) increases the value differential between tiers'
  },
  {
    q: 'Humor in advertising should:',
    options: [
      'a) Be the main focus',
      'b) Not clutter product benefits',
      'c) Replace rational claims',
      'd) Target competitors',
    ],
    correct: 'b',
    explanation: 'Humor cuts through clutter and aids memorability, but must not overshadow the product benefit'
  },
  {
    q: 'Bundling reduces churn by up to:',
    options: [
      'a) 10%',
      'b) 25%',
      'c) 50%',
      'd) 75%',
    ],
    correct: 'c',
    explanation: 'Cox Communications data shows bundling reduces churn by up to 50% - powerful retention lever'
  },
  {
    q: 'The margin multiple formula is:',
    options: [
      'a) m/(1+i)',
      'b) r/(1+i-r)',
      'c) m*r/i',
      'd) (1+i)/r',
    ],
    correct: 'b',
    explanation: 'Margin Multiple = r/(1+i-r) - converts annual margin to CLV'
  },
];

function Flashcards() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffled, setShuffled] = useState([...flashcardData]);

  const handlePrevious = () => {
    setCurrentCard(prev => (prev === 0 ? shuffled.length - 1 : prev - 1));
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentCard(prev => (prev === shuffled.length - 1 ? 0 : prev + 1));
    setIsFlipped(false);
  };

  const handleShuffle = () => {
    const newShuffled = [...shuffled].sort(() => Math.random() - 0.5);
    setShuffled(newShuffled);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const card = shuffled[currentCard];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-400 text-sm">Card {currentCard + 1} of {shuffled.length}</p>
      </div>

      <div className="perspective">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="cursor-pointer h-80"
          style={{
            perspective: '1000px',
          }}
        >
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.6s',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Front of card */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-8 flex items-center justify-center h-full border border-blue-700 cursor-pointer"
            >
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">QUESTION</p>
                <p className="text-2xl font-semibold text-white">{card.q}</p>
                <p className="text-gray-400 text-xs mt-8">Click to reveal answer</p>
              </div>
            </div>

            {/* Back of card */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
              className="bg-gradient-to-br from-green-900 to-green-800 rounded-xl p-8 flex items-center justify-center h-full border border-green-700 cursor-pointer absolute top-0 left-0 w-full"
            >
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">ANSWER</p>
                <p className="text-xl font-semibold text-white">{card.a}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isFlipped ? 'Hide Answer' : 'Show Answer'}
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Next
        </button>
        <button
          onClick={handleShuffle}
          className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[currentQuestion];

  const handleCheckAnswer = () => {
    if (selectedAnswer === question.correct) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion === quizQuestions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setFinished(false);
  };

  if (finished) {
    return (
      <Card className="text-center py-12">
        <h3 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h3>
        <p className="text-5xl font-bold text-blue-400 mb-4">
          {score}/{quizQuestions.length}
        </p>
        <p className="text-gray-400 mb-6">
          {Math.round((score / quizQuestions.length) * 100)}% Correct
        </p>
        <button
          onClick={handleRestart}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-400">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </p>
        <p className="text-blue-400 font-semibold">Score: {score}</p>
      </div>

      <Card>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">{question.q}</h3>

          <div className="space-y-2">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !answered && setSelectedAnswer(option[0])}
                disabled={answered}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  selectedAnswer === option[0]
                    ? answered
                      ? option[0] === question.correct
                        ? 'bg-green-900/30 border-2 border-green-500 text-green-300'
                        : 'bg-red-900/30 border-2 border-red-500 text-red-300'
                      : 'bg-blue-900/30 border-2 border-blue-500 text-blue-300'
                    : 'bg-gray-800 border-2 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {answered && (
            <div className="border-t border-gray-800 pt-4 space-y-2">
              <p className="text-sm font-semibold text-amber-400">Explanation:</p>
              <p className="text-sm text-gray-300">{question.explanation}</p>
            </div>
          )}

          <div className="flex gap-3">
            {!answered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedAnswer
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next Question'}
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

function InteractiveExamTraps({ search }) {
  const [expandedTraps, setExpandedTraps] = useState({});

  const traps = [
    {
      id: 'clv-revenue',
      wrong: 'CLV = total revenue from customer',
      why: 'CLV is the NPV of future PROFITS, not revenue. Revenue minus variable costs (margin) is what matters.',
    },
    {
      id: 'retention-spend',
      wrong: 'Higher retention always means spend more on retention',
      why: 'Depends on marginal cost. While 1% retention improvement = 4.9% firm value, if it costs more than 1% margin improvement, it\'s a worse investment.',
    },
    {
      id: 'all-customers-equal',
      wrong: 'All customers are equally profitable',
      why: 'Kanthal example: top 5% of customers generate majority of profit; many customers are unprofitable.',
    },
    {
      id: 'conjoint-importance',
      wrong: 'Conjoint importance = highest part-worth utility',
      why: 'Importance is the RANGE (MAX - MIN) within an attribute, not the absolute value.',
    },
    {
      id: 'utility-preference',
      wrong: 'Higher part-worth utility = consumer prefers that level (WRONG application)',
      why: 'True within an attribute, but must always sum TOTAL product utility across all attributes to compare products.',
    },
    {
      id: 'product-line-always-wins',
      wrong: 'Product line always beats single product',
      why: 'High cannibalization can make single product more profitable. Dell example: single product at $1500 = $150K vs product line = $66K.',
    },
    {
      id: 'evc-price',
      wrong: 'EVC = what you should charge',
      why: 'EVC is the CEILING for price. Actual price depends on competition and how much value you want to capture vs create.',
    },
    {
      id: 'price-discrimination-profit',
      wrong: 'Price discrimination always increases profit',
      why: 'Fairness concerns can destroy value. Coke vending machine: temperature-based pricing violated fairness norms.',
    },
    {
      id: 'shrinkflation',
      wrong: 'Shrinkflation avoids consumer backlash',
      why: 'Consumers notice; it damages trust. Shrinkflation is limited by product functionality.',
    },
    {
      id: 'fear-appeals',
      wrong: 'More fear = more effective advertising',
      why: 'Inverted-U relationship: moderate fear is most effective; too much fear causes denial/avoidance.',
    },
  ];

  const toggleTrap = (id) => {
    setExpandedTraps(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filtered = traps.filter(t =>
    !search ||
    t.wrong.toLowerCase().includes(search.toLowerCase()) ||
    t.why.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filtered.map(trap => (
        <Card
          key={trap.id}
          className="cursor-pointer"
          onClick={() => toggleTrap(trap.id)}
        >
          <div className="space-y-3">
            <div>
              <p className="text-xs text-red-400 font-semibold mb-1">WRONG INTUITION</p>
              <p className="text-sm text-gray-100">{trap.wrong}</p>
            </div>

            {expandedTraps[trap.id] && (
              <div className="border-t border-gray-800 pt-3">
                <p className="text-xs text-amber-400 font-semibold mb-1">WHY IT'S WRONG</p>
                <p className="text-sm text-gray-300">{trap.why}</p>
              </div>
            )}

            <div className="text-xs text-gray-500 mt-2">
              {expandedTraps[trap.id] ? '▼ Click to collapse' : '▶ Click to reveal'}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function Test({ subtab, search }) {
  return (
    <div className="space-y-6">
      {subtab === 'flashcards' && (
        <>
          <h2 className="text-2xl font-bold text-white">Flashcards</h2>
          <Flashcards />
        </>
      )}

      {subtab === 'quiz' && (
        <>
          <h2 className="text-2xl font-bold text-white">Practice Quiz</h2>
          <Quiz />
        </>
      )}

      {subtab === 'traps' && (
        <>
          <h2 className="text-2xl font-bold text-white">Exam Traps</h2>
          <p className="text-gray-400 mb-4">Click on each trap to reveal why it's wrong</p>
          <InteractiveExamTraps search={search} />
        </>
      )}
    </div>
  );
}