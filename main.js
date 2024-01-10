const disciplinaForm = document.getElementById('disciplinaForm');
const listaDisciplinas = document.getElementById('listaDisciplinas');
const IRAValue = document.getElementById('ira-value')
let disciplinas = [];

function carregarDisciplinas() {
    const storedDisciplinas = localStorage.getItem('disciplinas');
    disciplinas = storedDisciplinas ? JSON.parse(storedDisciplinas) : [];
    atualizarListaDisciplinas();
    calcularIRA();
}

function salvarDisciplinas() {
    localStorage.setItem('disciplinas', JSON.stringify(disciplinas));
}

function adicionarDisciplina() {
    const nome = document.getElementById('nome').value;
    const cargaHoraria = document.getElementById('cargaHoraria').value;
    const media = document.getElementById('media').value;

    const novaDisciplina = {
        nome,
        cargaHoraria,
        media
    };

    disciplinas.push(novaDisciplina);
    salvarDisciplinas();
    atualizarListaDisciplinas();
    calcularIRA();

    disciplinaForm.reset();
}

function atualizarListaDisciplinas() {
    listaDisciplinas.innerHTML = '';

    disciplinas.forEach((disciplina, index) => {
        const disciplinaDiv = document.createElement('div');
        disciplinaDiv.innerHTML = `<p><strong>${disciplina.nome}</strong> - Carga Horária: ${disciplina.cargaHoraria} aulas, Média: ${disciplina.media}</p>
            <div>
            <button onclick="editarDisciplina(${index})">Editar</button>
            <button onclick="excluirDisciplina(${index})">Excluir</button>
            </div>`;
        disciplinaDiv.classList.add('disciplinaDiv')
        listaDisciplinas.appendChild(disciplinaDiv);
    });
}

function editarDisciplina(index) {
    const disciplinaParaEditar = disciplinas[index];
    const novoNome = prompt('Novo nome:', disciplinaParaEditar.nome);
    const novaCargaHoraria = prompt('Nova carga horária:', disciplinaParaEditar.cargaHoraria);
    const novaMedia = prompt('Nova média:', disciplinaParaEditar.media);

    disciplinaParaEditar.nome = novoNome;
    disciplinaParaEditar.cargaHoraria = novaCargaHoraria;
    disciplinaParaEditar.media = novaMedia;

    salvarDisciplinas();
    atualizarListaDisciplinas();
    calcularIRA();
}

function excluirDisciplina(index) {
    disciplinas.splice(index, 1);
    salvarDisciplinas();
    atualizarListaDisciplinas();
    calcularIRA();
}

function calcularIRA() {
    let IRA = 0.0;
    let numerador = 0.0;
    let denominador = 0.0;

    for (let disciplina of disciplinas) {
        if (!isNaN(parseFloat(disciplina.cargaHoraria)) && !isNaN(parseFloat(disciplina.media))) {
            numerador += parseFloat(disciplina.cargaHoraria) * parseFloat(disciplina.media);
            denominador += parseFloat(disciplina.cargaHoraria);
        }
    }

    IRA = (denominador !== 0) ? (numerador / denominador).toFixed(2) : 0.0;

    if (!isNaN(IRA)) {
        IRAValue.innerHTML = `${IRA}`;
    }
}



carregarDisciplinas();
