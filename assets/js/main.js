document.addEventListener('DOMContentLoaded', function() {
    // Navbar setup is now handled via CSS and HTML classes (sticky-top bg-theme-navbar)

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    const themeToggleMobile = document.getElementById('themeToggleMobile');
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const themeToggles = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')];
        themeToggles.forEach(btn => {
            if (!btn) return;
            const icon = btn.querySelector('i');
            if (theme === 'dark') {
                icon.className = 'bi bi-sun';
            } else {
                icon.className = 'bi bi-moon-stars';
            }
        });
    }

    // RTL Toggle
    const rtlToggle = document.getElementById('rtlToggle');
    const rtlToggleMobile = document.getElementById('rtlToggleMobile');
    
    const handleRtlToggle = () => {
        const currentDir = htmlElement.getAttribute('dir');
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        htmlElement.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
    };

    if (rtlToggle) {
        rtlToggle.addEventListener('click', handleRtlToggle);
    }
    if (rtlToggleMobile) {
        rtlToggleMobile.addEventListener('click', handleRtlToggle);
    }

    // Restore DIR
    const savedDir = localStorage.getItem('dir') || 'ltr';
    htmlElement.setAttribute('dir', savedDir);

    // Back to Top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                const count = +counter.innerText.replace(suffix, '');
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc) + suffix;
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target + suffix;
                }
            };
            updateCount();
        });
    };

    // Intersection Observer for Reveal
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                if (entry.target.classList.contains('counter-wrapper')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    // Password Visibility Toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye', 'bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash', 'bi-eye');
            }
        });
    });
});
