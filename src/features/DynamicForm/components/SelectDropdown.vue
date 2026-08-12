<template>
  <div>
    <select
      :id="field.id || field.name"
      :name="field.id || field.name"
      :value="field.value"
      @change="updateValue($event.target.value)"
      @blur="handleBlur"
      class="form-control"
      :class="[
        'form-select',
        {
          'is-valid':
            form &&
            (form.touched || form.dirty) &&
            !form.error &&
            form.value !== '' &&
            form.value !== null &&
            form.value !== undefined,
          'is-invalid': form && (form.touched || form.dirty) && !!form.error,
          'pe-5':
            form &&
            (form.touched || form.dirty) &&
            (!!form.error ||
              (form.value !== '' &&
                form.value !== null &&
                form.value !== undefined)),
        },
      ]"
    >
      <option value="" disabled>
        {{ field.placeholder || "Select an option" }}
      </option>
      <option v-for="opt in field.options" :key="opt" :value="opt">
        {{ opt }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  field: {
    type: Object,
    default: () => ({ value: "", options: [] }),
  },
  form: {
    type: Object,
    default: () => ({ valid: true, dirty: false }),
  },
});

const emit = defineEmits(["update:field", "blur"]);

const updateValue = (value) => {
  emit("update:field", { ...props.field, value });
};

const handleBlur = () => {
  emit("blur");
};
</script>

<style scoped>
.form-control {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* Ensure native dropdown arrow is visible */
  -webkit-appearance: menulist-button;
  -moz-appearance: menulist-button;
  appearance: auto;
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 34px;
}
</style>
