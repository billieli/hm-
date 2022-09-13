import request from '@/utils/request'
/**
 * 获取自己的频道
 * @returns promise
 */
export const getChannelAPI = () => {
    return request({
        url: '/v1_0/user/channels'
    })
}
export const getAllChannelAPI = () => {
    return request({
        url: '/v1_0/channels'
    })
}
