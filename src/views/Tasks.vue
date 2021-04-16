<template>
  <div v-if="tasks.length > 0">
    <div class="task" v-for="task in tasks" :key="task.id">
      <h3>{{ task.name }}</h3>
      <p>{{ task.description }}</p>
      <p>Echéance : {{ convertCase(task.temporality)}}</p>
    </div>
  </div>
</template>

// pour récupérer la liste des tâches
// on utilise notre service > méthode read
<script>
    // ref permet de se créer une référence qui corresponde à toutes les tâches
    // pour... boucler dessus ? 
import { ref } from "vue";
import tasksService from "@/services/tasks.js";
export default {
  setup() {

    const tasks = ref([]);
    // le .value est nécessaire côté JS,  pas côté template
    tasks.value = tasksService.read();
    
    function convertCase(temporality) {
          return tasksService.convertCase(temporality);
      }
// comme à chaque fois, pour pouvoir l'utiliser au dessus
// côté template, on "l'exporte"
    return { tasks, convertCase };
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