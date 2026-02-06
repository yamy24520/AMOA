/**
 * SEARCH FUNCTIONALITY
 * Recherche en temps réel dans les sections
 */

function handleSearch(query) {
    const resultsContainer = document.getElementById('searchResults');

    if (!query || query.length < 2) {
        resultsContainer.style.display = 'none';
        return;
    }

    const sections = document.querySelectorAll('section[id]');
    const results = [];

    sections.forEach(section => {
        const title = section.querySelector('h2')?.textContent || '';
        const content = section.textContent || '';

        if (title.toLowerCase().includes(query.toLowerCase()) ||
            content.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                id: section.id,
                title: title,
                preview: content.substring(0, 100) + '...'
            });
        }
    });

    if (results.length > 0) {
        resultsContainer.innerHTML = results.map(result => `
            <div style="padding:0.75rem;border-bottom:1px solid var(--border);cursor:pointer;"
                 onclick="document.getElementById('${result.id}').scrollIntoView({behavior:'smooth'});document.getElementById('searchResults').style.display='none';">
                <strong>${result.title}</strong>
                <div style="font-size:12px;color:var(--secondary);margin-top:0.25rem;">${result.preview}</div>
            </div>
        `).join('');
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.innerHTML = '<div style="padding:0.75rem;color:var(--secondary);">Aucun résultat trouvé</div>';
        resultsContainer.style.display = 'block';
    }
}

// Fermer les résultats de recherche en cliquant ailleurs
document.addEventListener('click', function(e) {
    const searchBar = document.querySelector('.search-bar');
    const resultsContainer = document.getElementById('searchResults');

    if (resultsContainer && !searchBar.contains(e.target)) {
        resultsContainer.style.display = 'none';
    }
});
