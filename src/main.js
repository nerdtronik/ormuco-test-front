import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            signed: false,
            user: "",
            pwd: "",
            token: {
                value: "",
                exp: ""
            },
            config: {
                headers: {
                    "X-Auth-Token": ""
                }
            },
            serverList: [],
            panelShow: false
        }
    },
    mutations: {
        login(state) {
            state.signed = true;
        },
        logout(state) {
            state.signed = false;
        },
        setUser(state, name) {
            state.user = name;
        },
        setPass(state, pass) {
            state.pwd = pass;
        },
        setToken(state, newToken) {
            state.token = newToken;
            state.config = {
                headers: {
                    "X-Auth-Token": newToken.value
                }
            }
        },
        updateServers(state, list) {
            state.serverList = list;
        },
        showPanel(state, show) {
            state.panelShow = show;
        }
    }
})
let app = createApp(App);
app.use(router)
app.use(naive)
app.use(store)
app.mount('#app')
