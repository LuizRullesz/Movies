document.addEventListener('DOMContentLoaded', () => {
    // Alterar o idioma
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('lang', e.target.value);
            window.location.href = currentUrl.href;
        });
    }

    // Destacar o link ativo na navegação
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath === href || 
            (href.includes('/movie') && currentPath.includes('/movie')) ||
            (href.includes('/tv') && currentPath.includes('/tv'))) {
            link.classList.add('active');
        }
    });

    // Formulário de busca
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = document.getElementById('search-input').value.trim();
            const lang = document.getElementById('language-select').value;
            
            if (query) {
                window.location.href = `/search?query=${encodeURIComponent(query)}&lang=${lang}`;
            }
        });
    }

    // Paginação
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            changePage(-1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            changePage(1);
        });
    }
    
    // Função para mudar de página
    function changePage(delta) {
        const currentUrl = new URL(window.location.href);
        const currentPage = parseInt(currentUrl.searchParams.get('page') || '1');
        const newPage = currentPage + delta;
        
        if (newPage > 0) {
            currentUrl.searchParams.set('page', newPage);
            window.location.href = currentUrl.href;
        }
    }
}); 