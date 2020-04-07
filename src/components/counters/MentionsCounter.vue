<template>
  <div class="mentions-counter">
    <Toggler
      :to="getMentionsTotal.positive"
      :name="'приемлимые'"
      :alt="'positive'"
      :active="getTypes.positive === ''"
      v-ripple
    >
    </Toggler>
    <Toggler
      :to="getMentionsTotal.negative"
      :name="'негатив'"
      :alt="'negative'"
      :active="getTypes.negative === ''"
      v-ripple="'rgba(241,113,5,0.2)'"
    >
    </Toggler>
  </div>
</template>

<script>
import Toggler from "../toggler";
import { mapGetters } from "vuex";

export default {
  name: "MentionsCounter",
  components: {
    Toggler
  },
  computed: {
    ...mapGetters(["getTypes", "getMentionsTotal", "isDataLoaded"])
  }
}
</script>

<style scoped lang="scss">
.mentions-counter {
  display: flex;
  flex-direction: row;
  width: 100%;
  transition: 0.3s ease-in-out;
  margin-bottom: 3rem;
  @include desktop {
    margin-bottom: 0;
    padding-right: 2rem;
    flex-direction: column;
  }
}
</style>
