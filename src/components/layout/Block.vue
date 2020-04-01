<template>
  <div class="content-block">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Block"
  }
</script>

<style scoped lang="scss">
.content-block {
  display: flex;
  min-height: 40rem;
  flex-shrink: 0;
  background: var(--el_bg);
  border-radius: 0.8rem;
  flex-grow: 1;
  padding: 1rem;
  box-sizing: border-box;
  transition: 0.3s ease-in-out;
  flex-direction: column;

  @include tablet {
    padding: 2rem;
    @media (orientation: portrait) {
      min-height: 50vh;
    }
    @media (orientation: landscape) {
      min-height: 50rem;
    }
  }
  @include desktop {
    padding: 3rem;
  }
  @include desktop-lg {
    padding: 4rem;
  }

}
</style>
