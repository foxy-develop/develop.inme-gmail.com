<template>
  <div class="profile" v-if="isProfileLoaded">
    <Notification/>
    <svg
      class="profile__icon"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewbox="0 0 20 21"
      fill="none"
    >
      <path
        d="M19.2154 17.1377C18.7137 15.9589 17.9856 14.8881 17.0718 13.985C16.1607 13.0794 15.0814 12.3573 13.8936 11.8587C13.883 11.8534 13.8723 11.8508 13.8617 11.8455C15.5186 10.6583 16.5957 8.7245 16.5957 6.54271C16.5957 2.92839 13.6436 0 10 0C6.35641 0 3.4043 2.92839 3.4043 6.54271C3.4043 8.7245 4.48142 10.6583 6.13832 11.8481C6.12769 11.8534 6.11705 11.856 6.10641 11.8613C4.91493 12.3599 3.84579 13.0749 2.92824 13.9877C2.01524 14.8914 1.2873 15.962 0.784636 17.1403C0.290815 18.2939 0.0244864 19.5306 6.65049e-05 20.7837C-0.000643344 20.8118 0.00433542 20.8398 0.0147096 20.8661C0.0250837 20.8923 0.0406433 20.9162 0.0604714 20.9363C0.0802996 20.9565 0.103995 20.9725 0.130162 20.9834C0.156329 20.9944 0.184437 21 0.212831 21H1.80857C1.92559 21 2.01867 20.9077 2.02133 20.7942C2.07452 18.7575 2.89898 16.8501 4.35642 15.4044C5.86439 13.9085 7.86704 13.0854 10 13.0854C12.133 13.0854 14.1356 13.9085 15.6436 15.4044C17.101 16.8501 17.9255 18.7575 17.9787 20.7942C17.9813 20.9103 18.0744 21 18.1914 21H19.7872C19.8156 21 19.8437 20.9944 19.8698 20.9834C19.896 20.9725 19.9197 20.9565 19.9395 20.9363C19.9594 20.9162 19.9749 20.8923 19.9853 20.8661C19.9957 20.8398 20.0006 20.8118 19.9999 20.7837C19.9733 19.5226 19.71 18.2959 19.2154 17.1377V17.1377ZM10 11.0804C8.77926 11.0804 7.63033 10.6082 6.76598 9.75075C5.90162 8.89334 5.42556 7.75364 5.42556 6.54271C5.42556 5.33178 5.90162 4.19209 6.76598 3.33467C7.63033 2.47726 8.77926 2.00503 10 2.00503C11.2207 2.00503 12.3697 2.47726 13.234 3.33467C14.0984 4.19209 14.5744 5.33178 14.5744 6.54271C14.5744 7.75364 14.0984 8.89334 13.234 9.75075C12.3697 10.6082 11.2207 11.0804 10 11.0804Z"
      ></path>
    </svg>
    <span class="profile__name" v-text="getProfile.name"></span>
    <button class="profile__logout" @click="logout">
      <svg
        width="18"
        height="14"
        viewbox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.7002 4V2.5C11.7002 2.10218 11.5422 1.72064 11.2609 1.43934C10.9796 1.15804 10.5981 1 10.2002 1H3.00024C2.60242 1 2.22089 1.15804 1.93958 1.43934C1.65828 1.72064 1.50024 2.10218 1.50024 2.5V11.5C1.50024 11.8978 1.65828 12.2794 1.93958 12.5607C2.22089 12.842 2.60242 13 3.00024 13H10.2002C10.5981 13 10.9796 12.842 11.2609 12.5607C11.5422 12.2794 11.7002 11.8978 11.7002 11.5V10"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M14.1001 4L17.1001 7L14.1001 10"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M6.86304 7H17.1005"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import {USER_REQUEST} from "../../store/actions/user";
  import Notification from "./Notification";

  export default {
    name: "Profile",
    components: {
      Notification
    },
    data() {
      return {
        username: null
      }
    },
    created() {
      if( !this.isProfileLoaded && this.isAuthenticated ) this.USER_REQUEST();
    },
    methods: {
      ...mapActions(['AUTH_LOGOUT', 'USER_REQUEST']),
      logout: function () {
        this.AUTH_LOGOUT().then(() => this.$router.push('/login'))
      }
    },
    computed: {
      ...mapGetters(['getProfile', 'isProfileLoaded', 'isAuthenticated'])
    }
  }
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.25;
  transition: 0.3s ease-in-out;
  box-sizing: border-box;
  transition: 0.3s ease-in-out;
  color: var(--text);


  &__name {
    display: none;

    @include tablet {
      display: inline;
    }

  }

  &__icon {
    display: none;

    @include tablet {
      display: inline;
      margin-right: 2rem;
      transition: 0.3s ease-in-out;
      fill: var(--icon_color);
    }
  }

  &__logout {
    transition: 0.3s ease-in-out;
    height: 4rem;
    width: 4rem;
    stroke: var(--icon_color);
    background: rgba(255, 255, 255, 0);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;

    &:hover {
      stroke: $main;
    }
  }
}
</style>
