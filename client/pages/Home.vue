<template>
  <div class="my-32">
    <h1 class="text-center text-purple-500" v-if="!auth">
      Kiss O'Bajslofski Bögporr välkommen!
    </h1>
    <h1 class="text-center text-purple-500" v-else>
      Välkommen stjärtgosse {{ user.name }}
    </h1>
  </div>
</template>
