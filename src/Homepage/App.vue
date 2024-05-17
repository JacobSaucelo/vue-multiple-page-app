<script setup>
console.log("console: ", import.meta.env.VITE_HELLO_WORLD);
</script>

<template>
  <h1>Hello world!!!</h1>
  <div class="card flex justify-content-center">
    <Button> Hello this is a prime vue button </Button>
  </div>
</template>

<style scoped>
h1 {
  background-color: red;
}
</style>
