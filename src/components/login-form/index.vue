<template>
  <div :class="[ 'login-form', {'has-error' : !!getErrorMessage } ]">
    <form class="login-form__form" @submit.prevent="login">
      <label
        class="login-form__label">
        <span v-if="!isPhoneApproved">Введите номер телефона: </span>
        <span v-else class="login-form__title"> Введите пароль из СМС:</span>
        <div class="login-form__check" v-if="!isPhoneApproved">
          <i :class="['flag-icon','flag-icon-' + country, isPhoneApproved && 'flag-icon--reverse']"></i>
          <imask-input
            ref="phone"
            class="login-form__input phone-input"
            v-model="phone"
            :mask="mask"
            :unmask="false"
            inputmode="numeric"
          />
        </div>
        <div class="login-form__check" v-else>
          <imask-input
            ref="password"
            class="login-form__input login-form__input--password"
            v-model="password"
            inputmode="numeric"
            type="password"
          />
        </div>
      </label>
      <button class="login-form__btn" type="submit" :disabled="loading">
        {{ loading ? "Подождите" : isPhoneApproved ? 'Подтвердить': 'Отправить' }}
      </button>
    </form>
    <div class="login-form__notif">{{ getErrorMessage }}</div>
  </div>
</template>

<script>
  import {IMaskComponent} from "vue-imask";
  import {mapActions, mapGetters} from "vuex";
  import allCountries from "../../constants/country.codes";

  export default {
    name: "LoginForm",
    data() {
      return {
        password: process.env.NODE_ENV === "production" ? "" : "000000",
        phone: process.env.NODE_ENV === "production" ? "" : "380633076719",
        country: "",
        mask: "+000000000000000",
        loading: false
      }
    },
    components: {
      "imask-input": IMaskComponent
    },
    methods: {
      ...mapActions(["AUTH_REQUEST", "AUTH_LOGIN"]),

      getCountry: function() {
        if (this.phone.length > 1) {
          const country = allCountries.filter(el =>
            !parseFloat(this.phone).toString().indexOf(el.dialCode));
          if (country.length > 1) {
            const sorted = country.slice().sort((a, b) => parseFloat(b.priority)
              ? 0 : parseFloat(a.priority) > parseFloat(b.priority)
                ? 1 : -1);
            this.country = sorted[country.length - 1].iso2;
            return
          } else {
            if (country.length > 0) this.country = country[0].iso2;
          }
        }
      },

      login() {
        const { password, phone } = this;
        this.loading = true;
        this.isPhoneApproved
          ? this.AUTH_LOGIN({ password, phone }).then(() => (this.loading = false))
          : this.AUTH_REQUEST(phone).then(() => { this.loading = false; });
      }
    },
    computed: {
      ...mapGetters(["isPhoneApproved", "getErrorMessage"])
    },

    watch: {
      phone: function() {
        this.getCountry();
      }
    },
  }
</script>

<style scoped lang="scss">
  .away {
    animation: flag-reveal;
  }
  .flag-icon {
    position: absolute;
    top: 50%;
    font-size: 2rem;
    border-radius: .8rem;
    left: 2rem;
    margin: 0;
    transition: .3s ease-in-out;
    animation: flag-reveal ;
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    transform-origin: top;
    transform: translateY(-50%);
    &--reverse {
      opacity: 0;
      transition: .15s ease-out;
    }
  }
  .login-form {
    width: 100%;
    position: relative;

    &__form {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      transition: 0.2s ease-in-out;
    }



    &__check {
      position: relative;
      display: flex;
      flex-direction: column;
      margin-bottom: 4rem;
      width: 100%;
      max-width: 28rem;
      height: 4.8rem;


    }
    &__label {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      span {
        transition: 0.3s ease-in-out;
        animation: reveal-form;
        animation-duration: 0.3s;
        animation-timing-function: ease-in-out;
        animation-delay: .85s;
        animation-fill-mode: forwards;
        transform-origin: top;
        margin-bottom: 1rem;
        color: $grey;
        opacity: 0;
        transform: translate(0, -50%);
        font-family: "Rubik", sans-serif;

        &.login-form__title {
          animation-delay: 0s;
        }
      }
    }
    &__input,
    &__btn {
      animation: reveal-form;
      animation-duration: 0.4s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
      transform-origin: top;
      animation-delay: .85s;
      opacity: 0;
      transform: translate(0, -50%);
    }

    &__input {
      background: rgba($white, 0.05);
      box-shadow: 0 0.1rem 0.8rem rgba($shadow-color, 0.02);
      border-radius: 3.7rem;
      border: 1px solid rgba($white, 0.04);
      height: 4.8rem;
      padding: 1.4rem 2rem;
      max-width: 28rem;
      width: 100%;
      box-sizing: border-box;
      text-align: center;
      font-size: 1.6rem;
      color: rgba($white, 0.8);
      transition: .3s ease-in-out;
      .login-form__check {
        .flag-icon {
          opacity: 1;
        }
      }
      &::placeholder {
        color: $white;
        transition: border 0.3s ease-in-out;
        opacity: 1;
      }

      &:focus {
        box-shadow: 0 0.1rem 0.8rem rgba($shadow-color, 0.06);
        border: 1px solid rgba($white, 0.12);
        &::placeholder {
          opacity: 0.1;
        }
      }

      &--password {
        transform: translate(0, -10%);
        opacity: 0;
        animation: reveal-form;
        animation-duration: 0.3s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
        transform-origin: top;
        .login-form__check {
          .flag-icon {
            opacity: 0;
          }
        }
      }

    }
    &__notif {
      color: red;
      position: absolute;
      top: 8.5rem;
      font-family: "Roboto", sans-serif;
      font-size: 1.2rem;
      transform: translateX(-50%);
      left: 50%;
      opacity: 1;
      transition: 0.3s ease-in-out;
    }

    &__text {
      color: $grey;
      font-size: 1.4rem;
      text-decoration: none;
      cursor: pointer;
      opacity: 0.5;
      margin-bottom: 4rem;
      text-transform: lowercase;
      transition: 0.25s ease-in-out;
      padding: 1.5rem 0;
      @include desktop-lg {
        margin-bottom: 12rem;
      }
      &:hover {
        color: rgba($white, 0.8);
      }
    }

    &__title {
      animation: reveal-form;
      animation-duration: .3s;
      animation-delay: 0s;
    }

    &__btn {
      color: $white;
      background: $main;
      box-shadow: 0 0.1rem 0.8rem rgba($shadow-color, 0.1);
      border-radius: 3.7rem;
      overflow: hidden;
      height: 4.8rem;
      box-sizing: border-box;
      padding: 0 1.4rem;
      font-weight: 500;
      font-size: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      max-width: 23rem;
      width: 100%;
      transition: 0.3s ease-in-out;
      border: none;
      &:hover {
        background: $main-hover;
      }
    }
  }

  .has-error {
    .login-form__input {
      border-color: rgba(132, 30, 30, 0.5);
      &:not(:focus) {
        background: rgba(236, 34, 34, 0.05);
        &::placeholder {
          color: rgba(255, 190, 183, 0.84);
        }
      }
    }
    .login-form__notif {
      opacity: 1;
      transition: 0.3s ease-in-out;
    }
  }
</style>
