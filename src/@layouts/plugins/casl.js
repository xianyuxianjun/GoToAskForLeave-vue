import { useAbility } from '@casl/vue'

/**
 * 如果配置了 ACL，则返回权限检查结果，否则直接返回 true
 * 我们应该允许传递字符串或 undefined 给 can，因为在管理员权限中我们省略了定义动作和对象
 *
 * 如果不确定是否配置了 ACL，这个函数很有用
 * 在 @core 文件中用于处理没有 ACL 时不会报错
 *
 * @param {string} action CASL 动作 // https://casl.js.org/v4/en/guide/intro#basics
 * @param {string} subject CASL 对象 // https://casl.js.org/v4/en/guide/intro#basics
 */
export const can = (action, subject) => {
    const vm = getCurrentInstance()
    if (!vm)
        return false
    const localCan = vm.proxy && '$can' in vm.proxy

    return localCan ? vm.proxy?.$can(action, subject) : true
}

/**
 * 检查用户是否有权限查看导航菜单项
 * 根据项的动作和对象来判断，并且如果所有子项都隐藏则隐藏组
 * @param {object} item 导航对象项
 */
export const canViewNavMenuGroup = item => {
    const hasAnyVisibleChild = item.children.some(i => can(i.action, i.subject))

    // 如果项中定义了对象和动作，则根据子项的可见性返回结果（如果没有可见的子项则隐藏组）
    // 否则使用提供的对象和动作进行权限检查，并检查是否有任何可见的子项
    if (!(item.action && item.subject))
        return hasAnyVisibleChild

    return can(item.action, item.subject) && hasAnyVisibleChild
}

/**
 * 检查用户是否有权限导航到目标路由
 * @param {object} to 目标路由
 */
export const canNavigate = to => {
    const ability = useAbility()

    return to.matched.some(route => ability.can(route.meta.action, route.meta.subject))
}
