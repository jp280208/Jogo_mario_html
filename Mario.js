const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const bullet = document.querySelector('.bullet');
const goomba = document.querySelector('.goomba');
const startBtn = document.querySelector('.start');
const gameOverScreen = document.querySelector('.game-over');
const scoreElement = document.querySelector('.score-value');
const finalScoreElement = document.querySelector('.final-score');
const timeElement = document.querySelector('.time-value');
const finalTimeElement = document.querySelector('.final-time');

const audioStart = new Audio('https://github.com/LeehXD/MINI-GAME-MARIO/raw/refs/heads/main/MARIO/soung/audio_theme.mp3');
const audioGameOver = new Audio('https://github.com/LeehXD/MINI-GAME-MARIO/raw/refs/heads/main/MARIO/soung/audio_gameover.mp3');

let gameLoop;
let scoreInterval;
let timerInterval;
let score = 0;
let time = 0;
let isGameRunning = false;
let goombaTimeout;

const startGame = () => {
    isGameRunning = true;
    startBtn.style.display = 'none';
    
    pipe.style.animationDuration = '4s'; 
    goomba.style.animationDuration = '6s';
    bullet.style.animationDuration = '4s';
    
    pipe.classList.add('pipe-animation');
    
    clearTimeout(goombaTimeout);
    goomba.classList.remove('goomba-animation');
    goombaTimeout = setTimeout(() => {
        if(isGameRunning) {
            goomba.classList.add('goomba-animation');
        }
    }, 2000);

    mario.src = 'https://phoneky.co.uk/thumbs/screensavers/down/games/supermario_h4f5jmkx.gif';
    mario.style.width = '150px';
    mario.style.bottom = '30px';
    mario.style.marginLeft = '0';
    mario.classList.remove('jump');

    audioStart.currentTime = 0;
    audioStart.play();
    audioStart.loop = true;

    score = 0;
    time = 0;
    updateScore();
    updateTime();

    scoreInterval = setInterval(() => {
        score++;
        updateScore();
        checkDifficulty();
    }, 100);

    timerInterval = setInterval(() => {
        time++;
        updateTime();
    }, 1000);

    gameLoop = setInterval(loop, 10);
}

const updateScore = () => {
    scoreElement.innerText = score;
}

const updateTime = () => {
    timeElement.innerText = time;
}

const checkDifficulty = () => {
    if (score === 50) {
        bullet.classList.add('bullet-animation');
    }

    if (score > 0 && score % 100 === 0) {
        const pipeDuration = parseFloat(getComputedStyle(pipe).animationDuration);
        const goombaDuration = parseFloat(getComputedStyle(goomba).animationDuration);
        
        if (pipeDuration > 0.7) {
            pipe.style.animationDuration = `${pipeDuration - 0.2}s`;
        }
        if (goombaDuration > 0.7) {
            goomba.style.animationDuration = `${goombaDuration - 0.2}s`;
        }
    }
}

const jump = () => {
    if (!isGameRunning) return;
    
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
}

const loop = () => {
    const pipePosition = pipe.offsetLeft;
    const bulletPosition = bullet.offsetLeft;
    const goombaPosition = goomba.offsetLeft;
    const marioPosition = parseFloat(window.getComputedStyle(mario).bottom.replace('px', ''));
    
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 110) {
        handleGameOver(pipePosition, pipe);
    }

    if (goombaPosition <= 100 && goombaPosition > 0 && marioPosition < 110) {
        handleGameOver(goombaPosition, goomba);
    }

    if (bullet.style.display !== 'none' && bulletPosition <= 120 && bulletPosition > 0 && marioPosition > 90 && marioPosition < 260) {
        handleGameOver(bulletPosition, bullet);
    }
}

const handleGameOver = (obstaclePosition, obstacleElement) => {
    isGameRunning = false;
    clearTimeout(goombaTimeout);
    
    obstacleElement.style.animation = 'none';
    obstacleElement.style.left = `${obstaclePosition}px`;
    
    mario.style.animation = 'none';
    mario.style.bottom = `${parseFloat(window.getComputedStyle(mario).bottom)}px`;
    mario.src = 'https://github.com/LeehXD/MINI-GAME-MARIO/blob/main/MARIO/img/game-over.png?raw=true';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    audioStart.pause();
    audioGameOver.play();

    clearInterval(gameLoop);
    clearInterval(scoreInterval);
    clearInterval(timerInterval);

    finalScoreElement.innerText = score;
    finalTimeElement.innerText = time;
    
    setTimeout(() => {
        gameOverScreen.style.display = 'flex';
    }, 500);
}

const restartGame = () => {
    gameOverScreen.style.display = 'none';
    
    pipe.style.animation = '';
    pipe.style.left = '';
    pipe.classList.remove('pipe-animation');

    goomba.style.animation = '';
    goomba.style.left = '';
    goomba.classList.remove('goomba-animation');

    bullet.style.animation = '';
    bullet.style.left = '';
    bullet.classList.remove('bullet-animation');

    mario.classList.remove('jump');
    mario.style.animation = '';
    
    startGame();
}

document.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'ArrowUp') && isGameRunning) {
        e.preventDefault();
        jump();
    }
    
    if (e.key === 'Enter') {
        if (!isGameRunning && gameOverScreen.style.display !== 'flex') {
            startGame();
        } else if (gameOverScreen.style.display === 'flex') {
            restartGame();
        }
    }
});

document.addEventListener('touchstart', (e) => {
    if (isGameRunning) {
        if(e.cancelable) e.preventDefault();
        jump();
    }
}, { passive: false });
