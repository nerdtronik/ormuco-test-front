<template>
  <div class="server-card blur" v-if="collapsed === false">
    <header>
      <n-skeleton v-if="loading" circle size="medium" />
      <CloudCircleOutline v-else class="server-logo" />
      <div class="sep"></div>
      <n-skeleton v-if="loading" :width="146" text />
      <h4 v-else>{{ this.info.name }}</h4>
    </header>
    <hr />
    <n-skeleton v-if="loading" text :repeat="3" />
    <div v-else class="server-info"><b>id: </b>{{ this.info.id }}</div>
  </div>
  <div v-else class="server-card blur">
    <n-skeleton v-if="loading" circle size="medium" />
    <n-popover v-else trigger="hover">
      <template #trigger>
        <CloudCircleOutline class="server-logo" />
      </template>
      <span>{{ this.info.name }}</span>
    </n-popover>
  </div>
</template>

<script>
import { CloudCircleOutline } from "@vicons/ionicons5"
export default {
  name: "Server",
  data() {
    return {

    }
  },
  props: {
    info: Object,
    loading: Boolean,
    collapsed: Boolean
  },
  components: {
    CloudCircleOutline
  }
}
</script>

<style lang="scss">
.server-card {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: left;
  margin: 0.5rem;
  padding: 0.25rem;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.404);
  user-select: text;
  cursor: pointer;
  max-height: 6rem;
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    height: 20%;
  }
}
.sep {
  display: block;
  width: 1rem;
}
.server-card:hover {
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.671);
}
.server-logo {
  display: block;
  max-height: 32px;
}
</style>