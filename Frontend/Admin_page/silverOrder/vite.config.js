import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

// Vite 설정
export default defineConfig({
  plugins: [react()],
  base: '/silverorder/admin/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      // Node.js 환경의 util 모듈을 폴리필로 브라우저에서 사용
      util: 'rollup-plugin-node-polyfills/polyfills/util',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // globalThis를 global로 정의
      define: {
        global: 'globalThis',
      },
      plugins: [
        // Node.js 전역 객체 폴리필
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});
