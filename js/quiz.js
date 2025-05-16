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

function generateCertificateCode(data, percentage) {
  const now = new Date();
  const dateStr = now.getDate().toString().padStart(2, '0') +
                  (now.getMonth() + 1).toString().padStart(2, '0') +
                  now.getFullYear();

  const uniqueCode = Math.random().toString(36).substring(2, 10).toUpperCase();
  const categoryText = data.status === "pelajar" ? "PELAJAR" : "UMUM";

  let subcategoryText = "";
  if (data.status === "pelajar") {
    switch(data.pendidikan) {
      case "SD": subcategoryText = "SD"; break;
      case "SMP": subcategoryText = "SMP"; break;
      case "SMA": subcategoryText = "SMA"; break;
      case "SMK": subcategoryText = "SMK"; break;
    }
  } else {
    subcategoryText = "UMUM";
  }

  return `${data.name.replace(/\s+/g, '')}/${categoryText}/${subcategoryText}/${dateStr}/${uniqueCode}/PERGUNU-STB`;
}
