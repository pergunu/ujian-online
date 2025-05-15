// score-manager.js

function showResults(correctCount, totalQuestions) {
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('resultsMessage').innerHTML = `
        <p>Skor: <strong>${correctCount}</strong> dari <strong>${totalQuestions}</strong></p>
        ${percentage >= 80 ? '<span class="badge badge-success">Lulus</span>' : ''}
    `;
}
