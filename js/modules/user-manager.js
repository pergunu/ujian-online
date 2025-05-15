function saveResult(result) {
    let results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    results.push(result);
    localStorage.setItem('quizResults', JSON.stringify(results));
}

function getAllResults() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const tableBody = document.querySelector('#adminResultsTable tbody');
    tableBody.innerHTML = '';

    results.forEach(res => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${res.name}</td>
            <td>${formatCategory(res.category)}</td>
            <td>${formatSubcategory(res.category, res.subcategory)}</td>
            <td>${res.level.toUpperCase()}</td>
            <td>${res.score}/${res.total}</td>
            <td>${res.date}</td>
        `;
        tableBody.appendChild(row);
    });
}

function formatCategory(cat) {
    return cat === 'pelajar' ? 'Pelajar' : 'Umum';
}

function formatSubcategory(cat, subcat) {
    const map = {
        pelajar: {
            ipa: 'IPA',
            ips: 'IPS',
            matematika: 'Matematika',
            agama: 'Agama',
            ppkn: 'PPKN',
            sejarah: 'Sejarah',
            bahasa_indonesia: 'Bahasa Indonesia',
            bahasa_inggris: 'Bahasa Inggris'
        },
        umum: {
            logika: 'Logika'
        }
    };
    return map[cat]?.[subcat] || subcat;
}

function exportResultsToJSON() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'quiz-results-' + new Date().toISOString().split('T')[0] + '.json';
    link.click();
}
