/* manual switch */
/*
    Copyright 2020 Holger https://holger.one Under GPLv3.0 @ https://github.com/holgerhuo/minimalist-search
*/

(function() {
    'use strict';
    
    function themeDark() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'static/css/sou_night.css';
        document.head.appendChild(link);
    }
    
    function themeLight() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'static/css/sou.css';
        document.head.appendChild(link);
    }
    
    function initThemeSwitch() {
        if (!window.Cookies) return;
        
        const theme = Cookies.get('theme');
        const themeIcon = document.getElementById("theme-switch-icon");
        
        if (!themeIcon) return;
        
        if (theme == '1') {
            themeIcon.setAttribute("src", "static/icon/icon-dark.svg");
        }
        if (theme == '0') {
            themeIcon.setAttribute("src", "static/icon/icon-light.svg");
        }
    }
    
    function initTheme() {
        if (!window.Cookies) return;
        
        const theme = Cookies.get('theme');
        
        if (theme == '1') {
            themeDark();
        }
        if (theme == '0') {
            themeLight();
        }
        
        initThemeSwitch();
    }
    
    function setupThemeToggle() {
        if (!window.Cookies) return;
        
        const themeSwitch = document.getElementById("theme-switch");
        const themeIcon = document.getElementById("theme-switch-icon");
        
        if (!themeSwitch || !themeIcon) return;
        
        themeSwitch.addEventListener('click', function() {
            let theme = Cookies.get('theme');
            
            if (theme == '1' || theme == '3') {
                Cookies.set('theme', 0, { expires: 1 });
                themeLight();
                themeIcon.setAttribute("src", "static/icon/icon-light.svg");
            } else if (theme == "0" || theme == '2') {
                Cookies.set('theme', '1', { expires: 1 });
                themeDark();
                themeIcon.setAttribute("src", "static/icon/icon-dark.svg");
            }
            
            initThemeSwitch();
        });
    }
    
    // Initialize theme
    initTheme();
    
    // Setup toggle when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupThemeToggle);
    } else {
        setupThemeToggle();
    }
})();
