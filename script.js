let playerScore = 0;
const cardsContainer = document.getElementById('cardsContainer');
const playerScoreDisplay = document.getElementById('playerScore');
const messageDisplay = document.getElementById('message');
const newCardButton = document.getElementById('newCardButton');
const standButton = document.getElementById('standButton');

// Lista de cartas de la baraja francesa
const deck = [
    { name: '2', value: 2 }, { name: '3', value: 3 }, { name: '4', value: 4 }, { name: '5', value: 5 },
    { name: '6', value: 6 }, { name: '7', value: 7 }, { name: '8', value: 8 }, { name: '9', value: 9 },
    { name: '10', value: 10 }, { name: 'J', value: 10 }, { name: 'Q', value: 10 }, { name: 'K', value: 10 }, { name: 'A', value: 11 }
];

// Suits (Pintas de las cartas)
const suits = ['hearts', 'spades', 'diamonds', 'clubs'];

// Función para obtener una carta aleatoria del mazo
const getRandomCard = () => {
    const randomValue = Math.floor(Math.random() * deck.length);
    const randomSuit = Math.floor(Math.random() * suits.length);
    const card = deck[randomValue];
    const suit = suits[randomSuit];
    return { ...card, suit }; // Devuelve la carta con valor y suit (pinta)
};

// Función para añadir una carta a la mano del jugador
const addCardToPlayer = () => {
    const card = getRandomCard();
    const cardElement = document.createElement('img');
    cardElement.classList.add('card');
    cardElement.src = `./images/${card.name}_of_${card.suit}.png`;
    console.log(`Card added: ${cardElement.src}`); // Esto debería mostrar la ruta correcta en la consola

    cardsContainer.appendChild(cardElement);
    
    playerScore += card.value;
    playerScoreDisplay.textContent = playerScore;

    if (playerScore === 21) {
        endGame("¡Ganaste! Tienes 21.");
    } else if (playerScore > 21) {
        endGame("¡Perdiste! Te pasaste de 21.");
    }
};

// Función para finalizar el juego
const endGame = (message) => {
    messageDisplay.textContent = message;
    newCardButton.disabled = true;
    standButton.disabled = true;
};

// Función para plantarse (terminar turno)
const stand = () => {
    if (playerScore < 21) {
        endGame("Te has plantado con " + playerScore + " puntos.");
    }
};

// Reiniciar el juego
const resetGame = () => {
    playerScore = 0;
    playerScoreDisplay.textContent = playerScore;
    messageDisplay.textContent = "Haz clic en 'Nueva Carta' para empezar";
    cardsContainer.innerHTML = '';
    newCardButton.disabled = false;
    standButton.disabled = false;
};

// Añadir eventos a los botones
newCardButton.addEventListener('click', addCardToPlayer);
standButton.addEventListener('click', stand);

// Inicializar el juego
resetGame();
