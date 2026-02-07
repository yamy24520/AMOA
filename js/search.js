/**
 * SEARCH FUNCTIONALITY
 * Recherche en temps réel dans les sections de la page courante et les autres pages
 */

// Index de recherche pour toutes les pages
const searchIndex = {
    'index.html': {
        title: 'Accueil - WikiAMOA',
        sections: [
            { id: 'introduction', title: 'Introduction', keywords: 'AMOA maîtrise ouvrage assistance encyclopédie' },
            { id: 'explorer', title: 'Explorer WikiAMOA', keywords: 'pages thématiques ressources' }
        ]
    },
    'definition.html': {
        title: 'Définition & Périmètre',
        sections: [
            { id: 'definition', title: 'Définition AMOA', keywords: 'définition rôle mission AMOA MOA MOE' },
            { id: 'perimetre', title: 'Périmètre intervention', keywords: 'périmètre phases activités' },
            { id: 'acteurs', title: 'Les 3 Acteurs Clés', keywords: 'MOA AMOA MOE acteurs responsabilités' },
            { id: 'missions', title: 'Missions AMOA', keywords: 'missions cadrage analyse recette' },
            { id: 'livrables', title: 'Livrables', keywords: 'livrables documents CDC spécifications' }
        ]
    },
    'histoire.html': {
        title: 'Histoire de l\'AMOA',
        sections: [
            { id: 'introduction', title: 'Introduction', keywords: 'histoire évolution chronologie' },
            { id: 'periode1', title: '1980-1990 Émergence', keywords: '1980 émergence IBM PC ERP' },
            { id: 'periode2', title: '1990-2000 Structuration', keywords: '1990 structuration internet SAP R/3' },
            { id: 'periode3', title: '2000-2010 Professionnalisation', keywords: '2000 professionnalisation PMP Prince2 certifications' },
            { id: 'periode4', title: '2010-2020 Transition Agile', keywords: '2010 agile scrum transformation digitale' },
            { id: 'periode5', title: '2020-2026 Transformation', keywords: '2020 IA cloud transformation intelligence artificielle' }
        ]
    },
    'methodologies.html': {
        title: 'Méthodologies',
        sections: [
            { id: 'methodologies', title: 'Méthodologies projet', keywords: 'cycle V agile scrum SAFe méthodologies' },
            { id: 'gouvernance', title: 'Gouvernance', keywords: 'gouvernance COPIL COPROJ RACI comités' },
            { id: 'conduite-changement', title: 'Conduite du Changement', keywords: 'conduite changement ADKAR communication formation' }
        ]
    },
    'outils.html': {
        title: 'Outils & Templates',
        sections: [
            { id: 'specifications', title: 'Spécifications', keywords: 'spécifications fonctionnelles techniques' },
            { id: 'cahier-charges', title: 'Cahier des Charges', keywords: 'cahier charges CDC CCTP marché' },
            { id: 'controles', title: 'Liste de Contrôles', keywords: 'contrôles qualité checklist recette' },
            { id: 'kpi', title: 'KPI Indicateurs', keywords: 'KPI indicateurs pilotage performance' },
            { id: 'banque-exemples', title: 'Base Données Exemples', keywords: 'exemples risques fonctionnalités exigences techniques' },
            { id: 'recette', title: 'Recette Validation', keywords: 'recette VABF VSR tests validation' }
        ]
    },
    'cas-pratiques.html': {
        title: 'Cas Pratiques',
        sections: [
            { id: 'contexte', title: 'Reformulation Besoin', keywords: 'reformulation besoin expression contexte' },
            { id: 'analyse-risques', title: 'Analyse Risques', keywords: 'risques analyse mitigation criticité' },
            { id: 'budget', title: 'Budget Tarifs', keywords: 'budget tarifs coûts TJM grille tarifaire CAPEX OPEX' },
            { id: 'planning', title: 'Rétroplanning', keywords: 'planning rétroplanning gantt phases jalons' },
            { id: 'benchmark', title: 'Benchmark Solutions', keywords: 'benchmark matrice choix sélection' },
            { id: 'cas-pratique', title: 'Cas Pratique Complet', keywords: 'cas pratique exemple complet restauration scolaire' }
        ]
    },
    'juridique.html': {
        title: 'Cadre Juridique',
        sections: [
            { id: 'juridique', title: 'Volet Juridique', keywords: 'juridique marchés publics contrats seuils' },
            { id: 'reglementation', title: 'Réglementation', keywords: 'réglementation RGPD allergènes INCO EGalim' }
        ]
    },
    'formations.html': {
        title: 'Certifications & Formations',
        sections: [
            { id: 'certifications', title: 'Certifications', keywords: 'certifications PMP Prince2 PSM PSPO SAFe' },
            { id: 'salaires', title: 'Salaires TJM', keywords: 'salaires TJM rémunération tarifs' },
            { id: 'parcours', title: 'Parcours Carrière', keywords: 'parcours carrière évolution métier' },
            { id: 'competences', title: 'Compétences', keywords: 'compétences skills soft skills techniques' }
        ]
    },
    'glossaire.html': {
        title: 'Glossaire',
        sections: [
            { id: 'glossaire', title: 'Glossaire EN/FR', keywords: 'glossaire termes définitions anglais français' }
        ]
    },
    'bibliographie.html': {
        title: 'Bibliographie',
        sections: [
            { id: 'bibliographie', title: 'Bibliographie', keywords: 'bibliographie références normes ISO PMBOK' }
        ]
    },
    'faq.html': {
        title: 'FAQ',
        sections: [
            { id: 'faq', title: 'Questions Fréquentes', keywords: 'FAQ questions fréquentes réponses' }
        ]
    }
};

// Cache pour stocker le contenu des pages déjà chargées
const pageContentCache = {};

async function loadPageContent(page) {
    if (pageContentCache[page]) {
        return pageContentCache[page];
    }

    try {
        const response = await fetch(page);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const sections = [];
        doc.querySelectorAll('section[id]').forEach(section => {
            const title = section.querySelector('h2, h3')?.textContent || '';
            const content = section.textContent || '';
            sections.push({
                id: section.id,
                title: title,
                content: content
            });
        });

        pageContentCache[page] = sections;
        return sections;
    } catch (error) {
        console.error(`Erreur lors du chargement de ${page}:`, error);
        return [];
    }
}

async function handleSearch(query) {
    const resultsContainer = document.getElementById('searchResults');

    if (!query || query.length < 2) {
        resultsContainer.style.display = 'none';
        return;
    }

    const results = [];
    const lowerQuery = query.toLowerCase();

    // Recherche dans la page courante
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const title = section.querySelector('h2, h3')?.textContent || '';
        const content = section.textContent || '';

        if (title.toLowerCase().includes(lowerQuery) ||
            content.toLowerCase().includes(lowerQuery)) {
            results.push({
                page: null, // null = page courante
                id: section.id,
                title: title || section.id,
                preview: extractPreview(content, lowerQuery)
            });
        }
    });

    // Recherche dans toutes les autres pages
    const searchPromises = Object.entries(searchIndex).map(async ([page, pageData]) => {
        const sections = await loadPageContent(page);

        sections.forEach(section => {
            const titleMatch = section.title.toLowerCase().includes(lowerQuery);
            const contentMatch = section.content.toLowerCase().includes(lowerQuery);

            if (titleMatch || contentMatch) {
                results.push({
                    page: page,
                    id: section.id,
                    title: section.title,
                    preview: extractPreview(section.content, lowerQuery),
                    pageTitle: pageData.title
                });
            }
        });
    });

    await Promise.all(searchPromises);

    // Limiter les résultats à 10 pour ne pas surcharger
    const limitedResults = results.slice(0, 10);

    if (limitedResults.length > 0) {
        resultsContainer.innerHTML = limitedResults.map(result => {
            const isCurrentPage = !result.page;
            const url = isCurrentPage
                ? `#${result.id}`
                : (result.id ? `${result.page}#${result.id}` : result.page);

            const onClick = isCurrentPage
                ? `document.getElementById('${result.id}').scrollIntoView({behavior:'smooth'});document.getElementById('searchResults').style.display='none';`
                : `window.location.href='${url}';`;

            return `
                <div style="padding:0.75rem;border-bottom:1px solid var(--border);cursor:pointer;"
                     onclick="${onClick}">
                    <strong>${result.title}</strong>
                    ${!isCurrentPage ? '<span style="font-size:11px;color:#666;margin-left:8px;">→ ' + result.pageTitle + '</span>' : ''}
                    <div style="font-size:12px;color:var(--secondary);margin-top:0.25rem;">${result.preview}</div>
                </div>
            `;
        }).join('');
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.innerHTML = '<div style="padding:0.75rem;color:var(--secondary);">Aucun résultat trouvé</div>';
        resultsContainer.style.display = 'block';
    }
}

function extractPreview(content, query) {
    const lowerContent = content.toLowerCase();
    const queryIndex = lowerContent.indexOf(query.toLowerCase());

    if (queryIndex === -1) {
        return content.substring(0, 100).trim() + '...';
    }

    const start = Math.max(0, queryIndex - 50);
    const end = Math.min(content.length, queryIndex + query.length + 50);
    let preview = content.substring(start, end).trim();

    if (start > 0) preview = '...' + preview;
    if (end < content.length) preview = preview + '...';

    return preview;
}

// Fermer les résultats de recherche en cliquant ailleurs
document.addEventListener('click', function(e) {
    const searchBar = document.querySelector('.search-bar');
    const resultsContainer = document.getElementById('searchResults');

    if (resultsContainer && !searchBar.contains(e.target)) {
        resultsContainer.style.display = 'none';
    }
});
