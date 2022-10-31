<template>
  <Toolbar />
  <TableData />
  <FooterTable />
</template>

<script setup>
import Toolbar from "@/components/Toolbar.vue";
import Checkbox from "@/components/Checkbox.vue";
import Checkbox2 from "@/components/Checkbox2.vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import TableData from "@/components/TableData.vue";
import FooterTable from "@/components/FooterTable.vue";

import { ref } from "vue";

const checked = ref(true);
function change() {
  checked.value = !checked.value;
}
</script>

<style lang="scss" scoped></style>
