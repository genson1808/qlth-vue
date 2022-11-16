<template>
  <div class="dialog">
    <div class="dialog__body">
      <div class="dialog__content">
        <div class="dialog__title">{{ title }}</div>
        <div class="dialog__mesage">{{ message }}</div>
        <div class="dialog__actions">
          <button
            class="btn btn--white btn-close"
            @click="$emit('update:show', false)"
            type="button"
          >
            Đóng
          </button>
          <button
            class="btn btn--green btn-confirm"
            @click="confirm"
            type="button"
          >
            Đồng ý
          </button>
        </div>
      </div>
      <div class="close--dialog" @click="$emit('update:show', false)"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Thông báo",
  },
  message: {
    type: String,
    default: "Bạn có chắc muốn xoá cán bộ giáo viên đang chọn không?",
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "update:show"]);

const confirm = () => {
  emit("update:modelValue", true);
  emit("update:show", false);
};
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: var(--overlay-color);
  z-index: 99;
  color: #747474;

  .dialog__body {
    width: 360px;
    height: 170px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;

    .dialog__content {
      margin: 20px;

      .dialog__title {
        font-size: 16px;
        margin-bottom: 20px;
      }

      .dialog__mesage {
        line-height: 20px;
      }

      .dialog__actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;

        .btn-confirm {
          border: 0;
          margin-left: 8px;
        }
      }
    }
  }

  .close--dialog {
    background: url(@/assets/Icons/ic_X_2.png) no-repeat center;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
}
</style>
