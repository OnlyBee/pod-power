import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FeatureSelector } from './components/FeatureSelector';
import { VariationGenerator } from './components/VariationGenerator';
import { MockupRemaker } from './components/MockupRemaker';
import { ApiKeyModal } from './components/ApiKeyModal';
import { getApiKey, setApiKey, clearApiKey } from './utils/apiKey';
import type { Feature } from './types';

const App: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature>('variation');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  useEffect(() => {
    if (!getApiKey()) {
      setIsApiKeyModalOpen(true);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    setIsApiKeyModalOpen(false);
  };

  const handleApiError = () => {
    clearApiKey();
    setIsApiKeyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-base-100 font-sans">
      <ApiKeyModal isOpen={isApiKeyModalOpen} onSave={handleSaveApiKey} />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <FeatureSelector
          selectedFeature={selectedFeature}
          onSelectFeature={setSelectedFeature}
        />
        <div className="mt-8">
          {selectedFeature === 'variation' && <VariationGenerator onApiError={handleApiError} />}
          {selectedFeature === 'mockup' && <MockupRemaker onApiError={handleApiError} />}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-400 text-sm">
        <p className="font-semibold text-lg mb-2 text-gray-300">
          "Hãy để Duy Bảo Nguyễn đưa mọi người đến với thành công với Print On Demand."
        </p>
        <p className="mb-1">Created with ❤️ by <span className="font-bold text-white">Duy Bảo Nguyễn</span></p>
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
