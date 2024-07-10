
document.addEventListener('DOMContentLoaded', function () {
    const baseURL = 'http://localhost:8080'; 
    
    const registrarEntrega = document.getElementById('registrarEntrega')
    registrarEntrega.addEventListener('click', function () {
        const dataEntrega = document.getElementById('dataEntrega').value;
        const nomeProdutoEntrega = document.getElementById('nomeProdutoEntrega').value;
        const responsavelEntrega = document.getElementById('responsavelEntrega').value;
        const quantidadeEntrega = document.getElementById('quantidadeEntrega').value;
        const funcionarioId = document.getElementById('funcionarioId').value;
        const estoqueId = document.getElementById('estoqueId').value;
        
        const novaEntrega = {
            dataEntrega: dataEntrega,
            nomeProdutoEntrega: nomeProdutoEntrega,
            responsavelEntrega: responsavelEntrega,
            quantidadeEntrega: quantidadeEntrega,
            funcionarioId: funcionarioId,
            estoqueId: estoqueId
        };
        
        fetch('http://localhost:8080/entrega', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaEntrega)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Registro de entrega realizado:', data);
            document.getElementById('resposta').innerHTML = 'Entrega registrada com sucesso!';
        })
        .catch(error => {
            console.error('Erro ao registrar entrega:', error);
            document.getElementById('resposta').innerHTML = 'Erro ao registrar entrega. Verifique o console para mais detalhes.';
        });
    });
    
    const listarEntregas = document.getElementById('listarEntregas')
    listarEntregas.addEventListener('click', function () {
        fetch(`${baseURL}/entrega`)
        .then(response => response.json())
        .then(data => {
            console.log('Lista de entregas:', data);
            let entregaListHTML = '<h3>Lista de Entregas:</h3><ul>';
            data.forEach(entrega => {
                entregaListHTML += `<li>Código: ${entrega.codEntrega}, Produto: ${entrega.nomeProdutoEntrega}</li>`;
            });
            entregaListHTML += '</ul>';
            document.getElementById('resposta').innerHTML = entregaListHTML;
        })
        .catch(error => {
            console.error('Erro ao listar entregas:', error);
            document.getElementById('resposta').innerHTML = 'Erro ao listar entregas. Verifique o console para mais detalhes.';
        });
    });
    
    const buscarEntrega = document.getElementById('buscarEntrega')
    buscarEntrega.addEventListener('click', function () {
        const codEntrega = prompt('Digite o código da entrega:');
        if (codEntrega) {
            fetch(`${baseURL}/entrega/${codEntrega}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Entrega não encontrada.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Entrega encontrada:', data);
                document.getElementById('resposta').innerHTML = `Entrega encontrada:<br>Código: ${data.codEntrega}, Produto: ${data.nomeProdutoEntrega}`;
            })
            .catch(error => {
                console.error('Erro ao buscar entrega:', error);
                document.getElementById('resposta').innerHTML = 'Erro ao buscar entrega. Verifique o console para mais detalhes.';
            });
        }
    });
});
