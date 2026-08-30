"use client";

import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Check, X, ZoomIn, ZoomOut } from "lucide-react";

interface ImageCropperProps {
  image: string;
  onCancel: () => void;
  onCropComplete: (file: File, preview: string) => void;
}

export default function ImageCropper({
  image,
  onCancel,
  onCropComplete,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleCropComplete = useCallback(
    (_: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    [],
  );

  const createCroppedImage = async () => {
    if (!croppedAreaPixels) return;

    try {
      setProcessing(true);

      const croppedFile = await getCroppedImg(
        image,
        croppedAreaPixels,
      );

      const preview = URL.createObjectURL(croppedFile);

      onCropComplete(croppedFile, preview);
    } catch (error) {
      console.error("Crop failed:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-black">
              Adjust Profile Photo
            </h2>

            <p className="mt-1 text-xs text-neutral-500">
              Move and zoom your photo to get the perfect crop.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-neutral-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* CROP AREA */}
        <div className="relative h-[380px] w-full bg-black sm:h-[450px]">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        {/* CONTROLS */}
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center gap-4">
            <ZoomOut className="h-4 w-4 text-neutral-500" />

            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-black"
            />

            <ZoomIn className="h-4 w-4 text-neutral-500" />
          </div>

          <p className="mt-2 text-center text-[11px] text-neutral-400">
            Drag the image to reposition it
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex gap-3 border-t border-black/10 bg-neutral-50 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-black/10 bg-white py-3 text-sm font-bold text-black transition hover:bg-neutral-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={createCroppedImage}
            disabled={processing}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {processing ? (
              "Processing..."
            ) : (
              <>
                <Check className="h-4 w-4" />
                Use Photo
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- */
/* CREATE CROPPED FILE                                       */
/* --------------------------------------------------------- */

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
): Promise<File> {
  const image = await loadImage(imageSrc);

  const canvas = document.createElement("canvas");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context not available");
  }

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(
      (result) => resolve(result),
      "image/jpeg",
      0.9,
    );
  });

  if (!blob) {
    throw new Error("Failed to create image");
  }

  return new File(
    [blob],
    "profile-image.jpg",
    {
      type: "image/jpeg",
    },
  );
}

/* --------------------------------------------------------- */
/* LOAD IMAGE                                                 */
/* --------------------------------------------------------- */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);

    image.onerror = reject;

    image.src = src;
  });
}

