import request from '@/utils/request'
// import store from '@/store/index'
/**
 *
 * @param {String} mobile  手机号
 * @param {Number} code  验证码
 * @returns  promise
 */
export const login = (mobile, code) => {
    return request({
        url: '/v1_0/authorizations',
        method: 'POST',
        data: {
            mobile,
            code
        }
    })
}
export const sendCodeApi = (mobile) => {
    return request({
        url: ` /v1_0/sms/codes/${mobile}`
    })
}
export const getUserInfo = () => {
    return request({
        url: '/v1_0/user'
        // headers: {
        //     Authorization: `Bearer ${store.state.tokenObj.token}`
        // }
    })
}
