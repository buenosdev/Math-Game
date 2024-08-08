window.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginBtn');
    const loginPopup = document.getElementById('loginPopup');
    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
            // Desativa a animação fadeIn
            document.body.style.animation = 'none';
            // Exibe o popup de login
            loginPopup.classList.toggle('active');
        });

// Fecha o popup ao clicar fora dele
document.addEventListener('click', (event) => {
    const target = event.target;
    if (!loginPopup.contains(target) && target !== loginButton) {
        loginPopup.classList.remove('active');
        // Reativa a animação fadeIn após um curto período de tempo
        setTimeout(() => {
            document.body.classList.remove('no-transition');
        }, 500); // Tempo correspondente à duração da animação de transição
    }
});
}});
