// ... (kode sebelumnya tetap)

function selectAnswer(selectedIdx) {
  const q = questions[currentQuestion];
  const options = document.querySelectorAll('.option');
  
  options.forEach((opt, i) => {
    opt.style.pointerEvents = 'none';
    if (i === q.answer) {
      opt.classList.add('correct');
    } else if (i === selectedIdx) {
      opt.classList.add('wrong');
    }
  });

  // Mainkan suara
  playSound(selectedIdx === q.answer);

  if (selectedIdx === q.answer) {
    score++;
  }
  
  nextButton.style.display = 'block';
}

// Fungsi suara baru
function playSound(isCorrect) {
  const sound = new Audio(`assets/sounds/${isCorrect ? 'correct' : 'wrong'}.mp3`);
  sound.play();
}

// ... (kode setelahnya tetap)
