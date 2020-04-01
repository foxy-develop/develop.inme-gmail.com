<template>
  <h2 class="typography-title"><slot></slot></h2>
</template>

<script>
export default {
  name: "Title"
}
</script>

<style scoped lang="scss">
.typography-title {
  color: var(--text);
  margin: 0;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  font-size: 2.8rem;
  line-height: 4rem;
  width: 100%;
  align-items: center;
  @include desktop {
    display: flex;
    text-align: left;
  }
}
</style>
