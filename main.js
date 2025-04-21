let timerInterval;
function startQuiz() {
  document.getElementById('quizContainer').style.display = 'block';
  startTimer(60 * 60);
}
function resetQuestion() {
  document.getElementById('feedback').innerText = 'Soal berikutnya muncul di sini.';
}
function startTimer(duration) {
  let timer = duration, minutes, seconds;
  timerInterval = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    document.getElementById('timer').textContent = 'Waktu Tersisa: ' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    if (--timer < 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}
function endQuiz() {
  document.getElementById('quizContainer').style.display = 'none';
  document.getElementById('result').style.display = 'block';
  document.getElementById('resultText').innerText = 'Skor kamu: 70%. Kamu luar biasa!';
}
