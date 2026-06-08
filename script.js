let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

const form = document.getElementById("formAluno");
const tabela = document.getElementById("tabelaAlunos");
const pesquisa = document.getElementById("pesquisaAluno");

let editando = -1;

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);

    const media = ((nota1 + nota2) / 2).toFixed(2);

    const status = media >= 6 ? "APROVADO" : "REPROVADO";

    const aluno = {
        id,
        nome,
        nota1,
        nota2,
        media,
        status
    };

    if (editando === -1) {
        alunos.push(aluno);
    } else {
        alunos[editando] = aluno;
        editando = -1;
    }

    localStorage.setItem("alunos", JSON.stringify(alunos));

    carregarTabela();

    form.reset();
});

function carregarTabela(filtro = "") {

    tabela.innerHTML = "";

    const alunosFiltrados = alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    alunosFiltrados.forEach((aluno, index) => {

        tabela.innerHTML += `
        <tr>
            <td>${aluno.id}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.nota1}</td>
            <td>${aluno.nota2}</td>
            <td>${aluno.media}</td>
            <td class="${aluno.status === "APROVADO" ? "aprovado" : "reprovado"}">
                ${aluno.status}
            </td>
            <td>
                <button onclick="editarAluno(${index})">
                    ✏️
                </button>

                <button onclick="excluirAluno(${index})">
                    🗑️
                </button>
            </td>
        </tr>
        `;
    });
}

function editarAluno(index) {

    const aluno = alunos[index];

    document.getElementById("id").value = aluno.id;
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("nota1").value = aluno.nota1;
    document.getElementById("nota2").value = aluno.nota2;

    editando = index;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function excluirAluno(index) {

    const confirmar = confirm(
        "Deseja realmente excluir este aluno?"
    );

    if (!confirmar) return;

    alunos.splice(index, 1);

    localStorage.setItem(
        "alunos",
        JSON.stringify(alunos)
    );

    carregarTabela();
}

if (pesquisa) {
    pesquisa.addEventListener("keyup", function() {
        carregarTabela(this.value);
    });
}

carregarTabela();