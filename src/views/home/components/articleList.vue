<template>
    <div>
        <article-item
            v-for="item in articles"
            :key="item.art_id"
            :article="item"
        ></article-item>
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
            articles: []
        }
    },
    methods: {
        async getFristArticle() {
            try {
                const { data } = await getArticles(this.id, +new Date())
                console.log(data)
                this.articles = data.data.results
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

<style></style>
