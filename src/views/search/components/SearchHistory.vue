<template>
    <div>
        <van-cell title="搜索历史" icon="search">
            <template #extra>
                <van-icon
                    name="deleta-o"
                    v-if="!isEdit"
                    @click="isEdit = true"
                />
                <div v-else>
                    <span @click="$store.commit('SET_HISTORISE', [])"
                        >全部删除</span
                    >
                    &nbsp;
                    <span @click="isEdit = false">完成</span>
                </div>
            </template>
        </van-cell>
        <van-cell
            :title="item"
            v-for="item in histories"
            :key="item"
            @click="!isEdit && $emit('change-keywords', item)"
        >
            <template #extra>
                <van-icon
                    name="cross"
                    v-show="isEdit"
                    @click="
                        $store.commit(
                            'SET_HISTORISE',
                            histories.filter((i) => item !== 1)
                        )
                    "
                />
            </template>
        </van-cell>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            isEdit: false
        }
    },
    computed: {
        ...mapState(['histories'])
    }
}
</script>

<style></style>
