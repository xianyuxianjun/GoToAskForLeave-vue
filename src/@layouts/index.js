import { layoutConfig } from '@layouts/config'
import { cookieRef, useLayoutConfigStore } from '@layouts/stores/config'
import { _setDirAttr } from '@layouts/utils'

// 插件
export const createLayouts = userConfig => {
    return () => {
        const configStore = useLayoutConfigStore()

        // 非响应式值
        layoutConfig.app.title = userConfig.app?.title ?? layoutConfig.app.title // 应用标题
        layoutConfig.app.logo = userConfig.app?.logo ?? layoutConfig.app.logo // 应用 Logo
        layoutConfig.app.overlayNavFromBreakpoint = userConfig.app?.overlayNavFromBreakpoint ?? layoutConfig.app.overlayNavFromBreakpoint // 导航变为覆盖模式的断点宽度
        layoutConfig.app.i18n.enable = userConfig.app?.i18n?.enable ?? layoutConfig.app.i18n.enable // 是否启用国际化支持
        layoutConfig.app.iconRenderer = userConfig.app?.iconRenderer ?? layoutConfig.app.iconRenderer // 图标渲染器
        layoutConfig.verticalNav.defaultNavItemIconProps = userConfig.verticalNav?.defaultNavItemIconProps ?? layoutConfig.verticalNav.defaultNavItemIconProps // 默认导航项图标属性
        layoutConfig.icons.chevronDown = userConfig.icons?.chevronDown ?? layoutConfig.icons.chevronDown // 下箭头图标
        layoutConfig.icons.chevronRight = userConfig.icons?.chevronRight ?? layoutConfig.icons.chevronRight // 右箭头图标
        layoutConfig.icons.close = userConfig.icons?.close ?? layoutConfig.icons.close // 关闭图标
        layoutConfig.icons.verticalNavPinned = userConfig.icons?.verticalNavPinned ?? layoutConfig.icons.verticalNavPinned // 垂直导航固定图标
        layoutConfig.icons.verticalNavUnPinned = userConfig.icons?.verticalNavUnPinned ?? layoutConfig.icons.verticalNavUnPinned // 垂直导航未固定图标
        layoutConfig.icons.sectionTitlePlaceholder = userConfig.icons?.sectionTitlePlaceholder ?? layoutConfig.icons.sectionTitlePlaceholder // 部分标题占位符图标

        // 响应式值（存储）
        configStore.$patch({
            appContentLayoutNav: cookieRef('appContentLayoutNav', userConfig.app?.contentLayoutNav ?? layoutConfig.app.contentLayoutNav).value, // 应用内容布局导航
            appContentWidth: cookieRef('appContentWidth', userConfig.app?.contentWidth ?? layoutConfig.app.contentWidth).value, // 应用内容宽度
            footerType: cookieRef('footerType', userConfig.footer?.type ?? layoutConfig.footer.type).value, // 底部类型
            navbarType: cookieRef('navbarType', userConfig.navbar?.type ?? layoutConfig.navbar.type).value, // 导航栏类型
            isNavbarBlurEnabled: cookieRef('isNavbarBlurEnabled', userConfig.navbar?.navbarBlur ?? layoutConfig.navbar.navbarBlur).value, // 导航栏模糊效果
            isVerticalNavCollapsed: cookieRef('isVerticalNavCollapsed', userConfig.verticalNav?.isVerticalNavCollapsed ?? layoutConfig.verticalNav.isVerticalNavCollapsed).value, // 垂直导航是否折叠

            // isAppRTL: userConfig.app?.isRTL ?? config.app.isRTL, // 是否启用右到左布局
            // isLessThanOverlayNavBreakpoint: false, // 是否小于覆盖导航断点
            horizontalNavType: cookieRef('horizontalNavType', userConfig.horizontalNav?.type ?? layoutConfig.horizontalNav.type).value, // 水平导航类型
        })

        // 设置文档方向属性
        _setDirAttr(configStore.isAppRTL ? 'rtl' : 'ltr')
    }
}
export * from './components'
export { layoutConfig }
