<template>
  <div v-if="tasks.length > 0">
    <Modal
      v-if="isInEditMode"
      :task="taskToEdit"
      @updatetask="updateTask($event)"
      @cancel="cancelEdit"
    />
    <!-- pour les boutons permettant de selectionner une temporality -->
    <div class="radio-filters">
      <label for="all">
        <input type="radio" id="all" value="" v-model="selectedTemporality" />
        toutes
      </label>
      <label for="short-term">
        <input
          type="radio"
          id="short-term"
          value="short-term"
          v-model="selectedTemporality"
        />
        court terme
      </label>
      <label for="medium-term">
        <input
          type="radio"
          id="medium-term"
          value="medium-term"
          v-model="selectedTemporality"
        />
        moyen terme
      </label>
      <label for="long-term">
        <input
          type="radio"
          id="long-term"
          value="long-term"
          v-model="selectedTemporality"
        />
        long terme
      </label>
    </div>
    <!-- fin -->
    <input
      type="text"
      placeholder="filtrer"
      v-model="letters"
      @keyup="filter"
    />
    <div v-show="tasksFiltered.length > 0">
      <div class="task" v-for="task in tasksFiltered" :key="task.id">
        <h3>{{ task.name }}</h3>
        <p>{{ task.description }}</p>
        <p>Echéance : {{ convertCase(task.temporality) }}</p>
        <div>
          <button class="small" @click="() => deleteTask(task.id)">suppr</button>
          <button class="small" @click="() => toggle(task)">modif</button>
        </div>
      </div>
    </div>
  </div>
</template>

// pour récupérer la liste des tâches // on utilise notre service > méthode read
<script>
// ref permet de se créer une référence qui corresponde à toutes les tâches
// pour... boucler dessus ?
// permet également de créer une référence côté template pour les options du select
// de manière à  pouvoir les observer !
import { ref, watch } from "vue";
import tasksService from "@/services/tasks.js";
import Modal from "../components/Modal.vue";
export default {
  components: {
    Modal,
  },
  setup() {
    // console.log("selectedTemporality", selectedTemporality);
    const tasks = ref([]);
    const letters = ref("");
    const selectedTemporality = ref("");
    let tasksFiltered = ref([]);
    // pour la modale
    let isInEditMode = ref(false);
    let taskToEdit = ref(null);

    // le .value est nécessaire côté JS,  pas côté template
    tasks.value = tasksService.read();
    filter();

    function convertCase(temporality) {
      return tasksService.convertCase(temporality);
    }

    // function filter() {
    //   if (letters.value.length === 0) {
    //     tasksFiltered.value = tasks.value;
    //   } else {
    //     tasksFiltered.value = tasks.value.filter((t) =>
    //       t.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase())
    //     );
    //   }
    // }
    function filter() {
      if (letters.value.length === 0) {
        tasksFiltered.value = tasks.value;
      } else {
        tasksFiltered.value = tasks.value.filter((t) =>
          t.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase())
        );
      }
      // pour inclure les options de pré-sélection par type de temporality
      if (selectedTemporality.value !== "") {
        tasksFiltered.value = tasksFiltered.value.filter(
          (t) => t.temporality === selectedTemporality.value
        );
      }
    }

    watch(selectedTemporality, (newValue, oldValue) => {
      console.log("newValue: ", newValue, "oldValue: ", oldValue);
      if (newValue !== "") {
        filter();
      } else {
        // take everything then filter
        tasksFiltered.value = tasks.value;
        filter();
      }
    });

    function deleteTask(id) {
      tasksService.deleteTask(id);
      // pour que dès que la suppression a eu lieu
      // elle soit visible par l'utilisateur
      tasks.value = tasksService.read();
      // et pour le rafraichissement de taskFiltered
      filter();
    }
    // pour les modifications demandées côté modale
    function toggle(task) {
      taskToEdit.value = task;
      isInEditMode.value = true;
    }
    function updateTask(task) {
      console.log("updateTask", task);
      tasksService.updateTask(task);
      tasks.value = tasksService.read();
      filter();
      cancelEdit();
    }
    function cancelEdit() {
      isInEditMode.value = false;
      taskToEdit.value = null;
    }

    // comme à chaque fois, pour pouvoir utiliser chaque variable côté template,
    // on les "exporte"
    return {
      tasks,
      letters,
      selectedTemporality,
      tasksFiltered,
      convertCase,
      filter,
      deleteTask,
      isInEditMode,
      taskToEdit,
      toggle,
      updateTask,
      cancelEdit,
    };
  },
};
</script>

<style>
.task {
  margin: 10px 15px;
  border: 3px solid #42b983;
  border-radius: 5px;
}
.radio-filters {
  display: flex;
  justify-content: center;
}
.small {
  width: 60px;
  display: inline-block;
}
</style>
