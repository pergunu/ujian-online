document.addEventListener('DOMContentLoaded', function() {
    // This file would contain additional admin-specific functionality
    // Currently most admin functionality is in main.js
    
    // You can add more complex admin features here if needed
    console.log('Admin JS loaded');
});

// ===== AI QUESTION GENERATOR =====
document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-questions');
    const apiKeyInput = document.getElementById('api-key');
    const aiPromptInput = document.getElementById('ai-prompt');
    const resultsContainer = document.getElementById('ai-results');
    
    generateBtn.addEventListener('click', async function() {
        const apiKey = apiKeyInput.value.trim();
        const prompt = aiPromptInput.value.trim();
        
        if (!apiKey) {
            alert('sk-8837b24327bd4db99e36688951ceaea8');
            return;
        }
        
        if (!prompt) {
            alert('Masukkan prompt untuk generate soal');
            return;
        }
        
        // Tampilkan loading
        resultsContainer.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p>Sedang membuat soal...</p>
            </div>
        `;
        
        try {
            // Ganti dengan API endpoint yang sesuai
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "text-davinci-003",
                    prompt: `Buatkan soal pilihan ganda dengan format:\n\nPertanyaan: [pertanyaan]\nA. [opsi A]\nB. [opsi B]\nC. [opsi C]\nD. [opsi D]\nE. [opsi E]\nJawaban benar: [huruf]\nPenjelasan: [penjelasan]\n\nBerdasarkan topik: ${prompt}`,
                    max_tokens: 1000,
                    temperature: 0.7
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message);
            }
            
            // Proses hasil
            const generatedText = data.choices[0].text.trim();
            const questions = parseGeneratedQuestions(generatedText);
            
            // Tampilkan hasil
            displayGeneratedQuestions(questions);
            
        } catch (error) {
            console.error('Error:', error);
            resultsContainer.innerHTML = `
                <div class="alert alert-danger">
                    Gagal generate soal: ${error.message}
                </div>
            `;
        }
    });
    
    function parseGeneratedQuestions(text) {
        // Implementasi parsing hasil AI
        // ... (detail parsing disesuaikan dengan format output AI)
    }
    
    function displayGeneratedQuestions(questions) {
        // Implementasi tampilan hasil
        // ... (detail tampilan disesuaikan kebutuhan)
    }
});
