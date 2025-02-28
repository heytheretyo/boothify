import { useState } from "react";
import { Photo, Filter, StripStyle } from "@/types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Sparkles, Settings, Palette } from "lucide-react";
import StripStyler from "./StripStyler";

interface PhotoStripProps {
  photos: Photo[];
  updatePhoto: (id: string, updates: Partial<Photo>) => void;
  removePhoto: (id: string) => void;
  filters: Filter[];
  stripStyle: StripStyle;
  updateStripStyle: (style: Partial<StripStyle>) => void;
}

const PhotoStrip = ({
  photos,
  updatePhoto,
  removePhoto,
  filters,
  stripStyle,
  updateStripStyle,
}: PhotoStripProps) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(
    photos.length > 0 ? photos[0].id : null
  );

  const selectedPhoto = photos.find((p) => p.id === selectedPhotoId);

  const handleFilterChange = (value: string) => {
    if (selectedPhotoId) {
      updatePhoto(selectedPhotoId, { filter: value });
    }
  };

  const handleBrightnessChange = (value: number[]) => {
    if (selectedPhotoId) {
      updatePhoto(selectedPhotoId, { brightness: value[0] });
    }
  };

  const handleContrastChange = (value: number[]) => {
    if (selectedPhotoId) {
      updatePhoto(selectedPhotoId, { contrast: value[0] });
    }
  };

  const handleSaturationChange = (value: number[]) => {
    if (selectedPhotoId) {
      updatePhoto(selectedPhotoId, { saturation: value[0] });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Your Photo Strip</h2>

      <div className="grid md:grid-cols-[1fr_300px] gap-6">
        <div
          id="photo-strip"
          className="photo-strip-container"
          style={{
            // If the background type is 'gradient' or 'pattern', use backgroundImage
            backgroundImage:
              stripStyle.backgroundType === "gradient" ||
              stripStyle.backgroundType === "pattern"
                ? stripStyle.color // Should be stripStyle.background, not stripStyle.color
                : undefined,

            // If the background type is 'color', use backgroundColor
            backgroundColor:
              stripStyle.backgroundType === "color"
                ? stripStyle.color // Should be stripStyle.background, not stripStyle.color
                : undefined,

            // If the background is a pattern, we need to set backgroundSize and backgroundPosition
            backgroundSize:
              stripStyle.backgroundType === "pattern"
                ? stripStyle.backgroundSize
                : undefined,

            backgroundPosition:
              stripStyle.backgroundType === "pattern"
                ? "0 0, 5px 5px"
                : undefined,
          }}
        >
          <div className={`strip-layout-${stripStyle.layout}`}>
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="photo-strip-image"
                style={{ borderColor: stripStyle.borderColor }}
              >
                <img
                  src={photo.src}
                  alt="Photo strip"
                  className="w-full aspect-[4/3] object-cover h-full"
                  style={{
                    filter: `
                      brightness(${photo.brightness}%)
                      contrast(${photo.contrast}%)
                      saturate(${photo.saturation}%)
                      ${filters.find((f) => f.name === photo.filter)?.css || ""}
                    `,
                  }}
                />
                <div className="photo-strip-date text-right bg-white">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card p-4 rounded-lg shadow border">
            <Tabs defaultValue="photos" className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="photos" className="flex items-center gap-1">
                  <Settings className="h-3 w-3" />
                  Edit Photos
                </TabsTrigger>
                <TabsTrigger value="style" className="flex items-center gap-1">
                  <Palette className="h-3 w-3" />
                  Style Strip
                </TabsTrigger>
              </TabsList>

              <TabsContent value="photos" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className={`
                          aspect-[4/3] rounded cursor-pointer overflow-hidden border-2
                          ${
                            selectedPhotoId === photo.id
                              ? "border-primary"
                              : "border-transparent"
                          }
                        `}
                        onClick={() => setSelectedPhotoId(photo.id)}
                      >
                        <img
                          src={photo.src}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                          style={{
                            filter: `
                              brightness(${photo.brightness}%)
                              contrast(${photo.contrast}%)
                              saturate(${photo.saturation}%)
                              ${
                                filters.find((f) => f.name === photo.filter)
                                  ?.css || ""
                              }
                            `,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {selectedPhoto && (
                    <Tabs defaultValue="filters" className="w-full">
                      <TabsList className="grid grid-cols-2">
                        <TabsTrigger
                          value="filters"
                          className="flex items-center gap-1"
                        >
                          <Sparkles className="h-3 w-3" />
                          Filters
                        </TabsTrigger>
                        <TabsTrigger
                          value="adjustments"
                          className="flex items-center gap-1"
                        >
                          <Settings className="h-3 w-3" />
                          Adjust
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="filters" className="space-y-4 mt-4">
                        <Select
                          value={selectedPhoto.filter}
                          onValueChange={handleFilterChange}
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

                        <div className="grid grid-cols-3 gap-2">
                          {filters.slice(0, 6).map((filter) => (
                            <div
                              key={filter.name}
                              className={`
                                aspect-square rounded overflow-hidden cursor-pointer border-2
                                ${
                                  selectedPhoto.filter === filter.name
                                    ? "border-primary"
                                    : "border-transparent"
                                }
                              `}
                              onClick={() => handleFilterChange(filter.name)}
                            >
                              <div className="w-full h-full text-xs flex items-center justify-center">
                                {filter.label.split(" ")[0]}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent
                        value="adjustments"
                        className="space-y-4 mt-4"
                      >
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Brightness: {selectedPhoto.brightness}%
                          </label>
                          <Slider
                            value={[selectedPhoto.brightness]}
                            min={50}
                            max={150}
                            step={1}
                            onValueChange={handleBrightnessChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Contrast: {selectedPhoto.contrast}%
                          </label>
                          <Slider
                            value={[selectedPhoto.contrast]}
                            min={50}
                            max={150}
                            step={1}
                            onValueChange={handleContrastChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Saturation: {selectedPhoto.saturation}%
                          </label>
                          <Slider
                            value={[selectedPhoto.saturation]}
                            min={50}
                            max={150}
                            step={1}
                            onValueChange={handleSaturationChange}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  )}

                  {selectedPhotoId && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full text-white"
                      onClick={() => {
                        if (selectedPhotoId) {
                          removePhoto(selectedPhotoId);
                          setSelectedPhotoId(
                            photos.length > 1 ? photos[0].id : null
                          );
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Photo
                    </Button>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="style" className="mt-4">
                <StripStyler
                  stripStyle={stripStyle}
                  onStyleChange={updateStripStyle}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoStrip;
