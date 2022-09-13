<template>
    <div>
        <van-pull-refresh
            v-model="refreshLoading"
            success-text="刷新成功"
            @refresh="getNextPage"
        >
            <van-list
                v-model="loading"
                offset="100"
                @load="getNextPage"
                :immediate-check="false"
                :finished="finished"
                :err.sync="error"
                error-text="出错啦，请刷新"
                finished-text="没有更多了"
            >
                <article-item
            
                    v-for="item in articles"
                    :key="item.art_id"
                    :article="item"
                ></article-item>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from './Articleitem.vue'
export default {
    name: 'ArticleList',
    props: {
        id: [String, Number]
    },
    data() {
        return {
            articles: [],
            preTimestamp: '',
            loading: false,
            finished: false,
            refreshLoading: false,
            error: false
        }
    },
    methods: {
        async getFristArticle() {
            try {
                const { data } = await getArticles(this.id, +new Date())
                // console.log(data)
                this.articles = data.data.results
                this.preTimestamp = data.data.pre_timestamp
            } catch (e) {
                const status = e.response?.status
                if (!e.response || status === 507) {
                    throw e
                } else {
                    if (status === 400) {
                        throw new Error(e.response.data.message)
                    }
                }
            }
        },
        async getNextPage() {
            try {
                const { data } = await getArticles(this.id, this.preTimestamp)
                if (!data.data.pre_timestamp) {
                    this.finished = true
                }
                if (this.refreshLoading) {
                    this.articles.unshift(...data.data.results)
                } else {
                    this.articles.push(...data.data.results)
                }

                this.preTimestamp = data.data.pre_timestamp
            } catch (error) {
                this.error = true
            } finally {
                this.loading = false
                this.refreshLoading = false
            }
        }
    },
    components: {
        ArticleItem
    },
    created() {
        this.getFristArticle()
    }
}
</script>

<style scoped lang="less">
// 如何给盒子拥有自己的滚动条
// - 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
