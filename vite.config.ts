import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        global: "globalThis",
    },
    resolve: {
        alias: {
            process: "process/browser",
            util: "util",
            "@": path.resolve(__dirname, "./src"),
            jsbi: path.resolve(__dirname, "node_modules/jsbi"),
        },
    },
    plugins: [react()],
});
