<template>
  <transition-group class="map-counters" tag="ul" name="flip-list">
    <li
      class="map-counters__item"
      v-for="country in data"
      :key="country.id"
      @click="routeTo(country.region_id)"
    >
      <span
        :class="[
          'map-counters__flag flag-icon',
          'flag-icon-' + country.id.toLowerCase()
        ]"
      ></span>
      <span class="map-counters__name"> {{ country.name }} </span>
      <div class="map-counters__nums">
        <number
          class="map-counters__val"
          :from="0"
          :to="country.value"
          :duration="1"
          easing="Power3.easeIn"
        >
        </number>
        <number
          class="map-counters__val map-counters__val--negative"
          :from="0"
          :to="country.value_negative"
          :duration="1"
          easing="Power3.easeIn"
        >
        </number>
      </div>
    </li>
  </transition-group>
</template>

<script>
  import { mapActions } from 'vuex';
  import router from "../../router";

  export default {
    name: "MapCounters",
    props: {
      data: [Array]
    },
    methods: {
      // ...mapActions(["NEGATIVE_FILTER"]),
      routeTo(id) {
        // this.NEGATIVE_FILTER({ region_id: id });
        router.push("/negative/");
      }
    }
  }
</script>

<style scoped lang="scss">
  .flip-list-move {
    transition: transform .5s;
  }
  .map-counters {
    font-family: "Rubik", sans-serif;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
    width: 100%;

    padding: 0 2rem;
    font-size: 1.5rem;
    line-height: 1.25;

    color: var(--text);
    transition: 0.3s ease-in-out;
    margin-top: 5rem;

    will-change: transform;
    position: relative;
    max-height: 70rem;
    overflow: hidden;

    @include tablet {
      flex-direction: row;
      flex-wrap: wrap;
    }

    @include desktop {
      margin-top: 0;
      flex-direction: column;
      flex-wrap: nowrap;
      padding-left: 0;
      padding-right: 3rem;
    }

    &__item {
      display: flex;
      padding: 1.5rem 0;
      border-bottom: 1px solid var(--border);
      align-items: center;
      width: 100%;

      will-change: transform;
      position: relative;
      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
      }
      &:hover {
        cursor: pointer;
        color: var(--positive);
      }

      @include tablet {
        max-width: 50%;
        &:nth-child(odd) {
          padding-right: 2rem;
        }
        &:nth-child(even) {
          padding-left: 2rem;
        }
      }

      @include desktop {
        max-width: 100%;
        &:nth-child(odd) {
          padding-right: 0;
        }
        &:nth-child(even) {
          padding-left: 0;
        }
      }
    }
    &__nums {
      display: flex;
      flex-direction: column;
      margin-left: auto;
      align-items: center;
    }
    &__val {
      margin-left: auto;
      font-weight: 500;
      color: var(--positive);
      font-size: 1.6rem;
      line-height: 2rem;
      &--negative {
        color: var(--negative);
      }
    }
    &__flag {
      margin-right: 1rem;
      font-size: 2.5rem;
      border-radius: 0.8rem;
      box-shadow: 0px 5px 13px rgba(20, 78, 110, 0.1);
    }
  }
</style>
