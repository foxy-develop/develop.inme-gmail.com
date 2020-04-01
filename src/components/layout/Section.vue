<template>
  <section class="section">
    <div class="section__title">
      <div class="section__side">
        <button
          v-if="navBtn"
          class="section__btn"
          @click="this.$router.go(-1)"
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
      </div>
    </div>
    <div :class="['section__inner', { 'section__inner--reversed' : reversed}]">
      <div class="section__side">
        <slot name="side"></slot>
      </div>
      <div class="section__content">
        <slot name="content"></slot>
      </div>
    </div>
  </section>
</template>

<script>
import Title from "./Title";
export default {
  name: "Section",
  props: {
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
    Title
  }
}
</script>

<style lang="scss">
.section {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: 1.5rem;

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
    @include desktop {
      max-width: calc(100% - 23rem);
    }
  }

  &__side {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    @include desktop {
      max-width: 23rem;
      flex-direction: column;
    }
  }

  &__title {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 8rem;

    .section {
      &__side {
        max-width: 10rem;

        &:empty {
          display: none;
        }
        @include desktop {
          &:empty {
            display: flex;
          }
          max-width: 23rem;
        }
      }
      &__content, &__side {
        justify-content: center;
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
  }
  &__arrow {
    transition: 0.3s ease-in-out;
    fill: var(--icon_color);
  }
  &:hover {
    .back-btn__arrow {
      fill: var(--main);
    }
  }
}
</style>