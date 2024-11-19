import { useStorage } from '@vueuse/core'
import { useTheme } from 'vuetify'
import { useConfigStore } from '@core/stores/config'
import { cookieRef, namespaceConfig } from '@layouts/stores/config'
import { themeConfig } from '@themeConfig'

const _syncAppRtl = () => {
    const configStore = useConfigStore()
    const storedLang = cookieRef('language', null)
    const { locale } = useI18n({ useScope: 'global' })

    // TODO: 处理 i18n 无法读取持久化值的情况
    if (locale.value !== storedLang.value && storedLang.value)
        locale.value = storedLang.value

    // 监听语言变化并更新 HTML 标签的 lang 属性
    watch(locale, val => {
        // 更新 HTML 标签的 lang 属性
        if (typeof document !== 'undefined')
            document.documentElement.setAttribute('lang', val)

        // 将选择的语言存储在 cookie 中
        storedLang.value = val

        // 根据选择的语言设置 isAppRTL 值
        if (themeConfig.app.i18n.langConfig && themeConfig.app.i18n.langConfig.length) {
            themeConfig.app.i18n.langConfig.forEach(lang => {
                if (lang.i18nLang === storedLang.value)
                    configStore.isAppRTL = lang.isRTL
            })
        }
    }, { immediate: true })
}

const _handleSkinChanges = () => {
    const { themes } = useTheme()
    const configStore = useConfigStore()

    // 创建默认皮肤颜色，以便在从边框皮肤切换回默认皮肤时可以恢复原始（默认皮肤）颜色
    Object.values(themes.value).forEach(t => {
        t.colors['skin-default-background'] = t.colors.background
        t.colors['skin-default-surface'] = t.colors.surface
    })
    watch(() => configStore.skin, val => {
        Object.values(themes.value).forEach(t => {
            t.colors.background = t.colors[`skin-${val}-background`]
            t.colors.surface = t.colors[`skin-${val}-surface`]
        })
    }, { immediate: true })
}

/*
    ℹ️ 在 localStorage 中设置当前主题的表面颜色

    为什么？因为在初始加载器显示时（Vue 尚未准备好），我们需要知道当前主题的表面颜色。
    我们将使用存储在 localStorage 中的颜色来设置初始加载器的背景颜色。

    这样即使在 Vue 识别当前主题之前，我们也能显示正确的初始加载器背景颜色。
*/
const _syncInitialLoaderTheme = () => {
    const vuetifyTheme = useTheme()

    watch(() => useConfigStore().theme, () => {
        // ℹ️ 我们没有使用 theme.current.colors.surface，因为监听器是独立的，当此监听器运行时 `theme` 计算属性尚未更新
        useStorage(namespaceConfig('initial-loader-bg'), null).value = vuetifyTheme.current.value.colors.surface
        useStorage(namespaceConfig('initial-loader-color'), null).value = vuetifyTheme.current.value.colors.primary
    }, { immediate: true })
}

const initCore = () => {
    _syncInitialLoaderTheme()
    _handleSkinChanges()

    // ℹ️ 我们不想在 SK 中触发 i18n
    if (themeConfig.app.i18n.enable)
        _syncAppRtl()
}

export default initCore
