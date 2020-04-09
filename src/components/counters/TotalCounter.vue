<template>
  <div class="total-counter">
    <number
      :class="[ 'total-counter__num', type ? 'total-counter--' + type : 'total-counter--negative' ]"
      :from="0"
      :to="to"
      :duration="1"
      easing="Power3.easeIn"
    >
    </number>
    <span class="total-counter__desc">всего результатов</span>
  </div>
</template>

<script>
export default {
  name: "TotalCounter",
  props: {
    to: Number,
    type: String
  }
};
</script>

<style scoped lang="scss">
  .total-counter {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-family: "Rubik", sans-serif;
    font-weight: 500;
    color: var(--text);
    transition: 0.3s ease-in-out;
    margin-bottom: 3rem;
    width: 100%;

    &__num {
      font-size: 7rem;
      line-height: 1;
      margin-bottom: 1.5rem;
    }
    &--positive {
      color: var(--positive);
    }
    &--negative {
      color: var(--negative);
    }
    &__desc {
      font-size: 1.8rem;
      line-height: 2rem
    }
  }
</style>
