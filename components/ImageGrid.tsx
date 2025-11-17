import React from 'react';
import type { GeneratedImage } from '../types';

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

interface ImageGridProps {
  images: GeneratedImage[];
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  if (!images.length) {
    return null;
  }

  const handleDownloadAll = () => {
    images.forEach((image, index) => {
      // Add a small delay to prevent the browser from blocking multiple downloads
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = image.src;
        link.download = image.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 250); // 250ms delay between each download trigger
    });
  };

  return (
    <div className="mt-12">
      <div className="flex flex-col sm:flex-row justify-center items-center text-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Generated Images</h2>
        <button
          onClick={handleDownloadAll}
          className="bg-brand-secondary hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-brand-secondary"
          aria-label={`Download all ${images.length} generated images`}
        >
          <DownloadIcon />
          <span>Download All ({images.length})</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div key={index} className="group relative rounded-lg overflow-hidden shadow-lg bg-base-200 aspect-square">
            <img src={image.src} alt={`Generated mockup: ${image.name}`} className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
              <a
                href={image.src}
                download={image.name}
                aria-label={`Download image ${image.name}`}
                className="opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-90 transition-all duration-300 bg-brand-primary text-white p-3 rounded-full shadow-lg hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-brand-primary"
              >
                <DownloadIcon />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};