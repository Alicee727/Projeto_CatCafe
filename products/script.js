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
        }
    }

    function deslogar() {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('isLoggedIn');
        window.location.href = './../login/'; // Redireciona para a página de login
    }

    // Redireciona para a página de login se não estiver logado
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = './../login/';
    }

    updateLoginLogoutButton();
});

function getProdutos() {
    let produtos = localStorage.getItem("produtos")
    if (!produtos) return []
    else return JSON.parse(produtos)
}

function exibirProdutos(produtos) {
    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        Object.keys(produto).forEach(valor => {
            const td = document.createElement('td')
            td.innerText = produto[valor]
            tr.appendChild(td)
        })
        document.getElementById('cardapio').appendChild(tr)
    })
}

function buscarProduto(nome, produtos) {
    return produtos.filter(produto => produto.nome.toLowerCase().includes(nome.toLowerCase()))
}

function buscarProdutoPorCategoria(nome, produtos) {
    return produtos.filter(produto => produto.categoria.toLowerCase().includes(nome.toLowerCase()))
}


exibirProdutos(getProdutos())