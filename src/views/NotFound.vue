<template>
  <div class="n404 blur">
    <n-result
      status="404"
      title="404 Not Found"
      description="The resource you're trying to get isn't here!"
    >
      <template #footer>
        <n-button @click="goBack">Go Back Home!</n-button>
      </template>
    </n-result>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    goBack() {
      this.$router.push("/")
    }
  }
}
</script>

<style>
.n404 {
  padding: 5rem;
  height: fit-content;
}
</style>