import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/silverorder/customer/", // base path 추가
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "SilverOrder",
        short_name: "silverorder",
        description: "시니어를 위한 편리한 주문 어플, SILVER ORDER",
        theme_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/silverorder/customer/", // PWA 시작 URL 설정
        scope: "/silverorder/customer/", // PWA 범위 설정
      },
      devOptions: {
        enabled: true, // 개발 모드에서 PWA를 사용 가능하게 함
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
  define: {
    global: "window", // 브라우저 환경에서 global을 window로 대체
  },
  server: {
    proxy: {
      "/silverorder/api": {
        target: "https://i11c202.p.ssafy.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/silverorder\/api/, "/studycow/api"),
      },
      "/silverorder/ws-stomp": {
        target: "http://localhost:8080", // 스프링 부트 서버의 URL
        changeOrigin: true,
        ws: true, // WebSocket 요청을 프록시합니다.
        rewrite: (path) =>
          path.replace(/^\/silverorder\/ws-stomp/, "/ws-stomp"),
      },
    },
  },
});
