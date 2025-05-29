// Admin Panel Controller
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.admin-nav a[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.dataset.section + '-section';
            
            // Hide all sections
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Load section data if needed
            loadSectionData(sectionId);
        });
    });
    
    // Tab navigation in settings
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected tab content
            document.getElementById(tabId).classList.add('active');
            
            // Update active tab button
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Load initial data
    loadDashboardData();
    
    // Question editor
    setupQuestionEditor();
    
    // AI generator
    setupAIGenerator();
    
    // Code settings
    setupCodeSettings();
    
    // Message settings
    setupMessageSettings();
    
    // Exam settings
    setupExamSettings();
});

function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'dashboard-section':
            loadDashboardData();
            break;
        case 'participants-section':
            loadParticipantsData();
            break;
        case 'questions-section':
            loadQuestionsData();
            break;
        case 'settings-section':
            loadSettingsData();
            break;
    }
}

async function loadDashboardData() {
    try {
        // Load participants data
        const participantsResponse = await fetch('../data/participants.json');
        const participants = await participantsResponse.json();
        
        // Load questions data
        const questionsResponse = await fetch('../data/questions.json');
        const questions = await questionsResponse.json();
        
        // Update stats
        document.getElementById('total-participants').textContent = participants.length;
        document.getElementById('total-questions').textContent = questions.length;
        
        // Show recent participants
        const recentParticipants = participants.slice(-5).reverse();
        const recentList = document.getElementById('recent-participants-list');
        recentList.innerHTML = '';
        
        recentParticipants.forEach(participant => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${participant.fullname}</td>
                <td>${participant.status}</td>
                <td>${participant.examType}</td>
                <td>${participant.score || '-'}</td>
                <td>${new Date(participant.timestamp).toLocaleString()}</td>
            `;
            recentList.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Implement other functions for participants, questions, settings management...
