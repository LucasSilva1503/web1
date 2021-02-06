var current_page = 1;

function procura() {
  //codigo de acesso a API
  var access_token = "dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";
  //pagina atual esta sempre com o valor 1, mas depois deverá ser calculada
  //var current_page = 1; //get_current_page_number();
  //endereço para ir buscar as imagens mais recentes
  var endereco = ("https://api.unsplash.com/photos?per_page=24&page=" + current_page + "&order_by=latest&client_id=" + access_token);

  $.ajax({
    url: endereco,
    type: "get",
    async: true,
    success: function (data, status, response) {
      adicionarImagem(data);
    }
  });
}


  function adicionarImagem(data) {
    $('#contentorImagem').empty();
    //var linkDaPrimeiraImagem = dataResposta[0]["urls"]["regular"];
    //ALERTA SÓ PARA VER QUE JÀ ESTÁ A CONSEGUIR OBTER IMAGENS
    //alert("TENHO IMAGENS!! Por exemplo a primeira tem este link: " + linkDaPrimeiraImagem);

    var arrayDeImagem = data;

    for (var i = 0; i < arrayDeImagem.length; i++) {
      var imagem = arrayDeImagem[i];
      criarImagem(imagem);
    }
  }


  function criarImagem(imagem) {
    // criar h4
    var h4 = document.createElement("h4");
    h4.className = "card-title";
    h4.innerText = imagem.user.name;

    var description = document.createElement("description");
    description.className = "card-text";
    description.innerText = imagem.alt_description;



    // criar div filha
    var div = document.createElement("div");
    div.className = "card-body";
    div.appendChild(h4);

    // criar img
    var img = document.createElement("img");
    img.className = "card-img-top";
    var imgSrc = imagem["urls"]["raw"] + "&fit=crop&w=500&h=500";
    img.setAttribute("src", imgSrc);


    // criar div pai
    var divPrincipal = document.createElement("div");
    divPrincipal.className = "card col-12 col-lg-3 col-md-4 col-sm-6 cardEdit";
    divPrincipal.appendChild(img);
    divPrincipal.appendChild(div);
    divPrincipal.appendChild(description);

    //criar icon 
    var icon = document.createElement("icon");
    icon.className = "card-title";
    icon.innerText = imagem["urls"]["regular"];

    // adicionar div pai à pagina/DOM
    var container = document.getElementById("contentorImagem");
    container.appendChild(divPrincipal);
  }


  function programarCarregamentoPagina() {
    $(window).on("load", procura);
  }

  function anterior() {
    if (current_page == 1)
      alert("NÃO ACEITE");
    else {
      current_page--;
      procura();
    }
  }

  function seguinte() {
    current_page++;
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

  var pagina = 1;