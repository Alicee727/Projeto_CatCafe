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

exibirProdutos(ProdutosDB.getProdutos())