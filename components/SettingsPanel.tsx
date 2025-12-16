import React from 'react';
import { GeneratorSettings } from '../types';
import { Settings, Printer, RefreshCw, Divide, Copy, Hash, X, RectangleVertical, RectangleHorizontal } from 'lucide-react';

interface SettingsPanelProps {
  settings: GeneratorSettings;
  onSettingsChange: (newSettings: GeneratorSettings) => void;
  onGenerate: () => void;
  onPrint: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  onGenerate,
  onPrint,
}) => {
  const handleChange = <K extends keyof GeneratorSettings>(
    key: K,
    value: GeneratorSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleLayoutChange = (layout: 'portrait' | 'landscape') => {
    // When switching layouts, ensure copies doesn't exceed new max
    const maxCopies = layout === 'landscape' ? 4 : 3;
    const newCopies = Math.min(settings.copies, maxCopies);
    
    onSettingsChange({ 
        ...settings, 
        layout, 
        copies: newCopies 
    });
  };

  const maxCopiesAvailable = settings.layout === 'landscape' ? 4 : 3;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6 h-fit sticky top-6">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
        <Settings className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">Ustawienia</h2>
      </div>

      {/* Layout Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            Orientacja wydruku
        </label>
        <div className="flex gap-2">
            <button
                onClick={() => handleLayoutChange('portrait')}
                className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    settings.layout === 'portrait' 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-500'
                }`}
            >
                <RectangleVertical className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Pionowo</span>
                <span className="text-[10px] opacity-75">(3 kolumny)</span>
            </button>
            <button
                onClick={() => handleLayoutChange('landscape')}
                className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    settings.layout === 'landscape' 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-500'
                }`}
            >
                <RectangleHorizontal className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Poziomo</span>
                <span className="text-[10px] opacity-75">(4 kolumny)</span>
            </button>
        </div>
      </div>

      {/* Problem Count */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex justify-between">
          Liczba działań na kolumnę
          <span className="text-indigo-600 font-bold">{settings.problemCount}</span>
        </label>
        <div className="flex flex-col gap-1">
            <input
            type="range"
            min="10"
            max="50"
            step="1"
            value={settings.problemCount}
            onChange={(e) => handleChange('problemCount', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-xs text-gray-400">Rozmiar czcionki dopasuje się automatycznie.</span>
        </div>
      </div>

      {/* Range Settings */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Zakres wyników (np. 1-100)
        </label>
        <div className="flex items-center gap-2">
            <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Od</label>
                <input 
                    type="number" 
                    value={settings.minResult}
                    onChange={(e) => handleChange('minResult', Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                />
            </div>
            <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Do</label>
                <input 
                    type="number" 
                    value={settings.maxResult}
                    onChange={(e) => handleChange('maxResult', Math.max(settings.minResult, parseInt(e.target.value) || 0))}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                />
            </div>
        </div>
      </div>

      {/* Max Factor */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <X className="w-4 h-4" />
            Maksymalny czynnik/dzielnik
        </label>
        <input 
            type="number" 
            value={settings.maxFactor}
            onChange={(e) => handleChange('maxFactor', Math.max(2, parseInt(e.target.value) || 0))}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            placeholder="np. 10"
        />
        <p className="text-xs text-gray-500">
           Określa jak duże mogą być liczby użyte w działaniu (np. dla 10: 9•9, dla 20: 15•3).
        </p>
      </div>

      {/* Copies */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Copy className="w-4 h-4" />
          Liczba identycznych kopii
        </label>
        <div className="flex gap-2">
          {Array.from({length: maxCopiesAvailable}, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handleChange('copies', num)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
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

      {/* Toggles */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Divide className="w-4 h-4" />
          Uwzględnij dzielenie
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.allowDivision}
            onChange={(e) => handleChange('allowDivision', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>

      <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
        <button
          onClick={onGenerate}
          className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-3 rounded-lg font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Generuj nowy zestaw
        </button>
        <button
          onClick={onPrint}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 py-3 rounded-lg font-medium shadow-md transition-all hover:shadow-lg"
        >
          <Printer className="w-4 h-4" />
          Drukuj arkusz
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;