// Sample questions data
const sampleQuestions = {
    agama: [
        {
            id: 'ag1',
            question: "Apa nama kitab suci umat Islam?",
            options: ["Injil", "Taurat", "Al-Qur'an", "Wedha"],
            correctAnswer: 2,
            explanation: "Kitab suci umat Islam adalah Al-Qur'an yang diturunkan kepada Nabi Muhammad SAW."
        }
    ],
    ppkn: [
        {
            id: 'pp1',
            question: "Pancasila sebagai dasar negara tercantum dalam...",
            options: ["Pembukaan UUD 1945", "Batang Tubuh UUD 1945", "Penjelasan UUD 1945", "Keputusan Presiden"],
            correctAnswer: 0,
            explanation: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat."
        }
    ],
    // Add more questions for each category...
    matematika: [
        {
            id: 'mt1',
            question: "Hasil dari 2 + 2 × 2 adalah...",
            options: ["6", "8", "4", "10"],
            correctAnswer: 0,
            explanation: "Menurut aturan operasi matematika, perkalian dikerjakan terlebih dahulu: 2 × 2 = 4, kemudian 2 + 4 = 6."
        }
    ],
    // Add other categories...
};

// Initialize questions in localStorage if not exists
if (!localStorage.getItem('questions')) {
    const allQuestions = [];
    for (const category in sampleQuestions) {
        allQuestions.push(...sampleQuestions[category]);
    }
    localStorage.setItem('questions', JSON.stringify(allQuestions));
}

function getQuestionsByCategory(category) {
    const allQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    return allQuestions.filter(q => q.category === category);
}

function getRandomQuestions(category, count) {
    const questions = getQuestionsByCategory(category);
    if (questions.length <= count) return questions;
    
    // Shuffle array and get first 'count' elements
    return questions
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, count);
}

function saveExamResult(participantData, examData, score) {
    const results = JSON.parse(localStorage.getItem('examResults')) || [];
    const certificateCode = generateCertificateCode(participantData, examData);
    
    const result = {
        id: Date.now().toString(),
        participantData,
        examData,
        score,
        certificateCode,
        timestamp: new Date().toISOString()
    };
    
    results.push(result);
    localStorage.setItem('examResults', JSON.stringify(results));
    
    return certificateCode;
}

function generateCertificateCode(participantData, examData) {
    const nameCode = participantData.fullname.substring(0, 3).toUpperCase();
    const categoryCode = participantData.status === 'pelajar' ? 'PLJ' : 'UM';
    const levelCode = participantData.educationLevel || 'GN';
    const examCode = examData.category.substring(0, 3).toUpperCase();
    const dateCode = new Date().toLocaleDateString('id-ID', {
        day: '2-digit', month: '2-digit', year: '2-digit'
    }).replace(/\//g, '');
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    return `${nameCode}/${categoryCode}/${levelCode}/${examCode}/${dateCode}/${randomCode}/PERGUNU-STB`;
}

function getMotivationalMessage(score) {
    if (score >= 90) return "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.";
    if (score >= 80) return "Hasil yang sangat baik! Anda telah memahami materi dengan baik.";
    if (score >= 70) return "Bagus! Anda memiliki pemahaman yang cukup baik tentang materi ini.";
    if (score >= 60) return "Cukup baik. Masih ada ruang untuk meningkatkan pemahaman Anda.";
    return "Jangan menyerah! Teruslah belajar dan berlatih untuk meningkatkan kemampuan Anda.";
}
