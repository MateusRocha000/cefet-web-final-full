xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET","http://localhost:3000/dadosUser/" + localStorage.email, true);
   xmlhttp.onreadystatechange=function(){
         if (xmlhttp.readyState==4 && xmlhttp.status==200){
           let dados=JSON.parse(xmlhttp.responseText);
           localStorage.bg = dados.background;
           localStorage.cor_ceu = dados.skyColor;
           localStorage.links = dados.links;
           localStorage.comentarios = dados.comments;
           localStorage.ativo_galeria = dados.galleryActive;

           localStorage.ativo_caixa_texto = dados.textActive;
           localStorage.texto_caixa_texto = dados.text;
           localStorage.altura_caixa_texto = dados.textHeight;
           localStorage.fonte_caixa_texto = dados.textFont;
           localStorage.largura_caixa_texto = dados.textWidth;
           localStorage.top_caixa_texto = dados.textTop;
           localStorage.left_caixa_texto = dados.textLeft;
           localStorage.fundo_caixa_texto = dados.textBackground;
           localStorage.cor_caixa_texto = dados.textColor;
           localStorage.cor_borda_caixa_texto = dados.textBorderColor;
           localStorage.borda_tamanho_caixa_texto = dados.textSizeBorder;
           localStorage.borda_tipo_caixa_texto = dados.textBorderType;


           if(localStorage.bg !== "" && localStorage.bg !== undefined)
            document.body.style.backgroundImage = localStorage.bg;
            if(localStorage.cor_ceu !== "" && localStorage.cor_ceu !== undefined)
                document.body.style.backgroundColor = localStorage.cor_ceu;
            if(localStorage.ativo_galeria === "false")
            {
              document.getElementById('ativo_galeria').checked = false;
              document.getElementById('galeria').style.display = "none";
            }
            else if(localStorage.ativo_galeria === "true")
            {
              document.getElementById('galeria').style.display = "block";
              document.getElementById('ativo_galeria').checked = true;
            }


            if(localStorage.links === ""  || localStorage.links === undefined)
            {
              localStorage.links = 'https://fegemo.github.io/cefet-web/images/philae-parts.jpg;';
            }
            else
            {
              links = localStorage.links;
              links = links.split(";");
              links.pop();

              document.getElementById('slide').src = links[0];
            }

            if(localStorage.comentarios === ""  || localStorage.comentarios === undefined)
            {
              localStorage.comentarios = ';';
            }
            else
            {
              comentarios = localStorage.comentarios;
              comentarios = comentarios.split(";");
              comentarios.pop();

              document.getElementById('cmt_galeria').innerHTML = comentarios[0];
            }


            if(localStorage.ativo_caixa_texto === "false")
            {
              obj.style.display = "none";
              document.getElementById('ativo_caixa_texto').checked = false;
            }
            else if(localStorage.ativo_caixa_texto === "true")
            {
              obj.style.display = "block";
              document.getElementById('ativo_caixa_texto').checked = true;
            }

            if(localStorage.texto_caixa_texto !== "" && localStorage.texto_caixa_texto !== undefined)
            {
              obj.innerHTML = localStorage.texto_caixa_texto;
              document.getElementById('texto_caixa_texto').value = localStorage.texto_caixa_texto;
            }

            if(localStorage.altura_caixa_texto !== "" && localStorage.altura_caixa_texto !== undefined)
            {
              obj.style.height = localStorage.altura_caixa_texto + 'px';
              document.getElementById('altura_caixa_texto').value = localStorage.altura_caixa_texto;
            }

            if(localStorage.fonte_caixa_texto !== "" && localStorage.fonte_caixa_texto !== undefined)
            {
              obj.style.fontSize = localStorage.fonte_caixa_texto + 'px';
              document.getElementById('fonte_caixa_texto').value = localStorage.fonte_caixa_texto;
            }

            if(localStorage.largura_caixa_texto !== "" && localStorage.largura_caixa_texto !== undefined)
            {
              obj.style.width = localStorage.largura_caixa_texto + 'px';
              document.getElementById('largura_caixa_texto').value = localStorage.largura_caixa_texto;
            }

            if(localStorage.top_caixa_texto !== "" && localStorage.top_caixa_texto !== undefined)
            {
              obj.style.top = localStorage.top_caixa_texto;
            }

            if(localStorage.left_caixa_texto !== "" && localStorage.left_caixa_texto !== undefined)
            {
              obj.style.left = localStorage.left_caixa_texto;
            }

            if(localStorage.fundo_caixa_texto !== "" && localStorage.fundo_caixa_texto !== undefined)
            {
              obj.style.backgroundColor = "#" + localStorage.fundo_caixa_texto;
              document.getElementById('fundo_caixa_texto').value  = localStorage.fundo_caixa_texto;
              document.getElementById('fundo_caixa_texto').style.backgroundColor = "#" + localStorage.fundo_caixa_texto;
            }

            if(localStorage.cor_caixa_texto !== "" && localStorage.cor_caixa_texto !== undefined)
            {
              obj.style.color = "#" + localStorage.cor_caixa_texto;
              document.getElementById('cor_caixa_texto').value = localStorage.cor_caixa_texto;
              document.getElementById('cor_caixa_texto').style.backgroundColor = "#" + localStorage.cor_caixa_texto;
            }

            if(localStorage.cor_borda_caixa_texto !== "" && localStorage.cor_borda_caixa_texto !== undefined)
            {
              obj.style.borderColor = "#" + localStorage.cor_borda_caixa_texto;
              document.getElementById('cor_borda_caixa_texto').value  = localStorage.cor_borda_caixa_texto;
              document.getElementById('cor_borda_caixa_texto').style.backgroundColor = "#" + localStorage.cor_borda_caixa_texto;
            }

            if(localStorage.borda_tamanho_caixa_texto !== "" && localStorage.borda_tamanho_caixa_texto !== undefined)
            {
              obj.style.borderWidth = localStorage.borda_tamanho_caixa_texto + 'px';
              document.getElementById('borda_tamanho_caixa_texto').value = localStorage.borda_tamanho_caixa_texto;
            }

            if(localStorage.borda_tipo_caixa_texto !== "" && localStorage.borda_tipo_caixa_texto !== undefined)
            {
              obj.style.borderStyle = localStorage.borda_tipo_caixa_texto;
              document.getElementById('borda_tipo_caixa_texto').value = localStorage.borda_tipo_caixa_texto;
            }

         }
   }
   xmlhttp.send();


function rgbToHex(r, g, b) {
    return  ((1 << 24) + (Number(r) << 16) + (Number(g) << 8) + Number(b)).toString(16).slice(1).toUpperCase();
}


var obj = document.getElementById('div_widget_texto');

function carregaTexto()
{
  obj.innerHTML = document.getElementById('texto_caixa_texto').value;
  obj.style.height = document.getElementById('altura_caixa_texto').value + 'px';
  obj.style.fontSize = document.getElementById('fonte_caixa_texto').value + 'px';
  obj.style.width = document.getElementById('largura_caixa_texto').value + 'px';
  obj.style.borderWidth = document.getElementById('borda_tamanho_caixa_texto').value  + 'px';
  obj.style.backgroundColor = document.getElementById('fundo_caixa_texto').style.backgroundColor;
  obj.style.color = document.getElementById('cor_caixa_texto').style.backgroundColor;
  obj.style.borderColor = document.getElementById('cor_borda_caixa_texto').style.backgroundColor;
  obj.style.borderStyle = document.getElementById('borda_tipo_caixa_texto').value;

  localStorage.borda_tamanho_caixa_texto = document.getElementById('borda_tamanho_caixa_texto').value;
  localStorage.fonte_caixa_texto = document.getElementById('fonte_caixa_texto').value;
  localStorage.altura_caixa_texto = document.getElementById('altura_caixa_texto').value;
  localStorage.largura_caixa_texto = document.getElementById('largura_caixa_texto').value;
  localStorage.texto_caixa_texto = obj.innerHTML;
  localStorage.left_caixa_texto = obj.style.left;
  localStorage.top_caixa_texto = obj.style.top;
  // let teste = obj.style.backgroundColor.split(',')[0].split('(')[1];
  localStorage.fundo_caixa_texto = rgbToHex(obj.style.backgroundColor.split(',')[0].split('(')[1],obj.style.backgroundColor.split(',')[1],obj.style.backgroundColor.split(',')[2].split(')')[0]);// + componentToHex(g) + componentToHex(b);
  localStorage.cor_caixa_texto = rgbToHex(obj.style.color.split(',')[0].split('(')[1],obj.style.color.split(',')[1],obj.style.color.split(',')[2].split(')')[0]);
  localStorage.cor_borda_caixa_texto = rgbToHex(obj.style.borderColor.split(',')[0].split('(')[1],obj.style.borderColor.split(',')[1],obj.style.borderColor.split(',')[2].split(')')[0]);
  localStorage.borda_tipo_caixa_texto = obj.style.borderStyle;
  localStorage.ativo_caixa_texto = document.getElementById('ativo_caixa_texto').checked;

  let dados =  { 
    email: localStorage.email,
    tipo: "box",
    textActive: localStorage.ativo_caixa_texto,
    textHeight: localStorage.altura_caixa_texto,
    textFont: localStorage.fonte_caixa_texto,
    textWidth: localStorage.largura_caixa_texto,
    textBackground: localStorage.fundo_caixa_texto,
    textColor: localStorage.cor_caixa_texto,
    textBorderColor: localStorage.cor_borda_caixa_texto,
    textSizeBorder: localStorage.borda_tamanho_caixa_texto,
    textBorderType: localStorage.borda_tipo_caixa_texto,
    text: localStorage.texto_caixa_texto}

  dados = encodeURIComponent(JSON.stringify(dados));

  xmlhttp = new XMLHttpRequest(); 
   xmlhttp.open("GET","http://localhost:3000/saveDadosUser/" + dados, true);
   xmlhttp.onreadystatechange=function(){
         if (xmlhttp.readyState==4 && xmlhttp.status==200){
           let respemail=xmlhttp.responseText;
         }
   }
   xmlhttp.send();


  if(localStorage.ativo_caixa_texto === "false")
  {
    obj.style.display = "none";
    document.getElementById('ativo_caixa_texto').checked = false;
  }
  else if(localStorage.ativo_caixa_texto === "true")
  {
    obj.style.display = "block";
    document.getElementById('ativo_caixa_texto').checked = true;
  }

  document.getElementById('widget-texto').style.display='none';

}
    
viiny.dragger(obj, {
  onStop: function (e, obj) {
    localStorage.left_caixa_texto = obj.style.left;
    localStorage.top_caixa_texto = obj.style.top;

    let dados = {
    email: localStorage.email,
    tipo: "drag",
    textTop: localStorage.top_caixa_texto,
    textLeft: localStorage.left_caixa_texto}

    dados = encodeURIComponent(JSON.stringify(dados));

  xmlhttp = new XMLHttpRequest(); 
   xmlhttp.open("GET","http://localhost:3000/saveDadosUser/" + dados, true);
   xmlhttp.onreadystatechange=function(){
         if (xmlhttp.readyState==4 && xmlhttp.status==200){
           let respemail=xmlhttp.responseText;
         }
   }
   xmlhttp.send();

  }
});

let index = 0;
function alteraImagem(change) 
{

  links = localStorage.links;
  comentarios = localStorage.comentarios;

  links = links.split(";");
  comentarios = comentarios.split(";");

  links.pop();
  comentarios.pop();

  if (change === 1 || change === -1)
  {
    index = (links.length + index + change)%links.length;
  }
  document.getElementById('slide').src = links[index];
  document.getElementById('cmt_galeria').innerHTML = comentarios[index];
}

function salvaGaleria(e)
{
  localStorage.links = document.getElementById('img-galeria').value;
  localStorage.comentarios = document.getElementById('cmt-galeria').value;
  localStorage.ativo_galeria = document.getElementById('ativo_galeria').checked;

  links = localStorage.links;
  comentarios = localStorage.comentarios;

  links = links.split(";");
  comentarios = comentarios.split(";");

  links.pop();
  comentarios.pop();

  let dados =  { email: localStorage.email, tipo: "gallery", links: localStorage.links, comments: localStorage.comentarios, galleryActive: localStorage.ativo_galeria};
  dados = encodeURIComponent(JSON.stringify(dados));

       xmlhttp = new XMLHttpRequest(); 
   xmlhttp.open("GET","http://localhost:3000/saveDadosUser/" + dados, true);
   xmlhttp.onreadystatechange=function(){
         if (xmlhttp.readyState==4 && xmlhttp.status==200){
           let respemail=xmlhttp.responseText;
         }
   }
   xmlhttp.send();

   if(localStorage.ativo_galeria === "false")
    {
      document.getElementById('ativo_galeria').checked = false;
      document.getElementById('galeria').style.display = "none";
    }
    else if(localStorage.ativo_galeria === "true")
    {
      document.getElementById('galeria').style.display = "block";
      document.getElementById('ativo_galeria').checked = true;
    }
  document.getElementById('slide').src = links[0];
  document.getElementById('cmt_galeria').innerHTML = comentarios[0];
  document.getElementById('widget-galeria').style.display='none'
}

function carregaGaleria(e)
{
  document.getElementById('widget-galeria').style.display='block';
  document.getElementById('img-galeria').value = localStorage.links;
  document.getElementById('cmt-galeria').value = localStorage.comentarios;
}

document.getElementById('proximo').addEventListener('click', function(e) {alteraImagem(1)});

document.getElementById('anterior').addEventListener('click', function(e) {alteraImagem(-1)});

function alteraChao(e) {
    let caminho = e.src.split('chao');
    if(document.body.style.backgroundImage === '')
        document.body.style.backgroundImage = 'url('+e.src+'), url(' + caminho[0] + 'ceu01.jpeg)';
    else{
        let aux = document.body.style.backgroundImage.split(',');
        document.body.style.backgroundImage = 'url('+e.src+'), ' + aux[1];
    }
    localStorage.bg = document.body.style.backgroundImage;

    let dados =  { email: localStorage.email, tipo: "floor", bg: localStorage.bg};
    dados = encodeURIComponent(JSON.stringify(dados));

       xmlhttp = new XMLHttpRequest(); 
   xmlhttp.open("GET","http://localhost:3000/saveDadosUser/" + dados, true);
   xmlhttp.onreadystatechange=function(){
         if (xmlhttp.readyState==4 && xmlhttp.status==200){
           let respemail=xmlhttp.responseText;
         }
   }
   xmlhttp.send();

    document.getElementById('widget-chao').style.display='none';
}
function alteraCeu(e) {
	let caminho = e.src.split('ceu');
  let dados;
    if(document.body.style.backgroundImage === ''){
        document.body.style.backgroundImage = 'url(' + caminho[0] + 'chao01.jpeg), url('+e.src+')';
    }else{
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
    
     dados =  { email: localStorage.email, tipo: "sky", bg: localStorage.bg, skyColor: localStorage.cor_ceu};//localStorage.bg;//+ '+' +localStorage.cor_ceu.replace(/\s/g, '');
    dados = encodeURIComponent(JSON.stringify(dados));

   xmlhttp = new XMLHttpRequest(); 
   xmlhttp.open("GET","http://localhost:3000/saveDadosUser/" + dados, true);
   xmlhttp.onreadystatechange=function(){
         if (xmlhttp.readyState==4 && xmlhttp.status==200){
           let respemail=xmlhttp.responseText;
         }
   }
   xmlhttp.send();

    document.getElementById('widget-ceu').style.display='none';
}