import { Photo, StripStyle, Filter } from "@/types";

interface StripPreviewProps {
  photos: Photo[];
  stripStyle: StripStyle;
  filters: Filter[];
}

const StripPreview = ({ photos, stripStyle, filters }: StripPreviewProps) => {
  // Create placeholder photos if we don't have enough
  const displayPhotos = [...photos];
  while (displayPhotos.length < 4) {
    displayPhotos.push({
      id: `placeholder-${displayPhotos.length}`,
      src: "",
      filter: "normal",
      brightness: 100,
      contrast: 100,
      saturation: 100,
    });
  }

  return (
    <div className="strip-preview">
      <div
        className="photo-strip-container"
        style={{
          background: stripStyle.color,
          backgroundSize:
            stripStyle.backgroundType === "pattern" ? "10px 10px" : undefined,
          backgroundPosition:
            stripStyle.backgroundType === "pattern"
              ? "0 0, 5px 5px"
              : undefined,
        }}
      >
        <div className={`strip-layout-${stripStyle.layout}`}>
          {displayPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="photo-strip-image"
              style={{ borderColor: stripStyle.borderColor }}
            >
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={`Photo ${index + 1}`}
                  className="w-full aspect-[4/3] object-cover"
                  style={{
                    filter: `
                      brightness(${photo.brightness}%)
                      contrast(${photo.contrast}%)
                      saturate(${photo.saturation}%)
                      ${filters.find((f) => f.name === photo.filter)?.css || ""}
                    `,
                  }}
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">{index + 1}</span>
                </div>
              )}

              {photo.src && (
                <div className="photo-strip-date text-right">
                  {new Date().toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StripPreview;
