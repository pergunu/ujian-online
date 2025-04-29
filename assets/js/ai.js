// File TERPISAH untuk handle AI (aman dari commit GitHub)
const OpenAI = {
  apiKey: localStorage.getItem('openai_key') || '',

  init() {
    if (!this.apiKey) {
      this.promptAPIKey();
    }
  },

  promptAPIKey() {
    const key = prompt("sk-8837b24327bd4db99e36688951ceaea8");
    if (key) {
      localStorage.setItem('openai_key', key);
      this.apiKey = key;
    }
  },

  async generateQuestion(prompt) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "user",
            content: `Buat 1 soal pilihan ganda dengan 5 opsi (A-E) tentang: ${prompt}. Format JSON contoh: {"question":"...","options":["A. ...","B. ...",..."E. ..."],"answer":0}`
          }]
        })
      });

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error("AI Error:", error);
      return null;
    }
  }
};
