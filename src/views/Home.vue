<template>
  <div class="home">
    <div id="home-title">
      <h1>Welcome to</h1>
      <img src="@/assets/logo.svg" alt="ADMI" id="home-logo" />
      <n-button
        round
        type="success"
        v-if="this.$store.state.signed"
        @click="() => this.$router.push('/panel')"
        >Go to control panel!</n-button
      >
    </div>
    <div v-if="this.$store.state.signed === false" id="home-login">
      <Login />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import axios from 'axios';
import { watchEffect } from '@vue/runtime-core';

export default {
  name: 'Home',
  components: {
    Login,

  }
  , data() {
    watchEffect()
    return {
      flavor: "",
      keypair: "",
      image: "",
      name: ""
    }
  },
  methods: {
    createServer() {
      const body = {
        name: this.name,
        flavor: this.flavor,
        keypair: this.keypair,
        image: this.image
      }
      axios.post(`http://37.114.85.140:5000/servers`, body, this.$store.state.config)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  color: black;
  padding: 1em 3rem;
  min-width: 80%;
  margin-top: auto;
  margin-bottom: auto;
  width: auto;
  margin: auto;
  margin-top: 24px;
  display: flex;
  flex-direction: rows;
  border-radius: 10px;
  justify-content: space-around;
  align-items: center;
}
#home-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  h1 {
    background-color: rgba(255, 255, 255, 0.705);
    display: block;
    padding: 0 1rem;
    border-radius: 6px;
    background-blend-mode: color-burn;
  }
}
#home-logo {
  display: block;
  max-height: 300px;
}
#home-login {
  display: flex;
  width: 40%;
  padding: 0;
}
</style>
