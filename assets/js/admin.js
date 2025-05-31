// Admin JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    checkAdminAuth();
    
    // Admin login functionality
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const adminCode = document.getElementById('admin-code-input').value;
            const storedAdminCode = localStorage.getItem('adminCode') || '65614222';
            
            if (adminCode === storedAdminCode) {
                sessionStorage.setItem('isAdmin', 'true');
                window.location.href = 'admin/index.html';
            } else {
                alert('Kode admin salah. Silakan coba lagi.');
            }
        });
    }
});

function checkAdminAuth() {
    // Skip check for login page
    if (window.location.pathname.includes('admin-login.html')) return;
    
    // Check if admin is authenticated
    const isAdmin = sessionStorage.getItem('isAdmin');
    
    if (!isAdmin) {
        window.location.href = 'admin-login.html';
    }
}

// Function to generate sample data for demonstration
function generateSampleData() {
    if (!localStorage.getItem('questions')) {
        const sampleQuestions = [
            {
                id: '1',
                category: 'pelajar',
                subject: 'sejarah',
                level: 'smp',
                text: 'Apa ibukota Indonesia?',
                options: ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Yogyakarta'],
                correctAnswer: 0,
                explanation: 'Jakarta adalah ibukota Indonesia sejak tahun 1945.'
            },
            {
                id: '2',
                category: 'pelajar',
                subject: 'ppkn',
                level: 'sma',
                text: 'Siapa presiden pertama Indonesia?',
                options: ['Soeharto', 'Joko Widodo', 'Soekarno', 'BJ Habibie', 'Susilo Bambang Yudhoyono'],
                correctAnswer: 2,
                explanation: 'Ir. Soekarno adalah presiden pertama Indonesia yang menjabat dari tahun 1945 hingga 1967.'
            },
            {
                id: '3',
                category: 'umum',
                subject: 'logika',
                level: 'umum',
                text: 'Jika semua manusia adalah makhluk hidup, dan Andi adalah manusia, maka:',
                options: [
                    'Andi adalah makhluk hidup',
                    'Andi bukan makhluk hidup',
                    'Makhluk hidup adalah Andi',
                    'Tidak dapat disimpulkan',
                    'Semua salah'
                ],
                correctAnswer: 0,
                explanation: 'Berdasarkan premis, jika semua manusia adalah makhluk hidup dan Andi adalah manusia, maka Andi adalah makhluk hidup.'
            },
            {
                id: '4',
                category: 'cpns',
                subject: 'cpns',
                level: 'umum',
                text: 'Pancasila sebagai dasar negara tercantum dalam:',
                options: [
                    'Pembukaan UUD 1945',
                    'Batang Tubuh UUD 1945',
                    'Penjelasan UUD 1945',
                    'Keputusan Presiden',
                    'Tap MPR'
                ],
                correctAnswer: 0,
                explanation: 'Pancasila sebagai dasar negara tercantum dalam alinea keempat Pembukaan UUD 1945.'
            }
        ];
        
        localStorage.setItem('questions', JSON.stringify(sampleQuestions));
    }
    
    if (!localStorage.getItem('participants')) {
        const sampleParticipants = [
            {
                id: '1',
                name: 'Uswatun Hasanah',
                status: 'completed',
                examType: 'pelajar',
                examSubject: 'SEJARAH',
                score: 85,
                date: '2023-05-15'
            },
            {
                id: '2',
                name: 'Budi Santoso',
                status: 'inprogress',
                examType: 'umum',
                examSubject: 'Ujian Logika',
                score: null,
                date: '2023-05-16'
            },
            {
                id: '3',
                name: 'Ani Wijaya',
                status: 'failed',
                examType: 'cpns',
                examSubject: 'Ujian CPNS/P3K',
                score: 45,
                date: '2023-05-14'
            }
        ];
        
        localStorage.setItem('participants', JSON.stringify(sampleParticipants));
    }
}

// Initialize sample data if the admin page is loaded
if (window.location.pathname.includes('admin/')) {
    generateSampleData();
}
