import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vite';
import {ViteEjsPlugin} from 'vite-plugin-ejs';
import vue from '@vitejs/plugin-vue';
import resolveConfig from 'tailwindcss/resolveConfig';

const baseConfig = require('./src/config/index.json');
const tailwindConfig = resolveConfig(require('./tailwind.config.js'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteEjsPlugin({
      getColor(name: string, value: number) {
        if (tailwindConfig.theme?.colors) {
          return (tailwindConfig.theme?.colors as Record<string, Record<string, string>>)[name][value];
        }
        return '#000';
      },
      pageTitle: baseConfig.name,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
