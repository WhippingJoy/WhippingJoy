const game = document.getElementById('game');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');

let score = 0;

function createVegetable() {
    const vegetable = document.createElement('div');
    vegetable.classList.add('vegetable');
    vegetable.style.backgroundColor = getRandomColor();
    vegetable.style.top = '0px';
    vegetable.style.left = Math.random() * (game.clientWidth - 40) + 'px';
    game.appendChild(vegetable);
    dropVegetable(vegetable);
}

function dropVegetable(vegetable) {
    let position = 0;
    const fallInterval = setInterval(() => {
        position += 5;
        vegetable.style.top = position + 'px';

        if (position > game.clientHeight) {
            clearInterval(fallInterval);
            vegetable.remove();
        }

        // Check if caught
        if (position + 40 >= game.clientHeight - 20 &&
            parseInt(vegetable.style.left) + 40 > parseInt(basket.style.left) - 40 &&
            parseInt(vegetable.style.left) < parseInt(basket.style.left) + 80) {
            clearInterval(fallInterval);
            vegetable.remove();
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }, 100);
}

function getRandomColor() {
    const colors = ['#f44336', '#4caf50', '#ffeb3b', '#2196f3', '#ff9800'];
    return colors[Math.floor(Math.random() * colors.length)];
}

setInterval(createVegetable, 1000);

document.addEventListener('mousemove', (e) => {
    basket.style.left = e.clientX - 40 + 'px';
});
