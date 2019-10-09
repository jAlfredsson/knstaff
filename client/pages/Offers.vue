<template>
  <div>
    <h1>Offers {{ this.$store.state.auth.user.name }}</h1>
    <span v-for="offer in offers">{{ offer.name }}</span>
  </div>
</template>
<script>
  import { GET_OFFERS } from '@store/auth/actions'
  export default {
    data: () => ({
      offers: [],
    }),
    created: function () {
      this.offers = this.$store.dispatch(GET_OFFERS).then((res) => {
        this.offers = res.data
      }).catch((err) => {

      })

    }
    // created: function () {
    //   this.offers = ['Brittan']
    // }
  }
</script>
