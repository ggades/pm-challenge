const Letsbook = (function() {
	const Public = {
		init: function(){
      // Inject CSS
      Public.appendCSS();
      Public.changeLogo();

      // Events
      Public.removeButtonEvent();
		},

    changeLogo: function(){
      const img = document.querySelector('#navContent img');
      img.src = 'https://i.imgur.com/VMNACWl.png';
    },

    appendCSS: function() {
      const css = document.createElement('style');
      css.type = "text/css";
      css.rel = "stylesheet";
      css.innerHTML = '#navContent img{margin-top:-18px!important}.mcolor-header{background-color:#F6534C;color:#FFF}.mcolor-cliente-principal-bg{background-color:#302C29}.mcolor-busca-bright,.mcolor-busca-bright:hover,.mcolor-cliente-principal-bg-hover2:hover{background-color:#493E38}.bloco-seletor-adulto-selected,.bloco-seletor-crianca-selected{background-color:#493E38!important}#busca-calendario .celulaData.endDate,#busca-calendario .celulaData.startDate,#busca-calendario .celulaData:hover,#busca-calendario .inBetweenDate:hover,.mcolor-action-btn,.mcolor-action-btn:hover{background-color:#F6534C!important}#caminho ul li a,.mcolor-label-text,.mcolor-label-text2{color:#F6534C}#busca-promocode-label{color:#FFF}.gridDatas .blocoData{width:45px}#busca-calendario .celulaData:hover,#busca-calendario .inBetweenDate:hover{border-radius:5px}#busca-calendario .celulaData.startDate,#busca-calendario .celulaData.startDate:hover{border-radius:50px 0 0 50px}#busca-calendario .celulaData.endDate,#busca-calendario .celulaData.endDate:hover{border-radius:0 50px 50px 0}#busca-calendario .inBetweenDate{background-color:#493E38}.page-content{background:0 0;box-shadow:none!important}#listagemHoteis .itemHotel{width:30%;min-height:510px;margin-left:4.5%;box-shadow:2px 3px 6px #d3d3d3;padding:20px;background-color:#FFF;box-sizing:border-box;border-radius:8px}#listagemHoteis .itemHotelContent{height:auto;clear:both;margin:0}#listagemHoteis .itemHotel:first-child{margin-left:0}.itemHotelContent .itemVarNomeHotel{font-size:20px;min-height:55px}.tituloHotel{height:auto}.itemHotelContent .blocoReserve{position:relative;background-color:transparent;float:left;width:100%;min-height:45px}.itemHotel .slider-imagens-hotel{float:none;margin:0 10px 10px}.icoAcomodacaoUmaPessoa{width:40px}.hoteis-ico-mais-pessoas{font-size:12px;top:3px;left:18px}.itemHotelContent .infoAcomodacao{margin:25px 0}.itemHotelContent .infoAcomodacao .itemVarDescricaoAcomodacao{margin-left:40px}#listagemHoteis .itemHotel:last-child{padding:20px}.itemHotelContent .blocoReserve .itemVarValorSemDesconto,.valorContainer{width:50%;float:left;text-align:left;clear:left}.valorContainer{width:45%}.itemHotelContent .blocoReserve .itemVarValorFinal{float:left;margin:0}.itemHotelContent .blocoReserve .itemBtnEfetuarReserva{position:absolute;top:0;right:0;margin:0}.itemHotelContent .itemBtnMaisAcomodacoes{margin-top:15px;display:block;text-align:center;width:100%}.itemVarValorAuxiliar{margin:0;float:left}.itemBtnSelecionarAcomodacao,.itemVarDescricaoFormasPagamento,.itemVarPercentualDesconto,.quantidadeDisponivel{display:none!important}';
      document.body.appendChild(css);
    },

    removeButtonEvent: function() {
      const buttons = document.querySelectorAll('.itemBtnMaisAcomodacoes');

      for (i in buttons) {
        if(buttons[i]) {
          buttons[i].setAttribute('onclick', 'javascript:void(0)');
          buttons[i].addEventListener('click', function(e){
            e.preventDefault();
            Public.requestHotelInfo();
            return false;
          });
        }
      }
    },

    requestHotelInfo: function() {
      alert('Yoloooo!');
    },
  }
	return Public;
})();
Letsbook.init();
