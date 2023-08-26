document.addEventListener("DOMContentLoaded", function() {
  const myAudio = document.querySelector('#myAudio');
  myAudio.volume = 0.2;
  const buttons = document.querySelectorAll('button, a');

  // Som do botão
  buttons.forEach(button => {
      button.addEventListener('mouseover', function() {
          myAudio.currentTime = 0;
          myAudio.play();
      });
  });





  
  // Navegação na barra lateral
// Função para mostrar a seção "Início" por padrão
function showDefaultSection() {
  document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('show');
  });
  document.getElementById('home').classList.add('show');
}

// Mostra a seção "Início" imediatamente ao carregar a página
document.addEventListener("DOMContentLoaded", showDefaultSection);

buttons.forEach(button => {
  if (button.closest('.sidebar')) {
      button.addEventListener('click', function(event) {
          event.preventDefault();

          // Removendo a classe 'show' de todas as seções
          document.querySelectorAll('.section').forEach(section => {
              section.classList.remove('show');
          });

          // Adicionando a classe 'show' à seção correspondente
          const sectionToShow = this.getAttribute('id').replace('link-', '');
          document.getElementById(sectionToShow).classList.add('show');
      });
  }
});


  // Navegação com transição
  buttons.forEach(button => {
      if (button.getAttribute('href') && button.getAttribute('href') !== "#") {
          button.addEventListener('click', function(event) {
              event.preventDefault();
              const linkToGo = this.getAttribute('href');
              document.body.classList.add('fade-out');
              setTimeout(() => {
                  window.location.href = linkToGo;
              }, 1000);
          });
      }
  });

  // Modo Noturno
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
})

// Transição da página

document.addEventListener("DOMContentLoaded", function() {
    // Verifica o localStorage para decidir se deve ou não aplicar o efeito fade-in
    if(localStorage.getItem("applyFadeIn") === "true") {
        document.body.classList.add("fade-in");
        localStorage.removeItem("applyFadeIn"); // Remove o item para evitar que a animação ocorra em todas as recargas
    }

    const transitionLinks = document.querySelectorAll('a[href]:not([href="#"])');

    transitionLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const destinationUrl = this.getAttribute('href');

            // Define o item no localStorage para indicar que queremos o efeito fade-in na próxima carga
            localStorage.setItem("applyFadeIn", "true");

            // Aplica o efeito fade-out ao clicar em um link
            document.body.classList.remove("fade-in");
            document.body.classList.add("fade-out");

            // Aguarda a animação de fade-out terminar e então navega para a URL desejada
            setTimeout(() => {
                window.location.href = destinationUrl;
            }, 1000);
        });
    });
});



//Volume
document.addEventListener('DOMContentLoaded', function() {
    // Carregar o volume salvo
    let savedVolume = localStorage.getItem('userVolume') || 1;
    document.getElementById('volumeRange').value = savedVolume;
    setAllAudiosVolume(savedVolume);

    document.getElementById('volumeRange').addEventListener('input', function() {
        let volume = this.value;
        localStorage.setItem('userVolume', volume); // Salvar o volume
        setAllAudiosVolume(volume); // Aplicar o volume
    });
});

function setAllAudiosVolume(volume) {
    let audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.volume = volume;
    });
}
