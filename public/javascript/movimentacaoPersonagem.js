var madoka = document.getElementById('madoka');

var posicaoX = 0;
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
    localStorage.imagemEscolhida = imagemEscolhida;
    localStorage.posicaoX = posicaoX;
}

function paradaX() {
	if (imagemEscolhida === 2)
    	madoka.src = "img/madokaParadaEsquerda.gif";
	else if (imagemEscolhida === 1)
    	madoka.src = "img/madokaParadaDireita.gif";
}