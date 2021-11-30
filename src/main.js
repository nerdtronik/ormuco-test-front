import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
//import cors from "cors"

let app = createApp(App);
app.use(router)
app.use(naive)
//app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }))
//app.options("*", cors({ origin: 'http://localhost:8000', optionsSuccessStatus: 200 }));
app.mount('#app')
