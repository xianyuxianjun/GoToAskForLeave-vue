/* eslint-disable regex/invalid */
import checkboxChecked from '@images/svg/checkbox-checked.svg'
import checkboxIndeterminate from '@images/svg/checkbox-indeterminate.svg'
import checkboxUnchecked from '@images/svg/checkbox-unchecked.svg'
import radioChecked from '@images/svg/radio-checked.svg'
import radioUnchecked from '@images/svg/radio-unchecked.svg'

// 自定义图标映射
const customIcons = {
    'mdi-checkbox-blank-outline': checkboxUnchecked, // 未选中的复选框
    'mdi-checkbox-marked': checkboxChecked, // 选中的复选框
    'mdi-minus-box': checkboxIndeterminate, // 不确定状态的复选框
    'mdi-radiobox-marked': radioChecked, // 选中的单选框
    'mdi-radiobox-blank': radioUnchecked, // 未选中的单选框
}

// 图标别名映射
const aliases = {
    info: 'ri-error-warning-line', // 信息图标
    success: 'ri-checkbox-circle-line', // 成功图标
    warning: 'ri-alert-line', // 警告图标
    error: 'ri-error-warning-line', // 错误图标
    calendar: 'ri-calendar-2-line', // 日历图标
    collapse: 'ri-arrow-up-s-line', // 折叠图标
    complete: 'ri-check-line', // 完成图标
    cancel: 'ri-close-line', // 取消图标
    close: 'ri-close-line', // 关闭图标
    delete: 'ri-close-circle-fill', // 删除图标
    clear: 'ri-close-line', // 清除图标
    prev: 'ri-arrow-left-s-line', // 上一个图标
    next: 'ri-arrow-right-s-line', // 下一个图标
    delimiter: 'ri-circle-line', // 分隔符图标
    sort: 'ri-arrow-up-line', // 排序图标
    expand: 'ri-arrow-down-s-line', // 展开图标
    menu: 'ri-menu-line', // 菜单图标
    subgroup: 'ri-arrow-down-s-fill', // 子组图标
    dropdown: 'ri-arrow-down-s-line', // 下拉菜单图标
    edit: 'ri-pencil-line', // 编辑图标
    ratingEmpty: 'ri-star-line', // 未评分星形图标
    ratingFull: 'ri-star-fill', // 满分星形图标
    ratingHalf: 'ri-star-half-line', // 半分星形图标
    loading: 'ri-refresh-line', // 加载图标
    first: 'ri-skip-back-mini-line', // 第一页图标
    last: 'ri-skip-forward-mini-line', // 最后一页图标
    unfold: 'ri-split-cells-vertical', // 展开图标
    file: 'ri-attachment-2', // 文件附件图标
    plus: 'ri-add-line', // 添加图标
    minus: 'ri-subtract-line', // 减少图标
    sortAsc: 'ri-arrow-up-line', // 升序排序图标
    sortDesc: 'ri-arrow-down-line', // 降序排序图标
}

/* eslint-enable */

// 图标组件工厂函数
export const iconify = {
    component: props => {
        // 直接加载自定义 SVG 图标，而不是通过图标组件加载
        if (typeof props.icon === 'string') {
            const iconComponent = customIcons[props.icon]
            if (iconComponent)
                return h(iconComponent)
        }

        return h(props.tag, {
            ...props,

            // 由于我们使用的是基于类的图标
            class: [props.icon],

            // 移除已使用的属性，避免在 DOM 渲染中出现
            tag: undefined,
            icon: undefined,
        })
    },
}

// 图标配置对象
export const icons = {
    defaultSet: 'iconify', // 默认图标集
    aliases, // 图标别名映射
    sets: {
        iconify, // 图标集
    },
}
