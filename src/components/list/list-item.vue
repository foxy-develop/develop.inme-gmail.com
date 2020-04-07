<template>
  <div class="list-item">
    <div
      :class="['list-item__header', { 'is-active': isActive }]"
      @click="toggle"
      v-ripple
    >
      <div
        v-if="item.content_type"
        :class="['list-item__icon', item.content_type]"
      >
        <img :src="item.favicon" :alt="item.domain" />
      </div>

      <div v-if="type" :class="['list-item__icon', type]">
        <img :src="item.favicon" :alt="item.domain" />
      </div>

      <div class="list-item__title">{{ item.title }}</div>

      <div class="list-item__rating" v-if="item.position">
        <strong :class="item.content_type">{{ item.position }}</strong>
        <span>рейтинг</span>
      </div>
      <div class="list-item__rating" v-if="time">
        <span> {{ dateFormat(item.datetime) }}</span>
      </div>
      <button
        class="list-item__link"
        title="Перейти"
      >
        <svg
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :class="['list-item__chevron', { 'is-active': isActive }]"
        >
          <path
            d="M13.8125 1.21875C13.875 1.3125 13.9062 1.40625 13.9062 1.5C13.9062 1.625 13.875 1.6875 13.8125 1.75L7.28125 8.3125C7.1875 8.375 7.09375 8.40625 7 8.40625C6.875 8.40625 6.8125 8.375 6.75 8.3125L0.1875 1.75C0.125 1.6875 0.09375 1.625 0.09375 1.5C0.09375 1.40625 0.125 1.3125 0.1875 1.21875L0.8125 0.59375C0.875 0.53125 0.9375 0.5 1.0625 0.5C1.15625 0.5 1.25 0.53125 1.34375 0.59375L7 6.25L12.6562 0.59375C12.7188 0.53125 12.8125 0.5 12.9375 0.5C13.0312 0.5 13.125 0.53125 13.1875 0.59375L13.8125 1.21875Z"
            fill="#BBCDD9"
          ></path>
        </svg>
      </button>
    </div>
    <div :class="['list-item__body more', { 'is-active': isActive }]">
      <div class="more__title more__item">
        <strong>Название: </strong> <span> {{ item.title }} </span>
      </div>
      <div class="more__desc more__item">
        <strong>Описание: </strong>
        <p class="more__text">
          {{ item.description }}
        </p>
      </div>
      <div class="more__source more__item">
        <strong>Источник: </strong>
        <div class="more__url">
          <a
            :href="
              'https://api.artdock.studio/proxy/open_host/' + item.hash_domain
            "
            :title="item.domain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img :src="item.favicon" :alt="item.domain" />
            <span>{{ item.domain }}</span>
          </a>
        </div>
      </div>
      <div class="more__source more__item">
        <strong>Ссылка: </strong>
        <a
          :href="'https://api.artdock.studio/proxy/open_mention/' + item.hash"
          title="Перейти"
          target="_blank"
          rel="noopener noreferrer"
        >
          Перейти
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListItem",
    props: {
      item: [Object],
      time: Boolean,
      type: String
    },
    data() {
      return {
        isActive: false
      };
    },
    methods: {
      toggle() {
        this.isActive = !this.isActive;
      },
      dateFormat(date) {
        const d = new Date(date);
        return (
          d.getHours() +
          ":" +
          (d.getMinutes() < 10 ? "0" : "") +
          d.getMinutes() +
          ":" +
          (d.getSeconds() < 10 ? "0" : "") +
          d.getSeconds()
        );
      }
    }
  };
</script>

<style scoped lang="scss">
@keyframes revealListItem {
  from {
    opacity: 0;
    transform: translateX(3rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.more {
  &__item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
    text-align: left;

    @include tablet {
      flex-direction: row;
    }

  }
  &__text {
    margin: 0;

    @include tablet {
      width: calc(100% - 8rem);
    }
  }

  strong {
    margin-bottom: 1rem;

    @include tablet {
      margin-bottom: 0;
      margin-right: 1rem;
      width: 7rem;
      text-align: right;
    }

  }
  &__url {

    img {
      margin-right: .5rem;
      height: 1.6rem;
      border-radius: .8rem;
      width: 1.6rem;
    }
  }

  a {
    flex-direction: row;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--positive);
  }
}



.list-item {
  display: flex;
  flex-shrink: 0;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: .8rem;
  background: var(--list-bg);
  margin-bottom: 1.5rem;
  animation: revealListItem;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  opacity: 0;
  transform: translateX(3rem);
  will-change: transform, opacity;
  text-align: left;

  &__header {
    display: flex;
    box-sizing: border-box;
    flex-shrink: 0;
    height: 6rem;
    padding: 1rem;
    width: 100%;
    flex-direction: row;
    align-items: center;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    border-radius: .8rem;
    color: var(--text);
    &:hover,
    &.is-active {
      box-shadow: rgba(20, 46, 110, 0.1) 0 0.1rem 0.8rem;
      background: var(--list-active);
    }
  }
  &__body {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    overflow: hidden;
    white-space: normal;
    transition: all 0.3s ease-out;
    & > * {
      transition: opacity 0.1s linear 0.1s, visibility 0.1s linear 0.1s,
      height 0.1s linear 0.1s, margin 0.1s linear 0.1s,
      line-height 0.3s ease-out;
      visibility: visible;
      opacity: 1;
      line-height: 1.5;
    }
    img {
      transition: all 0.1s linear 0.1s;
      opacity: 1;
    }
    &:not(.is-active) {
      padding: 0 2rem;
      transition: all 0.3s ease-out;
      & > * {
        transition: line-height 0.3s ease-out, opacity 0.1s linear,
        visibility 0.1s linear, margin 0.1s ease-out 0.1s;
        line-height: 0;
        opacity: 0;
        margin: 0;
        visibility: hidden;
      }
      strong {
        margin-bottom: 0;
      }
      img {
        transition: all 0.1s linear;
        opacity: 0;
        height: 0;
      }
    }
  }
  &__link {
    width: 4rem;
    height: 4rem;
    background: var(--el_bg);
    border-radius: 100%;
    color: var(--positive);
    display: flex;
    padding: 0;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  &__chevron {
    position: relative;
    margin: 0;
    transition: 0.3s ease-in-out;
    transform-origin: center;
    transform: rotateX(180deg);
    &:not(.is-active) {
      transform: rotateX(0);
    }
  }
  &__rating {
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    font-family: "Rubik", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    align-items: center;

    margin-left: auto;
    @include tablet {
      margin-right: 2rem;
    }
    strong {
      font-weight: normal;
      font-size: 16px;
      margin-right: 10px;
      font-weight: 500;
    }
    span {
      display: none;
      @include tablet {
        display: flex;
      }
    }
  }
  &__title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: auto;
    flex-shrink: 1;
    margin-right: 1rem;
    flex-grow: 1;
  }
  &__icon {
    width: 30px;
    height: 30px;
    margin-right: 20px;
    display: flex;
    flex-shrink: 0;
    position: relative;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background: #444f55;
    @include tablet {
      width: 32px;
      height: 32px;
    }
    &:after {
      content: "";
      box-sizing: border-box;
      position: absolute;
      border-radius: 100%;
      border: 2px solid var(--main-bg);
      width: 12px;
      height: 12px;
      bottom: 0;
      transform: translateX(-50%) translateY(50%);
      left: 50%;
      transition: 0.3s ease-in-out;
    }
    img {
      width: 16px;
      height: 16px;
      border-radius: 100%;
    }
  }
}

.positive {
  color: var(--positive);
  &:after {
    background: var(--positive);
  }
}
.negative {
  color: var(--negative);
  &:after {
    background: var(--negative);
  }
}
</style>
