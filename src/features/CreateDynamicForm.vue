<template>
  <div class="form-container">
    <h2>{{ formTitle || "Dynamic Form" }}</h2>

    <form
      id="dynamic-form-grid"
      @submit.prevent="handleSubmit"
      class="form-grid needs-validation"
      novalidate
      :style="{
        gridTemplateColumns: `repeat(${formGrid.value}, minmax(0, 1fr))`,
      }"
    >
      <!-- Loop dynamically through the schema -->
      <FieldRenderer
        v-for="field in formSchema"
        :key="field.id"
        :field="field"
        :formControls="formControls"
        :buttonConfigsFor="buttonConfigsFor"
        :handleTextFieldUpdate="handleTextFieldUpdate"
        :handleFieldBlur="handleFieldBlur"
        :handleButtonAction="handleButtonAction"
        :fieldGridStyle="fieldGridStyle"
        :addArrayItem="addArrayItem"
        :removeArrayItem="removeArrayItem"
      />
    </form>
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
import FieldRenderer from "./DynamicForm/components/FieldRenderer.vue";

const props = defineProps({
  formSchema: {
    type: Array,
    default: () => [],
  },
  formTitle: {
    type: String,
    default: "Dynamic Form",
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

const clone = (value) => JSON.parse(JSON.stringify(value));

const assignUniqueIds = (field, parentId = "field") => {
  if (!field.id || field.id === parentId) {
    field.id = generateFieldId(parentId);
  }

  if (field.nestedFields) {
    field.nestedFields.forEach((child) => assignUniqueIds(child, field.id));
  }

  if (field.type === "array" && Array.isArray(field.items)) {
    field.items.forEach((item) => assignUniqueIds(item, field.id));
  }
};

const createControls = (fields) => {
  fields.forEach((field) => {
    if (field.type === "array" && Array.isArray(field.items)) {
      if (field.items.length === 0 && field.itemTemplate) {
        const templateCopy = clone(field.itemTemplate);
        assignUniqueIds(templateCopy, field.id);
        field.items.push(templateCopy);
      }
      createControls(field.items);
      return;
    }

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

const resetControls = (schema) => {
  Object.keys(formControls).forEach((key) => {
    delete formControls[key];
  });

  if (Array.isArray(schema)) {
    schema.forEach((field) => assignUniqueIds(field, "root"));
  }

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
      if (field.type === "array" && Array.isArray(field.items)) {
        field.items.forEach((item) => validateFields([item]));
        return;
      }

      if (field.type !== "group" && field.type !== "array") {
        if (!validateField(field)) {
          valid = false;
        }
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

const generateFieldId = (base) =>
  `${base}-${Math.random().toString(36).slice(2, 9)}`;

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

const addArrayItem = (field) => {
  const template = field.itemTemplate || field.items?.[0];
  if (!template) {
    console.warn("No item template defined for array field:", field.id);
    return;
  }

  const newItem = clone(template);
  if (typeof newItem.id === "undefined" || newItem.id === template.id) {
    newItem.id = generateFieldId(field.id);
  }

  if (!Array.isArray(field.items)) {
    field.items = [];
  }
  field.items.push(newItem);
  createControls([newItem]);
};

const removeArrayItem = (field, index) => {
  const item = field.items?.[index];
  if (!item) {
    return;
  }

  const deleteControls = (fields) => {
    fields.forEach((child) => {
      if (child.type === "array" && Array.isArray(child.items)) {
        deleteControls(child.items);
        return;
      }
      delete formControls[child.id];
      if (child.nestedFields) {
        deleteControls(child.nestedFields);
      }
    });
  };

  deleteControls([item]);
  field.items.splice(index, 1);
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
        const control = formControls[field.id];
        if (control) {
          control.touched = true;
        }

        if (field.nestedFields) {
          markTouched(field.nestedFields);
        }

        if (field.type === "array" && Array.isArray(field.items)) {
          field.items.forEach((item) => markTouched([item]));
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
