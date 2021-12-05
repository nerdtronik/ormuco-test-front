<template>
  <NavBar :logo="this.logo" :routes="this.routes" />
  <div id="home">
    <MenuBar v-if="this.$store.state.signed && this.$route.path !== '/'" />
    <router-view />
    <Servers
      v-model:selected="image"
      v-if="
        this.$store.state.signed &&
        this.$route.path !== '/' &&
        this.$route.path.toLowerCase() !== '/about'
      "
    />
  </div>
</template>
<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import Servers from "@/components/Servers.vue";
import MenuBar from "@/components/MenuBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
    Servers,
    MenuBar
  },
  data() {
    let logo = {
      src: require("@/assets/logo.png"),
      route: "/"
    }
    const navRoutes = [
      {
        path: '/',
        name: 'Home'
      },
      {
        path: '/About',
        name: 'About'
      },
      {
        path: '/Panel',
        name: 'Control Panel',
        signed: true
      }
    ]
    return {
      logo: logo,
      routes: navRoutes,
    }
  },
  beforeCreate() {
    axios.get("https://api.unsplash.com/photos/random?query=network&orientation=landscape&client_id=VKS5Pto4LE5EmgloPZKASfuGUpMbPYrR4lwCwJGERTw").then(r => {
      var _app = document.body;
      _app.style.backgroundImage = `url(${r.data.urls.full})`
    }
    )
    if (this.$store.state.signed === false) {
      if (window.localStorage.getItem("signed") !== 'undefined') {
        if (window.localStorage.getItem("signed") === 'true') {
          this.$store.commit("login");
        }
      }

    }
    if (this.$store.state.user === "" && this.$store.state.signed === true) {
      if (window.localStorage.getItem("username") !== 'undefined') {
        this.$store.commit("setUser", window.localStorage.getItem("username"));
      }

    }
    console.log(this.$store.state.signed)
  }
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Readex+Pro&display=swap");
html,
body {
  padding: 0px !important;
  margin: 0px !important;
  height: 100%;
}

body {
  align-items: center;
  align-content: center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#app {
  font-family: "Readex Pro", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 103px;
  height: 100%;
}
#home {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  height: 100%;
  width: 100%;
}
</style>
