<template>
  <div class="outer-wrapper">
    <div class="table-wrapper">
      <table class="table-data">
        <thead>
          <tr>
            <td class="df-center">
              <Checkbox v-model="selectAll" />
            </td>
            <td title="Số hiệu cán bộ">Số hiệu cán bộ</td>
            <td title="Họ và tên">Họ và tên</td>
            <td title="Số điện thoại">Số điện thoại</td>
            <td title="Tổ chuyên môn">Tổ chuyên môn</td>
            <td title="Quản lý theo môn">QL theo môn</td>
            <td title="Quản lý kho, phòng">QL kho, phòng</td>
            <td title="Đào tạo quản lý thiết bị">Đào tạo QLTB</td>
            <td title="Đang làm việc">Đang làm việc</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in Data">
            <td class="df-center">
              <Checkbox v-model="e.checked" />
            </td>
            <td>{{ e.employeeCode }}</td>
            <td>{{ e.employeeName }}</td>
            <td>{{ e.phoneNumber }}</td>
            <td>{{ e.department }}</td>
            <td>{{ e.employeeSubject }}</td>
            <td>{{ e.employeeRoom }}</td>
            <td class="center">
              <span
                :class="e.IsEquipmentManagement ? 'data-checked' : ''"
              ></span>
            </td>
            <td class="center">
              <span :class="e.isWorking ? 'data-checked' : ''"></span>
            </td>
            <td>
              <div class="btn-action-wrapper">
                <div class="btn-action btn-edit" @click="edit(e)"></div>
                <div
                  class="btn-action btn-remove"
                  @click="remove(e.employeeCode)"
                ></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Checkbox from "@/components/Checkbox.vue";
import { Data } from "@/helpers/Data.js";
import { ref, watch, inject } from "vue";

const states = inject("states");
let employee = inject("employeeModel");

const showDialog = () => {
  states.dialog.show = true;
};

const selectAll = ref(false);
const selected = ref([]);

watch(
  () => selectAll.value,
  () => {
    console.log("change", selectAll.value);
    Data.value.forEach((e) => {
      e.checked = selectAll.value;
    });
  }
);

function remove(code) {
  let i = Data.value.findIndex((e) => e.employeeCode === code);
  if (i >= 0) {
    Data.value.splice(i, 1);
  }
}

function edit(e) {
  states.dialog.form = "edit";
  console.log(employee);
  employee = Object.assign({}, {});
  employee.employeeName = e.employeeName;
  employee.employeeSubject = [];
  employee.employeeRoom = [];
  showDialog();
}
</script>

<style lang="scss" scoped>
/*.table-data thead tr {*/
/*  border-top: 1px solid var(--line-gridpanel-color);*/
/*  border-bottom: 1px solid var(--line-gridpanel-color);*/
/*}*/

tr td:first-child {
  height: 40px;
}
.center {
  text-align: center;
}

.df-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.data-checked {
  display: block;
  background-image: url(@/assets/Icons/ic_Check.png);
  background-repeat: no-repeat;
  background-size: 20px 20px;
  width: 20px;
  height: 20px;
  margin: 0 auto;
}
.btn-action-wrapper {
  width: 48px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.btn-action {
  width: 20px;
  height: 20px;
  &:hover {
    cursor: pointer;
  }
}
.btn-edit {
  background-image: url(@/assets/Icons/ic_Edit.png);
  background-repeat: no-repeat;
  background-size: 20px 20px;
}
.btn-remove {
  background-image: url(@/assets/Icons/ic_Remove.png);
  background-repeat: no-repeat;
  background-size: 20px 20px;
  &:hover {
    background-image: url(@/assets/Icons/ic_Remove_Hover.png);
    background-repeat: no-repeat;
    background-size: 20px 20px;
  }
}
.outer-wrapper {
  height: calc(100% - 172px);
  flex: 1;
  width: 100%;
  padding: 0 16px;
}
.table-wrapper {
  max-height: 100%;
  overflow-y: scroll;
}
.table-data {
  // border-collapse: collapse;
  border-collapse: separate;
  min-width: max-content;
  width: 100%;
  thead {
    height: 40px;
    background-color: var(--header-gridpanel-color);
    font-family: OpenSans Semibold;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 2;
    tr {
      td {
        border-top: 0px;
        text-align: center;
      }
    }
  }
  td {
    border: 0.5px solid var(--line-gridpanel-color);
    height: 100%;
    &:first-child {
      border-left: 1px solid transparent;
      min-width: 50px;
    }
    &:last-child {
      border-right: 1px solid transparent;
      width: 32px;
    }
  }
  tbody {
    tr {
      height: 40px;
      td {
        padding: 0 8px;
      }
    }
  }
  tr {
    td {
      vertical-align: middle;
    }
  }
}
</style>
