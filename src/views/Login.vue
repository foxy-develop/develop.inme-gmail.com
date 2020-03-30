<template>
    <form class="form" @submit.prevent="login">
      <label
        class="login-form__label">
        <span>Введите номер телефона: </span>
        <div class="login-form__check">
          <i :class="['flag-icon','flag-icon-' + country]"></i>
          <imask-input
            v-if="!isPhoneApproved"
            ref="phone"
            class="login-form__input phone-input"
            v-model="phone"
            :mask="mask"
            :unmask="false"
            inputmode="numeric"
          />
          <imask-input
            v-if="isPhoneApproved"
            ref="password"
            class="login-form__input login-form__input--password"
            v-model="password"
            inputmode="numeric"
            type="password"
          />
        </div>
      </label>
      <button
        class="login-form__btn"
        type="submit"
      >
        {{ isPhoneApproved ? "Подтвердить" : "Отправить" }}
      </button>
    </form>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { IMaskComponent } from "vue-imask";
  import allCountries from "../constants/country.codes";

  export default {
  name: "Login",
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

</style>
