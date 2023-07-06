<template>
  <div class="not-found">
    <h1 class="not-found__title">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}
defineProps<Props>()
</script>

<style scoped lang="scss">
.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>
