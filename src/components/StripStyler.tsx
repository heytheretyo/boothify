import { useState } from "react";
import { StripStyle } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Paintbrush, Grid3X3, AlignVerticalJustifyCenter } from "lucide-react";
import { stripBackgrounds, stripBorders } from "@/lib/stripStyles";

interface StripStylerProps {
  stripStyle: StripStyle;
  onStyleChange: (style: Partial<StripStyle>) => void;
}

const StripStyler = ({ stripStyle, onStyleChange }: StripStylerProps) => {
  const [activeTab, setActiveTab] = useState("background");

  const handleBackgroundChange = (
    background: string,
    type: "color" | "pattern" | "gradient"
  ) => {
    const selectedStyle = stripBackgrounds.find((bg) => bg.name === background);

    if (type === "color") {
      // For color backgrounds, only set the background color
      onStyleChange({
        color: selectedStyle?.color,
        backgroundType: type,
        backgroundSize: undefined,
        backgroundPosition: undefined,
      });
    } else if (type === "pattern") {
      // For pattern backgrounds, set the background, size, and position
      const selectedPattern = stripBackgrounds.find(
        (bg) => bg.name === background && bg.type === "pattern" // Searching by name instead of value
      );
      onStyleChange({
        color: selectedStyle?.color,
        backgroundType: type,
        backgroundSize: selectedPattern?.backgroundSize,
        backgroundPosition: selectedPattern?.backgroundPosition,
      });
    } else if (type === "gradient") {
      // For gradient backgrounds, set the background and related properties
      onStyleChange({
        color: selectedStyle?.color,
        backgroundType: type,
        backgroundSize: undefined, // Gradients typically don't need background size
        backgroundPosition: undefined, // Gradients typically don't need background position
      });
    }
  };

  const handleBorderChange = (borderColor: string) => {
    onStyleChange({ borderColor });
  };

  const handleLayoutChange = (layout: "vertical" | "grid") => {
    onStyleChange({ layout });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-2">Customize Photo Strip</h3>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="background" className="flex items-center gap-1">
            <Paintbrush className="h-3 w-3" />
            Background
          </TabsTrigger>
          <TabsTrigger value="border" className="flex items-center gap-1">
            <div className="h-3 w-3 border border-current rounded-sm" />
            Border
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-1">
            <Grid3X3 className="h-3 w-3" />
            Layout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="background" className="space-y-4 mt-4">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Solid Colors</h4>
            <div className="flex flex-wrap gap-2">
              {stripBackgrounds
                .filter((bg) => bg.type === "color")
                .map((bg) => (
                  <div
                    key={bg.name}
                    className={`color-swatch ${
                      stripStyle.color === bg.color ? "active" : ""
                    }`}
                    style={{ backgroundColor: bg.color }}
                    onClick={() => handleBackgroundChange(bg.name, "color")}
                    title={bg.label}
                  />
                ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Patterns</h4>
            <div className="flex flex-wrap gap-2">
              {stripBackgrounds
                .filter((bg) => bg.type === "pattern")
                .map((bg) => (
                  <div
                    key={bg.name}
                    className={`pattern-swatch ${
                      stripStyle.color === bg.color ? "active" : ""
                    }`}
                    style={{
                      background: bg.color,
                      backgroundSize: bg.backgroundSize,
                      backgroundPosition: bg.backgroundPosition,
                    }}
                    onClick={() => handleBackgroundChange(bg.name, "pattern")}
                    title={bg.label}
                  />
                ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Gradients</h4>
            <div className="flex flex-wrap gap-2">
              {stripBackgrounds
                .filter((bg) => bg.type === "gradient")
                .map((bg) => (
                  <div
                    key={bg.name}
                    className={`pattern-swatch ${
                      stripStyle.color === bg.color ? "active" : ""
                    }`}
                    style={{ background: bg.color }}
                    onClick={() => handleBackgroundChange(bg.name, "gradient")}
                    title={bg.label}
                  />
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="border" className="space-y-4 mt-4">
          <div className="flex flex-wrap gap-2">
            {stripBorders.map((border) => (
              <div
                key={border.name}
                className={`color-swatch ${
                  stripStyle.borderColor === border.value ? "active" : ""
                }`}
                style={{ backgroundColor: border.value }}
                onClick={() => handleBorderChange(border.value)}
                title={border.label}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4 mt-4">
          <RadioGroup
            value={stripStyle.layout}
            onValueChange={(value: string) =>
              handleLayoutChange(value as "vertical" | "grid")
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vertical" id="vertical" />
              <Label
                htmlFor="vertical"
                className="flex items-center gap-1 cursor-pointer"
              >
                <AlignVerticalJustifyCenter className="h-4 w-4" />
                Vertical
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="grid" id="grid" />
              <Label
                htmlFor="grid"
                className="flex items-center gap-1 cursor-pointer"
              >
                <Grid3X3 className="h-4 w-4" />
                Grid
              </Label>
            </div>
          </RadioGroup>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StripStyler;
