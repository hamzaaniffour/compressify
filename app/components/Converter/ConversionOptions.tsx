// components/ConversionOptions.tsx
import React from 'react';

interface ConversionOptionsProps {
  format: string;
  setFormat: (format: string) => void;
}

export default function ConversionOptions({ format, setFormat }: ConversionOptionsProps) {
  return (
    <div>
      <label htmlFor="format" className="block text-sm font-medium text-gray-700">
        Convert to:
      </label>
      <select
        id="format"
        name="format"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={format}
        onChange={(e) => setFormat(e.target.value)}
      >
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="webp">WebP</option>
        <option value="avif">AVIF</option>
      </select>
    </div>
  );
}