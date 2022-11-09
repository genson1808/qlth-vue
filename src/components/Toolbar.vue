<template>
  <div class="top-toolbar">
    <div class="toolbar-left">
      <div class="search">
        <input v-model="keyword" @input="onChangeDebounced" type="text" class="input-search" />
        <div class="search-icon pointer"></div>
      </div>
    </div>
    <div class="toolbar-right dflex">
      <div class="btn btn--green btn-add" @click="openDialog">Thêm</div>
      <div class="btn btn--white btn-export">Xuất khẩu</div>
      <div class="more-action pointer btn--white" @click="showMoreAction = !showMoreAction">
        <div class="actions" v-show="showMoreAction">
          <div class="action-remove" @click="remove">
            <div class="remove-icon"></div>
            <div class="name-type">Xoá</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-show="showDialog" v-model:showDialog="showDialog" :formType="create" />
  <DialogConfirm v-show="showDialogConfirm" v-model="confirmRemove" v-model:show="showDialogConfirm" />
</template>

<script setup>
import { watch, ref } from "vue";
import { useStore } from "vuex";
import debounce from "@/helpers/Debounce.js"
import Dialog from "@/components/Dialog.vue";
import DialogConfirm from "@/components/DialogConfirm.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  selected: {
    type: Array,
    required: true,
  },
  paging: {
    type: Object,
    required: true,
  }
})

const store = useStore();

const emit = defineEmits(['update:modelValue', 'update:selected'])

const showDialog = ref(false)

const showMoreAction = ref(false)

const keyword = ref('');

/**
 * Xử lý khi người dùng nhập tự nhập trang muốn đến sử dụng kỹ thuật debounce
 * để hạn chế việc all api backend nhiều lần
 * @author SONTB (08/11/2022)
 */
const onChangeDebounced = debounce(e => {
  console.log(keyword.value)
  var filter = {
    EmployeeName: keyword.value,
  }
  emit('update:modelValue', filter);
}, 800);

/**
 * Xoá nhiều
 * @author SONTB (09/11/2022)
 */
const showDialogConfirm = ref(false)
const removeID = ref('')
const confirmRemove = ref(false)

function remove() {
  if (props.selected.length > 0) {
    showDialogConfirm.value = true;
  }
}

watch(() => confirmRemove.value, () => {
  if (confirmRemove.value && props.selected.length > 0) {
    store.dispatch('removeEmployees', [...props.selected])
    store.dispatch("getEmployees", props.paging);
    confirmRemove.value = false;
    emit('update:selected', [])
    console.log("xoa nhieu thanh cong")
  }
})


const openDialog = () => {
  showDialog.value = true;
};
</script>

<style lang="scss" scoped>
.top-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  width: 100%;
  height: 64px;

  .toolbar-left {
    .search {
      position: relative;
      min-width: 300px;
      height: 32px;

      .input-search {
        border: 1px solid var(--line-gridpanel-color);
        border-radius: 4px;
        width: 100%;
        height: 100%;
        padding: 12px 40px 12px 12px;

        &:focus {
          outline: none;
          border: 1px solid var(--main-color);
        }
      }

      .search-icon {
        position: absolute;
        background: url(@/assets/Icons/Ic_seerch.png) no-repeat center;
        background-size: 20px 20px;
        width: 36px;
        height: 24px;
        border-left: 1px solid var(--line-gridpanel-color);
        top: 4px;
        right: 0;
      }
    }
  }

  .toolbar-right {
    .more-action {
      width: 32px;
      height: 32px;
      background-image: url(@/assets/Icons/ic_More.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 24px 24px;
      border-radius: 4px;
      position: relative;
      background-color: #fff;

      .actions {
        position: absolute;
        top: 34px;
        right: 0;
        width: 80px;
        background-color: #fff;
        z-index: 3;
        display: flex;
        align-items: center;
        display: flex;
        flex-direction: column;
        border-radius: 4px;
        box-shadow: -1px -1px 11px 5px rgba(224, 224, 224, 0.92);
        -webkit-box-shadow: -1px -1px 11px 5px rgba(224, 224, 224, 0.92);
        -moz-box-shadow: -1px -1px 11px 5px rgba(224, 224, 224, 0.92);

        .action-remove {
          display: flex;
          align-items: center;
          width: 100%;
          height: 32px;
          margin: 5px 0;

          .remove-icon {
            background: url(@/assets/Icons/ic_delete.png) no-repeat center;
            width: 32px;
            height: 32px;
          }

          &:hover {
            background-color: #eaecef;
          }
        }
      }


    }

    .btn-add {
      margin-right: 8px;
    }

    .btn-export {
      margin-right: 8px;
    }
  }
}
</style>
