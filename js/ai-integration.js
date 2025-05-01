async function fetchAIGeneratedQuestions(category, level, count) {
  // This would be replaced with actual API calls to your AI service
  const prompt = `Generate ${count} quiz questions for category ${category} and level ${level} in Indonesian. 
  Each question should have:
  - A clear question text
  - 4 options (A-D) with detailed explanations for each
  - A correct answer (0-3)
  - Context or background information about the question
  - Difficulty level (easy, medium, hard)
  
  Return in JSON format like:
  {
    "questions": [
      {
        "id": "unique_id",
        "question": "...",
        "context": "...",
        "options": [
          {"text": "...", "explanation": "..."},
          ...
        ],
        "correctAnswer": 0,
        "difficulty": "medium"
      }
    ]
  }`;
  
  try {
    // In a real implementation, this would call your AI API
    const response = await fetch('https://api.your-ai-service.com/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({ prompt })
    });
    
    return await response.json();
  } catch (error) {
    console.error('AI generation failed:', error);
    return { questions: [] };
  }
}
