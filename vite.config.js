import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { VantResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  optimizeDeps: {
    exclude: ['element-ui'] // 禁止预构建 element-ui
  },
  define: {
    'process.env': {} // 防止 process.env 报错
  },
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({ imports: ['vue', 'vue-router', 'pinia'] }),
    // 使用 unplugin-vue-components 插件自动引入 Vant 组件
    Components({
      dts: true,
      resolvers: [VantResolver()]
    })
  ],
  server: {
    // 是否在控制台输出服务器地址
    host: true,
    // 是否启用 https，设置为 true 则启用 http2
    https: false,
    // 是否允许跨域请求，设置为 true 允许任何源
    cors: true,
    // 启动开发服务器时自动在浏览器中打开应用
    open: true,
    // 服务运行的端口号
    port: 9000,
    // 当端口被占用时是否直接退出，设置为 true 则直接退出
    strictPort: false,
    // 热更新功能
    hmr: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
