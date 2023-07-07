<template>
  <div class="users-page">
    <VTable
      class="users-page__table"
      v-if="usersData"
      :paginationView="paginationView"
      :currentPage="currentPage"
      :columns="columns"
      :filtersView="filtersView"
      :items="usersData"
      :filters="filters"
      @update:currentPage="setPage"
      @update:filterValue="setFilter"
      @clickRow="navigate"
      @update:sortValues="setSort"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import VTable from '@/components/table/VTable.vue'
import { debounce } from 'lodash'

import type { IUser, IUserFilter, TUserSort } from '@/types/user'
import { api } from '@/api'
import { useRouter } from 'vue-router'
import type { IPagination } from '@/types/common'
const usersData = ref<IUser[] | null>(null)

const filters = ref<IUserFilter>({
  name: '',
  id: '',
  username: '',
  email: '',
  phone: '',
  website: ''
})

const router = useRouter()

const paginationView = ref({
  perPage: 5,
  totalCount: 10
})
const currentPage = ref(1)
const sortColumn = ref<keyof IUserFilter | ''>('')
const sortDirection = ref<'asc' | 'desc'>('asc')

const columns = ref([
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'username',
    title: 'Username'
  },
  {
    key: 'email',
    title: 'Email'
  },
  {
    key: 'phone',
    title: 'Phone'
  },
  {
    key: 'website',
    title: 'Website'
  }
])
const filtersView = computed(() => {
  return columns.value.map((item) => {
    return {
      key: item.key,
      placeholder: item.title
    }
  })
})

const getUsers = async () => {
  const queries: {
    filters: IUserFilter
    sorts: TUserSort
    pagination: IPagination
  } = {
    filters: filters.value,
    sorts: {
      sortColumn: sortColumn.value,
      sortDirection: sortDirection.value
    },
    pagination: {
      limit: paginationView.value.perPage,
      currentPage: currentPage.value
    }
  }
  try {
    const { total, data } = await api.users.getUsers(queries)
    usersData.value = data
    paginationView.value.totalCount = +total
  } catch (e) {
    console.error(e)
  }
}
const setPage = (page: number) => {
  currentPage.value = page
  getUsers()
}
const setFilter = <T extends keyof IUserFilter>({ value, key }: { value: IUserFilter[T]; key: T }) => {
  currentPage.value = 1
  filters.value[key] = value
}

const setSort = ({ direction, columnKey }: { columnKey: keyof IUserFilter; direction: 'asc' | 'desc' }) => {
  console.log(direction, columnKey)

  sortDirection.value = direction
  sortColumn.value = columnKey
}

const navigate = (id: number) => {
  router.push({
    name: 'User',
    params: {
      id
    }
  })
}
getUsers()

const debouncedGetUsers = debounce(getUsers, 400)
watch(filters, debouncedGetUsers, {
  deep: true
})
watch(() => [sortColumn, sortDirection], debouncedGetUsers, {
  deep: true
})
</script>

<style scoped lang="scss">
.users-page {
  flex-grow: 1;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
}
</style>
