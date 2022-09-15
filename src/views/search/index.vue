<template>
    <div>
        <form action="/">
            <van-search
                class="search"
                v-model="keywords"
                background="#3296fa"
                placeholder="请输入搜索关键词"
                show-action
                @search="onSearch"
                @focus="isShowSearchResult = false"
                @cancel="$router.push('/')"
            />
        </form>
        <component
            :is="componentzName"
            :keywords="keywords"
            @change-keywords="onSearch"
        ></component>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'

export default {
    data() {
        return {
            keywords: '',
            isShowSearchResult: false
        }
    },
    components: {
        SearchHistory,
        SearchSuggestion,
        SearchResult
    },
    computed: {
        ...mapState(['histories']),
        componentzName() {
            if (this.keywords === '') {
                return 'SearchHistory'
            }
            if (this.isShowSearchResult) {
                return 'SearchResult'
            }
            return 'SearchSuggestion'
        }
    },
    methods: {
        ...mapMutations(['SET_HISTORISE']),
        onSearch(keywords) {
            const distinctHistories = [
                ...new Set([keywords, ...this.histories])
            ]
            this.SET_HISTORISE(distinctHistories)
            this.keywords = keywords
            this.isShowSearchResult = true
        }
    }
}
</script>

<style scoped lang="less">
.search {
    [role='button'] {
        //属性选择器
        color: white;
    }
}
</style>
