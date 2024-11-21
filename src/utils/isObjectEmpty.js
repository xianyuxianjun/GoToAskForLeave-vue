export const  isObjectEmpty =(obj)=> {
    // 解包 ref 对象
    const unwrappedObj = unref(obj);

    // 检查是否是对象
    if (typeof unwrappedObj !== 'object' || unwrappedObj === null) {
        return false;
    }

    // 遍历对象的所有属性
    for (let key in unwrappedObj) {
        if (unwrappedObj.hasOwnProperty(key)) {
            let value = unwrappedObj[key];

            // 检查属性值是否为空
            if (value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
                return false;
            }
        }
    }

    return true;
}
