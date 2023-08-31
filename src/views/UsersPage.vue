<template>
  <div class="users-page">
    <pre>
      {{}}
    </pre>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import type { IUser } from '@/types/user'
import { api } from '@/api'
import { useRouter } from 'vue-router'

const usersData = ref<IUser[] | null>(null)

const router = useRouter()

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

const getUsers = async () => {
  try {
    const { data } = await api.users.getUsers()
    usersData.value = data
  } catch (e) {
    console.error(e)
  }
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
</script>

<style scoped lang="scss">
.users-page {
  flex-grow: 1;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
}
</style>
