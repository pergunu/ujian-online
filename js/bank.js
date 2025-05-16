let bankPassword = "BANKSOAL-OPENLOCK";
let questions = JSON.parse(localStorage.getItem("questions")) || {
  pelajar: {
    ipa: { mudah: [], sedang: [], sulit: [] },
    ips: { mudah: [], sedang: [], sulit: [] },
    matematika: { mudah: [], sedang: [], sulit: [] },
    agama: { mudah: [], sedang: [], sulit: [] },
    ppkn: { mudah: [], sedang: [], sulit: [] },
    sejarah: { mudah: [], sedang: [], sulit: [] },
    bahasa_indonesia: { mudah: [], sedang: [], sulit: [] },
    bahasa_inggris: { mudah: [], sedang: [], sulit: [] }
  },
  umum: {
    logika: { mudah: [], sedang: [], sulit: [] }
  }
};

// DOM Elements
document.getElementById("bankBtn").addEventListener("click", () => {
  document.getElementById("bankOverlay").style.display = "block";
  document.getElementById("bankLogin").style.display = "block";
});

document.getElementById("bankOverlay").addEventListener("click", () => {
  document.getElementById("bankOverlay").style.display = "none";
  document.getElementById("bankLogin").style.display = "none";
  document.getElementById("bankPanel").style.display = "none";
});

document.getElementById("bankLoginBtn").addEventListener("click", () => {
  const enteredPass = document.getElementById("bankPassword").value;
  if (enteredPass === bankPassword) {
    document.getElementById("bankLogin").style.display = "none";
    document.getElementById("bankPanel").style.display = "block";
    loadQuestions();
  } else {
    alert("Kode Bank Soal salah!");
  }
});

// Change category visibility
document.getElementById("newCategory").addEventListener("change", function () {
  const selected = this.value;
  document.getElementById("subcategoryGroup").style.display = selected === "pelajar" ? "block" : "none";
  document.getElementById("umumSubcategoryGroup").style.display = selected === "umum" ? "block" : "none";
});

// Add question manually
document.getElementById("addQuestionBtn").addEventListener("click", () => {
  const questionText = document.getElementById("newQuestion").value.trim();
  const optionA = document.getElementById("optionA").value.trim();
  const optionB = document.getElementById("optionB").value.trim();
  const optionC = document.getElementById("optionC").value.trim();
  const optionD = document.getElementById("optionD").value.trim();
  const optionE = document.getElementById("optionE").value.trim();
  const correctAnswer = document.getElementById("correctAnswer").value.trim().toUpperCase();

  if (!questionText || !optionA || !optionB || !optionC || !optionD || !optionE || !correctAnswer) {
    alert("Semua field harus diisi!");
    return;
  }

  const newQuestion = {
    id: Date.now(),
    question: questionText,
    options: [optionA, optionB, optionC, optionD, optionE],
    answer: "ABCDE".indexOf(correctAnswer),
    explanation: "Soal ditambahkan secara manual"
  };

  const category = document.getElementById("newCategory").value;
  const subcategory = category === "pelajar" ?
    document.getElementById("newSubcategory").value :
    document.getElementById("newUmumSubcategory").value;
  const level = document.getElementById("newLevel").value;

  // Initialize if not exists
  if (!questions[category][subcategory]) {
    questions[category][subcategory] = { mudah: [], sedang: [], sulit: [] };
  }

  questions[category][subcategory][level].push(newQuestion);
  localStorage.setItem("questions", JSON.stringify(questions));
  alert("Soal berhasil ditambahkan!");

  // Clear form
  document.getElementById("newQuestion").value = "";
  document.getElementById("optionA").value = "";
  document.getElementById("optionB").value = "";
  document.getElementById("optionC").value = "";
  document.getElementById("optionD").value = "";
  document.getElementById("optionE").value = "";
  document.getElementById("correctAnswer").value = "";

  loadQuestions();
});

// Load and display questions
function loadQuestions() {
  const filter = document.getElementById("filterCategory").value;
  const questionList = document.getElementById("questionList");
  questionList.innerHTML = "";

  for (const category in questions) {
    if (filter && category !== filter) continue;
    for (const subcategory in questions[category]) {
      for (const level in questions[category][subcategory]) {
        questions[category][subcategory][level].forEach(question => {
          const item = document.createElement("div");
          item.className = "question-item";
          item.innerHTML = `
            <div class="question-meta">
              <strong>Kategori:</strong> ${category === "pelajar" ? "Pelajar" : "Umum"} |
              <strong>Subkategori:</strong> ${subcategory} |
              <strong>Tingkat:</strong> ${level}
            </div>
            <div class="question-text">${question.question}</div>
            <ul class="question-options">
              <li>A. ${question.options[0]}</li>
              <li>B. ${question.options[1]}</li>
              <li>C. ${question.options[2]}</li>
              <li>D. ${question.options[3]}</li>
              <li>E. ${question.options[4]}</li>
            </ul>
            <div class="question-actions">
              <button class="action-btn edit-question" data-id="${question.id}" data-category="${category}" data-subcategory="${subcategory}" data-level="${level}">Edit</button>
              <button class="action-btn delete-question" data-id="${question.id}" data-category="${category}" data-subcategory="${subcategory}" data-level="${level}">Hapus</button>
            </div>
          `;
          questionList.appendChild(item);
        });
      }
    }
  }

  // Event listeners for edit/delete
  document.querySelectorAll(".delete-question").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      const category = this.dataset.category;
      const subcategory = this.dataset.subcategory;
      const level = this.dataset.level;

      questions[category][subcategory][level] = questions[category][subcategory][level].filter(q => q.id !== id);
      localStorage.setItem("questions", JSON.stringify(questions));
      loadQuestions();
    });
  });
}

// Filter questions
document.getElementById("filterCategory").addEventListener("change", loadQuestions);

// AI Question Generator
document.getElementById("generateQuestionBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("aiPromptInput").value.trim();
  const category = document.getElementById("newCategory").value;
  const subcategory = category === "pelajar" ? document.getElementById("newSubcategory").value : document.getElementById("newUmumSubcategory").value;
  const level = document.getElementById("newLevel").value;

  if (!prompt || !category || !subcategory || !level) {
    alert("Silakan lengkapi semua field!");
    return;
  }

  document.getElementById("aiLoading").style.display = "block";
  document.getElementById("generateQuestionBtn").disabled = true;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const fakeAIQuestion = {
      id: Date.now(),
      question: `Pertanyaan hasil AI: ${prompt}`,
      options: ["Jawaban A", "Jawaban B", "Jawaban C", "Jawaban D", "Jawaban E"],
      answer: Math.floor(Math.random() * 5),
      explanation: "Soal dihasilkan oleh AI"
    };

    if (!questions[category][subcategory]) {
      questions[category][subcategory] = { mudah: [], sedang: [], sulit: [] };
    }

    questions[category][subcategory][level].push(fakeAIQuestion);
    localStorage.setItem("questions", JSON.stringify(questions));
    alert("Soal AI berhasil ditambahkan!");

    loadQuestions();
  } catch (error) {
    console.error(error);
    alert("Gagal menghasilkan soal.");
  } finally {
    document.getElementById("aiLoading").style.display = "none";
    document.getElementById("generateQuestionBtn").disabled = false;
  }
});

<script src="js/auth.js"></script>
