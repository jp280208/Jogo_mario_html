const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')

const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

// audio
audioStart = new Audio('https://github.com/LeehXD/MINI-GAME-MARIO/raw/refs/heads/main/MARIO/soung/audio_theme.mp3')
audioGameOver = new Audio('https://github.com/LeehXD/MINI-GAME-MARIO/raw/refs/heads/main/MARIO/soung/audio_gameover.mp3')


const startGame = () => {
  pipe.classList.add('pipe-animation')
  start.style.display = 'none'

  // audio
  audioStart.play()
}

const restartGame = () => {
  gameOver.style.display = 'none'
  pipe.style.left = ''
  pipe.style.right = '0'
  mario.src = 'https://phoneky.co.uk/thumbs/screensavers/down/games/supermario_h4f5jmkx.gif'
  mario.style.width = '150px'
  mario.style.bottom = '0'

  start.style.display = 'none'

  audioGameOver.pause()
  audioGameOver.currentTime = 0;

  audioStart.play()
  audioStart.currentTime = 0;

}

const jump = () => {
  mario.classList.add('jump')

  setTimeout(() => {
    mario.classList.remove('jump')
  }, 800)
}

const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace('px', ' ')

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('.pipe-animation')
      pipe.style.left = `${pipePosition}px`

      mario.classList.remove('.jump')
      mario.style.bottom = `${marioPosition}px`

      mario.src = 'https://github.com/LeehXD/MINI-GAME-MARIO/blob/main/MARIO/img/game-over.png?raw=true'
      mario.style.width = '80px'
      mario.style.marginLeft = '50px'
      
      
      function stopAudioStart() {
        audioStart.pause()
      }
      stopAudioStart()
      
      audioGameOver.play()
      
      function stopAudio() {
        audioGameOver.pause()
      }
      setTimeout(stopAudio, 7000)
      
      gameOver.style.display = 'flex'
      
      clearInterval(loop)
    }
  }, 10)
}

loop()

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === ' ') {
    jump()
  }
})

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump() 
  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter') {
    startGame()
  }
})
