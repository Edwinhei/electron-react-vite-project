import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 解决打包后 Electron 找不到资源的问题

  build: {
    outDir: 'dist', // 确保输出目录是 dist
  },

  // 这部分是关键，用于在开发模式下解决渲染进程和主进程之间的通信
  // 以及在生产模式下确保 Electron 相关模块不被 Vite 打包
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 可选：配置路径别名
    },
  },

  optimizeDeps: {
    exclude: ['electron'], // 排除 electron 模块，因为它是 Node.js 模块
  },
})
