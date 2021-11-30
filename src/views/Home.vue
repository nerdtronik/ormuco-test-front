<template>
  <div class="home">
    <div v-if="!signed">
      <Login v-model:state="signed" />
    </div>
    <div v-else id="parallel">
      <div id="servercreate">
        <n-space vertical>
          <h5>Server Name</h5>
          <n-input v-model:value="name" type="text" placeholder="Name" />
          <Flavors v-model:selected="flavor" />
          <Keypairs v-model:selected="keypair" />
          <Images v-model:selected="image" />
          <n-button type="primary" @click="createServer"
            >Create Server</n-button
          >
        </n-space>
      </div>
      <div id="serverlist">
        <Servers v-model:selected="image" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Flavors from '@/components/Flavors.vue';
import Keypairs from '@/components/Keypairs.vue';
import Images from '@/components/Images.vue';
import Servers from '@/components/Servers.vue';
import { config } from "@/fn.js";
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    Login,
    Flavors,
    Keypairs,
    Images,
    Servers
  }
  , data() {
    return {
      signed: false,
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
      axios.post(`http://37.114.85.140:5000/servers`, body, config).then(r => {
        if (r.data.data !== undefined) {
          console.log(r.data)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 1em 3rem;
}
#parallel {
  display: flex;
  flex-direction: row;
}
#servercreate {
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-content: center;
  align-items: stretch;
}
#serverlist {
  margin: 0 5%;
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-content: center;
  align-items: stretch;
}
div {
  text-align: left;
}
h5 {
  margin: 0;
  margin-top: 6px;
  padding: 0;
}
</style>
