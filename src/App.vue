<template>
  <div id="app" :style="cssColorsVars">
    <main :class="[ 'main', { 'main--bg' : !isProfileLoaded }]" >
      <Header v-if="this.$route.path != '/login' && isAuthenticated" />
      <div class="main__content">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./components/layout/Header";
export default {
  name: 'app',
  metaInfo: {
    title: 'ArtDock Client Panel'
  },
  components: {
    Header
  },
  computed: {
    ...mapGetters(['getProfile', 'isAuthenticated', 'isProfileLoaded']),
    cssColorsVars() {
      const theme = this.getProfile.theme.toUpperCase()
      return {
        // general
        '--text': this.$const.COLOR[theme].FONT,
        '--text_grey': this.$const.COLOR[theme].FONT_GREY,
        '--gradient_show': this.$const.COLOR[theme].GRADIENT_OPACITY,
        '--el_bg': this.$const.COLOR[theme].EL_BG,
        '--el_bg_off': this.$const.COLOR[theme].EL_BG_OFF,
        '--el_bg_grey': this.$const.COLOR[theme].EL_BG_GREY,
        '--icon_color': this.$const.COLOR[theme].ICON,
        '--icon_light': this.$const.COLOR[theme].ICON_LIGHT,
        '--icon_dark': this.$const.COLOR[theme].ICON_DARK,
        '--positive':this.$const.COLOR.POSITIVE,
        '--negative': this.$const.COLOR.NEGATIVE,
        '--gradient_bg': this.$const.COLOR.GRADIENT_BG,
        '--main': this.$const.COLOR.MAIN
      };
    }
  }
};
</script>

<style lang="scss">
@import "~flag-icon-css/sass/flag-icon.scss";
@import "./styles/_common.scss";
</style>
