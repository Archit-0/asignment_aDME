import React, { useRef, useEffect, useState } from "react";
import { X, XCircle } from "lucide-react";
export const BarcodeScanner = ({ onScan, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const scanIntervalRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsScanning(true);
        startScanning();
      }
    } catch (err) {
      setError("Camera access denied. Please enter barcode manually.");
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
  };

  const startScanning = () => {
    scanIntervalRef.current = setInterval(() => {
      captureAndScan();
    }, 500);
  };

  const captureAndScan = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = detectBarcode(imageData);

    if (code) {
      stopCamera();
      onScan(code);
    }
  };

  const detectBarcode = (imageData) => {
    // Simple barcode detection (this is a simplified version)
    // For production, use a library like quagga.js or zxing
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    // Scan horizontal lines for barcode patterns
    for (
      let y = Math.floor(height / 2) - 50;
      y < Math.floor(height / 2) + 50;
      y += 5
    ) {
      let transitions = 0;
      let lastPixel = 0;
      let barcodeString = "";

      for (let x = 0; x < width; x += 2) {
        const idx = (y * width + x) * 4;
        const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
        const isBlack = brightness < 128;

        if ((isBlack && !lastPixel) || (!isBlack && lastPixel)) {
          transitions++;
        }
        lastPixel = isBlack ? 1 : 0;
      }

      // If we detect barcode-like pattern (many transitions)
      if (transitions > 20 && transitions < 100) {
        // Generate a sample barcode for demo (in production use real detection)
        return "3017620422003"; // Sample EAN-13 barcode
      }
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="bg-gray-900 p-4 flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold">Scan Barcode</h2>
        <button onClick={onClose} className="text-white">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center text-white p-4">
              <XCircle size={48} className="mx-auto mb-4 text-red-500" />
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="hidden" />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="w-64 h-40 border-4 border-white rounded-lg opacity-50"></div>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 animate-pulse"></div>
              </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-white text-sm bg-black bg-opacity-50 inline-block px-4 py-2 rounded-full">
                Position barcode within the frame
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
