<template>
  <div class="post-page">
    <div class="post-page__card" v-if="postData && !error">
      <div class="post-page__card-row">
        <div class="post-page__card-item">ID:</div>
        <div class="post-page__card-item">
          {{ postData.id }}
        </div>
      </div>
      <div class="post-page__card-row">
        <div class="post-page__card-item">TITLE:</div>
        <div class="post-page__card-item">
          {{ postData.title }}
        </div>
      </div>
      <div class="post-page__card-row">
        <div class="post-page__card-item">BODY:</div>
        <div class="post-page__card-item">
          {{ postData.body }}
        </div>
      </div>
      <div class="post-page__card-row">
        <div class="post-page__card-item">USERID:</div>
        <div class="post-page__card-item">
          {{ postData.title }}
        </div>
      </div>
    </div>
    <NotFound v-else-if="error" title="Post not found" />
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api'
import type { IPost } from '@/types/post'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import NotFound from '@/components/common/NotFound.vue'

const route = useRoute()
const postData = ref<IPost | null>(null)
const error = ref(false)
const getPostById = async () => {
  try {
    postData.value = await api.posts.getPostById(+route.params.id)
    error.value = false
  } catch (e) {
    console.error(e)
    error.value = true
  }
}

watchEffect(() => {
  getPostById()
})
</script>

<style scoped lang="scss">
.post-page {
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
