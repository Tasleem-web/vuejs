<template>
  <div>
    <input
      v-if="!field.multiline"
      :type="field.type || 'text'"
      :id="field.id || field.name"
      :name="field.id || field.name"
      :value="field.value"
      :required="field.required"
      :class="[
        'form-control',
        {
          'is-valid':
            form &&
            (form.touched || form.dirty) &&
            !form.error &&
            form.value !== '' &&
            form.value !== null &&
            form.value !== undefined,
          'is-invalid': form && (form.touched || form.dirty) && !!form.error,
        },
      ]"
      @input="updateValue($event.target.value)"
      @blur="handleBlur"
    />
    <textarea
      v-else
      :id="field.id || field.name"
      :name="field.id || field.name"
      :rows="field.rows || 3"
      :value="field.value"
      :required="field.required"
      :class="[
        'form-control',
        {
          'is-valid':
            form &&
            (form.touched || form.dirty) &&
            !form.error &&
            form.value !== '' &&
            form.value !== null &&
            form.value !== undefined,
          'is-invalid': form && (form.touched || form.dirty) && !!form.error,
        },
      ]"
      @input="updateValue($event.target.value)"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  field: {
    type: Object,
    default: () => ({ multiline: false, value: "" }),
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

<style scoped></style>
