<template>
  <div>
    <h5>Flavor</h5>
    <n-select
      v-model:value="value"
      :options="options"
      @click="selection"
      @blur="selection"
    />
  </div>
</template>

<script>
import { config } from "@/fn.js";
import axios from 'axios';
export default {
  name: "Flavors",
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
    getFlavors() {
      axios.get(`http://37.114.85.140:5000/flavors`, config).then(r => {
        if (r.data.data !== undefined) {
          this.options = r.data.data.map((item) => {
            return {
              label: item.name,
              value: item.id
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
    this.getFlavors()
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
