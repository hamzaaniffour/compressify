// components/ImagePreview.tsx
import React from "react";

interface ImagePreviewProps {
  preview: string | null;
  resizedPreview: string | null;
}

export default function ImagePreview({
  preview,
  resizedPreview,
}: ImagePreviewProps) {
  return (
    <div className="mt-4">
      {preview && (
        <div>
          <h3 className="text-lg font-medium text-gray-900">Original:</h3>
          <img
            src={preview}
            alt="Original"
            className="max-w-full h-auto rounded-lg shadow-md mt-2"
          />
        </div>
      )}
      {resizedPreview && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">Resized:</h3>
          <img
            src={resizedPreview}
            alt="Resized"
            className="max-w-full h-auto rounded-lg shadow-md mt-2"
          />
        </div>
      )}
    </div>
  );
}
