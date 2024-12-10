import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9090',  // 실제 API 서버 URL
        changeOrigin: true,  // CORS 문제를 해결하기 위해 origin을 변경
        rewrite: (path) => path.replace(/^\/api/, ''),  // /api 경로를 제거하고 요청
      },
    },
  },
});
