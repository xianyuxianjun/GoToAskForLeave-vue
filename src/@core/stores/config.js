import { storeToRefs } from 'pinia'
import { useTheme } from 'vuetify'
import { cookieRef, useLayoutConfigStore } from '@layouts/stores/config'
import { themeConfig } from '@themeConfig'

// 配置存储模块
export const useConfigStore = defineStore('config', () => {
    // 主题设置
    const userPreferredColorScheme = usePreferredColorScheme()
    const cookieColorScheme = cookieRef('color-scheme', 'light')

    watch(userPreferredColorScheme, val => {
        if (val !== 'no-preference')
            cookieColorScheme.value = val
    }, { immediate: true })

    const theme = cookieRef('theme', themeConfig.app.theme)

    // 是否启用垂直导航栏半暗模式
    const isVerticalNavSemiDark = cookieRef('isVerticalNavSemiDark', themeConfig.verticalNav.isVerticalNavSemiDark)

    // 皮肤设置
    const skin = cookieRef('skin', themeConfig.app.skin)

    // 我们需要使用 `storeToRefs` 来转发状态
    const { isLessThanOverlayNavBreakpoint, appContentWidth, navbarType, isNavbarBlurEnabled, appContentLayoutNav, isVerticalNavCollapsed, footerType, isAppRTL } = storeToRefs(useLayoutConfigStore())

    return {
        theme,
        isVerticalNavSemiDark,
        skin,

        // @layouts 导出项
        isLessThanOverlayNavBreakpoint,
        appContentWidth,
        navbarType,
        isNavbarBlurEnabled,
        appContentLayoutNav,
        isVerticalNavCollapsed,
        footerType,
        isAppRTL,
    }
})
// 初始化配置存储模块
export const initConfigStore = () => {
    const userPreferredColorScheme = usePreferredColorScheme()
    const vuetifyTheme = useTheme()
    const configStore = useConfigStore()

    watch([() => configStore.theme, userPreferredColorScheme], () => {
        vuetifyTheme.global.name.value = configStore.theme === 'system'
            ? userPreferredColorScheme.value === 'dark'
                ? 'dark'
                : 'light'
            : configStore.theme
    })
    onMounted(() => {
        if (configStore.theme === 'system')
            vuetifyTheme.global.name.value = userPreferredColorScheme.value
    })
}
