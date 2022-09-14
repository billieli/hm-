<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <!-- 搜索框 -->
        <van-nav-bar class="navbar">
            <template #title>
                <van-button icon="search" size="small" round block
                    >搜索</van-button
                >
            </template>
        </van-nav-bar>

        <!-- 文章展示 -->

        <van-tabs v-model="active" swipeable>
            <van-tab v-for="item in channels" :key="item.id" :title="item.name">
                <article-list :id="item.id" class="article"></article-list>
            </van-tab>

            <span class="toutiao toutiao-gengduo" @click="isShow = true">
            </span>
        </van-tabs>
        <van-popup
            v-model="isShow"
            position="bottom"
            closeable
            close-icon-position="top-left"
            :style="{ height: '100%' }"
        >
            <channel-edit
                v-if="isShow"
                @change-active=";[(isShow = false), (active = $event)]"
                :myChannels="channels"
                @del-channel="delChannel"
                @add-channel="addChannel"
            ></channel-edit>
        </van-popup>
    </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, addCHannelsAPI } from '@/api'
import ChannelEdit from './components/ChannelEdit.vue'
import ArticleList from './components/articleList.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return { active: 0, channels: [], isShow: false }
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    methods: {
        ...mapMutations(['SET_MY_CHANNELS']),
        initChannles() {
            if (this.isLogin) {
                this.getChannel()
            } else {
                const myChannels = this.$store.state.myChannels
                if (myChannels.length === 0) {
                    this.getChannel()
                } else {
                    this.channels = myChannels
                }
            }
        },

        async getChannel() {
            try {
                const { data } = await getChannelAPI()
                this.channels = data.data.channels
                // console.log(data)
                // console.log(this.channels)
            } catch (err) {
                // ？？=>相当于||
                // ？.  ==>可选链操作符，？前是undifined,那就不会向后取值(err.response?.status)
                if (!err.response) {
                    throw err
                } else {
                    const status = err.response.status
                    status === 507 && this.$toast.fail('服务器异常')
                }
            }
        },
        async delChannel(id) {
            const newChannels = this.channels.filter((item) => item.id !== id)
            try {
                if (this.isLogin) {
                    await delChannelAPI(id)
                } else {
                    this.SET_MY_CHANNELS(newChannels)
                }
                this.channels = newChannels
                this.$toast.success('删除频道成功')
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.$toast.fail('请登录再删除')
                } else {
                    throw error
                }
            }
        },
        async addChannel(item) {
            try {
                if (this.isLogin) {
                    await addCHannelsAPI(item.id, this.channels.length)
                } else {
                    this.SET_MY_CHANNELS([...this.channels, item])
                }
                this.channels.push(item)
                this.$toast.success('添加成功')
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.$toast.fail('请先登录')
                } else {
                    throw error
                }
            }
        }
    },
    created() {
        this.initChannles()
    },
    components: {
        ArticleList,
        ChannelEdit
    }
}
</script>

<style scoped lang="less">
.navbar {
    background-color: #3296fa; // inherit 继承 // unset 不设置
    :deep(.van-nav-bar__title) {
        max-width: unset;
    }
    .van-button--default {
        background-color: #5babfb;
        border: 0;
        color: #fff;
        font-size: 30px;
    }
    .van-icon {
        color: #fff;
    }
    .van-button--block {
        width: 7.4rem;
    }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
    padding-right: 66px;
    .van-tabs__nav {
        padding-left: 0;
        padding-right: 0; /* tab标签 */
        .van-tab {
            border: 1px solid #eee;
            width: 200px;
            height: 82px;
        } /* tab标签下划线 */
        .van-tabs__line {
            width: 31px;
            height: 6px;
            background-color: #3296fa;
            bottom: 40px;
        }
    }
} /* 字体图标 */
.toutiao-gengduo {
    position: absolute;
    top: 0;
    right: 0;
    width: 66px;
    height: 82px;
    font-size: 40px;
    line-height: 82px;
    text-align: center;
    opacity: 0.6;
    border-bottom: 1px solid #eee;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 70%;
        width: 1px;
        background-image: url('~@/assets/images/gradient-gray-line.png');
    }
}
.article {
    // 如何给盒子拥有自己的滚动条
    // - 1.定高 2.overflow:auto/scroll/overlay

    height: calc(100vh - 46px - 40px - 50px);
    overflow: auto;
    // &: 代表当前元素他爹 // ::-webkit-scrollbar : 滚动槽
    //::-webkit-scrollbar-thumb: 滚动的滑块

    &::-webkit-scrollbar {
        width: 10px;
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #3296fa;
        border-radius: 10px;
    }
}
</style>
