// Konfigurasi Aplikasi
const AppConfig = {
    // Pengaturan Umum
    appName: "Ujian Pergunu",
    organization: "PERGUNU SITUBONDO",
    defaultPassword: "65614222",
    
    // Pengaturan Kategori
    enabledCategories: {
        pelajar: true,
        umum: true,
        subcategories: {
            pelajar: {
                ipa: true,
                ips: true,
                matematika: true,
                agama: true,
                ppkn: true,
                sejarah: true,
                bahasa_indonesia: true,
                bahasa_inggris: true
            },
            umum: {
                logika: true
            }
        }
    },
    
    // Pengaturan Waktu
    defaultQuizTime: 90, // menit
    adhanInterval: 2 * 60 * 60 * 1000, // 2 jam (untuk demo)
    
    // Pengaturan Audio
    defaultVolume: 1.0,
    
    // API Endpoints (jika ada)
    apiBaseUrl: "",
    aiQuestionGeneratorEndpoint: ""
};

// Ekspor konfigurasi
export default AppConfig;
