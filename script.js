 document.addEventListener('DOMContentLoaded', function() {
    // 1. Evidenzia la pagina corrente nel menu (la tua vecchia funzione)
    highlightCurrentPage();

    // 2. Carica i dati dal file JSON
    fetch('dati.json')
        .then(response => response.json())
        .then(data => {
            console.log("Dati caricati:", data); // Controllo per vedere se funziona

            // Controlla in che pagina siamo e carica i dati giusti
            const path = window.location.pathname;

            // Se siamo nella pagina Pizze
            if (path.includes('Pizza.html')) {
                generaMenu(data.pizze, 'container-pizze');
            } 
            // Se siamo nella pagina Dolci
            else if (path.includes('Dolci.html')) {
                generaMenu(data.dolci, 'container-dolci');
            } 
            // Se siamo nella pagina Bevande
            else if (path.includes('Bevande.html')) {
                generaMenu(data.bevande, 'container-bevande');
            }
        })
        .catch(error => console.error('Errore nel caricamento del menu:', error));
});

// --- FUNZIONE CHE CREA L'HTML (IL GENERATORE DI CARD) ---
function generaMenu(listaProdotti, idContenitore) {
    const contenitore = document.getElementById(idContenitore);
    if (!contenitore) return; // Se non trova il contenitore, si ferma

    listaProdotti.forEach(prodotto => {
        // A. Preparazione Allergeni (se ci sono)
        let htmlAllergeni = '';
        if (prodotto.allergeni && prodotto.allergeni.length > 0) {
            htmlAllergeni = `<p><strong>Allergeni:</strong> ${prodotto.allergeni.join(', ')}</p>`;
        }

        // B. Preparazione Descrizione (se c'è)
        let htmlDescrizione = '';
        if (prodotto.descrizione) {
            htmlDescrizione = `<p class="menu-desc">${prodotto.descrizione}</p>`;
        }

        // C. Costruzione della Card HTML
        // Nota: uso i backtick (`) per poter andare a capo
        const itemHTML = `
            <div class="menu-item">
                <img src="${prodotto.immagine}" alt="${prodotto.nome}" style="width: 100%; height: 250px; object-fit: cover;">
                <div class="title-price">
                    <h3 class="menu-title">${prodotto.nome}</h3>
                    <span class="price">${prodotto.prezzo}</span>
                </div>
                ${htmlDescrizione}
                ${htmlAllergeni}
            </div>
        `;

        // D. Inserimento nella pagina
        contenitore.innerHTML += itemHTML;
    });
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}