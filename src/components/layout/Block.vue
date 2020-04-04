<template>
  <div class="block">
    <div class="block__header">
      <slot name="header"></slot>
    </div>
    <div class="block__content">
      <slot name="content"></slot>
    </div>
    <div class="block__footer">
      <div class="block__footer--left">
        <slot name="legend"></slot>
      </div>
      <div class="block__footer--right">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Block"
  }
</script>

<style scoped lang="scss">
.block {
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

  &__header {
    display: flex;
    margin-bottom: 2rem;
    justify-content: center;

    @include tablet {
      margin-bottom: 4rem;
      justify-content: flex-start;
    }

    @include desktop {
      margin-bottom: 5rem;
    }
  }

  &__content {
    margin-bottom: 4rem;
    height: 40rem;
  }
  &__footer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;

    @include tablet {
      justify-content: space-between;
    }

    &--left {
      display: flex;
      align-items: center;
      flex-grow: 1;
      margin-bottom: 4rem;
      @include tablet {
        margin-bottom: 0;
      }
    }

    &--right {
      display: flex;
      align-items: center;
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      top: 75%;

      @include tablet {
        position: static;
        transform: translateX(0);
      }
    }
  }

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
