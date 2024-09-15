// src/components/Main.tsx
"use client";
import React, { useState, useCallback } from 'react';
import ImageUploader from './ImageUploader';
import CompressOptions from './CompressOptions';

export default function Main() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedImageUrl, setCompressedImageUrl] = useState<string | null>(null);

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

  const handleCompress = async () => {
    if (!file) return;

    setIsCompressing(true);
    setCompressedImageUrl(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const img = new Image();
      const blob = new Blob([arrayBuffer]);
      img.src = URL.createObjectURL(blob);

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL('image/jpeg', quality / 100);
      setCompressedImageUrl(dataURL);
    } catch (error) {
      console.error('Error during compression:', error);
      alert('An error occurred during compression. Please try again.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (compressedImageUrl) {
      const a = document.createElement('a');
      a.href = compressedImageUrl;
      a.download = 'compressed-image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-gray-900">Image Compressor</h2>
                <ImageUploader setFile={handleFileChange} />
                {preview && (
                  <div className="mt-4">
                    <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg shadow-md" />
                  </div>
                )}
                <CompressOptions quality={quality} setQuality={setQuality} />
                <button
                  onClick={handleCompress}
                  disabled={!file || isCompressing}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    !file || isCompressing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  {isCompressing ? 'Compressing...' : 'Compress'}
                </button>
                {compressedImageUrl && (
                  <button
                    onClick={handleDownload}
                    className="w-full mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Download Compressed Image
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