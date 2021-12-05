<template>
  <div id="navcont">
    <div id="navbar" class="blur" :key="this.$store.state.user">
      <div id="nav-left" class="nav-section">
        <img :src="this.logo.src" alt="ADMI" @click="logoClick" />
        <div v-for="item in this.routes" :key="item.name">
          <router-link
            :to="item.path"
            v-if="!item.signed || this.$store.state.signed"
          >
            <div class="nav-link">
              {{ item.name }}
            </div>
          </router-link>
        </div>
      </div>
      <div id="nav-right" class="nav-section">
        <div v-if="this.$store.state.signed" id="nav-user">
          {{ this.$store.state.user }}
        </div>
        <n-button
          v-if="this.$store.state.signed"
          strong
          secondary
          round
          type="error"
          @click="beforeLogout"
          >Logout</n-button
        >
      </div>
    </div>
    <Navigation :key="$route.fullPath" v-if="this.$route.path !== '/'" />
  </div>
  <n-modal
    v-model:show="this.gone"
    :mask-closable="false"
    preset="dialog"
    title="Logout?"
    content="Are you sure? We were having a good time!"
    positive-text="Confirm"
    @positive-click="logout"
    @negative-click="() => (this.gone = false)"
    negative-text="Cancel"
  />
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  name: "NavBar",
  data() {
    return {
      gone: false,
      compKey: 0
    }
  },
  props: {
    logo: Object, routes: Array
  },
  components: {
    Navigation
  },
  methods: {
    logoClick() {
      this.$router.push(this.logo.route)
    },
    beforeLogout() {
      this.gone = true;
    },
    logout() {
      this.$store.commit("logout")
      this.$store.commit("setUser", "")
      this.$store.commit("setPass", "")
      this.$store.commit("setToken", { value: "", exp: "" })
      this.$store.commit("updateServers", [])
      this.$forceUpdate();
      this.compKey += 1;
    }
  },

}
</script>

<style lang="scss">
.blur {
  background: rgba(255, 255, 255, 0.699);
  box-shadow: 0 4px 16px 0 rgba(40, 40, 41, 0.37);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  justify-self: center;
}
#navcont {
  position: fixed;
  left: 0;
  top: 0;
  width: calc(100% - 12px);
  margin: 6px;
  z-index: 100;
}
#navbar {
  display: flex;
  flex-direction: row;
  color: black;

  border-radius: 60px;

  user-select: none;
  a {
    height: 80%;
    text-decoration: none;
    color: black;
    :hover {
      text-decoration-line: underline;
      text-decoration-color: rgb(46, 46, 46);
      text-decoration-thickness: 3px;
    }
    :active {
      font-weight: 600;
      text-decoration: none;
    }
  }
}
.nav-section {
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: 0.25rem 0.75rem;
  align-content: space-between;
  align-items: center;
  font-size: 110%;
}
.nav-link {
  display: flex;
  height: 100%;
  border-radius: 50px;
  padding: 0 0.75rem;
  margin-left: 0.5rem;
  align-items: center;
}
#nav-left {
  justify-content: flex-start;
  img {
    display: block;
    height: 45px;
    cursor: pointer;
    margin-right: 0.375rem;
  }
}
#nav-right {
  justify-content: flex-end;
}
#nav-user {
  margin-right: 2rem;
}
#navpill {
}
</style>