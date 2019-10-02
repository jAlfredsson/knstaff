<template>
  <div class="container my-16 w-full mx-auto">
    <div class="max-w-sm mx-auto h-12">
      <h2 class="text-center text-lg text-purple-500">Register</h2>
      <div class="w-full bg-white shadow mt-5 rounded-sm p-8">
        <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
          <form @submit.prevent="passes(submit)">
            <TextInputWithValidation
              name="name"
              rules="required|min:5"
              vid="name"
              :value="model.name"
              v-model="model.name"
              placeholder="Enter your name"
            />
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

            <btn
              label="Sign up"
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
 import { POST_REGISTER } from '@store/auth/actions'
 import formMixin from '@client/mixins/form'

  export default {
    mixins: [formMixin],
    data: () => ({
      model: {
        name: '',
        email: '',
        password: '',
      },
    }),
    methods: {
     submit() {
       this.toggleLoading()
        this.$store.dispatch(POST_REGISTER, this.model)
          .then(response => {
            this.toggleLoading()
            this.flash('Succesfully registered')
            this.setAuth(response.data)
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
