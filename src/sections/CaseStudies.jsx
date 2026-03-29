import Card from '../components/Card';

const cases = [
  {
    id: 'chase-sapphire',
    company: 'Chase Sapphire Reserve',
    topic: 'Targeting, Relationship Marketing, Cross-Selling',
    keyInsights: [
      'Millennials value "experiences" over "things," "interesting" over "rich"',
      'Strategy: 100K sign-on bonus, 3x points on travel/dining',
      'Q4 2016 charge to earnings: $200M; CEO Dimon: "I wish it had cost us more"',
      'Cross-selling impact: 4,300 CSR customers applied for mortgages (2x historical rate)',
      'Customer segmentation: different strategies for transactors, revolvers, churners',
    ],
    lesson: 'Understanding customer psychology and lifestyle preferences enables premium positioning and deep relationship building',
  },
  {
    id: 'olay-facelift',
    company: 'Facelift at Olay',
    topic: 'Repositioning, DTC Disruption, Product Line Management',
    keyInsights: [
      'Managerial inertia: successful legacy brands resist change',
      'Product proliferation trap: too many SKUs confuse consumers, create retailer pushback',
      'Repositioning requires: social media leverage, influencer partnerships, DTC channel, tools (Skin Advisor)',
      'Sarah Michelle Gellar campaign: redefine beauty standards around "aging with grace"',
      'Must move from quality/functional messaging to emotional/identity positioning',
    ],
    lesson: 'Legacy brands can reposition by embracing digital channels and changing messaging, but must overcome internal resistance',
  },
  {
    id: 'on-shoes',
    company: 'On Shoes',
    topic: 'Subscription Pricing, Value Assessment',
    keyInsights: [
      'Subscription model tradeoff: recurring revenue and predictability vs unused subscriptions',
      'Cautionary examples: BMW heated seats, HP printer cartridge subscription caused consumer backlash',
      'Key question: What are the "bads" in a subscription that cause regret or underuse?',
      'Success requires clear value: subscription should reduce friction and increase usage, not create commitment anxiety',
    ],
    lesson: 'Subscriptions work when they deliver clear ongoing value; forced commitment without perceived benefit backfires',
  },
  {
    id: 'coke-machines',
    company: 'Coke Vending Machines',
    topic: 'Price Discrimination, Fairness, Psychology',
    keyInsights: [
      'Temperature-based pricing violated fairness norms (act of god, not consumer choice)',
      'Breaks implicit contract between firm and consumer',
      'Consumer utility = economic utility + psychological utility (fairness is a utility component)',
      'Better applications: targeted communication, inventory planning, LOWER prices in cold weather',
      'Under competition, price discrimination triggers price wars in overlapping segments',
    ],
    lesson: 'Price discrimination fails without alignment with consumer fairness perceptions; transparency and fairness build trust',
  },
  {
    id: 'tiktok-funnel',
    company: 'TikTok / Full Funnel Advertising',
    topic: 'Digital Advertising, Brand + Performance Complementarity',
    keyInsights: [
      'Brand ads (top funnel) + Performance ads (bottom funnel) are complementary',
      'Brand drives engagement which increases conversion rates on performance campaigns',
      'Full funnel approach requires measurement of complementarity across channels',
      'Challenge: rich individual-level data for targeting vs privacy concerns',
      'Not all channels are complementary; must test whether combination beats single-channel',
    ],
    lesson: 'Modern digital advertising requires full-funnel thinking; brand and performance are not substitutes but complements',
  },
  {
    id: 'formlabs',
    company: 'Formlabs',
    topic: 'Distribution Channels, Go-to-Market Strategy',
    keyInsights: [
      'Channel selection drives market penetration and customer experience',
      'Direct vs indirect tradeoff: control and margin vs scale and reach',
      'B2B distribution requires alignment with customer buying processes',
      'Innovation adoption requires right channel to reach early adopters',
    ],
    lesson: 'Go-to-market strategy is as important as the product; right channel enables customer adoption at scale',
  },
];

export default function CaseStudies({ search }) {
  const filtered = cases.filter(c =>
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.topic.toLowerCase().includes(search.toLowerCase()) ||
    c.keyInsights.some(insight => insight.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      {filtered.map(caseStudy => (
        <Card key={caseStudy.id}>
          <h3 className="text-base font-semibold text-white mb-1">{caseStudy.company}</h3>
          <p className="text-xs text-blue-400 font-semibold mb-3">{caseStudy.topic}</p>

          <div className="mb-3">
            <p className="text-xs text-amber-400 font-semibold mb-2">KEY INSIGHTS</p>
            <ul className="space-y-1">
              {caseStudy.keyInsights.map((insight, i) => (
                <li key={i} className="text-sm text-gray-300 flex gap-2">
                  <span className="text-blue-400 flex-shrink-0">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-800 pt-3">
            <p className="text-xs text-green-400 font-semibold mb-1">LESSON</p>
            <p className="text-sm text-gray-300">{caseStudy.lesson}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
