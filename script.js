// Controle de navegação entre páginas
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none'); // Esconde todas as páginas

    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.style.display = 'block'; // Exibe a página selecionada
    }
}

// Função para gerar conteúdo dinâmico no início
function generateContent() {
    const contentDiv = document.getElementById('dynamicContent');
    
    // Limpa conteúdo anterior
    contentDiv.innerHTML = '';
    
    // Gerar conteúdo novo
    const dynamicText = document.createElement('p');
    dynamicText.textContent = 'Este é um conteúdo gerado dinamicamente!';
    contentDiv.appendChild(dynamicText);

    const randomColor = getRandomColor();
    dynamicText.style.color = randomColor;

    // Adicionar animação de crescimento
    dynamicText.style.animation = 'grow 1s ease-out';
}

// Função para gerar uma cor aleatória
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Inicializa com a página 'home' visível
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});