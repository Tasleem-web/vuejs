<template>
  <div class="position-relative" :class="{ 'was-validated': dirty || touched }">
    <div class="text-start">
      <label :for="id" class="form-label">{{ placeholder }}</label>
      <input
        type="text"
        :id="id"
        :class="[
          'form-control',
          { 'is-invalid': (dirty || touched) && !modelValue },
        ]"
        :ariaLabel="placeholder"
        :ariaDescribedby="name + '-description'"
        autocomplete="on"
        :value="modelValue"
        @input="
          $emit('update:modelValue', $event.target.value);
          dirty = true;
        "
        @blur="touched = true"
        :required="required"
      />
    </div>
    <div
      :id="name + '-description'"
      v-if="required && (dirty || touched) && !modelValue"
      class="text-danger text-start form-text invalid-feedback"
    >
      {{ name }} is required.
    </div>
  </div>
</template>

<script>
export default {
  name: "Custom-Input",
  props: {
    placeholder: String,
    id: String,
    name: String,
    modelValue: String,
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dirty: false,
      touched: false,
    };
  },
};
</script>

<style scoped>
.was-validated .invalid-feedback {
  display: block;
}

label:has(+ input:required)::after {
  content: "*";
  color: #f44336;
  margin-left: 6px;
}

label:not(:has(+ input:required))::after {
  content: "(Optional)";
  color: #6c757d;
  margin-left: 6px;
  font-weight: 400;
  font-size: 0.9em;
}
</style>
