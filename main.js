$(document).ready(function(){

	modal = new Modal();
	
	/**
	 * передаем классу модальных окон обработчик 
	 * который необходимо вызвать после открытия 
	 * окна с идентификатором 'callback'
	 */
	modal.setHandler('callback', function(contain){

		// тело функции для постобработки открываемого модального окна

	});

	/**
	 * устанавливаем добытчик получения данных 
	 * для генерации модального окна средствами ajax
	 */
	modal.setGetter('ajax', function(callback, options){

		var results = {};

		// тут тело функции 
		// по получению информации ajax'ом
		// для генерации модального окна

		// создаем промежуточный блок
		var middle = $("<div/>");

		// получаем идентификатор модального окна
		var ident = options.ident;

		// и добавляем его в результаты
		results.ident = ident;

		// создаем тело модального окна
		var contain = $("<div/>", {
			class : 'modal-contain',
			'data-ident' : ident
		});

		// записываем тело в промежуточный блок
		middle.append(contain);
		
		// получаем тело модального окна в html
		if (html = middle.html()) {

			// добавляем html в результаты
			results.html = html;

			// и если все получили успешно то возвращаем
			// данные модального окна обратно
			callback(results);

		}

	});

	/**
	 * устанавливаем добытчик несуществующего окна
	 * на основе данных страницы
	 */
	modal.setGetter('local', function(callback, options){

		var results = {
			ident: options.ident
		};

		// тут тело функции
		// по получению информации
		// для создания модального окна
		// непосредственно из данных на странице

		callback(results);

	});

    $(document).on('click', '.modal-open', function() {

		var ident = $(this).data().ident;
		var handler = $(this).data('handler');
		
		/**
		 * открываем модальное окно с необходимыми
		 * параметрами
		 */
        modal.open(ident, {
			handler: handler,
			url: $(this).attr('href'),
			create: true,
			update: true,
			fillData: {
				'url' : ''
			},
			fillGetter: 'ajax'
		});

        return false;

    });
    
});