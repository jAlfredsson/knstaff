import { AUTH_LOGOUT, SET_AUTH, UNSET_AUTH, POST_RESEND_EMAIL_CONFIRM } from "@store/auth/actions";

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
    auth () {
      return this.$store.state.auth.status === 'success';
    },
    confirmed() {
      return !!this.$store.state.auth.user.emailConfirmedAt
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT)
      .then(() => {
        this.$router.push('/login')
      })
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
