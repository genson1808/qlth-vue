<template>
    <div class="no-data">
        <div class="icon"></div>
        <div class="data-content">
            <h5 class="title">Chưa có giáo viên</h5>
            <span class="info">Vui lòng chọn thêm mới từng giáo viên hoặc Nhập khẩu để lấy danh sách hiện có tại
                trường.</span>
        </div>
        <div class="g-btn">
            <div class="btn btn--green">Thêm mới</div>
            <div class="btn btn--green">Nhập khẩu</div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.no-data {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.no-data .icon {
    background: url("@/assets/Icons/ic_Alert.png") no-repeat center;
    background-size: cover;
    width: 130px;
    height: 130px;
}

.data-content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.data-content .title {
    font-size: 16px;
    font-family: OpenSans Semibold;
    margin-bottom: 16px;
}

.g-btn {
    margin-top: 16px;
    display: flex;
}
</style>