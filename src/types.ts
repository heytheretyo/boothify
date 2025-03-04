export interface Photo {
  id: string;
  src: string;
  filter: string;
  brightness: number;
  contrast: number;
  saturation: number;
}

export interface Filter {
  name: string;
  label: string;
  css: string;
  labelCss?: string;
}

export interface StripStyle {
  backgroundType: "color" | "pattern" | "gradient";
  borderColor: string;
  layout: "vertical" | "grid";
  backgroundImage: string;
  backgroundSize: string;
  backgroundPosition: string;
  color: string;
}

export type StickerItem = {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export type Sticker = {
  id: string;
  src: string;
  alt: string;
};
