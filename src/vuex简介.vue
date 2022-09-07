<template>
    <div>
        <!-- <router-view></router-view> -->
        <!-- <span class="toutiao toutiao-shoucang"> </span> -->
        <!-- <van-button disabled type="primary">禁用状态</van-button>
        <van-button disabled type="info">禁用状态</van-button>
        <div class="box"></div> -->
        <h1>{{ $store.state.count }}</h1>
        <h1>{{ $store.getters.bigNum }}</h1>

        <button @click="SET_COUNT(10)">加1</button>
    </div>
</template>

<script>
// git log查看提交记录
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
    methods: {
        // increment() {
        //     this.$store.commit('SET_COUNT', 10)
        // }
        ...mapMutations(['SET_COUNT'])
    },
    computed: {
        ...mapState(['count']),
        ...mapGetters(['bigNum'])
    }
}
</script>

<style>
/* .box {
    width: 694px;
    height: 88px;
    background-color: beige;
} */
</style>
