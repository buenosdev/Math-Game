var score = 0;
var correctAnswer;
var timeRemaining = 10;
var timerInterval;
var timeIncrement = 2;

// Variáveis de som
var clickSound = document.getElementById('click-sound');
var roboSound = document.getElementById('robo-sound');
var timerSound = document.getElementById('timer-sound');
var confettiSound = document.getElementById('confetti-sound');
var errorSounds = ['error-sound-1', 'error-sound-2', 'error-sound-3'];
//var keypressSounds = ['keypress-sound-1', 'keypress-sound-2'];
var gameoverSound = document.getElementById('gameover-sound');

// Função para gerar uma questão de subtração aleatória
function generateQuestion() {
  var num1 = Math.floor(Math.random() * 10);
  var num2 = Math.floor(Math.random() * 10);
  
  correctAnswer = num1 - num2;

  document.getElementById('question').innerText = "Qual é a subtração de " + num1 + " e " + num2 + "?";
}

function playRandomErrorSound() {
  var soundId = errorSounds[Math.floor(Math.random() * errorSounds.length)];
  var sound = document.getElementById(soundId);
  sound.volume = 0.2;
  sound.play();
}

function checkAnswer() {
  var playerAnswer = parseInt(document.getElementById('answer').value, 10);
  if (playerAnswer === correctAnswer) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    confettiSound.volume = 0.2;
    confettiSound.play();
    
    score++;
    if (timeRemaining + timeIncrement > 10) {
      timeRemaining = 10;
    } else {
      timeRemaining += timeIncrement;
    }
    timeIncrement *= 1; 
    document.getElementById('score').innerText = "Score: " + score;
    document.getElementById('feedback').innerText = "";
    generateQuestion();
  } else {
    playRandomErrorSound();

    document.body.classList.add('error-shake');
    document.body.style.overflow = 'hidden';

    document.getElementById('feedback').innerText = "A resposta correta era " + correctAnswer;

    setTimeout(function(){
        document.body.classList.remove('error-shake');
        document.body.style.overflow = '';
    }, 500);

    generateQuestion();
  }
  
  document.getElementById('answer').value = '';
}




function startTimer() {
  var timerBar = document.getElementById('timer-bar');
  timerBar.style.width = '100%';
  
  timerSound.volume = 0.2;
  timerSound.play();

  timerInterval = setInterval(function() {
    timeRemaining -= 0.05;
    if (timeRemaining <= 0) {
      gameOver();
    } else {
      timerBar.style.width = (timeRemaining / 10) * 100 + '%';
    }
  }, 200);
}


function gameOver() {
  clearInterval(timerInterval);
  
  timerSound.pause(); // Parar o som do timer
  timerSound.currentTime = 0; // Reseta o tempo do áudio para o começo
  
  gameoverSound.volume = 0.2;
  gameoverSound.play();

  document.getElementById('game-container').style.display = 'none';
  document.getElementById('game-over-container').style.display = 'flex';
  document.getElementById('feedback-message').innerText = "Tempo esgotado! Você Perdeu!";
  
  document.getElementById('restart-button').focus();
}

// Adicionando a lista correta de sons e a função
//var keypressSounds = ['keypress-sound-1', 'keypress-sound-2'].map(id => document.getElementById(id));

function playRandomKeypressSound() {
  var sound = keypressSounds[Math.floor(Math.random() * keypressSounds.length)];
  sound.volume = 0.2;
  sound.play();
}

function isNumericInput(event) {
  var key = event.keyCode;
  return ((key >= 48 && key <= 57) || 
    (key >= 96 && key <= 105) || 
    key === 8 || key === 9 || key === 13 || key === 35 || key === 36 || key === 37 ||
    key === 39 || key === 46 || key === 190 || key === 110 || key === 189 || key === 109); // Adicionado as chaves para ambos sinais de "-"
}

document.getElementById('answer').addEventListener('keydown', function (e) {
  if (!isNumericInput(e)) {
    e.preventDefault();
  }
  if (e.keyCode === 13) {
    e.preventDefault();
    checkAnswer();
    if (timeRemaining <= 0) {
      document.getElementById('restart-button').click();
    }
  } else {
    playRandomKeypressSound();
  }
});

document.getElementById('restart-button').addEventListener('click', function () {
  gameoverSound.pause(); // Parar o som de gameover
  gameoverSound.currentTime = 0; // Reseta o tempo do áudio para o começo

  document.getElementById('game-over-container').style.display = 'none';
  document.getElementById('game-container').style.display = 'flex';
  score = 0;
  document.getElementById('score').innerText = "Score: 0";
  generateQuestion();
  timeRemaining = 10;
  startTimer();
  fetchImage();
  
  document.getElementById('answer').value = '';
  document.getElementById('answer').focus();
});



window.addEventListener('load', (event) => {
  fetchImage();
});

function fetchImage() {
  fetch("https://api.pexels.com/v1/search?query=game+over&per_page=1&page=" + Math.floor(Math.random() * 10), {
    headers: {
        Authorization: "CqCxHokjqoyoFuXfj3cv9199pqFeH9wMM01qylloz1jp8ElSfP1rh7AJ"
    }
  }).then(response => response.json())
    .then(data => {
        const imageUrl = data.photos[0].src.original;
        let image = document.createElement("img");
        image.src = imageUrl;
        image.style.position = "absolute";
        image.style.width = "681px";
        image.style.height = "484px";
        const container = document.getElementById('game-over-container');
        const oldImg = container.querySelector('img');
        if(oldImg) {
          container.removeChild(oldImg);
        }
        container.prepend(image);
    }).catch(err => console.log(err));
}

document.getElementById('start-button').addEventListener('click', function () {
  roboSound.volume = 0.2;
  roboSound.play();

  document.getElementById('start-button').style.display = 'none';
  document.getElementById('game-container').style.display = 'flex';
  generateQuestion();
  startTimer();
  document.getElementById('answer').focus();
});



//Volume
document.addEventListener('DOMContentLoaded', function() {
  // Função para ajustar volume de todos os audios
  function setAllAudiosVolume(volume) {
      let audios = document.querySelectorAll('audio');
      audios.forEach(audio => {
          audio.volume = volume;
      });
  }

  // Carregar o volume salvo e aplicar aos audios
  let savedVolume = localStorage.getItem('userVolume') || 1;
  setAllAudiosVolume(savedVolume);

  // Se estiver na página de configuração, ouça mudanças no controle de volume
  let volumeControl = document.getElementById('volumeRange');
  if (volumeControl) {
      volumeControl.value = savedVolume;

      volumeControl.addEventListener('input', function() {
          let volume = this.value;
          localStorage.setItem('userVolume', volume); // Salvar o volume
          setAllAudiosVolume(volume); // Aplicar o volume
      });
  }
});