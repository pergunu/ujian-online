// Konfigurasi Aplikasi
export const Config = {
    // Pengaturan Umum
    examCode: "KODEUJIAN12345",
    adminPassword: "65614222",
    
    // Pengaturan Waktu
    examDuration: 90, // menit
    
    // Pengaturan Audio
    audioVolume: 1.0,
    
    // Daftar Kategori
    categories: {
        pelajar: {
            label: "Pelajar",
            subcategories: {
                ipa: "IPA",
                ips: "IPS",
                matematika: "Matematika",
                agama: "Agama",
                ppkn: "PPKN",
                sejarah: "Sejarah",
                bahasa_indonesia: "Bahasa Indonesia",
                bahasa_inggris: "Bahasa Inggris"
            }
        },
        umum: {
            label: "Umum",
            subcategories: {
                logika: "Ujian Logika"
            }
        }
    },
    
    // Level Kesulitan
    levels: {
        mudah: "Mudah",
        sedang: "Sedang",
        sulit: "Sulit"
    }
};
