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
/**
 * 获取所有频道
 * @returns 所有频道    id 当前id
 */
export const getAllChannelAPI = () => {
    return request({
        url: '/v1_0/channels'
    })
}
/**
 * 删除的接口
 * @param {id} id
 * @returns
 */
export const delChannelAPI = (id) => {
    return request({
        url: `/v1_0/user/channels/${id}`,
        method: 'DELETE'
    })
}
/**
 *返回添加后的我的列表
 * @param {id} id
 * @param {添加的位置} seq
 * @returns
 */
export const addCHannelsAPI = (id, seq) => {
    return request({
        url: '/v1_0/user/channels',
        method: 'PATCH',
        data: {
            channels: [{ id, seq }]
        }
    })
}
