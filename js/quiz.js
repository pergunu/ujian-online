// quiz.js
function finishQuiz() {
  clearInterval(timer);
  
  const total = questions.length;
  const scorePercent = Math.round((score.correct / total) * 100);

  const certificateCode = generateCertificateCode(participantData, scorePercent);

  localStorage.setItem("quizResult", JSON.stringify({
    correct: score.correct,
    wrong: score.wrong,
    skipped: score.skipped,
    scorePercentage: scorePercent,
    certificateCode: certificateCode
  }));

  window.location.href = "result.html";
}
