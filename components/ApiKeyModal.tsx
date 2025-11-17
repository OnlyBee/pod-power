import React, { useState } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onSave: (apiKey: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onSave }) => {
  const [apiKey, setApiKey] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
      setApiKey('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-base-200 rounded-2xl shadow-xl p-8 max-w-lg w-full transform transition-all">
        <h2 className="text-2xl font-bold text-white mb-4">Enter Your Gemini API Key</h2>
        <p className="text-base-content mb-6">
          To use this application, you need a Google Gemini API key. Please paste your key below.
        </p>
        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-sm font-medium text-base-content mb-2">API Key</label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key here"
            className="w-full px-4 py-2 rounded-lg bg-base-300 text-white border border-base-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
        <p className="text-sm text-gray-400 mb-6">
          You can get your free API key from{' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-secondary hover:underline"
          >
            Google AI Studio
          </a>.
        </p>
        <button
          onClick={handleSave}
          disabled={!apiKey.trim()}
          className="w-full bg-brand-primary hover:bg-brand-secondary disabled:bg-base-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg"
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};
