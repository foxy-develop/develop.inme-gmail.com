<template>
  <div class="main__content">
    <Section :title="'Негативные упоминания'" :navBtn="true" isStart full isSideFilters>
      <template v-slot:side>
        <TotalCounter
          :to="isNegativeLoaded ? getCount : 0"
          :type="'negative'"
        />
        <transition-group tag="div" appear class="negative__filter" name="reveal-animate--right" v-if="isMobile && isMapLoaded">
          <PeriodSwitcher
            key="period"
            :current="getMapPeriod"
            :name="'map'"
            :callback="setPeriod"
          ></PeriodSwitcher>
          <Dropdown
            key="country"
            :options="countries(getMapData)"
            :type="'country'"
            num
            :count="isNegativeLoaded ? getCount : 0"
            :selected="getSelectedCountry(getNegativeFilterState)"
            v-on:updateOption="updateSelectedCountry"
            :placeholder="'Страна'"
          />
        </transition-group>
      </template>
      <template v-slot:control>
        <PeriodSwitcher
          v-if="!isMobile"
          :current="getMapPeriod"
          :name="'map'"
          :callback="setPeriod"
        ></PeriodSwitcher>
      </template>
      <template v-slot:content>
        <BlockList :load="isNegativeLoaded" load>
          <List :load="isNegativeLoaded"
                :dataList="getNegative"
                :type="'negative'"/>
        </BlockList>
      </template>
    </Section>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import PeriodSwitcher from "../components/period-swicther";
  import BlockList from "../components/layout/BlockList";
  import TotalCounter from "../components/counters/TotalCounter";
  import List from "../components/list";
  import Section from "../components/layout/Section";
  import Dropdown from "../components/dropdown";


    export default {
      name: "Negative",
      components: {
        Section, PeriodSwitcher, BlockList, List, TotalCounter, Dropdown
      },
      metaInfo: {
        title: "Негативные упоминания",
        titleTemplate: "%s | ArtDock Client Panel"
      },
      data() {
        return {
          isMobile: false,
          region_search: "",
          period: "",
          isShowSearch: false,
          regions: []
        };
      },
      mounted() {
        this.isMapLoaded || this.MAP_REQUEST();
        this.NEGATIVE_REQUEST(this.getMapPeriod)
      },
      methods: {
        ...mapActions(["NEGATIVE_REQUEST", "MAP_REQUEST", "MAP_SWITCH", "NEGATIVE_FILTER"]),
        updateSelectedCountry(payload) {
          this.NEGATIVE_FILTER({region_id: payload.id, period: this.getMapPeriod})
          this.NEGATIVE_REQUEST(this.getMapPeriod);

        },

        setPeriod(period) {
          this.MAP_SWITCH(period);
          this.NEGATIVE_REQUEST(period);
        },

        handleResize() {
          this.isMobile = window.innerWidth < 1024;
        },

        showSearch() {
          const data = this.getMapData(this.getMapPeriod);
          this.isShowSearch = data.length > 6;
        },
        countries(data) {
          return data.map(el => {
            return {
              id: el.region_id,
              title: el.name,
              title_short: el.id,
              value: el.value_negative
            }
          })
        }
      },
      computed: {
        ...mapGetters([
          "isNegativeLoaded",
          "getNegative",
          "getMapData",
          "getMapPeriod",
          "getCount",
          'getNegativeFilterState',
          "isMapLoaded",
          "getSelectedCountry"
        ]),

      },
      watch: {
        period() {
          this.countries(this.getMapData)
        }
      },
      created() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
      },
      destroyed() {
        window.removeEventListener("resize", this.handleResize);
      },
    }

</script>

<style scoped lang="scss">
  .negative {
    &__filter {
      display: flex;
      width: 100%;
      flex-direction: row;
      height: 4rem;
      border-radius: .8rem;
      justify-content: space-evenly;
      align-items: center;
      position: relative;

      @include tablet {
        height: unset;
        flex-direction: column;
        max-width: 32.6rem;

      }
    }
  }
</style>
