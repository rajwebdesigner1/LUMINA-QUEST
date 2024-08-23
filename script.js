const player = document.getElementById('player');
const puzzle = document.getElementById('puzzle');
const goal = document.getElementById('goal');
const storeModal = document.getElementById('store-modal');
const openStoreBtn = document.getElementById('open-store-btn');
const closeStoreBtn = document.getElementsByClassName('close-store')[0];

// Initialize the level
function initializeLevel() {
    // Set random positions for puzzle and goal
    placePuzzleAndGoal();

    // Generate obstacles
    generateObstacles();
}

// Place puzzle and goal at random positions
function placePuzzleAndGoal() {
    const containerWidth = window.innerWidth - 50;
    const containerHeight = window.innerHeight - 50;

    // Set puzzle position
    puzzle.style.left = `${Math.random() * containerWidth}px`;
    puzzle.style.top = `${Math.random() * containerHeight}px`;

    // Set goal position
    goal.style.left = `${Math.random() * containerWidth}px`;
    goal.style.top = `${Math.random() * containerHeight}px`;
}

// Generate obstacles with random positions
function generateObstacles() {
    // Remove existing obstacles
    const existingObstacles = document.querySelectorAll('.obstacle');
    existingObstacles.forEach(obstacle => obstacle.remove());

    const numObstacles = 5; // Number of obstacles per level
    for (let i = 0; i < numObstacles; i++) {
        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        obstacle.style.width = '30px';
        obstacle.style.height = '30px';
        obstacle.style.backgroundColor = '#888'; 
        obstacle.style.position = 'absolute';
        obstacle.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
        obstacle.style.top = `${Math.random() * (window.innerHeight - 30)}px`;
        document.getElementById('game-container').appendChild(obstacle);
    }
}

// Handle player movement
document.addEventListener('keydown', (event) => {
    const step = 10;
    switch (event.key) {
        case 'ArrowUp':
            player.style.top = `${parseInt(player.style.top || 0) - step}px`;
            break;
        case 'ArrowDown':
            player.style.top = `${parseInt(player.style.top || 0) + step}px`;
            break;
        case 'ArrowLeft':
            player.style.left = `${parseInt(player.style.left || 0) - step}px`;
            break;
        case 'ArrowRight':
            player.style.left = `${parseInt(player.style.left || 0) + step}px`;
            break;
    }
    checkCollisions();
});

// Check for collisions with puzzle, goal, and obstacles
function checkCollisions() {
    const playerRect = player.getBoundingClientRect();
    const puzzleRect = puzzle.getBoundingClientRect();
    const goalRect = goal.getBoundingClientRect();

    // Check if player has reached the puzzle
    if (isColliding(playerRect, puzzleRect)) {
        puzzle.style.backgroundColor = getRandomColor(); // Change puzzle color
        initializeLevel(); // Restart the level after reaching the puzzle
    }

    // Check if player has reached the goal
    if (isColliding(playerRect, goalRect)) {
        alert('Level Completed! Restarting...');
        initializeLevel(); // Restart the level after reaching the goal
    }

    // Check collision with obstacles
    document.querySelectorAll('.obstacle').forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();
        if (isColliding(playerRect, obstacleRect)) {
            alert('You hit an obstacle! Restarting level...');
            initializeLevel(); // Restart the level after hitting an obstacle
        }
    });
}

// Check for collision between two rectangles
function isColliding(rect1, rect2) {
    return !(rect1.right < rect2.left ||
             rect1.left > rect2.right ||
             rect1.bottom < rect2.top ||
             rect1.top > rect2.bottom);
}

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initialize the game
initializeLevel();

// Modal functionality for How to Play
const modal = document.getElementById('modal');
const btn = document.getElementById('how-to-play-btn');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Store modal functionality
openStoreBtn.onclick = function() {
    storeModal.style.display = 'block';
}

closeStoreBtn.onclick = function() {
    storeModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === storeModal) {
        storeModal.style.display = 'none';
    }
}

// Skin selection in the store
document.querySelectorAll('.skin').forEach(skin => {
    skin.onclick = function() {
        const skinColor = skin.dataset.skin;
        player.style.backgroundColor = skin.style.backgroundColor; // Apply selected skin
        alert('Skin changed successfully!');
    }
});
