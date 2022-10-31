<template>
  <div class="footer-content">
    <div class="paging-control">
      <div class="btn-paging btn-first-page pointer"></div>
      <div class="btn-paging btn-prev-page pointer"></div>
      <input type="text" class="page-number" value="1" />
      <div class="btn-paging btn-next-page pointer"></div>
      <div class="btn-paging btn-last-page pointer"></div>
      <div class="paging-info">
        <span> 1/2 trang </span>
        <span> (56 giáo viên) </span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
