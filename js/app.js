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
