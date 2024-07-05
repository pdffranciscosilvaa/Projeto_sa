let listarEstoque = document.getElementById('listarEstoque')
listarEstoque.addEventListener('click', () => {
    fetch('http://localhost:8080/estoque')
    .then(response => response.json())
    .then(data => {
        const listaEstoque = document.getElementById('listaEstoque');
        listaEstoque.innerHTML = '';
        data.forEach(estoque => {
            listaEstoque.innerHTML += `ID do Estoque: ${estoque.codEstoque}, Nome do Produto: ${estoque.nomeProduto}, Quantidade do Produto: ${estoque.quantidadeProduto}, Código do Produto: ${estoque.codProduto}<br>`;
        });
    })
    .catch((error) => {
        console.error('Erro:', error);
        document.getElementById('listaEstoque').innerHTML = 'Erro ao listar o estoque.';
    });
});


