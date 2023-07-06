<template>
  <div class="default-layout">
    <TheHeader />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '../components/layouts/TheHeader.vue'
</script>

<style scoped lang="scss">
.default-layout {
  min-height: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
