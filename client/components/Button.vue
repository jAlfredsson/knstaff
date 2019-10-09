<template>
  <button
    :disabled="disabled"
    :type="type"
    @click="$emit('click')"
    class="w-full mt-3 py-3 text-white rounded-sm focus:outline-none hover:bg-kn-l2 text-sm"
    :class="{'bg-kn-d2': !loading, 'bg-kn-d2 cursor-not-allowed': loading}"
  >
    <loader v-if="loading" />
    <span v-else>{{ label }}</span>
  </button>
</template>
<script>
  export default {
    props: {
      type: {
        type: String,
        required: false,
        default: 'button',
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      label: {
        type: String,
        required: true

      },
      loading: {
        type: Boolean,
        required: false,
        default: false,
      }

    }
  }
</script>
