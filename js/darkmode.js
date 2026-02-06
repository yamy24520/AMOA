/**
 * DARK MODE
 * Gestion du thème sombre avec persistance localStorage
 */

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    const toggleButton = document.getElementById('darkToggle');
    if (toggleButton) {
        toggleButton.textContent = isDark ? 'Mode clair' : 'Mode sombre';
    }

    // Sauvegarde de la préférence
    localStorage.setItem('darkMode', isDark);
}

// Initialisation du dark mode au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';

    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        const toggleButton = document.getElementById('darkToggle');
        if (toggleButton) {
            toggleButton.textContent = 'Mode clair';
        }
    }
});
