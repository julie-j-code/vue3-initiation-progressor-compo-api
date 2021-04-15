// pour émuler le fait qu'on a une base de donnée
// on crée un tableau qui aura autant d'objets que de tâches
let tasks = [];

function create(task) {
    tasks = [task, ...tasks];
    console.log('tasks', tasks);
}

function read() {
    return tasks;
}

export default {
    create,
    read,
};