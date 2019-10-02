<template>
  <div>
    <flash />
    <div v-if="auth && !confirmed" class="w-full h-12 text-xs text-purple-600 bg-pink-200 flex items-center justify-center">
      Please confirm your account. Didn't receive an email?
      <span @click="resendEmailConfirm" class="ml-2 underline cursor-pointer hover:text-purple-900">Click here to resend email.</span>
    </div>
    <div class="h-2 w-full bg-purple-300"></div>
      <div class="w-full h-12 flex items-center justify-between px-6">
        <router-link to="/" class="no-underline text-purple-500">
          Kiss O'Bajslofski Bögporr för alla
        </router-link>
        <div v-if="!auth">
          <router-link class="no-underline text-pink-500" to="/auth/login">Log in</router-link>
          <router-link class="no-underline text-pink-500 border-2 border-purple-500 px-3 py-2 hover:text-purple-900 hover:border-purple-900 rounded-full ml-3" to="/auth/register">Register</router-link>
        </div>
        <div v-else="auth">
          <span class="cursor-pointer text-pink-500 hover:text-pink-800" @click="unsetAuth">Logout</span>
        </div>
      </div>

    <router-view></router-view>
  </div>
</template>
<script>
import Flash from '@components/Flash.vue'
  export default {
    components: {Flash}
  }
</script>
