document.addEventListener("DOMContentLoaded", function () {
    const loginLogoutButton = document.getElementById('login-logout-button');

    function updateLoginLogoutButton() {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            loginLogoutButton.textContent = 'Log out';
            loginLogoutButton.href = '#'; // Prevent redirect on logout click
            loginLogoutButton.addEventListener('click', function (event) {
                event.preventDefault();
                deslogar();
            });
        } else {
            loginLogoutButton.textContent = 'Log in';
            loginLogoutButton.href = './../login/';
        }
    }

    function deslogar() {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('isLoggedIn');
        window.location.href = './../login/'; // Redireciona para a página de login
    }

    updateLoginLogoutButton();
});
