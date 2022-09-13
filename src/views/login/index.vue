<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <!-- 头部导航 -->
        <van-nav-bar title="登录" class="nav-bar" />

        <!-- 表单组件 -->
        <van-form @submit="onSubmit" class="form" ref="from">
            <van-field
                v-model="mobile"
                name="mobile"
                placeholder="请输入手机号"
                :rules="mobileRule"
            >
                <template #label>
                    <span class="toutiao toutiao-shouji"></span>
                </template>
            </van-field>
            <van-field
                v-model="code"
                name="code"
                placeholder="请输入验证码"
                :rules="codeRule"
            >
                <template #label>
                    <span class="toutiao toutiao-yanzhengma"></span>
                </template>
                <template #button>
                    <van-button
                        type="default"
                        size="small"
                        round
                        native-type="button"
                        class="btn"
                        v-if="isShowBtn"
                        @click="sendCode"
                        >获取验证码</van-button
                    >
                    <van-count-down
                        :time="6 * 10000"
                        v-else
                        format="ss秒"
                        @finish="isShowBtn = true"
                    />
                </template>
            </van-field>
            <div style="margin: 16px">
                <van-button block type="info" native-type="submit"
                    >登录</van-button
                >
            </div>
        </van-form>
    </div>
</template>

<script>
import { mobileRule, codeRule } from './rule'
import { login, sendCodeApi } from '@/api'
import { mapMutations } from 'vuex'
export default {
    data() {
        return { mobile: '', code: '', mobileRule, codeRule, isShowBtn: true }
    },
    methods: {
        ...mapMutations(['SET_TOKEN']),
        loading() {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            })
        },
        async onSubmit() {
            this.loading()
            try {
                const { data } = await login(this.mobile, this.code)
                this.SET_TOKEN(data.data)
                this.$toast.success('登录成功')
                this.$router.push('/profile')
                // console.log(data)
            } catch (err) {
                // console.log(err)
                if (err.response && err.response.status === 400) {
                    this.$toast.fail(err.response.data.message)
                    console.log(err)
                } else {
                    this.$toast.clear()
                    console.dir(err)
                }
            }
        },
        async sendCode() {
            this.$refs.from.validate('mobile').then(() => {
                // console.log('发送 ')
                this.isShowBtn = false
            })
            this.loading()
            try {
                await sendCodeApi(this.mobile)
                this.$toast.success('验证码发送成功')
            } catch (err) {
                if (
                    err.response &&
                    (err.response.status === 429 || err.response.status === 404)
                ) {
                    this.$toast.fail(err.response.data)
                } else {
                    this.$toast.clear()
                    throw err
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
.nav-bar {
    background-color: rgb(50, 150, 250);
    :deep(.van-nav-bar__title) {
        color: white;
    }
}
:deep(.form) {
    .van-cell__title {
        flex: 1;
    }
    .van-cell__value {
        flex: 20;
    }
    .toutiao {
        font-size: 40px;
    }
}
.btn {
    width: 2.65rem;
    background-color: rgb(214, 214, 214);
    color: rgb(115, 98, 98);
}
</style>
