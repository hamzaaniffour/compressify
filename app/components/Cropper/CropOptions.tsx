// src/components/CropOptions.tsx
import React from 'react';

interface CropOptionsProps {
    crop: { x: number; y: number; width: number; height: number };
    setCrop: (crop: { x: number; y: number; width: number; height: number }) => void;
  }

  const CropOptions: React.FC<CropOptionsProps> = ({ crop, setCrop }) => {
    const handleCropChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target as HTMLInputElement;
      setCrop((prevCrop: any) => ({
        ...prevCrop,
        [name]: Number(value),
      }));
    };

  return (
    <div className="mt-4">
      <label htmlFor="x" className="block text-sm font-medium text-gray-700">
        X
      </label>
      <input
        id="x"
        name="x"
        type="number"
        value={crop.x}
        onChange={handleCropChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
      <label htmlFor="y" className="block text-sm font-medium text-gray-700 mt-4">
        Y
      </label>
      <input
        id="y"
        name="y"
        type="number"
        value={crop.y}
        onChange={handleCropChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
      <label htmlFor="width" className="block text-sm font-medium text-gray-700 mt-4">
        Width
      </label>
      <input
        id="width"
        name="width"
        type="number"
        value={crop.width}
        onChange={handleCropChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
      <label htmlFor="height" className="block text-sm font-medium text-gray-700 mt-4">
        Height
      </label>
      <input
        id="height"
        name="height"
        type="number"
        value={crop.height}
        onChange={handleCropChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
  );
};

export default CropOptions;