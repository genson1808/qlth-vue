<template>
  <div class="footer-content">
    <div class="paging-control">
      <div class="btn-paging btn-first-page pointer" :class="page == 1 ? 'not-allowed' : ''" @click="goToFirstPage"/>
      <div class="btn-paging btn-prev-page pointer" :class="page == 1 ? 'not-allowed' : ''" @click="goToPreviousPage"/>
      <input type="text" class="page-number" v-model="page" @input="onChangeDebounced" />
      <div class="btn-paging btn-next-page pointer" :class="page == maxPage ? 'not-allowed' : ''" @click="goToNextPage"/>
      <div class="btn-paging btn-last-page pointer" :class="page == maxPage ? 'not-allowed' : ''" @click="goToLastPage"/>
      <div class="paging-info">
        <span> {{ `${modelValue}/${maxPage} trang` }} </span>
        <span> {{ `(${total} giáo viên)` }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import debounce from "@/helpers/Debounce.js";

/**
 * @author SONTB (08/11/2022)
 */
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  }
})

/**
 * Khai báo biến emit cho việc emit các event map qua modelValue
 * @author SONTB (08/11/2022)
 */
const emit = defineEmits(['update:modelValue']);

// Biến page bindings 2 chiều với input page
const page = ref(1);

/**
 * Tính maxPage
 * @author SONTB (08/11/2022)
 */
const maxPage = computed(() => {
  return Math.floor(props.total / props.pageSize)
})


/**
 * Xử lý điều hướng cho phân trang
 * @author SONTB (08/11/2022)
 */

// đi đến trang tiếp theo
const goToNextPage = () => {
  if (page.value < maxPage.value && page.value >= 1) {
    page.value++;
    emit('update:modelValue', page.value);
  }
}

// Trở lại trang trước
const goToPreviousPage = () => {
  if (page.value > 1 && page.value <= maxPage.value) {
    page.value--;
    emit('update:modelValue', page.value);
  }
}

// Đến trang cuối cùng
const goToLastPage = () => {
  page.value = maxPage.value;
  emit('update:modelValue', page.value);
}

// Đến trang đầu tiên
const goToFirstPage = () => {
  page.value = 1;
  emit('update:modelValue', page.value);
}

/**
 * Xử lý khi người dùng nhập tự nhập trang muốn đến sử dụng kỹ thuật debounce
 * để hạn chế việc all api backend nhiều lần
 * @author SONTB (08/11/2022)
 */
const onChangeDebounced = debounce(e => {
  let newPage = parseInt(page.value)
  if (!newPage || newPage < 1) {
    page.value = props.modelValue;
  } else {
    emit('update:modelValue', newPage);
  }
}, 500);


</script>

<style lang="scss" scoped>
.content {
  .footer-content {
    margin: 0 16px 0 16px;
    height: 60px;
    box-shadow: -1px -1px 11px 5px rgba(224, 224, 224, 0.92);
    -webkit-box-shadow: -1px -1px 11px 5px rgba(224, 224, 224, 0.92);
    -moz-box-shadow: -1px -1px 11px 5px rgba(224, 224, 224, 0.92);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.paging-control {
  display: flex;
  align-items: center;
  margin-left: 24px;
}

.btn-paging {
  width: 20px;
  height: 20px;
  background-color: greenyellow;
  margin-right: 20px;
}

.btn-first-page {
  background: url(@/assets/Icons/ic_MoveToFirst.png) no-repeat center;
  background-size: 20px 20px;
}

.btn-prev-page {
  background: url(@/assets/Icons/ic_Back.png) no-repeat center;
  background-size: 20px 20px;
}

.page-number {
  margin-right: 20px;
  width: 64px;
  height: 32px;
  text-align: center;
  border: 1px solid var(--line-gridpanel-color);
  border-radius: 4px;

  &:focus {
    outline: none;
  }
}

.btn-next-page {
  background: url(@/assets/Icons/ic_Next.png) no-repeat center;
  background-size: 20px 20px;
}

.btn-last-page {
  background: url(@/assets/Icons/ic_MoveToLast.png) no-repeat center;
  background-size: 20px 20px;
}

.paging-info {
  span {
    color: #4d4f5c;

    &:last-child {
      margin-left: 10px;
    }
  }
}
</style>
