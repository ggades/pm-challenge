'use strict';

var Letsbook = function () {
	var Public = {
		init: function init() {
			// Inject CSS
			Public.appendCSS();
			Public.changeLogo();

			// Insert Modal
			Public.insertModal();

			// Events
			Public.addButtonEvents();
		},

		// Change the header logo
		changeLogo: function changeLogo() {
			var img = document.querySelector('#navContent img');
			img.src = 'https://i.imgur.com/VMNACWl.png';
		},

		// Function to inject the custom CSS on the page
		appendCSS: function appendCSS() {
			var css = document.createElement('style');
			css.type = "text/css";
			css.rel = "stylesheet";
			css.innerHTML = '#navContent img{margin-top:-18px!important}.mcolor-header{background-color:#F6534C;color:#FFF}.mcolor-cliente-principal-bg{background-color:#302C29}.mcolor-busca-bright,.mcolor-busca-bright:hover,.mcolor-cliente-principal-bg-hover2:hover{background-color:#493E38}.bloco-seletor-adulto-selected,.bloco-seletor-crianca-selected{background-color:#493E38!important}#busca-calendario .celulaData.endDate,#busca-calendario .celulaData.startDate,#busca-calendario .celulaData:hover,#busca-calendario .inBetweenDate:hover,.mcolor-action-btn,.mcolor-action-btn:hover,.modal-promo-content .promo .btn{background-color:#F6534C!important}#adultos:hover,#caminho ul li a,#criancas:hover,#datas:hover,#destino:hover,#modificarBusca:hover,.mcolor-label-text,.mcolor-label-text2{color:#F6534C}#busca-promocode-label{color:#FFF}.gridDatas .blocoData{width:45px}#busca-calendario .celulaData:hover,#busca-calendario .inBetweenDate:hover{border-radius:5px}#busca-calendario .celulaData.startDate,#busca-calendario .celulaData.startDate:hover{border-radius:50px 0 0 50px}#busca-calendario .celulaData.endDate,#busca-calendario .celulaData.endDate:hover{border-radius:0 50px 50px 0}#busca-calendario .inBetweenDate{background-color:#493E38}.page-content{background:0 0;box-shadow:none!important}#listagemHoteis .itemHotel{width:30%;min-height:510px;margin-left:4.5%;box-shadow:2px 3px 6px #d3d3d3;padding:20px;background-color:#FFF;box-sizing:border-box;border-radius:8px}#listagemHoteis .itemHotelContent{height:auto;clear:both;margin:0}#listagemHoteis .itemHotel:first-child{margin-left:0}.itemHotelContent .itemVarNomeHotel{font-size:20px;min-height:55px}.tituloHotel{height:auto}.itemHotelContent .blocoReserve{position:relative;background-color:transparent;float:left;width:100%;min-height:45px}.itemHotel .slider-imagens-hotel{float:none;margin:0 10px 10px}.icoAcomodacaoUmaPessoa{width:40px}.hoteis-ico-mais-pessoas{font-size:12px;top:3px;left:18px}.itemHotelContent .infoAcomodacao{margin:25px 0}.itemHotelContent .infoAcomodacao .itemVarDescricaoAcomodacao{margin-left:40px}#listagemHoteis .itemHotel:last-child{padding:20px}.itemHotelContent .blocoReserve .itemVarValorSemDesconto,.valorContainer{width:50%;float:left;text-align:left;clear:left}.valorContainer{width:45%}.itemHotelContent .blocoReserve .itemVarValorFinal{float:left;margin:0}.itemHotelContent .blocoReserve .itemBtnEfetuarReserva{position:absolute;top:0;right:0;margin:0}.itemHotelContent .itemBtnMaisAcomodacoes{margin-top:15px;display:block;text-align:center;width:100%}.itemVarValorAuxiliar{margin:0;float:left}.modal-promo{display:none;position:fixed;z-index:999999;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.8)}.modal-promo-content{background-color:#fefefe;margin:10% auto;padding:30px 20px;width:970px;height:550px;position:fixed;left:calc(50% - 485px);border-radius:8px;box-shadow:0 0 20px #666;box-sizing:border-box}.modal-hotel-list{max-height:430px;overflow-y:auto}.modal-promo-content h1{padding-left:35px;margin-bottom:25px;text-transform:uppercase;font-size:25px}.modal-promo-content .close{position:absolute;top:-55px;right:0;background:url(content/img/sprite-modal.png) no-repeat;display:block;width:40px;height:40px;border:0;color:#FFF;font-size:35px;cursor:pointer}.modal-promo-content ul{list-style:none;padding:0;margin:15px 0}.modal-promo-content .promo{width:25%;min-height:190px;border-left:1px dotted #CCC;float:left;margin-bottom:35px;box-sizing:border-box;padding:0 35px}.modal-promo-content .promo.no-border{border:0}.modal-promo-content .promo .title{font-weight:700;font-size:15px}.modal-promo-content .promo .new-value,.modal-promo-content .promo .old-value{width:50%;display:inline-block}.modal-promo-content .values{margin-bottom:15px}.modal-promo-content .promo .old-value{text-decoration:line-through;text-align:left;color:#666;font-size:13px}.modal-promo-content .promo .new-value{text-align:right;color:#F46523;font-size:18px}.modal-promo-content .promo .btn{width:135px;height:40px;color:#FFF;text-align:center;text-transform:uppercase;padding:0;border:0;border-radius:5px;font-size:17px;font-weight:500}.itemBtnSelecionarAcomodacao,.itemVarDescricaoFormasPagamento,.itemVarPercentualDesconto,.quantidadeDisponivel{display:none!important}';
			document.body.appendChild(css);
		},

		// Add custom event for "reserve" button and close modal
		addButtonEvents: function addButtonEvents() {
			var buttons = document.querySelectorAll('.itemBtnMaisAcomodacoes');

			for (var i = 0; i < buttons.length; i++) {
				if (buttons[i]) {
					(function () {
						// Get hotel ID from source code
						var hotelID = buttons[i].getAttribute('onclick');
						hotelID = hotelID.split('('); // explode string to get the ID
						hotelID = hotelID[1].substr(0, 1); // select only the first character of index 1

						// Remove onclick attr from HTML
						buttons[i].setAttribute('onclick', 'javascript:void(0)');

						// Dispatch events
						buttons[i].addEventListener('click', function (e) {
							e.preventDefault();
							Public.requestHotelInfo(hotelID);
							return false;
						});
					})();
				}
			}

			document.querySelector('#closeModal').addEventListener('click', function (e) {
				e.preventDefault();
				Public.toggleModal();
				return false;
			});
		},

		// Request hotel info to build modal
		requestHotelInfo: function requestHotelInfo(id) {
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function () {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200) Public.buildModalContent(JSON.parse(xmlHttp.responseText));
			};
			xmlHttp.open('GET', 'https://www.pmweb.com.br/cro/promocoes/' + id + '.json', true);
			xmlHttp.send(null);

			// Open modal
			Public.toggleModal();
		},

		// Open or close hotel promo modal
		toggleModal: function toggleModal() {
			var modal = document.querySelector('.modal-promo');
			var modalHotelList = document.querySelector('.modal-hotel-list');

			if (modal.style.display == '' || modal.style.display == 'none') {
				modal.style.display = 'block';
			} else {
				modal.style.display = 'none';

				// reset hotel list
				modalHotelList.innerHTML = '';
			}
		},

		// Insert blank modal on page
		insertModal: function insertModal() {
			var modal = document.createElement('div');
			var modalContent = document.createElement('div');
			var hotelList = document.createElement('div');

			modal.className = 'modal-promo';
			modalContent.className = 'modal-promo-content';
			modalContent.innerHTML = '<h1>Promoções</h1><button id="closeModal" class="close"></button>';
			hotelList.className = 'modal-hotel-list';

			document.body.appendChild(modal);
			modal.appendChild(modalContent);
			modalContent.appendChild(hotelList);
		},

		buildModalContent: function buildModalContent(response) {
			var modalContent = document.querySelector('.modal-hotel-list');
			var promoContent = '';

			for (var i = 0; i < response.length; i++) {
				// Build the promo description list
				var descriptionContent = '';
				for (var k = 0; k < response[i].DescricaoTarifa.length; k++) {
					descriptionContent += '<li>- ' + response[i].DescricaoTarifa[k] + '</li>';
				}

				// Build the promo HTML
				var className = i % 4 == 0 ? 'no-border' : '';
				promoContent += '<div class="promo ' + className + '">' + '<div class="title">' + response[i].NomeTarifa + '</div>' + '<ul>' + descriptionContent + '</ul>' + '<div class="values">' + '<div class="old-value">' + Public.maskPrice(response[i].ValorTarifaSemDesconto) + '</div>' + '<div class="new-value">' + Public.maskPrice(response[i].ValorTarifa) + '</div>' + '</div>' + '<div><button class="btn">Reservar</button></div>' + '</div>';
			}

			modalContent.innerHTML = promoContent;
		},

		maskPrice: function maskPrice(value) {
			var valueReturn = 'R$ ' + value + ',00';
			return valueReturn;
		}
	};
	return Public;
}();
Letsbook.init();
