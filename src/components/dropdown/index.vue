<template>
  <div class="filter">
    <div class="filter__inner">
      <div class="btn-group">
        <li @click="toggleMenu()"
            class="dropdown-toggle"
            v-if="selectedOption.title != undefined"
            v-ripple
        >
          <svg v-if="type === 'keywords'"
               class="filter__icon"
               width="40"
               height="40"
               viewBox="0 0 40 40"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9166 35C12.7399 35 12.5616 34.9634 12.395 34.8849C11.9501 34.6817 11.6666 34.2383 11.6666 33.75V20.5484C11.6666 20 11.4435 19.4617 11.0565 19.075L1.34338 9.36829C0.476685 8.50342 0 7.35168 0 6.12671V2.91656C0 1.30829 1.30829 0 2.91656 0H29.1666C30.7751 0 32.0834 1.30829 32.0834 2.91656V6.09161C32.0834 7.32819 31.5732 8.5318 30.6833 9.38995L20.6384 19.0817C20.2316 19.4733 20 20.0201 20 20.5832V27.2168C20 28.5565 19.4168 29.8251 18.4 30.6967L13.7317 34.6982C13.5001 34.8965 13.2101 35 12.9166 35ZM2.91656 2.5C2.68677 2.5 2.5 2.68677 2.5 2.91656V6.12671C2.5 6.68335 2.71667 7.20673 3.11157 7.60162L12.8232 17.3065C13.6768 18.1583 14.1666 19.3399 14.1666 20.5484V31.0333L16.7715 28.8C17.2333 28.4033 17.5 27.8284 17.5 27.2183V20.585C17.5 19.3484 18.0099 18.1451 18.9001 17.2867L28.945 7.59491C29.35 7.2049 29.5816 6.65833 29.5816 6.09497V2.91656C29.5816 2.68677 29.3951 2.5 29.165 2.5H2.91656Z"
              fill="#9C50BF"
            />
            <path
              d="M37.084 40H26.2505C24.6423 40 23.334 38.6917 23.334 37.0834V22.9166C23.334 21.3083 24.6423 20 26.2505 20H37.084C38.6923 20 40.0005 21.3083 40.0005 22.9166V37.0834C40.0005 38.6917 38.6923 40 37.084 40ZM26.2505 22.5C26.0204 22.5 25.834 22.6868 25.834 22.9166V37.0834C25.834 37.3132 26.0204 37.5 26.2505 37.5H37.084C37.3138 37.5 37.5005 37.3132 37.5005 37.0834V22.9166C37.5005 22.6868 37.3138 22.5 37.084 22.5H26.2505Z"
              fill="#9C50BF"
            />
            <path
              d="M33.7505 28.75H29.584C28.894 28.75 28.334 28.19 28.334 27.5C28.334 26.81 28.894 26.25 29.584 26.25H33.7505C34.4406 26.25 35.0005 26.81 35.0005 27.5C35.0005 28.19 34.4406 28.75 33.7505 28.75Z"
              fill="#9C50BF"
            />
            <path
              d="M33.7505 33.75H29.584C28.894 33.75 28.334 33.19 28.334 32.5C28.334 31.81 28.894 31.25 29.584 31.25H33.7505C34.4406 31.25 35.0005 31.81 35.0005 32.5C35.0005 33.19 34.4406 33.75 33.7505 33.75Z"
              fill="#9C50BF"
            />
          </svg>
          <img v-if="type === 'top'"
               :src="'/img/top-' + (selectedOption.id || 10) + '.svg'"
               :alt="selectedOption.title"
               class="filter__icon"
          />
          <span v-if="type === 'country'"
                :class="[
        'filter__icon',
        'filter__icon--flag',
        'flag-icon',
        'flag-icon-' + getTitle(selectedOption.title_short)
      ]"
          ></span>

          <div :class="['dropdown-text', {'negative-text' : num }]">
            <span class="dropdown-title-text">{{ selectedOption.title }}</span>
            <number
              v-if="num"
              class="value_count"
              :from="0"
              :to="count"
              :duration="1"
              easing="Power3.easeIn"
            />
          </div>
          <svg :class="['filter__chevron', showMenu && 'rotate']"
               width="14"
               height="9"
               viewBox="0 0 14 9"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8125 1.21875C13.875 1.3125 13.9062 1.40625 13.9062 1.5C13.9062 1.625 13.875 1.6875 13.8125 1.75L7.28125 8.3125C7.1875 8.375 7.09375 8.40625 7 8.40625C6.875 8.40625 6.8125 8.375 6.75 8.3125L0.1875 1.75C0.125 1.6875 0.09375 1.625 0.09375 1.5C0.09375 1.40625 0.125 1.3125 0.1875 1.21875L0.8125 0.59375C0.875 0.53125 0.9375 0.5 1.0625 0.5C1.15625 0.5 1.25 0.53125 1.34375 0.59375L7 6.25L12.6562 0.59375C12.7188 0.53125 12.8125 0.5 12.9375 0.5C13.0312 0.5 13.125 0.53125 13.1875 0.59375L13.8125 1.21875Z"
              fill="#BBCDD9"
            />
          </svg>
        </li>
        <li
          @click="toggleMenu()"
          class="dropdown-toggle"
          v-if="selectedOption.title === undefined"
          v-ripple
        >
          <svg v-if="type === 'keywords'"
               class="filter__icon"
               width="40"
               height="40"
               viewBox="0 0 40 40"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9166 35C12.7399 35 12.5616 34.9634 12.395 34.8849C11.9501 34.6817 11.6666 34.2383 11.6666 33.75V20.5484C11.6666 20 11.4435 19.4617 11.0565 19.075L1.34338 9.36829C0.476685 8.50342 0 7.35168 0 6.12671V2.91656C0 1.30829 1.30829 0 2.91656 0H29.1666C30.7751 0 32.0834 1.30829 32.0834 2.91656V6.09161C32.0834 7.32819 31.5732 8.5318 30.6833 9.38995L20.6384 19.0817C20.2316 19.4733 20 20.0201 20 20.5832V27.2168C20 28.5565 19.4168 29.8251 18.4 30.6967L13.7317 34.6982C13.5001 34.8965 13.2101 35 12.9166 35ZM2.91656 2.5C2.68677 2.5 2.5 2.68677 2.5 2.91656V6.12671C2.5 6.68335 2.71667 7.20673 3.11157 7.60162L12.8232 17.3065C13.6768 18.1583 14.1666 19.3399 14.1666 20.5484V31.0333L16.7715 28.8C17.2333 28.4033 17.5 27.8284 17.5 27.2183V20.585C17.5 19.3484 18.0099 18.1451 18.9001 17.2867L28.945 7.59491C29.35 7.2049 29.5816 6.65833 29.5816 6.09497V2.91656C29.5816 2.68677 29.3951 2.5 29.165 2.5H2.91656Z"
              fill="#9C50BF"
            />
            <path
              d="M37.084 40H26.2505C24.6423 40 23.334 38.6917 23.334 37.0834V22.9166C23.334 21.3083 24.6423 20 26.2505 20H37.084C38.6923 20 40.0005 21.3083 40.0005 22.9166V37.0834C40.0005 38.6917 38.6923 40 37.084 40ZM26.2505 22.5C26.0204 22.5 25.834 22.6868 25.834 22.9166V37.0834C25.834 37.3132 26.0204 37.5 26.2505 37.5H37.084C37.3138 37.5 37.5005 37.3132 37.5005 37.0834V22.9166C37.5005 22.6868 37.3138 22.5 37.084 22.5H26.2505Z"
              fill="#9C50BF"
            />
            <path
              d="M33.7505 28.75H29.584C28.894 28.75 28.334 28.19 28.334 27.5C28.334 26.81 28.894 26.25 29.584 26.25H33.7505C34.4406 26.25 35.0005 26.81 35.0005 27.5C35.0005 28.19 34.4406 28.75 33.7505 28.75Z"
              fill="#9C50BF"
            />
            <path
              d="M33.7505 33.75H29.584C28.894 33.75 28.334 33.19 28.334 32.5C28.334 31.81 28.894 31.25 29.584 31.25H33.7505C34.4406 31.25 35.0005 31.81 35.0005 32.5C35.0005 33.19 34.4406 33.75 33.7505 33.75Z"
              fill="#9C50BF"
            />
          </svg>
          <div class="dropdown-text">
            <span class="dropdown-title-text">{{ placeholderText }}</span>
          </div>
          <svg
            class="filter__chevron"
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            :class="['filter__chevron', showMenu && 'rotate']"
          >
            <path
              d="M13.8125 1.21875C13.875 1.3125 13.9062 1.40625 13.9062 1.5C13.9062 1.625 13.875 1.6875 13.8125 1.75L7.28125 8.3125C7.1875 8.375 7.09375 8.40625 7 8.40625C6.875 8.40625 6.8125 8.375 6.75 8.3125L0.1875 1.75C0.125 1.6875 0.09375 1.625 0.09375 1.5C0.09375 1.40625 0.125 1.3125 0.1875 1.21875L0.8125 0.59375C0.875 0.53125 0.9375 0.5 1.0625 0.5C1.15625 0.5 1.25 0.53125 1.34375 0.59375L7 6.25L12.6562 0.59375C12.7188 0.53125 12.8125 0.5 12.9375 0.5C13.0312 0.5 13.125 0.53125 13.1875 0.59375L13.8125 1.21875Z"
              fill="#BBCDD9"
            />
          </svg>
        </li>
        <div class="dropdown-menu" v-if="showMenu">
          <div class="dropdown__search" v-if="type === 'keywords' || type === 'country'">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="dropdown-search-icon"
            >
              <path
                opacity="0.5"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.4756 12.3928C13.4756 12.2887 13.4444 12.2053 13.3819 12.1428L12.0937 10.8438C12.0312 10.7813 11.9479 10.75 11.8437 10.75C11.6718 10.75 11.5768 10.5464 11.68 10.4089C12.051 9.91412 12.3504 9.3716 12.5781 8.78129C12.8593 8.05212 13 7.29171 13 6.50005C13 5.31255 12.7083 4.22401 12.125 3.23443C11.5416 2.24485 10.7552 1.45839 9.7656 0.875059C8.77602 0.291727 7.68748 6.10352e-05 6.49998 6.10352e-05C5.31249 6.10352e-05 4.22395 0.291727 3.23437 0.875059C2.24479 1.45839 1.45833 2.24485 0.874998 3.23443C0.291666 4.22401 0 5.31255 0 6.50005C0 7.68754 0.291666 8.77608 0.874998 9.76566C1.45833 10.7552 2.24479 11.5417 3.23437 12.125C4.22395 12.7084 5.31249 13 6.49998 13C7.29165 13 8.05206 12.8594 8.78123 12.5782C9.37154 12.3505 9.91406 12.0511 10.4088 11.68C10.5463 11.5769 10.75 11.6719 10.75 11.8438C10.75 12.0247 10.9085 12.1575 11.0374 12.2844L11.9247 13.1576C12.0626 13.2934 12.1883 13.4866 12.3819 13.4866C12.486 13.4866 12.5798 13.4449 12.6631 13.3616L13.1637 12.8827C13.3089 12.7439 13.4756 12.5937 13.4756 12.3928ZM8.99998 10.8282C8.22915 11.2761 7.39582 11.5 6.49998 11.5C5.60415 11.5 4.77082 11.2761 3.99999 10.8282C3.22916 10.3802 2.61979 9.77087 2.17187 9.00004C1.72395 8.22921 1.5 7.39588 1.5 6.50005C1.5 5.60421 1.72395 4.77088 2.17187 4.00005C2.61979 3.22922 3.22916 2.61985 3.99999 2.17193C4.77082 1.72402 5.60415 1.50006 6.49998 1.50006C7.39582 1.50006 8.22915 1.72402 8.99998 2.17193C9.77081 2.61985 10.3802 3.22922 10.8281 4.00005C11.276 4.77088 11.5 5.60421 11.5 6.50005C11.5 7.39588 11.276 8.22921 10.8281 9.00004C10.3802 9.77087 9.77081 10.3802 8.99998 10.8282Z"
              />
            </svg>
            <input type="text" v-model="search" placeholder="Поиск..." />
          </div>

          <transition-group class="dropdown-list" tag="ul" name="list">
            <li v-for="(option, idx) in filteredItems(options)" :key="idx" v-ripple>
              <a
                href="javascript:void(0)"
                @click="updateOption(option)"
                :class="[type !== 'keywords' && 'title-top']"
                :title="option.title"
              >
                <img
                  v-if="type === 'top'"
                  :src="'/img/top-' + option.id + '.svg'"
                  :alt="option.title"
                  class="filter__icon"
                />
                <span
                  v-if="type === 'country'"
                  :class="[
              'flag-icon',
              'flag-icon-' + getTitle(option.title_short)
            ]"
                ></span>
                <span class="title">{{ option.title }}</span>
                <span class="value_count" v-if="num"> {{ option.value }} </span>
              </a>
            </li>
          </transition-group>
          <div class="empty-result">По данному запросу ничего не найдено...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dropdown",
    data() {
      return {
        search: "",
        selectedOption: {
          title: "",
          id: "",
          title_short: ""
        },
        showMenu: false,
        placeholderText: "Пожалуйста сделайте выбор"
      };
    },

    props: {
      options: {
        type: [Array, Object]
      },
      count: {
        type: Number,
        required: false,
        default: 0
      },
      type: String,
      selected: {},
      placeholder: [String],
      closeOnOutsideClick: {
        type: [Boolean],
        default: true
      },
      num: {
        type: [Boolean],
        default: false
      }
    },

    mounted() {
      this.selectedOption = this.selected;
      if (this.placeholder) {
        this.placeholderText = this.placeholder;
      }

      if (this.closeOnOutsideClick) {
        document.addEventListener("click", this.clickHandler);
      }
    },
    beforeDestroy() {
      document.removeEventListener("click", this.clickHandler);
    },

    methods: {
      updateOption(option) {
        this.selectedOption = option;
        this.showMenu = false;
        this.search = "";
        this.$emit("updateOption", this.selectedOption);
      },

      toggleMenu() {
        this.showMenu = !this.showMenu;
      },

      clickHandler(event) {
        const { target } = event;
        const { $el } = this;

        if (!$el.contains(target)) {
          this.showMenu = false;
        }
      },
      getTitle: name => name.toLowerCase(),
      filteredItems(arr) {
        if (this.search) {
          const condition = new RegExp(this.search, "i");
          return arr.filter(item => item.title.match(condition));
        }
        return arr;
      }
    }
  };
</script>

<style scoped lang="scss">
  @keyframes showDrop {
    from {
      opacity: 0;
      max-height: 0;
      padding-bottom: 0;
      padding-top: 0;
    }
    to {
      opacity: 1;
      max-height: 40rem;
      padding-bottom: .5rem;
      padding-top: .5rem;
    }
  }
  @keyframes revealItem {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .rotate {
    transform: rotateZ(180deg);
  }
  .btn-group {
    max-width: 100%;
    height: 100%;
    display: flex;

    & > li {
      padding: 0 2.5rem;
      @include tablet {
        padding: 0 2.5rem;
      }

    }

  }
  .btn-group a:hover {
    text-decoration: none;
  }
  .dropdown-text {
    max-width: 18rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: none;
    flex-shrink: unset;
    @include tablet {
      display: block;
      margin-right: auto;
    }
  }
  .negative-text {
    display: flex;
    max-width: 90%;
    margin: 0 auto;
    width: 100%;
    justify-content: space-between;
  }
  .value_count {
    font-weight: 500;
    color: var(--negative);
    margin-left: auto;
  }
  .dropdown-toggle {
    width: 100%;
    padding: 2rem;
    font-size: 1.4rem;
    line-height: 1.5;
    font-family: "Rubik", sans-serif;
    color: var(--text);
    font-weight: 500;
    box-shadow: none;
    border-radius: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    transition: 0.3s ease-in-out;

    @include tablet {
      justify-content: space-between;
    }

    @include desktop-lg {
      font-size: 1.8rem;
    }
  }
  .dropdown-toggle:hover {
    cursor: pointer;
  }
  .dropdown__search {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    padding: 0.5rem 3rem;
    position: relative;
    input {
      display: flex;
      box-sizing: border-box;
      width: 100%;
      border-radius: 8px;
      padding: 0.5rem 1.5rem 0.5rem 3rem;
      border-color: rgba(255,255,255, 0);
      background: var(--el_bg_grey);
      color: var(--text_inv);
      font-size: 16px;
      &::placeholder {
        color: var(--text_inv);
        font-size: 1.4rem;
        font-weight: 400;
      }
    }
  }
  .dropdown-search-icon {
    fill: var(--text);
    z-index: 100;
    opacity: .7;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 4rem;
  }
  .dropdown-list {
    box-sizing: border-box;
    margin: .2rem 0 0;
    list-style: none;
    font-size: 1.4rem;
    text-align: left;
    padding: 1rem 0;

    &:empty + .empty-result {
      display: flex;
    }
  }
  .empty-result {
    display: none;
    padding: 1rem 5rem;
    font-size: 1.4rem;
    font-weight: 400;
  }
  .dropdown-menu {
    position: absolute;
    top: 90%;
    left: 0;
    z-index: 1000;
    min-width: 100%;
    width: 100%;
    max-width: 31.5rem;
    box-sizing: border-box;
    background-color: var(--map);
    border: none;
    border-bottom-left-radius: .8rem;
    border-bottom-right-radius: .8rem;
    box-shadow: 0 .6rem 1.2rem rgba(0, 0, 0, 0.175);
    background-clip: padding-box;
    max-height: 40rem;
    overflow-y: auto;
    transition: 0.3s ease-in-out;
    animation: showDrop;
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    @include tablet {
      left: 0;
      max-width: 100%;
    }
    &::-webkit-scrollbar {
      background-color: var(--positive);
      width: 5px;
      border-radius: 0.8rem;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--map);
      border-radius: 0.8rem;
    }

    &::-webkit-scrollbar-thumb {
      border: .5rem solid var(--positive);
      border-radius: 0.8rem;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }
  }
  .filter__chevron {
    flex-shrink: 0;

    @include tablet {
      margin-left: 1rem;
    }
  }
  .dropdown-list > li {
    padding: 0 1rem;
  }
  .dropdown-list > li > a {

    padding: 1rem 3rem;
    font-family: "Rubik", sans-serif;
    display: block;
    flex-direction: row;
    clear: both;
    font-weight: normal;
    line-height: 1.6;
    color: var(--text);
    transition: .3s ease-in-out;

    white-space: nowrap;
    text-decoration: none;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    align-items: center;
    &.title-top {
      display: flex;
      align-items: center;
    }
    .filter__icon,
    .flag-icon {
      margin-right: 2rem;
    }
    .flag-icon {
      font-size: 1.6rem;
      border-radius: 0.4rem;
    }
    border-radius: 0.8rem;
  }
  .dropdown-list > li > a:hover {
    background: var(--el_bg_grey);
    color: var(--positive);
  }

  .dropdown-list > li {
    transition: 0.3s ease-in-out;
    overflow: hidden;
    width: 100%;
    position: relative;
    margin: 0;
    display: flex;
    align-items: center;
    animation: revealItem;
    animation-duration: 200ms;
    animation-timing-function: ease-in-out;

    .filter__icon--flag {
      border-radius: 4.4rem;
      box-shadow: 0px .2rem .6rem rgba(20, 78, 110, 0.1);
    }
    .filter__icon {
      width: 2.4rem;
      height: 2.4rem;
      margin-right: 0;
      margin-left: 3rem;
    }
  }

  li {
    list-style: none;
  }
  .negative__filter {
    .filter {
      height: 4rem;
      width: 8rem;
      border-radius: .8rem;
      margin-top: 1.5rem;
      &__icon--flag {
        font-size: 2rem;
        width: 3rem;
      }
      @include tablet {
        width: 100%;
      }
    }
  }
  .filter {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 9rem;
    border-radius: .8rem;
    transition: 0.3s ease-in-out;
    letter-spacing: 0.1px;
    z-index: 102;
    cursor: pointer;
    width: 100%;

    @include tablet {
      box-shadow: 0px .1rem .8rem rgba(20, 46, 110, 0.1);
      position: relative;
      background: var(--el_bg);
    }

    &__inner {
      width: 100%;
      transition: 0.3s ease-in-out;
      height: 100%;
    }
    &__icon {
      margin-right: 1.5rem;
      flex-shrink: 0;
      width: 4rem;
      transition: 0.3s ease-in-out;
      @include desktop-lg {
        width: 4rem;
        margin-right: 3rem;
      }
      &--flag {
        font-size: 3rem;
        border-radius: 0.8rem;
        box-shadow: 0px 5px 13px rgba(20, 78, 110, 0.1);
        width: 4rem;
      }
    }
    &__chevron {
      transition: 0.3s ease-in-out;
    }
  }
</style>
