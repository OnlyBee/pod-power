import React from 'react';

interface SelectKeyScreenProps {
    onSelectKey: () => void;
}

export const SelectKeyScreen: React.FC<SelectKeyScreenProps> = ({ onSelectKey }) => {
    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
            <div className="bg-base-200 rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center transform transition-all">
                <h1 className="text-3xl font-bold text-white mb-4">
                    Welcome to POD <span className="text-brand-primary">Power</span>
                </h1>
                <p className="text-base-content mb-6 text-lg">
                    To start creating, please select your Google Gemini API key.
                </p>
                <p className="text-sm text-gray-400 mb-6">
                    This will open a secure dialog from Google to let you choose your project.
                    This app will then use your own API key and quota for generating images.
                </p>
                <button
                    onClick={onSelectKey}
                    className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg"
                >
                    Select API Key
                </button>
                <p className="text-xs text-gray-500 mt-6">
                    For information on pricing and quotas after the free tier, please refer to the{' '}
                    <a
                        href="https://ai.google.dev/gemini-api/docs/billing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-secondary hover:underline"
                    >
                        official Gemini API billing documentation
                    </a>.
                </p>
            </div>
        </div>
    );
};