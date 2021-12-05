<template>
  <div id="login-c" class="blur">
    <n-spin :show="this.state === 'loading'" size="large">
      <h2>Login</h2>
      <n-space vertical>
        <n-input v-model:value="email" type="text" placeholder="Email" />
        <n-input
          v-model:value="password"
          type="password"
          placeholder="Password"
        />
      </n-space>
      <div>
        <n-button type="primary" @click="login" v-if="this.state === 'not'"
          >Login</n-button
        >
        <n-alert
          title="Login Failed"
          type="error"
          closable
          v-if="this.state === 'error'"
          :on-close="() => (this.state = 'not')"
        >
          Please verify username and password.
        </n-alert>
      </div>
    </n-spin>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      state: "not"
    }
  },
  methods: {
    login() {
      let body = {
        username: this.email,
        password: this.password
      }
      this.state = "loading";
      axios.post("http://37.114.85.140:5000/login", body).then((response) => {
        console.log(response)
        if (response.data.token !== undefined) {
          localStorage.setItem("token", response.data.token);
          this.$store.commit("login")
          this.$store.commit("setUser", this.email);
          this.$store.commit("setToken", {
            value: response.data.token
            , exp: response.data.expires
          });
          this.$store.commit("setPass", this.password);
          window.localStorage.setItem("signed", true);
          console.log(this.email)
          window.localStorage.setItem("username", this.email);
          this.getServers();
          this.$router.push("/Panel");
        }
      }).catch(() => {
        this.state = "error";
      })
    },
    getToken() {
      if (this.$store.state.token.value === "" && window.localStorage.getItem("token") !== 'undefined') {
        this.$store.commit("setToken", {
          value: window.localStorage.getItem("token"),
          exp: ""
        })
      }
    },
    getServers() {
      this.getToken()
      axios.get(`http://37.114.85.140:5000/servers?detailed=true`, this.$store.state.config).then(r => {
        if (r.data.data !== undefined) {
          this.$store.commit("updateServers", this.options)
          this.$store.commit("showPanel", true)
        }
      }).catch(err => {
        console.log(err)
      })

    }
  }
}
</script>

<style lang="scss" scoped>
#login-c {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 1rem;
  width: 90%;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
  div {
    margin-bottom: 5px;
  }
}
</style>