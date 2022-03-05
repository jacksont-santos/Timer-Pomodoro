let acao = document.getElementById("acao");
let pausa = document.getElementById("pausa");
let sessoes = document.getElementById("sessoes");
let segundos;

var bell = new Audio("./audio/bell.mp3");
var volta = new Audio("./audio/volta.mp3");
var final = new Audio("./audio/final.mp3");

var lofi = document.getElementById("lofi");
var pause = document.getElementById("pause");
var play = document.getElementById("play");

function pausar(){
    lofi.pause();
    play.style.setProperty("display", "block", "important");
    pause.style.setProperty("display", "none", "important");
};

function executar(){
    lofi.play();
    play.style.setProperty("display", "none", "important");
    pause.style.setProperty("display", "block", "important");
}

function iniciar() {
    if(acao.value == 0){
        document.getElementById("erro-acao").innerHTML= "Adicione os minutos";
        acao.focus();
    } else if (pausa.value == 0){
        document.getElementById("erro-pausa").innerHTML= "Adicione a pausa";
        pausa.focus();
    } else if (sessoes.value == 0){
        document.getElementById("erro-sessoes").innerHTML= "Adicione as sessoes";
        sessoes.focus();
    } else {
        lofi.play();
        pause.style.setProperty("display", "block", "important");

        localStorage.setItem("acao", String(acao.value));
        localStorage.setItem("pausa", String(pausa.value));
        localStorage.setItem("sessoes", String(sessoes.value));

        document.getElementById("config").style.setProperty("display", "none", "important");
        document.getElementById("timer").style.setProperty("display", "block", "important");
    };

    momentoAcao();
};

function momentoAcao(){
    let sessoesValor = localStorage.getItem("sessoes");
    if(sessoesValor != "1"){
        document.getElementById("title-sessao").innerHTML= sessoesValor + "sessões restantes"
    } else {
        document.getElementById("title-sessao").innerHTML= sessoesValor + "sessõe restante"
    };

    let title = document.getElementById("title");
    title.innerHTML= "AÇÃO";
    title.style.fontSize= "25pt";
    title.style.fontWeight= "bold";
    title.style.setProperty("color", "green", "important");

    let min = Number(localStorage.getItem("acao"));
    min = min - 1;
    let segundos = 59;

    document.getElementById("minutes-ok").innerHTML= min;
    document.getElementById("seconds-ok").innerHTML= segundos;

    var minInterval = setInterval(minTimer, 60000);
    var secInterval = setInterval(secTimer, 1000);

    function minTimer(){
        min = min - 1;
        document.getElementById("minutes-ok").innerHTML= min;
    };

    function secTimer(){
        segundos = segundos - 1;
        document.getElementById("seconds-ok").innerHTML= segundos;

        if(segundos <= 0){
            if(min <= 0){
                clearInterval(minInterval);
                clearInterval(secInterval);
                bell.play();
                momentoPausa();
            }
            segundos = 60;
        }
    };

};

function momentoPausa(){

    let title = document.getElementById("title");
    title.innerHTML= "PAUSA";
    title.style.fontSize= "25pt";
    title.style.fontWeight= "bold";
    title.style.setProperty("color", "red", "important");

    let minPausa = Number(localStorage.getItem("acao"));
    minPausa = minPausa - 1;
    let segundos = 59;

    document.getElementById("minutes-ok").innerHTML= minPausa;
    document.getElementById("seconds-ok").innerHTML= segundos;

    var minInterval = setInterval(minTimer, 60000);
    var secInterval = setInterval(secTimer, 1000);

    function minTimer(){
        minPausa = minPausa - 1;
        document.getElementById("minutes-ok").innerHTML= minPausa;
    };

    function secTimer(){
        segundos = segundos - 1;
        document.getElementById("seconds-ok").innerHTML= segundos;

        if(segundos <= 0){
            if(minPausa <= 0){

                let sess = Number(localStorage.getItem("sessoes"));
                sess = sess - 1;
                localStorage.setItem("sessoes", String(sess));

                clearInterval(minInterval);
                clearInterval(secInterval);

                if(sess <= 0){
                    final.play();
                    localStorage.clear();

                    document.getElementById("config").style.setProperty("display", "none", "important");
                    document.getElementById("timer").style.setProperty("display", "none", "important");
                    document.getElementById("fim").style.setProperty("display", "block", "important");
                } else {
                    volta.play();
                    momentoAcao();
                }

                
            }
            segundos = 60;
        }
    };
    
}