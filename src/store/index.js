import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            key: 'HM-TOUTIAO', // 储存的key
            // storage: window.sessionStorage, // 指定存储方式
            reducer({ tokenObj, myChannels, histories }) {
                // 默认接收state把{ tokenObj}解构出来
                return {
                    tokenObj,
                    myChannels,
                    histories
                }
            }
        })
    ],
    state: {
        tokenObj: {},
        myChannels: [],
        histories: []
    },
    getters: {
        isLogin(state) {
            return !!state.tokenObj.token
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.tokenObj = token
        },
        SET_MY_CHANNELS(state, channels) {
            state.myChannels = channels
        },
        SET_HISTORISE(state, histories) {
            state.histories = histories
        }
    }
})
