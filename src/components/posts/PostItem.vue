<template>
  <article class="post-item">
    <h3 class="post-item__title">{{ post.title }}</h3>
    <div class="post-item__body">
      {{ post.body }}
    </div>
    <div class="post-item__author">{{ post.author }}</div>
  </article>
</template>

<script setup lang="ts">
import type { IPost } from '@/types/post'

interface Props {
  post: IPost
}
const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.post-item {
  padding: 20px;
  box-shadow: 0px 4px 8px 0px rgba(20, 16, 41, 0.05);
  display: flex;
  flex-direction: column;
  &__title {
    color: blue;
    font-size: 25px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  &__body {
    font-size: 22px;
    line-height: 1.2;

    flex-grow: 1;
  }

  &__author {
    padding-top: 25px;
  }
}
</style>
