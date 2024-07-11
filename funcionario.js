document.addEventListener('DOMContentLoaded', () => {
    const resposta = document.getElementById('resposta');
    const registrar = document.getElementById('registrar');
    const listar = document.getElementById('listar');
    const buscar = document.getElementById('buscar');
    const deletar = document.getElementById('deletar');

    registrar.addEventListener('click', () => {
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const cargo = document.getElementById('cargo').value;
        const situacao = document.getElementById('situacao').value;

        const dados = {
            nomeFuncionario: nome,
            cpfFuncionario: cpf,
            telefoneFuncionario: telefone,
            cargoFuncionario: cargo,
            situacaoFuncionario: situacao
        };

        fetch('http://localhost:8080/funcionario', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
            .then(response => response.json())
            .then(data => {
                resposta.innerHTML = `
                    Código Funcionário: ${data.codFuncionario}<br>
                    Nome Funcionário: ${data.nomeFuncionario}<br>
                    Cargo Funcionário: ${data.cargoFuncionario}<br>
                    CPF Funcionário: ${data.cpfFuncionario}<br>
                    Telefone Funcionário: ${data.telefoneFuncionario}<br>
                    Situação Funcionário: ${data.situacaoFuncionario}<br>
                `;
            })
            .catch(err => {
                console.error("Erro de conexão com o sistema!", err);
                resposta.innerHTML = "Erro ao registrar funcionário.";
            });
    });

    listar.addEventListener('click', () => {
        fetch('http://localhost:8080/funcionario')
            .then(response => response.json())
            .then(data => {
                let funcionariosHTML = '<h2>Lista de Funcionários</h2>';
                data.forEach(funcionario => {
                    funcionariosHTML += `
                        <div>
                            Código Funcionário: ${funcionario.codFuncionario}<br>
                            Nome Funcionário: ${funcionario.nomeFuncionario}<br>
                            Cargo Funcionário: ${funcionario.cargoFuncionario}<br>
                            CPF Funcionário: ${funcionario.cpfFuncionario}<br>
                            Telefone Funcionário: ${funcionario.telefoneFuncionario}<br>
                            Situação Funcionário: ${funcionario.situacaoFuncionario}<br>
                            <hr>
                        </div>
                    `;
                });
                resposta.innerHTML = funcionariosHTML;
            })
            .catch(err => {
                console.error("Erro de conexão com o sistema!", err);
                resposta.innerHTML = "Erro ao listar funcionários.";
            });
    });

    buscar.addEventListener('click', () => {
        const id = prompt("Digite o ID do funcionário:");
        fetch(`http://localhost:8080/funcionario/${id}`)
            .then(response => response.json())
            .then(data => {
                resposta.innerHTML = `
                    Código Funcionário: ${data.codFuncionario}<br>
                    Nome Funcionário: ${data.nomeFuncionario}<br>
                    Cargo Funcionário: ${data.cargoFuncionario}<br>
                    CPF Funcionário: ${data.cpfFuncionario}<br>
                    Telefone Funcionário: ${data.telefoneFuncionario}<br>
                    Situação Funcionário: ${data.situacaoFuncionario}<br>
                `;
            })
            .catch(err => {
                console.error("Erro de conexão com o sistema!", err);
                resposta.innerHTML = "Erro ao buscar funcionário.";
            });
    });

    deletar.addEventListener('click', () => {
        const id = prompt("Digite o ID do funcionário:");
        fetch(`http://localhost:8080/funcionario/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                resposta.innerHTML = "Funcionário deletado com sucesso.";
            })
            .catch(err => {
                console.error("Erro de conexão com o sistema!", err);
                resposta.innerHTML = "Erro ao deletar funcionário.";
            });
    });
});
