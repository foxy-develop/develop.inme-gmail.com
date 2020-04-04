<template>
  <div class="periods">
    <label class="periods__item" v-for="period in periods">
      <input
        type="radio"
        :value="period.id"
        :name="period.id + '-' + name"
        v-model="current_period"
        @change="update"
      />
      <span class="periods__btn" v-ripple>{{
        period.name
      }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "DateSwitcher",
  props: {
    callback: Function,
    name: String,
    current: String
  },
  data() {
    return {
      current_period: "week",
      periods: [
        { id: "day", name: "День" },
        { id: "week", name: "Неделя" },
        { id: "month", name: "Месяц" }
      ]
    };
  },
  methods: {
    update() {
      this.callback(this.current_period);
    }
  },
  mounted() {
    this.current_period = this.current;
  }
}
</script>

<style scoped lang="scss">
.periods {
  display: flex;
  max-width: 32.6rem;
  width: 100%;

  &__item {
    display: flex;
    position: relative;
    flex-grow: 1;
    height: 4rem;

    &:first-child {
      .periods__btn {
        border-top-left-radius: 0.8rem;
        border-bottom-left-radius: 0.8rem;
      }
    }

    &:last-child {
      .periods__btn {
        border-top-right-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
      }
    }

    input {
      display: none;
      pointer-events: all;
      position: absolute;
      height: 100%;
      width: 100%;

      &:checked + .periods__btn {
        color: var(--checked_text);
        background: var(--checked_bg);
        box-shadow: 0px 5px 13px rgba(20, 78, 110, 0.1);

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  &__btn {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    color: var(--text_inv);
    transition: 0.3s ease-in-out;
    background: var(--el_bg_grey);
    cursor: pointer;
    &:hover {
      background: rgba(54, 66, 68, 0.1);
    }
  }
}
</style>
