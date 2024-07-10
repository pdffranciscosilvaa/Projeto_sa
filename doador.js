document.addEventListener('DOMContentLoaded', function() {
    const respostaDiv = document.getElementById('resposta');
    const registrar = document.getElementById('registrar');
    const listar = document.getElementById('listar');
    const buscar = document.getElementById('buscar');
    const deletar = document.getElementById('deletar');

    registrar.addEventListener('click', function() {
        const cpfDoador = document.getElementById('cpfDoador').value
        const cnpjDoador=document.getElementById('cnpjDoador').value
        const enderecoDoador = document.getElementById('enderecoDoador').value
        const emailDoador= document.getElementById('emailDoador').value
        const telefoneDoador = document.getElementById('telefoneDoador').value
        const situacaoDoador = document.getElementById('situacaoDoador').value
        const codFuncionario = document.getElementById('codFuncionario').value
        const nomeDoador = document.getElementById('nomeDoador').value
        const doador = {
            nomeDoador: nomeDoador,
            cpfDoador: cpfDoador,
            cnpjDoador: cnpjDoador,
            enderecoDoador: enderecoDoador,
            emailDoador:emailDoador ,
            telefoneDoador: telefoneDoador,
            situacaoDoador: situacaoDoador,
            codFuncionario: codFuncionario
        };

        fetch('http://localhost:8080/doador', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doador)
        })
        .then(response => response.json())
        .then(data => {
            respostaDiv.innerText = 'Doador cadastrado com sucesso!';
        })
        .catch(error => {
            console.error('Erro ao cadastrar doador:', error);
            respostaDiv.innerText = 'Erro ao cadastrar doador.';
        });
    });

    listar.addEventListener('click', function() {
        fetch('http://localhost:8080/doador')
        .then(response => response.json())
        .then(data => {
            respostaDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        })
        .catch(error => {
            console.error('Erro ao listar doadores:', error);
            respostaDiv.innerText = 'Erro ao listar doadores.';
        });
    });

    buscar.addEventListener('click', function() {
        const id = prompt('Digite o ID do doador:');
        if (id) {
            fetch(`http://localhost:8080/doador/${id}`)
            .then(response => response.json())
            .then(data => {
                respostaDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            })
            .catch(error => {
                console.error('Erro ao buscar doador:', error);
                respostaDiv.innerText = 'Erro ao buscar doador.';
            });
        }
    });

    deletar.addEventListener('click', function() {
        const id = prompt('Digite o ID do doador:');
        if (id) {
            fetch(`http://localhost:8080/doador/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                respostaDiv.innerText = 'Doador deletado com sucesso!';
            })
            .catch(error => {
                console.error('Erro ao deletar doador:', error);
                respostaDiv.innerText = 'Erro ao deletar doador.';
            });
        }
    });
});
