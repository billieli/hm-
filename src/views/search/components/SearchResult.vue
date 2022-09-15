<template>
    <div class="result">
        <van-list
            v-model="loading"
            @load="getResults"
            :finished="finished"
            finished-text="没有更多啦"
            :error.sync="error"
            error-text="请求失败，请重新加载"
        >
            <van-cell
                v-for="item in results"
                :key="item.art_id"
                :title="item.title"
                @click="
                    $router.push({
                        path: '/detail',
                        query: {
                            articleId: item.art_id
                        }
                    })
                "
            />
        </van-list>
    </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
    props: {
        keywords: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            page: 1,
            perpage: 10,
            finished: false,
            results: [],
            error: false
        }
    },

    methods: {
        async getResults() {
            // const { data } = await getResultsAPI(
            //     this.page++,
            //     this.perpage,
            //     this.keywords
            // )
            // console.log(data)
            try {
                // if (Math.random() < 0.5) {
                //     throw new Error()
                // }
                const { data } = await getResultsAPI(
                    this.page++,
                    this.perpage,
                    this.keywords
                )

                if (data.data.results.length === 0) {
                    this.finished = true
                } // 保存数据(两个数组展开放进去)
                this.results = [...this.results, ...data.data.results]
                this.results.push(...data.data.options)
            } catch {
                this.error = true
            } finally {
                this.loading = false
            }
        }
    },
    created() {
        this.getResults()
    }
}
</script>

<style scoped lang="less">
.result {
    height: calc(100vh-54px);
    overflow: auto;
}
</style>
