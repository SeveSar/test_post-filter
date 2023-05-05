<template>
  <div class="cards">
    <CardFilter
      class="cards__filter"
      @toggle-all="selectAll"
      @remove="removeItems"
      @onSearch="(val) => (searchFilter = val)"
    />

    <div class="cards__inner">
      <div class="cards__col" v-for="item in filteredCards" :key="item.id">
        <CardSale
          class="cards__item"
          :card-sale="item.info"
          :isChecked="item.isChecked"
          @update:checkbox="(value) => updateCheckbox(item.id, value)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import CardSale from '@/components/cards/CardSale/CardSale.vue'
import type { ICardSale } from '@/models/CardSale'
import CardFilter from '@/components/CardFilter/CardFilter.vue'
export default defineComponent({
  components: {
    CardSale,
    CardFilter
  },
  setup() {
    const cardsSale = ref<ICardSale[]>([
      {
        id: 1,
        isChecked: false,
        info: {
          address: {
            corps: 'корпус 10, III кв. 2022 г.',
            address: 'Чистое небо'
          },
          price: '7 733 300',
          typeSale: {
            title: 'Квартира',
            value: 'flat',
            tooltip: 'Квартира'
          },
          status: {
            title: 'Уступка от юр. лица',
            value: 'juristic'
          },
          params: {
            nomer: 'кв.62',
            area: '234.38 м²',
            rooms: '1 комн. кв.',
            floor: '7 этаж'
          },
          street: 'Лен. область, Всеволожский район, д. Кудрово, ул. Столичная, д. 5, к. 1'
        }
      },
      {
        id: 2,
        isChecked: true,
        info: {
          address: {
            corps: 'корпус 10, III кв. 2022 г.',
            address: 'Зеленый квартал на Пулковских высотах'
          },
          price: '7 733 300',

          status: {
            title: 'Уступка от физ. лица',
            value: 'physical'
          },
          params: {
            nomer: 'кв.62',
            area: '234.38 м²',
            rooms: '1 комн. кв.',
            floor: '7 этаж'
          },
          street: 'Комендантский пр., уч. 1 Каменка'
        }
      },
      {
        id: 3,
        isChecked: false,
        info: {
          address: {
            corps: 'корпус 10, III кв. 2022 г.',
            address: 'Зеленый квартал на Пулковских высотах'
          },
          price: '800 300',
          typeSale: {
            title: 'Паркинг',
            value: 'parking',
            tooltip: 'Подземная встроенно-пристроенная'
          },
          status: {
            title: 'Забронировано',
            value: 'booked'
          },
          params: {
            nomer: '№ 7-10-2 (ПИБ №68)',
            area: '15 м²'
          },
          street: 'Ленинградская область, Всеволожский район, д. Кудрово, ул. Столичная, д. 5, к. 1'
        }
      },
      {
        id: 4,
        isChecked: false,
        info: {
          address: {
            corps: 'корпус 10, III кв. 2022 г.',
            address: 'Зеленый квартал на Пулковских высотах'
          },
          price: '800 300',
          typeSale: {
            title: 'Паркинг',
            value: 'parking',
            tooltip: 'Подземная встроенно-пристроенная'
          },
          status: {
            title: 'Забронировано',
            value: 'booked'
          },
          params: {
            nomer: '№ 7-10-2 (ПИБ №68)',
            area: '15 м²'
          },
          street: 'Лен. область, Всеволожский район, д. Кудрово, ул. Столичная, д. 5, к. 1'
        }
      }
    ])

    const searchFilter = ref('')

    const updateCheckbox = (id: number, value: boolean) => {
      const idx = cardsSale.value.findIndex((item) => item.id === id)
      if (idx === -1) return
      cardsSale.value[idx].isChecked = value
    }

    const selectAll = (val: boolean) => {
      cardsSale.value.forEach((item) => {
        item.isChecked = val
      })
    }

    const removeItems = () => {
      cardsSale.value = cardsSale.value.filter((item) => !item.isChecked)
    }

    const filteredCards = computed(() => {
      return cardsSale.value.filter((item) => {
        const { area, nomer } = item.info.params
        const { corps } = item.info.address
        return [area, nomer, corps].some((val) => {
          return val.toLocaleLowerCase().includes(searchFilter.value.toLocaleLowerCase())
        })
      })
    })
    return {
      cardsSale,
      updateCheckbox,
      selectAll,
      removeItems,
      searchFilter,
      filteredCards
    }
  }
})
</script>

<style scoped lang="scss">
.cards {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  &__filter {
    margin-bottom: 29px;
  }

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px 23px;

    @include xl() {
      gap: 23px;
    }

    @include lg() {
      grid-template-columns: 1fr;
    }
  }
  &__col {
    display: flex;
    flex-direction: column;
  }

  &__item {
    flex-grow: 1;
  }
}
</style>
