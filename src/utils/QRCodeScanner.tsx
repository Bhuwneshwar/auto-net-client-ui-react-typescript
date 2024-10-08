import React, { useRef, useEffect, useState } from "react";
import QrScanner from "qr-scanner";

interface IQRCodeScanner {
  scannedDataUpdater: (data: string) => void;
  title?: string;
  style?: React.CSSProperties;
  invalidId: boolean;
}

const QRCodeScanner: React.FC<IQRCodeScanner> = ({
  scannedDataUpdater,
  style,
  title,
  invalidId,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);

  useEffect(() => {
    let qrScanner: QrScanner | null = null;
    let timer: NodeJS.Timeout | null = null;

    if (isScanning && videoRef.current) {
      qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          setScannedData(result.data);
          setIsScanning(false);
        },
        {
          onDecodeError: (error) => {
            console.error(error);
          },
        }
      );

      qrScanner.start();

      timer = setTimeout(() => {
        qrScanner?.stop();
        setIsScanning(false);
      }, 120000); // 2 minutes
    }

    return () => {
      qrScanner?.stop();
      if (timer) clearTimeout(timer);
    };
  }, [isScanning]);

  useEffect(() => {
    if (scannedData) {
      scannedDataUpdater(scannedData);
    }
  }, [scannedData, scannedDataUpdater]);

  const handleRetry = () => {
    setScannedData(null);
    setIsScanning(true);
  };

  return (
    <div
      style={{ maxWidth: style?.maxWidth, textAlign: "center" }}
      className="qr-code-scanner"
    >
      <h3 style={{ textAlign: "center" }}>
        {title ? title : "QR Code Scanner"}
      </h3>
      <video
        autoPlay
        ref={videoRef}
        style={style ? style : { width: "100%" }}
      />
      <p>{scannedData}</p>
      {!isScanning || invalidId ? (
        <button onClick={handleRetry}>Retry</button>
      ) : null}
    </div>
  );
};

export default QRCodeScanner;
