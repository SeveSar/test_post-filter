<template>
  <div class="card-body">
    <div class="card-body__col">
      <div class="card-body__place">
        <span class="card-body__place-address"> {{ address.address }} </span>,
        <span class="card-body__place-corps">
          {{ address.corps }}
        </span>
      </div>
      <div
        class="card-body__params"
        :class="{ 'card-body__params--small': Object.keys(params).length <= 2 }"
      >
        <div class="card-body__params-caption">{{ params.nomer }}</div>
        <div class="card-body__params-caption">{{ params.area }}</div>
        <div class="card-body__params-caption" v-if="params.rooms">{{ params.rooms }}</div>
        <div class="card-body__params-caption" v-if="params.floor">{{ params.floor }}</div>
      </div>
      <div class="card-body__address">
        {{ street }}
      </div>
    </div>

    <div class="card-body__col">
      <div class="card-body__image">
        <img src="/images/flat.png" alt="" />
      </div>
      <div class="card-body__date">
        <span class="card-body__date-text"> Добавлено </span>
        <span class="card-body__date-date"> 21/11/2020 </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { IAddress, IParams } from '@/models/CardSale'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    address: {
      type: Object as PropType<IAddress>,
      required: true
    },
    params: {
      type: Object as PropType<IParams>,
      required: true
    },
    street: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="scss">
.card-body {
  display: flex;
  align-items: flex-end;
  margin-top: 5px;

  &__col {
    &:first-child {
      width: 65%;
      padding-right: 25px;
      @include xl() {
        // width: 65%;
      }
    }

    &:last-child {
      width: 35%;

      @include xl() {
        padding-right: 25px;
        // width: 35%;
      }
    }
  }

  &__image {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    img {
      width: 100%;
      height: auto;
    }
  }

  &__date {
    color: $gray-dark-color;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    justify-content: space-between;
    margin-top: 10px;

    &-text {
      padding-right: 3px;
    }
  }

  &__place {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    max-width: 230px;
    width: 100%;
    &-corps {
      color: #808080;
    }
  }

  &__params {
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    color: $dark-color;
    margin-top: 35px;
    display: grid;
    grid-template-columns: max-content max-content;
    position: relative;
    column-gap: 40px;
    width: max-content;

    @include xl() {
      margin-top: 13px;
    }

    &::before {
      content: '';
      position: absolute;
      background-color: #c4c4c4;
      width: 1px;
      height: 100%;
      left: calc(50%);
      transform: translateX(-50%);
    }

    &--small {
      &::before {
        left: calc(50% + 50px);
      }
    }
  }

  &__address {
    margin-top: 16px;
    font-weight: 400;
    font-size: 14px;
    color: $dark-color;
    max-width: 296px;
    width: 100%;
    line-height: 150%;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -20px;
      width: 12.77px;
      height: 13px;
      background-image: url('/images/geo.svg');
      background-position: center;
      background-repeat: no-repeat;
      top: 4px;
    }
  }
}
</style>
