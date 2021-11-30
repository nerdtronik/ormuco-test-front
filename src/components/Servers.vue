<template>
  <div>
    <n-list bordered>
      <template #header> Servers </template>
      <n-list-item v-for="item in options" :key="item.value">
        <n-thing :title="item.label" :description="item.value"> </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>

<script>
import { config } from "@/fn.js";
import axios from 'axios';
export default {
  name: "Servers",
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
    getServers() {
      console.log(process.env.FLASK_SERVICE)
      axios.get(`http://37.114.85.140:5000/servers`, config).then(r => {
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
    this.getServers()
  }
}
</script>

<style>
</style>