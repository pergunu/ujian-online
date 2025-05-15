function calculateScore(correctAnswers, totalQuestions) {
  return Math.round((correctAnswers / totalQuestions) * 100);
}

function showResults(correctCount, totalQuestions) {
  const percentage = calculateScore(correctCount, totalQuestions);
  const resultsContainer = document.getElementById('resultsContainer');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const resultsMessage = document.getElementById('resultsMessage');

  scoreDisplay.textContent = `${percentage}%`;
  resultsMessage.innerHTML = `<strong>${correctCount}</strong> dari <strong>${totalQuestions}</strong> jawaban benar.`;

  resultsContainer.classList.remove('hidden');
  document.getElementById('quizContainer').classList.add('hidden');
  document.getElementById('floatingButtons').classList.add('hidden');

  if (percentage >= 80) {
    playAudio('applauseSound');
    resultsMessage.innerHTML += '<br><span class="badge badge-success">Lulus dengan sangat baik!</span>';
  } else if (percentage >= 60) {
    playAudio('applauseSound');
    resultsMessage.innerHTML += '<br><span class="badge badge-primary">Lulus dengan baik</span>';
  } else {
    playAudio('wrongSound');
    resultsMessage.innerHTML += '<br><span class="badge badge-danger">Maaf, belum lulus</span>';
  }
}
