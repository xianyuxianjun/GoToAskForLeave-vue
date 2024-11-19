import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports, getPascalCaseRouteName } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // 文档: https://github.com/posva/unplugin-vue-router
        // ℹ️ 此插件应放置在 vue 插件之前
        VueRouter({
            getRouteName: routeNode => {
                // 将 PascalCase 转换为 kebab-case
                return getPascalCaseRouteName(routeNode)
                    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                    .toLowerCase()
            },
        }),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: tag => tag === 'swiper-container' || tag === 'swiper-slide', // 定义自定义元素
                },
            },
        }),
        VueDevTools(), // 启用 Vue DevTools
        vueJsx(), // 支持 JSX 语法

        // 文档: https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin
        vuetify({
            styles: {
                configFile: 'src/assets/styles/variables/_vuetify.scss', // Vuetify 样式配置文件
            },
        }),

        // 文档: https://github.com/johncampionjr/vite-plugin-vue-layouts#vite-plugin-vue-layouts
        Layouts({
            layoutsDirs: './src/layouts/', // 布局目录
        }),

        // 文档: https://github.com/antfu/unplugin-vue-components#unplugin-vue-components
        Components({
            dirs: ['src/@core/components', 'src/views/demos', 'src/components'], // 组件目录
            dts: true, // 生成 TypeScript 声明文件
            resolvers: [
                componentName => {
                    // 自动导入 `VueApexCharts`
                    if (componentName === 'VueApexCharts')
                        return { name: 'default', from: 'vue3-apexcharts', as: 'VueApexCharts' }
                },
            ],
        }),

        // 文档: https://github.com/antfu/unplugin-auto-import#unplugin-auto-import
        AutoImport({
            imports: ['vue', VueRouterAutoImports, '@vueuse/core', '@vueuse/math', 'vue-i18n', 'pinia'], // 自动导入的模块
            dirs: [
                './src/@core/utils',
                './src/@core/composable/',
                './src/composables/',
                './src/utils/',
                './src/plugins/*/composables/*',
            ], // 自动导入的目录
            vueTemplate: true, // 在 Vue 模板中启用自动导入

            // ℹ️ 禁用以避免混淆和意外使用
            ignore: ['useCookies', 'useStorage'],
            eslintrc: {
                enabled: true, // 启用 ESLint 配置
                filepath: './.eslintrc-auto-import.json', // ESLint 配置文件路径
            },
        }),
        svgLoader(), // 加载 SVG 文件
    ],
    define: { 'process.env': {} }, // 定义环境变量
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)), // 别名设置
            '@themeConfig': fileURLToPath(new URL('./themeConfig.js', import.meta.url)),
            '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
            '@layouts': fileURLToPath(new URL('./src/@layouts', import.meta.url)),
            '@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url)),
            '@styles': fileURLToPath(new URL('./src/assets/styles/', import.meta.url)),
            '@configured-variables': fileURLToPath(new URL('./src/assets/styles/variables/_template.scss', import.meta.url)),
            '@db': fileURLToPath(new URL('./src/plugins/fake-api/handlers/', import.meta.url)),
            '@api-utils': fileURLToPath(new URL('./src/plugins/fake-api/utils/', import.meta.url)),
        },
    },
    build: {
        chunkSizeWarningLimit: 5000, // 设置 chunk 大小警告限制
    },
    optimizeDeps: {
        exclude: ['vuetify'], // 排除优化依赖
        entries: [
            './src/**/*.vue', // 包括所有 Vue 文件
        ],
    },
})
