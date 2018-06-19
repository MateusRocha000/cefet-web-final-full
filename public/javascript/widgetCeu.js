if(localStorage.bg !== ""  && localStorage.bg !== undefined)
    document.body.style.backgroundImage = localStorage.bg;
if(localStorage.cor_ceu !== "" && localStorage.cor_ceu !== undefined)
    document.body.style.backgroundColor = localStorage.cor_ceu;

function alteraCeu(e) {
	let caminho = e.src.split('ceu');
    if(document.body.style.backgroundImage === '')
        document.body.style.backgroundImage = 'url(' + caminho[0] + 'chao01.jpeg), url('+e.src+')';
    else{
        let aux = document.body.style.backgroundImage.split(',');
        document.body.style.backgroundImage = aux[0] + ', url('+e.src+')';
    }
    if(e.src.includes("ceu01"))
    	document.body.style.backgroundColor = '#2586DB';
    else if(e.src.includes("ceu02"))
    	document.body.style.backgroundColor = '#2C3635';
    else if(e.src.includes("ceu03"))
    	document.body.style.backgroundColor = '#000000';
    localStorage.bg = document.body.style.backgroundImage;
    localStorage.cor_ceu = document.body.style.backgroundColor;
    document.getElementById('widget-ceu').style.display='none';
}