<template>
  <div class="drop-down" ref="parent">
    <div class="selected" tabindex="0">
      <a href="#" autofocus
        ><span
          >{{ selected }}<span class="value">{{ selected }}</span></span
        ></a
      >
    </div>
    <div class="toggle-dropdown" @click="toggle"></div>
    <div class="options">
      <ul :class="show ? '' : 'dropdown-hide'" ref="showItem">
        <li v-for="[key, value] in data" :key="key" @click="select(key)">
          <a href="#"
            >{{ value }}<span class="value">{{ value }}</span></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useClickOutside } from "@/use/useClickOutside.js";

const props = defineProps({
  modelValue: {
    type: String,
    require: true,
  },
  data: {
    type: Map,
    require: true,
  }
});

const emit = defineEmits(["update:modelValue"]);

const selected = ref('');

const show = ref(false);

function toggle() {
  show.value = !show.value;
}

function select(val) {
  let valUpdate = props.data.get(val)
  emit("update:modelValue", val);
  selected.value = valUpdate;
  show.value = false;
}

const showItem = ref(null);
const parent = ref(null);

useClickOutside(showItem, parent, () => {
  show.value = false;
});
</script>

<style lang="scss" scoped>
.drop-down {
  position: relative;
  left: 0;
  top: 0;
  z-index: 3;
  width: 200px;
}

.drop-down .selected {
  &:focus {
    outline: none;
    border-radius: 4px;
    border: 1px solid #02bf70;
  }
}
.drop-down .selected a {
  background: #fff no-repeat scroll right center;
  display: block;
  padding-right: 20px;
  border: 1px solid var(--line-gridpanel-color);
  width: 100%;
  border-radius: 4px;
  text-decoration: none;
  &:focus {
    outline: none;
    border-radius: 4px;
    border: 1px solid #02bf70;
  }
}

.drop-down .selected a span {
  cursor: pointer;
  display: block;
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
  color: #000;
}

.drop-down .option {
  position: relative;
}

.toggle-dropdown {
  background: url("@/assets/Icons/ic_chevron2.svg") no-repeat;
  background-position: center;
  width: 21px;
  height: 17px;
  position: absolute;
  top: 9px;
  right: 9px;
  cursor: pointer;
}

.dropdown-hide {
  display: none;
}

.drop-down .options ul {
  background: #fff none repeat scroll 0 0;
  list-style: none;
  padding: 0px 0px;
  position: absolute;
  left: 0px;
  top: 32px;
  width: auto;
  min-width: 100%;
  border: 1px solid var(--line-gridpanel-color);
  border-radius: 4px;
  margin-top: 8px;
  height: 180px;
  overflow: auto;

  box-shadow: 0px 0px 8px 1px rgb(224 224 224);
  -webkit-box-shadow: 0px 0px 8px 1px rgb(224 224 224);
  -moz-box-shadow: 0px 0px 8px 1px rgba(224, 224, 224, 1);
}

.drop-down .selected span.value,
.drop-down .options span.value {
  display: none;
}

.drop-down .options ul li a {
  height: 32px;
  padding: 5px;
  display: block;
  text-decoration: none;
  color: #000;
  display: flex;
  align-items: center;
}

.drop-down .options ul li a:hover {
  background: #ceebdc;
  transition: 0.2s ease;
}
</style>
