<template>
  <div :class="['loader', { 'loader--absolute' : fixed }]">
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
    <span class="loader__text">Загрузка</span>
  </div>
</template>

<style lang="scss">
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
    &--absolute {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    }
  }
  .loader__text {
    margin-top: 1rem;
    transition: 0.3s ease-in-out;
    color: var(--text_inv);
  }
  .loader {
    svg path {
      fill: var(--positive);
    }
  }
</style>

<script>
  export default {
    name: "LoaderSmall",
    props: {
      fixed: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    data() {
      return {};
    }
  };
</script>
