//TELA INICIAL

function adicionarItem(idProduto, nomeProduto, precoProduto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let item = { id: idProduto, nome: nomeProduto, preco: precoProduto };
    carrinho.push(item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}


function removerItem(idProduto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(item => item.id !== idProduto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}


function atualizarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let containerCarrinho = document.getElementById('itensCarrinho');
    containerCarrinho.innerHTML = '';

    let total = 0;
    carrinho.forEach(item => {
        total += parseFloat(item.preco);
        let divItem = document.createElement('div');
        divItem.innerHTML = `
            <p>${item.nome} - R$ ${item.preco}</p>
            <button onclick="removerItem('${item.id}')">Remover</button>`;
        containerCarrinho.appendChild(divItem);
    });
    let totalCarrinho = document.getElementById('totalCarrinho');
    totalCarrinho.innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

// Chama atualizarCarrinho quando a página é carregada para mostrar os itens existentes
document.addEventListener('DOMContentLoaded', atualizarCarrinho);

// Função para criar um container dinamicamente
function createContainer(id, nome, valor) {
    // Cria um novo elemento div para o container
    const container = document.createElement('div');
    container.classList.add('container'); // Adiciona uma classe para estilização, se necessário

    // Cria o elemento para o ID
    const idElement = document.createElement('div');
    idElement.textContent = `ID: ${id}`;
    container.appendChild(idElement);

    // Cria o elemento para o Nome
    const nomeElement = document.createElement('div');
    nomeElement.textContent = `Nome: ${nome}`;
    container.appendChild(nomeElement);

    // Cria o elemento para o Valor
    const valorElement = document.createElement('div');
    valorElement.textContent = `Valor: ${valor}`;
    container.appendChild(valorElement);

    // Seleciona o elemento com a classe 'carrinho'
    const carrinho = document.querySelector('.carrinho');
    if (carrinho) {
        // Adiciona o container criado ao elemento 'carrinho'
        carrinho.appendChild(container);
    } else {
        console.error("Elemento com a classe 'carrinho' não encontrado.");
    }
}

//---------------------------------------------------------------------------------------
//TELA DO ADM

function adicionarProduto() {
    const imagemProdutoInput = document.getElementById('produto');
    const imagemProduto = imagemProdutoInput.files[0] ? URL.createObjectURL(imagemProdutoInput.files[0]) : '';
    const nomePro = document.getElementById('nomeProduto').value;
    const valorPro = document.getElementById('valorProduto').value;
    const classificacao = document.getElementById('classProduto').value;

    let produtosTodos = JSON.parse(localStorage.getItem('produtosTodos')) || [];
    let item = {
        id: Date.now().toString(),
        imagem: imagemProduto,
        nome: nomePro,
        valor: valorPro,
        classe: classificacao
    };
    produtosTodos.push(item);
    localStorage.setItem('produtosTodos', JSON.stringify(produtosTodos));
    console.log('Produto adicionado:', item);
    atualizarProdutos();

}

function removerProduto(idProduto) {
    let produtosTodos = JSON.parse(localStorage.getItem('produtosTodos')) || [];
    produtosTodos = produtosTodos.filter(item => item.id !== idProduto);
    localStorage.setItem('produtosTodos', JSON.stringify(produtosTodos));
    console.log('Produto removido:', idProduto);
    atualizarProdutos();
}

function atualizarProdutos() {
    let produtosTodos = JSON.parse(localStorage.getItem('produtosTodos')) || [];

    let containerBebidas = document.getElementById('containerProdutosBebidas');
    let containerFrutas = document.getElementById('containerProdutosFrutas');
    let containerSemClasse = document.getElementById('containerProdutosSemClasse');

    containerBebidas.innerHTML = '<h3>Bebidas</h3>';
    containerFrutas.innerHTML = '<h3>Frutas e Vegetais</h3>';
    containerSemClasse.innerHTML = '<h3>Outros</h3>';

    produtosTodos.forEach(item => {
        let divItem = document.createElement('div');
        divItem.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}" width="100">
            <p>Nome: ${item.nome}</p>
            <p>Valor: ${item.valor}</p>
            <button onclick="removerProduto('${item.id}')">Remover</button>
        `;

        if (item.classe === 'Bebidas') {
            containerBebidas.appendChild(divItem);
        } else if (item.classe === 'Frutas e Vegetais') {
            containerFrutas.appendChild(divItem);
        } else {
            containerSemClasse.appendChild(divItem);
        }
    });
}

document.addEventListener('DOMContentLoaded', atualizarProdutos);