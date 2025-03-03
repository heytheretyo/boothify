"use client";
import { SetStateAction, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import html2canvas from "html2canvas";
import {
  Camera,
  Download,
  Share2,
  Sparkles,
  Image as ImageIcon,
  RefreshCw,
} from "lucide-react";
import PhotoBooth from "@/components/PhotoBooth";
import PhotoStrip from "@/components/PhotoStrip";
import StripPreview from "@/components/StripPreview";
import { type Photo, type Filter, type StripStyle } from "@/types";
import { filters } from "@/lib/filters";
import { defaultStripStyle } from "@/lib/stripStyles";
import "./App.css";
import * as htmlToImage from "html-to-image";
import { toast } from "sonner";
import { BrightnessAdjustment } from "@/components/CameraSettingsPopover/BrightnessAdjustment";
import { ContrastAdjustment } from "@/components/CameraSettingsPopover/ContrastAdjustment";
import { SaturationAdjustment } from "@/components/CameraSettingsPopover/SaturationAdjustment";
import Image from "next/image";
import Logo from "@/components/Logo";
import { Footer } from "@/components/Footer";
import {
  isSafariOrIos,
  convertHtmlToPng,
  convertHtmlToBlob,
} from "@/lib/utils";

function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(filters[0]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [isCapturing, setIsCapturing] = useState(false);
  const [activeTab, setActiveTab] = useState("capture");
  const [stripStyle, setStripStyle] = useState<StripStyle>(defaultStripStyle);

  const [isMobile, setIsMobile] = useState(false);

  const exportSettings = {
    cacheBust: true,
    skipFonts: true, // Skip fonts if not needed
    backgroundColor: "#fff", // Optional: Set a background color if needed
  };

  // Detect mobile device on component mount
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileDevices =
      /iphone|ipod|android|blackberry|windows phone|mobile/i;
    setIsMobile(mobileDevices.test(userAgent));
  }, []);

  const applyStripStyleToClonedElement = (clonedStrip: HTMLElement) => {
    // Apply styles from stripStyle to the cloned element
    clonedStrip.style.backgroundColor =
      stripStyle.backgroundType === "color" ? stripStyle.color : "#fff"; // Default background color
    clonedStrip.style.backgroundImage =
      stripStyle.backgroundType === "gradient" ||
      stripStyle.backgroundType === "pattern"
        ? stripStyle.color // Apply gradient or pattern color
        : "";
    clonedStrip.style.backgroundSize =
      stripStyle.backgroundType === "pattern"
        ? stripStyle.backgroundSize
        : "auto";
    clonedStrip.style.backgroundPosition =
      stripStyle.backgroundType === "pattern" ? "0 0, 5px 5px" : "";
    clonedStrip.style.borderColor = stripStyle.borderColor;
    clonedStrip.style.padding = "20px"; // Add padding if necessary

    // Optionally, add layout classes for stripStyle
    clonedStrip.classList.add(`strip-layout-${stripStyle.layout}`);
  };

  const handleCapture = (photoData: string) => {
    const newPhoto: Photo = {
      id: Date.now().toString(),
      src: photoData,
      filter: selectedFilter.name,
      brightness,
      contrast,
      saturation,
    };

    setPhotos((prev) => [...prev, newPhoto]);
    toast.success("Photo captured!", {
      description: `Photo ${photos.length + 1} added to your strip.`,
    });

    if (photos.length + 1 >= 4) {
      setActiveTab("edit");
    }
  };

  const handleReset = () => {
    setPhotos([]);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setSelectedFilter(filters[0]);
    setStripStyle(defaultStripStyle);
    setActiveTab("capture");
    toast.success("Reset complete", {
      description: "All photos have been cleared.",
    });
  };

  const handleDownload = async () => {
    const stripElement = document.getElementById("photo-strip"); // Get the visible strip
    if (!stripElement) return;

    // Show a loading toast
    toast.info("Generating image, please wait...");

    // Clone the original strip
    const clonedStrip = stripElement.cloneNode(true) as HTMLElement;
    clonedStrip.style.opacity = "1";
    clonedStrip.style.pointerEvents = "none"; // Ensure it doesn't interfere with UI

    // Apply stripStyle to the cloned strip
    applyStripStyleToClonedElement(clonedStrip);

    // Temporary container for rendering
    const tempContainer = document.createElement("div");

    tempContainer.appendChild(clonedStrip);
    document.body.appendChild(tempContainer);

    try {
      let dataUrl = "";

      dataUrl = isSafariOrIos()
        ? await convertHtmlToPng(clonedStrip, 10, 150, exportSettings) // safari loves pain
        : await convertHtmlToPng(clonedStrip, 1, 0, exportSettings);

      // dataUrl = await htmlToImage.toPng(clonedStrip);

      // Create a download link
      const link = document.createElement("a");
      link.download = "photo-strip.png";
      link.href = dataUrl;
      link.click();

      // Show success toast
      toast.success("Image generated and downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      // Cleanup and reset visibility
      document.body.removeChild(tempContainer);
      clonedStrip.style.visibility = "visible"; // Make the cloned element visible again
    }
  };
  const handleShare = async () => {
    const stripElement = document.getElementById("photo-strip");
    if (!stripElement) return;

    const clonedStrip = stripElement.cloneNode(true) as HTMLElement;
    clonedStrip.style.opacity = "1";
    clonedStrip.style.pointerEvents = "none"; // Ensure it doesn't interfere with UI
    clonedStrip.className = `strip-layout-${stripStyle.layout}`;
    clonedStrip.style.padding = "50px"; // Adds padding only on the x-axis

    clonedStrip.style.backgroundColor =
      stripElement.style.backgroundColor || "#fff"; // Default to white if not set
    clonedStrip.style.color = stripElement.style.color || "#000";

    // Temporary container for rendering
    const tempContainer = document.createElement("div");
    tempContainer.appendChild(clonedStrip);
    document.body.appendChild(tempContainer);

    try {
      let blob;

      blob = isSafariOrIos()
        ? await convertHtmlToBlob(clonedStrip, 10, 150, exportSettings) // safari loves pain
        : await convertHtmlToBlob(clonedStrip, 1, 0, exportSettings);

      if (!blob) {
        throw new Error("Failed to generate image.");
      }

      // Check if the Web Share API is available and share
      if (
        navigator.share &&
        navigator.canShare({
          files: [
            new File([blob], "photo-booth-strip.png", { type: "image/png" }),
          ],
        })
      ) {
        // Share using Web Share API
        await navigator.share({
          title: "My Photo Booth Strip",
          files: [
            new File([blob], "photo-booth-strip.png", { type: "image/png" }),
          ],
        });

        toast.success("Shared successfully!", {
          description: "Your photo strip has been shared.",
        });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "photo-booth-strip.png";
        link.click();
        URL.revokeObjectURL(url);

        toast.success("Download complete!", {
          description:
            "Your photo strip has been saved (sharing not supported in this browser).",
        });
      }
    } catch (error) {
      console.error("Error sharing image:", error);

      // Show error toast
      toast.error("Error", {
        description: "Failed to share. Please try again.",
      });
    } finally {
      document.body.removeChild(tempContainer);
      clonedStrip.style.visibility = "visible"; // Make the cloned element visible again
    }
  };

  const updatePhoto = (id: string, updates: Partial<Photo>) => {
    setPhotos((prev) =>
      prev.map((photo) => (photo.id === id ? { ...photo, ...updates } : photo))
    );
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    toast.success("Photo removed", {
      description: "The photo has been removed from your strip.",
    });
  };

  const updateStripStyle = (style: Partial<StripStyle>) => {
    setStripStyle((prev) => ({ ...prev, ...style }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b py-4 px-6 bg-card">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo className="w-5 mt-1" />
            <h1 className="text-2xl font-bold">boothify</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={photos.length === 0}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6 px-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="capture">Capture</TabsTrigger>
            <TabsTrigger value="edit" disabled={photos.length === 0}>
              Edit & Share
            </TabsTrigger>
          </TabsList>

          <TabsContent value="capture" className="space-y-4">
            {/* <div className="grid md:grid-cols-[1fr_300px] gap-6"> */}
            <div className="grid md:grid-cols-[1fr_300px] gap-6">
              <PhotoBooth
                onCapture={handleCapture}
                isCapturing={isCapturing}
                setIsCapturing={setIsCapturing}
                selectedFilter={selectedFilter}
                brightness={brightness}
                contrast={contrast}
                saturation={saturation}
              />

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg shadow border space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Effects
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Filter</label>
                      <Select
                        value={selectedFilter.name}
                        onValueChange={(value: string) => {
                          const filter = filters.find((f) => f.name === value);
                          if (filter) setSelectedFilter(filter);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a filter" />
                        </SelectTrigger>
                        <SelectContent>
                          {filters.map((filter) => (
                            <SelectItem key={filter.name} value={filter.name}>
                              {filter.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-x-1">
                      <BrightnessAdjustment
                        brightness={brightness}
                        setBrightness={setBrightness}
                      />
                      <ContrastAdjustment
                        contrast={contrast}
                        setContrast={setContrast}
                      />
                      <SaturationAdjustment
                        saturation={saturation}
                        setSaturation={setSaturation}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg shadow border">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Photo Strip ({photos.length}/4)
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className={`aspect-[3/4] rounded border ${
                          photos[index]
                            ? "bg-muted"
                            : "bg-muted/50 flex items-center justify-center"
                        }`}
                      >
                        {photos[index] ? (
                          <img
                            src={photos[index].src}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover rounded"
                            style={{
                              filter: `
                                brightness(${photos[index].brightness}%)
                                contrast(${photos[index].contrast}%)
                                saturate(${photos[index].saturation}%)
                                ${
                                  filters.find(
                                    (f) => f.name === photos[index].filter
                                  )?.css || ""
                                }
                              `,
                            }}
                          />
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            {index + 1}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Button
                      className="w-full"
                      onClick={() => setIsCapturing(true)}
                      disabled={isCapturing || photos.length >= 4}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {photos.length === 0
                        ? "Take First Photo"
                        : "Take Next Photo"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="edit">
            <div className="grid md:grid-cols-[1fr_300px] gap-6">
              <div className="bg-card rounded-lg overflow-hidden shadow-lg border p-6">
                <PhotoStrip
                  photos={photos}
                  updatePhoto={updatePhoto}
                  removePhoto={removePhoto}
                  filters={filters}
                  stripStyle={stripStyle}
                  updateStripStyle={updateStripStyle}
                />
              </div>

              <div
                id="photo-strip-download"
                className="absolute w-[800px] h-[600px] overflow-hidden opacity-0 pointer-events-none"
              >
                <PhotoStrip
                  photos={photos}
                  updatePhoto={updatePhoto}
                  removePhoto={removePhoto}
                  filters={filters}
                  stripStyle={stripStyle}
                  updateStripStyle={updateStripStyle}
                />
              </div>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg shadow border space-y-4">
                  <h3 className="font-medium">Share Your Creation</h3>

                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={handleDownload} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    {isMobile && (
                      <Button onClick={handleShare} className="w-full">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    )}
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg shadow border">
                  <h3 className="font-medium mb-3">Start Over</h3>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    New Photo Strip
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
