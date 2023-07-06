<template>
  <div class="v-table-header">
    <div
      class="v-table-header__item"
      v-for="item in columns"
      :key="item.key"
      @click="emit('onClickKey', item.key)"
    >
      {{ item.title }}
      <span v-if="sortColumn === item.key">
        {{ sortDirection === 'asc' ? '▲' : '▼' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IItem } from './VTable.vue'
interface Props {
  columns: { key: string; title: string | number }[]
  sortColumn: keyof IItem
  sortDirection: 'asc' | 'desc'
}

const emit = defineEmits(['onClickKey'])
const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.v-table-header {
  display: flex;
  align-items: center;
  background-color: $dark-color;

  &__item {
    flex-basis: 20%;
    flex-grow: 1;
    padding: 18px 0;
    color: $snow-color;
    cursor: pointer;
    user-select: none;
    text-align: center;
  }
}
</style>
