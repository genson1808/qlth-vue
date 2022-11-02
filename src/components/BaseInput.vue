<template>
  <div :style="{ width: width + 'px' }" class="b-input">
    <label for="ip-name" :class="required ? 'required' : ''">{{ label }}</label>
    <div class="ip-wrapper">
      <input
        tabindex="0"
        id="ip-name"
        :style="{ width: ipWidth + 'px' }"
        class="input"
        type="text"
        :value="modelValue"
        :name="name"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span v-if="error" class="has-error">{{ error }}</span>
    </div>
  </div>
</template>

<script setup>
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
});
</script>

<style lang="scss" scoped>
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
    top: 3px;
    right: -6px;
    transform: translateX(100%);
    z-index: 3;
    background-color: #ff8484;
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 26px;
    color: #fff;
  }

  span.has-error:after {
    content: "";
    border-right: 6px solid #ff8484;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%);
  }
}
</style>
