<template>
  <div class="card-header">
    <div class="card-header__content">
      <div class="card-header__price">{{ price }} руб.</div>
      <div
        class="card-header__type"
        tabindex="1"
        v-if="typeSale"
        :class="[`card-header__type--${typeSale.value}`]"
      >
        <component class="card-header__type-icon" :is="TYPE_SALE_ICONS[typeSale.value]"></component>
        {{ typeSale.title }}
        <div class="card-header__type-tooltip">
          {{ typeSale.tooltip }}
        </div>
      </div>
    </div>
    <div class="card-header__status" :class="[`card-header__status--${status.value}`]">
      <div class="card-header__status-dot"></div>
      {{ status.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, type Component } from 'vue'
import IconCart from '@/components/icons/IconCar.vue'
import IconFlat from '@/components/icons/IconFlat.vue'

import type { ITypeSale, IStatus, TypeSaleValue } from '@/models/CardSale'

export default defineComponent({
  props: {
    price: {
      type: String,
      defafult: '100'
    },
    typeSale: {
      type: Object as PropType<ITypeSale>,
      default: null
    },
    status: {
      type: Object as PropType<IStatus>,
      required: true
    }
  },
  setup() {
    const TYPE_SALE_ICONS: Record<TypeSaleValue, Component> = {
      parking: IconCart,
      flat: IconFlat
    } as const

    return {
      TYPE_SALE_ICONS
    }
  }
})
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;

  align-items: center;
  column-gap: 25px;
  &__content {
    display: flex;
    align-items: center;
    column-gap: 57px;

    @include xl() {
      column-gap: 16px;
    }
  }

  &__price {
    font-weight: 700;
    font-size: 15px;
    line-height: 20px;
    color: $danger-color;
    white-space: nowrap;
  }

  &__type {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    padding: 5px 24px;
    background: $snow-color;
    box-shadow: 0px 0px 2px rgba(94, 119, 157, 0.25);
    border-radius: 32px;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    &-icon {
      margin-right: 12px;
      width: 18px;
      height: 11.5px;
      color: $danger-color;
    }

    &-tooltip {
      font-weight: 400;
      font-size: 13px;
      color: $snow-color;
      position: absolute;
      background: rgba(#2d2d2d, 0.7);
      box-shadow: 0px 8px 30px -3px rgba(26, 32, 44, 0.1), 0px 4px 6px -2px rgba(26, 32, 44, 0.05);
      top: 100%;
      transform: translateY(10px);
      padding: 12px 25px;
      left: 47px;
      width: max-content;
      opacity: 0;
      transition: all 0.2s linear;
      visibility: hidden;

      &::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 11.5px 8px 11.5px;
        border-color: transparent transparent rgba(#2d2d2d, 0.7) transparent;
        bottom: 100%;
        left: 30px;
      }
    }

    &:hover,
    &:focus {
      .card-header__type-tooltip {
        visibility: visible;
        opacity: 1;
      }
    }

    &--flat {
      .card-header__type-icon {
        color: #808080;
      }
    }
  }

  &__status {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    padding: 6px 9px;
    position: relative;
    display: flex;
    justify-self: end;
    align-items: center;

    &-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 8px;
    }

    &--juristic {
      color: $danger-dark-color;
      background-color: $danger-light-color;

      .card-header__status-dot {
        background-color: $danger-dark-color;
      }
    }

    &--physical {
      color: $azure-color;
      background-color: $azure-light-color;

      .card-header__status-dot {
        background-color: $azure-color;
      }
    }

    &--booked {
      color: #686868;
      background-color: #ededed;

      .card-header__status-dot {
        background-color: #686868;
      }
    }
  }
}
</style>
