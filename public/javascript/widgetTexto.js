var obj = document.getElementById('div_widget_texto');

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
	obj.style.backgroundColor = localStorage.fundo_caixa_texto;
	document.getElementById('fundo_caixa_texto').value  = localStorage.fundo_caixa_texto;
}

if(localStorage.cor_caixa_texto !== "" && localStorage.cor_caixa_texto !== undefined)
{
	obj.style.color = localStorage.cor_caixa_texto;
	document.getElementById('cor_caixa_texto').value  = localStorage.cor_caixa_texto;
}

if(localStorage.cor_borda_caixa_texto !== "" && localStorage.cor_borda_caixa_texto !== undefined)
{
	obj.style.borderColor = localStorage.cor_borda_caixa_texto;
	document.getElementById('cor_borda_caixa_texto').value  = localStorage.cor_borda_caixa_texto;
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
	localStorage.fundo_caixa_texto = obj.style.backgroundColor;
	localStorage.cor_caixa_texto = obj.style.color;
	localStorage.cor_borda_caixa_texto = obj.style.borderColor;
	localStorage.borda_tipo_caixa_texto = obj.style.borderStyle;
	localStorage.ativo_caixa_texto = document.getElementById('ativo_caixa_texto').checked;
	document.getElementById('widget-texto').style.display='none'
}
		
viiny.dragger(obj, {
	onStop: function (e, obj) {
		localStorage.left_caixa_texto = obj.style.left;
		localStorage.top_caixa_texto = obj.style.top;
  }
});
