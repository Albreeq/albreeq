// =========================================================
// شركة البريق التقني المميز (AlBareeq AlTeqani AlMomayaz)
// Corporate Theme Persistence Manager
// =========================================================

(function applyThemeImmediate() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('darkModeToggle');
    
    if (toggleBtn) {
        toggleBtn.innerText = document.body.classList.contains('dark-mode') ? "الوضع الفاتح" : "الوضع الداكن";
        
        toggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            toggleBtn.innerText = isDark ? "الوضع الفاتح" : "الوضع الداكن";
            window.dispatchEvent(new Event('storage'));
        });
    }
});

window.addEventListener('storage', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});