/**
 * TABS SYSTEM
 * Système d'onglets pour la navigation
 */

function openTab(event, tabName) {
    // Cacher tous les contenus d'onglets
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    // Retirer la classe active de tous les boutons
    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    // Afficher le contenu de l'onglet sélectionné
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }

    // Ajouter la classe active au bouton cliqué
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// Initialiser le premier onglet comme actif au chargement
document.addEventListener('DOMContentLoaded', function() {
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        firstTab.click();
    }
});
