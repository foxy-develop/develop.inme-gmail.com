<template>
  <div id="app" :style="cssColorsVars">
    <main class="main" >
        <Header />
        <header id="nav">
          <button @click="changeTheme">click</button>
          <router-link to="/">Home 2</router-link> |
          <router-link to="/about">About</router-link>
        </header>
        <transition name="fade" mode="out-in" tag="div" class="main__content">
          <router-view />
        </transition>
    </main>
  </div>
</template>

<script>
import { ThemeService } from './services/storage.service';
import Header from "./components/layout/Header";
export default {
  name: 'app',
  metaInfo: {
    title: 'ArtDock Client Panel'
  },
  components: {
    Header
  },
  data() {
    return {
      theme: ''
    };
  },
  methods: {
    changeTheme: function () {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
    },
    setTheme: function() {
      !ThemeService.get() && ThemeService.save('dark');
      this.theme = ThemeService.get();
    },
  },
  created() {
    this.setTheme();
  },
  computed: {
    cssColorsVars() {
      return {
        // general
        '--text': this.$const.COLOR[this.theme.toUpperCase()].FONT,
        '--text_grey': this.$const.COLOR[this.theme.toUpperCase()].FONT_GREY,
        '--gradient_show': this.$const.COLOR[this.theme.toUpperCase()].GRADIENT_OPACITY,
        '--el_bg': this.$const.COLOR[this.theme.toUpperCase()].EL_BG,
        '--el_bg_off': this.$const.COLOR[this.theme.toUpperCase()].EL_BG_OFF,
        '--el_bg_grey': this.$const.COLOR[this.theme.toUpperCase()].EL_BG_GREY,

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


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
