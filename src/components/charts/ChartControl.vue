<template>
  <transition-group appear tag="div" class="chart-control" name="reveal-animate--top">
    <span
      key="negative"
      :class="[
        'chart-control__info',
        'chart-control__info--danger',
        { 'chart-control__info--hidden': !getChartFilters.negative }
      ]"
      @click="switchFilter('negative', 'chart-control__info--danger')"
    >
      Негативные
    </span>
    <span
      key="positive"
      :class="[
                'chart-control__info',
                'chart-control__info--normal',
                { 'chart-control__info--hidden': !getChartFilters.positive }
              ]"
      @click="switchFilter('positive', 'chart-control__info--normal')"
    >
      Приемлимые
    </span>
  </transition-group>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "ChartControl",
    methods: {
      ...mapActions(['DATA_FILTER']),

      switchFilter(filter) {
        this.DATA_FILTER({ type: filter });
      },
    },
    computed: {
      ...mapGetters(['getChartFilters'])
    }
  }
</script>

<style scoped lang="scss">
.chart-control {
  flex-direction: row;
  display: flex;
  font-family: "Rubik", sans-serif;
  font-size: 1rem;
  line-height: 2;
  letter-spacing: 0.416667px;
  color: var(--text_inv);
  text-transform: uppercase;
  transition: 0.3s ease-in-out;

  &__info {
    margin: auto 0 auto 3rem;
    position: relative;
    display: flex;
    cursor: pointer;


    &:last-child {
      margin: auto 0 auto 5.2rem;
    }

    &:before {
      position: absolute;
      left: -2.5rem;
      content: "";
      transform: translateY(-50%);
      top: 50%;
      border: var(--positive) 0.4rem solid;
      border-radius: 100%;
      height: 1.2rem;
      width: 1.2rem;
      transition: 0.3s ease-in-out;
    }

    &--hidden {
      text-decoration: line-through;
    }

    &--danger {
      &:before {
        border-color: var(--negative);
      }
    }
  }
}
</style>
