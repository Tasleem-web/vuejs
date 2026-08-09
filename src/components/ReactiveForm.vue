<template>
  <div class="form-container">
    <CreateDynamicForm
      :formSchema="formSchema"
      :grid="formGrid"
      :buttonConfig="buttonConfig"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CreateDynamicForm from "../features/CreateDynamicForm.vue";
import { JustifyContent } from "@/features/DynamicForm/constants/JustifyContent.js";
const formGrid = ref(12);

const buttonConfig = {
  label: "Save Changes",
  type: "submit",
  variant: "primary",
  fullWidth: false,
  disabled: false,
};

// Example field-level callbacks
const handleNameBlur = (control, field) => {
  console.log("Field blurred:", field.id, control.value);
};

const handleNameUpdate = (control, field) => {
  console.log("Field updated:", field.id, control.value);
};

const formSchema = ref([
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    validators: [
      "required",
      {
        type: "regex",
        pattern: "^[A-Za-z\\s]+$",
        message: "Name must contain only letters and spaces.",
      },
    ],
    grid: { col: 1, row: 1, colSpan: 4 },
    onBlur: handleNameBlur,
    onUpdate: handleNameUpdate,
  },
  {
    id: "age",
    label: "Age",
    type: "number",
    validators: [
      "required",
      {
        type: "regex",
        pattern: "^(?:1[89]|[2-9][0-9]|100)$",
        message: "Age must be a number between 18 and 100.",
      },
    ],
    placeholder: "30",
    grid: { col: 5, row: 1, colSpan: 4 },
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    validators: [
      "required",
      "email",
      {
        type: "regex",
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address.",
      },
    ],
    placeholder: "john@example.com",
    grid: { col: 9, row: 1, colSpan: 4, rowSpan: 1 },
  },
  {
    id: "username",
    label: "Username",
    type: "text",
    validators: [
      "required",
      {
        type: "regex",
        pattern: "^[A-Za-z0-9_]{3,20}$",
        message: "Username must be 3-20 letters, numbers, or underscores.",
      },
    ],
    placeholder: "john_doe",
    grid: { col: 1, row: 2, colSpan: 4, rowSpan: 1 },
  },
  {
    id: "role",
    label: "Job Role",
    type: "select",
    validators: ["required"],
    placeholder: "Select a role",
    options: ["Developer", "Designer", "Manager"],
    grid: { col: 5, row: 2, colSpan: 4, rowSpan: 0 },
  },
  {
    id: "actions",
    type: "button",
    justifyContent: JustifyContent.START,
    buttonConfig: [
      {
        label: "Save",
        type: "submit",
        variant: "primary",
        width: "140px",
        onClick: (event, values) => {
          console.log("save", values);
        },
      },
      {
        label: "Cancel",
        type: "button",
        variant: "secondary",
        width: "120px",
        onClick: (event, values) => {
          console.log("cancel", event, values);
        },
      },
    ],
    grid: { col: 9, row: 2, colSpan: 4, rowSpan: 1 },
  },
]);
</script>

<style scoped></style>
