<template>
  <ul class="chart-counters">
    <li
      v-for="(value, index) in countersData "
      :class="['chart-counters__item', {'chart-counters__item--danger' : isNegative }]">
      <number
        class="chart-counters__num"
        :key="index"
        :from="0"
        :to="value"
        :duration="1"
        easing="Power3.easeIn"
      >
      </number>
      <span class="chart-counters__name" v-text="index != 'links' ? 'Сайтов' : 'Страниц'"></span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ChartCounter",
  props: {
    type: {
      type: String,
      default: 'positive'
    },
    counters: {
      type: Object,
      default: () => {
        return {
          domains: 0,
          links: 0
        }
      }
    },
  },
  computed: {
    countersData: function() {
      return {
        domains: this.counters.domains,
        links: this.counters.links
      }
    },
    isNegative() {
      return this.type === 'negative'
    }
  }
}
</script>

<style scoped lang="scss">
  .chart-counters {
    flex-direction: row;
    display: flex;
    flex-shrink: 0;
    margin: 0;
    padding-left: 2.5rem;
    @include tablet-sm {
      padding: 1.5rem 2.5rem;
    }
    @include desktop {
      flex-direction: column;
      padding-left: 3rem
    }
    &__item {
      flex-direction: column;
      display: flex;
      flex-shrink: 0;
      align-items: flex-start;
      padding: 1.5rem;

      &--danger {
        .chart-counters__num:before {
          background: var(--negative);
        }
      }
    }
    &__num {
      display: flex;
      font-family: "Rubik", sans-serif;
      font-weight: 500;
      font-size: 4rem;
      line-height: 4rem;
      color: var(--text);
      margin-bottom: 0.5rem;
      position: relative;
      transition: 0.3s ease-in-out;
      @include tablet {
        font-size: 5rem;
      }

      &:before {
        content: "";
        position: absolute;
        left: -2rem;
        width: 1.2rem;
        height: 1.2rem;
        transform: translateY(-50%);
        top: 50%;
        border-radius: 100%;
        background: var(--positive);
        box-shadow: -2px 3px 7px rgba(11, 45, 55, 0.12);
      }

    }
    &__name {
      line-height: 1.25;
      color: var(--text);
      opacity: 0.5;
      transition: 0.3s ease-in-out;
    }
  }
</style>
