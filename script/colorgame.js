var numSquares = 6;
var colors = [];
var winCounter = 0;
var pickedColor;
var squares = document.querySelectorAll('.square');
var winCounterDisplay = document.getElementById('winCounterDisplay');
var colorDisplay = document.getElementsByClassName('colorDisplay');
var messageDisplay = document.getElementById('message');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');

init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
	for (var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener('click', function(){
			for (var i = 0; i < modeButtons.length; i++) {
				modeButtons[i].classList.remove('selected')
			}
			this.classList.add('selected');
			this.textContent === "Легко" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setupSquares(){
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener('click', function(){
			if(this.style.display!=='None'){
				var clickedColor = this.style.backgroundColor;
				if(clickedColor === pickedColor){
					messageDisplay.textContent = 'Верно!';
					resetButton.textContent = 'Играть снова?';
					changeColors();
					h1.style.backgroundColor = clickedColor;
					document.body.style.backgroundColor = clickedColor;
					winCounter++;
				} else {
					this.style.backgroundColor = '#232020';
					messageDisplay.textContent = 'Нет';
					winCounter = winCounter>0? --winCounter : 0;
				}

				winCounterDisplay.textContent = winCounter;
			}
		});
	}
}

function reset(){
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	for(var x=0; x<3; x++){
		colorDisplay[x].textContent = pickedColor.slice(4,-1).split(",")[x]
	} 
	resetButton.textContent = 'Новые цвета';
	messageDisplay.textContent = ''
	h1.style.backgroundColor = 'rgb(70, 160, 110)'
	document.body.style.backgroundColor = '#232020'
	
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = 'block';
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = 'None';
		}
	}
}

resetButton.addEventListener('click', function(){
	reset();
})

function changeColors(color){
	if(color){
		for (var i = 0; i < squares.length; i++){
			squares[i].style.backgroundColor = color;
		}
	} else {
		for (var i = 0; i < squares.length; i++){
			squares[i].style.display = 'None';
		}
	}
}

function pickColor(){
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = []
	for(var i =0; i < num; i++){
		arr.push(randomColor());
	} 
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random()*256)
	var g = Math.floor(Math.random()*256)
	var b = Math.floor(Math.random()*256);
	return ('rgb(' + r + ', ' + g + ', ' + b +')');
}