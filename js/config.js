// js/config.js
export const Config = {
    examCode: "KODEUJIAN12345",
    adminPassword: "65614222",
    examDuration: 90,
    audioVolume: 1.0,
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
                logika: "Logika"
            }
        }
    },
    levels: ["mudah", "sedang", "sulit"],
    questions: {
        pelajar: {
            ipa: {
                mudah: [
                    {
                        question: "Organ yang memompa darah adalah...",
                        options: ["Jantung", "Paru-paru", "Hati", "Ginjal"],
                        answer: 0,
                        explanation: "Jantung adalah organ yang bertugas memompa darah."
                    }
                ],
                sedang: [],
                sulit: []
            }
        },
        umum: {
            logika: {
                mudah: [],
                sedang: [],
                sulit: []
            }
        }
    }
};
