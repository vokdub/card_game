var nineRandom = [];//Для выбора карт
var dataBase = [];//Хранит номинал карты на каждой позиции
var flag = 0;//Увеличивается на один при каждом клике по карте, при втором клике запускает проверку
var checkBox = [];//Хранит номиналы карт для проверки на тождественность
var numberOfOpenPairs = 0;//Название говорит само за себя
var error = false;//булева переменная, которая приобретает значение true
// если срандомленная карта соответствует одной из срандомленных ранее
var grades = 0;//очки
//Выбирает девять рандомных карт
for(i = 0 ; i < 9 ; i++){
	nRandom(i);
}
function nRandom(i) {
	nineRandom[i] = Math.floor(Math.random() * (51 + 1)) ;
	console.log(nineRandom[i]);
	if (i > 0){
		for(j = 0 ; j < nineRandom.length-1 ; j++){
			if(nineRandom[i] == nineRandom[j]){
				error = true;
			}
		}
	}
	if(error == true){
		error = false;
		console.log('errrr');
		nRandom(i);		
	}
	else{
		for(k = 0 ; k < 2 ; k++){
			places();
		}	
	}
}
 // а вот собственно замена
 for(i = 0 ; i < 18 ; i++){
	var img = document.getElementById('front'+(i+1)); // добываем ссылку на элемент (например, по id)
	img.src = 'Cards/'+dataBase[i]+'.png';
}
//Расставляет по рандомным местам срандомленные карты
function places() {
	place = Math.floor(Math.random() * (18)) ;
	console.log(place+'+');
	if(dataBase[place]==null){
		dataBase[place] = nineRandom[i];
		console.log(dataBase[place]+' '+place);	
	}
	else{
		places();
	}
}
//Первые пять секунд держит карты открытыми, затем переворачитвает
setTimeout(firstDeal, 5000);
function firstDeal() {
	var elements = document.getElementsByClassName('picture');
	for (i = 0; i < elements.length; i++) {
		elements[i].style.display = 'none';
	}
	var elements = document.getElementsByClassName('pictureback');
	for (i = 0; i < elements.length; i++) {
		elements[i].style.display = 'block';
	}
}
var indexes = [];//каждые два клика сохраняет индекс кликнутой картинки
//Выполняет переворот карты  И  ждет двух открытых  И    закрывает
function screenB(backObj,index) {
	if(flag != 2){
		if (indexes[0] == null){
			indexes[0] = index;
		}
		else{
			indexes[1] = index;
		}
		var changableCard = document.getElementById('backObj'); // добываем ссылку на элемент (например, по id)
		backObj.style.display = 'none';
		var changableCardTwo = document.getElementById('front' + (index+1)); // добываем ссылку на элемент (например, по id)
		changableCardTwo.style.display = 'block';
		//при втором клике запускает проверку
		checkBox[flag] = dataBase[index];
		flag++;
		if(flag == 2){			
			if(checkBox[0] == checkBox[1]){
				setTimeout(disappear,1000);
				function disappear() {
					var changableCard = document.getElementById('front' + (indexes[0]+1)); // добываем ссылку на элемент (например, по id)
					changableCard.style.visibility = 'hidden';
				var changableCardTwo = document.getElementById('front' + (indexes[1]+1)); // добываем ссылку на элемент (например, по id)
				changableCardTwo.style.visibility = 'hidden';
				numberOfOpenPairs += 1;				
				grades = grades + ((9 - numberOfOpenPairs) * 42);	
				var record = document.getElementById('grades');
				record.innerHTML = grades;		
				console.log(grades);
				if(numberOfOpenPairs == 9){
					setTimeout(nextPage,1000);
				}
				indexes.length=0;
				flag = 0;
				console.log(numberOfOpenPairs);	
			}
		}
		else{			
			setTimeout(turnOff, 600);
		}
	}
}
}
//  ФИЧА (не костыль) для передачи переменой с количеством очков
function nextPage() {
	document.location.href='lastPage.html?per='+grades;
}
//Закрывает не совпадающие карты
function turnOff() {
	grades = grades - numberOfOpenPairs * 42;
	console.log(grades);
	var record = document.getElementById('grades');
				record.innerHTML = grades;
	console.log(indexes[0]+'  '+indexes[1]);
	var changableCard = document.getElementById('front' + (indexes[0]+1)); // добываем ссылку на элемент по id
	changableCard.style.display = 'none';
	var changableCardTwo = document.getElementById('front' + (indexes[1]+1)); // добываем ссылку на элемент по id
	changableCardTwo.style.display = 'none';
	var changableCard = document.getElementById('back' + (indexes[0]+1)); // добываем ссылку на элемент по id
	changableCard.style.display = 'block';
	var changableCardTwo = document.getElementById('back' + (indexes[1]+1)); // добываем ссылку на элемент по id
	changableCardTwo.style.display = 'block';
	indexes.length=0;
	flag = 0;
}