let madoka = document.getElementById('madoka');
let cano1 = document.getElementById('cano1');
let cano2 = document.getElementById('cano2');
let cano3 = document.getElementById('cano3');
let cano4 = document.getElementById('cano4');

let wall1 = document.getElementById('wall1');
let wall2 = document.getElementById('wall2');

let stair1 = document.getElementById('stair-left');

const altChao = 46;

let posicaoX = 0;
let posicaoY = altChao;

let jumping = false;
let climbing = false;
let velY = 0;
const velJumpInicial = 4;
const velClimb = 3;
const gravity = 0.1;

let imagemEscolhida = 0;

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

function salvaEmailLogin()
{
    localStorage.email = document.getElementById('email1').value;
}
function salvaEmailCadastro()
{
    localStorage.email = document.getElementById('email2').value;
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
        if (climb(madoka,stair1) && !climbing)
        {
            climbing = true; 
            velY = velClimb;
        }
        else if (!jumping)
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

    if (e.keyCode==40)
    {
        posicaoY -= velJumpInicial;
        if (posicaoY <= altChao)
        {
            posicaoY = altChao;
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
    let left_obj1 = obj1.x + 25;
    let right_obj1 = obj1.x + obj1.width - 25;
    let bot_obj1 = obj1.y;
    let top_obj1 = obj1.y + obj1.height;

    let left_obj2 = obj2.x;
    let right_obj2 = obj2.x + obj2.width;
    let bot_obj2 = obj2.y;
    let top_obj2 = obj2.y + obj2.height;

    let crash = true;
    if ((right_obj1 < left_obj2) || (left_obj1 > right_obj2) || (bot_obj1 > top_obj2) || (bot_obj2 > top_obj1))
    {
        crash = false;
    }
    return crash;
}

function climb(obj1,obj2)
{
    let left_obj1 = obj1.x + 25;
    let right_obj1 = obj1.x + obj1.width - 25;
    let bot_obj1 = obj1.y;
    let top_obj1 = obj1.y + obj1.height;

    let left_obj2 = obj2.x;
    let right_obj2 = obj2.x + obj2.width;
    let bot_obj2 = obj2.y;
    let top_obj2 = obj2.y + obj2.height;

    let crash = false;
    if ((right_obj1 < right_obj2) && (left_obj1 > left_obj2) || (bot_obj1 > top_obj2))
    {
        crash = true;
    }
    return crash;
}

function attAvatar()
{
    if (jumping)
    {
        climbing = false;
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

    else if(climbing)
    {
        jumping = false;
        posicaoY += velY;
        if (posicaoY >= stair1.y + stair1.height + 5)
        {
            posicaoY = stair1.y + stair1.height + 5;
        }
        madoka.style.bottom = posicaoY + 'px';
    }
}