<template>
  <div v-if="tasks.length > 0">
    <input type="text" placeholder="filtrer" v-model="letters" @keyup="filter"/>
    <div v-show="tasksFiltered.length > 0">
      <div class="task" v-for="task in tasksFiltered" :key="task.id">
        <h3>{{ task.name }}</h3>
        <p>{{ task.description }}</p>
        <p>Echéance : {{ convertCase(task.temporality) }}</p>
      </div>
    </div>
  </div>
</template>

// pour récupérer la liste des tâches // on utilise notre service > méthode read
<script>
// ref permet de se créer une référence qui corresponde à toutes les tâches
// pour... boucler dessus ?
import { ref } from "vue";
import tasksService from "@/services/tasks.js";
export default {
  setup() {
    const tasks = ref([]);
    const letters = ref("");
    let tasksFiltered = ref([]);
    // le .value est nécessaire côté JS,  pas côté template
    tasks.value = tasksService.read();
    filter();

    function convertCase(temporality) {
      return tasksService.convertCase(temporality);
    }

    function filter() {
      if (letters.value.length === 0) {
        tasksFiltered.value = tasks.value;
      } else {
        tasksFiltered.value = tasks.value.filter((t) =>
          t.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase())
        );
      }
    }
    // comme à chaque fois, pour pouvoir l'utiliser au dessus
    // côté template, on "l'exporte"
    return { tasks, letters, tasksFiltered, convertCase, filter };
  },
};
</script>

<style>
.task {
  margin: 10px 15px;
  border: 3px solid #42b983;
  border-radius: 5px;
}
</style>
