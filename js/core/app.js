// app.js

let currentCategory = '';
let currentSubcategory = '';
let currentLevel = '';
let score = 0;
let quizStartTime = null;

function formatName(name) {
    return name.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
}

function generateUniqueCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        if (i > 0 && i % 4 === 0) code += '-';
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}
