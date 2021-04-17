<template>
  <h3>Créer une tâche</h3>
  <form @submit.prevent="createTask">
    <!-- la ref est nécessaire au setup du focus ! onMounted -->

    <input
      type="text"
      placeholder="Nom de la tâche"
      v-model="name"
      ref="txtName"
    /><br />
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
    <!-- typique à vue si on veut que disabled dépende de la valeur d'une variable
    on ajoute les : -->
    <button :disabled="!isFormValid">créer</button>
  </form>
</template>

<script>
// à la différence de onMounted, computed sera appelé
// à chaque changement d'un champ du formulaire
import { ref, computed, onMounted } from "vue";

// comme on utilise la méthode setup ici
// à la différence des verions Vue 2
// on ne peut pas utiliser le this.$emit
// pour émettre un évènement vers le parent
// mais setup permet de passer 2 arguments
// dont un objet de context ! qui a à disposition une propriété emit
// pour émettre des custom events
export default {
  name: "Form",
  emits: ["createtask"],
  setup(props, context) {
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
    // txtName initialisée à null va attendre que le component soit Mounted
    let txtName = ref(null);
    // pour que les variables soient utilisables côté template
    // à la soumission du formulaire
    function createTask() {
      const task = {
        id: Date.now(),
        name: name.value,
        description: description.value,
        temporality: temporality.value,
      };
      console.log("task", task);
      context.emit("createtask", task);
      resetForm();
    }
    function resetForm() {
      name.value = "";
      description.value = "";
      temporality.value = null;
      txtName.value.focus();
    }
    onMounted(() => {
      console.log("onMounted | txtName.value", txtName.value);
      txtName.value.focus();
    });
    const isFormValid = computed(() => {
      if (
        name.value !== "" &&
        description.value !== "" &&
        temporality.value !== ""
      ) {
        return true;
      } else {
        return false;
      }
    });
    return {
      name,
      description,
      temporalityTypes,
      temporality,
      createTask,
      resetForm,
      txtName,
      isFormValid,
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
