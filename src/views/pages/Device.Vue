<template>
  <div class="wp">
    <h1>Page thiết bị</h1>
    <button @click="created">create toast</button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import DialogConfirm from "@/components/DialogConfirm.vue";

const store = useStore();

const created = () => {
  console.log(store.getters.toasts.length);
  store.dispatch('addToast', {
    title: 'Hello Vuex! error!',
    type: 'error',
    message: 'It looks like you have successfully set up Vuex.'
  });
  store.dispatch('addToast', {
    title: 'Hello Vuex! success!',
    type: 'success',
    message: 'It looks like you have successfully set up Vuex.'
  });
  store.dispatch('addToast', {
    title: 'Hello Vuex! warning!',
    type: 'warning',
    message: 'It looks like you have successfully set up Vuex.'
  });
  store.dispatch('addToast', {
    title: 'Hello Vuex! info!',
    type: 'info',
    message: 'It looks like you have successfully set up Vuex.'
  });
  console.log(store.getters.toasts);
}
</script>

<style lang="scss" scoped>
.wp {
  background-color: greenyellow;
}
</style>
