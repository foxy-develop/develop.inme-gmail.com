<template>
  <Section :title="'География выдачи'" reversed :loading="loading">
    <template v-slot:side>
      <MapCounters v-if="!loading" :data="sortArray" />
    </template>
    <template v-slot:content>
      <Block responsive :loading="loading">
        <template v-slot:header>
          <PeriodSwitcher
            :current="getMapPeriod"
            :name="'map'"
            :callback="MAP_SWITCH"
          ></PeriodSwitcher>
        </template>
        <template v-slot:content>
          <ChartMap :data="getMapData" key="content" v-if="!loading"></ChartMap>
        </template>
        <template v-slot:button>
          <Button :isRoute="true" :route="'negative'">Просмотреть негатив</Button>
        </template>
      </Block>
    </template>
  </Section>
</template>

<script>
import Section from "../layout/Section";
import Button from "../layout/Button";
import Block from "../layout/Block";
import { mapGetters, mapActions } from "vuex";
import PeriodSwitcher from "../period-swicther";
import ChartMap from "../map"
import MapCounters from "../counters/MapCounters";
export default {
  name: "DashboardMap",
  components: {
    Section, Block, Button, PeriodSwitcher, ChartMap, MapCounters
  },
  data() {
    return {
      loading: true
    }
  },
  async mounted() {
    this.loading = true;
    if (!this.isMapLoaded) {
      await this.MAP_REQUEST().then(() => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  },
  methods: {
    ...mapActions(['MAP_REQUEST', 'MAP_SWITCH']),
    loaded() {
      this.$emit('loaded', this.loading);
    }
  },
  computed: {
    ...mapGetters(['getMapPeriod', 'getMapData', 'isMapLoaded']),
    sortArray() {
      const arr = this.getMapData;
      const newArr = arr
        .slice()
        .sort((a, b) =>
          a.value_negative === parseFloat(b.value_negative)
            ? 0
            : parseFloat(a.value_negative) < parseFloat(b.value_negative)
            ? 1
            : -1
        );

      return newArr
        .filter(el => el.value_negative != 0 || el.value != 0).slice(0, 10);

    }
  },
  watch: {
    loading() {
      this.loaded();
    }
  }
}
</script>

<style scoped>

</style>
