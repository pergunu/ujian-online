// Database module for handling questions and scores
class Database {
    static async loadQuestions(category, subcategory, level) {
        try {
            // Try to fetch from API first
            if (Config.apiBaseUrl) {
                const response = await fetch(`${Config.apiBaseUrl}${Config.endpoints.questions}?category=${category}&subcategory=${subcategory}&level=${level}`);
                if (response.ok) {
                    return await response.json();
                }
            }
            
            // Fallback to local data
            const localData = await this.loadLocalQuestions(category, subcategory, level);
            return localData;
        } catch (error) {
            console.error("Error loading questions:", error);
            return [];
        }
    }
    
    static async loadLocalQuestions(category, subcategory, level) {
        try {
            // Determine the path based on category
            let path = `data/questions/${category}`;
            if (category === 'pelajar') {
                path += `/${subcategory}/${level}.json`;
            } else {
                path += `/${level}.json`;
            }
            
            const response = await fetch(path);
            if (!response.ok) throw new Error("Failed to load local questions");
            return await response.json();
        } catch (error) {
            console.error("Error loading local questions:", error);
            return [];
        }
    }
    
    static async saveScore(userId, scoreData) {
        try {
            if (Config.apiBaseUrl) {
                const response = await fetch(`${Config.apiBaseUrl}${Config.endpoints.scores}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId,
                        ...scoreData
                    })
                });
                
                return response.ok;
            }
            
            // Fallback to local storage
            this.saveScoreToLocalStorage(userId, scoreData);
            return true;
        } catch (error) {
            console.error("Error saving score:", error);
            return false;
        }
    }
    
    static saveScoreToLocalStorage(userId, scoreData) {
        const scores = JSON.parse(localStorage.getItem(Config.storageKeys.scores) || "[]");
        scores.push({
            userId,
            ...scoreData,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(Config.storageKeys.scores, JSON.stringify(scores));
    }
}

export default Database;
