<template>
  <div class="v-table">
    <VTableFilter
      class="v-table__filter"
      v-if="filtersView"
      :filtersView="filtersView"
      :filters="filters"
      @update:modelValue="(data) => emit('update:filterValue', data)"
    />
    <div class="v-table__responsive">
      <div class="v-table__inner">
        <VTableHeader
          :columns="columns"
          :sortColumn="sortColumn"
          :sortDirection="sortDirection"
          @onClickKey="emit('clickSortKey', $event)"
        />
        <div class="v-table__body">
          <template v-if="items.length">
            <div
              class="v-table__body-row"
              v-for="item in items"
              :key="item.id"
              @click.prevent="emit('clickRow', item.id)"
            >
              <div class="v-table__body-item" v-for="column in columns" :key="column.key">
                {{ item[column.key] }}
              </div>
            </div>
          </template>
          <template v-else>
            <slot name="empty">
              <div class="v-table__empty">No items found ...</div>
            </slot>
          </template>
        </div>
      </div>
    </div>
    <UiPagination
      class="v-table__pagination"
      :currentPage="currentPage"
      :perPage="paginationView.perPage"
      :totalCount="paginationView.totalCount"
      @changePage="(page) => emit('update:currentPage', page)"
    />
  </div>
</template>

<script setup lang="ts">
import VTableHeader from './VTableHeader.vue'
import VTableFilter from './VTableFilter.vue'
import UiPagination from '../ui/UiPagination.vue'

export interface IItem {
  [key: string]: any
}

export interface IFilterView {
  key: string
  placeholder: string
}

interface Props {
  columns: { key: string; title: string | number }[]
  items: IItem[]
  filtersView?: IFilterView[]
  paginationView: {
    perPage: number
    totalCount: number
  }
  currentPage: number
  sortColumn: string
  sortDirection: 'asc' | 'desc'
  filters: any
}

defineProps<Props>()
const emit = defineEmits(['update:filterValue', 'update:currentPage', 'clickRow', 'clickSortKey'])
</script>

<style scoped lang="scss">
.v-table {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &__responsive {
    overflow-x: auto;
  }
  &__inner {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 800px;
  }
  &__body {
    &-row {
      display: flex;
      align-items: center;
      background-color: #eeeeee;
      cursor: pointer;
    }

    &-item {
      padding: 18px 0;
      text-align: center;
      flex-basis: 20%;
      flex-grow: 1;
    }
  }
  &__filter {
    margin-bottom: 35px;
  }

  &__pagination {
    margin-top: auto;
    padding-top: 45px;
  }

  &__empty {
    text-align: center;
    margin-top: 35px;
  }
}
</style>
