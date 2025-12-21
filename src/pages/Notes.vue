<template>
  <h1>Notes</h1>
  <ul>
    <li v-for="(note, index) in notes" :key="index">{{ note }}</li>
  </ul>
  <input
    type="text"
    v-model="title"
    placeholder="Add a note"
    @keypress.enter="addNote"
  />

  <p>Total notes : {{ totalNote }}</p>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  name: "NotesComponent",
  setup() {
    const store = useStore();
    const notes = computed(() => store.state.notesModule.notes);
    const totalNote = computed(() => store.getters["notesModule/totalNotes"]);

    const title = ref("");

    function addNote() {
      if (title.value.trim() !== "") {
        notes.value.push(title.value.trim());
        title.value = "";
        store.dispatch("notesModule/saveNote", title.value);
      }
    }

    return {
      notes,
      title,
      addNote,
      totalNote,
    };
  },
};
</script>

<style scoped></style>
