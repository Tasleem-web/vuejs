<template>
  <div class="form-container">
    <CreateDynamicForm
      :formSchema="formSchema"
      :grid="formGrid"
      :buttonConfig="buttonConfig"
      :formTitle="'Dynamic Form Example'"
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
    grid: { col: 5, row: 2, colSpan: 4, rowSpan: 1 },
  },
  {
    id: "Indeterminate-checkbox",
    label: "Indeterminate checkbox",
    type: "checkbox",
    placeholder: "John Doe",
    validators: ["required"],
    grid: { col: 1, row: 3, colSpan: 4 },
    onBlur: handleNameBlur,
    onUpdate: handleNameUpdate,
  },
  // {
  //   id: "company",
  //   label: "Company Details",
  //   type: "group",
  //   grid: { col: 1, row: 3, colSpan: 12 },
  //   nestedFields: [
  //     {
  //       id: "companyName",
  //       label: "Company Name",
  //       type: "text",
  //       validators: ["required"],
  //       placeholder: "Acme Corp",
  //       grid: { col: 1, row: 3, colSpan: 4 },
  //     },
  //     {
  //       id: "department",
  //       label: "Department",
  //       type: "group",
  //       grid: { col: 5, row: 3, colSpan: 4 },
  //       nestedFields: [
  //         {
  //           id: "departmentName",
  //           label: "Department Name",
  //           validators: ["required"],
  //           type: "text",
  //           placeholder: "Engineering",
  //           grid: { col: 5, row: 3, colSpan: 4 },
  //         },
  //         {
  //           id: "team",
  //           label: "Team",
  //           type: "group",
  //           grid: { col: 9, row: 3, colSpan: 4 },
  //           nestedFields: [
  //             {
  //               id: "teamName",
  //               label: "Team Name",
  //               validators: ["required"],
  //               type: "text",
  //               placeholder: "Frontend",
  //               grid: { col: 9, row: 3, colSpan: 4 },
  //             },
  //             {
  //               id: "teamLead",
  //               label: "Team Lead",
  //               validators: ["required"],
  //               type: "text",
  //               placeholder: "Jane Doe",
  //               grid: { col: 9, row: 4, colSpan: 4 },
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
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
