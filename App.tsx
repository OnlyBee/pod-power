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
    </div>
  );
};

export default App;
