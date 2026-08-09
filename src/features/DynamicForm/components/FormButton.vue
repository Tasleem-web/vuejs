<template>
  <button
    :type="config.type || 'button'"
    :class="[
      'dynamic-button',
      config.variant ? `btn-${config.variant}` : 'btn-primary',
      { 'full-width': config.fullWidth }
    ]"
    :style="{
      width: config.fullWidth ? '100%' : config.width || 'auto',
      minWidth: config.minWidth || undefined,
      maxWidth: config.maxWidth || undefined,
    }"
    :disabled="config.disabled || false"
    @click="handleClick"
  >
    {{ config.label || 'Submit' }}
  </button>
</template>

<script setup>
import { defineEmits, defineProps, toRefs } from 'vue';

const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      label: 'Save Changes',
      type: 'submit',
      variant: 'primary',
      fullWidth: false,
      width: null,
      minWidth: null,
      maxWidth: null,
      disabled: false,
    }),
  },
});

const { config } = toRefs(props);

const emit = defineEmits(['click']);

const handleClick = (event) => {
  emit('click', event);
};
</script>

<style scoped>
.dynamic-button {
  padding: 10px 18px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

.dynamic-button.full-width {
  width: 100%;
}

.btn-primary {
  background-color: #42b883;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-danger {
  background-color: #d9534f;
}

.dynamic-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>
