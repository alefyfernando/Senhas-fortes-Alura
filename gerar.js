// =====================================================
// PASSWORD SHIELD
// Gerador de Senhas
// Parte 1
// =====================================================

// ---------- Elementos ----------

const campoSenha = document.getElementById("campoSenha");

const botaoGerar = document.getElementById("gerar");
const botaoCopiar = document.getElementById("copiar");

const botaoMais = document.getElementById("mais");
const botaoMenos = document.getElementById("menos");

const mostrarSenha = document.getElementById("mostrarSenha");

const valorTamanho = document.getElementById("valorTamanho");

const barra = document.getElementById("forca");
const textoForca = document.getElementById("textoForca");

const chkMaiusculas = document.getElementById("maiusculas");
const chkMinusculas = document.getElementById("minusculas");
const chkNumeros = document.getElementById("numeros");
const chkSimbolos = document.getElementById("simbolos");

// ---------- Caracteres ----------

const LETRAS_MAIUSCULAS =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const LETRAS_MINUSCULAS =
"abcdefghijklmnopqrstuvwxyz";

const NUMEROS =
"0123456789";

const SIMBOLOS =
"!@#$%&*()-_=+[]{}<>?/";

// ---------- Configuração ----------

let tamanhoSenha = 16;

valorTamanho.textContent = tamanhoSenha;

// =====================================================
// BOTÕES DE TAMANHO
// =====================================================

botaoMais.onclick = () => {

    if(tamanhoSenha < 40){

        tamanhoSenha++;

        valorTamanho.textContent = tamanhoSenha;

    }

};

botaoMenos.onclick = () => {

    if(tamanhoSenha > 4){

        tamanhoSenha--;

        valorTamanho.textContent = tamanhoSenha;

    }

};

// =====================================================
// MOSTRAR / ESCONDER SENHA
// =====================================================

mostrarSenha.onclick = () => {

    if(campoSenha.type === "password"){

        campoSenha.type = "text";

        mostrarSenha.textContent = "🙈";

        mostrarSenha.title = "Ocultar senha";

    }

    else{

        campoSenha.type = "password";

        mostrarSenha.textContent = "👁";

        mostrarSenha.title = "Mostrar senha";

    }

};

// =====================================================
// EVENTOS
// =====================================================

botaoGerar.onclick = gerarSenha;

botaoCopiar.onclick = copiarSenha;
// =====================================================
// GERAR SENHA
// =====================================================

function gerarSenha() {

    let caracteres = "";

    let senha = "";

    const grupos = [];

    if (chkMaiusculas.checked) {

        caracteres += LETRAS_MAIUSCULAS;
        grupos.push(LETRAS_MAIUSCULAS);

    }

    if (chkMinusculas.checked) {

        caracteres += LETRAS_MINUSCULAS;
        grupos.push(LETRAS_MINUSCULAS);

    }

    if (chkNumeros.checked) {

        caracteres += NUMEROS;
        grupos.push(NUMEROS);

    }

    if (chkSimbolos.checked) {

        caracteres += SIMBOLOS;
        grupos.push(SIMBOLOS);

    }

    if (grupos.length === 0) {

        alert("Selecione pelo menos um tipo de caractere.");

        return;

    }

    // Garante pelo menos um caractere de cada grupo

    grupos.forEach(grupo => {

        const indice = Math.floor(Math.random() * grupo.length);

        senha += grupo[indice];

    });

    // Completa a senha

    while (senha.length < tamanhoSenha) {

        const indice = Math.floor(Math.random() * caracteres.length);

        senha += caracteres[indice];

    }

    // Embaralha os caracteres

    senha = senha
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    campoSenha.value = senha;

    analisarSenha(senha);

}
// =====================================================
// COPIAR SENHA
// =====================================================

function copiarSenha() {

    if (campoSenha.value === "") return;

    navigator.clipboard.writeText(campoSenha.value);

    botaoCopiar.textContent = "✅ Senha copiada!";

    botaoCopiar.disabled = true;

    setTimeout(() => {

        botaoCopiar.textContent = "📋 Copiar Senha";

        botaoCopiar.disabled = false;

    }, 2000);

}

// =====================================================
// ANALISAR SENHA
// =====================================================

function analisarSenha(senha) {

    let pontos = 0;

    // Comprimento

    if (senha.length >= 8) pontos += 20;
    if (senha.length >= 12) pontos += 10;
    if (senha.length >= 16) pontos += 10;
    if (senha.length >= 20) pontos += 10;

    // Tipos de caracteres

    if (/[A-Z]/.test(senha)) pontos += 15;

    if (/[a-z]/.test(senha)) pontos += 15;

    if (/[0-9]/.test(senha)) pontos += 10;

    if (/[^A-Za-z0-9]/.test(senha)) pontos += 10;

    // Penaliza repetições

    if (/(.)\1{2,}/.test(senha)) {

        pontos -= 20;

    }

    // Penaliza sequências

    const sequencias = [

        "123","234","345","456","567","678","789",

        "abc","bcd","cde","def","efg","fgh",

        "qwerty","asdf","zxcv"

    ];

    const texto = senha.toLowerCase();

    sequencias.forEach(seq => {

        if (texto.includes(seq)) {

            pontos -= 15;

        }

    });

    // Limita entre 0 e 100

    pontos = Math.max(0, Math.min(100, pontos));

    atualizarBarra(pontos);

}

// =====================================================
// BARRA DE FORÇA
// =====================================================

function atualizarBarra(pontos) {

    barra.style.width = pontos + "%";

    barra.className = "";

    if (pontos <= 30) {

        barra.classList.add("fraca");

        textoForca.textContent =
            `🔴 Senha Fraca (${pontos}/100)`;

    }

    else if (pontos <= 70) {

        barra.classList.add("media");

        textoForca.textContent =
            `🟡 Senha Média (${pontos}/100)`;

    }

    else {

        barra.classList.add("forte");

        textoForca.textContent =
            `🟢 Senha Forte (${pontos}/100)`;

    }

}

// =====================================================
// GERA UMA SENHA AO ABRIR A PÁGINA
// =====================================================

gerarSenha();
