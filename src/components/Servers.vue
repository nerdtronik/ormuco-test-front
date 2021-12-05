<template>
  <div>
    <n-button quaternary round type="info" @click="collapse(!collapsed)">{{
      collapsed ? "Show" : "Collapse"
    }}</n-button>
    <div id="serverlist">
      <Server
        v-for="item in this.options"
        :key="item.name"
        :info="item"
        :loading="loading"
        :collapsed="collapsed"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Server from '@/components/Server.vue'
export default {
  name: "Servers",
  components: {
    Server
  },
  props: {
    selected: String
  },
  data() {
    return {
      options: [{ name: "", id: "" }, { name: "", id: "" }],
      value: "",
      loading: true,
      collapsed: false
    }
  },
  emits: ["update:selected"],
  methods: {
    getServers() {
      axios.get(`http://37.114.85.140:5000/servers?detailed=true`, this.$store.state.config).then(r => {
        if (r.data.data !== undefined) {
          console.log(r.data.data)
          this.options = r.data.data;
          this.loading = false;
          this.$store.commit("updateServers", this.options)
          this.$store.commit("showPanel", true)
        }
      }).catch(err => {
        console.log(err)
      })

    },
    collapse(value) {
      this.collapsed = value;
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
    console.log(this.$store.state.serverList)
    if (this.$store.state.serverList.length === 0)
      this.getServers()
    else {
      this.loading = false
      this.$store.commit("showPanel", true)
      this.options = this.$store.state.serverList
    }

  },

}
</script>

<style lang="scss">
#serverlist {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
</style>