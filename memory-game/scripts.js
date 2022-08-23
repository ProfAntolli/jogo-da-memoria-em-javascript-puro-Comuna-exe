const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let fisrtCard, secondCard;

function flipCard() {
	if (lockBoard) return;
	if (this === fisrtCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard){
		//fisrt click
		hasFlippedCard = true;
		fisrtCard = this;
		return;
	} 

	//second click
	hasFlippedCard = false;
	secondCard = this;
	checkForMatch();
	
}

function checkForMatch() {
	let isMatch = fisrtCard.dataset.framework === 
		secondCard.dataset.framework;

	isMatch ? disableCards() : unflipCards();
}

function disableCards(){
	fisrtCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetBoard();
}

function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
				fisrtCard.classList.remove('flip');
				secondCard.classList.remove('flip');
				resetBoard();
	}, 1500);
}

function resetBoard () {
	[hasFlippedCard, lockBoard] = [false, false];
	[fisrtCard, secondCard] = [null, null]
}

(function shuffle() {
	cards.forEach(card =>{
		let randomPos = Math.floor(Math.random() *12);
		card.style.order = randomPos;
	});
})();

cards.forEach(card => card.addEventListener('click', flipCard));