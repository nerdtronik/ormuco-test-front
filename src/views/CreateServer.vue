<template>
  <div class="blur" id="create-server">
    <n-spin :show="this.loading === true" size="large">
      <n-space vertical v-if="this.$store.state.signed === true">
        <h4>Server Name</h4>
        <n-input v-model:value="name" type="text" placeholder="Name" />
        <Flavors v-model:selected="flavor" />
        <Keypairs v-model:selected="keyName" />
        <Images v-model:selected="image" />
        <n-button type="primary" @click="createServer">Create Server</n-button>
      </n-space>
      <n-alert
        title="Server creation failed!"
        type="error"
        closable
        v-if="this.state === 'error'"
        :on-close="() => (this.state = 'none')"
      >
        Please try again! If the error persists, please contact support.
      </n-alert>
      <n-alert
        title="Server creation Success!"
        type="success"
        closable
        v-if="this.state === 'success'"
        :on-close="() => (this.state = 'none')"
      >
        The server {{ this.name }} was successfully created! Reload the page to
        see the changes
      </n-alert>
      <div v-if="this.$store.state.signed === false" id="panel-else">
        <n-result
          status="error"
          title="Error"
          description="You MUST be signed in to be here"
        >
          <template #footer>
            <n-button @click="goBack">Go to Login page!</n-button>
          </template>
        </n-result>
      </div>
    </n-spin>
  </div>
</template>

<script>
import axios from "axios";
import Flavors from '@/components/Flavors.vue';
import Keypairs from '@/components/Keypairs.vue';
import Images from '@/components/Images.vue';
export default {
  name: "CreateServer",
  data() {
    return {
      loading: false,
      flavor: "",
      keyName: "",
      image: "",
      name: "",
      state: "none"
    }
  },
  components: {
    Flavors,
    Keypairs,
    Images
  },
  methods: {
    goBack() {
      this.$router.push("/")
    },
    createServer() {
      const body = {
        name: this.name,
        image: this.image,
        flavor: this.flavor,
        keypair: this.keyName
      }
      this.loading = true;
      axios.post(`http://37.114.85.140:5000/servers`, body, this.$store.state.config).then((r) => {
        this.loading = false;
        if (r.data.success === true)
          this.state = "success"
        else
          this.state = "error"

      }).catch(() => {
        this.loading = false;
        this.state = "error"
      })
    },
    getToken() {
      if (this.$store.state.token.value === "" && window.localStorage.getItem("token") !== 'undefined') {
        this.$store.commit("setToken", {
          value: window.localStorage.getItem("token"),
          exp: ""
        })
      }
    }
  },
  beforeMount() {
    this.getToken();
  }
}
</script>

<style lang="scss">
#create-server {
  width: 70%;
  margin: 0 1rem;
  text-align: left;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: 3rem 0;
  div {
    min-width: 70%;
  }
}
</style>