import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),

  ],
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  server: {
    host: "0.0.0.0", // Replace with your local IP address
    port: 3000, // Or any port you prefer
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      core: path.resolve(__dirname, "src/core"),
      hooks: path.resolve(__dirname, "src/hooks"),
      layouts: path.resolve(__dirname, "src/layouts"),
      pages: path.resolve(__dirname, "src/pages"),
      store: path.resolve(__dirname, "src/store"),
      theme: path.resolve(__dirname, "src/theme"),
      uiKit: path.resolve(__dirname, "src/uiKit"),
    },
  },
});
