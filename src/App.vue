<template>
  <div id="app" :style="cssColorsVars">
    <main :class="[ 'main', { 'main--bg' : !isProfileLoaded }]" >
      <Header v-if="this.$route.path != '/login' && isAuthenticated" />
        <transition name="fade-in-up" mode="out-in">
          <router-view />
        </transition>
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
        '--main-bg': this.$const.COLOR[theme].MAIN_BG,
        '--positive':this.$const.COLOR.POSITIVE,
        '--negative': this.$const.COLOR.NEGATIVE,
        '--gradient_bg': this.$const.COLOR.GRADIENT_BG,
        '--main': this.$const.COLOR.MAIN,
        '--dropdown': this.$const.COLOR[theme].DROPDOWN,
        '--badge_bg': this.$const.COLOR[theme].BADGE_BG,
        '--text_inv': this.$const.COLOR[theme].TEXT_INV,
        '--checked_bg': this.$const.COLOR[theme].CHECKED_BG,
        '--checked_text': this.$const.COLOR[theme].CHECKED_TEXT,
        '--map' :  this.$const.COLOR[theme].MAP,
        '--map_fill' :  this.$const.COLOR[theme].MAP_FILL,
        '--map_tips' :  this.$const.COLOR[theme].MAP_TIPS,
        '--border': this.$const.COLOR[theme].BORDER,
      };
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700|Rubik:400,500&display=swap&subset=cyrillic");
@import "~flag-icon-css/sass/flag-icon.scss";
@import "./styles/_animation.scss";
@import "./styles/_common.scss";
</style>
