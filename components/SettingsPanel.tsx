import React from 'react';
import { GeneratorSettings } from '../types';
import { Settings, Printer, RefreshCw, Divide, Copy, Hash, X, Columns, Plus, Minus, Play } from 'lucide-react';
import { Language, translations } from '../locales';

interface SettingsPanelProps {
  settings: GeneratorSettings;
  onSettingsChange: (newSettings: GeneratorSettings) => void;
  onGenerate: () => void;
  onPrint: () => void;
  onStartExercise: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  onGenerate,
  onPrint,
  onStartExercise,
  language,
  onLanguageChange,
}) => {
  const t = translations[language];
  const handleChange = <K extends keyof GeneratorSettings>(
    key: K,
    value: GeneratorSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleColumnsChange = (columns: number) => {
    // When changing columns, ensure copies doesn't exceed columns count
    const newCopies = Math.min(settings.copies, columns);
    onSettingsChange({ 
        ...settings, 
        columns, 
        copies: newCopies 
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <Settings className="w-4 h-4 text-indigo-600" />
        <h2 className="text-base font-semibold text-gray-800">{t.settings}</h2>
        <div className="ml-auto flex gap-1">
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
      </div>

      {/* Columns Selection */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Columns className="w-4 h-4" />
            {t.columns}
            <span className="ml-auto text-indigo-600 font-bold">{settings.columns}</span>
        </label>
        <input
          type="range"
          min="2"
          max="8"
          step="1"
          value={settings.columns}
          onChange={(e) => handleColumnsChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>
      
      {/* Copies */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Copy className="w-4 h-4" />
          {t.identicalCopies}
        </label>
        <div className="flex gap-1.5 flex-wrap">
          {Array.from({length: settings.columns}, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handleChange('copies', num)}
              className={`flex-1 min-w-[2rem] py-1.5 text-sm font-medium rounded-md transition-colors ${
                settings.copies === num
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Count */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 flex justify-between">
          {t.problemsPerColumn}
          <span className="text-indigo-600 font-bold">{settings.problemCount}</span>
        </label>
        <input
          type="range"
          min="10"
          max="50"
          step="1"
          value={settings.problemCount}
          onChange={(e) => handleChange('problemCount', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      {/* Range Settings */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Hash className="w-4 h-4" />
            {t.resultRange}
        </label>
        <div className="flex items-center gap-2">
            <div className="flex-1">
                <input 
                    type="number" 
                    value={settings.minResult}
                    onChange={(e) => handleChange('minResult', Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full p-1.5 border border-gray-300 rounded-lg text-sm"
                    placeholder="Od"
                />
            </div>
            <span className="text-gray-400">–</span>
            <div className="flex-1">
                <input 
                    type="number" 
                    value={settings.maxResult}
                    onChange={(e) => handleChange('maxResult', Math.max(settings.minResult, parseInt(e.target.value) || 0))}
                    className="w-full p-1.5 border border-gray-300 rounded-lg text-sm"
                    placeholder="Do"
                />
            </div>
        </div>
      </div>

      {/* Factor Range */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <X className="w-4 h-4" />
            {t.factorRange}
        </label>
        <div className="flex items-center gap-2">
            <div className="flex-1">
                <input 
                    type="number" 
                    value={settings.minFactor}
                    onChange={(e) => handleChange('minFactor', Math.max(2, Math.min(settings.maxFactor, parseInt(e.target.value) || 2)))}
                    className="w-full p-1.5 border border-gray-300 rounded-lg text-sm"
                    placeholder="Od"
                />
            </div>
            <span className="text-gray-400">–</span>
            <div className="flex-1">
                <input 
                    type="number" 
                    value={settings.maxFactor}
                    onChange={(e) => handleChange('maxFactor', Math.max(settings.minFactor, parseInt(e.target.value) || 2))}
                    className="w-full p-1.5 border border-gray-300 rounded-lg text-sm"
                    placeholder="Do"
                />
            </div>
        </div>
      </div>

      {/* Operation Toggles */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">{t.operations}</label>
        
        <div className="grid grid-cols-2 gap-1.5">
          {/* Multiplication */}
          <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
              <X className="w-3 h-3" />
              {t.multiplication}
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowMultiplication}
                onChange={(e) => handleChange('allowMultiplication', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Division */}
          <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
              <Divide className="w-3 h-3" />
              {t.division}
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowDivision}
                onChange={(e) => handleChange('allowDivision', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Addition */}
          <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
              <Plus className="w-3 h-3" />
              {t.addition}
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowAddition}
                onChange={(e) => handleChange('allowAddition', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Subtraction */}
          <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
              <Minus className="w-3 h-3" />
              {t.subtraction}
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowSubtraction}
                onChange={(e) => handleChange('allowSubtraction', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
        <button
          onClick={onStartExercise}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 py-2 rounded-lg font-medium shadow-md transition-all hover:shadow-lg text-sm"
        >
          <Play className="w-4 h-4" />
          {t.startExercise}
        </button>
        <button
          onClick={onGenerate}
          className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          {t.generateNew}
        </button>
        <button
          onClick={onPrint}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 py-2 rounded-lg font-medium shadow-md transition-all hover:shadow-lg text-sm"
        >
          <Printer className="w-4 h-4" />
          {t.printWorksheet}
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;