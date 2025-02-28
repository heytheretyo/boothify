import { Filter } from "@/types";

export const filters: Filter[] = [
  {
    name: "normal",
    label: "Normal",
    css: "",
  },
  {
    name: "vintage",
    label: "Vintage",
    css: "sepia(0.5) hue-rotate(-30deg)",
  },
  {
    name: "grayscale",
    label: "Black & White",
    css: "grayscale(1)",
  },
  {
    name: "sepia",
    label: "Sepia",
    css: "sepia(0.8)",
  },
  {
    name: "retro",
    label: "Retro",
    css: "sepia(0.3) contrast(1.1) brightness(1.1) saturate(1.5)",
  },
  {
    name: "cool",
    label: "Cool",
    css: "hue-rotate(180deg) saturate(1.4)",
  },
  {
    name: "warm",
    label: "Warm",
    css: "hue-rotate(-10deg) saturate(1.5)",
  },
  {
    name: "dramatic",
    label: "Dramatic",
    css: "contrast(1.4) brightness(0.9)",
  },
  {
    name: "faded",
    label: "Faded",
    css: "opacity(0.8) brightness(1.2) saturate(0.8)",
  },
  {
    name: "polaroid",
    label: "Polaroid",
    css: "sepia(0.2) brightness(1.1) contrast(1.1) saturate(1.1)",
  },
  {
    name: "technicolor",
    label: "Technicolor",
    css: "saturate(2) contrast(1.1)",
  },
  {
    name: "noir",
    label: "Film Noir",
    css: "grayscale(1) contrast(1.4) brightness(0.9)",
  },
];
