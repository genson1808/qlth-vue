<template>
  <input
    :checked="modelValue"
    type="checkbox"
    class="field"
    @change="$emit('update:viewModel', $event.target.checked)"
    @input="$emit('update:viewModel', $event.target.checked)"
  />
</template>

<script>
export default {
  name: "BaseCheckbox",
  props: {
    modelValue: {
      type: Boolean,
    },
  },
};
</script>
