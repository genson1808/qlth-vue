<template>
  <Toolbar v-model:selected="employeesSelected" v-model="paging.filters" :paging="paging"/>
  <TableData v-model="getEmployees" v-model:selected="employeesSelected" v-model:total="getEmployees.total" :paging="paging"/>
  <FooterTable v-model="paging.pageNumber" :total="getEmployees.total" :pageSize="getEmployees.pageSize"/>
</template>

<script setup>
import { ref, provide, reactive, watch, onBeforeMount, onMounted, computed} from "vue";
import {useStore} from "vuex";

import Toolbar from "@/components/Toolbar.vue";
import Checkbox from "@/components/Checkbox.vue";
import TableData from "@/components/TableData.vue";
import FooterTable from "@/components/FooterTable.vue";
import Dialog from "@/components/Dialog.vue";

const employeesSelected = ref([]);

const paging = reactive({
  pageNumber: 1,
  pageSize: 20,
  filters: {},
  sorts: {
    CreatedDate: "DESC"
  },
})

let total = ref(0);

const store = useStore();
//load employees
onBeforeMount(() => {
  store.dispatch("getEmployees", paging);
  store.dispatch("getRooms");
  store.dispatch("getDepartments");
  store.dispatch("getSubjects");
})



const getEmployees = computed(() => {
  console.log("in computed")
  return store.getters.employees;
})

total.value = store.getters.employees.total;

watch(() => paging.pageNumber, () => {
  store.dispatch('getEmployees', paging);
})

watch(paging, () => {
  console.log("changed filters")
  store.dispatch('getEmployees', paging);
}, { deep: true })

const formModel = reactive({
  employeeName: "",
  employeeCode: "",
  phoneNumber: "",
  email: "",
  employeeRoom: [],
  employeeSubject: [],
  department: "",
  IsEquipmentManagement: false,
  isWorking: true,
});

provide("employeeModel", formModel);

const checked = ref(true);
function change() {
  checked.value = !checked.value;
}
</script>

<style lang="scss" scoped>

</style>
