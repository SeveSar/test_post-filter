<template>
  <div class="card-sale">
    <div class="card-sale__check">
      <BaseCheckBox v-model="checkedValue" value="card" />
    </div>
    <div class="card-sale__content">
      <CardSaleHeader
        :address="cardSale.address"
        :price="cardSale.price"
        :status="cardSale.status"
        :type-sale="cardSale.typeSale"
      />
      <CardSaleBody
        :address="cardSale.address"
        :params="cardSale.params"
        :street="cardSale.street"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import CardSaleHeader from './CardSaleHeader/CardSaleHeader.vue'
import CardSaleBody from './CardSaleBody/CardSaleBody.vue'

import type { ICardSaleInfo } from '@/models/CardSale'
import BaseCheckBox from '@/components/ui/BaseCheckBox.vue'

export default defineComponent({
  components: {
    CardSaleHeader,
    CardSaleBody,
    BaseCheckBox
  },
  emits: ['update:checkbox'],
  props: {
    cardSale: {
      type: Object as PropType<ICardSaleInfo>,
      required: true
    },
    isChecked: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const checkedValue = computed({
      get() {
        return props.isChecked
      },
      set(value) {
        emit('update:checkbox', value)
      }
    })
    return {
      checkedValue
    }
  }
})
</script>

<style scoped lang="scss">
.card-sale {
  background-color: $snow-color;
  border: 1px solid #e5e5e5;
  padding: 21px 35px 25px;
  width: 100%;
  display: flex;
  align-items: center;

  @include xl() {
    padding-right: 0;
    padding-left: 25px;
  }

  &__check {
    margin-right: 34px;

    @include xl() {
      margin-right: 25px;
    }
  }
  &__content {
    flex-grow: 1;
  }
}
</style>
