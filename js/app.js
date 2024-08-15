document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let department = document.getElementById('department').value;

    if (!name || !email || !password || !department) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Si todo está bien, almacenamos los datos en localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password, department });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuario registrado exitosamente!');

    window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
});


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert('Inicio de sesión exitoso');
        window.location.href = 'dashboard.html'; // Redirige al panel de control
    } else {
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Simulamos tareas almacenadas en localStorage
    let tasks = [
        { name: "Tarea 1", description: "Descripción 1", dueDate: "2024-08-20", status: "pendiente" },
        { name: "Tarea 2", description: "Descripción 2", dueDate: "2024-08-21", status: "completada" },
        { name: "Tarea 3", description: "Descripción 3", dueDate: "2024-08-22", status: "pendiente" }
    ];

    // Almacenamos las tareas en localStorage si no existen
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

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

    function filterTasks() {
        let filterName = document.getElementById('filterName').value.toLowerCase();
        let filterStatus = document.getElementById('filterStatus').value;
        let filterDate = document.getElementById('filterDate').value;

        let filteredTasks = tasks.filter(task => {
            let matchesName = task.name.toLowerCase().includes(filterName);
            let matchesStatus = filterStatus === '' || task.status === filterStatus;
            let matchesDate = filterDate === '' || task.dueDate === filterDate;

            return matchesName && matchesStatus && matchesDate;
        });

        displayTasks(filteredTasks);
    }

    // Mostrar todas las tareas inicialmente
    displayTasks(tasks);

    // Filtrar tareas cuando los filtros cambian
    document.getElementById('filterName').addEventListener('input', filterTasks);
    document.getElementById('filterStatus').addEventListener('change', filterTasks);
    document.getElementById('filterDate').addEventListener('change', filterTasks);

    // Funcionalidad de cerrar sesión
    document.getElementById('logoutButton').addEventListener('click', function() {
        alert('Cerrando sesión...');
        window.location.href = 'login.html';
    });
});
