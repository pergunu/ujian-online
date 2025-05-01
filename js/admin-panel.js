const AdminPanel = {
    init: function() {
        // Cek apakah user adalah admin
        this.checkAdminAccess();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Load question banks
        this.loadQuestionBanks();
    },
    
    checkAdminAccess: function() {
        // Implementasi autentikasi admin
        const password = prompt('Masukkan kode admin:');
        if (password !== '123456') { // Ganti dengan password yang aman
            window.location.href = '../index.html';
        }
    },
    
    setupEventListeners: function() {
        document.getElementById('addQuestionForm').addEventListener('submit', this.addQuestion.bind(this));
        document.getElementById('questionCategory').addEventListener('change', this.updateLevelOptions.bind(this));
    },
    
    loadQuestionBanks: function() {
        // Implementasi untuk memuat bank soal dari database
        console.log('Memuat bank soal...');
    },
    
    updateLevelOptions: function() {
        const category = document.getElementById('questionCategory').value;
        const levelSelect = document.getElementById('questionLevel');
        
        levelSelect.innerHTML = '';
        
        if (['logika', 'lagu', 'pribahasa'].includes(category)) {
            levelSelect.innerHTML = '<option value="umum">Umum</option>';
        } else {
            levelSelect.innerHTML = `
                <option value="sd">SD</option>
                <option value="smp">SMP</option>
                <option value="sma">SMA</option>
                <option value="umum">Umum</option>
            `;
        }
    },
    
    addQuestion: function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        const question = {
            id: `custom-${Date.now()}`,
            category: formData.get('category'),
            type: formData.get('category'),
            level: formData.get('level'),
            difficulty: formData.get('difficulty'),
            question: formData.get('question'),
            options: [
                { text: formData.get('optionA'), description: formData.get('descriptionA') },
                { text: formData.get('optionB'), description: formData.get('descriptionB') },
                { text: formData.get('optionC'), description: formData.get('descriptionC') },
                { text: formData.get('optionD'), description: formData.get('descriptionD') }
            ],
            correctAnswer: parseInt(formData.get('correctAnswer')),
            explanation: formData.get('explanation')
        };
        
        // Tambahkan ke database
        Database.addQuestionToBank(question);
        
        // Reset form
        form.reset();
        
        // Tampilkan pesan sukses
        alert('Pertanyaan berhasil ditambahkan ke bank soal!');
    },
    
    addQuestionToBank: function(question) {
        // Implementasi untuk menambahkan pertanyaan ke database
        console.log('Menambahkan pertanyaan:', question);
    }
};
