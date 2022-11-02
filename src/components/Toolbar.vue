<template>
  <div class="top-toolbar">
    <div class="toolbar-left">
      <div class="search">
        <input type="text" class="input-search" />
        <div class="search-icon pointer"></div>
      </div>
    </div>
    <div class="toolbar-right dflex">
      <div class="btn btn--green btn-add" @click="openDialog">Thêm</div>
      <div class="btn btn--white btn-export">Xuất khẩu</div>
      <div class="more-action pointer btn--white"></div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
const states = inject("states");

const openDialog = () => {
  states.dialog.form = "create";
  states.dialog.show = true;
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
