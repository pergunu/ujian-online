// Admin Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const adminApp = {
        init: function() {
            this.loadParticipants();
            this.setupEventListeners();
        },

        loadParticipants: function() {
            const participants = JSON.parse(localStorage.getItem('participants')) || [];
            const results = JSON.parse(localStorage.getItem('examResults')) || [];
            
            // Gabungkan data peserta dengan hasil ujian
            const participantData = participants.map(participant => {
                const result = results.find(r => r.timestamp === participant.timestamp);
                return {...participant, ...result};
            });

            this.renderParticipantsTable(participantData);
        },

        renderParticipantsTable: function(data) {
            const tableBody = document.querySelector('#participants-table tbody');
            tableBody.innerHTML = '';

            data.forEach((participant, index) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${participant.fullname || '-'}</td>
                    <td>${participant.status ? participant.status.charAt(0).toUpperCase() + participant.status.slice(1) : '-'}</td>
                    <td>${participant.subject ? participant.subject.toUpperCase() : '-'}</td>
                    <td>${participant.score || '0'}</td>
                    <td>${participant.timestamp ? new Date(participant.timestamp).toLocaleDateString() : '-'}</td>
                    <td>${participant.certificateCode ? '✅' : '❌'}</td>
                `;

                tableBody.appendChild(row);
            });
        },

        setupEventListeners: function() {
            // Filter peserta
            document.getElementById('apply-participant-filter').addEventListener('click', () => {
                this.filterParticipants();
            });

            document.getElementById('reset-participant-filter').addEventListener('click', () => {
                document.getElementById('filter-participant-status').value = 'all';
                document.getElementById('filter-participant-date').value = '';
                this.loadParticipants();
            });

            // Export data
            document.getElementById('export-participants-btn').addEventListener('click', () => {
                this.exportParticipants();
            });
        },

        filterParticipants: function() {
            const statusFilter = document.getElementById('filter-participant-status').value;
            const dateFilter = document.getElementById('filter-participant-date').value;
            
            let participants = JSON.parse(localStorage.getItem('participants')) || [];
            const results = JSON.parse(localStorage.getItem('examResults')) || [];
            
            // Gabungkan data
            let filteredData = participants.map(participant => {
                const result = results.find(r => r.timestamp === participant.timestamp);
                return {...participant, ...result};
            });

            // Apply filters
            if (statusFilter !== 'all') {
                filteredData = filteredData.filter(p => p.status === statusFilter);
            }

            if (dateFilter) {
                const filterDate = new Date(dateFilter).toDateString();
                filteredData = filteredData.filter(p => {
                    const participantDate = new Date(p.timestamp).toDateString();
                    return participantDate === filterDate;
                });
            }

            this.renderParticipantsTable(filteredData);
        },

        exportParticipants: function() {
            const format = document.getElementById('export-format').value;
            let participants = JSON.parse(localStorage.getItem('participants')) || [];
            const results = JSON.parse(localStorage.getItem('examResults')) || [];
            
            // Gabungkan data
            const exportData = participants.map(participant => {
                const result = results.find(r => r.timestamp === participant.timestamp);
                return {...participant, ...result};
            });

            // Format data untuk ekspor
            const formattedData = exportData.map(p => ({
                'Nama Lengkap': p.fullname || '-',
                'Status': p.status ? p.status.charAt(0).toUpperCase() + p.status.slice(1) : '-',
                'Sekolah/Instansi': p.school || p.address || '-',
                'Nomor Induk': p.nis || '-',
                'WhatsApp': p.whatsapp || '-',
                'Email': p.email || '-',
                'Jenis Ujian': p.subject ? p.subject.toUpperCase() : '-',
                'Nilai': p.score || '0',
                'Tanggal Ujian': p.timestamp ? new Date(p.timestamp).toLocaleString() : '-',
                'Kode Sertifikat': p.certificateCode || '-'
            }));

            // Simulasikan ekspor (dalam aplikasi nyata, ini akan mengunduh file)
            console.log(`Exporting data in ${format} format:`, formattedData);
            alert(`Data peserta berhasil diekspor dalam format ${format.toUpperCase()} (simulasi)`);
        }
    };

    adminApp.init();
});
