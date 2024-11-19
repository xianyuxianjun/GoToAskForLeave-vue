import { breakpointsVuetifyV3 } from '@vueuse/core'
import { VIcon } from 'vuetify/components/VIcon'
import { defineThemeConfig } from '@core'
import { Skins } from '@core/enums'
import VerticalNavHeaderArrow from '@images/svg/vertical-nav-header-arrow.svg'

// ❗ 必须使用 ?raw 后缀来导入Logo SVG，这样可以确保SVG内容作为字符串处理
import logo from '@images/logo.svg?raw'
import { AppContentLayoutNav, ContentWidth, FooterType, NavbarType } from '@layouts/enums'

export const { themeConfig, layoutConfig } = defineThemeConfig({
    app: {
        title: '想要去请假', // 应用标题

        // ❗ 如果您有SVG Logo，并希望其颜色根据主题颜色变化，则需要应用颜色样式为 `color: rgb(var(--v-global-theme-primary))`
        logo: h('div', { innerHTML: logo, style: 'line-height:0; color: rgb(var(--v-global-theme-primary))' }), // 设置Logo并使其颜色适应主题颜色
        contentWidth: ContentWidth.Boxed, // 内容宽度设置为Boxed（固定宽度）
        contentLayoutNav: AppContentLayoutNav.Vertical, // 内容布局导航设置为垂直
        overlayNavFromBreakpoint: breakpointsVuetifyV3.lg - 1, // 从lg断点开始覆盖导航。-1是为了与vuetify断点匹配。文档：https://next.vuetifyjs.com/en/features/display-and-platform/
        i18n: {
            enable: false, // 是否启用国际化
            defaultLocale: 'en', // 默认语言
            langConfig: [ // 语言配置列表
                {
                    label: 'English', // 英文标签
                    i18nLang: 'en', // 国际化语言标识符
                    isRTL: false, // 是否从右向左显示
                },
                {
                    label: 'French', // 法语标签
                    i18nLang: 'fr', // 国际化语言标识符
                    isRTL: false, // 是否从右向左显示
                },
                {
                    label: 'Arabic', // 阿拉伯语标签
                    i18nLang: 'ar', // 国际化语言标识符
                    isRTL: true, // 是否从右向左显示
                },
            ],
        },
        theme: 'system', // 主题设置为系统默认
        skin: Skins.Default, // 皮肤设置为默认
        iconRenderer: VIcon, // 图标渲染器设置为Vuetify的VIcon组件
    },
    navbar: {
        type: NavbarType.Sticky, // 导航栏类型设置为粘性（即滚动时固定在顶部）
        navbarBlur: true, // 导航栏是否启用模糊效果
    },
    footer: { type: FooterType.Static }, // 页脚类型设置为静态
    verticalNav: {
        isVerticalNavCollapsed: false, // 垂直导航是否折叠
        defaultNavItemIconProps: { icon: 'ri-circle-fill' }, // 默认导航项图标属性
        isVerticalNavSemiDark: false, // 垂直导航是否半暗
    },
    horizontalNav: {
        type: 'sticky', // 水平导航类型设置为粘性
        transition: 'slide-y-reverse-transition', // 水平导航过渡动画
        popoverOffset: 4, // 弹出框偏移量
    },

    /*
      // ℹ️ 在下面的图标部分，您可以为每个组件指定图标。同时，您还可以为每个图标使用v-icon组件的其他属性，如`color`和`size`。
      // 例如：chevronDown: { icon: 'ri-arrow-down-s-line', color:'primary', size: '24' },
      */
    icons: {
        chevronDown: { icon: 'ri-arrow-down-s-line' }, // 下箭头图标
        chevronRight: { icon: 'ri-arrow-right-s-line' }, // 右箭头图标
        close: { icon: 'ri-close-line' }, // 关闭图标
        verticalNavPinned: { icon: h(VerticalNavHeaderArrow) }, // 垂直导航固定时的图标
        verticalNavUnPinned: { icon: h(VerticalNavHeaderArrow) }, // 垂直导航未固定时的图标
        sectionTitlePlaceholder: { icon: 'ri-subtract-line' }, // 分区标题占位符图标
    },
})
