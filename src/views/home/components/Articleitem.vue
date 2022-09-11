<template>
    <div>
        <van-cell
            v-if="article.cover.type === 0"
            :title="article.title"
            :label="label"
            value="内容"
        ></van-cell>
        <van-cell
            v-else-if="article.cover.type === 1"
            :title="article.title"
            value="内容"
            :label="label"
        >
            <van-image
                width="100"
                height="100"
                :src="article.cover.images[0]"
            ></van-image>
        </van-cell>
        <!-- v-else-if="article.cover.type === 2" -->
        <van-cell v-else :title="article.title" value="内容">
            <template #lable>
                <van-image
                    v-for="(item, index) in article.cover.images"
                    :key="index"
                    width="100"
                    height="100"
                    :src="item"
                ></van-image>
                <p>{{ label }}</p>
            </template>
        </van-cell>
    </div>
</template>

<script>
export default {
    props: {
        article: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        label() {
            const { aut_name, comm_count, pubdate } = this.article
            return `${aut_name}${comm_count}评论${pubdate}`
        }
    }
}
</script>

<style></style>
