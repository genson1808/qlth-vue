<template>
  <div class="wrapper-sidebar" :class="states.collapsed ? 'collapsed' : ''">
    <div class="sidebar">
      <div class="logo-container">
        <div class="header-logo" :class="states.collapsed ? 'collapsed' : ''">
          <div class="logo-icon"></div>
          <div class="logo-text">Thiết bị</div>
        </div>
        <div class="menu-toggle" @click="collapse"></div>
      </div>
      <RouterLink
        class="routerLink"
        v-for="e in items"
        :key="e.id"
        :to="e.name"
        @click="activeMenuItem(e.id)"
      >
        <MenuItem
          :iconSrc="e.iconSrc"
          :text="e.text"
          :class="states.menuItemActivated == e.id ? 'active' : ''"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import MenuItem from "@/components/layout/home/MenuItem.vue";
import { inject } from "vue";

// handle states
const states = inject("states");

function collapse() {
  states.collapsed = !states.collapsed;
}

function activeMenuItem(id) {
  states.menuItemActivated = id;
}

const items = [
  {
    id: 0,
    iconSrc: "ic_TongQuan",
    text: "Tổng quan",
    name: "overview",
  },
  {
    id: 1,
    iconSrc: "ic_ThietBi",
    text: "Thiết bị",
    name: "device",
  },
  {
    id: 2,
    iconSrc: "ic_MuonTra",
    text: "Mượn trả",
    name: "borrow-and-give-back",
  },
  {
    id: 3,
    iconSrc: "ic_BaoCao",
    text: "Báo cáo",
    name: "report",
  },
  {
    id: 4,
    iconSrc: "ic_HeThong",
    text: "Hệ thống",
    name: "system",
  },
];
</script>

<style lang="scss" scoped>
.wrapper-sidebar {
  width: 22rem;
  height: 100vh;
  background-color: var(--bgc-menu-sidebar);
  transition: all 0.2s;

  display: flex;
  flex-direction: column;

  .sidebar {
    width: 100%;
    background-color: var(--bgc-menu-sidebar);
    flex: 1;

    .active {
      border-left: 4px solid var(--active-sidebar);
      background-color: var(--bgc-active-menu-sidebar);
      color: var(--active-sidebar);
    }

    .logo-container {
      width: 100%;
      height: 59px;
      background-color: #24344b;
      display: flex;
      justify-content: space-between;
      flex-shrink: 0;

      .header-logo {
        margin-left: 12px;
        display: flex;
        align-items: center;
        height: 50px;
        text-decoration: none;

        .logo-icon {
          background-image: url(@/assets/Icons/ic_IconThietBi.svg);
          width: 35px;
          height: 35px;
          background-repeat: no-repeat;
        }

        .logo-text {
          margin-left: 8px;
          font-size: 16px;
          font-family: OpenSans Semibold;
          color: #ffffff;
        }

        &.collapsed {
          display: none;
        }
      }

      .menu-toggle {
        background-image: url(@/assets/Icons/ic_sprites.svg);
        background-repeat: no-repeat;
        background-position: 0 0;
        width: 50px;
        height: 50px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .routerLink {
      text-decoration: none;
    }
  }

  &.collapsed {
    width: 50px;
  }
}
</style>
