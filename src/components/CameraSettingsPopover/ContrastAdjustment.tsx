import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Contrast, Sun } from "lucide-react";

interface ContrastAdjustmentProps {
  contrast: number;
  setContrast: (value: number) => void;
}

export function ContrastAdjustment({
  contrast,
  setContrast,
}: ContrastAdjustmentProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Contrast className="h-4 w-4" />
          <span className="sr-only">Adjust Contrast</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Contrast</h4>
            <span className="text-sm text-muted-foreground">{contrast}%</span>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground text-right">
                50%
              </span>
              <Slider
                value={[contrast]}
                min={50}
                max={150}
                step={1}
                className="w-[200px]"
                onValueChange={(value) => setContrast(value[0])}
              />
              <span className="text-sm text-muted-foreground">150%</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
