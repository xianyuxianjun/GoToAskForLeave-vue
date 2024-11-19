import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { useInstStore } from '@/store/inst.js'

/**
 * 递归地为每个路由设置布局
 * @param {Object} route 路由对象
 * @returns {Object} 处理后的路由对象
 */
function recursiveLayouts(route) {
    if (route.children) {
        for (let i = 0; i < route.children.length; i++)
            route.children[i] = recursiveLayouts(route.children[i])

        return route
    }

    return setupLayouts([route])[0]
}

// 创建 Vue Router 实例
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // 使用浏览器的历史记录模式
    scrollBehavior(to) {
        if (to.hash)
            return { el: to.hash, behavior: 'smooth', top: 60 } // 如果有锚点，平滑滚动到锚点位置，距离顶部 60px

        return { top: 0 } // 默认滚动到页面顶部
    },
    extendRoutes: pages => [
        ...[...pages].map(route => recursiveLayouts(route)), // 为每个路由设置布局
    ],
})

// 导出路由实例
export { router }

// 默认导出一个函数，用于在应用中注册路由
export default function (app) {
    app.use(router) // 使用路由实例
}
