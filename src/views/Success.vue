<script setup>
import '@/style/success.scss'
import { RouterLink, RouterView } from 'vue-router'
import successImg from '../assets/success.png'
</script>

<template>
<!-- This page can be used if success massage is needed to be shown on the next page -->
  <div class="success">
    <h1 class="success__title">User successfully registered</h1>
    <img class="success__img" src="../assets/success.png" alt="Success registration">
  </div>
</template>
