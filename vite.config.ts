import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [
//     react(),
//     electron({
//       // Main process entry file of the Electron App.
//       entry: "electron/main.ts",
//       vite: {
//         plugins: [native(/* options */)],
//         build: {
//           rollupOptions: {
//             external: [
//               "better-sqlite3",
//               "sqlite3",
//               "serialport",
//               // other `C/C++` addons
//             ],
//           },
//         },
//       },
//     }),
//   ],
// });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: "electron/main.ts",
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, "electron/preload.ts"),
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],
});
