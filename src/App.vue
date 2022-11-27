<template>
  <router-view />
  <Loading />
  <Toasts />
  <PopUpError v-if="errors.length > 0"/>
</template>

<script setup>
import Loading from "@/components/common/BaseLoading.vue";
import Toasts from "@/components/common/toast/BaseToasts.vue";
import PopUpError from "@/components/common/PopUpError.vue";
import {useStore} from "vuex";
import {computed} from "vue";
const store = useStore();
const errors = computed(() => store.getters.errs)
</script>
