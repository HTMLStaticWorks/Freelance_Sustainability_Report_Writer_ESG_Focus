document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (mainContent) mainContent.classList.toggle('active');
        });
    }

    // Dummy Chart Logic (using Chart.js if available, or just mock visuals)
    const ctx = document.getElementById('esgScoreChart');
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'ESG Score',
                    data: [65, 68, 75, 82, 85, 92],
                    borderColor: '#0F766E',
                    backgroundColor: 'rgba(15, 118, 110, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        });
    }

    const emissionsCtx = document.getElementById('emissionsChart');
    if (emissionsCtx && typeof Chart !== 'undefined') {
        new Chart(emissionsCtx, {
            type: 'bar',
            data: {
                labels: ['Scope 1', 'Scope 2', 'Scope 3'],
                datasets: [{
                    label: 'tCO2e',
                    data: [450, 320, 890],
                    backgroundColor: ['#0F766E', '#14B8A6', '#D4A017']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
});
