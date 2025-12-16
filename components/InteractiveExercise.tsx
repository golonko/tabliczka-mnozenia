import React, { useState, useCallback, useRef } from 'react';
import { MathProblem, GeneratorSettings } from '../types';
import { Language, translations } from '../locales';
import { generateProblems } from '../services/mathGenerator';
import { Check, RotateCcw, Home } from 'lucide-react';

interface InteractiveExerciseProps {
  settings: GeneratorSettings;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBackToGenerator: () => void;
}

interface ProblemAnswer {
  id: string;
  answer: string;
  isCorrect?: boolean;
  expectedAnswer?: number;
}

const InteractiveExercise: React.FC<InteractiveExerciseProps> = ({
  settings,
  language,
  onLanguageChange,
  onBackToGenerator,
}) => {
  const t = translations[language];
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [answers, setAnswers] = useState<ProblemAnswer[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize problems on mount
  React.useEffect(() => {
    generateNewSet();
  }, []);

  const calculateExpectedAnswer = (problem: MathProblem): number => {
    switch (problem.operation) {
      case 'multiply':
        return problem.operandA * problem.operandB;
      case 'divide':
        return problem.operandA / problem.operandB;
      case 'add':
        return problem.operandA + problem.operandB;
      case 'subtract':
        return problem.operandA - problem.operandB;
      default:
        return 0;
    }
  };

  const generateNewSet = useCallback(() => {
    const newProblems = generateProblems(
      settings.problemCount,
      {
        allowMultiplication: settings.allowMultiplication,
        allowDivision: settings.allowDivision,
        allowAddition: settings.allowAddition,
        allowSubtraction: settings.allowSubtraction,
      },
      settings.minResult,
      settings.maxResult,
      settings.minFactor,
      settings.maxFactor
    );

    setProblems(newProblems);
    setAnswers(newProblems.map(problem => ({
      id: problem.id,
      answer: '',
      expectedAnswer: calculateExpectedAnswer(problem)
    })));
    setHasChecked(false);
    // Reset input refs for new problems
    inputRefs.current = new Array(newProblems.length).fill(null);
  }, [settings]);

  const handleAnswerChange = (problemId: string, value: string) => {
    setAnswers(prev => prev.map(ans =>
      ans.id === problemId
        ? { ...ans, answer: value }
        : ans
    ));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  const checkAnswers = () => {
    setAnswers(prev => prev.map(ans => {
      const numericAnswer = parseFloat(ans.answer);
      const isCorrect = !isNaN(numericAnswer) && numericAnswer === ans.expectedAnswer;
      return { ...ans, isCorrect };
    }));
    setHasChecked(true);
  };

  const correctCount = answers.filter(ans => ans.isCorrect).length;
  const totalCount = answers.length;

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{t.interactiveExercise}</h1>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <button
                  onClick={() => onLanguageChange('pl')}
                  className={`text-base leading-none transition-opacity ${language === 'pl' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  title="Polski"
                >
                  🇵🇱
                </button>
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`text-base leading-none transition-opacity ${language === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  title="English"
                >
                  🇬🇧
                </button>
              </div>
              <button
                onClick={onBackToGenerator}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                {t.backToGenerator}
              </button>
            </div>
          </div>

          {/* Summary */}
          {hasChecked && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-gray-700">
                  {t.correctAnswers}: <span className="text-indigo-600 font-bold">{correctCount}</span> / {totalCount}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={checkAnswers}
              disabled={!answers.some(ans => ans.answer.trim() !== '')}
              className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <Check className="w-4 h-4" />
              {t.checkAnswers}
            </button>
            <button
              onClick={generateNewSet}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {t.generateNewSet}
            </button>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((problem, index) => {
              const answer = answers.find(ans => ans.id === problem.id);
              const isIncorrect = hasChecked && answer && !answer.isCorrect;

              return (
                <div
                  key={problem.id}
                  className={`p-4 border rounded-lg ${
                    isIncorrect
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-gray-500 min-w-[1.5rem]">
                      {index + 1}.
                    </span>
                    <span className="text-lg font-medium text-gray-800">
                      {problem.display}
                    </span>
                  </div>
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="number"
                    value={answer?.answer || ''}
                    onChange={(e) => handleAnswerChange(problem.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`w-full p-2 border rounded-lg text-center font-medium ${
                      isIncorrect
                        ? 'border-red-300 bg-red-100 text-red-800'
                        : 'border-gray-300 bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                    placeholder="?"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveExercise;
