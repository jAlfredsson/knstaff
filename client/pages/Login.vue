<template>
  <div class="container my-16 w-full mx-auto">
    <div class="max-w-sm mx-auto h-12">
      <h2 class="text-center text-lg text-purple-500">Kom in och böga</h2>
      <div class="w-full bg-white shadow mt-5 rounded-sm p-8">
        <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
          <form @submit.prevent="passes(login)">
            <TextInputWithValidation
              name="email"
              rules="required|email"
              vid="email"
              :value="model.email"
              v-model="model.email"
              placeholder="Enter your email"
            />
            <TextInputWithValidation
              name="password"
              rules="min:6"
              type="password"
              vid="password"
              :value="model.password"
              v-model="model.password"
              placeholder="Enter your password"
            />
            <div class="my-5 flex justify-center items-center">
              <router-link v-if="!sentResetLink" to="/auth/passwords/email" class="no-underline text-xs text-purple-500">Forgot Password</router-link>
              <span v-else class="text-xs text-purple-500">Password reset email successfully sent</span>
            </div>
            <btn
              label="Sign in"
              type="submit"
              :disabled="loading"
              :loading="loading"
            />
          </form>
        </ValidationObserver>
      </div>
    </div>

  </div>
</template>

<script>
 import { POST_LOGIN } from '@store/auth/actions'
 import formMixin from '@client/mixins/form'
  export default {
    mixins: [formMixin],
    data: () => ({
      sentResetLink: false,
      model: {
        email: '',
        password: '',
      },
    }),
    methods: {
     login() {
       const self = this;
       this.toggleLoading()
        this.$store.dispatch(POST_LOGIN, this.model)
          .then(response => {
            this.toggleLoading()
            this.flash('Sign in successful')
            this.setAuth(response.data)
          })
          .catch(error => {
            console.log('error', error)
            this.toggleLoading();
            Object.keys(error.response.data).forEach(field => {
              this.$refs.observer.setErrors({
                [field]: [error.response.data[field]],
              })

            })
          })
      },
    },

  }
</script>
