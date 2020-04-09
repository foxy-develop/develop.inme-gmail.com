<template>
  <div class="main__content">
    <Section :title="'Результаты поиска за сегодня'" :navBtn="true" full isStart>
      <template v-slot:side>
        <MentionsCounter />
      </template>
      <template v-slot:content>
        <MentionsFilter v-if="filterLoaded"/>
        <transition appear name="reveal__block" >
          <BlockList :load="filterLoaded && isDataLoaded">
            <List :load="filterLoaded && isDataLoaded" :dataList="getMentions" />
          </BlockList>
        </transition>
      </template>
    </Section>
  </div>
</template>

<script>
  import Section from "../components/layout/Section";
  import BlockList from "../components/layout/BlockList";
  import MentionsFilter from "../components/filters/mentions-filter"
  import MentionsCounter from "../components/counters/MentionsCounter";
  import List from "../components/list";
  import { mapActions, mapGetters } from "vuex";
  import {MENTIONS_REQUEST} from "../store/actions/mentions";

  export default {
    name: "Mentions",
    components: {
      Section, MentionsCounter, BlockList, MentionsFilter, List
    },
    data() {
      return {
        filterLoaded: false
      }
    },
    metaInfo: {
      title: "Результаты поиска за сегодня",
      titleTemplate: "%s | ArtDock Client Panel"
    },
    methods: {
      ...mapActions(['MENTIONS_REQUEST', 'MENTIONS_FILTER_REQUEST'])
    },
    computed: {
      ...mapGetters(['isFilter', 'getMentions', 'isDataLoaded'])
    },
    async created() {
      this.MENTIONS_REQUEST();
      await this.MENTIONS_FILTER_REQUEST();
      this.filterLoaded = true;
    }
  }
</script>
<style lang="scss">

  .reveal__block {
    &-leave-active {
      transition: .35s ease-out;
    }
    &-enter-active {
      transition: .35s ease-in;
      transition-delay: 150ms;
    }
    &-enter, &-leave-to {
      opacity: 0;
      transform: translate(3.5rem, 0);
    }
  }
</style>
