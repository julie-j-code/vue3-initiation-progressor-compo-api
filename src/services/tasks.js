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

function convertCase(temporalityKebabCase) {
    let result;
    switch (temporalityKebabCase) {
        case 'short-term':
            result = 'court terme';
            break;
        case 'medium-term':
            result = 'moyen terme';
            break;
        case 'long-term':
            result = 'long terme';
            break;
        default:
            result = temporalityKebabCase;
            break;
    }
    return result;
}

function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
  }

export default {
    create,
    read,
    convertCase,
    deleteTask
};