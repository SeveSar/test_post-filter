<template>
  <div class="user-page">
    <div class="user-page__card" v-if="userData && !error">
      <div class="user-page__card-row">
        <div class="user-page__card-item">ID:</div>
        <div class="user-page__card-item">
          {{ userData.id }}
        </div>
      </div>
      <div class="user-page__card-row">
        <div class="user-page__card-item">NAME:</div>
        <div class="user-page__card-item">
          {{ userData.name }}
        </div>
      </div>
      <div class="user-page__card-row">
        <div class="user-page__card-item">EMAIL:</div>
        <div class="user-page__card-item">
          {{ userData.email }}
        </div>
      </div>
      <div class="user-page__card-row">
        <div class="user-page__card-item">PHONE:</div>
        <div class="user-page__card-item">
          {{ userData.phone }}
        </div>
      </div>
      <div class="user-page__card-row">
        <div class="user-page__card-item">WEBSITE:</div>
        <div class="user-page__card-item">
          {{ userData.website }}
        </div>
      </div>
    </div>
    <NotFound title="User not found" v-else-if="error" />
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api'
import type { IUser } from '@/types/user'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import NotFound from '@/components/common/NotFound.vue'

const route = useRoute()
const userData = ref<IUser | null>(null)

const error = ref(false)
const getUserById = async () => {
  try {
    userData.value = await api.users.getUserById(+route.params.id)
    error.value = false
  } catch (e) {
    console.error(e)
    error.value = true
  }
}

watchEffect(() => {
  getUserById()
})
</script>

<style scoped lang="scss">
.user-page {
  display: flex;
  justify-content: center;
  &__card {
    max-width: 400px;
    width: 100%;
    border: 1px solid $gray-dark-color;
    margin-top: 50px;
    &-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      &:not(:last-child) {
        border-bottom: 1px solid $gray-dark-color;
      }
    }
    &-item {
      padding: 20px 15px;
      text-align: center;
    }
  }
}
</style>
