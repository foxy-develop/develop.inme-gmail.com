<template>
    <header class="header">
      <div class="header__logo">
        <Logo/>
      </div>
      <div class="header__profile">
        <Profile/>
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
        ...mapGetters(['isProfileLoaded'])
    }
  }
</script>

<style lang="scss">

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 5;

  &__profile, &__logo {
    animation: revealHeader;
    animation-duration: 0.3s;
    animation-timing-function: ease-in;
  }

  @include tablet {
    padding: 1.5rem;
  }

}
</style>
