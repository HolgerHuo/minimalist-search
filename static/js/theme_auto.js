/*
    Copyright 2020 Holger https://holger.one Under GPLv3.0 @ https://github.com/holgerhuo/minimalist-search
*/

(function() {
    'use strict';
    
    const hasNativePrefersColorScheme = window.matchMedia('(prefers-color-scheme)').media !== 'not all';
    let theme_value = localStorage.getItem('theme');
    const daily_theme_list = [];
    const dark_theme_list = [];

    daily_theme_list.push(document.getElementById('daily-theme'));
    dark_theme_list.push(document.getElementById('dark-theme'));

    const loadMode = function(mode) {
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

    window.matchMedia('(prefers-color-scheme: dark)').addListener(({matches}) => {
        dispatchEvent(new CustomEvent("colorschemechange", {
            detail: {colorScheme: (matches ? "dark" : "daily")}
        }));
    });

    if (window.Cookies && Cookies.get('theme') !== "1" && Cookies.get('theme') !== "0") {
        const themeIcon = document.getElementById("theme-switch-icon");
        
        if ((window.matchMedia('(prefers-color-scheme: light)').matches) ||
            (window.matchMedia('(prefers-color-scheme: no-preference)').matches)) {
            if (themeIcon) themeIcon.setAttribute("src", "static/icon/icon-light.svg");
            Cookies.set('theme', 2, { expires: 1 });
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            if (themeIcon) themeIcon.setAttribute("src", "static/icon/icon-dark.svg");
            Cookies.set('theme', 3, { expires: 1 });
        }
        
        window.addEventListener('colorschemechange', (e) => {
            const themeIcon = document.getElementById("theme-switch-icon");
            
            if (e.detail.colorScheme == "dark") {
                if (Cookies.get('theme') !== "1" && Cookies.get('theme') !== "0") {
                    if (themeIcon) themeIcon.setAttribute("src", "static/icon/icon-dark.svg");
                }
                Cookies.set('theme', 3, { expires: 1 });
            }
            
            if (e.detail.colorScheme == "daily") {
                if (Cookies.get('theme') !== "1" && Cookies.get('theme') !== "0") {
                    if (themeIcon) themeIcon.setAttribute("src", "static/icon/icon-light.svg");
                }
                Cookies.set('theme', 2, { expires: 1 });
            }
        });
    }
})();
