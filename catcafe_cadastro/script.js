class Produto {
    /** 
     * @param {number} id
     * @param {string} nome
     * @param {number} preco
     * @param {number} quantidade_porcao
     * @param {string} categoria
     * @param {string} ingredientes
     * @param {string} avisos
    */
    constructor(id, nome, preco, quantidade_porcao, categoria, ingredientes, avisos) {
        this.id = id
        this.nome = nome;
        this.preco = preco;
        this.quantidade_porcao = quantidade_porcao;
        this.categoria = categoria;
        this.ingredientes = ingredientes;
        this.avisos = avisos;
    }

    getId() {
        return this.id
    }

    setId(id) {
        this.id = id
    }

    getNome() {
        return this.nome;
    }

    setNome(novoNome) {
        this.nome = novoNome;
    }

    getPreco() {
        return this.preco;
    }
    setPreco(novoPreco) {
        this.preco = novoPreco;
    }

    getQuantidade_porcao() {
        return this.quantidade_porcao;
    }
    setQuantidade_porcao(novaQuantidade_porcao) {
        this.quantidade_porcao = novaQuantidade_porcao;
    }

    getCategoria() {
        return this.categoria;
    }
    setCategoria(novaCategoria) {
        this.categoria = novaCategoria;
    }

    getIngredientes() {
        return this.ingredientes;
    }
    setIngredientes(novoIngrediente) {
        this.ingredientes = novoIngrediente;
    }

    getAvisos() {
        return this.avisos;
    }
    setAvisos(novoAviso) {
        this.avisos = novoAviso;
    }

    mostrarDetalhes() {
        return `Nome: ${this.nome}\n Preço: R$ ${this.preco}\n Quantidade por porção: ${this.quantidade_porcao}\n Ingredientes: ${this.ingredientes}\n Avisos: ${this.avisos}`;
    }
}
class ProdutosDB {
    /**
     * @returns {Produto[]}
     */
    static getProdutos() {
        let produtos = localStorage.getItem("produtos")
        if (!produtos) return []
        else return JSON.parse(produtos).items.map(produto => new Produto(produto.id, produto.nome, produto.preco, produto.quantidade_porcao, produto.categoria, produto.ingredientes, produto.avisos));
    }
    /** 
     * @param {number} id
    */
    static getProdutoById(id) {
        return this.getProdutos().find(produto => produto.getId() == id)
    }
    /** 
     * @param {Produto} produto
    */
    static addProduto(produto) {
        let produtos = localStorage.getItem("produtos")
        produtos = produtos ? JSON.parse(produtos) : { counter: 0, items: [] }
        produto.setId(produtos.counter)
        produtos.items.push(produto)
        produtos.counter += 1
        localStorage.setItem(
            "produtos", JSON.stringify(produtos)
        )
        return new Produto(produto.id, produto.nome, produto.preco, produto.quantidade_porcao, produto.categoria, produto.ingredientes, produto.avisos)
    }
    /** 
     * @param {Produto} produtoEditado
    */
    static editProduto(produtoEditado) {
        let produtos = localStorage.getItem("produtos")
        produtos = produtos ? JSON.parse(produtos) : { counter: 0, items: [] }
        const foundIndex = produtos.items.findIndex(produto => produto.id == produtoEditado.id);
        produtos.items[foundIndex] = produtoEditado;
        localStorage.setItem(
            "produtos", JSON.stringify(produtos)
        )
        return new Produto(produtoEditado.id, produtoEditado.nome, produtoEditado.preco, produtoEditado.quantidade_porcao, produtoEditado.categoria, produtoEditado.ingredientes, produtoEditado.avisos)
    }
    static deleteProduto(id) {
        let produtos = localStorage.getItem("produtos")
        produtos = produtos ? JSON.parse(produtos) : { counter: 0, items: [] }
        if (produtos.items.findIndex((produto) => produto.id == id) == -1) return false;
        produtos.items = produtos.items.filter(produto => produto.id != id)
        localStorage.setItem(
            "produtos", JSON.stringify(produtos)
        )
        return true
    }

}
const produtoSelect = document.getElementById("idinput")
const listaProdutos = document.getElementById("produtos")
const idInput = document.getElementById('idinput');
const nomeInput = document.getElementById('nome');
const precoInput = document.getElementById('preco');
const quantidade_porcaoInput = document.getElementById('quantidade');
const categoriaInput = document.getElementById('categoria');
const ingredientesInput = document.getElementById('ingredientes');
const avisosInput = document.getElementById('avisos');
/**  
 * atualiza a lista de produtos e o select de produtos
*/
function updateProdutos() {
    listaProdutos.innerHTML = ""
    produtoSelect.innerHTML = '<option value="-1">Novo produto</option>'
    ProdutosDB.getProdutos().forEach(produto => {
        const option = document.createElement('option')
        option.value = produto.id
        option.innerText = produto.nome
        produtoSelect.appendChild(option)

        const li = document.createElement('li');
        // Definindo o conteúdo do elemento de lista com o título e autor do livro
        li.innerHTML = `${produto.getNome()} ${produto.getPreco()} ${produto.getQuantidade_porcao()} ${produto.getCategoria()} ${produto.getIngredientes()} ${produto.getAvisos()}`;
        // Adicionando o elemento de lista à lista de livros no HTML
        listaProdutos.appendChild(li);
    })
}

updateProdutos()

function selecionarProduto(event) {
    const produto = ProdutosDB.getProdutoById(event.target.value)
    nomeInput.value = produto ? produto.getNome() : "";
    precoInput.value = produto ? produto.getPreco() : "";
    quantidade_porcaoInput.value = produto ? produto.getQuantidade_porcao() : "";
    categoriaInput.value = produto ? produto.getCategoria() : "";
    ingredientesInput.value = produto ? produto.getIngredientes() : "";
    avisosInput.value = produto ? produto.getAvisos() : "";
}


produtoSelect.addEventListener('change', selecionarProduto)



const formProduto = document.getElementById('formProduto');
//Funcionalidade capaz de cadastrar Produtos
formProduto.onsubmit = function cadastrarProduto(event) {
    event.preventDefault(); // Impede o envio do formulário e mudança de página

    const produto = new Produto(parseInt(idInput.value), nomeInput.value, parseFloat(precoInput.value), parseInt(quantidade_porcaoInput.value), categoriaInput.value, ingredientesInput.value, avisosInput.value)
    if (produto.id == -1)
        ProdutosDB.addProduto(produto)
    else
        ProdutosDB.editProduto(produto)
    updateProdutos();

    idInput.value = "-1"
    nomeInput.value = "";
    precoInput.value = "";
    quantidade_porcaoInput.value = "";
    categoriaInput.value = "";
    ingredientesInput.value = "";
    avisosInput.value = "";
}
