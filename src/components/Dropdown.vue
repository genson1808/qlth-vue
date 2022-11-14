<template>
  <div class="drop-down" ref="parent">
    <div class="selected" :class="show ? 'focus' : ''" tabindex="0">
      <p href="#">
        <span
          >{{ selected }}<span class="value">{{ selected }}</span></span
        >
      </p>
    </div>
    <div class="toggle-dropdown" @click="toggle"></div>
    <div class="options">
      <ul :class="show ? '' : 'dropdown-hide'" ref="showItem">
        <li v-for="[key, value] in data" :key="key" @click="select(key)">
          <p href="#">
            {{ value }}<span class="value">{{ value }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useClickOutside } from "@/use/useClickOutside.js";

const props = defineProps({
  modelValue: {
    type: String,
    require: true,
  },
  data: {
    type: Map,
    require: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

/**
 * mapping value của modelValue truyển vào khi mounted
 * vd: khi chỉnh sửa thì phải mapping data truyền vào với các input
 * @author SONTB (05/10/2022)
 */
const selected = ref("");
onMounted(() => {
  selected.value = props.data.get(props.modelValue);
});

/**
 * Xử lý toggle dropdown
 * @author SONTB (05/10/2022)
 */
const show = ref(false);

function toggle() {
  show.value = !show.value;
}

/**
 * xử lý khi click bên ngoài dropdown sẽ tự ẩn
 * @author SONTB (05/10/2022)
 */
const showItem = ref(null);
const parent = ref(null);

useClickOutside(showItem, parent, () => {
  show.value = false;
});

/**
 * Xử lý khi select một item
 * @author SONTB (05/10/2022)
 */
function select(val) {
  let valUpdate = props.data.get(val);
  emit("update:modelValue", val);
  selected.value = valUpdate;
  show.value = false;
}
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
  border: 1px solid var(--line-gridpanel-color);
  width: 100%;
  border-radius: 4px;
  height: 32px;
  padding-right: 20px;

  &:focus {
    outline: none;
    border-radius: 4px;
    border: 1px solid #02bf70;
  }
}

.drop-down .focus {
  outline: none;
  border-radius: 4px;
  border: 1px solid #02bf70;
}

.drop-down .selected p span {
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

.drop-down .options ul li p {
  height: 32px;
  padding: 5px;
  display: block;
  text-decoration: none;
  color: #000;
  display: flex;
  align-items: center;
}

.drop-down .options ul li p:hover {
  background: #ceebdc;
  transition: 0.2s ease;
  cursor: pointer;
}
</style>
