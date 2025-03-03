import { Filter } from "@/types";

export const filters: Filter[] = [
  {
    name: "normal",
    label: "Normal",
    css: "",
    labelCss: "bg-amber-400 text-white",
  },
  {
    name: "vintage",
    label: "Vintage",
    css: "sepia(0.5) hue-rotate(-30deg)",
    labelCss: "bg-yellow-700 text-white",
  },
  {
    name: "grayscale",
    label: "Black & White",
    css: "grayscale(1)",
    labelCss: "bg-gray-600 text-white",
  },
  {
    name: "sepia",
    label: "Sepia",
    css: "sepia(0.8)",
    labelCss: "bg-orange-700 text-white",
  },
  {
    name: "retro",
    label: "Retro",
    css: "sepia(0.3) contrast(1.1) brightness(1.1) saturate(1.5)",
    labelCss: "bg-red-500 text-white",
  },
  {
    name: "cool",
    label: "Cool",
    css: "hue-rotate(180deg) saturate(1.4)",
    labelCss: "bg-blue-500 text-white",
  },
  {
    name: "warm",
    label: "Warm",
    css: "hue-rotate(-10deg) saturate(1.5)",
    labelCss: "bg-orange-500 text-white",
  },
  {
    name: "dramatic",
    label: "Dramatic",
    css: "contrast(1.4) brightness(0.9)",
    labelCss: "bg-black text-white",
  },
  {
    name: "faded",
    label: "Faded",
    css: "opacity(0.8) brightness(1.2) saturate(0.8)",
    labelCss: "bg-gray-400 text-black",
  },
  {
    name: "polaroid",
    label: "Polaroid",
    css: "sepia(0.2) brightness(1.1) contrast(1.1) saturate(1.1)",
    labelCss: "bg-purple-500 text-white",
  },
  {
    name: "technicolor",
    label: "Technicolor",
    css: "saturate(2) contrast(1.1)",
    labelCss: "bg-green-500 text-white",
  },
  {
    name: "noir",
    label: "Film Noir",
    css: "grayscale(1) contrast(1.4) brightness(0.9)",
    labelCss: "bg-gray-900 text-white",
  },
];
