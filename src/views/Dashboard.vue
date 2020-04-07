<template>
  <div class="main__content">
    <DashboardChart @loaded="chartLoadingState" />
    <DashboardMap @loaded="mapLoadingState" />
  </div>
</template>

<script>
const DashboardMap = () => import(/* webpackChunkName: "DashboardMap" */"../components/dashboard-blocks/dashboard-map");
import DashboardChart from "../components/dashboard-blocks/dashboard-chart";

export default {
  name: 'Dashboard',
  components: {
    DashboardChart, DashboardMap
  },
  data() {
    return {
      loading: {
        chart: true,
        map: true
      }
    }
  },
  metaInfo: {
    title: "Главная",
    titleTemplate: "%s | ArtDock Client Panel"
  },
  methods: {
    chartLoadingState(loading) {
      this.loading.chart = loading;
    },
    mapLoadingState(loading) {
      this.loading.map = loading;
    }
  },
  computed: {
    isLoaded() {
      let loaded = true;
      for (let key in this.loading) {
        if ( this.loading[key] ) {
          loaded = false
        }
      }
      return loaded
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
