export const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');

    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    document.body.appendChild(overlay);

    void overlay.offsetWidth; // reflow

    overlay.classList.add('animate');

    setTimeout(() => {
        root.classList.toggle('dark');
        overlay.classList.add('fade-out');

        // Save theme to localStorage
        const newTheme = root.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    }, 200);

    setTimeout(() => {
        overlay.remove();
    }, 400);
};