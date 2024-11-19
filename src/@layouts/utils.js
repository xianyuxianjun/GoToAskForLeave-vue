import { layoutConfig } from '@layouts/config'
import { AppContentLayoutNav } from '@layouts/enums'
import { useLayoutConfigStore } from '@layouts/stores/config'

export const openGroups = ref([])

/**
 * 返回导航链接的 props
 * @param {Object, String} item 导航路由名称或路由对象
 */
export const getComputedNavLinkToProp = computed(() => link => {
    const props = {
        target: link.target,
        rel: link.rel,
    }

    // 如果路由是字符串，则假设字符串是路由名称，从路由名称创建路由对象
    // 如果路由不是字符串，则假设它是路由对象，返回传递的路由对象
    if (link.to)
        props.to = typeof link.to === 'string' ? { name: link.to } : link.to
    else
        props.href = link.href

    return props
})

/**
 * 返回导航链接的路由名称
 * 如果链接是字符串，则假设它是路由名称
 * 如果链接是对象，则解析对象并返回链接
 * @param {Object, String} link 导航链接对象/字符串
 */
export const resolveNavLinkRouteName = (link, router) => {
    if (!link.to)
        return null
    if (typeof link.to === 'string')
        return link.to

    return router.resolve(link.to).name
}

/**
 * 检查导航链接是否处于激活状态
 * @param {object} link 导航链接对象
 */
export const isNavLinkActive = (link, router) => {
    // 当前路由的匹配路由数组
    const matchedRoutes = router.currentRoute.value.matched

    // 检查提供的路由是否与路由的匹配路由匹配
    const resolveRoutedName = resolveNavLinkRouteName(link, router)
    if (!resolveRoutedName)
        return false

    return matchedRoutes.some(route => {
        return route.name === resolveRoutedName || route.meta.navActiveLink === resolveRoutedName
    })
}

/**
 * 检查导航组是否处于激活状态
 * @param {Array} children 组的子项
 */
export const isNavGroupActive = (children, router) => children.some(child => {
    // 如果子项有子项，则它是组，递归深入
    if ('children' in child)
        return isNavGroupActive(child.children, router)

    // 否则是链接，检查匹配的路由
    return isNavLinkActive(child, router)
})

/**
 * 根据方向设置 `dir` 属性
 * @param dir 'ltr' | 'rtl'
 */
export const _setDirAttr = dir => {
    // 检查是否存在文档以支持 SSR
    if (typeof document !== 'undefined')
        document.documentElement.setAttribute('dir', dir)
}

/**
 * 根据是否启用了 i18n 插件返回动态 i18n props
 * @param key i18n 翻译键
 * @param tag 包裹翻译的标签
 */
export const getDynamicI18nProps = (key, tag = 'span') => {
    if (!layoutConfig.app.i18n.enable)
        return {}

    return {
        keypath: key,
        tag,
        scope: 'global',
    }
}

/**
 * 在屏幕宽度小于覆盖导航断点时切换到垂直导航
 */
export const switchToVerticalNavOnLtOverlayNavBreakpoint = () => {
    const configStore = useLayoutConfigStore()

    /*
          ℹ️ 这个标志将保存在切换窗口宽度时需要渲染的导航类型

          需求：当导航设置为 `horizontal` 并且我们达到 `mdAndDown` 断点时，导航类型应更改为 `vertical` 导航
          现在，如果我们从 `mdAndDown` 返回到 `lgAndUp`，如何知道大设备上之前的导航类型是什么？

          让我们将 `appContentLayoutNav` 的值作为 `lgAndUpNav` 的默认值。为什么🤔？
            如果模板在 `lgAndUp` 中查看
              我们将 `appContentLayoutNav` 的值赋给 `lgAndUpNav`，因为在这一点上两个常量是相同的
              因此，对于 `lgAndUpNav`，它将从主题配置文件中获取值
            否则
              它将始终显示垂直导航，如果用户增加窗口宽度，它将回退到 `appContentLayoutNav` 的值
              但 `appContentLayoutNav` 将是主题配置文件中的值
        */
    const lgAndUpNav = ref(configStore.appContentLayoutNav)

    /*
          可能会出现这种情况：我们在 `lgAndUp` 屏幕上手动从垂直导航切换到水平导航，反之亦然
          因此，当用户从 `mdAndDown` 返回到 `lgAndUp` 时，我们可以设置更新后的导航类型
          为此，我们需要在屏幕为 `lgAndUp` 时更新 `lgAndUpNav` 的值
        */
    watch(() => configStore.appContentLayoutNav, value => {
        if (!configStore.isLessThanOverlayNavBreakpoint)
            lgAndUpNav.value = value
    })

    /*
          这是布局切换部分
          如果是 `mdAndDown`，无论之前是什么导航类型，我们都将使用垂直导航
          或者如果是 `lgAndUp`，我们需要切换回 `lgAndUp` 导航类型。为此，我们将跟踪 `lgAndUpNav` 属性
        */
    watch(() => configStore.isLessThanOverlayNavBreakpoint, val => {
        configStore.appContentLayoutNav = val ? AppContentLayoutNav.Vertical : lgAndUpNav.value
    }, { immediate: true })
}

/**
 * 将十六进制颜色转换为 RGB 颜色
 * @param hex 十六进制颜色
 */
export const hexToRgb = hex => {
    // 将简写形式（例如 "03F"）扩展为完整形式（例如 "0033FF"）
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i

    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result ? `${Number.parseInt(result[1], 16)},${Number.parseInt(result[2], 16)},${Number.parseInt(result[3], 16)}` : null
}

/**
 * 将 RGBA 颜色转换为十六进制颜色，可选带透明度
 * @param rgba RGBA 颜色
 * @param forceRemoveAlpha 是否强制移除透明度
 */
export const rgbaToHex = (rgba, forceRemoveAlpha = false) => {
    return (`#${rgba
        .replace(/^rgba?$|\s+|$$/g, '') // 获取 rgba / rgb 字符串值
        .split(',') // 按逗号分割它们
        .filter((string, index) => !forceRemoveAlpha || index !== 3)
        .map(string => Number.parseFloat(string)) // 将它们转换为数字
        .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // 将透明度转换为 255 数字
        .map(number => number.toString(16)) // 将数字转换为十六进制
        .map(string => (string.length === 1 ? `0${string}` : string)) // 如果数字长度为 1，则添加 0
        .join('')}`)
}
