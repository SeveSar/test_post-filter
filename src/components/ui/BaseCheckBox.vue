<template>
  <label class="base-checkbox" :class="classes">
    <input
      type="checkbox"
      class="base-checkbox__control"
      :value="value"
      :disabled="disabled"
      @change="onChange"
      :checked="isChecked"
    />

    {{ label }}
  </label>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: null as unknown as PropType<string[] | boolean>,
      default: null,
      validator: (v: any) => typeof v === 'boolean' || Array.isArray(v)
    },
    value: {
      type: null as unknown as PropType<string | boolean>,
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
    const onChange = (event: Event) => {
      const elem = event.target as HTMLInputElement
      let isChecked = elem.checked
      if (props.modelValue instanceof Array && typeof props.value !== 'boolean') {
        let newValue = [...props.modelValue]
        if (isChecked) {
          newValue.push(props.value)
        } else {
          newValue.splice(newValue.indexOf(props.value), 1)
        }
        emit('update:modelValue', newValue)
      } else {
        emit('update:modelValue', isChecked ? true : false)
      }
    }
    const isChecked = computed(() => {
      if (props.modelValue instanceof Array && typeof props.value !== 'boolean') {
        return props.modelValue.includes(props.value)
      }
      return props.modelValue === true
    })

    const classes = computed(() => {
      return {
        'base-checkbox--active': isChecked.value,
        [`base-checkbox--${props.size}`]: true
      }
    })
    return {
      onChange,
      isChecked,
      classes
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
}
</style>
