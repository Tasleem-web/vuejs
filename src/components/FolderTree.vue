<template>
  <ul class="folder-list">
    <li v-for="item in node.children" :key="item.id" class="folder-item">
      <!-- Display item label -->
      <span @click="toggle" class="item-label">
        {{ item.type === "folder" ? "📁" : "📄" }} {{ item.name }}
      </span>

      <!-- RECURSIVE STEP: If item has children and is expanded, render itself -->
      <FolderTree
        v-if="item.children && item.children.length && isOpen"
        :node="item"
      />
    </li>
  </ul>
</template>

<script setup>
import { ref, defineProps } from "vue";

// Define the incoming node interface/structure
defineProps({
  node: {
    type: Object,
    required: true,
  },
});

// Component internal state to toggle folders open/closed
const isOpen = ref(true);
const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.folder-list {
  list-style-type: none;
  padding-left: 20px;
  margin: 5px 0;
}

.folder-item {
  margin: 4px 0;
}

.item-label {
  cursor: pointer;
  user-select: none;
}

.item-label:hover {
  text-decoration: underline;
}
</style>
