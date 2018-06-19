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
