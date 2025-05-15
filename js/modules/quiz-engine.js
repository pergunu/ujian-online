function startQuiz() {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  if (!name || !phone) {
    alert('Silakan isi nama lengkap dan nomor HP terlebih dahulu');
    return;
  }

  if (!enabledCategories[currentCategory]) {
    alert("Kategori ini sedang tidak tersedia!");
    return;
  }

  if (!enabledCategories.subcategories[currentCategory]?.[currentSubcategory]) {
    alert("Subkategori ini sedang tidak tersedia!");
    return;
  }

  document.getElementById('participantForm').style.display = 'none';
  document.getElementById('levelSelection').classList.remove('hidden');
}

async function loadQuestions() {
  const level = document.getElementById('levelSelect').value;
  const response = await fetch(`data/questions/${currentCategory}/${currentSubcategory}/${level}.json`);
  const questionsData = await response.json();

  // Load soal ke UI
  const questionContainer = document.getElementById('questionContainer');
  questionContainer.innerHTML = '';

  questionsData.forEach((q, idx) => {
    const div = document.createElement('div');
    div.className = 'question-item';
    div.id = `question-${idx}`;
    div.innerHTML = `<p>${idx+1}. ${q.question}</p>`;
    
    q.options.forEach((opt, i) => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="radio" name="answer-${idx}" value="${opt}">
        ${opt}
      `;
      div.appendChild(label);
    });

    questionContainer.appendChild(div);
  });

  document.getElementById('quizContainer').classList.remove('hidden');
  document.getElementById('timerContainer').classList.remove('hidden');
  document.getElementById('floatingButtons').classList.remove('hidden');

  startTimer(90); // Mulai timer 90 menit
}
