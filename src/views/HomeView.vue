<template>
  <div class="wrapper">
    <Sidebar />
    <div class="container">
      <Header />
      <div class="main-content-wrapper">
        <div class="content">
          <router-view v-if="currentRoute === 'overview' && noData.overview
          || currentRoute === 'device' && noData.device
          || currentRoute === 'report' && noData.report
          || currentRoute === 'system' && noData.system
          || currentRoute === 'borrow-and-give-back' && noData.borrowAndGiveBack" />
          <NoData v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import NoData from "@/components/NoData.vue";
import { useStore } from "vuex";
import { provide, reactive, computed } from "vue";
import { useRoute } from "vue-router";

const currentRoute = computed(() => {
  return useRoute().name
})

const store = useStore();
const noData = computed(() => store.getters.noData);

/**
 * state for home page
 */
const states = reactive({
  collapsed: false,
  menuItemActivated: 0,
  dialog: {
    show: false,
    form: "create", // create | edit
  },
});

provide("states", states);
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;

  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: calc(100% - 220px);
  }

  .toggle {
    width: 50px;
  }
}

.main-content-wrapper {
  flex: 1;

  .content {
    width: inherit;
    height: 100%;

    position: relative;
  }

  .content .dflex {
    display: flex;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 48px);
  }

  .center {
    text-align: center;
  }
}
</style>
