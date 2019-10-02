<template>
  <div>
    <div
      class="w-full h-12 text-xs text-white flex items-center justify-center"
      v-for="message in flashMessages"
      :key="message.id"
      :class="{ 'bg-green-500': message.type === 'success', 'bg-red-500': message.type === 'error'}"
    >
      {{ message.message }}
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
