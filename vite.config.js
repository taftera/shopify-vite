import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        counter: "src/counter/main.jsx",
        message: "src/message/main.jsx",
        // addToCart: 'src/add-to-cart-button/main.jsx',
      },
      output: {
        dir: "assets",
        entryFileNames: "vite-[name].js",
        chunkFileNames: "vite-[name].js",
        assetFileNames: "vite-[name].[ext]",
      },
    },
    watch: {},
    emptyOutDir: false,
  },
});
