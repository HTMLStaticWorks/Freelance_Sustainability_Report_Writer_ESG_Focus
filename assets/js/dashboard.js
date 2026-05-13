document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
    const contentSections = document.querySelectorAll('.content-section');
    const sectionTitle = document.getElementById('currentSectionTitle');
    const goToOverviewBtn = document.querySelector('.go-to-overview');

    // Sidebar Toggle Logic
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.add('show');
        });
    }

    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('show');
        });
    }

    // Section Switching Logic
    function switchSection(sectionId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(`${sectionId}-section`) || document.getElementById('generic-section');
        targetSection.classList.add('active');

        // Update UI
        sidebarLinks.forEach(link => {
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
                if (sectionTitle) {
                    sectionTitle.textContent = link.textContent.trim() + ' Dashboard';
                }
            } else {
                link.classList.remove('active');
            }
        });

        // Close sidebar on mobile after click
        if (window.innerWidth < 992) {
            sidebar.classList.remove('show');
        }
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            switchSection(sectionId);
        });
    });

    if (goToOverviewBtn) {
        goToOverviewBtn.addEventListener('click', () => {
            switchSection('overview');
        });
    }

    // Dummy Chart Logic
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

    const sentimentCtx = document.getElementById('sentimentChart');
    if (sentimentCtx && typeof Chart !== 'undefined') {
        new Chart(sentimentCtx, {
            type: 'doughnut',
            data: {
                labels: ['Positive', 'Neutral', 'Negative'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: ['#0F766E', '#14B8A6', '#D4A017'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: { size: 11 }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
});
