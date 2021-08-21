$(document).ready(function () { // проверяем загрузилась ли страница
	let currentFloor = 2; // текущий этаж
	let counterUp = $('.counter-up'); // кнопка увеличения этажа
	let counterDown = $('.counter-down'); // кнопка уменьшения этажа
	let floorPath = $('.home-image path') // подсвечиваемые этажы в SVG
	let buttonPrimary = $('.button-primary');
	let modal = $('.modal');
	let modalClose = $('.modal-close-button');
	let modalCounter = $('.modal-counter');
	let currentFlat = 0;
	let flatsPath = $('.flats path').toArray();
	let flatsLinks = $('.flat-link').toArray();


	showCurrentFloor(); // Подсвечиваем этаж при загрузке страницы.

	// Подсвечиваем этаж при наведении и записываем значение в счётчик
	floorPath.on('mouseover', function () {

		floorPath.removeClass('current-floor');
		$(this).addClass('current-floor');

		currentFloor = $(this).attr('data-floor');
		$('.counter').text(currentFloor);
	});

	// Функция для подсветки этажей при измении в счётчике
	function showCurrentFloor(step = 'pageLoad') {
		
		if(step== 'up') { // проверяем переданный параметр
			if (currentFloor < 18) { // проверяем, значние этажа
				currentFloor++;
			}
		} else if(step == 'down') { // проверяем переданный параметр
			if (currentFloor > 2) { // проверяем, значние этажа
				currentFloor--;
			}
		} else if(step == 'pageLoad'){ // проверяем переданный параметр. Выполнится по умолчанию, если значение не передано.
			// пустое условие - подсечиваем этаж при загрузке страницы
		}

		let usCurrentFloor = currentFloor.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false }); // форматируем переменную этажа, чтобы было 01, а не 1

		$('.counter').text(usCurrentFloor); // записываем зачение этажа в счётчик на странице
			floorPath.removeClass('current-floor'); // очищаем классы у path 
		$(`[data-floor=${usCurrentFloor}]`).addClass('current-floor'); // добавляем класс подсветки текущему этажу

		return usCurrentFloor;
	}

	counterUp.on('click', function () { // отслеживаем нажатие на кнопку вверх
		showCurrentFloor('up'); // вызываем функцию подсветки этажа с необходимым параметром
	});

	counterDown.on('click', function () { // отслеживаем нажатие на кнопку вниз
		showCurrentFloor('down'); // вызываем функцию подсветки этажа с необходимым параметром
	});


	// Модальное окно
	floorPath.on('click', toggleModal); //отслеживаниемнажатие по этажу
	modalClose.on('click', toggleModal); //отслеживаниемнажатие по кнопке закрытия
	buttonPrimary.on('click', toggleModal) //отслеживаниемнажатие по кнопке под счётчиком

	function toggleModal() {
		modalCounter.text(showCurrentFloor) // подставляем номер этажа в модельное окно
		modal.toggleClass('is-open'); // добавляем и убираем класс модальному окну
	}

	$(flatsPath).on('mouseover', function(e) {
		let flatPathIndex = flatsPath.indexOf(this);
		showCurrenFlat(flatPathIndex);
	});

	$(flatsLinks).on('mouseover', function(e) {
		let flatLinkIndex = flatsLinks.indexOf(this);
		showCurrenFlat(flatLinkIndex);
	});

	function showCurrenFlat(index) {
	currentFlat = index;

		$('.flats path').removeClass('active')
		$('.flat-link').removeClass('flat-link-active')

		$(flatsLinks[currentFlat]).addClass('flat-link-active');
		$(flatsPath[currentFlat]).addClass('active');
	}
});