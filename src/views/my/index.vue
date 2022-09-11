<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="box">
        <header>
            <div class="login banner" v-if="isLogin">
                <van-row> 1</van-row>
                <van-row>
                    <van-col span="12">
                        <van-row
                            type="flex"
                            justify="space-around"
                            align="center"
                        >
                            <van-image
                                round
                                width="1.5rem"
                                height="1.5rem"
                                :src="userInfo.photo"
                            />
                            <span class="mobile">{{ userInfo.name }}</span>
                        </van-row>
                    </van-col>
                    <van-col span="7"></van-col>
                    <van-col span="5">
                        <van-row
                            type="flex"
                            justify="center"
                            align="center"
                            style=" height=100%"
                        >
                            <van-button size="mini" round class="edit-btn"
                                >点击编辑</van-button
                            >
                        </van-row>
                    </van-col>
                </van-row>
                <van-row>
                    <van-grid class="grid" :border="false">
                        <van-grid-item text="文字">
                            <template #icon>{{ userInfo.art_count }}</template>
                        </van-grid-item>
                        <van-grid-item text="文字">
                            <template #icon>
                                {{ userInfo.fans_count }}</template
                            >
                        </van-grid-item>
                        <van-grid-item text="文字">
                            <template #icon
                                >{{ userInfo.follow_count }}
                            </template>
                        </van-grid-item>
                        <van-grid-item text="文字">
                            <template #icon
                                >{{ userInfo.like_count }}
                            </template>
                        </van-grid-item>
                    </van-grid>
                </van-row>
            </div>
            <div class="logout banner" v-else @click="$router.push('/login')">
                <img
                    src="../../assets/images/mobile.png"
                    class="ban-img"
                    alt=""
                />
                <span class="text">登录/ 注册</span>
            </div>
        </header>
        <main>
            <van-grid column-num="2" clickable>
                <van-grid-item text="收藏">
                    <template #icon>
                        <span class="toutiao toutiao-shoucang"> </span>
                    </template>
                </van-grid-item>
                <van-grid-item text="历史">
                    <template #icon>
                        <span class="toutiao toutiao-shoucang"> </span>
                    </template>
                </van-grid-item>
            </van-grid>
            <div class="link">
                <van-cell title="消息通知" is-link></van-cell>
                <van-cell title="小智同学" is-link></van-cell>
            </div>
        </main>
        <footer>
            <van-button block v-if="isLogin" @click="logout">退出</van-button>
        </footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserInfo } from '@/api'
export default {
    data() {
        return {
            userInfo: {}
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    methods: {
        logout() {
            this.$dialog
                .confirm({ title: '黑马头条', message: '确认退出？' })
                .then(() => {
                    this.$store.commit('SET_TOKEN', {})
                })
        },
        async getUserInfo() {
            try {
                if (!this.isLogin) return
                const { data } = await getUserInfo()
                console.log(data)
                this.userInfo = data.data
            } catch (e) {
                if (e.response && e.response.status === 401) {
                    this.$toast.fail('认证失败，请重新登录')
                } else {
                    throw e
                }
            }
        }
    },
    created() {
        this.getUserInfo()
    }
}
</script>

<style scoped lang="less">
.box {
    height: 100vh;
    background-color: #f5f7f9;
    .link {
        .van-cell {
            margin: 6px;
        }
    }
    .toutiao {
        font-size: 40px;
    }
    .toutiao-shoucang {
        color: red;
    }
    footer {
        .van-button {
            color: red;
        }
    }
}
.banner {
    height: 5.333333rem;
    width: 100%;
    background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.logout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .ban-img {
        width: 1.76rem;
        height: 1.76rem;
    }
    .text {
        font-size: 0.7rem;
        margin-top: 0.3rem;
    }
}
.login {
    display: flex;
    flex-direction: column;
    > .van-row {
        flex: 1;
    }
}
.mobile {
    font-size: 30px;
    color: white;
}
.van-col {
    height: 100%;
    // line-height: 100%;
}
.edit-btn {
    margin-top: 0.5rem;
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
}
:deep(.grid) {
    color: white;

    .van-grid-item__content {
        font-size: 30px;
        background-color: inherit;
        .van-grid-item__text {
            color: white;
        }
    }
}
</style>
