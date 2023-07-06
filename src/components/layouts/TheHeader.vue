<template>
  <div class="header">
    <nav class="header__nav">
      <router-link class="header__nav-link" :to="{ name: 'Posts' }"> Posts </router-link>
      <router-link class="header__nav-link" :to="{ name: 'Users' }"> Users </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header {
  padding: 20px 35px;

  box-shadow: 0px 4px 8px 0px rgba(20, 16, 41, 0.05), 0px 0px 1px 0px rgba(20, 16, 41, 0.05);
  backdrop-filter: blur(6px);
  &__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;

    &-link {
      text-decoration: none;
      color: $dark-color;
      font-size: 25px;

      &.router-link-exact-active {
        color: $azure-color;
      }
    }
  }
}
</style>
