// =====================================================
// PASSWORD SHIELD
// Testador de Senhas
// Parte 1
// =====================================================

// -------------------------
// Elementos
// -------------------------

const senhaTeste = document.getElementById("senhaTeste");

const mostrarSenha = document.getElementById("mostrarSenha");

const barra = document.getElementById("forca");

const textoForca = document.getElementById("textoForca");

const listaResultado = document.getElementById("listaResultado");

// -------------------------
// Eventos
// -------------------------

senhaTeste.addEventListener("input", () => {

    analisarSenha(senhaTeste.value);

});

mostrarSenha.addEventListener("click", () => {

    if (senhaTeste.type === "password") {

        senhaTeste.type = "text";

        mostrarSenha.textContent = "🙈";

        mostrarSenha.title = "Ocultar senha";

    }

    else {

        senhaTeste.type = "password";

        mostrarSenha.textContent = "👁";

        mostrarSenha.title = "Mostrar senha";

    }

});

// =====================================================
// ANALISAR SENHA
// =====================================================

function analisarSenha(senha) {

    let pontos = 0;

    let mensagens = [];

    // Comprimento

    if (senha.length >= 8) {

        pontos += 20;

        mensagens.push({
            texto: "✔ Possui pelo menos 8 caracteres.",
            ok: true
        });

    }

    else {

        mensagens.push({
            texto: "❌ Utilize pelo menos 8 caracteres.",
            ok: false
        });

    }

    if (senha.length >= 12) pontos += 10;

    if (senha.length >= 16) pontos += 10;

    if (senha.length >= 20) pontos += 10;

    // Maiúsculas

    if (/[A-Z]/.test(senha)) {

        pontos += 15;

        mensagens.push({
            texto: "✔ Contém letras maiúsculas.",
            ok: true
        });

    }

    else {

        mensagens.push({
            texto: "❌ Adicione letras maiúsculas.",
            ok: false
        });

    }

    // Minúsculas

    if (/[a-z]/.test(senha)) {

        pontos += 15;

        mensagens.push({
            texto: "✔ Contém letras minúsculas.",
            ok: true
        });

    }

    else {

        mensagens.push({
            texto: "❌ Adicione letras minúsculas.",
            ok: false
        });

    }

    // Números

    if (/[0-9]/.test(senha)) {

        pontos += 15;

        mensagens.push({
            texto: "✔ Contém números.",
            ok: true
        });

    }

    else {

        mensagens.push({
            texto: "❌ Adicione números.",
            ok: false
        });

    }

    // Símbolos

    if (/[^A-Za-z0-9]/.test(senha)) {

        pontos += 15;

        mensagens.push({
            texto: "✔ Contém símbolos.",
            ok: true
        });

    }

    else {

        mensagens.push({
            texto: "❌ Adicione símbolos.",
            ok: false
        });

    }

    atualizarResultado(senha, pontos, mensagens);

}
// =====================================================
// ATUALIZA RESULTADOS
// =====================================================

function atualizarResultado(senha, pontos, mensagens) {

    // -------------------------
    // Caracteres repetidos
    // -------------------------

    if (/(.)\1{2,}/.test(senha)) {

        pontos -= 20;

        mensagens.push({
            texto: "❌ Existem caracteres repetidos (aaa, 111...).",
            ok: false
        });

    }

    else {

        mensagens.push({
            texto: "✔ Não possui caracteres repetidos.",
            ok: true
        });

    }

    // -------------------------
    // Sequências conhecidas
    // -------------------------

    const sequencias = [

        "123","234","345","456","567","678","789","890",

        "abc","bcd","cde","def","efg","fgh","ghi",

        "hij","ijk","jkl","klm","lmn","mno","nop",

        "opq","pqr","qrs","rst","stu","tuv","uvw",

        "vwx","wxy","xyz",

        "qwerty",

        "asdf",

        "zxcv"

    ];

    let possuiSequencia = false;

    const senhaMinuscula = senha.toLowerCase();

    for (const sequencia of sequencias) {

        if (senhaMinuscula.includes(sequencia)) {

            possuiSequencia = true;

            break;

        }

    }

    if (possuiSequencia) {

        pontos -= 15;

        mensagens.push({
            texto: "❌ Contém sequências previsíveis.",
            ok: false
        });

    }

    else {

        mensagens.push({
            texto: "✔ Não possui sequências previsíveis.",
            ok: true
        });

    }

    // -------------------------
    // Limita a pontuação
    // -------------------------

    pontos = Math.max(0, Math.min(100, pontos));

    atualizarBarra(pontos);

    atualizarLista(mensagens);

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
// LISTA DE DIAGNÓSTICO
// =====================================================

function atualizarLista(lista) {

    listaResultado.innerHTML = "";

    lista.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item.texto;

        li.className = item.ok ? "sucesso" : "erro";

        listaResultado.appendChild(li);

    });

}
// =====================================================
// CALCULA A ENTROPIA DA SENHA
// =====================================================

function calcularEntropia(senha){

    let conjunto = 0;

    if(/[a-z]/.test(senha)) conjunto += 26;
    if(/[A-Z]/.test(senha)) conjunto += 26;
    if(/[0-9]/.test(senha)) conjunto += 10;
    if(/[^A-Za-z0-9]/.test(senha)) conjunto += 32;

    if(conjunto === 0) return 0;

    return Math.round(senha.length * Math.log2(conjunto));

}

// =====================================================
// TEMPO ESTIMADO PARA QUEBRAR
// =====================================================

function tempoQuebra(bits){

    if(bits < 28)
        return "Menos de 1 segundo";

    if(bits < 36)
        return "Alguns minutos";

    if(bits < 50)
        return "Algumas horas";

    if(bits < 60)
        return "Alguns dias";

    if(bits < 70)
        return "Alguns anos";

    if(bits < 90)
        return "Milhares de anos";

    return "Milhões de anos";

}

// =====================================================
// ADICIONA INFORMAÇÕES EXTRAS
// =====================================================

function mostrarInformacoesExtras(senha){

    let painel = document.getElementById("informacoesExtras");

    if(!painel){

        painel = document.createElement("div");

        painel.id = "informacoesExtras";

        painel.style.marginTop = "25px";

        painel.style.padding = "20px";

        painel.style.border = "1px solid #26303C";

        painel.style.borderRadius = "15px";

        painel.style.background = "#0E1318";

        listaResultado.parentElement.appendChild(painel);

    }

    const bits = calcularEntropia(senha);

    let classificacao = "";

    if(bits < 40){

        classificacao = "Fraca";

    }

    else if(bits < 60){

        classificacao = "Boa";

    }

    else if(bits < 80){

        classificacao = "Muito Boa";

    }

    else{

        classificacao = "Excelente";

    }

    painel.innerHTML = `

        <h3 style="margin-bottom:15px;">
            Informações Extras
        </h3>

        <p><strong>Entropia:</strong> ${bits} bits</p>

        <p><strong>Classificação:</strong> ${classificacao}</p>

        <p><strong>Tempo estimado para quebrar:</strong> ${tempoQuebra(bits)}</p>

    `;

}
