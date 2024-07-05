document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroProdutoForm');
    const respostaDiv = document.getElementById('respostaProduto');
    const registrar = document.getElementById('registrarProduto');
    const listar = document.getElementById('listarProdutos');

    registrar.addEventListener('click', function() {
        const produto = {
            nomeProduto: document.getElementById('nomeProduto').value,
            descricaoProduto: document.getElementById('descricaoProduto').value,
            valorProduto: document.getElementById('valorProduto').value,
            quantidadeProduto: document.getElementById('quantidadeProduto').value,
            validadeProduto: document.getElementById('validadeProduto').value,
            doadorId: document.getElementById('doadorId').value,
            fabricanteId: document.getElementById('fabricanteId').value,
            funcionarioId: document.getElementById('funcionarioId').value
        };

        fetch('http://localhost:8080/produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
        .then(response => response.json())
        .then(data => {
            respostaDiv.innerText = 'Produto cadastrado com sucesso!';
        })
        .catch(error => {
            console.error('Erro ao cadastrar produto:', error);
            respostaDiv.innerText = 'Erro ao cadastrar produto.';
        });
    });

    listar.addEventListener('click', function() {
        fetch('http://localhost:8080/produto')
        .then(response => response.json())
        .then(data => {
            respostaDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        })
        .catch(error => {
            console.error('Erro ao listar produtos:', error);
            respostaDiv.innerText = 'Erro ao listar produtos.';
        });
    });
});
