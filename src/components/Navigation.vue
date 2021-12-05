<template>
  <div class="blur navigation">
    <n-breadcrumb>
      <n-breadcrumb-item
        v-for="item in items"
        :key="item.title"
        @click="go(item.route)"
      >
        {{ item.title }}
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "Navigation",
  data() {
    return {
      items: []
    }
  }, beforeMount() {
    const lis = String(this.$route.path).split("/");
    const all = this.$router.getRoutes();
    let route = "/"
    console.log(lis)
    for (var i = 0; i < lis.length; i++) {
      if (i > 1) route += "/"
      route += lis[i]
      let item = all.find(x => x.path.toLowerCase() === route.toLowerCase());
      if (item !== undefined) {
        this.items.push({
          title: item.name,
          route: item.path
        });
      }
    }
    console.log(route)


  },
  methods: {
    go(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
.navigation {
  display: flex;
  justify-content: flex-start;
  padding: 0 1rem;
  font-size: 120%;
  align-self: flex-start;
  width: fit-content;
  margin: 0.5rem 1rem;
  box-shadow: none;
  background-color: rgb(255, 255, 255);
}
</style>