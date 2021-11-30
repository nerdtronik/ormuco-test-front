<template>
  <div id="login-c">
    <n-card
      title="Login"
      size="medium"
      hoverable
      :segmented="{
        content: 'hard',
        footer: 'soft',
      }"
    >
      <n-space vertical>
        <n-input v-model:value="email" type="text" placeholder="Email" />
        <n-input
          v-model:value="password"
          type="password"
          placeholder="Password"
        />
      </n-space>
      <template #action>
        <n-button type="primary" @click="login">Login</n-button>
      </template>
    </n-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Login",
  props: {
    state: Boolean
  },
  data() {
    return {
      email: "",
      password: ""
    }
  },
  emits: ["update:state"],
  methods: {
    login() {
      let body = {
        username: this.email,
        password: this.password
      }
      axios.post("http://37.114.85.140:5000/login", body).then((response) => {
        console.log(response)
        if (response.data.token !== undefined) {
          localStorage.setItem("token", response.data.token)
          this.$emit("update:state", true);
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#login-c {
  display: flex;
  padding: 1rem;
  max-width: 30%;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
}
</style>