import { deepMerge } from '@antfu/utils'
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import defaults from './defaults'
import { icons } from './icons'
import { staticPrimaryColor, staticPrimaryDarkenColor, themes } from './theme'
import { themeConfig } from '@themeConfig'

// 样式
import { cookieRef } from '@/@layouts/stores/config'
import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'

export default function (app) {
    // 从 cookie 中读取主题值
    const cookieThemeValues = {
        defaultTheme: resolveVuetifyTheme(themeConfig.app.theme), // 解析默认主题
        themes: {
            light: {
                colors: {
                    'primary': cookieRef('lightThemePrimaryColor', staticPrimaryColor).value, // 光主题的主要颜色
                    'primary-darken-1': cookieRef('lightThemePrimaryDarkenColor', staticPrimaryDarkenColor).value, // 光主题的主要深色
                },
            },
            dark: {
                colors: {
                    'primary': cookieRef('darkThemePrimaryColor', staticPrimaryColor).value, // 暗主题的主要颜色
                    'primary-darken-1': cookieRef('darkThemePrimaryDarkenColor', staticPrimaryDarkenColor).value, // 暗主题的主要深色
                },
            },
        },
    }

    // 合并主题配置
    const optionTheme = deepMerge({ themes }, cookieThemeValues)

    // 创建 Vuetify 实例
    const vuetify = createVuetify({
        aliases: {
            IconBtn: VBtn, // 别名配置，将 IconBtn 映射到 VBtn
        },
        defaults, // 默认配置
        icons, // 图标配置
        theme: optionTheme, // 主题配置
    })

    // 注册 Vuetify 实例到应用
    app.use(vuetify)
}
