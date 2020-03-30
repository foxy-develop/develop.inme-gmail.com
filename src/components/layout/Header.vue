<template>
    <header class="header" v-if="isShowUI">
      <div class="header__logo">
        <Logo/>
      </div>
      <div class="header__profile">

      </div>
    </header>
</template>

<script>
  import Logo from '../logo';
  import Profile from '../profile';
  import { mapGetters } from 'vuex';

  export default {
    name: "Header",
    components: {
      Logo,
      Profile
    },
    computed: {
        ...mapGetters(['isShowUI'])
    }
  }
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  @include tablet {
    padding: 1.5rem;
  }
}
</style>
