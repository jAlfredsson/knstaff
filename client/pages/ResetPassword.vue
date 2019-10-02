<template>
  <div class="container my-16 w-full mx-auto">
    <div class="max-w-sm mx-auto h-12">
      <h2 class="text-center text-lg text-purple-500">Kom in och böga</h2>
      <div class="w-full bg-white shadow mt-5 rounded-sm p-8">
        <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
          <form @submit.prevent="passes(resetPassword)">
            <TextInputWithValidation
              name="password"
              rules="min:6"
              type="password"
              vid="password"
              :value="model.password"
              v-model="model.password"
              placeholder="Enter your new password"
            />
            <btn
              label="Reset password"
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
 import { POST_RESET_PASSWORD } from '@store/auth/actions'
 import formMixin from '@client/mixins/form'
  export default {
    mixins: [formMixin],
    data: () => ({
      sentResetLink: false,
      model: {
        password: '',
      },
    }),
    methods: {
     resetPassword() {
       this.toggleLoading()
        this.$store.dispatch(POST_RESET_PASSWORD, {
          ...this.model,
          token: this.$route.params.token
        })
          .then(response => {
            this.toggleLoading()
            this.$router.push('/')
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
