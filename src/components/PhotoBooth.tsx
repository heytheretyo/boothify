import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw, Sparkles } from "lucide-react";
import { Filter } from "@/types";

interface PhotoBoothProps {
  onCapture: (photoData: string) => void;
  isCapturing: boolean;
  setIsCapturing: (isCapturing: boolean) => void;
  selectedFilter: Filter;
  brightness: number;
  contrast: number;
  saturation: number;
}

const PhotoBooth = ({
  onCapture,
  isCapturing,
  setIsCapturing,
  selectedFilter,
  brightness,
  contrast,
  saturation,
}: PhotoBoothProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">(
    "user"
  );

  useEffect(() => {
    startCamera(cameraFacing);

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraFacing]);

  const startCamera = async (facingMode: "user" | "environment") => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "user" }, // Ensures front camera selection
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setHasPermission(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasPermission(false);
    }
  };
  const toggleCamera = () => {
    setCameraFacing((prev) => (prev === "user" ? "environment" : "user"));
  };

  useEffect(() => {
    if (!isCapturing) return;

    let timer: number | undefined;
    setCountdown(3);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval);

          // Take photo after countdown
          timer = window.setTimeout(() => {
            takePhoto();
            setIsCapturing(false);
          }, 300);

          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
      if (timer) clearTimeout(timer);
    };
  }, [isCapturing, onCapture, setIsCapturing]);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Trigger flash effect
    setFlash(true);
    setTimeout(() => setFlash(false), 500);

    // Get photo data URL
    const photoData = canvas.toDataURL("image/png");
    onCapture(photoData);
  };

  const handleAutocapture = () => {
    let captureCount = 0;

    const captureInterval = setInterval(() => {
      setIsCapturing(true); // Trigger countdown and photo capture

      captureCount += 1;

      if (captureCount > 4) {
        clearInterval(captureInterval); // Stop after 4 captures
      }
    }, 3000); // Adjust interval timing if needed
  };

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-[500px]">
        <h3 className="text-xl font-bold mb-4">Camera Access Denied</h3>
        <p className="text-muted-foreground mb-4">
          Please allow camera access to use the photo booth.
        </p>
        <Button onClick={() => setHasPermission(null)}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="photo-booth-frame mx-auto max-w-[800px] w-full aspect-[4/3] relative overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{
            filter: `
              brightness(${brightness}%)
              saturate(${saturation / 100})
              contrast(${contrast}%)
              ${selectedFilter.css}
            `,
          }}
        />

        {countdown !== null && <div className="countdown">{countdown}</div>}

        <div className={`flash ${flash ? "active" : ""}`} />
      </div>

      <div className="p-4 flex justify-center gap-2">
        <Button
          size="sm"
          onClick={() => setIsCapturing(true)}
          disabled={isCapturing || hasPermission === null}
        >
          <Camera className="h-4 w-4 mr-2" />
          Take Photo
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleAutocapture} // Use the handleAutocapture function
          disabled={isCapturing || hasPermission === null}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Autocapture
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={toggleCamera} // Toggle camera button
          disabled={hasPermission === null}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Flip Camera
        </Button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PhotoBooth;
