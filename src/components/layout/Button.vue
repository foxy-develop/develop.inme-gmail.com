<template>
  <router-link
    v-if="isRoute"
    tag="button"
    :to="'/' + route"
    exact
    class="btn"
    v-ripple="'rgba(255,255,255,0.3)'"
  >
    <slot></slot>
  </router-link>
  <button v-else class="btn" v-ripple="'rgba(255,255,255,0.3)'">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "Button",
    props: {
      route: String,
      isRoute: true
    }
  };
</script>

<style lang="scss">
  .btn {
    background: #0ed6dc;
    box-shadow: 0px 1px 9px rgba(11, 44, 55, 0.16);
    border-radius: 7rem;
    font-family: "Rubik", sans-serif;
    letter-spacing: 0.1px;
    color: #fff;
    font-size: 1.8rem;
    line-height: 2rem;
    height: 4.8rem;
    width: 23rem;
    transition: 0.3s ease-in-out;

    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background: #13b0b5;
    }
  }
</style>
