const Letsbook = (function() {
	const Public = {
		init: function(){
      // Inject CSS
      Public.appendCSS();
      Public.changeLogo();

			// Insert Modal
      Public.insertModal();

      // Events
      Public.addButtonEvents();
		},

    // Change the header logo
    changeLogo: function(){
      const img = document.querySelector('#navContent img');
      img.src = 'https://i.imgur.com/VMNACWl.png';
    },

    appendCSS: function() {
      const css = document.createElement('link');
      css.type = "text/css";
      css.rel = "stylesheet";
      css.href = 'challenge.css';
      document.body.appendChild(css);
    },

    // Add custom event for "reserve" button and close modal
    addButtonEvents: function() {
      const buttons = document.querySelectorAll('.itemBtnMaisAcomodacoes');

      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i]) {
					// Get hotel ID from source code
					let hotelID = buttons[i].getAttribute('onclick');
					hotelID = hotelID.split('('); // explode string to get the ID
					hotelID = hotelID[1].substr(0,1); // select only the first character of index 1

					// Remove onclick attr from HTML
					buttons[i].setAttribute('onclick', 'javascript:void(0)');

					// Dispatch events
          buttons[i].addEventListener('click', function(e){
            e.preventDefault();
            Public.requestHotelInfo(hotelID);
            return false;
          });
        }
      }

			document.querySelector('#closeModal').addEventListener('click', function(e){
				e.preventDefault();
				Public.toggleModal();
				return false;
			});
    },

    // Request hotel info to build modal
    requestHotelInfo: function(id) {
			const xmlHttp = new XMLHttpRequest();
	    xmlHttp.onreadystatechange = function() {
	    	if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	      	Public.buildModalContent(JSON.parse(xmlHttp.responseText));
	    }
	    // xmlHttp.open('GET', `https://www.pmweb.com.br/teste-cro/promocoes/${id}.json`, true);
			xmlHttp.open('GET', 'http://localhost:3000/promo.json', true);
	    xmlHttp.send(null);

			// Open modal
  		Public.toggleModal();
    },

		// Open or close hotel promo modal
		toggleModal: function() {
			const modal = document.querySelector('.modal-promo');
			const modalHotelList = document.querySelector('.modal-hotel-list');

      if (modal.style.display == '' || modal.style.display == 'none') {
        modal.style.display = 'block';
      } else {
        modal.style.display = 'none';

				// reset hotel list
				modalHotelList.innerHTML = '';
      }
		},

    // Insert blank modal on page
    insertModal: function() {
      const modal = document.createElement('div');
      const modalContent = document.createElement('div');
			const hotelList = document.createElement('div');

      modal.className = 'modal-promo';
      modalContent.className = 'modal-promo-content';
			modalContent.innerHTML = '<h1>Promoções</h1><button id="closeModal" class="close"></button>';
			hotelList.className = 'modal-hotel-list';

      document.body.appendChild(modal);
      modal.appendChild(modalContent);
			modalContent.appendChild(hotelList);
    },

		buildModalContent: function(response) {
			const modalContent = document.querySelector('.modal-hotel-list');
			let promoContent = '';

			for (let i = 0; i < response.length; i++) {
				// Build the promo description list
				let descriptionContent = '';
				for (let k = 0; k < response[i].DescricaoTarifa.length; k++) {
					descriptionContent += '<li>- '+response[i].DescricaoTarifa[k]+'</li>';
				}

				// Build the promo HTML
				let className =  i % 4 == 0 ? 'no-border' : '';
				promoContent += '<div class="promo '+className+'">'+
					'<div class="title">'+response[i].NomeTarifa+'</div>'+
					'<ul>'+descriptionContent+'</ul>'+
					'<div class="values">'+
						'<div class="old-value">'+Public.maskPrice(response[i].ValorTarifaSemDesconto)+'</div>'+
						'<div class="new-value">'+Public.maskPrice(response[i].ValorTarifa)+'</div>'+
					'</div>'+
					'<div><button class="btn">Reservar</button></div>'+
				'</div>';
			}

			modalContent.innerHTML = promoContent;
		},

		maskPrice: function (value) {
			const valueReturn = 'R$ '+value+',00';
			return valueReturn;
		}
  }
	return Public;
})();
Letsbook.init();
