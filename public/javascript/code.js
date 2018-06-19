var madoka = document.getElementById('madoka');
var cano1 = document.getElementById('cano1');
var cano2 = document.getElementById('cano2');
var cano3 = document.getElementById('cano3');
var cano4 = document.getElementById('cano4');
var wall1 = document.getElementById('wall1');
var wall2 = document.getElementById('wall2');

const altChao = 46;

var posicaoX = 0;
var posicaoY = altChao;

var jumping = false;
var climbing = false;
var velY = 0;
const velJumpInicial = 4;
const gravity = 0.1;

var imagemEscolhida = 0;

document.onkeydown = movimentandoX;
document.onkeyup = paradaX;

//localStorage.posicaoX = 0;

if(localStorage.posicaoX !== "" && localStorage.posicaoX !== undefined  && !isNaN(localStorage.posicaoX))
{
    posicaoX = parseInt(localStorage.posicaoX);
    madoka.style.left = posicaoX + 'px';
}

if(localStorage.imagemEscolhida !== ""  && localStorage.imagemEscolhida !== undefined  && !isNaN(localStorage.imagemEscolhida))
{
    imagemEscolhida = parseInt(localStorage.imagemEscolhida);
    if (imagemEscolhida === 2)
        madoka.src = "img/madokaParadaEsquerda.gif";
    else if (imagemEscolhida === 1)
        madoka.src = "img/madokaParadaDireita.gif";
}


function movimentandoX(e) {
    if(e.keyCode==39){
        if (imagemEscolhida !== 1 || madoka.src.includes("img/madokaParadaDireita.gif")) {
            madoka.src = "img/madokaDireita.gif";
            imagemEscolhida = 1;
        }
        let tamanhoTela = window.innerWidth - window.innerWidth*0.09;
        if (!(posicaoX + 5 > tamanhoTela))
            posicaoX += 5;
        if (colisao(madoka,wall1) || colisao(madoka,wall2))
            posicaoX -= 5;
        madoka.style.left = posicaoX + 'px';

    }
    if(e.keyCode==37){
        if (imagemEscolhida !== 2 || madoka.src.includes("img/madokaParadaEsquerda.gif")) {
            madoka.src = "img/madokaEsquerda.gif";
            imagemEscolhida = 2;
        }
        if (!(posicaoX - 5 < 0))
            posicaoX -= 5;
        madoka.style.left = posicaoX + 'px';
    }

    if (e.keyCode==38)
    {
        if (!jumping)
        {
            jumping = true;
            velY = velJumpInicial;
            window.requestAnimationFrame(attAvatar);  
        } 
        if (colisao(madoka,cano1) || colisao(madoka,cano2) || colisao(madoka,cano3) || colisao(madoka,cano4))
        {
            posicaoY = 0;
        }
    }

    localStorage.imagemEscolhida = imagemEscolhida;
    localStorage.posicaoX = posicaoX;
    localStorage.posicaoY = posicaoY;
}

function paradaX() {

    if (imagemEscolhida === 2)
        madoka.src = "img/madokaParadaEsquerda.gif";
    else if (imagemEscolhida === 1)
        madoka.src = "img/madokaParadaDireita.gif";

}

function colisao(obj1, obj2)
{
    var left_obj1 = obj1.x + 25;
    var right_obj1 = obj1.x + obj1.width - 25;
    var bot_obj1 = obj1.y;
    var top_obj1 = obj1.y + obj1.height;

    var left_obj2 = obj2.x;
    var right_obj2 = obj2.x + obj2.width;
    var bot_obj2 = obj2.y;
    var top_obj2 = obj2.y + obj2.height;

    var crash = true;
    if ((right_obj1 < left_obj2) || (left_obj1 > right_obj2) || (bot_obj1 > top_obj2) || (bot_obj2 > top_obj1))
    {
        crash = false;
    }
    return crash;
}


function attAvatar()
{
    if (jumping)
    {
        posicaoY += velY;
        velY -= gravity;
        if (posicaoY <= altChao)
        {
            jumping = false;
            posicaoY = altChao;
        }
        madoka.style.bottom = posicaoY + 'px';

        window.requestAnimationFrame(attAvatar);
    }

}