import { SET_AUTH, UNSET_AUTH, POST_RESEND_EMAIL_CONFIRM } from "@store/auth/actions";

export default {
  // data (){
  //   return {
  //     auth: false,
  //   }
  // },
  watch: {
    // auth() {
    //   console.log('auth change')
    // }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    auth: {
      get: function () {
        return !!this.$store.state.auth.user;
      },

      cache: false
    },
    confirmed() {
      return !!this.$store.state.auth.user.emailConfirmedAt
    }
  },
  methods: {
    setAuth(payload) {
      localStorage.setItem("auth", JSON.stringify(payload));
      this.$store.commit(SET_AUTH, payload);
      this.$router.push("/");
      console.log('post login auth -->', this.auth);
    },
    unsetAuth() {
      localStorage.removeItem("auth");
      this.$store.commit(UNSET_AUTH);
      this.flash('Successfully logged out.')
      console.log('post logout auth -->', this.auth);
      // this.$router.push("/");
    },
    resendEmailConfirm() {
      this.$store.dispatch(POST_RESEND_EMAIL_CONFIRM)
        .then(() => {
          this.flash('Successfully resent confirm email.')
          this.$router.push('/')
        }).catch(() => {
          this.flash('Error resending confirm email', 'error')
          this.$router.push('/')
        })
    }
  }
};
