<template>
  <transition-group appear tag="div" class="filters" name="filters__animate">
    <div key="keywords" class="filters__item">
        <Dropdown
          :type="'keywords'"
          :options="getFilter.keywords"
          :selected="getFilterState('keywords')[0] || ''"
          v-on:updateOption="updateSelectedKeywords"
          :placeholder="'Ключевое слово'"
        >
        </Dropdown>
    </div>
    <div key="top" class="filters__item">
        <Dropdown
          :options="getFilter.limit_options"
          :type="'top'"
          :selected="getFilterState('limit_options')[0]"
          v-on:updateOption="updateSelectedTop"
          :placeholder="'ТОП'"
        >
        </Dropdown>
    </div>
    <div key="countries" class="filters__item">
        <Dropdown
          :options="getFilter.countries"
          :type="'country'"
          :selected="getFilterState('countries')[0] || getFilter.countries[0]"
          v-on:updateOption="updateSelectedCountry"
          :placeholder="'Страна'"
        >
        </Dropdown>
    </div>
  </transition-group>
</template>

<script>
import Dropdown from "../dropdown";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MentionsFilter",
  components: {
    Dropdown
  },
  data() {
    return {
      data: "",
      per_page: "",
      country: "",
      keywords: ""
    }
  },
  methods: {
    ...mapActions(["MENTIONS_CHANGE_FILTER"]),
    saveFilter() {
      const options = {
        keywords: this.keywords,
        limit_options: this.per_page,
        countries: this.country
      };
      this.MENTIONS_CHANGE_FILTER({ options });
    },

    updateSelectedCountry(payload) {
      this.country = payload.id;
    },

    updateSelectedTop(payload) {
      this.per_page = payload.id;
    },

    updateSelectedKeywords(payload) {
      this.keywords = payload.id;
    }
  },
  computed: {
    ...mapGetters(["getFilterState", "getFilter", "isDataLoaded"]),
    countryFlag() {
      const stateFilter = this.getFilterState("countries")[0];
      if (stateFilter) {
        return stateFilter.title_short.toLowerCase();
      } else {
        return this.getFilter.countries[0].title_short.toLowerCase();
      }
    }
  },
  watch: {
    keywords: function() {
      this.saveFilter();
    },
    per_page: function() {
      this.saveFilter();
    },
    country: function() {
      this.saveFilter();
    }
  }
}
</script>

<style lang="scss">
  .filters {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    font-family: "Rubik", sans-serif;
    position: relative;
    margin-bottom: 25px;
    background: var(--el_bg);
    box-shadow: 0px 1px 8px rgba(20, 46, 110, 0.1);
    padding: 0;
    border-radius: 8px;
    transition: 0.3s ease-in-out;
    z-index: 150;

    &__animate {

      &-leave-active {
        transition: .2s ease-out;
        @for $i from 1 through 5 {
          &:nth-last-child(#{$i}) {
            transition-delay: $i * 100ms;
          }
        }
      }
      &-enter-active {
        transition: .3s ease-in;
        @for $i from 1 through 5 {
          &:nth-child(#{$i}) {
            transition-delay: $i * 100ms;
          }
        }
      }

      &-enter, &-leave-to {
        opacity: 0;
        transform: translate(3.5rem, 0);
      }
    }

    &__item {
      width: 100%;
      max-width: calc(100% / 3);
      @include tablet {
        margin-bottom: 2.5rem;
        margin-right: 1.5rem;
        max-width: calc( (100% - 3rem) / 3);
        &:last-child {
          margin-right: 0;
        }
      }
    }
    @include tablet {
      margin-bottom: 0;
      box-shadow: none;
      background: rgba(255, 255, 255, 0);
      justify-content: space-between;
      padding: 0;
    }
  }
</style>
