// Pop-up Menu
const menu = document.getElementById('popup-menu');
const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', function() {
    if (this.checked) {
        menu.style.right = '0px';
    } else {
        menu.style.right = '-250px';
    }
});

document.body.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && e.target !== checkbox && !e.target.classList.contains('bars')) {
        checkbox.checked = false;
        menu.style.right = '-250px';
    }
});

menu.addEventListener('click', function(e) {
    e.stopPropagation();
});

document.querySelector('.toggle').addEventListener('click', function(e) {
    e.stopPropagation();
});


// Theme Toggle
function toggleTheme(element) {
    if (element.checked) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light-theme');
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        document.querySelector('.btn-color-mode-switch input[type="checkbox"]').checked = (currentTheme === 'dark-theme');
    }
});


// Button Sounds
const myAudio = document.querySelector('#myAudio');
myAudio.volume = 0.2;

const buttons = document.querySelectorAll('button, a');
buttons.forEach(button => {
    button.addEventListener('mouseover', function() {
        myAudio.currentTime = 0;
        myAudio.play();
    });

    if (button.getAttribute('href')) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const linkToGo = this.getAttribute('href');
            document.body.classList.add('fade-out');
            localStorage.setItem('transition', 'true');
            setTimeout(() => {
                window.location.href = linkToGo;
            }, 1000);
        });
    }
});

document.querySelector('.button').addEventListener('click', function() {
    document.getElementById('click-sound').play();
});

// Page Transitions
window.addEventListener('DOMContentLoaded', (event) => {
  const buttons = document.querySelectorAll('.redirect-button');

  buttons.forEach((button) => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      localStorage.setItem('transition', 'true');
      document.body.classList.add('fade-in');
      setTimeout(() => {
        window.location.href = button.getAttribute('data-url');
      }, 1000); // Aguarde 1 segundo antes de redirecionar
    });
  });

  if (localStorage.getItem('transition') === 'true') {
    document.body.classList.add('fade-in');
    setTimeout(() => {
      document.body.classList.remove('fade-in');
      localStorage.setItem('transition', 'false');
    }, 1000);
  }
});
