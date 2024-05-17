import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";
import path from "path";
import vue from "@vitejs/plugin-vue";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  root,
  plugins: [
    vue(),
    {
      name: "Move asset folder to root directory",
      watchChange: async () => await moveAssetFolder(),
    },
  ],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Home: resolve(root, "main.js"),
        HomePage: resolve(root, "Homepage", "main.js"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        // assetFileNames: "[name].[ext]",
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(-1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }

          return `assets/${extType}/[name][extname]`;
        },
      },
    },
  },
});

const moveAssetFolder = () => {
  const sourceFolder = path.join(__dirname, "dist", "assets");
  const destinationFolder = path.join(__dirname, "..", "assets");

  try {
    fs.cpSync(sourceFolder, destinationFolder, {
      recursive: true,
    });

    console.log("Success on moving the 'assets' folder to the root directory");
  } catch (error) {
    console.log(
      "SEG TEMPLATE: Failed moving the 'assets' folder to the root directory, more details:",
      error.message
    );
  }
};

// YourFolder: resolve(root, "yourfolder", "main.js"),
