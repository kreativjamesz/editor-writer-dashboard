import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";

export default defineConfig({
    plugins: [
        VueRouter({
            // Router configuration - the path should point to your pages directory
            routesFolder: "resources/js/pages",
            extensions: [".vue"],
        }),
        vue({
            // This is important - should be after VueRouter plugin
            include: [/\.vue$/],
        }),
        laravel({
            input: ["resources/css/app.css", "resources/js/app.ts"],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
            "@": fileURLToPath(new URL("/resources/js", import.meta.url)),
        },
    },
});
