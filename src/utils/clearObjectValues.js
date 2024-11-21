export const clearObjectValues = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) { // 确保属性属于该对象自身而不是原型链上的属性
            obj[key] = ''; // 将属性值设置为空字符串
        }
    }
}
