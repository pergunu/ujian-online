class ScoreManager {
    static async getHighScores(category, subcategory, limit = 10) {
        try {
            if (Config.apiBaseUrl) {
                const response = await fetch(
                    `${Config.apiBaseUrl}${Config.endpoints.scores}?category=${category}&subcategory=${subcategory}&limit=${limit}`
                );
                return await response.json();
            }
            
            return this.getLocalHighScores(category, subcategory, limit);
        } catch (error) {
            console.error("Error fetching high scores:", error);
            return [];
        }
    }

    static getLocalHighScores(category, subcategory, limit) {
        const allScores = JSON.parse(localStorage.getItem(Config.storageKeys.scores) || "[]");
        return allScores
            .filter(score => 
                score.category === category && 
                score.subcategory === subcategory
            )
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, limit);
    }

    static getUserScores(userId) {
        const allScores = JSON.parse(localStorage.getItem(Config.storageKeys.scores) || "[]");
        return allScores.filter(score => score.userId === userId);
    }
}

export default ScoreManager;
