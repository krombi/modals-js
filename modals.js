/**
 * своего рода класс для обработки исключений модальных окон
 */
ModalException = function(message)
{

	this.message = message;

}

/**
 * своего рода класс для работы с модальными окнами
 */
Modal = function(options = {})
{

	var app = this;

    /**
     * свойство хранящее состояние окон
     * открыты или закрыты
     */
	this.opened = false;

    /**
     * свойство хранящее путь
     * модальных окон между собой
     */
    this.way = [];

    /**
     * свойство хранящее в себе функции
     * которые необходимо выполнять после открытия 
     * соответствующих окон
     */
	this.handlers = [];
	
	/**
	 * свойство хранящее функцию получения информаци 
	 * в слуае отсутствия необходимого модального окна
	 * или его принудительного создания
	 */
	this.getters = [];

    /**
     * дефолтные опции 
     */
    this.options = {
        frame : 'modals',
        wrapper : 'modal-wrapper',
		contain : 'modal-contain',
		history : false
    };

    /**
     * переопределяем дефольтные опции
     */
	this.options = Object.assign(this.options, options);
	
	/**
	 * получаем блок который содержит в себе все модальные окна
	 */
	this.frame = document.getElementById(this.options.frame);

	/**
	 * свойство хранящее в себе данные текущего открываемого окна
	 * intermediate data
	 */
	this.interdata = {};

    /**
     * метод открытия модального окна
     */
    this.open = function (ident, data = {})
    {

		app.interdata = data;

		try {

			app.preOpen(ident);

			// сюда мы попадаем только в случае отстутсвия ошибок 
			// с созданием или обновлением модальных окон

			// заново берем элемент модального окна
			var window = this.getModal(ident);

			if (window) {

				// получаем родителя элемента
				var parent = window.parentNode;

				if (!app.opened) {
	
					// открываем неободимое модальное окно
		
				} else {
	
					// осуществляем переход между модальными окнами
		
				}

			} else {

				throw new ModalException('Попытка открыть несуществующее модальное окно!');

			}

		} catch (e) {

			console.error(e.message);

		}

	}

	/**
	 * метод для создание или обновления модального окна
	 * при необходимости
	 */
	this.preOpen = function (ident)
	{
		
		var window = this.getModal(ident);
		var data = app.interdata;
		
		if (window) {

			var parent = window.parentNode;

			if (data.update) {

				app.prepare(ident, function(html){

					app.update(parent, html);

				});

			}

		} else {

			if (data.create) {

				app.prepare(ident, function(html){

					app.create(html);

				});

			}

		}

	}

	/**
	 * метод подготовки модального окна
	 */
	this.prepare = function (ident, callback) 
	{

		var data = app.interdata;

		if (data.fillGetter && app.getters[data.fillGetter]) {

			var options = {
				ident: ident
			};

			if (data.fillData && app.isObject(data.fillData) && Object.entries(data.fillData).length) {

				Object.assign(options, data.fillData);

			}

			app.getters[data.fillGetter](function(data){

				// создаем блок для обертки
				var middle = document.createElement('div');

				// добавляем в него тело модального окна
				if (data.html) {
		
					middle.innerHTML = data.html;
		
				}

				if (data.ident && middle.querySelector('.' + app.options.contain + '[data-ident="' + data.ident + '"]')) {

					callback(middle.innerHTML);

				} else {

					throw new ModalException('Ошибка получения контейнера модального окна!');

				}

			}, options);

		}

	}

	/**
	 * метод получения элемента модального окна
	 */
	this.getModal = function (ident)
	{

		return app.frame.querySelector('.' + app.options.contain + '[data-ident="' + ident + '"]');

	}

	/**
	 * метод добавления нового модального окна
	 */
	this.create = function (html)
	{

		var wrapper = document.createElement('div');
		wrapper.classList.add(app.options.wrapper);

		wrapper.innerHTML = html;

		app.frame.appendChild(wrapper);

	}

	/**
	 * метод обновления тела сущесвующего модального окна
	 */
	this.update = function (perent, html)
	{

		perent.innerHTML = html;

	}

	/**
	 * метод закрытия модального окна
	 */
	this.close = function (ident)
	{


		// обнуляем промежуточные данные
		app.interdata = {};

	}

	/**
	 * метод для установки обработчика
	 * для получения html каркаса создаваемого 
	 * модального окна
	 */
	this.setGetter = function (key, handler)
	{

		if (app.isFunction(handler)) {

			app.getters[key] = handler;
			
		}

	}

	/**
	 * метод для установки обработчика модального окна
	 * после его открытия
	 */
	this.setHandler = function (key, handler)
	{

		if (app.isFunction(handler)) {

			app.handlers[key] = handler;

		}

	}

	/**
	 * метод проверки является ли значение объектом
	 */
	this.isObject = function (value) {

		return value && typeof value === 'object' && value.constructor === Object;

	}

	/**
	 * метод проверки является ли значение функцией
	 */
	this.isFunction = function (value) {

		return typeof value === 'function';

	}

}
