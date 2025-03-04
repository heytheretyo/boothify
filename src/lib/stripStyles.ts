import { StripStyle } from "@/types";

export const stripBackgrounds = [
  // Solid color backgrounds
  {
    name: "solid-white",
    label: "White",
    color: "#ffffff",
    type: "color",
    description: "A simple white background.",
    backgroundSize: undefined, // Not applicable for solid color
    backgroundPosition: undefined, // Not applicable for solid color
  },
  {
    name: "solid-black",
    label: "Black",
    color: "#000000",
    type: "color",
    description: "A solid black background.",
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },
  {
    name: "solid-pink",
    label: "Pink",
    color: "#ffd1dc",
    type: "color",
    description: "A soft pink background.",
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },
  {
    name: "solid-blue",
    label: "Blue",
    color: "#d1e8ff",
    type: "color",
    description: "A light blue background.",
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },
  {
    name: "solid-mint",
    label: "Mint",
    color: "#d1ffea",
    type: "color",
    description: "A mint green background.",
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },

  // Patterned backgrounds
  {
    name: "pattern-stripes",
    label: "Stripes",
    color:
      "repeating-linear-gradient(45deg,  #000 0, #000 10px, #fff 10px, #fff 20px)",
    type: "pattern",
    description:
      "A repeating diagonal stripes pattern alternating between light gray and white.",
    backgroundSize: undefined, // It's a linear gradient, so backgroundSize doesn't apply directly
    backgroundPosition: undefined, // Pattern is repeated along the gradient
  },
  {
    name: "pattern-diagonal-stripes",
    label: "Diagonal Stripes",
    color:
      "repeating-linear-gradient(-45deg, #000 0, #000 10px, #fff 10px, #fff 20px)",
    type: "pattern",
    description:
      "A diagonal striped pattern alternating between black and white.",
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },

  // Gradient backgrounds
  {
    name: "gradient-sunset",
    label: "Sunset",
    color: "linear-gradient(to bottom, #ff9966, #ff5e62)",
    type: "gradient",
    description: "A warm gradient from orange to red, mimicking a sunset.",
    gradientDirection: "to bottom", // The direction of the gradient from top to bottom
    gradientColors: ["#ff9966", "#ff5e62"], // Colors involved in the gradient
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },
  {
    name: "gradient-ocean",
    label: "Ocean",
    color: "linear-gradient(to bottom, #2193b0, #6dd5ed)",
    type: "gradient",
    description: "A cool gradient from ocean blue to lighter sky blue.",
    gradientDirection: "to bottom",
    gradientColors: ["#2193b0", "#6dd5ed"],
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },
  {
    name: "gradient-purple",
    label: "Purple Haze",
    color: "linear-gradient(to bottom, #c471ed, #f64f59)",
    type: "gradient",
    description: "A vibrant gradient from purple to pink.",
    gradientDirection: "to bottom",
    gradientColors: ["#c471ed", "#f64f59"],
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },
];

export const stripBorders = [
  {
    name: "white",
    label: "White",
    value: "#ffffff",
  },
  {
    name: "black",
    label: "Black",
    value: "#000000",
  },
  {
    name: "gold",
    label: "Gold",
    value: "#ffd700",
  },
  {
    name: "silver",
    label: "Silver",
    value: "#c0c0c0",
  },
  {
    name: "pink",
    label: "Pink",
    value: "#ff80ab",
  },
];

export const defaultStripStyle: StripStyle = {
  backgroundType: "color", // Default to color type
  backgroundImage: "", // Initialize to an empty string for backgroundImage
  backgroundSize: "", // Initialize backgroundSize
  backgroundPosition: "", // Initialize backgroundPosition
  borderColor: stripBorders[0].value,
  layout: "vertical",
  color: "string",
};
