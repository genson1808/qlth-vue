<template>
  <div class="menu-item">
    <div class="menu-icon">
      <img class="icon" :src="icon" :alt="text" />
    </div>
    <div class="menu-text" :class="states.collapsed ? 'collapsed' : ''">
      {{ text }}
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, inject } from "vue";

// provide app stata
const states = inject("states");

// props
const props = defineProps({
  iconSrc: {
    type: String,
  },
  text: {
    type: String,
  },
});

// Icons
const icon = computed(() => {
  return new URL(`../../../assets/Icons/${props.iconSrc}.svg`, import.meta.url).href;
});
</script>

<style lang="scss" scoped>
.menu-item {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  border-left: 4px;
  border-style: solid;
  border-color: transparent;
  padding-left: 8px;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
  .menu-icon {
    width: 32px;
    height: 32px;
    .icon {
      width: 100%;
      height: 100%;
    }
  }
  .menu-text {
    margin-left: 11px;
  }
  .collapsed {
    display: none;
  }
}
</style>
