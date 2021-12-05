<template>
  <div>
    <h5>Key pair</h5>
    <n-select
      v-model:value="value"
      :options="options"
      @click="selection"
      @blur="selection"
    />
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Keypairs",
  props: {
    selected: String
  },
  data() {
    return {
      options: [],
      value: ""
    }
  },
  emits: ["update:selected"],
  methods: {
    getKeypairs() {
      console.log(process.env.FLASK_SERVICE)
      axios.get(`http://37.114.85.140:5000/keypairs`, this.$store.state.config).then(r => {
        if (r.data.data !== undefined) {
          this.options = r.data.data.map((item) => {
            return {
              label: item.keypair.name,
              value: item.keypair.name
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })

    },
    selection() {
      this.$emit("update:selected", this.value)
    }
  },
  beforeMount() {
    this.getKeypairs()
  }
}
</script>

<style lang="scss" scoped>
div {
  text-align: left;
}
h5 {
  margin: 0;
  margin-top: 6px;
  padding: 0;
}
</style>
