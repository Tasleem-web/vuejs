<template>
  <div class="form-container">
    <h2>Dynamic Profile Form</h2>

    <form
      @submit.prevent="handleSubmit"
      class="form-grid"
      :style="{
        gridTemplateColumns: `repeat(${formGrid.value}, minmax(0, 1fr))`,
      }"
    >
      <!-- Loop dynamically through the schema -->
      <div
        v-for="field in formSchema"
        :key="field.id"
        class="form-group"
        :style="fieldGridStyle(field)"
      >
        <template v-if="field.type !== 'button'">
          <label :for="field.id">
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
            @click="handleButtonAction(field, button, $event)"
          />
        </div>

        <!-- Render Select Dropdowns dynamically -->
        <SelectDropdown
          v-else-if="field.type === 'select'"
          :field="{ ...field, value: formControls[field.id].value }"
          :form="formControls[field.id]"
          @update:field="(updated) => handleTextFieldUpdate(field, updated)"
          @blur="handleFieldBlur(field)"
        />

        <!-- Render Standard Text/Email Inputs dynamically -->
        <TextBox
          v-else
          :field="{ ...field, value: formControls[field.id].value }"
          :form="formControls[field.id]"
          @update:field="(updated) => handleTextFieldUpdate(field, updated)"
          @blur="handleFieldBlur(field)"
        />

        <p
          v-if="
            formControls[field.id].error &&
            (formControls[field.id].touched || formControls[field.id].dirty)
          "
          class="error-message"
        >
          {{ formControls[field.id].error }}
        </p>

        <div v-if="field.nestedFields" class="nested-fields">
          <div
            v-for="child in field.nestedFields"
            :key="child.id"
            class="nested-field"
            :style="fieldGridStyle(child)"
          >
            <label :for="child.id">
              {{ child.label }}
              <span
                v-if="child.validators?.includes('required')"
                class="required-indicator"
                >*</span
              >
            </label>

            <SelectDropdown
              v-if="child.type === 'select'"
              :field="{ ...child, value: formControls[child.id].value }"
              :form="formControls[child.id]"
              @update:field="(updated) => handleTextFieldUpdate(child, updated)"
              @blur="handleFieldBlur(child)"
            />

            <TextBox
              v-else
              :field="{ ...child, value: formControls[child.id].value }"
              :form="formControls[child.id]"
              @update:field="(updated) => handleTextFieldUpdate(child, updated)"
              @blur="handleFieldBlur(child)"
            />

            <p
              v-if="
                formControls[child.id].error &&
                (formControls[child.id].touched || formControls[child.id].dirty)
              "
              class="error-message"
            >
              {{ formControls[child.id].error }}
            </p>
          </div>
        </div>
      </div>

      <!-- <div class="form-actions">
        <FormButton :config="props.buttonConfig" />
      </div> -->
    </form>

    <!-- Visual snapshot of real-time reactivity -->
    <!-- <pre>{{ formValues }}</pre> -->
  </div>
</template>

<script setup>
import {
  computed,
  defineProps,
  reactive,
  toRef,
  watch,
  defineEmits,
} from "vue";
import TextBox from "./DynamicForm/components/TextBox.vue";
import SelectDropdown from "./DynamicForm/components/SelectDropdown.vue";
import FormButton from "./DynamicForm/components/FormButton.vue";

const props = defineProps({
  formSchema: {
    type: Array,
    default: () => [],
  },
  grid: {
    type: Number,
    default: 12,
  },
  defaultButtonConfig: {
    type: Object,
    default: () => ({
      label: "Save Changes",
      type: "submit",
      variant: "primary",
      fullWidth: false,
      disabled: false,
    }),
  },
  buttonConfig: {
    type: Object,
    default: () => ({}),
  },
});

const formSchema = toRef(props, "formSchema");
const formGrid = toRef(props, "grid");

// 2. Initialize reactive controls for each field
const formControls = reactive({});

const resetControls = (schema) => {
  Object.keys(formControls).forEach((key) => {
    delete formControls[key];
  });

  const createControls = (fields) => {
    fields.forEach((field) => {
      formControls[field.id] = {
        value: "",
        touched: false,
        dirty: false,
        error: "",
      };
      if (field.nestedFields) {
        createControls(field.nestedFields);
      }
    });
  };

  createControls(schema);
};

watch(
  formSchema,
  (schema) => {
    resetControls(schema);
  },
  { immediate: true },
);

const formValues = computed(() =>
  Object.fromEntries(
    Object.entries(formControls).map(([key, control]) => [key, control.value]),
  ),
);

const emit = defineEmits(["update:formValues"]);

// Emit form values to parent whenever they change
watch(
  formValues,
  (val) => {
    try {
      emit("update:formValues", val);
    } catch (e) {
      // ignore emit errors in non-parent contexts
    }
  },
  { immediate: true, deep: true },
);

const validatorRegistry = {
  required: (field, control) => {
    if (!control.value) {
      return `${field.label} is required.`;
    }
    return "";
  },
  email: (field, control) => {
    if (control.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(control.value)) {
        return "Please enter a valid email address.";
      }
    }
    return "";
  },
  regex: (field, control, validator) => {
    if (!validator?.pattern || !control.value) {
      return "";
    }
    const pattern =
      validator.pattern instanceof RegExp
        ? validator.pattern
        : new RegExp(validator.pattern);
    if (!pattern.test(control.value)) {
      return validator.message || `${field.label} format is invalid.`;
    }
    return "";
  },
  custom: (field, control, validator) => {
    if (typeof validator?.validate === "function") {
      return validator.validate(control.value, field) || "";
    }
    return "";
  },
};

const validateField = (field) => {
  const control = formControls[field.id];
  control.error = "";

  if (!Array.isArray(field.validators)) {
    return true;
  }

  for (const validator of field.validators) {
    let error = "";

    if (typeof validator === "string") {
      const fn = validatorRegistry[validator];
      if (fn) {
        error = fn(field, control);
      }
    } else if (typeof validator === "function") {
      error = validator(control.value, field) || "";
    } else if (typeof validator === "object" && validator !== null) {
      if (validator.type && validatorRegistry[validator.type]) {
        error = validatorRegistry[validator.type](field, control, validator);
      } else if (validator.name && validatorRegistry[validator.name]) {
        error = validatorRegistry[validator.name](field, control, validator);
      }
    }

    if (error) {
      control.error = error;
      return false;
    }
  }

  return true;
};

const validateForm = () => {
  let valid = true;

  const validateFields = (fields) => {
    fields.forEach((field) => {
      if (!validateField(field)) {
        valid = false;
      }
      if (field.nestedFields) {
        validateFields(field.nestedFields);
      }
    });
  };

  validateFields(formSchema.value);
  return valid;
};

const handleTextFieldUpdate = (field, updatedField) => {
  const control = formControls[field.id];
  control.value = updatedField.value;
  control.dirty = true;
  validateField({ ...field, value: updatedField.value });
  try {
    if (typeof field.onUpdate === "function") {
      field.onUpdate(control, field);
    }
  } catch (e) {
    console.error("onUpdate callback error:", e);
  }
};

// const handleFieldChange = (field) => {
//   const control = formControls[field.id];
//   control.dirty = true;
//   validateField(field);
//   try {
//     if (typeof field.onChange === "function") {
//       field.onChange(control, field);
//     }
//   } catch (e) {
//     console.error("onChange callback error:", e);
//   }
// };

const handleFieldBlur = (field) => {
  const control = formControls[field.id];
  control.touched = true;
  validateField(field);
  try {
    if (typeof field.onBlur === "function") {
      field.onBlur(control, field);
    }
  } catch (e) {
    console.error("onBlur callback error:", e);
  }
};

const buttonConfigsFor = (field) => {
  const defaultConfig = {
    ...props.defaultButtonConfig,
    ...props.buttonConfig,
    label:
      field.label ||
      props.buttonConfig?.label ||
      props.defaultButtonConfig.label ||
      "Submit",
  };

  const normalizeConfig = (cfg) => ({
    ...defaultConfig,
    ...cfg,
    label: cfg.label || defaultConfig.label,
  });

  if (Array.isArray(field.buttonConfig)) {
    return field.buttonConfig.map(normalizeConfig);
  }

  return [normalizeConfig(field.buttonConfig || {})];
};

const handleButtonAction = (field, button, event) => {
  if (typeof button.onClick === "function") {
    button.onClick(event, formValues.value);
    return;
  }

  if (typeof field.onClick === "function") {
    field.onClick(event, formValues.value);
  }
};

const fieldGridStyle = (field) => {
  if (!field.grid) {
    return {};
  }

  const styles = {};

  if (field.grid.col) {
    const colSpan = field.grid.colSpan || 1;
    styles.gridColumn = `${field.grid.col} / span ${colSpan}`;
  }

  if (field.grid.row) {
    const rowSpan = field.grid.rowSpan || 1;
    styles.gridRow = `${field.grid.row} / span ${rowSpan}`;
  }

  return styles;
};

// 3. Handle submission
const handleSubmit = () => {
  if (!validateForm()) {
    const markTouched = (fields) => {
      fields.forEach((field) => {
        formControls[field.id].touched = true;
        if (field.nestedFields) {
          markTouched(field.nestedFields);
        }
      });
    };

    markTouched(formSchema.value);
    return;
  }

  console.log("Submitted Data:", JSON.stringify(formValues.value, null, 2));
};
</script>

<style scoped>
.form-container {
  margin: auto;
  padding: 20px;
  font-family: sans-serif;
}
.form-grid {
  display: grid;
  gap: 16px;
  grid-auto-flow: dense;
  grid-auto-rows: minmax(0, auto);
}
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
label {
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
}
input,
select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.required-indicator {
  color: #d9534f;
  margin-left: 4px;
}
.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 10px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error-message {
  margin-top: 5px;
  color: #d9534f;
  font-size: 0.875rem;
}
pre {
  background: #f4f4f4;
  padding: 10px;
  margin-top: 20px;
  border-radius: 4px;
  text-align: left;
}
</style>
