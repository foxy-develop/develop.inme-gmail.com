<template>
  <div class="main__content">
    <Section :title="currentType + ' упоминания за ' + currentDate" :navBtn="true" full isStart >
      <template v-slot:side>
        <TotalCounter
          :to="isCurrentLoaded ? getCurrentData.length : 0"
          :type="getType"
        />
      </template>
      <template v-slot:content>
        <BlockList :load="isCurrentLoaded" load>
          <List :load="isCurrentLoaded"
                :dataList="getCurrentData"
                :time="true"
                :type="setType"/>
        </BlockList>
      </template>
    </Section>
  </div>
</template>

<script>
    import Section from "../components/layout/Section";
    import BlockList from "../components/layout/BlockList";
    import List from "../components/list";
    import { mapActions, mapGetters } from "vuex";
    import TotalCounter from "../components/counters/TotalCounter";

    export default {
      name: "Current",
      components: {
        TotalCounter,
        Section, BlockList, List
      },
      metaInfo: {
        title: "Упоминания за период",
        titleTemplate: "%s | ArtDock Client Panel"
      },
      methods: {
        ...mapActions(["CURRENT_REQUEST"]),
      },
      async mounted() {
        this.CURRENT_REQUEST({
          type: this.$route.params.type,
          period: this.$route.params.date
        });
      },
      computed: {
        ...mapGetters(["isCurrentLoaded", "getCurrentData"]),

        currentType() {
          return this.$route.params.type === "negative"
            ? "Негативные"
            : "Приемлимые";
        },
        setType() {
          return this.$route.params.type;
        },
        getType() {
          return this.$route.params.type;
        },
        currentDate() {
          const date = this.$route.params.date;
          if (date.includes(":")) {
            return (
              parseFloat(date) +
              ":00 - " +
              (parseFloat(date) + 1) +
              ":00 " +
              " сегодня"
            );
          }
          return date;
        }
      }
    }
</script>

<style scoped>

</style>
