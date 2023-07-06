<template>
  <ul class="ui-pagination">
    <li
      class="ui-pagination__item"
      :class="{ 'ui-pagination__item--active': props.currentPage === page }"
      v-for="page in serializedPages"
      :key="page"
      @click.prevent="changePage(page)"
    >
      {{ page }}
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'UiPagination'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  perPage: number
  totalCount: number
  currentPage: number
  offset?: number
}

const props = withDefaults(defineProps<Props>(), {
  offset: 2
})
const emits = defineEmits(['changePage'])

const totalPages = computed(() => {
  return Math.ceil(props.totalCount / props.perPage)
})

const serializedPages = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages.value; i++) {
    if (
      (props.currentPage - i < props.offset && props.currentPage - i > -props.offset) ||
      i === totalPages.value ||
      i === 1
    ) {
      pages.push(i)
    }
  }

  return pages
})

const changePage = (page: number) => {
  emits('changePage', page)
}
</script>

<style lang="scss" scoped>
.ui-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  list-style: none;

  &__item {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f6f6f8;
    color: #4f524f;
    font-size: 14px;
    margin: 0 5px;
    &--active {
      pointer-events: none;
      background-color: rgba(96, 89, 211, 0.11);
    }
  }
}
</style>
