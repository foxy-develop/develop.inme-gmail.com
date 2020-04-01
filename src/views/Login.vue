<template>
  <div class="main-loader" v-if="enableLoader"></div>
  <div class="auth" v-else>
    <img class="auth__img" src="../assets/crystal.png" alt="crystal" />
    <img class="auth__logo" src="../assets/logo.svg" alt="ARTDOCK" />
    <LoginForm></LoginForm>
  </div>
</template>

<script>
  import LoginForm from "../components/login-form"
  import { mapGetters, mapActions } from "vuex";
  export default {
  name: "Login",
    data() {
      return {
        loading: false,
        enableLoader: false
      }
    },
    components: {
      LoginForm
    },
    methods: {
      ...mapActions(['DATA_REQUEST']),
      ...mapGetters(['isChartDataLoaded', 'getChartData'])
    },
    async beforeRouteLeave(to,from,next) {
      this.enableLoader = true;
      const response = await this.DATA_REQUEST()

      if (this.isChartDataLoaded()) {
        console.log(this.getChartData())
        this.enableLoader = false;
        return next();
      }

    }
  }
</script>

<style scoped lang="scss">
.auth {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  margin-top: -7rem;

  &__img {
    height: auto;
    max-height: 15.5rem;
    max-width: 18.85rem;
    width: 100%;
    margin: -2rem auto 1rem;
    position: relative;
    left: -3rem;
    animation: reveal-top;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0.78, 0.13, 0, 0.97);
    animation-fill-mode: forwards;
    transform: translate(0, -100%);
    opacity: 0;

    @include tablet {
      max-height: 20.5rem;
      max-width: 24.85rem;
      margin: -3rem auto 3rem;

    }
  }
  &__logo {
    margin-left: auto;
    margin-right: auto;
    max-width: 22.7rem;
    width: 100%;
    height: auto;
    margin-bottom: 7rem;
    animation: reveal-logo;
    animation-duration: 0.35s;
    animation-delay: 0.75s;
    animation-timing-function: cubic-bezier(0, 0.82, 0.86, 0.85);
    animation-fill-mode: forwards;
    transform-origin: top;
    transform: scaleY(0);
    opacity: 0;
    @include tablet {
      margin-bottom: 10rem;
    }
    @include desktop-lg {
      margin-bottom: 12rem;
    }
    @include desktop-lg {
      margin-bottom: 5%;
    }
  }
}
</style>
