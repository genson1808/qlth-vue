<template>
  <div class="dialog">
    <div class="dialog__body" ref="dialog">
      <div class="wrapper__left">
        <div class="body__left">
          <div class="img-box">
            <img src="@/assets/Icons/default_avatar.png" alt="" />
          </div>
          <div class="btn-upload">Chọn ảnh</div>
          <div class="info-box">
            <h4 class="fullname"> {{ employee.employeeName ? employee.employeeName : "Họ và tên" }} </h4>
            <h5 class="code"> {{ employee.employeeCode ? employee.employeeCode : "SHC001" }} </h5>
          </div>
        </div>
      </div>
      <div class="body__right">
        <div class="add__employee--dialog">
          <div class="title"> {{ formType == "create" ? 'Thêm hồ sơ cán bộ, giáo viên' : `Chỉnh sửa hồ sơ cán bộ giáo
          viên`}}</div>
          <form id="add-employee-form">
            <div class="form-wrapper">
              <InputDataList :recommends="[recommendCode]" :required="true" name="employeeCode" :error="errors.code"
                v-model="employee.employeeCode" label="Số hiệu cán bộ" class="form-stack-1" />
              <!-- <BaseInput :required="true" name="employeeCode" :error="errors.code" v-model="employee.employeeCode"
                label="Số hiệu cán bộ" class="form-stack-1" /> -->
              <BaseInput :required="true" name="employeeName" :error="errors.name" v-model="employee.employeeName"
                label="Họ và tên" class="form-stack-2" />
              <BaseInput name="phoneNumber" :error="errors.phone" v-model="employee.phoneNumber" label="Số điện thoại"
                class="form-stack-3" />
              <BaseInput name="email" :error="errors.email" v-model="employee.email" label="Email"
                class="form-stack-4" />
              <div class="form-stack-5 input-stack">
                <div class="wrap-label">
                  <label title="Tổ bộ môn">Tổ bộ môn</label>
                </div>
                <Dropdown v-model="employee.departmentID" :data="getDepartments" />
              </div>
              <div class="form-stack-6 input-stack">
                <div class="wrap-label">
                  <label title="Quản lý theo môn">QL theo môn</label>
                </div>
                <Combobox v-model="employee.subjects" :data="getSubjects" />
              </div>
              <div class="form-stack-7 input-stack">
                <div class="wrap-label">
                  <label title="Quản lý kho, phòng">QL kho, phòng</label>
                </div>
                <Combobox v-model="employee.rooms" :data="getRooms" :width="580" />
              </div>
              <div class="form-stack-8 input-stack">
                <div class="checkbox-wrapper">
                  <Checkbox v-model="employee.IsEquipmentManagement" />
                  <span class="cb-value ml-8"> Trình độ nghiệp vụ QLTB </span>
                </div>
                <div class="checkbox-wrapper">
                  <Checkbox v-model="employee.isWorking" />
                  <span class="cb-value ml-8"> Đang làm việc</span>
                </div>
                <div class="day-off" :class="employee.isWorking ? 'day-off--hidden' : ''">
                  <div>
                    <label for="day-off-cb" title="Ngày nghỉ việc" class="checkbox__label"></label>
                    <span class="cb-value mr-8"> Ngày nghỉ việc </span>
                    <input type="date" id="day-off-cb" />
                  </div>
                </div>
              </div>
              <div class="form-stack-9 input-stack">
                <div class="btn__close--dialog btn btn--white mr-8" @click="closeDialog"> Đóng </div>
                <div class="btn__save btn btn--green mr-0" @click="submit"> Lưu </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="close--dialog" @click="closeDialog"></div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/BaseInput.vue";
import Combobox from "@/components/Combobox.vue";
import Dropdown from "@/components/Dropdown.vue";
import Checkbox from "@/components/Checkbox.vue";
import { useStore } from 'vuex';
import { validate } from "@/helpers/validator.js";
import { ref, reactive, watch, computed, onBeforeMount } from "vue";
import InputDataList from "./InputDataList.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: {
      employeeName: "",
      employeeCode: "",
      phoneNumber: "",
      email: "",
      rooms: [],
      subjects: [],
      department: "",
      IsEquipmentManagement: false,
      isWorking: true,
    },
  },
  showDialog: {
    type: Boolean,
    required: true,
  },
  formType: {
    type: String,
    default: "create"
  }
});
const emit = defineEmits(['update:modelValue', 'update:showDialog'])

const employee = ref(props.modelValue)
const store = useStore();

onBeforeMount(async () => {
  if (props.formType == "create") {
    await store.dispatch('getRecommendCode')
  }
});

const recommendCode = computed(() => {
  return store.getters.recommendCode;
})

// Gettter danh sách tổ chuyên môn từ store
// Xử lý chuyển dữ liệu cần thiết để tối ưu hiệu năng với O(1)
const getDepartments = computed(() => {
  const m = new Map();
  Array.from(store.getters.departments).forEach(e => {
    m.set(e.DepartmentID, e.DepartmentName);
  })
  return m;
})

// Gettter danh sách môn học từ store
// Xử lý chuyển dữ liệu cần thiết để tối ưu hiệu năng với O(1)
const getSubjects = computed(() => {
  const m = new Map();
  Array.from(store.getters.subjects).forEach(e => {
    m.set(e.SubjectID, e.SubjectName);
  })
  return m;
})

// Gettter danh sách kho, phòng từ store
const getRooms = computed(() => {
  const m = new Map();
  Array.from(store.getters.rooms).forEach(e => {
    m.set(e.RoomID, e.RoomName);
  })
  return m;
});


const closeDialog = () => {
  emit('update:showDialog', false)
  employee.value.employeeName = ""
  employee.value.employeeCode = ""
  employee.value.phoneNumber = ""
  employee.value.email = ""
  employee.value.departmentID= ""
  employee.value.rooms = []
  employee.value.subjects = []
  employee.value.department = ""
  employee.value.IsEquipmentManagement = false
  employee.value.isWorking = true
};

const dialog = ref(null);

const errors = reactive({
  code: "",
  name: "",
  email: "",
  phone: "",
});

/**
 * Thực hiện validate các fields
 */
watch(() => employee.employeeCode, () => {
  errors["code"] = validate(["required"], employee.employeeCode)[0];
})

watch(() => employee.employeeName, () => {
  errors["name"] = validate(["required"], employee.employeeName)[0];
})

watch(
  () => employee.email,
  () => {
    if (employee.email != '') {
      errors["email"] = validate(["email"], employee.email)[0];
    } else {
      errors["email"] = ''
    }
  }
)

watch(
  () => employee.phoneNumber,
  () => {
    if (employee.phoneNumber != '') {
      errors["phone"] = validate(["phone"], employee.phoneNumber)[0];
    } else {
      errors["phone"] = ''
    }
  }
)

async function submit() {
  // revalidate lại khi submit để đảm bảo tính nhất quán
  errors["code"] = validate(["required"], employee.value.employeeCode)[0];
  errors["name"] = validate(["required"], employee.value.employeeName)[0];
  errors["phone"] = validate(["phone"], employee.value.phoneNumber)[0];
  errors["email"] = validate(["email"], employee.value.email)[0];

  if (!errors.code && !errors.name && !errors.email && !errors.phone) {
    try {
      const data = {
        employeeName: employee.value.employeeName,
        employeeCode: employee.value.employeeCode,
        email: employee.value.email,
        phoneNumber: employee.value.phoneNumber,
        rooms: employee.value.rooms,
        subjects: employee.value.subjects,
        departmentID: employee.value.departmentID,
        IsEquipmentManagement: employee.value.IsEquipmentManagement,
        isWorking: employee.value.IsWorking
      }

      await store.dispatch('createEmployee', data);
      await store.dispatch("loadEmployees");
      closeDialog();
    } catch (error) {
      console.log("error from try catch")
      var errRes = JSON.parse(error.message)
      errors["code"] = errRes.MoreInfo.EmployeeCode;
      errors["name"] = errRes.MoreInfo.EmployeeName;
      errors["phone"] = errRes.MoreInfo.PhoneNumber;
      errors["email"] = errRes.MoreInfo.Email.join('\n');
    }
  };
}

</script>

<style lang="scss" scoped>
.day-off--hidden {
  visibility: hidden;
}

#day-off-cb:focus {
  outline: none;
  border-radius: 4px;
  border: 1px solid #02bf70;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: var(--overlay-color);
  z-index: 99;
}

.hide-dialog {
  display: none;
}

.close--dialog {
  background: url(@/assets/Icons/ic_X_2.png) no-repeat center;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.dialog__body {
  position: absolute;
  min-width: 920px;
  height: auto;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}

.img-box {
  width: 180px;
  height: 180px;
}

.img-box img {
  width: 100%;
  height: 100%;
}

.btn-upload {
  background-color: var(--main-color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 40px;
}

.btn-upload:hover {
  cursor: pointer;
}

.body__left {
  display: flex;
  flex-direction: column;
  margin: 10px 30px;
  align-items: center;
  text-align: center;
}

.wrapper__left {
  margin: 20px 0px;
  border-right: 1px solid var(--line-gridpanel-color);
}

.body__right {
  flex: 1;
  margin: 20px 30px;
  color: #b1b1b1;
}

.body__right .title {
  margin: 10px 0px;
  font-size: 20px;
  color: #747474;
}

.info-box {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.fullname {
  font-family: OpenSans Semibold;
  font-size: 16px;
  margin-bottom: 12px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
}

.img-box {
  width: 180px;
  height: 180px;
}

.img-box img {
  width: 100%;
  height: 100%;
}

.btn-upload {
  background-color: var(--main-color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 40px;
}

.btn-upload:hover {
  cursor: pointer;
}

.body__left {
  display: flex;
  flex-direction: column;
  margin: 10px 30px;
  align-items: center;
  text-align: center;
}

.wrapper__left {
  margin: 20px 0px;
  border-right: 1px solid var(--line-gridpanel-color);
}

.body__right {
  flex: 1;
  margin: 20px 30px;
  color: #b1b1b1;
}

.body__right .title {
  margin: 10px 0px;
  font-size: 20px;
  color: #747474;
}

.info-box {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.input-stack {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
}

button {
  background-color: #6bbe92;
  width: 302px;
  border: 0;
  padding: 10px 0;
  margin: 5px 0;
  text-align: center;
  color: #fff;
  font-weight: bold;
}

.form-wrapper {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 32px 32px auto auto 32px 32px;
  gap: 12px 30px;
}

.form-stack-1 {
  grid-column-start: 1;
  grid-column-end: 2;
}

.form-stack-2 {
  grid-column-start: 2;
  grid-column-end: 3;
}

.form-stack-3 {
  grid-column-start: 1;
  grid-column-end: 2;
}

.form-stack-4 {
  grid-column-start: 2;
  grid-column-end: 3;
}

.form-stack-5 {
  grid-column-start: 1;
  grid-column-end: 2;
  width: 320px;
}

.form-stack-6 {
  grid-column-start: 2;
  grid-column-end: 3;
  position: relative;
  width: 320px;
}

.form-stack-7 {
  grid-column-start: 1;
  grid-column-end: 3;
  position: relative;
  width: 700px;
}

.form-stack-8 {
  grid-column-start: 1;
  grid-column-end: 3;
  align-items: center;
  width: 700px;
}

.form-stack-9 {
  grid-column-start: 1;
  grid-column-end: 3;
  justify-content: end;
  align-items: center;
}

.wrap-label {
  height: 32px;
  display: flex;
  align-items: center;
}

.multiselect {
  flex: 1;
}

#subjects {
  max-width: 200px;
}

#rooms {
  max-width: 580px;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: flex;
  background: url(@/assets/Icons/ic_date.svg) no-repeat center;
  width: 20px;
  height: 20px;
  border-width: thin;
  align-content: center;
  padding: 6px;
  border-left: 1px solid var(--line-gridpanel-color);
}

input[type="date"] {
  height: 32px;
  border: 1px solid var(--line-gridpanel-color);
  border-radius: 4px;
  padding-left: 12px;
}

.input--error {
  border: '1px solid #ff8b87'
}

.ml-8 {
  margin-left: 8px;
}

.mr-8 {
  margin-right: 8px;
}

.mr-0 {
  margin-right: 0px;
}
</style>
