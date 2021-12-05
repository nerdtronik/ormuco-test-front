import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import ControlPanel from '../views/ControlPanel.vue'
import CreateServer from '../views/CreateServer.vue'
import ServerView from '../views/Server.vue'
import NotFound from "../views/NotFound.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/panel',
    name: 'Control Panel',
    component: ControlPanel
  },
  {
    path: "/panel/create",
    name: "Create Server",
    component: CreateServer
  },
  {
    path: "/panel/server/:id",
    component: ServerView
  },
  {
    path: '/:pathMatch(.*)*',
    name: "404 - Not Found",
    component: NotFound

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
