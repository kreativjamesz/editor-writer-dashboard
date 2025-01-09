import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import VueRouter from 'unplugin-vue-router/vite';
import Components from 'unplugin-vue-components/vite';
import path from 'path';

import { VueRouterAutoImports } from 'unplugin-vue-router';

export default defineConfig({
  plugins: [
    VueRouter({
      // Router configuration - the path should point to your pages directory
      routesFolder: 'resources/js/pages',
      extensions: ['.vue'],
      dts: 'resources/js/types/typed-router.d.ts',
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', VueRouterAutoImports],
      dts: 'resources/js/types/auto-imports.d.ts',
      dirs: ['resources/js/composables/**', 'resources/js/stores/**'],
      vueTemplate: true,
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'resources/js/types/components.d.ts',
      dirs: ['resources/js/components/**', 'resources/js/layouts'],
    }),
    vue({
      // This is important - should be after VueRouter plugin
      include: [/\.vue$/],
    }),
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.ts'],
      refresh: true,
    }),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
});
