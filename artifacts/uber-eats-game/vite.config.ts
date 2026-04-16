import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Environment variables with defaults for Vercel
const rawPort = process.env.PORT || "3000";
const port = Number(rawPort);
const basePath = process.env.BASE_PATH || "/";

export default defineConfig(async () => {
  const plugins: any[] = [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
  ];

  // Only load Replit plugins in development with REPL_ID
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const cartographer = await import("@replit/vite-plugin-cartographer").then((m) =>
      m.cartographer({
        root: path.resolve(import.meta.dirname, ".."),
      }),
    );
    const devBanner = await import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner());
    plugins.push(cartographer, devBanner);
  }

  return {
    base: "/",
    plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
