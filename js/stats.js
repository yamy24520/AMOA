/**
 * ANIMATED STATISTICS
 * Animation des compteurs de statistiques
 */

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 25);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 25);
}

// Observer pour déclencher l'animation au scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.dataset.animated) {
                    const targetValue = parseInt(stat.dataset.target || stat.textContent);
                    animateCounter(stat, targetValue);
                    stat.dataset.animated = 'true';
                }
            });
        }
    });
}, { threshold: 0.5 });

// Observer tous les conteneurs de statistiques
document.addEventListener('DOMContentLoaded', function() {
    const statsContainers = document.querySelectorAll('.stats-grid, .stat-card');
    statsContainers.forEach(container => {
        statsObserver.observe(container);
    });
});
