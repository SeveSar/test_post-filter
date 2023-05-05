<template>
  <div class="card-filter">
    <form class="card-filter__form">
      <div class="card-filter__search">
        <BaseInput
          class="card-filter__control"
          type="text"
          placeholder="Введите ЖК / корпус / № квартиры / № паркинга"
          v-model="searchInput"
        >
          <template #action>
            <button class="card-filter__search-btn">
              <IconLoupe />
            </button>
          </template>
        </BaseInput>
      </div>
      <div class="card-filter__actions">
        <BaseCheckBox v-model="isChecked" value="all" label="все" size="small" />
        <button class="card-filter__remove" type="button" @click="$emit('remove')">
          Удалить
          <IconTrash class="card-filter__remove-icon" />
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import BaseCheckBox from '../ui/BaseCheckBox.vue'
import IconTrash from '../icons/IconTrash.vue'
import IconLoupe from '../icons/IconLoupe.vue'
import BaseInput from '../ui/BaseInput.vue'

export default defineComponent({
  emits: ['onSearch', 'toggle-all', 'remove'],
  props: {
    searchFilter: {
      type: String
    }
  },
  components: {
    BaseCheckBox,
    IconTrash,
    IconLoupe,
    BaseInput
  },
  setup(props, { emit }) {
    const isChecked = ref(false)
    const searchInput = ref('')

    watch(isChecked, (val) => {
      emit('toggle-all', val)
    })

    watch(searchInput, (val) => {
      emit('onSearch', val)
    })
    return {
      isChecked,
      searchInput
    }
  }
})
</script>

<style scoped lang="scss">
.card-filter {
  &__actions {
    display: flex;
    align-items: center;
  }

  &__search {
    position: relative;
    margin-bottom: 29px;

    &-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 32px;
      display: inline-flex;
      padding: 6px;
      color: $gray-dark-color;
    }
  }

  &__control {
  }

  &__remove {
    display: flex;
    align-items: center;
    background-color: #e5e5e5;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: $dark-color;
    padding: 5px 13px;
    min-width: 101px;
    margin-left: 13px;

    &-icon {
      margin-left: 12px;
    }
  }
}
</style>
