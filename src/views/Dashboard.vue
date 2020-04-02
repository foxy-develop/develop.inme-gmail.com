<template>
  <div class="main__content">
    <Section :title="'Результаты поиска'">
      <template v-slot:side>
        <ChartCounter v-for="(val, key) in countersData" :counters="val" :type="key"/>
      </template>
      <template v-slot:content>
        <Block>
          <line-chart
            v-if="preload"
            chart-id="main-chart"
            ref="lineChart"
            :chartData="getChartData"
            :theme="getProfile.theme"
            :positive="getChartFilters.positive"
            :negative="getChartFilters.negative"
          ></line-chart>
        </Block>
      </template>
    </Section>
  </div>
</template>

<script>
import Section from "../components/layout/Section";
import ChartCounter from "../components/counters/ChartCounter";
import Block from "../components/layout/Block";
import { mapGetters, mapActions } from "vuex";

const LineChart = () => import(/* webpackChunkName: "LineChart" */"../components/charts/LineChart");

export default {
  name: 'Dashboard',
  components: {
    Section, ChartCounter, Block, LineChart
  },
  data() {
    return {
      preload: false
    }
  },
  methods: {
    ...mapActions(['DATA_REQUEST'])
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
    ...mapGetters(['getChartData', "getChartFilters", "isChartDataLoaded", "getProfile"]),
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
