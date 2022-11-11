<template>
    <Toolbar v-model:selected="employeesSelected" v-model="paging.filters" />
    <TableData v-model="getEmployees" v-model:selected="employeesSelected" v-model:total="getEmployees.total" />
    <FooterTable v-model="paging.pageNumber" :total="getEmployees.total" :pageSize="getEmployees.pageSize" />
</template>

<script setup>
import { ref, provide, reactive, watch, onBeforeMount, onMounted, computed } from "vue";
import { useStore } from "vuex";

import Toolbar from "@/components/Toolbar.vue";
import Checkbox from "@/components/Checkbox.vue";
import TableData from "@/components/TableData.vue";
import FooterTable from "@/components/FooterTable.vue";
import Dialog from "@/components/Dialog.vue";

// Biến mapping với các employee đã checked khong tabledata
const employeesSelected = ref([]);

let total = ref(0);
const store = useStore();

//load dữ liệu trước khi component mount
onBeforeMount(() => {
    store.dispatch("loadEmployees");
    store.dispatch("getRooms");
    store.dispatch("getDepartments");
    store.dispatch("getSubjects");
})

/**
 * get danh sách cán bộ, giáo viên
 * @author SOTB (11/10/2022)
 */
const getEmployees = computed(() => {
    return store.getters.employees;
})

/**
* lấy thông tin paging
* @author SONTB (11/10/2022)
*/
const paging = computed(() => {
    return store.getters.employeePaging;
})

total.value = getEmployees.total;

/**
 * theo dõi page thay đổi và load lại data
 * @author SOTB (11/10/2022)
 */
watch(paging, () => {
    store.dispatch('loadEmployees');
}, { deep: true });

</script>

<style lang="scss" scoped>

</style>