<template>
<div class="block-list">
  <div class="block-list__content">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "BlockList"
}
</script>

<style scoped lang="scss">
  .block-list {
    display: flex;
    flex-shrink: 0;
    border-radius: 0.8rem;
    padding: 1rem 0;
    box-sizing: border-box;
    transition: 0.15s ease-in-out;
    background-color: var(--el_bg);
    flex-direction: column;
    flex-grow: 1;

    &__content {
      display: flex;
      flex-grow: 1;
      overflow-x: hidden;
      overflow-y: auto;
      min-height: 32rem;
      &::-webkit-scrollbar {
        background-color: rgba(255, 255, 255, 0);
        width: 5px;
      }

      &::-webkit-scrollbar-track {
        background-color: rgba(255, 255, 255, 0);
      }


      &::-webkit-scrollbar-thumb {
        border: .5rem solid var(--positive);
        border-radius: 0.8rem;
      }

      &::-webkit-scrollbar-button {
        display: none;
      }

      @include tablet {
        @media (orientation: portrait) {
          max-height: calc(100vh - 46.5rem);
        }

      }

      @include desktop {
        max-height: calc(100vh - 39.5rem);
      }

    }

    @include tablet {
      padding: 2rem 0;

    }
    @include desktop {
      padding: 3rem 0;
    }

  }
</style>
