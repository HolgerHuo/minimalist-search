const hasNativePrefersColorScheme =
        window.matchMedia('(prefers-color-scheme)').media !== 'not all';
let theme_value = localStorage.getItem('theme'),
    daily_theme_list = [], dark_theme_list = [];
daily_theme_list.push(document.getElementById('daily-theme'));
dark_theme_list.push(document.getElementById('dark-theme'));
let loadMode = function(mode) {
    if (mode !== "daily" && mode !== "dark") return;
    daily_theme_list.forEach((obj) => {
        if (mode === "daily") {
            if (obj.hasAttribute('disabled')) {
                obj.removeAttribute('disabled');
            }
            obj.setAttribute('media', 'all');
        } else {
            obj.setAttribute('disabled', '');
            obj.setAttribute('media', obj.getAttribute('data-original-media'));
        }
    });
    dark_theme_list.forEach((obj) => {
        if (mode === "daily") {
            obj.setAttribute('disabled', '');
            obj.setAttribute('media', obj.getAttribute('data-original-media'));
        } else {
            if (obj.hasAttribute('disabled')) {
                obj.removeAttribute('disabled');
            }
            obj.setAttribute('media', 'all');
        }
    });
    localStorage.setItem('theme', mode);
    theme_value = mode;
};
