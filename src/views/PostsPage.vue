<template>
  <div class="posts-page">
    <PostFilter class="posts-page__filter" v-model="filter" />
    <div class="posts-page__list" v-if="filteredUsersId.length">
      <PostItem class="post-page__item" v-for="post in currentPosts" :key="post.id" :post="post" />
    </div>
    <small class="posts-page__not-found" v-else>NOT FOUND</small>
    <UiPagination
      class="posts-page__pagination"
      v-if="filteredUsersId.length"
      :currentPage="currentPage"
      :perPage="paginationPostView.perPage"
      :totalCount="paginationPostView.totalCount"
      @changePage="(page: number) => setPage(page)"
    />
  </div>
</template>

<script setup lang="ts">
import UiPagination from '@/components/ui/UiPagination.vue'
import PostFilter from '@/components/posts/PostFilter.vue'
import PostItem from '@/components/posts/PostItem.vue'
import { api } from '@/api'
import { computed, ref, watch } from 'vue'
import type { IPost } from '@/types/post'
import { useRoute, useRouter } from 'vue-router'
import debounce from 'lodash/debounce'
import type { IPagination } from '@/types/common'
import type { IUser } from '@/types/user'

const router = useRouter()
const route = useRoute()
const postsData = ref<IPost[]>([])
const usersData = ref<IUser[]>([])
const filter = ref('')
const isLoadingPost = ref(false)

const paginationPostView = ref({
  perPage: 10,
  totalCount: 100
})
const currentPage = ref(route.query.page ? +route.query.page : 1)

const filteredUsersId = ref<number[]>([])

const getPosts = async () => {
  isLoadingPost.value = true
  try {
    const queries: {
      filters: { userId?: number[] }
      pagination: IPagination
    } = {
      filters: { userId: filteredUsersId.value },
      pagination: {
        limit: paginationPostView.value.perPage,
        currentPage: currentPage.value
      }
    }

    const { total, data } = await api.posts.getPosts(queries)

    postsData.value = data
    paginationPostView.value.totalCount = +total
  } catch (e) {
    console.log(e)
  } finally {
    isLoadingPost.value = false
  }
}

const getUsers = async () => {
  try {
    const { data } = await api.users.getUsers()
    usersData.value = data
    filteredUsersId.value = usersData.value.map((user) => user.id)
  } catch (e) {
    console.error(e)
  }
}

const usersMap = computed(() => {
  if (!usersData.value) return []
  return usersData.value?.reduce((acc: Record<number, IUser>, user) => {
    acc[user.id] = user
    return acc
  }, {})
})

const currentPosts = computed(() => {
  return postsData.value?.map((post) => {
    const user = usersMap.value[post.userId]
    return {
      ...post,
      author: user?.name
    }
  })
})

const setPage = (page: number) => {
  currentPage.value = page
  router.push({ query: { page: currentPage.value } })
  getPosts()
  window.scrollTo(0, 0)
}

Promise.all([getUsers(), getPosts()])

const debouncedGetPosts = debounce(getPosts, 400)
watch(filter, () => {
  filteredUsersId.value = usersData.value.filter((user) => user.name.toLowerCase().includes(filter.value.toLowerCase())).map((user) => user.id)
  router.push({ query: { page: 1 } })
  currentPage.value = 1
  debouncedGetPosts()
})
</script>

<style scoped lang="scss">
.posts-page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-width: 1500px;
  width: 100%;
  padding: 50px 20px 0;
  margin: 0 auto;

  &__filter {
    margin-bottom: 35px;
  }

  &__not-found {
    text-align: center;
    font-size: 25px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;

    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
  }

  &__pagination {
    margin-top: auto;
    padding-top: 50px;
  }
}
</style>
