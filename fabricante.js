    document.addEventListener('DOMContentLoaded', () => {
    let resposta = document.getElementById('resposta');
    let registrar = document.getElementById('registrar');
    let listar = document.getElementById('listar');
    let buscar = document.getElementById('buscar');
    let deletar = document.getElementById('deletar');

    registrar.addEventListener('click', () => {
        const nomeFabricante = document.getElementById('nomeFabricante').value;
        const codFuncionario = document.getElementById('codFuncionario').value;

        const dados = {
            nomeFabricante: nomeFabricante,
            codFuncionario: codFuncionario
        };

        fetch('http://localhost:8080/fabricante', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
        .then(response => response.json())
        .then(data => {
            resposta.innerHTML = "Fabricante cadastrado com sucesso!<br>";
            resposta.innerHTML += "Código Fabricante: " + data.codFabricante + "<br>";
            resposta.innerHTML += "Nome Fabricante: " + data.nomeFabricante + "<br>";
            resposta.innerHTML += "Código Funcionário: " + data.codFuncionario + "<br>";
        })
        .catch(error => {
            console.error("Erro de conexão com o sistema!", error);
            resposta.innerHTML = "Erro ao cadastrar fabricante.";
        });
    });

    listar.addEventListener('click', () => {
        fetch('http://localhost:8080/fabricante')
        .then(response => response.json())
        .then(data => {
            resposta.innerHTML = "Lista de Fabricantes:<br>";
            data.forEach(fabricante => {
                resposta.innerHTML += "Código Fabricante: " + fabricante.codFabricante + "<br>";
                resposta.innerHTML += "Nome Fabricante: " + fabricante.nomeFabricante + "<br>";
                resposta.innerHTML += "Código Funcionário: " + fabricante.codFuncionario + "<br>";
                resposta.innerHTML += "<hr>";
            });
        })
        .catch(error => {
            console.error("Erro de conexão com o sistema!", error);
            resposta.innerHTML = "Erro ao listar fabricantes.";
        });
    });

    buscar.addEventListener('click', () => {
        const id = prompt("Digite o ID do fabricante:");
        fetch(`http://localhost:8080/fabricante/${id}`)
        .then(response => response.json())
        .then(data => {
            resposta.innerHTML = "Detalhes do Fabricante:<br>";
            resposta.innerHTML += "Código Fabricante: " + data.codFabricante + "<br>";
            resposta.innerHTML += "Nome Fabricante: " + data.nomeFabricante + "<br>";
            resposta.innerHTML += "Código Funcionário: " + data.codFuncionario + "<br>";
        })
        .catch(error => {
            console.error("Erro de conexão com o sistema!", error);
            resposta.innerHTML = "Erro ao buscar fabricante.";
        });
    });

    deletar.addEventListener('click', () => {
        const id = prompt("Digite o ID do fabricante a ser deletado:");
        fetch(`http://localhost:8080/fabricante/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            resposta.innerHTML = "Fabricante deletado com sucesso!";
        })
        .catch(error => {
            console.error("Erro de conexão com o sistema!", error);
            resposta.innerHTML = "Erro ao deletar fabricante.";
        });
    });
});
