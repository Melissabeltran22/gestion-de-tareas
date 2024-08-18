// Función para obtener todos los usuarios almacenados en localStorage
export function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Función para guardar todos los usuarios en localStorage
export function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Función para agregar un nuevo usuario
export function addUser(name, email, password, department) {
    let users = getUsers();
    users.push({ name, email, password, department });
    saveUsers(users);
}

// Función para obtener un usuario por email y contraseña
export function getUserByCredentials(email, password) {
    let users = getUsers();
    return users.find(user => user.email === email && user.password === password);
}

// Función para validar un correo electrónico
export function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar una contraseña
export function isPasswordValid(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/;
    return passwordRegex.test(password);
}

// Función para validar un nombre
export function isNameValid(name) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
}
