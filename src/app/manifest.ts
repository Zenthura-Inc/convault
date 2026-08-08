import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Convault",
    short_name: "Convault",
    description: "A fast, simple, privacy-first file converter.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5b21b6",
    icons: [
      {
        src: "/icon-transparent.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-transparent.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
