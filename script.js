'use strict';

function choiceLetter() {
	letter.textContent = LETTERS[Math.floor(Math.random() * LETTERS.length)];
}

function start(s) {
	let timer = setInterval(function() {
		letter.style.top = counter + 'px';
		counter += 2;

		if (counter >= 400) {
			lifeDrop();
		}
	}, s);

	return timer;
}

function renew() {
	choiceLetter();
	counter = 0;
}

function scoreRise() {
	score++;
	scoreField.textContent = score;
	renew();
	root.style = 'box-shadow: 0 0 50px 20px #0f0';

	if (score % 20 === 0) {
		clearInterval(timer);
		speed--;
		timer = start(speed);
	}

	setTimeout(function() {
		root.style = 'box-shadow: none';
	}, 300);
}

function lifeDrop() {
	life--;
	lifeField.textContent = life;
	renew();
	root.style = 'box-shadow: 0 0 50px 20px #f00';

	if (life <= 0) {
		clearInterval(timer);
		document.removeEventListener('keydown', checkPressedKey);
		endGame.style = 'display: block';
		totalScore.textContent = score;
	}

	setTimeout(function() {
		root.style = 'box-shadow: none';
	}, 300);
}

function checkPressedKey(event) {
	if (event.key === letter.textContent) {
		scoreRise();
	} else {
		lifeDrop();
	}
}

function startNewGame(event) {
	setTimeout(function() {
		score = 0;
		life = 10;
		counter = 0;
		scoreField.textContent = score;
		lifeField.textContent = life;
		endGame.style = 'display: none';
		timer = start(speed);
		document.addEventListener('keydown', checkPressedKey);
	}, 1000);
}

/*
	Main
*/

const LETTERS = ['q','w','e','r','t','y','u','i','o','p',
								 'a','s','d','f','g','h','j','k','l',';','\'',
								 'z','x','c','v','b','n','m',',','.','/'];

const letter = document.querySelector('.letter');
const scoreField = document.querySelector('#score');
const lifeField = document.querySelector('#life');
const root = document.querySelector('.root');
const endGame = document.querySelector('#end-game');
const newGame = document.querySelector('#new-game');
const totalScore = document.querySelector('#total-score');

choiceLetter();

let counter = 0;
let speed = 20;
let score = 0;
let life = 10;

scoreField.textContent = score;
lifeField.textContent = life;

let timer = start(speed);

document.addEventListener('keydown', checkPressedKey);

newGame.addEventListener('click', startNewGame);
