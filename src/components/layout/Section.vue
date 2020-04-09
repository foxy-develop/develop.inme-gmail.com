<template>
  <section :class="['section', { 'section--full' : full}]">
    <div class="section__title">
      <div class="section__side">
        <button
          @click="goBack"
          v-if="navBtn"
          class="section__btn"
          title="Назад"
        >
          <svg
            width="36"
            height="8"
            viewBox="0 0 36 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="section__arrow"
              d="M0.646446 3.64645C0.451183 3.84171 0.451183 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM36 3.5L1 3.5V4.5L36 4.5V3.5Z"
            />
          </svg>
        </button>
      </div>
      <div class="section__content">
        <Title v-text="title" />
        <div class="section__control">
          <slot name="control"></slot>
        </div>
      </div>
    </div>
    <div :class="['section__inner', { 'section__inner--reversed' : reversed}]">
        <div :class="['section__side', { 'section__side--start' : isStart }, {}]">
          <transition
            appear
            name="reveal-animate--top">
            <div :class="['section__side-inner', { 'section__side-inner--filters' : isSideFilters }]" v-if="!loading">
              <slot name="side"></slot>
            </div>
          </transition>
        </div>
      <div class="section__content">
        <slot name="content"></slot>
      </div>
    </div>
  </section>
</template>

<script>
import Title from "./Title";
import Button from "./Button";

export default {
  name: "Section",
  props: {
    full: {
      type: Boolean,
      default: false,
      required: false
    },
    isStart: {
      default: false,
      required: false,
      type: Boolean
    },
    isScroll: {
      default: false,
      required: false,
      type: Boolean
    },
    isSideFilters: {
      type: Boolean,
      default: false,
      required: false
    },
    loading: false,
    title: {
      type: String,
      required: true,
      validator: value => value.length > 4
    },
    navBtn: {
      type: Boolean,
      default: false
    },
    reversed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Button,
    Title
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss">
.section {
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;

  &--full {
    flex-grow: 1;
  }

  @include desktop {
    padding-bottom: 2.5rem;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    &--reversed {
      flex-direction: column-reverse;
    }

    @include desktop {
      flex-direction: row;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    z-index: 2;
    @include desktop {
      max-width: calc(100% - 23rem);
    }

  }

  &__side {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    z-index: 5;
    &-inner {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      width: 100%;

      @include desktop {
        height: 100%;
        flex-direction: column;
      }
    }

    &--start {
      justify-content: flex-start;
      .section__side-inner {
        &--filters {
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin-bottom: 3rem;
          @include tablet {
            flex-direction: row;
            margin-bottom: 0;
            justify-content: space-between;
          }
          @include desktop {
            flex-direction: column;
            justify-content: flex-start;
          }
        }
        @include desktop {
          justify-content: flex-start;
          margin-bottom: 0;
        }
      }

    }
    @include desktop {
      max-width: 23rem;
      flex-direction: column;
    }

  }
  &__control {
    display: flex;
    width: 100%;
    max-width: 32.6rem;
  }
  &__title {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 8rem;

    .section {

      &__side {
        max-width: 8rem;
        width: 100%;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        &:empty {
          display: none;
        }
        @include desktop {
          max-width: 23rem;

          &:empty {
            display: flex;
          }

        }
      }
      &__content {
        max-width: calc(100% - 8rem);
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @include tablet {
          flex-direction: row;
          justify-content: space-between;
        }
        @include  desktop {
          max-width: calc(100% - 23rem);
        }
      }
    }
  }
  &__btn {
    background: rgba(255,255,255,0);
    padding: 20px 10px;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 120px;
    cursor: pointer;

    &:hover {

      .section__arrow {
        fill: var(--positive);
      }

    }
  }

  &__arrow {
    transition: 0.3s ease-in-out;
    fill: var(--icon_color);
  }

}
</style>
