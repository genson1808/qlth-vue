<template>
  <router-view />
  <Loading />
  <Toasts />
</template>

<script setup>
import Loading from '@/components/Loading.vue';
import Toasts from '@/components/Toasts.vue';
</script>
