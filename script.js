const imagem = document.querySelector(".carrossel img");
const botoesConsulta = document.querySelectorAll(".tipo-consulta");
const tituloConsulta = document.querySelector(".conteudo-consulta h3");
const textoConsulta = document.querySelector(".conteudo-consulta p");
const opcoesAgendamento = document.querySelectorAll(".opcao-agendamento");
const modalidades = document.querySelectorAll(".modalidade");
const locaisPrensencial = document.querySelector(".locais-presencial");
const locais = document.querySelectorAll(".local-presencial");
const botaoConfirmar = document.querySelector(".confirmar");



//Troca de imagens 

let indiceAtual = 0;


const imagens = [
    "img1.png",
    "img2.png",
    "img3.png"
];

function atualizarImagem(){
    imagem.style.opacity = 0;
    
    setTimeout(function(){
        imagem.src = imagens[indiceAtual];
        imagem.style.opacity = 1;
    }, 500);
}

imagem.addEventListener("click", function(){
    indiceAtual++;
    if(indiceAtual >= imagens.length){
        indiceAtual = 0;
    }
    atualizarImagem();
});

setInterval(function(){
    indiceAtual++;
    if(indiceAtual >= imagens.length){
        indiceAtual = 0;
    }
    atualizarImagem();
}, 5000);

//Troca de texto
botoesConsulta.forEach(function(botao, indice){
    botao.addEventListener("click", function(){

        botoesConsulta.forEach(function(botao){  
        botao.classList.remove("ativo");
    });

    botao.classList.add("ativo");
    if(indice == 0){
        tituloConsulta.textContent = "Consulta de 30 minutos";
        textoConsulta.textContent = "Uma consulta mais objetiva, indicada para quem deseja buscar orientação sobre questões específicas.";
    }
    else{
        tituloConsulta.textContent = "Consulta de 1 hora";
        textoConsulta.textContent = "Uma consulta mais aprofundada, com mais tempo para explorar diferentes questões.";
    }
    
});
});

// Troca de botões

opcoesAgendamento.forEach(function(opcao){

    opcao.addEventListener("click", function(){

        opcoesAgendamento.forEach(function(opcao){
            opcao.classList.remove("ativo");
        });

        opcao.classList.add("ativo");

        if(opcao.textContent === "30 minutos"){
        duracaoSelecionada = 30;
        }else{
        duracaoSelecionada = 60;
}
    
    limparHorarios();
    esconderConfirmar();

    });
});
modalidades.forEach(function(modalidade){

    modalidade.addEventListener("click", function(){

        modalidades.forEach(function(botao){

            botao.classList.remove("ativo");
            
        });
       
        modalidade.classList.add("ativo");


        esconderConfirmar();

        if(modalidade.textContent === "Online"){
            locaisPrensencial.style.display = "none";
            limparLocal();
        }else{
            locaisPrensencial.style.display = "flex";
        }

    });
});
//Indentificar o horário

const botaoHorarios = document.querySelector(".botao-horarios");
const tituloCalendario = document.querySelector(".cabecalho-calendario h3");
const dias = document.querySelector(".dias");
const botaoMesAnterior = document.querySelector(".mes-anterior");
const botaoProximoMes = document.querySelector(".proximo-mes");

const dataAtual = new Date();

let mesAtual = dataAtual.getMonth();
let anoAtual = dataAtual.getFullYear()
let diaSelecionado = null;
let horarioSelecionado = null;
let duracaoSelecionada = 30;
let indiceHorario = null;

function gerarCalendario() {

    const primeiroDia = new Date(anoAtual, mesAtual, 1);
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);
    

    const quantidadeDias = ultimoDia.getDate();
    const diaSemana = primeiroDia.getDay();
    const espacosVazios = diaSemana === 0 ? 6 : diaSemana - 1;

    const nomeMes = primeiroDia.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric"
    });
    tituloCalendario.textContent = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

    dias.innerHTML = "";
    
       for(let i = 0; i < espacosVazios; i++){
    const espaco = document.createElement("div");

    dias.appendChild(espaco);
    }

    for(let dia = 1; dia <= quantidadeDias; dia++){
        const elementoDia = document.createElement("button");
        elementoDia.textContent = dia;
        dias.appendChild(elementoDia);
        elementoDia.addEventListener("click", function(){
           
            const diaSelecionados = document.querySelectorAll(".dias button");

            
            diaSelecionados.forEach(function(botao){
                

                botao.classList.remove("selecionado");
            })
            elementoDia.classList.add("selecionado")
            diaSelecionado = dia;
            limparHorarios();
            limparLocal();
            esconderConfirmar();
            
        
            console.log("Dia selecionado: ", dia);
        });
    }

    console.log("Quantidade de dias:", quantidadeDias);
    console.log("Dia da semana:", diaSemana);
}
gerarCalendario();

botaoMesAnterior.addEventListener("click", function(){

 mesAtual--;

 if(mesAtual < 0){
    mesAtual = 11;
    anoAtual--;
 }
 gerarCalendario();
});
botaoProximoMes.addEventListener("click", function(){

    mesAtual++;

    if(mesAtual > 11){
        mesAtual = 0;
        anoAtual++;
    }
    gerarCalendario();
});

const calendario = document.querySelector(".calendario");
const horarios = document.querySelector(".horarios");

function gerarHorarios() {

    horarios.innerHTML = "";

    for(let minutos = 10 * 60; minutos <= 17 * 60 + 30; minutos += 30){
        const horario = document.createElement("button");

        const hora = Math.floor(minutos / 60);
        const minuto = minutos % 60;
        

       
        horario.textContent = `${hora}:${minuto === 0 ? "00" : 30}`;

        horario.addEventListener("click", function(){

            if(duracaoSelecionada === 60 && horario.textContent === "17:30"){
                 return;
            }

            
            limparHorarios();
            

            const horariosSelecionado = document.querySelectorAll(".horarios button");  

            horariosSelecionado.forEach(function(botao2, indice){

                if(botao2 === horario){

                    indiceHorario = indice

            }
            });

            const modalidadeSelecionada = document.querySelector(".modalidade.ativo");

            if(modalidadeSelecionada.textContent === "Presencial" && diaSelecionado !== null){

            locaisPrensencial.style.display = "flex";
            }
            

            horario.classList.add("selecionado");

            if(duracaoSelecionada === 60){

                const horaConsulta =  horariosSelecionado[indiceHorario + 1];
           
                horaConsulta.classList.add("selecionado");
            }
            horarioSelecionado = horario.textContent;

            if(modalidadeSelecionada.textContent === "Online"){

                botaoConfirmar.style.display = "flex";
            }

            console.log("Horário selecionado: ", horario.textContent);

        });

        horarios.appendChild(horario);
    }

}
let localSelecionado = null;

locais.forEach(function(local){

        local.addEventListener("click", function(){

            locais.forEach(function(botao){

                botao.classList.remove("ativo");
            });

            local.classList.add("ativo");
            botaoConfirmar.style.display = "flex";
            localSelecionado = local.textContent;
            console.log(localSelecionado);
        });
 });

gerarHorarios();

calendario.classList.add("escondido")

botaoHorarios.addEventListener("click", function(){

    const opcaoSelecionada = document.querySelector(".opcao-agendamento.ativo")
    
    console.log(opcaoSelecionada.textContent);

    calendario.classList.remove("escondido");

});
const modal = document.querySelector(".modal-cadastro");
botaoConfirmar.addEventListener("click", function(){

        modal.style.display = "flex";

    console.log(duracaoSelecionada);
    console.log(diaSelecionado);
    console.log(horarioSelecionado);
    console.log(localSelecionado);
})

//Limpar Seleção

function limparHorarios(){
    
    const horario = document.querySelectorAll(".horarios button");

    horario.forEach(function(botao){

        botao.classList.remove("selecionado");
        
    });

    horarioSelecionado = null;
    indiceHorario = null;
}
function limparLocal(){

    const local = document.querySelectorAll(".local-presencial");

    local.forEach(function(botao){

        botao.classList.remove("ativo");

    })
    localSelecionado = null;
}
function esconderConfirmar(){
    botaoConfirmar.style.display = "none";
}
const fechar = document.querySelector(".fechar-modal");

fechar.addEventListener("click", function(){
    fechar.style.display = "none";
});