<template>
    <div>
        <van-cell
            icon="search"
            v-for="(item, index) in suggestion"
            :key="index"
            @click="$emit('change-keywords', suggestions[index])"
        >
            <template #title>
                <span>{{ item }}</span>
            </template>
        </van-cell>
    </div>
</template>

<script>
import { getSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
    props: {
        keywords: {
            tupe: String,
            required: true
        }
    },
    data() {
        return {
            suggestion: []
        }
    },
    watch: {
        keywords: {
            immediate: true,
            handler: 'getSuggestions'
        }
    },
    methods: {
        getSuggestions: debounce(async function () {
            try {
                const { data } = await getSuggestionsAPI(this.keywords)
                this.suggestion = data.data.options.filter(Boolean) // 直接过滤假值 console.log(data)
            } catch (e) {
                if (e.response) {
                    this.$toast.fail('获取列表失败')
                } else {
                    throw e
                }
            }
        }, 300)
    },
    computed: {
        higthLight() {
            const reg = new RegExp(this.keywords, 'ig')
            return this.suggestion.map((str) => {
                return str.replace(
                    reg,
                    (match) => `<span style="color:red">${match}</span>`
                )
            })
        }
    }
}
</script>

<style></style>
