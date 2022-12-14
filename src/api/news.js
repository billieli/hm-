import request from '@/utils/request'
/**
 *获取文章
 * @param {string|number} id 频道id
 * @param {number} times 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 * @returns
 */
export const getArticles = (id, times) => {
    return request({
        url: '/v1_0/articles',
        params: {
            channel_id: id,
            timestamp: times
        }
    })
}
