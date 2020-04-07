<template>
  <transition-group
    class="mentions"
    tag="div"
    name="list"
    v-if="load"
    v-show="load"
  >
    <ListItem
      v-for="(mention, index) in mentions"
      :key="mention.hash"
      :style="{ animationDelay: index < 10 ? index * 50 + 'ms' : 75 + 'ms' }"
      :item="mention"
      :type="type"
      :time="time"
    ></ListItem>
  </transition-group>
  <LoaderSmall v-else />
</template>

<script>
import ListItem from "./list-item";
import LoaderSmall from "../loaders/loader-small";
import { mapGetters } from "vuex";

export default {
  name: "List",
  components: {
    ListItem, LoaderSmall
  },
  props: {
    load: Boolean,
    dataList: [Array],
    time: Boolean,
    type: String
  },
  computed: {
    ...mapGetters(["getTypes", "isDataLoaded", "isFilter"]),
    mentions() {
      const arr = this.dataList;
      const types = this.getTypes;
      if (types) {
        return arr.filter(el => {
          if (
            el.content_type != types.negative &&
            el.content_type != types.positive
          ) {
            return el;
          }
        });
      } else {
        return arr;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.mentions {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 1.5rem;

  @include tablet {
    padding: 0 2.5rem;
  }
}
</style>
