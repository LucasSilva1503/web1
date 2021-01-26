function procura() {
    var endereco = 'https://api.unsplash.com/photos?order_by=latest'
    var enderecoComPagina = endereco + pagina;
  
    $.ajax({
      url : enderecoComPagina,
      type : "get",
      async: true,
      success : function(data, status, response) {
        adicionarImagem(data);
      }
    });
  }
  
  function adicionarImagem(dataResposta) {
    $('#contentorImagem').empty();
  
    var arrayDeImagem = dataResposta.results;
  
    for (var i=0; i<arrayDeImagem.length; i++) {
      var Imagem = arrayDeImagem[i];
      criarImagem(Imagem);
    }
  }
    
  function criarImagem(imagem) {
    var h4 = document.createElement("h4");
    h5.className = "card-title";
    h5.innerText = imagem.title;
  
    // criar div filha
    var div = document.createElement("div");
    div.className = "card-body";
    div.appendChild(h4);
    
    // criar img
    var img = document.createElement("img");
    img.className = "card-img-top";
    var imgSrc = "http://image.tmdb.org/t/p/w185" + filme.poster_path;
    img.setAttribute("src", imgSrc);
  
    // criar div pai
    var divPrincipal = document.createElement("div");
    divPrincipal.className = "card col-3";
    divPrincipal.appendChild(img);
    divPrincipal.appendChild(div);
  
    // adicionar div pai à pagina/DOM
    var container = document.getElementById("contentorFilmes");
    container.appendChild(divPrincipal);
  }
  
  function programarCarregamentoPagina() {
    $(window).on("load", procura);
  }
  
  function anterior() {
    if (pagina == 1)
      alert("NAO PERMITIDO");
    else {
      pagina = pagina - 1;
      procura();
    }
  }
  
  function seguinte() {
    pagina = pagina + 1;
    procura();
  }
  
  function programarBotoesPaginacao() {
    var botaoAnterior = document.getElementById("anterior");
    var botaoSeguinte = document.getElementById("seguinte");
  
    botaoAnterior.addEventListener("click", anterior);
    botaoSeguinte.addEventListener("click", seguinte);
  }
  
  programarCarregamentoPagina();
  programarBotoesPaginacao();
  
  var pagina=1;