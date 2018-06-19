if(localStorage.bg !== "" && localStorage.bg !== undefined)
    document.body.style.backgroundImage = localStorage.bg;

function alteraChao(e) {
    let caminho = e.src.split('chao');
    if(document.body.style.backgroundImage === '')
        document.body.style.backgroundImage = 'url('+e.src+'), url(' + caminho[0] + 'ceu01.jpeg)';
    else{
        let aux = document.body.style.backgroundImage.split(',');
        document.body.style.backgroundImage = 'url('+e.src+'), ' + aux[1];
    }
    localStorage.bg = document.body.style.backgroundImage;
    document.getElementById('widget-chao').style.display='none';
}