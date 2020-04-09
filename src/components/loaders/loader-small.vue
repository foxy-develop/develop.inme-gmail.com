<template>
  <transition name="fade">
    <div v-show="show" :class="['loader', { 'loader--absolute' : fixed }, { 'loader--small' : button}]">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="40px"
        height="40px"
        viewBox="0 0 50 50"
        style="enable-background:new 0 0 50 50;"
        xml:space="preserve"
      >
        <path
          fill="#000"
          d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <span class="loader__text" v-if="!button">Загрузка</span>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "LoaderSmall",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      },
      button: {
        type: Boolean,
        default: false
      }
    },
    components: {}
  };
</script>

<style scoped lang="scss">

  .fade-enter-active, .fade-leave-active  {
    transition: .3s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .loader {
    width: 100%;
    text-align: center;
    padding: 1em;
    margin: 0 auto 1em;
    display: flex;
    vertical-align: top;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-direction: column;
    font-size: 1.4rem;
    font-family: "Rubik", sans-serif;
    font-weight: 500;
    letter-spacing: 0.1px;

    svg path {
      fill: var(--positive);
    }

    &--absolute {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    }
    &--small {
      padding: 0;
      margin: 0;
      svg {
        height: 25px;
        width: 25px;

        path {
          fill: rgba(255, 255, 255, .5);
        }
      }
    }
    &__text {
      margin-top: 1rem;
      transition: 0.3s ease-in-out;
      color: var(--text_inv);
      opacity: 0.5;
      font-weight: 400;
      &:after {
        content: '.';
        animation: dots 1.5s steps(5, end) infinite;
      }
    }
  }
  @keyframes dots {
    0%, 20% {
      color: rgba(0,0,0,0);
      text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);}
    40% {
      color: var(--text_inv);
      text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);}
    60% {
      text-shadow: .25em 0 0 var(--text_inv), .5em 0 0 rgba(0,0,0,0);}
    80%, 100% {
      text-shadow: .25em 0 0 var(--text_inv), .5em 0 0 var(--text_inv);
    }
  }
</style>
