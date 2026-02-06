/**
 * ACCORDION SYSTEM
 * Système d'accordéon pour les sections pliables
 */

function toggleAccordion(element) {
    const accordionBody = element.nextElementSibling;

    if (accordionBody) {
        const isOpen = accordionBody.style.display === 'block';
        accordionBody.style.display = isOpen ? 'none' : 'block';

        // Rotation de l'icône (si présente)
        const icon = element.querySelector('.accordion-icon');
        if (icon) {
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    }
}

// Initialiser tous les accordéons au chargement
document.addEventListener('DOMContentLoaded', function() {
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(accordion => {
        // Par défaut, fermer tous les accordéons
        const body = accordion.nextElementSibling;
        if (body && body.classList.contains('accordion-body')) {
            body.style.display = 'none';
        }

        // Ajouter l'événement de clic
        accordion.addEventListener('click', function() {
            toggleAccordion(this);
        });
    });
});
