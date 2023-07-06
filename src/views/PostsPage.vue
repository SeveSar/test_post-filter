<template>
  <div class="posts-page">
    <VTable
      class="posts-page__table"
      v-if="postsData"
      :paginationView="paginationView"
      :currentPage="currentPage"
      :filtersView="filtersView"
      :filters="filters"
      :columns="columns"
      :items="postsData"
      :sortColumn="sortColumn"
      :sortDirection="sortDirection"
      @update:currentPage="setPage"
      @update:filterValue="setFilter"
      @clickRow="navigate"
      @clickSortKey="setSort"
    />
  </div>
</template>

<script setup lang="ts">
import VTable from '@/components/table/VTable.vue'
import { api } from '@/api'
import { computed, ref, watch } from 'vue'
import type { IPost, IPostFilter, TPostSort } from '@/types/post'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'
import type { IPagination } from '@/types/common'

const router = useRouter()

const postsData = ref<IPost[] | null>(null)

const filters = ref<IPostFilter>({
  title: '',
  body: '',
  userId: '',
  id: ''
})

const paginationView = ref({
  perPage: 10,
  totalCount: 100
})
const currentPage = ref(1)
const sortColumn = ref<keyof IPostFilter | ''>('')
const sortDirection = ref<'asc' | 'desc'>('asc')

const columns = ref([
  { key: 'id', title: 'ID' },
  { key: 'title', title: 'Title' },
  { key: 'body', title: 'Body' },
  { key: 'userId', title: 'User ID' }
])

const filtersView = computed(() => {
  return columns.value.map((item) => {
    return {
      key: item.key,
      placeholder: item.title
    }
  })
})
const getPosts = async () => {
  try {
    const queries: {
      filters: IPostFilter
      sorts: TPostSort
      pagination: IPagination
    } = {
      filters: filters.value,
      sorts: { sortColumn: sortColumn.value, sortDirection: sortDirection.value },
      pagination: {
        limit: paginationView.value.perPage,
        currentPage: currentPage.value
      }
    }

    const { total, data } = await api.posts.getPosts(queries)

    postsData.value = data
    paginationView.value.totalCount = +total
  } catch (e) {
    console.log(e)
  }
}

const setPage = (page: number) => {
  currentPage.value = page
  getPosts()
}

const setSort = (columnKey: keyof IPostFilter) => {
  if (sortColumn.value === columnKey) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = columnKey
    sortDirection.value = 'asc'
  }
}

const setFilter = <T extends keyof IPostFilter>({
  value,
  key
}: {
  value: IPostFilter[T]
  key: T
}) => {
  currentPage.value = 1
  filters.value[key] = value
}
const navigate = (id: number) => {
  router.push({ name: 'Post', params: { id } })
}
getPosts()

const debouncedGetPosts = debounce(getPosts, 400)
watch(filters, debouncedGetPosts, { deep: true })
watch(() => [sortColumn, sortDirection], debouncedGetPosts, { deep: true })
</script>

<style scoped lang="scss">
.posts-page {
  padding-top: 50px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
