<template>
    <div class="block-list" v-if="load">
      <div class="block-list__content">
          <slot></slot>
      </div>

    </div>
</template>

<script>
export default {
  name: "BlockList",
  props: {
    load: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">

  .block-list {
    display: flex;
    flex-shrink: 0;
    border-radius: 0.8rem;
    padding: 1rem 0;
    box-sizing: border-box;
    background-color: var(--el_bg);
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    min-height: 32rem;
    &__content {
      display: flex;
      flex-grow: 1;
      overflow-x: hidden;


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
        position: absolute;
        left: 0;
        right: 0;
        top: 2rem;
        bottom: 2rem;
        overflow-y: auto;
      }
      @include desktop {
        top: 3rem;
        bottom: 3rem;
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
