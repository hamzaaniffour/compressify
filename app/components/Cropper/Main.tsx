// src/components/Main.tsx
"use client";
import React, { useState, useCallback, useRef } from 'react';
import ImageUploader from './ImageUploader';
import CropOptions from './CropOptions';

export default function Main() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [isCropping, setIsCropping] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = useCallback((selectedFile: File | null) => {
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }, []);

  const handleCrop = async () => {
    if (!file || !imageRef.current) return;

    setIsCropping(true);
    setCroppedImageUrl(null);

    try {
      const image = imageRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      const dataURL = canvas.toDataURL('image/jpeg');
      setCroppedImageUrl(dataURL);
    } catch (error) {
      console.error('Error during cropping:', error);
      alert('An error occurred during cropping. Please try again.');
    } finally {
      setIsCropping(false);
    }
  };

  const handleDownload = () => {
    if (croppedImageUrl) {
      const a = document.createElement('a');
      a.href = croppedImageUrl;
      a.download = 'cropped-image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-gray-900">Image Cropper</h2>
                <ImageUploader setFile={handleFileChange} />
                {preview && (
                  <div className="mt-4">
                    <img
                      ref={imageRef}
                      src={preview}
                      alt="Preview"
                      className="max-w-full h-auto rounded-lg shadow-md"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                )}
                <CropOptions crop={crop} setCrop={setCrop} />
                <button
                  onClick={handleCrop}
                  disabled={!file || isCropping}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    !file || isCropping
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  {isCropping ? 'Cropping...' : 'Crop'}
                </button>
                {croppedImageUrl && (
                  <button
                    onClick={handleDownload}
                    className="w-full mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Download Cropped Image
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}