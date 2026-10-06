// Fonts are bundled with the project so renders work offline.
import "@fontsource/montserrat/latin-800.css";
import "@fontsource/montserrat/latin-900.css";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";

export const fonts = {
  display: "Montserrat, sans-serif",
  body: "Poppins, sans-serif",
};

export const colors = {
  night: "#06180f",
  forest: "#0b2e1f",
  emerald: "#1fa463",
  leaf: "#3ccf7a",
  lime: "#b9f27c",
  cream: "#f4f1e6",
  muted: "#9fc7ad",
};

export const brand = {
  company: "DSO",
  founder: "Prathmesh Bhosle",
  founderHandle: "@fitwithpratham",
  founderFollowers: 2_400_000,
  brandFollowers: 30_000,
};

export type Product = {
  name: string;
  detail: string;
  color: string;
};

export const products: Product[] = [
  { name: "Vitamin D", detail: "The sunshine vitamin", color: "#ffc94a" },
  { name: "Vitamin B12", detail: "Daily essential", color: "#ff7a7a" },
  {
    name: "Sea Buckthorn",
    detail: "Natural vitamin C",
    color: "#ff9f43",
  },
  { name: "Bhringraj Powder", detail: "Traditional herb", color: "#7ad1ff" },
  {
    name: "Moringa Powder",
    detail: "Drumstick leaf powder",
    color: "#b9f27c",
  },
];
