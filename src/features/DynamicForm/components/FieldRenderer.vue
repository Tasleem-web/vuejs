<template>
  <template v-if="field.type === 'array'">
    <div class="group-heading">
      <strong>{{ field.label }}</strong>
    </div>

    <div
      v-for="(item, index) in field.items"
      :key="item.id || index"
      class="array-item"
    >
      <FieldRenderer
        :field="item"
        :formControls="formControls"
        :buttonConfigsFor="buttonConfigsFor"
        :handleTextFieldUpdate="handleTextFieldUpdate"
        :handleFieldBlur="handleFieldBlur"
        :handleButtonAction="handleButtonAction"
        :fieldGridStyle="fieldGridStyle"
        :addArrayItem="addArrayItem"
        :removeArrayItem="removeArrayItem"
      />
      <button
        v-if="field.canRemove !== false"
        type="button"
        class="remove-button"
        @click="removeArrayItem(field, index)"
      >
        {{ field.removeButtonLabel || "Remove" }}
      </button>
    </div>

    <button type="button" class="add-button" @click="addArrayItem(field)">
      {{ field.addButtonLabel || "Add" }}
    </button>
  </template>

  <template v-else-if="field.type === 'group' && field.nestedFields?.length">
    <div class="group-wrapper" :style="fieldGridStyle(field)">
      <div class="group-heading">
        <strong>{{ field.label }}</strong>
      </div>

      <div class="group-fields">
        <FieldRenderer
          v-for="child in field.nestedFields"
          :key="child.id"
          :field="child"
          :formControls="formControls"
          :buttonConfigsFor="buttonConfigsFor"
          :handleTextFieldUpdate="handleTextFieldUpdate"
          :handleFieldBlur="handleFieldBlur"
          :handleButtonAction="handleButtonAction"
          :fieldGridStyle="fieldGridStyle"
          :addArrayItem="addArrayItem"
          :removeArrayItem="removeArrayItem"
        />
      </div>
    </div>
  </template>

  <div
    v-else
    class="form-group"
    :style="fieldGridStyle(field)"
    :class="{
      'was-validated':
        formControls[field.id]?.invalid &&
        (formControls[field.id]?.touched || formControls[field.id]?.dirty),
    }"
  >
    <template v-if="field.type !== 'button'">
      <label :for="field.id" class="form-label">
        {{ field.label }}
        <span
          v-if="field.validators?.includes('required')"
          class="required-indicator"
          >*</span
        >
      </label>
    </template>

    <div
      v-if="field.type === 'button'"
      class="button-group"
      :style="{ justifyContent: field.justifyContent }"
    >
      <FormButton
        v-for="(button, index) in buttonConfigsFor(field)"
        :key="index"
        :config="button"
        @click="(e) => handleButtonAction(field, button, e)"
      />
    </div>

    <SelectDropdown
      v-else-if="field.type === 'select'"
      :field="{ ...field, value: formControls[field.id].value }"
      :form="formControls[field.id]"
      @update:field="(updated) => handleTextFieldUpdate(field, updated)"
      @blur="() => handleFieldBlur(field)"
    />

    <TextBox
      v-else
      :field="{ ...field, value: formControls[field.id].value }"
      :form="formControls[field.id]"
      @update:field="(updated) => handleTextFieldUpdate(field, updated)"
      @blur="() => handleFieldBlur(field)"
    />

    <p
      v-if="
        formControls[field.id].error &&
        (formControls[field.id].touched || formControls[field.id].dirty)
      "
      class="error-message invalid-feedback d-block"
    >
      {{ formControls[field.id].error }}
    </p>
  </div>
</template>

<script>
import TextBox from "./TextBox.vue";
import SelectDropdown from "./SelectDropdown.vue";
import FormButton from "./FormButton.vue";

export default {
  name: "FieldRenderer",
  components: {
    TextBox,
    SelectDropdown,
    FormButton,
  },
  props: {
    field: { type: Object, required: true },
    formControls: { type: Object, required: true },
    buttonConfigsFor: { type: Function, required: true },
    handleTextFieldUpdate: { type: Function, required: true },
    handleFieldBlur: { type: Function, required: true },
    handleButtonAction: { type: Function, required: true },
    fieldGridStyle: { type: Function, required: true },
    addArrayItem: { type: Function, default: () => {} },
    removeArrayItem: { type: Function, default: () => {} },
  },
};
</script>

<style scoped>
.group-wrapper {
  display: grid;
  gap: 12px;
  padding: 12px;
  border: 1px solid #dde2e6;
  border-radius: 8px;
  background: #fafbfc;
}

.group-heading {
  font-size: 1rem;
  margin: 0;
}

.group-fields {
  display: grid;
  gap: 12px;
}

.required-indicator {
  color: #d9534f;
  margin-left: 4px;
}
</style>
