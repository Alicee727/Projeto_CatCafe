class Animal {
    constructor(nome, idade, sexo, info_Adicionais) {
        this.nome = nome;
        this.idade = idade;
        this.sexo = sexo;
        this.info_Adicionais = info_Adicionais;
    }

    getNome() {
        return this.nome;
    }
    setNome(novoNome) {
        this.nome = novoNome;
    }

    getIdade() {
        return this.idade;
    }
    setIdade(novoIdade) {
        this.idade = novoIdade;
    }

    getSexo() {
        return this.sexo;
    }
    setSexo(novoSexo) {
        this.sexo = novoSexo;
    }

    getinfo_Adicionais() {
        return this.info_Adicionais;
    }

    setinfo_Adicionais(novoinfo_Adicionais) {
        this.info_Adicionais = novoinfo_Adicionais;
    }

    getAnimal() {
        return {
            nome: this.nome,
            idade: this.idade,
            sexo: this.sexo,
            info_Adicionais: this.info_Adicionais
        }
    }

    mostrarDetalhes() {
        return `Nome: ${this.nome}\n Idade: ${this.idade}\n Sexo: ${this.sexo}\n Informações adicionais: ${this.info_Adicionais}`;
    }
}

const formAnimal = document.getElementById('formAnimal');
//Funcionalidade capaz de cadastrar Animais
formProduto.onsubmit = function cadastrarAnimal(event) {
    event.preventDefault(); // Impede o envio do formulário e mudança de página
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const sexo = document.getElementById('sexo').value;
    const info_adicionais = document.getElementById('info_adicionais').value;

    const animal = new Animal(nome, idade, sexo, info_adicionais); // Cria um novo animal
    adicionarAnimalnaLista(animal); // Adiciona o animal à lista
    document.getElementById('nome').value = " ";
    document.getElementById('idade').value = " ";
    document.getElementById('sexo').value = " ";
    document.getElementById('info_adicionais').value = " ";

    return false;
}

function adicionarAnimalnaLista(animal) {
    let animais = localStorage.getItem("animais")
    if (!animais) animais = []
    else animais = JSON.parse(animais)
    localStorage.setItem(
        "animais", JSON.stringify([...animais, animal])
    )

    // Criando um novo elemento de lista no HTML
    const li = document.createElement('li');
    // Definindo o conteúdo do elemento de lista com o nome, idade e informações adicionais
    li.innerHTML = `${animal.getNome()} ${animal.getIdade()} ${animal.getinfo_Adicionais()}`;
    // Adicionando o elemento de lista à lista de animais no HTML
    listaAnimais.appendChild(li);
}

function getAnimais() {
    let animais = localStorage.getItem("animais")
    if (!animais) return []
    else return JSON.parse(animais)
}