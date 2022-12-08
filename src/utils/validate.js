export function validMobile(rule, value, callback) {
    ;/^1[3-9]\d{9}$/.test(value)
      ? callback()
      : callback(new Error('手机号格式不正确'))
  }
  