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
            let produtosHTML = '<h2>Lista de Produtos</h2>';
            data.forEach(produto => {
                produtosHTML += `
                    <div>
                        Nome do Produto: ${produto.nomeProduto}<br>
                        Descrição do Produto: ${produto.descricaoProduto}<br>
                        Valor do Produto: ${produto.valorProduto}<br>
                        Quantidade do Produto: ${produto.quantidadeProduto}<br>
                        Validade do Produto: ${produto.validadeProduto}<br>
                        ID do Doador: ${produto.doadorId}<br>
                        ID do Fabricante: ${produto.fabricanteId}<br>
                        ID do Funcionário: ${produto.funcionarioId}<br>
                        <hr>
                    </div>
                `;
            });
            respostaDiv.innerHTML = produtosHTML;
        })
        .catch(error => {
            console.error('Erro ao listar produtos:', error);
            respostaDiv.innerText = 'Erro ao listar produtos.';
        });
    });
});
