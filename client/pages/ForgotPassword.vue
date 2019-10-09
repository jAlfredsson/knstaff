<template>
  <div class="container my-16 w-full mx-auto">
    <div class="max-w-sm mx-auto h-12">
      <h2 class="text-center text-lg text-purple-500">Forgot password</h2>
      <div class="w-full bg-white shadow mt-5 rounded-sm p-8">
        <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
          <form @submit.prevent="passes(forgotPassword)">
            <TextInputWithValidation
              name="email"
              rules="required|email"
              vid="email"
              :value="model.email"
              v-model="model.email"
              placeholder="Enter your email"
            />
            <btn
              label="Send Password reset link"
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
 import { POST_FORGOT_PASSWORD } from '@store/auth/actions'
 import formMixin from '@client/mixins/form'
  export default {
    mixins: [formMixin],
    data: () => ({
      model: {
        email: '',
      },
    }),
    methods: {
     forgotPassword() {
       this.toggleLoading()
        this.$store.dispatch(POST_FORGOT_PASSWORD, this.model)
          .then(response => {
            this.toggleLoading()
            this.flash('Password reset link sent. It expires in 5 minutes.')
            this.$router.push({path: '/login', props: {sentResetLink: true}})
          })
          .catch(error => {
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
