<template>
  <div class="v-table-filter">
    <input
      type="text"
      class="v-table-filter__control"
      v-for="item in filtersView"
      :key="item.key"
      :placeholder="item.placeholder"
      :value="filters[item.key]"
      @input="
        emit('update:modelValue', {
          value: ($event.target as HTMLInputElement).value,
          key: item.key
        })
      "
    />
  </div>
</template>

<script setup lang="ts">
import type { IFilterView } from './VTable.vue'
interface Props {
  filtersView: IFilterView[]
  filters: { [key: string]: string }
}
defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
.v-table-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding: 0 20px;
  &__control {
    flex-grow: 1;
    border: 1px solid $gray-dark-color;
    padding: 15px 20px;
    border-radius: 15px;
    transition: all 0.2s linear;

    &:focus {
      border-color: $azure-color;
    }
  }
}
</style>
