/**
 * 匹配手机号
 * @param value
 * @returns {boolean}
 */
export const isPhone = (value) => {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
        value
    );
};

/**
 * 匹配身份证
 * @param value
 * @returns {boolean}
 */
export function checkIdCard(value) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
        value
    );
}

/**
 * 匹配邮箱
 * @param value
 * @returns {boolean}
 */
export function isEmail(value) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);
}

/**
 * 匹配英文和数字
 * @param value
 * @returns {boolean}
 */
export function checkEnglishAndNumber(value) {
    return /^[a-z0-9]+$/i.test(value);
}

/**
 * 匹配英文、数字、下划线
 * @param value
 * @returns {boolean}
 */
export function checkEnglishAndNumber_(value) {
    return /^\w+$/.test(value);
}

/**
 * 匹配中文
 * @param value
 * @returns {boolean}
 */
export function checkChinese(value) {
    return /[\u4e00-\u9fa5]/gm.test(value);
}

/**
 * 匹配数字
 * @param value
 * @returns {boolean}
 */
export function checkNumber(value) {
    return /^\d+$/.test(value);
}

/**
 *  匹配非法字符
 * @param value
 * @returns {boolean}
 */
export function hasIllegalChar(value) {
    return /[`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/im.test(value);
}
