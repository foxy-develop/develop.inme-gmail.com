<template>
  <div
    @click="toggle()"
    :class="[
      'toggler-counter',
      { 'toggler-counter--active': isActive }
    ]"
    :title="(isActive ? 'Скрыть ' : 'Отобразить ') + name"
  >
    <number
      class="toggler-counter__num"
      :from="0"
      :to="to"
      :duration="1"
      easing="Power3.easeIn"
    >
    </number>
    <div class="toggler-counter__text">{{ name }}</div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: "Toggler",
    props: {
      to: [Number],
      name: [String],
      alt: [String],
      active: [Boolean]
    },
    data() {
      return {
        isActive: false,
        type: ""
      };
    },
    mounted() {
      this.isActive = this.active;
      this.type = this.alt;
    },
    methods: {
      ...mapActions(['MENTIONS_CHANGE_TYPE']),

      toggle() {
        this.isActive = !this.isActive;
        const options = {
          type: this.alt,
          val: this.isActive
        };
        this.MENTIONS_CHANGE_TYPE({ options });
      }
    }
  };
</script>
<style scoped lang="scss">
  .toggler-counter {
    display: flex;
    flex-direction: column;
    height: 100px;
    align-items: center;
    justify-content: center;
    background: var(--el_bg_off);
    width: 50%;
    position: relative;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    @include desktop {
      height: 13.4rem;
      width: 100%;
    }

    &:after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(50%);
      height: 25px;
      width: 25px;
      border-radius: 100%;
      border: 5px solid var(--main-bg);
      background: #fff;
      bottom: 0;
      box-sizing: border-box;
      transition: 0.3s ease-in-out;
      z-index: 102;
    }

    &--active {
      background: var(--el_bg);
      box-shadow: 0px 1px 8px rgba(20, 46, 110, 0.1);
      transition: 0.3s ease-in-out;
    }

    &:first-child {
      border-top-left-radius: .8rem;
      border-bottom-left-radius: .8rem;
      z-index: 101;
      &.toggler-counter--active {
        &:after {
          background: var(--positive);
        }
      }
      @include desktop {
        border-top-right-radius: .8rem;
        border-bottom-left-radius: 0;
      }
      .toggler-counter__num {
        color: var(--positive);
      }
    }
    &:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      &.toggler-counter--active {
        &:after {
          background: var(--negative);
        }
      }
      @include desktop {
        border-bottom-left-radius: .8rem;
        border-top-right-radius: 0;
      }
      .toggler-counter__num {
        color: var(--negative);
      }
    }

    &__num {
      font-style: normal;
      font-weight: bold;
      font-size: 40px;
      line-height: 20px;
      margin-bottom: 12px;
    }
    &__text {
      font-size: 8px;
      line-height: 9px;
      text-align: center;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: var(--text_inv);
      transition: 0.3s ease-in-out;
    }
  }
</style>
