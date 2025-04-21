
let soal = [];
let skor = 0;
let index = 0;
let maxSoal = 100;
let waktuMulai = null;

document.getElementById('kategori').addEventListener('change', (e) => {
  const tingkatan = document.getElementById('tingkatan-wrapper');
  tingkatan.style.display = e.target.value === 'pelajar' ? 'block' : 'none';
});

document.getElementById('mulai').addEventListener('click', async () => {
  const kategori = document.getElementById('kategori').value;
  const level = document.getElementById('level').value;
  let file = 'soal/soal-umum.json';
  if (kategori === 'pelajar') {
    const tingkatan = document.getElementById('tingkatan').value;
    file = 'soal/soal-pelajar-' + tingkatan + '.json';
  }

  const res = await fetch(file);
  soal = await res.json();
  soal = soal[level] || [];
  index = 0;
  skor = 0;
  waktuMulai = Date.now();

  document.getElementById('intro').style.display = 'none';
  document.getElementById('kuis-container').style.display = 'block';
  tampilkanPertanyaan();
});

document.getElementById('selanjutnya').addEventListener('click', () => {
  index++;
  if (index >= soal.length || index >= maxSoal || Date.now() - waktuMulai > 4 * 60 * 60 * 1000) {
    selesaiQuiz();
    return;
  }
  tampilkanPertanyaan();
});

document.getElementById('selesai').addEventListener('click', () => {
  selesaiQuiz();
});

function tampilkanPertanyaan() {
  const q = soal[index];
  if (!q) return selesaiQuiz();

  document.getElementById('pertanyaan-box').innerText = q.pertanyaan;
  const jawabanBox = document.getElementById('jawaban-box');
  jawabanBox.innerHTML = '';
  q.jawaban.forEach(j => {
    const btn = document.createElement('button');
    btn.innerText = j.text;
    btn.onclick = () => {
      if (j.benar) skor++;
      index++;
      tampilkanPertanyaan();
    };
    jawabanBox.appendChild(btn);
  });
}

function selesaiQuiz() {
  document.getElementById('kuis-container').innerHTML = `
    <h2>Quiz Selesai</h2>
    <p>Skor Anda: ${skor} dari ${index} pertanyaan</p>
    <button onclick="location.reload()">Mulai Lagi</button>
  `;
}
