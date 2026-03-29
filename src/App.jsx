import { useState } from 'react';
import Learn from './sections/Learn';
import Review from './sections/Review';
import Practice from './sections/Practice';
import Test from './sections/Test';
import CheatSheet from './sections/CheatSheet';

export default function App() {
  const [activePhase, setActivePhase] = useState('learn');
  const [activeSubtab, setActiveSubtab] = useState('block1');
  const [search, setSearch] = useState('');

  const phases = [
    { id: 'learn', icon: '📚', label: 'Learn', component: Learn },
    { id: 'review', icon: '🔍', label: 'Review', component: Review },
    { id: 'practice', icon: '✏️', label: 'Practice', component: Practice },
    { id: 'test', icon: '🧪', label: 'Test', component: Test },
    { id: 'cheatsheet', icon: '📄', label: 'Cheat Sheet', component: CheatSheet },
  ];

  const subtabs = {
    learn: [
      { id: 'block1', label: 'Block 1: Customer Value' },
      { id: 'block2', label: 'Block 2: Product & Price' },
      { id: 'block3', label: 'Block 3: Communication' },
      { id: 'block4', label: 'Block 4: Analytics & AI' },
    ],
    review: [
      { id: 'formulas', label: 'Formulas' },
      { id: 'frameworks', label: 'Frameworks' },
      { id: 'terms', label: 'Key Terms' },
    ],
    practice: [
      { id: 'problems', label: 'Solved Problems' },
      { id: 'cases', label: 'Case Studies' },
    ],
    test: [
      { id: 'flashcards', label: 'Flashcards' },
      { id: 'quiz', label: 'Quick Quiz' },
      { id: 'mock', label: 'Mock Exam ⚡' },
      { id: 'traps', label: 'Exam Traps' },
    ],
  };

  const currentPhase = phases.find(p => p.id === activePhase);
  const CurrentComponent = currentPhase?.component;
  const currentSubtabs = subtabs[activePhase] || [];

  const handlePhaseChange = (phaseId) => {
    setActivePhase(phaseId);
    const firstSubtab = subtabs[phaseId]?.[0]?.id;
    setActiveSubtab(firstSubtab || '');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-white">EMBA 206 - Marketing Management</h1>
            <p className="text-sm text-gray-400">UC Berkeley Haas | Spring 2026 | Prof. Ganesh Iyer</p>
          </div>

          <input
            type="text"
            placeholder="Search content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-gray-800">
          <div className="flex gap-3 py-3">
            {phases.map(phase => (
              <button
                key={phase.id}
                onClick={() => handlePhaseChange(phase.id)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activePhase === phase.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">{phase.icon}</span>
                {phase.label}
              </button>
            ))}
          </div>
        </div>

        {currentSubtabs.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 border-t border-gray-800">
            <div className="flex gap-2 overflow-x-auto py-2">
              {currentSubtabs.map(subtab => (
                <button
                  key={subtab.id}
                  onClick={() => setActiveSubtab(subtab.id)}
                  className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap transition-colors ${
                    activeSubtab === subtab.id
                      ? 'bg-gray-700 text-white border-b-2 border-blue-500'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {subtab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {CurrentComponent && <CurrentComponent subtab={activeSubtab} search={search} />}
      </main>

      <footer className="border-t border-gray-800 bg-gray-950 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-sm text-gray-300 font-semibold mb-2">Final Exam Details:</p>
            <p className="text-sm text-gray-400">
              Closed book · 2 pages (8.5"×11") help sheet · 2.5 hours · 100 points · 3 questions (40/30/30 split)
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-4">EMBA 206 Study Guide | Spring 2026</p>
        </div>
      </footer>
    </div>
  );
}
