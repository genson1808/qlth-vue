<template>
  <div :style="{ width: width + 'px' }" class="b-input">
    <label :for="unique" :class="required ? 'required' : ''">{{ label }}</label>
    <div class="ip-wrapper">
      <input
        v-autofocus
        autocomplete="off"
        @focus="focused"
        @focusout="focusout"
        tabindex="0"
        :id="unique"
        :style="{ width: ipWidth + 'px' }"
        class="input"
        type="text"
        :value="modelValue"
        :name="name"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="error ? 'input--error' : ''"
        @mouseover="mouseOver"
        @mouseleave="mouseOut"
      />
      <div
        v-if="
          (recommends.length > 0 && showAutocomplete) ||
          (hoverRcm && recommends.length > 0)
        "
        class="autoComplete"
      >
        <ul>
          <li
            v-for="(v, k) in recommends"
            @mouseover="mouseOverCpl"
            @mouseleave="mouseOutCpl"
            @click="selectedRecommend(v)"
            :key="k"
          >
            {{ v }}
          </li>
        </ul>
      </div>
      <span v-show="showError" class="has-error">{{ error }}</span>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import UniqueID from "@/helpers/UniqueID.js";
import { vAutofocus } from "@/use/vAutofocus.js";
const props = defineProps({
  error: {
    type: String,
    default: "",
  },
  ipWidth: {
    type: Number,
    default: 200,
  },
  width: {
    type: Number,
    default: 320,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  recommends: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const unique = UniqueID().getID();

const showAutocomplete = ref(false);
function focused() {
  showAutocomplete.value = true;
}

const hoverRcm = ref(false);

function mouseOverCpl() {
  hoverRcm.value = true;
}

function mouseOutCpl() {
  hoverRcm.value = false;
}

function focusout() {
  showAutocomplete.value = false;
}

const selectedRecommend = function (v) {
  emit("update:modelValue", v);
  hoverRcm.value = false;
};

const showError = ref(false);

const mouseOver = function () {
  if (props.error) {
    showError.value = true;
  }
};

const mouseOut = function () {
  showError.value = false;
};
</script>

<style lang="scss" scoped>
.autoComplete {
  position: absolute;
  background-color: #fff;
  width: 100%;
  min-height: 40px;
  z-index: 4;
  border-radius: 4px;
  top: 35px;
  color: #000;

  box-shadow: 0px 0px 8px 1px rgb(224 224 224);
  -webkit-box-shadow: 0px 0px 8px 1px rgb(224 224 224);
  -moz-box-shadow: 0px 0px 8px 1px rgba(224, 224, 224, 1);

  ul {
    padding: 10px 12px;

    li {
      padding: 8px;

      &:hover {
        background: #ceebdc;
        transition: 0.2s ease;
        cursor: pointer;
      }
    }
  }
}

.b-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;

  label.required::after {
    content: "*";
    color: #d94e37;
    position: absolute;
    margin-left: 2px;
  }

  .ip-wrapper {
    position: relative;
  }

  .input {
    height: 32px;
    padding: 0 12px;
    border-radius: 4px;
    border: 1px solid var(--line-gridpanel-color);
    padding: 0 8px;
  }

  .input:focus {
    outline: none;
    border: 1px solid #02bf70;
  }

  .input--rounded {
    border-radius: 4px;
    border: 1px solid var(--line-gridpanel-color);
  }

  .input--error {
    border: 1px solid #d94e37;
  }

  span.has-error {
    border-radius: 4px;
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translate(-50%, -100%);
    z-index: 3;
    background-color: #ff8484;
    display: flex;
    align-items: center;
    padding: 0 8px;
    min-width: 200px;
    min-height: 26px;
    color: #fff;
    text-align: center;
    padding: 5px;
  }

  span.has-error:after {
    content: "";
    border-right: 6px solid transparent;
    border-top: 6px solid #ff8484;
    border-bottom: 6px solid transparent;
    border-left: 6px solid transparent;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-100%);
  }

  .input--error {
    border: 1px solid #ff8484;
  }

  .input--error:focus {
    outline: none;
    border: 1px solid #ff8484;
  }
}
</style>
