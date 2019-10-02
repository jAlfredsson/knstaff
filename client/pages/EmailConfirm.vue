<template>
  <h1 class="text-center my-16">
    Confirming email..
  </h1>
</template>
<script>
import { POST_CONFIRM_EMAIL } from '@store/auth/actions'
  export default {
    mounted(){
      console.log(this.$route.params.token);
      this.$store.dispatch(POST_CONFIRM_EMAIL, {
        token: this.$route.params.token
      })
        .then(response => {
          console.log(response.data)
          this.flash('Email confirmed')
          this.setAuth(response.data)
        }).catch(error => {
          this.flash('Error confirming email', 'error')
          this.$router.push('/')
        })
    }
  }
</script>
