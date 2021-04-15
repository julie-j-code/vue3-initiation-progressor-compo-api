<template>
  <h3>Créer une tâche</h3>
  <form @submit.prevent="createTask"></form>
  <input type="text" placeholder="Nom de la tâche" v-model="name" /><br />
  <textarea
    name="Description de la tâche"
    id=""
    cols="30"
    rows="10"
    v-model="description"
  ></textarea>
  <select v-model="temporality">
    <option
      v-for="tempo in temporalityTypes"
      :value="tempo.value"
      :key="tempo.id"
    >
      {{ tempo.name }}
    </option></select
  ><br />
  <button>Créer</button>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let name = ref("");
    let description = ref("");
    const temporalityTypes = ref([
      {
        id: 1,
        name: "court terme",
        value: "short-term",
      },
      {
        id: 2,
        name: "moyen terme",
        value: "medium-term",
      },
      {
        id: 3,
        name: "long terme",
        value: "long-term",
      },
    ]);
    let temporality = ref("");
    //   pour que ces variables soient utilisables côté template
        // à la soumission du formulaire
        function createTask() {
          const task = {
            id: Date.now(),
            name: name.value,
            description: description.value,
            temporality: temporality.value,
          };
          console.log("task", task);
      resetForm();
    }
    function resetForm() {
      name.value = "";
      description.value = "";
      temporality.value = null;
    }
    return {
      description,
      name,
      temporalityTypes,
      temporality,
      createTask,
      resetForm,
    };
  },
};
</script>

<style>
input,
textarea,
select,
button {
  width: 90%;
  margin: 5px 10px;
}
</style>
