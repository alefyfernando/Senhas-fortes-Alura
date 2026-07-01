// ==========================
// Elementos da página
// ==========================

const senhaTeste = document.getElementById("senhaTeste");
const barra = document.getElementById("forca");
const textoForca = document.getElementById("textoForca");
const listaResultado = document.getElementById("listaResultado");

// Analisa sempre que o usuário digitar
senhaTeste.addEventListener("input", analisarSenha);

// ==========================

function analisarSenha(){

    const senha = senhaTeste.value;

    let pontos = 0;

    let mensagens = [];

    // ==========================
    // Comprimento
    // ==========================

    if(senha.length >= 8){
        pontos += 20;
        mensagens.push({texto:"✔ Possui pelo menos 8 caracteres.", ok:true});
    }else{
        mensagens.push({texto:"❌ Utilize pelo menos 8 caracteres.", ok:false});
    }

    if(senha.length >= 12){
        pontos += 10;
    }

    if(senha.length >= 16){
        pontos += 10;
    }

    // ==========================
    // Maiúsculas
    // ==========================

    if(/[A-Z]/.test(senha)){
        pontos += 15;
        mensagens.push({texto:"✔ Contém letras maiúsculas.", ok:true});
    }else{
        mensagens.push({texto:"❌ Adicione letras maiúsculas.", ok:false});
    }

    // ==========================
    // Minúsculas
    // ==========================

    if(/[a-z]/.test(senha)){
        pontos += 15;
        mensagens.push({texto:"✔ Contém letras minúsculas.", ok:true});
    }else{
        mensagens.push({texto:"❌ Adicione letras minúsculas.", ok:false});
    }

    // ==========================
    // Números
    // ==========================

    if(/[0-9]/.test(senha)){
        pontos += 15;
        mensagens.push({texto:"✔ Contém números.", ok:true});
    }else{
        mensagens.push({texto:"❌ Adicione números.", ok:false});
    }

    // ==========================
    // Símbolos
    // ==========================

    if(/[^A-Za-z0-9]/.test(senha)){
        pontos += 15;
        mensagens.push({texto:"✔ Contém símbolos.", ok:true});
    }else{
        mensagens.push({texto:"❌ Adicione símbolos.", ok:false});
    }

    // ==========================
    // Caracteres repetidos
    // ==========================

    if(/(.)\1{2,}/.test(senha)){
        pontos -= 20;
        mensagens.push({texto:"❌ Existem caracteres repetidos (111, aaa...).", ok:false});
    }else{
        mensagens.push({texto:"✔ Não possui caracteres repetidos.", ok:true});
    }

    // ==========================
    // Sequências
    // ==========================

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

    for(let seq of sequencias){

        if(senhaMinuscula.includes(seq)){
            possuiSequencia = true;
            break;
        }

    }

    if(possuiSequencia){

        pontos -= 15;

        mensagens.push({
            texto:"❌ Contém sequências previsíveis.",
            ok:false
        });

    }else{

        mensagens.push({
            texto:"✔ Não possui sequências.",
            ok:true
        });

    }

    // ==========================
    // Padrões alternados
    // ==========================

    if(/^([0-9][a-zA-Z])+$/.test(senha) ||
       /^([a-zA-Z][0-9])+$/.test(senha)){

        pontos -= 10;

        mensagens.push({
            texto:"❌ Possui padrão simples (1a2b3c).",
            ok:false
        });

    }else{

        mensagens.push({
            texto:"✔ Não possui padrões simples.",
            ok:true
        });

    }

    // ==========================
    // Limita a pontuação
    // ==========================

    pontos = Math.max(0, Math.min(100, pontos));

    atualizarBarra(pontos);

    atualizarLista(mensagens);

}

// ==========================

function atualizarBarra(pontos){

    barra.className = "";

    if(pontos >= 70){

        barra.classList.add("forte");

        textoForca.textContent =
            `Senha Forte (${pontos}/100)`;

    }

    else if(pontos >= 40){

        barra.classList.add("media");

        textoForca.textContent =
            `Senha Média (${pontos}/100)`;

    }

    else{

        barra.classList.add("fraca");

        textoForca.textContent =
            `Senha Fraca (${pontos}/100)`;

    }

}

// ==========================

function atualizarLista(lista){

    listaResultado.innerHTML = "";

    lista.forEach(item=>{

        const li = document.createElement("li");

        li.textContent = item.texto;

        if(item.ok){

            li.classList.add("sucesso");

        }else{

            li.classList.add("erro");

        }

        listaResultado.appendChild(li);

    });

}