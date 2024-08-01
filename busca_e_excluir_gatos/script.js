document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('campoBusca');
    const botaoBusca = document.getElementById('botaoBusca');
    const listaGatos = document.getElementById('listaGatos');
    let animais = JSON.parse(localStorage.getItem('animais')) || [];

    const renderizarGatos = (gatosFiltrados) => {
        listaGatos.innerHTML = gatosFiltrados.map((gato, indice) => `
            <li>
                <strong>${gato.nome}</strong> - ${gato.idade} anos<br>
                ${gato.info}<br>
                <button onclick="excluirGato(${indice})">Excluir</button>
            </li>
        `).join('');
    };

    botaoBusca.addEventListener('click', () => {
        const termoBusca = campoBusca.value.toLowerCase();
        const gatosFiltrados = animais.filter(gato => gato.nome.toLowerCase().includes(termoBusca));
        renderizarGatos(gatosFiltrados);
    });

    window.excluirGato = (indice) => {
        animais.splice(indice, 1);
        localStorage.setItem('animais', JSON.stringify(animais));
        renderizarGatos(animais);
    };

    renderizarGatos(animais);
});
