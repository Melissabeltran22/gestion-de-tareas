import { getTasks, saveTasks, addTask, filterTasks, deleteTask } from './taskModel.js';

// Registro de Usuario
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let department = document.getElementById('department').value;

    // Expresiones regulares
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!name || !email || !password || !department) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    if (!passwordRegex.test(password)) {
        alert('La contraseña debe tener al menos 4 caracteres, incluir una mayúscula y un número.');
        return;
    }

    if (!nameRegex.test(name)) {
        alert('El nombre solo debe contener letras y espacios.');
        return;
    }

    // Almacenamos los datos en localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password, department });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuario registrado exitosamente!');
    window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
});

// Inicio de Sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert('Inicio de sesión exitoso');
        window.location.href = 'dashboard.html'; // Redirige al panel de control
    } else {
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
});

// Panel de Control
document.addEventListener('DOMContentLoaded', function() {
    function displayTasks(filteredTasks) {
        let taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        filteredTasks.forEach(task => {
            let row = `
                <tr>
                    <td>${task.name}</td>
                    <td>${task.description}</td>
                    <td>${task.dueDate}</td>
                    <td>${task.status}</td>
                </tr>
            `;
            taskList.innerHTML += row;
        });
    }

    function filterTasksHandler() {
        let filterName = document.getElementById('filterName').value.toLowerCase();
        let filterStatus = document.getElementById('filterStatus').value;
        let filterDate = document.getElementById('filterDate').value;

        let filteredTasks = filterTasks({ name: filterName, status: filterStatus, dueDate: filterDate });
        displayTasks(filteredTasks);
    }

    // Mostrar todas las tareas inicialmente
    displayTasks(getTasks());

    // Filtrar tareas cuando los filtros cambian
    document.getElementById('filterName').addEventListener('input', filterTasksHandler);
    document.getElementById('filterStatus').addEventListener('change', filterTasksHandler);
    document.getElementById('filterDate').addEventListener('change', filterTasksHandler);

    // Adición de tarea
    document.getElementById('addTaskButton').addEventListener('click', function() {
        const name = document.getElementById('taskName').value;
        const description = document.getElementById('taskDescription').value;
        const dueDate = document.getElementById('taskDueDate').value;
        const status = document.getElementById('taskStatus').value;

        addTask(name, description, dueDate, status);
        displayTasks(getTasks());
    });

    // Funcionalidad de cerrar sesión
    document.getElementById('logoutButton').addEventListener('click', function() {
        alert('Cerrando sesión...');
        window.location.href = 'login.html';
    });
});
