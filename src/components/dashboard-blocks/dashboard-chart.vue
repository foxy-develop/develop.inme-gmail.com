<template>
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
            v-if="!loading"
            chart-id="main-chart"
            ref="lineChart"
            :chartData="getChartData"
            :theme="getProfile.theme"
            :positive="getChartFilters.positive"
            :negative="getChartFilters.negative"
          ></line-chart>
          <LoaderSmall fixed v-else/>
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
</template>

<script>
import Section from "../layout/Section";
import ChartCounter from "../counters/ChartCounter";
import ChartControl from "../charts/ChartControl";
import Button from "../layout/Button";
import Block from "../layout/Block";
import { mapGetters, mapActions } from "vuex";
import PeriodSwitcher from "../period-swicther";
import LoaderSmall from "../loaders/loader-small";
const LineChart = () => import(/* webpackChunkName: "LineChart" */"../charts/LineChart");
export default {
  name: "DashboardChart",
  components: {
    Section, ChartCounter, Block, LineChart, PeriodSwitcher, ChartControl, Button, LoaderSmall
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['DATA_REQUEST', 'DATA_SWITCH']),
    loaded() {
      this.$emit('loaded', this.loading);
    }
  },
  async mounted() {
    this.loading = true;
    if (!this.isChartDataLoaded) {
      this.DATA_REQUEST().then(() => {
        this.loading = false;
      });
    } else {
      this.loading = false;
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
  },
  watch: {
    loading() {
      this.loaded();
    }
  }
}
</script>
