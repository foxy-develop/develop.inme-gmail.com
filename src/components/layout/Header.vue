<template>
    <header class="header">
      <div class="header__logo">
        <Logo/>
      </div>
      <div class="header__profile">
        <ThemeSwitcher/>
        <Profile/>
      </div>
    </header>
</template>

<script>
  import Logo from '../logo';
  import Profile from '../profile';
  import ThemeSwitcher from '../theme-switcher';

  import { mapGetters } from 'vuex';

  export default {
    name: "Header",
    components: {
      Logo,
      Profile,
      ThemeSwitcher
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
  padding: 0 1.5rem;
  align-items: center;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 5;
  height: 7rem;

  &__profile, &__logo {
    animation: revealHeader;
    animation-duration: 0.4s;
    animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  }
  &__profile {
    display: flex;
    align-items: center;
  }
  @include tablet {
    padding: 1.5rem;
    height: 10rem;
  }
  @include desktop-lg {
    padding: 2.5rem;
  }

}
</style>
