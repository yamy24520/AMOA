/**
 * SCROLL MANAGEMENT
 * Gestion de la barre de progression et du bouton "Retour en haut"
 */

// Barre de progression de lecture
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;

    const progressBar = document.getElementById('readingProgress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }

    // Bouton "Retour en haut"
    const btn = document.getElementById('backToTop');
    if (btn) {
        if (scrollTop > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }
});

// Smooth scroll vers le haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Highlight du lien actif dans la sidebar
function updateActiveSidebarLink() {
    const sections = document.querySelectorAll('section[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveSidebarLink);

// Smooth scroll pour les liens d'ancre
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
