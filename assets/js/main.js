/* Global Styles */
:root {
  --primary: #6a11cb;
  --secondary: #2575fc;
  --accent: #ff8a00;
  --light: #f8f9fa;
  --dark: #212529;
  --success: #28a745;
  --danger: #dc3545;
  --warning: #ffc107;
  --info: #17a2b8;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

body {
  background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--light);
}

/* Particle Background */
#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

/* Animations */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Layout Components */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}

.card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

/* Buttons */
.btn-gradient {
  background: linear-gradient(to right, var(--primary), var(--secondary));
  border: none;
  color: white;
  padding: 12px 25px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-gradient:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(to right, var(--secondary), var(--primary));
}

/* Form Elements */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    width: 95%;
    padding: 1rem 0;
  }
  
  .card {
    padding: 1.5rem;
  }
  
  .btn-gradient {
    padding: 10px 20px;
    font-size: 14px;
  }
}

/* Tambahkan style untuk komponen lainnya sesuai kebutuhan */
