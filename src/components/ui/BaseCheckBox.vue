<template>
  <label class="base-checkbox" :class="classes">
    <input
      type="checkbox"
      class="base-checkbox__control"
      :value="value"
      :disabled="disabled"
      :checked="isChecked"
      v-model="model"
    />

    {{ label }}
  </label>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: [Boolean, Array],
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<'small' | 'medium'>,
      default: 'medium'
    }
  },
  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
      }
    })
    const isChecked = computed(() => {
      if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value)
      }
      return props.modelValue === true
    })

    const classes = computed(() => {
      return {
        'base-checkbox--active': isChecked.value,
        [`base-checkbox--${props.size}`]: true,
        [`base-checkbox--text`]: props.label
      }
    })
    return {
      isChecked,
      classes,
      model
    }
  }
})
</script>

<style scoped lang="scss">
.base-checkbox {
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  position: relative;
  padding-left: 24px;
  cursor: pointer;

  @include xl() {
    padding-left: 16px;
  }

  &:before {
    content: '';
    border: 1px solid #c4c4c4;
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: 1px;
  }

  &--active {
    &::before {
      background-color: $warn-color;
      background-image: url('/images/tickBig.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &__control {
    display: none;
  }

  &--medium {
    &::before {
      width: 22.36px;
      height: 16px;
      @include xl() {
        width: 16px;
      }
    }
    &.base-checkbox--active {
      @include xl() {
        &::before {
          background-image: url('/images/tickSmall.svg');
        }
      }
    }
  }

  &--small {
    &::before {
      width: 16px;
      height: 16px;
    }

    &.base-checkbox--active {
      &::before {
        background-image: url('/images/tickSmall.svg');
      }
    }
  }

  &--text {
    @include xl() {
      padding-left: 24px;
    }
  }
}
</style>
