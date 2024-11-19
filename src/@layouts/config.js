import { AppContentLayoutNav, ContentWidth, FooterType, HorizontalNavType, NavbarType } from '@layouts/enums'

export const layoutConfig = {
    app: {
        title: 'my-layout', // 应用标题
        logo: h('img', { src: '/src/assets/logo.svg' }), // 应用 Logo
        contentWidth: ContentWidth.Boxed, // 内容宽度：固定宽度
        contentLayoutNav: AppContentLayoutNav.Vertical, // 内容布局导航：垂直导航
        overlayNavFromBreakpoint: 1279, // 导航变为覆盖模式的断点宽度

        // isRTL: false, // 是否启用右到左布局
        i18n: {
            enable: true, // 是否启用国际化支持
        },
        iconRenderer: h('div'), // 图标渲染器
    },
    navbar: {
        type: NavbarType.Sticky, // 导航栏类型：固定
        navbarBlur: true, // 导航栏是否启用模糊效果
    },
    footer: {
        type: FooterType.Static, // 底部类型：静态
    },
    verticalNav: {
        isVerticalNavCollapsed: false, // 垂直导航是否折叠
        defaultNavItemIconProps: { icon: 'ri-circle-line' }, // 默认导航项图标属性
    },
    horizontalNav: {
        type: HorizontalNavType.Sticky, // 水平导航类型：固定
        transition: 'none', // 导航过渡效果
        popoverOffset: 0, // 弹出菜单偏移量
    },
    icons: {
        chevronDown: { icon: 'ri-arrow-down-line' }, // 下箭头图标
        chevronRight: { icon: 'ri-arrow-right-line' }, // 右箭头图标
        close: { icon: 'ri-close-line' }, // 关闭图标
        verticalNavPinned: { icon: 'ri-record-circle-line' }, // 垂直导航固定图标
        verticalNavUnPinned: { icon: 'ri-circle-line' }, // 垂直导航未固定图标
        sectionTitlePlaceholder: { icon: 'ri-subtract-line' }, // 部分标题占位符图标
    },
}
