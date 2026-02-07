// Navigation globale du site
const globalNav = `
<nav class="global-nav">
    <div class="nav-container">
        <a href="index.html" class="nav-logo">Wiki<span class="logo-accent">AMOA</span></a>
        <ul class="nav-menu">
            <li><a href="index.html">Accueil</a></li>
            <li class="nav-dropdown">
                <a href="#">Fondamentaux ▾</a>
                <ul class="dropdown-menu">
                    <li><a href="definition.html">Définition & Périmètre</a></li>
                    <li><a href="histoire.html">Histoire de l'AMOA</a></li>
                    <li><a href="glossaire.html">Glossaire EN/FR</a></li>
                </ul>
            </li>
            <li class="nav-dropdown">
                <a href="#">Pratique ▾</a>
                <ul class="dropdown-menu">
                    <li><a href="methodologies.html">Méthodologies</a></li>
                    <li><a href="outils.html">Outils & Templates</a></li>
                    <li><a href="cas-pratiques.html">Études de Cas</a></li>
                </ul>
            </li>
            <li class="nav-dropdown">
                <a href="#">Juridique & Normes ▾</a>
                <ul class="dropdown-menu">
                    <li><a href="juridique.html">Cadre Juridique</a></li>
                    <li><a href="juridique.html#rgpd">RGPD & Protection Données</a></li>
                    <li><a href="juridique.html#marches">Marchés Publics</a></li>
                </ul>
            </li>
            <li class="nav-dropdown">
                <a href="#">Formation ▾</a>
                <ul class="dropdown-menu">
                    <li><a href="formations.html">Certifications</a></li>
                    <li><a href="formations.html#metiers">Métiers AMOA</a></li>
                    <li><a href="formations.html#parcours">Parcours Carrière</a></li>
                </ul>
            </li>
            <li><a href="bibliographie.html">Bibliographie</a></li>
            <li><a href="faq.html">FAQ</a></li>
        </ul>
    </div>
</nav>
`;

// Injecter la navigation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    if (header && !document.querySelector('.global-nav')) {
        header.insertAdjacentHTML('afterend', globalNav);

        // Activer le lien de la page courante
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
});
