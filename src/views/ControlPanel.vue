<template>
  <div id="panel" class="blur">
    <div v-if="this.$store.state.signed === true">
      <n-spin :show="!this.$store.state.panelShow" size="large">
        <n-card
          title="System Usage"
          v-if="this.$store.state.panelShow === true"
          @loadstart="loadData"
          @load="loadData"
        >
          <div id="usage">
            <div class="sysUsage">
              <n-progress type="circle" :percentage="sysUsage" />
              <n-statistic
                label="Used Instances"
                :value="this.$store.state.serverList.length"
              >
                <template #suffix>/ 15</template>
              </n-statistic>
            </div>
            <div class="sysUsage">
              <n-progress type="circle" :percentage="actives" />
              <n-statistic
                label="Active Instances"
                :value="
                  (
                    (actives / 100) *
                    this.$store.state.serverList.length
                  ).toFixed(0)
                "
              >
                <template #suffix
                  >/ {{ this.$store.state.serverList.length }}</template
                >
              </n-statistic>
            </div>
          </div>
        </n-card>
        <n-card title="Options">
          <template #action>
            <n-button
              quaternary
              round
              type="info"
              @click="() => this.$router.push('/panel/create')"
              >Create Server</n-button
            >
            <n-button quaternary round type="info">View Server List</n-button>
          </template>
        </n-card>
        <n-card title="User Info">
          <b>E-mail: </b> {{ this.$store.state.user }}
          <template #action>
            <n-button type="error" @click="beforeLogout">Logout</n-button>
          </template>
        </n-card>
      </n-spin>
    </div>
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
export default {
  name: "ControlPanel",
  data() {
    return {
      image: "",
      gone: false,
      sysUsage: 0,
      actives: 0
    }
  },
  methods: {
    goBack() {
      this.$router.push("/")
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
    },
    loadData() {
      this.sysUsage = (100 * (this.$store.state.serverList.length / 15)).toFixed(0)
      this.$store.state.serverList.forEach((item) => {
        this.actives += item.status == "ACTIVE" ? 1 : 0;
      })
      this.actives = (100 * (this.actives / this.$store.state.serverList.length)).toFixed(0)
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
    setTimeout(() => {
      this.loadData()
    }, 6000)
  }

}
</script>

<style lang="scss">
#panel {
  display: flex;
  flex-direction: column;
  padding: 2em 1em;
  text-align: left;
  align-content: center;
  justify-content: flex-start;
  width: 75%;
  margin: 0 10px;
}
.sysUsage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#usage {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: space-around;
  justify-content: space-around;
}
</style>