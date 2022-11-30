<template>
  <div class="combobox" :style="{ width: width + 'px' }" ref="parent">
    <div class="combobox__select" tabindex="0">
      <div>
        <p class="selected">
          <span class="wrap-item" v-if="checkedAll">
            <span class="selected-item"
              >Tất cả<span class="remove-item" @click="removeAll"></span> </span
          ></span>
          <span v-else class="wrap-item" v-for="(e, i) in selected" :key="i">
            <span class="selected-item" :title="e"
              >{{ data.get(e)
              }}<span class="remove-item" @click="remove(i)"></span> </span
          ></span>
        </p>
      </div>
      <div class="toggle-combobox" @click="toggle"></div>
    </div>
    <div class="combobox__list">
      <ul :class="!show ? 'combobox--hide' : ''" ref="showItem">
        <li class="check-all">
          <div class="checkbox" ref="pr" tabindex="0">
            <input
              @change="onCheckAll"
              :checked="checkedAll"
              type="checkbox"
              :id="cbAllId"
              class="checkbox__input"
            />
            <label :for="cbAllId" class="checkbox__checkmark"></label>
          </div>
          <div class="title">Tất cả</div>
        </li>
        <li class="combobox__item" v-for="[value, title] in data" :key="value">
          <div class="checkbox" ref="pr" tabindex="0">
            <input
              v-model="selected"
              :value="value"
              type="checkbox"
              :id="value"
              class="checkbox__input"
            />
            <label :for="value" class="checkbox__checkmark"></label>
          </div>
          <div class="title">{{ title }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useClickOutside } from "@/use/useClickOutside.js";
import UniqueID from "@/helpers/UniqueID.js";

const props = defineProps({
  width: {
    type: Number,
    default: 200,
  },
  modelValue: {
    type: Array,
    default: [],
  },
  data: {
    type: Map,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const cbAllId = UniqueID().getID();

onMounted(() => {
  selected.value = props.modelValue;
});

// xử lý checkbox checkedAll
const checkedAll = computed(() => {
  return props.data.size === selected.value.length;
});

/**
 * Xử lý close dropdown khi click ngoài phạm vi của combobox
 * @author SONTB (08/11/2022)
 */
const showItem = ref(null);
const parent = ref(null);

useClickOutside(showItem, parent, () => {
  show.value = false;
});

/**
 * Theo dõi các checkbox checked và unchecked và
 * update modelValue parent truyền vào
 * @author SONTB (08/11/2022)
 */
const selected = ref([]);

watch(
  () => selected.value,
  () => {
    emit("update:modelValue", selected);
  }
);

/**
 * Xử lý remove tag
 * @author SONTB (08/11/2022)
 */
function remove(id) {
  selected.value.splice(id, 1);
}

/**
 * Remove all value đã select hay uncheck tất cả checkbox
 * @author SONTB (08/11/2022)
 */
function removeAll() {
  selected.value = [];
}

/**
 * Xử lý sự kiện check all checkbox
 * @param {*} e event
 * @author SONTB (08/11/2022)
 */
function onCheckAll(e) {
  // nếu checked thì add hết value vào selected
  if (e.target.checked) {
    selected.value = [];
    for (let key of props.data.keys()) {
      selected.value.push(key);
    }
  } else {
    // Nếu unchecked thì remove các value đã checked
    selected.value = [];
  }
}

/**
 * toggle dropdown của combobox
 */
const show = ref(false);

function toggle() {
  show.value = !show.value;
}
</script>

<style lang="scss" scoped>
.wrap-item {
  margin: 2px 2px;
}

.selected-item {
  position: relative;
  display: flex;
  align-items: center;
  color: #000;
  background-color: #ccc;
  border-radius: 4px;
  padding: 0 8px;
  /* margin: 0 8px 8px 0; */
  height: 24px;
}

.remove-item {
  background-image: url("@/assets/Icons/ic_remove_normal.svg");
  background-size: 8px;
  background-repeat: no-repeat;
  width: 8px;
  height: 8px;
  margin-left: 8px;
}

.remove-item:hover {
  background-image: url("@/assets/Icons/ic_remove_hover2.svg");
  background-size: 8px;
  background-repeat: no-repeat;
  cursor: pointer;
}

.combobox {
  width: 200px;
  display: flex;
  flex-direction: column;

  .combobox__select {
    width: 100%;
    min-height: 32px;
    border-radius: 4px;
    border: 1px solid var(--line-gridpanel-color);
    background-color: #fff;
    display: inline-table;
    align-items: center;

    .toggle-combobox {
      background: url("@/assets/Icons/ic_chevron2.svg") no-repeat;
      background-position: center;
      width: 21px;
      height: 17px;
      position: absolute;
      top: 9px;
      right: 9px;
      cursor: pointer;
    }

    div:first-child {
      padding: 2px 2px;
    }

    .selected {
      display: flex;
      flex-wrap: wrap;
    }

    &:focus {
      outline: none;
      border: 1px solid #02bf70;
    }
  }

  .combobox__list {
    position: relative;
  }

  .combobox--hide {
    opacity: 0;
    display: none;
  }

  .combobox__list ul {
    height: 180px;
    border-radius: 4px;
    position: absolute;
    color: #000;
    background-color: #fff;
    top: 8px;
    left: 0;
    padding: 16px;
    width: 100%;
    list-style: none;
    overflow: auto;
    z-index: 3;
    box-shadow: 0px 0px 8px 1px rgba(224, 224, 224, 1);
    -webkit-box-shadow: 0px 0px 8px 1px rgba(224, 224, 224, 1);
    -moz-box-shadow: 0px 0px 8px 1px rgba(224, 224, 224, 1);
    transition: opacity 1s ease-out;
    opacity: 1;

    .check-all {
      padding: 0 0 12px 0;
      border-bottom: 1px solid var(--line-gridpanel-color);
    }
  }

  .combobox__list ul li {
    display: flex;
    padding: 6px 0;
    align-items: center;
  }

  .combobox__list ul li:nth-child(2) {
    padding-top: 12px;
  }

  .combobox__list ul .title {
    margin-left: 12px;
  }
}

.checkbox__input {
  display: none;
  // visibility: hidden;

  &:checked {
    + {
      .checkbox__checkmark {
        &:before {
          background-color: #03ae66;
          border: none;
        }

        &:after {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
}

.checkbox {
  display: flex;
  width: 20px;
  height: 20px;

  &:focus {
    border-radius: 4px;
  }

  .checkbox__checkmark {
    position: relative;
    padding-left: 2rem;
    cursor: pointer;

    &:before {
      content: "";
      width: 2rem;
      height: 2rem;
      background-color: #fff;
      border: 1px solid var(--line-gridpanel-color);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 4px;
      box-sizing: border-box;
    }

    &:after {
      content: "";
      position: absolute;
      width: 9px;
      height: 5px;
      top: 6px;
      left: 6px;
      transform: rotate(-45deg);
      border-left: 2px solid white;
      border-bottom: 2px solid white;
      opacity: 0;
      visibility: hidden;
      transition: 0.25s linear;
      box-sizing: border-box;
    }
  }
}
</style>
