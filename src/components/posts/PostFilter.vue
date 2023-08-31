<template>
  <div class="search">
    <input class="search__control" type="search" v-model="searchModel" placeholder="author..." />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue: string
}
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const searchModel = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<style scoped lang="scss">
.search {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  &__control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 12px;

    &:focus {
      border-color: blue;
    }
  }
}
</style>
