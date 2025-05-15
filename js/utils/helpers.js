function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function calculateScore(correct, total) {
    return Math.round((correct / total) * 100);
}

function exportToJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
