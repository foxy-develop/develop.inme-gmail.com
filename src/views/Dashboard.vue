<template>
  <div class="main__content">
    <Section :title="'Результаты поиска'">
      <template v-slot:side>
        <ChartCounter v-for="(val, key) in countersData" :counters="val" :type="key"/>
      </template>
      <template v-slot:content>
        <Block>
          <template v-slot:header>
            <PeriodSwitcher
              :current="getPeriod"
              :name="'chart'"
              :callback="DATA_SWITCH"
            ></PeriodSwitcher>
          </template>
          <template v-slot:content>
            <line-chart
              v-if="preload"
              chart-id="main-chart"
              ref="lineChart"
              :chartData="getChartData"
              :theme="getProfile.theme"
              :positive="getChartFilters.positive"
              :negative="getChartFilters.negative"
            ></line-chart>
          </template>
          <template v-slot:legend>
            <ChartControl></ChartControl>
          </template>
          <template v-slot:button>
            <Button :isRoute="true" :route="'mentions'">Результаты поиска</Button>
          </template>
        </Block>
      </template>
    </Section>
  </div>
</template>

<script>
import Section from "../components/layout/Section";
import ChartCounter from "../components/counters/ChartCounter";
import ChartControl from "../components/charts/ChartControl";
import Button from "../components/layout/Button";
import Block from "../components/layout/Block";
import { mapGetters, mapActions } from "vuex";
import PeriodSwitcher from "../components/period-swicther"
const LineChart = () => import(/* webpackChunkName: "LineChart" */"../components/charts/LineChart");

export default {
  name: 'Dashboard',
  components: {
    Section, ChartCounter, Block, LineChart, PeriodSwitcher, ChartControl, Button
  },
  data() {
    return {
      preload: false
    }
  },
  methods: {
    ...mapActions(['DATA_REQUEST', 'DATA_SWITCH'])
  },
  async mounted() {
    if (!this.isChartDataLoaded) {
      this.DATA_REQUEST().then(() => {
        this.preload = true;
      });
    } else {
      this.preload = true;
    }
  },
  computed: {
    ...mapGetters(['getChartData', "getChartFilters", "isChartDataLoaded", "getProfile", "getPeriod" ]),
    countersData: function() {
      const data = this.getChartData;
      return {
        positive: data.positive.total,
        negative: data.negative.total
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
