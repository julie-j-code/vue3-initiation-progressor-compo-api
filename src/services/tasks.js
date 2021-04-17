// pour émuler le fait qu'on a une base de donnée
// on crée un tableau qui aura autant d'objets que de tâches
let tasks = [];
const storageKey = 'tasks-vue3-compo-api';

function create(task) {
    // par sécurité ??
    // if(tasks === null) {
    //     tasks = [];
    //   }

    tasks = [task, ...tasks];
    console.log('tasks', tasks);
    save();
}

function read() {
    tasks = retrieveTasks();
    return tasks;
}

function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    save();
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

function save() {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
}

// à usage interne, on n'a pas besoin d'ajouter cette fonction au tableau des exports
function retrieveTasks() {
    // pour récupérer ce qui est récupéré depuis localStorage !
    const fromLocalstorage = localStorage.getItem(storageKey)
    return JSON.parse(fromLocalstorage);
}


export default {
    create,
    read,
    convertCase,
    deleteTask,
    save,
};