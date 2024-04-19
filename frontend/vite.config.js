import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	base: "/",
	publicDir: "public",
	build: {
		minify: "terser",
		terserOptions: {
			format: {
				comments: false,
			},
		},
		outDir: "dist",
		rollupOptions: {
			output: {
				entryFileNames: `assets/js/script-[name].js`,
				chunkFileNames: `assets/js/script-[name].js`,
				assetFileNames: (assetInfo) => {
					if (assetInfo.name.endsWith(".css")) {
						return "assets/css/styles-[name].css";
					}

					if (assetInfo.name.endsWith(".js")) {
						return "assets/js/script-[name].js";
					}

					return "assets/[ext]/[name].[ext]";
				},
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return "vendor";
					}
				},
			},
		},
	},
	server: {
		open: true,
		port: 6969,
		proxy: {
			"/api": {
				target: "http://localhost:6970",
				changeOrigin: true,
				rewrite: (path) => {
					return path.replace(/^\/api/, "");
				},
			},
		},
	},
	define: {
		global: "globalThis",
	},
});
