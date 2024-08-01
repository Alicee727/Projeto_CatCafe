// script.js

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
            loginLogoutButton.addEventListener('click', playCatSound);
        }
    }

    function deslogar() {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('isLoggedIn');
        window.location.href = './../login/'; // Redireciona para a página de login
    }

    function playCatSound(event) {
        event.preventDefault(); // Para evitar comportamento padrão do link
        const catSound = document.getElementById('cat-sound');
        catSound.currentTime = 0; // Recomeça o som se já estiver tocando
        catSound.play();
        setTimeout(() => {
            window.location = event.target.attributes.href.value
        }, 1000);
    }

    updateLoginLogoutButton();

    const images = ["./../images/sla11.png", "./../images/sla21.png", "./../images/sla31.png", "./../images/sla41.png"];
    let currentImageIndex = 0;

    function changeImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        document.getElementById('feature-img').src = images[currentImageIndex];
    }

    setInterval(changeImage, 2000);

    document.getElementById('explore-button').addEventListener('click', playCatSound);
});
