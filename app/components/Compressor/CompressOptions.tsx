// src/components/CompressOptions.tsx
import React from 'react';

interface CompressOptionsProps {
  quality: number;
  setQuality: (quality: number) => void;
}

const CompressOptions: React.FC<CompressOptionsProps> = ({ quality, setQuality }) => {
  return (
    <div className="mt-4">
      <label htmlFor="quality" className="block text-sm font-medium text-gray-700">
        Compression Quality
      </label>
      <input
        id="quality"
        type="range"
        min="0"
        max="100"
        value={quality}
        onChange={(e) => setQuality(Number(e.target.value))}
        className="mt-1 block w-full"
      />
      <p className="mt-2 text-sm text-gray-500">Current quality: {quality}%</p>
    </div>
  );
};

export default CompressOptions;