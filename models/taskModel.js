// Obtener tareas desde localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Guardar tareas en localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Agregar una nueva tarea
function addTask(name, description, dueDate, status) {
    const tasks = getTasks();
    const newTask = { name, description, dueDate, status };
    tasks.push(newTask);
    saveTasks(tasks);
}

// Obtener una tarea por nombre
function getTaskByName(name) {
    const tasks = getTasks();
    return tasks.find(task => task.name === name);
}

// Filtrar tareas por parámetros
function filterTasks({ name = '', status = '', dueDate = '' }) {
    const tasks = getTasks();
    return tasks.filter(task => {
        const matchesName = task.name.toLowerCase().includes(name.toLowerCase());
        const matchesStatus = status === '' || task.status === status;
        const matchesDate = dueDate === '' || task.dueDate === dueDate;

        return matchesName && matchesStatus && matchesDate;
    });
}

// Eliminar una tarea por nombre
function deleteTask(name) {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.name !== name);
    saveTasks(updatedTasks);
}

// Exportar funciones del modelo
export { getTasks, saveTasks, addTask, getTaskByName, filterTasks, deleteTask };
