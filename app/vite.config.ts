import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (dev or prod)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env": env, // Ensures process.env variables are available
    },
    server: {
      port: 8080, // Set a custom port if needed
      open: false, // Automatically open the app in the browser
    },
    build: {
      outDir: "dist", // Output directory for the production build
    },
   
  };
});
