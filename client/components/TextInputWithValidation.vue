<template>
  <div class="mb-3">
    <ValidationProvider :vid="vid" :rules="rules" mode="eager" v-slot="{ errors }">
      <text-input
        v-model="innerValue"
        :error="errors[0]"
        :value="value"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        />
        <span class="text-red-500 text-xs">{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>

<script>
 // import { ValidationProvider } from 'vee-validate';
// import TextInput from './components/TextInput.vue';

export default {

  props: {
    vid: {
      type: String,
      required: false
    },
    rules: [String], // we need this
    placeholder: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    }
  },

  data: () => ({
    innerValue: null
  }),
  watch: {
    innerValue(val) {
      this.$emit('input', val);
    }
  }
};
</script>
