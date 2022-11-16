<template>
  <div class="outer-wrapper">
    <div class="table-wrapper">
      <table class="table-data">
        <thead>
          <tr>
            <td class="df-center">
              <Checkbox @change="onCheckAll" />
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
          <tr v-for="e in modelValue.data">
            <td class="df-center">
              <div class="checkbox" ref="pr" tabindex="0">
                <input
                  v-model="employeesSelected"
                  :value="e.employeeID"
                  type="checkbox"
                  :id="e.employeeID"
                  class="checkbox__input"
                />
                <label :for="e.employeeID" class="checkbox__checkmark"></label>
              </div>
            </td>
            <td>{{ e.employeeCode }}</td>
            <td>{{ e.employeeName }}</td>
            <td>{{ e.phoneNumber }}</td>
            <td>{{ e.departmentName }}</td>
            <td>{{ appendSubject(e.subjects) }}</td>
            <td>{{ appendRoom(e.rooms) }}</td>
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
                  @click="remove(e.employeeID)"
                ></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <DialogConfirm
    v-if="showDialogConfirm"
    v-model="confirmRemove"
    v-model:show="showDialogConfirm"
  />
  <Dialog
    v-if="showDialog"
    v-model="dataEdit"
    v-model:showDialog="showDialog"
    :formType="edit"
  />
</template>

<script setup>
import Checkbox from "@/components/Checkbox.vue";
import { ref, watch, reactive } from "vue";
import { useStore } from "vuex";
import DialogConfirm from "./DialogConfirm.vue";
import Dialog from "@/components/Dialog.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  selected: {
    type: Array,
    required: true,
  },
});

const store = useStore();

/**
 * Xử lý remove
 */
const showDialogConfirm = ref(false);
const removeID = ref("");
const confirmRemove = ref(false);

function remove(code) {
  showDialogConfirm.value = true;
  removeID.value = code;
}

watch(
  () => confirmRemove.value,
  async () => {
    if (confirmRemove.value && removeID.value != "") {
      console.log("xoas");
      await store.dispatch("removeEmployee", removeID.value);
      await store.dispatch("loadEmployees");
      confirmRemove.value = false;
      removeID.value = "";
    }
  }
);

//--------- handle selected employee
const employeesSelected = ref([]);

const emit = defineEmits(["update:selected", "update:total"]);
watch(
  () => employeesSelected.value,
  () => {
    emit("update:selected", employeesSelected.value);
  }
);
// --------------------------------

// load employees
// onBeforeMount(() => {
//   store.dispatch("getEmployees", props.modelValue);
// })

//---------------- helpers function
const appendSubject = (subjects) => {
  let rs = "";
  for (let i = 0; i < subjects.length; i++) {
    rs += subjects[i].subjectName;
    if (i != rs.length - 1) {
      rs += ",";
    }
  }
  return rs;
};

const appendRoom = (rooms) => {
  let rs = "";
  for (let i = 0; i < rooms.length; i++) {
    rs += rooms[i].roomName;
    if (i != rs.length - 1) {
      rs += ",";
    }
  }
  return rs;
};
// ---------------------------------

const showDialog = ref(false);
// Show dialog thêm cán bộ, giáo viên khi người
// dùng lick vào button thêm
const openDialog = () => {
  showDialog.value = true;
};

const selectAll = ref(false);

watch(
  () => selectAll.value,
  () => {
    console.log("change", selectAll.value);
    Data.value.forEach((e) => {
      e.checked = selectAll.value;
    });
  }
);

let dataEdit = ref({ employeeName: "Demo" });

function edit(e) {
  if (e.dayOfResignation) {
    e.dayOfResignation = e.dayOfResignation.substring(0, 10);
  }
  openDialog();
  console.log(JSON.stringify(e));
  const data = JSON.parse(JSON.stringify(e));
  data.rooms = data.rooms.map((e) => e.roomID);
  data.subjects = data.subjects.map((e) => e.subjectID);
  dataEdit.value = data;
}

/**
 * Xử lý sự kiện check all checkbox
 * @param {*} e event
 * @author SONTB (08/11/2022)
 */
function onCheckAll(e) {
  // nếu checked thì add hết value vào selected
  if (e.target.checked) {
    employeesSelected.value = [];
    employeesSelected.value = props.modelValue.data.map((e) => e.employeeID);
  } else {
    // Nếu unchecked thì remove các value đã checked
    employeesSelected.value = [];
  }
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

      td:nth-child(7) {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      td:nth-child(6) {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  tr {
    td {
      vertical-align: middle;
    }
  }
}

.checkbox__input {
  display: none;
  // visibility: hidden;

  &:checked {
    + {
      .checkbox__checkmark {
        &:before {
          background-color: #03ae66;
          border: none;
        }

        &:after {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
}

.checkbox {
  display: flex;
  width: 20px;
  height: 20px;

  &:focus {
    border-radius: 4px;
    outline: none;
  }

  &:focus .checkbox__checkmark::before {
    outline: none;
    border-radius: 4px;
    border: 1px solid #02bf70;
  }

  .checkbox__checkmark {
    position: relative;
    padding-left: 2rem;
    cursor: pointer;

    &:before {
      content: "";
      width: 2rem;
      height: 2rem;
      background-color: #fff;
      border: 1px solid var(--line-gridpanel-color);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 4px;
      box-sizing: border-box;
    }

    &:after {
      content: "";
      position: absolute;
      width: 9px;
      height: 5px;
      top: 6px;
      left: 6px;
      transform: rotate(-45deg);
      border-left: 2px solid white;
      border-bottom: 2px solid white;
      opacity: 0;
      visibility: hidden;
      transition: 0.25s linear;
      box-sizing: border-box;
    }
  }
}
</style>
