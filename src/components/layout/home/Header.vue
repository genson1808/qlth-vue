<template>
  <header class="header">
    <div class="navbar">
      <div class="navbar-nav navbar-nav-left">
        <h1 class="nav-title">Cán bộ,giáo viên</h1>
        <div class="header-help pointer"></div>
      </div>
      <div class=".navbar-nav navbar-nav-right">
        <div class="user-info-container">
          <div class="notify pointer">
            <div class="notify-alert"></div>
          </div>
          <span class="user-name pointer">Admin</span>
          <div class="icon-dropdown pointer"></div>
          <div class="avatar pointer">
            <img src="@/assets/Icons/ic_Avatar_36.png" alt="avatar" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 48px;
  background-color: #ffffff;

  .navbar {
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    box-shadow: 3px 1px 3px 2px #e0e0e0;
    .navbar-nav {
      display: flex;
      align-items: center;
    }
    .navbar-nav-left {
      .nav-title {
        font-size: 16px;
        font-family: OpenSans Semibold;
      }
      .header-help {
        background: url("@/assets/Icons/ic_sprites.svg") no-repeat -805px -296px;
        width: 22px;
        height: 22px;
        margin-left: 16px;
      }
    }
    .navbar-nav-right {
      .user-info-container {
        display: flex;
        align-items: center;
        .user-name {
          margin: 0 8px;
        }
        .icon-dropdown {
          background: url("@/assets/Icons/ic_sprites.svg") no-repeat -185px -165px;
          width: 11px;
          height: 7px;
        }
        .avatar {
          width: 40px;
          height: 40px;
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
