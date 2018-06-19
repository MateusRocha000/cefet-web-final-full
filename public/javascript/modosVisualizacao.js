if(localStorage.visualizacao !== "" && localStorage.visualizacao !== undefined){
    document.getElementById('mudarVisualizacao-botao').innerText = localStorage.visualizacao;
    if (document.getElementById('mudarVisualizacao-botao').innerText==='Mudar para modo de edição') {
        document.getElementById('widget-chao-botao').style.display='none';
        document.getElementById('widget-ceu-botao').style.display='none';
        document.getElementById('widget-galeria-botao').style.display='none';
        document.getElementById('widget-texto-botao').style.display='none';
    } else if (document.getElementById('mudarVisualizacao-botao').innerText==='Mudar para modo de visualização') {
        document.getElementById('widget-chao-botao').style.display='inline-block';
        document.getElementById('widget-ceu-botao').style.display='inline-block';
        document.getElementById('widget-galeria-botao').style.display='inline-block';
        document.getElementById('widget-texto-botao').style.display='inline-block';
    }
}else
    localStorage.visualizacao = 'Mudar para modo de edição';

function modosVisualizacao() {

    if (document.getElementById('mudarVisualizacao-botao').innerText==='Mudar para modo de edição') {
        document.getElementById('widget-chao-botao').style.display='inline-block';
        document.getElementById('widget-ceu-botao').style.display='inline-block';
        document.getElementById('widget-galeria-botao').style.display='inline-block';
        document.getElementById('widget-texto-botao').style.display='inline-block';
        document.getElementById('mudarVisualizacao-botao').innerText='Mudar para modo de visualização';
        localStorage.visualizacao = 'Mudar para modo de visualização';
    } else {
        document.getElementById('widget-chao-botao').style.display='none';
        document.getElementById('widget-ceu-botao').style.display='none';
        document.getElementById('widget-galeria-botao').style.display='none';
        document.getElementById('widget-texto-botao').style.display='none';
        document.getElementById('mudarVisualizacao-botao').innerText='Mudar para modo de edição';
        localStorage.visualizacao = 'Mudar para modo de edição';
    }
}
