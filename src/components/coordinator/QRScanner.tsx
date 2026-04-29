import { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { Camera, X } from 'lucide-react';

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const readerRef = useRef<BrowserQRCodeReader | null>(null);

  useEffect(() => {
    const startScanning = async () => {
      try {
        const codeReader = new BrowserQRCodeReader();
        readerRef.current = codeReader;
        
        const videoInputDevices = await codeReader.listVideoInputDevices();
        
        if (videoInputDevices.length === 0) {
          setError('No camera found on this device');
          return;
        }

        setIsScanning(true);

        // Use the first available camera (usually back camera on mobile)
        const selectedDeviceId = videoInputDevices[0].deviceId;

        codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current!,
          (result, err) => {
            if (result) {
              onScan(result.getText());
              codeReader.reset();
            }
            if (err && err.name !== 'NotFoundException') {
              console.error(err);
            }
          }
        );
      } catch (err) {
        console.error('Error starting QR scanner:', err);
        setError('Failed to access camera. Please ensure camera permissions are granted.');
        setIsScanning(false);
      }
    };

    startScanning();

    return () => {
      if (readerRef.current) {
        readerRef.current.reset();
      }
    };
  }, [onScan]);

  return (
    <div className="relative">
      <div className="relative bg-black rounded-lg overflow-hidden">
        {error ? (
          <div className="p-8 text-center">
            <Camera className="w-16 h-16 mx-auto mb-4 text-[#C5C6C7] opacity-30" />
            <p className="text-[#C5C6C7]">{error}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full max-h-[400px] object-cover"
              autoPlay
              playsInline
            />
            <div className="absolute inset-0 border-2 border-[#00FFFF]/30 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-[#00FFFF] rounded-lg" />
            </div>
            {isScanning && (
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="inline-block px-4 py-2 bg-[#0B0C10]/80 rounded-full border border-[#00FFFF]/30">
                  <p className="text-sm text-[#00FFFF]">
                    <span className="inline-block w-2 h-2 bg-[#00FFFF] rounded-full mr-2 animate-pulse" />
                    Scanning for QR code...
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <p className="text-xs text-[#C5C6C7] mt-2 text-center">
        Position the QR code within the frame to scan
      </p>
    </div>
  );
}
