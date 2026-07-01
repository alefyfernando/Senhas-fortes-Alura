// ===== Elementos =====

const campoSenha = document.getElementById("campoSenha");

const btnGerar = document.getElementById("gerar");
const btnCopiar = document.getElementById("copiar");

const btnMais = document.getElementById("mais");
const btnMenos = document.getElementById("menos");

const tamanhoTexto = document.getElementById("valorTamanho");

const barra = document.getElementById("forca");
const textoForca = document.getElementById("textoForca");

const chkMaiusculas = document.getElementById("maiusculas");
const chkMinusculas = document.getElementById("minusculas");
const chkNumeros = document.getElementById("numeros");
const chkSimbolos = document.getElementById("simbolos");

// ===== Constantes =====

const MAIUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const NUMEROS = "0123456789";
const SIMBOLOS = "!@#$%&*?+-_=<>";

let tamanho = 12;

// ==========================

tamanhoTexto.textContent = tamanho;

// ==========================

btnMais.onclick = () => {

    if (tamanho < 30) {

        tamanho++;

        tamanhoTexto.textContent = tamanho;

    }

};

btnMenos.onclick = () => {

    if (tamanho > 4) {

        tamanho--;

        tamanhoTexto.textContent = tamanho;

    }

};

// ==========================

btnGerar.onclick = gerarSenha;

btnCopiar.onclick = copiarSenha;

// ==========================

function gerarSenha(){

    let grupos = [];

    let caracteres = "";

    if(chkMaiusculas.checked){

        grupos.push(MAIUSCULAS);

        caracteres += MAIUSCULAS;

    }

    if(chkMinusculas.checked){

        grupos.push(MINUSCULAS);

        caracteres += MINUSCULAS;

    }

    if(chkNumeros.checked){

        grupos.push(NUMEROS);

        caracteres += NUMEROS;

    }

    if(chkSimbolos.checked){

        grupos.push(SIMBOLOS);

        caracteres += SIMBOLOS;

    }

    if(caracteres.length == 0){

        alert("Selecione pelo menos uma opção.");

        return;

    }

    let senha = "";

    // Garante um caractere de cada grupo

    grupos.forEach(grupo=>{

        senha += grupo[Math.floor(Math.random()*grupo.length)];

    });

    // Completa o restante

    while(senha.length < tamanho){

        senha += caracteres[Math.floor(Math.random()*caracteres.length)];

    }

    // Embaralha

    senha = senha
        .split("")
        .sort(()=>Math.random()-0.5)
        .join("");

    campoSenha.value = senha;

    analisarSenha(senha);

}

// ==========================

function copiarSenha(){

    if(campoSenha.value=="") return;

    navigator.clipboard.writeText(campoSenha.value);

    btnCopiar.textContent="Copiado!";

    setTimeout(()=>{

        btnCopiar.textContent="Copiar";

    },1500);

}

// ==========================

function analisarSenha(senha){

    let pontos = 0;

    if(senha.length>=8) pontos+=20;
    if(senha.length>=12) pontos+=10;
    if(senha.length>=16) pontos+=10;

    if(/[A-Z]/.test(senha)) pontos+=15;

    if(/[a-z]/.test(senha)) pontos+=15;

    if(/[0-9]/.test(senha)) pontos+=15;

    if(/[^A-Za-z0-9]/.test(senha)) pontos+=15;

    // Repetições

    if(/(.)\1{2,}/.test(senha)){

        pontos-=20;

    }

    // Sequências

    const sequencias = [

        "123","234","345","456","567","678","789",

        "abc","bcd","cde","def","efg","fgh","ghi",

        "hij","ijk","jkl","klm","lmn","mno","nop",

        "opq","pqr","qrs","rst","stu","tuv","uvw",

        "vwx","wxy","xyz",

        "qwerty",

        "asdf",

        "zxcv"

    ];

    const texto = senha.toLowerCase();

    sequencias.forEach(seq=>{

        if(texto.includes(seq)){

            pontos-=15;

        }

    });

    pontos = Math.max(0,Math.min(100,pontos));

    atualizarBarra(pontos);

}

// ==========================

function atualizarBarra(pontos){

    barra.className="";

    if(pontos>=70){

        barra.classList.add("forte");

        textoForca.textContent=`Senha Forte (${pontos}/100)`;

    }

    else if(pontos>=40){

        barra.classList.add("media");

        textoForca.textContent=`Senha Média (${pontos}/100)`;

    }

    else{

        barra.classList.add("fraca");

        textoForca.textContent=`Senha Fraca (${pontos}/100)`;

    }

}

// ==========================

gerarSenha();