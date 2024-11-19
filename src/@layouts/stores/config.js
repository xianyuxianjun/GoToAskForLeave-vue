import { AppContentLayoutNav, NavbarType } from '@layouts/enums'
import { injectionKeyIsVerticalNavHovered } from '@layouts/symbols'
import { _setDirAttr } from '@layouts/utils'

// ℹ️ 我们不应该在这里导入 themeConfig，但由于紧急情况暂时这样做
import { layoutConfig } from '@themeConfig'

export const namespaceConfig = str => `${layoutConfig.app.title}-${str}`
export const cookieRef = (key, defaultValue) => {
    return useCookie(namespaceConfig(key), { default: () => defaultValue })
}
export const useLayoutConfigStore = defineStore('layoutConfig', () => {
    const route = useRoute()

    // 导航栏类型
    const navbarType = ref(layoutConfig.navbar.type)

    // 导航栏模糊效果
    const isNavbarBlurEnabled = cookieRef('isNavbarBlurEnabled', layoutConfig.navbar.navbarBlur)

    // 垂直导航栏折叠
    const isVerticalNavCollapsed = cookieRef('isVerticalNavCollapsed', layoutConfig.verticalNav.isVerticalNavCollapsed)

    // 应用内容宽度
    const appContentWidth = cookieRef('appContentWidth', layoutConfig.app.contentWidth)

    // 应用内容布局导航
    const appContentLayoutNav = ref(layoutConfig.app.contentLayoutNav)

    watch(appContentLayoutNav, val => {
        // 如果在切换到水平导航时导航栏类型为隐藏，则重置为固定
        if (val === AppContentLayoutNav.Horizontal) {
            if (navbarType.value === NavbarType.Hidden)
                navbarType.value = NavbarType.Sticky
            isVerticalNavCollapsed.value = false
        }
    })


    // 水平导航类型
    const horizontalNavType = ref(layoutConfig.horizontalNav.type)

    // 水平导航弹出偏移量
    const horizontalNavPopoverOffset = ref(layoutConfig.horizontalNav.popoverOffset)

    // 底部类型
    const footerType = ref(layoutConfig.footer.type)

    // 其他
    const isLessThanOverlayNavBreakpoint = computed(() => useMediaQuery(`(max-width: ${layoutConfig.app.overlayNavFromBreakpoint}px)`).value)


    // 布局类
    const _layoutClasses = computed(() => {
        const { y: windowScrollY } = useWindowScroll()

        return [
            `layout-nav-type-${appContentLayoutNav.value}`,
            `layout-navbar-${navbarType.value}`,
            `layout-footer-${footerType.value}`,
            {
                'layout-vertical-nav-collapsed': isVerticalNavCollapsed.value
                    && appContentLayoutNav.value === 'vertical'
                    && !isLessThanOverlayNavBreakpoint.value,
            },
            { [`horizontal-nav-${horizontalNavType.value}`]: appContentLayoutNav.value === 'horizontal' },
            `layout-content-width-${appContentWidth.value}`,
            { 'layout-overlay-nav': isLessThanOverlayNavBreakpoint.value },
            { 'window-scrolled': unref(windowScrollY) },
            route.meta.layoutWrapperClasses ? route.meta.layoutWrapperClasses : null,
        ]
    })


    // 右到左布局
    // const isAppRTL = ref(layoutConfig.app.isRTL)
    const isAppRTL = ref(false)

    watch(isAppRTL, val => {
        _setDirAttr(val ? 'rtl' : 'ltr')
    })


    // 垂直导航迷你状态
    /*
        此函数将在当前状态为迷你时返回 true。迷你状态意味着垂直导航：
          - 折叠
          - 未被鼠标悬停
          - 导航不是小于覆盖断点的（因此，不是覆盖菜单）

        ℹ️ 我们通过参数获取 `isVerticalNavHovered` 而不是通过 `inject`，因为
            我们在 `VerticalNav.vue` 组件中使用它，该组件提供了它，而由于同一个组件提供并注入，
            我们会遇到 undefined 错误
      */
    const isVerticalNavMini = (isVerticalNavHovered = null) => {
        const isVerticalNavHoveredLocal = isVerticalNavHovered || inject(injectionKeyIsVerticalNavHovered) || ref(false)

        return computed(() => isVerticalNavCollapsed.value && !isVerticalNavHoveredLocal.value && !isLessThanOverlayNavBreakpoint.value)
    }

    return {
        appContentWidth,
        appContentLayoutNav,
        navbarType,
        isNavbarBlurEnabled,
        isVerticalNavCollapsed,
        horizontalNavType,
        horizontalNavPopoverOffset,
        footerType,
        isLessThanOverlayNavBreakpoint,
        isAppRTL,
        _layoutClasses,
        isVerticalNavMini,
    }
})
