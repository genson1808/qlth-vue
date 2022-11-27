<template>
  <Toolbar v-model:selected="employeesSelected" v-model="paging.filters" />
  <TableData v-model="getEmployees" v-model:selected="employeesSelected" />
  <FooterTable
    v-model="paging.pageNumber"
    :total="getEmployees.total"
    :maxPage="getEmployees.maxPage"
    :pageSize="getEmployees.pageSize"
  />
</template>

<script setup>
import { ref, watch, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";

import * as acs from "@/store/modules/consts.js";

import Toolbar from "@/components/ui/pages/overview/Toolbar.vue";
import TableData from "@/components/ui/pages/overview/TableData.vue";
import FooterTable from "@/components/ui/pages/overview/FooterTable.vue";

// Biến mapping với các employee đã checked khong tabledata
const employeesSelected = ref([]);

const store = useStore();

//load dữ liệu trước khi component mount
onBeforeMount(() => {
  store.dispatch(acs.LOAD_EMPLOYEES_ACTION);
  store.dispatch(acs.GET_ROOMS_ACTION);
  store.dispatch(acs.GET_DEPARTMENTS_ACTION);
  store.dispatch(acs.GET_SUBJECTS_ACTION);
});

/**
 * get danh sách cán bộ, giáo viên
 * @author SOTB (11/10/2022)
 */
const getEmployees = computed(() => {
  return store.getters.employees;
});

/**
 * lấy thông tin paging
 * @author SONTB (11/10/2022)
 */
const paging = computed(() => {
  return store.getters.employeePaging;
});

/**
 * theo dõi page thay đổi và load lại data
 * @author SOTB (11/10/2022)
 */
watch(
  paging,
  () => {
    store.dispatch(acs.LOAD_EMPLOYEES_ACTION);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
