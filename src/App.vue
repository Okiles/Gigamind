<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img src="./assets/gigamind.png" alt="Logo" class="logo">
    <h1>Gigamind</h1>
  </header>

  <RouterView />
</template>

<script>
import { provide, ref } from 'vue';
</script>

<style>
body{
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  color: white;
  background-color: #000033;
}

header{
  background-color: #1a1a1a;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

.logo{
  width: 50px;
  margin: 10px;
}

h1{
  font-size: 1.5rem;
  margin: 10px;
}
</style>
