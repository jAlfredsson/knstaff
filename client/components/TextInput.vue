<template>
  <!-- <validation-provider rules="secret" v-slot="{ errors }"> -->
        <input
          :value="value"
          :placeholder="placeholder"
          :type="type"
          :name="name"
          @input="$emit('input', $event.target.value)"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
          @change="$emit('input', $event.target.value)"
          class="w-full bg-kn-l4 p-3 focus:outline-none text-black text-xs"
        >


        <!-- @input="$emit('input', $event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @change="$emit('input', $event.target.value)" -->
    <!-- <span>{{ errors[0] }}</span> -->
  <!-- </validation-provider> -->
</template>

<script>

  export default {

    props: {
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
    }
  }
</script>
