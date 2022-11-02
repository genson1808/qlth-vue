<template>
  <Toolbar />
  <TableData />
  <FooterTable />
  <Dialog />
</template>

<script setup>
import { provide, reactive } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import Checkbox from "@/components/Checkbox.vue";
import Checkbox2 from "@/components/Checkbox2.vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import TableData from "@/components/TableData.vue";
import FooterTable from "@/components/FooterTable.vue";
import Dialog from "@/components/Dialog.vue";

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

import { ref } from "vue";

const checked = ref(true);
function change() {
  checked.value = !checked.value;
}
</script>

<style lang="scss" scoped></style>
