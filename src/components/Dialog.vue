<template>
  <Teleport
    to="#dialog-contain"
    :disabled="!states.dialog.show"
    v-if="states.dialog.show"
  >
    <div class="dialog">
      <div class="dialog__body" ref="dialog">
        <div class="wrapper__left">
          <div class="body__left">
            <div class="img-box">
              <img src="@/assets/Icons/default_avatar.png" alt="" />
            </div>
            <div class="btn-upload">Chọn ảnh</div>
            <div class="info-box">
              <h4 class="fullname">
                {{
                  employee.employeeName ? employee.employeeName : "Họ và tên"
                }}
              </h4>
              <h5 class="code">
                {{ employee.employeeCode ? employee.employeeCode : "SHC001" }}
              </h5>
            </div>
          </div>
        </div>
        <div class="body__right">
          <div class="add__employee--dialog">
            <div class="title">
              {{
                states.dialog.form === "create"
                  ? "Thêm hồ sơ cán bộ, giáo viên"
                  : "Chỉnh sửa hồ sơ cán bộ, giáo viên"
              }}
            </div>

            <form id="add-employee-form">
              <div class="form-wrapper">
                <BaseInput
                  :required="true"
                  name="employeeCode"
                  :error="errors.code"
                  v-model="employee.employeeCode"
                  label="Số hiệu cán bộ"
                  class="form-stack-1"
                />
                <BaseInput
                  :required="true"
                  name="employeeName"
                  :error="errors.name"
                  v-model="employee.employeeName"
                  label="Họ và tên"
                  class="form-stack-2"
                />
                <BaseInput
                  name="phoneNumber"
                  :error="errors.phone"
                  v-model="employee.phoneNumber"
                  label="Số điện thoại"
                  class="form-stack-3"
                />
                <BaseInput
                  name="email"
                  :error="errors.email"
                  v-model="employee.email"
                  label="Email"
                  class="form-stack-4"
                />
                <div class="form-stack-5 input-stack">
                  <div class="wrap-label">
                    <label title="Tổ bộ môn">Tổ bộ môn</label>
                  </div>

                  <Dropdown v-model="employee.department" />
                </div>
                <div class="form-stack-6 input-stack">
                  <div class="wrap-label">
                    <label title="Quản lý theo môn">QL theo môn</label>
                  </div>
                  <Combobox v-model="employee.employeeSubject" />
                </div>
                <div class="form-stack-7 input-stack">
                  <div class="wrap-label">
                    <label title="Quản lý kho, phòng">QL kho, phòng</label>
                  </div>
                  <Combobox v-model="employee.employeeRoom" :width="580" />
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
                  <div
                    class="day-off"
                    :class="employee.isWorking ? 'day-off--hidden' : ''"
                  >
                    <div>
                      <label
                        for="day-off-cb"
                        title="Ngày nghỉ việc"
                        class="checkbox__label"
                      ></label>
                      <span class="cb-value mr-8"> Ngày nghỉ việc </span>
                      <input type="date" id="day-off-cb" />
                    </div>
                  </div>
                </div>
                <div class="form-stack-9 input-stack">
                  <div
                    class="btn__close--dialog btn btn--white mr-8"
                    @click="closeDialog"
                  >
                    Đóng
                  </div>
                  <div class="btn__save btn btn--green mr-0" @click="submit">
                    Lưu
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="close--dialog" @click="closeDialog"></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import BaseInput from "@/components/BaseInput.vue";
import Combobox from "@/components/Combobox.vue";
import Dropdown from "@/components/Dropdown.vue";
import Checkbox from "@/components/Checkbox.vue";
import { useClickOutside } from "@/use/useClickOutside.js";
import { validate } from "@/helpers/validator.js";
import { Data } from "@/helpers/Data.js";

import { inject, ref, reactive, watch } from "vue";

const states = inject("states");
const employee = inject("employeeModel");

console.log(employee);

watch(
  () => employee.employeeRoom,
  () => {
    console.log("----", employee.employeeRoom);
  }
);

const val = ref("hello");

const closeDialog = () => {
  states.dialog.show = false;
  // employee.employeeName = "";
  // employee.employeeCode = "";
  // employee.phoneNumber = "";
  // employee.email = "";
  // employee.employeeRoom = [];
  // employee.employeeSubject = [];
  // employee.department = "";
  // employee.IsEquipmentManagement = false;
  // employee.isWorking = true;
};

const dialog = ref(null);
// useClickOutside(dialog, closeDialog);

const errors = reactive({
  code: "",
  name: "",
  email: "",
  phone: "",
});

function submit() {
  errors["code"] = validate(["required"], employee.employeeCode)[0];
  errors["name"] = validate(["required"], employee.employeeName)[0];
  errors["email"] = validate(["email"], employee.email)[0];
  errors["phone"] = validate(["phone"], employee.phoneNumber)[0];

  if (!errors.code && !errors.name && !errors.email && !errors.phone) {
    employee.employeeRoom = employee.employeeRoom
      ? employee.employeeRoom.join(",")
      : "";
    employee.employeeSubject = employee.employeeSubject
      ? employee.employeeSubject.join(",")
      : "";
    Data.value.push(employee);
    console.log(Data.value);
    closeDialog();
  }
}
</script>

<style lang="scss" scoped>
.day-off--hidden {
  visibility: hidden;
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
