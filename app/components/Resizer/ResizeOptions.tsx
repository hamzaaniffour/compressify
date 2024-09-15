// src/components/ResizeOptions.tsx
import React from "react";

interface ResizeOptionsProps {
  width: number | string;
  setWidth: (width: number | string) => void;
  height: number | string;
  setHeight: (height: number | string) => void;
}

const ResizeOptions: React.FC<ResizeOptionsProps> = ({
  width,
  setWidth,
  height,
  setHeight,
}) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">Width</label>
      <input
        type="number"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        placeholder="Enter width in pixels"
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">
        Height
      </label>
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        placeholder="Enter height in pixels"
      />
    </div>
  );
};

export default ResizeOptions;
