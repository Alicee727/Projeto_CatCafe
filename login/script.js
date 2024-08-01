// script.js para página de login

document.addEventListener("DOMContentLoaded", function () {
    const user = document.getElementById("username");
    const password = document.getElementById("password");

    document.querySelector('.login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário

        // Aqui você adicionaria a lógica de autenticação real
        const username = user.value;
        const passwordValue = password.value;

        if (username === 'user' && passwordValue === 'password') { // Exemplo de verificação simples
            localStorage.setItem('username', username);
            localStorage.setItem('password', passwordValue);
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = './../'; // Redireciona para a página inicial após o login
        } else {
            alert('Invalid credentials, please try again.');
        }
    });
});
