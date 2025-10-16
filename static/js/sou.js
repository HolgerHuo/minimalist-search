/*
作者:D.Young
主页：https://yyv.me/
github：https://github.com/5iux/sou
日期：2019-07-26
版权所有，请勿删除
❶❷❸❹❺❻❼❽❾❿
由 yeetime 修改
github：https://github.com/yeetime/sou2
日期：2019-12-13
Modified by Holger Huo
https://holger.one/
Apr.11 2020
*/

(function() {
    'use strict';

    // ===== Constants =====
    const COOKIE_EXPIRY = 36500;
    const MOBILE_WIDTH_THRESHOLD = 640;

    // ===== Utility Functions =====
    const $ = (selector, context = document) => context.querySelector(selector);
    const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

    // Cookie utilities (replacing js.cookie.js) - Exposed globally for other scripts
    window.Cookies = {
        get: (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                const cookieValue = parts.pop().split(';').shift();
                try {
                    return decodeURIComponent(cookieValue);
                } catch (e) {
                    return cookieValue;
                }
            }
            return undefined;
        },
        set: (name, value, options = {}) => {
            let cookieString = `${name}=${encodeURIComponent(typeof value === 'object' ? JSON.stringify(value) : value)}`;
            if (options.expires) {
                const date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                cookieString += `; expires=${date.toUTCString()}`;
            }
            cookieString += '; path=/';
            document.cookie = cookieString;
        }
    };
    
    const Cookies = window.Cookies;

    // Simple tabs implementation (replacing jQuery.rTabs)
    function initTabs(container) {
        const navLinks = $$('.tab-nav a', container);
        const tabItems = $$('.tab-con-item', container);

        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove current class from all
                navLinks.forEach(l => l.classList.remove('current'));
                tabItems.forEach(t => t.style.display = 'none');
                
                // Add current class to clicked
                link.classList.add('current');
                tabItems[index].style.display = 'block';
            });
        });
    }

    // ===== Preinstalled Search Engines =====
    const SE_LIST_PREINSTALL = {
        '1': {
            id: 1,
            title: "Google",
            url: "https://www.google.com/search",
            name: "q",
            img: "./static/icon/google_1.png"
        },
        '2': {
            id: 2,
            title: "百度",
            url: "https://www.baidu.com/s",
            name: "wd",
            img: "./static/icon/baidu.ico"
        },
        '3': {
            id: 3,
            title: "Bing CN",
            url: "https://cn.bing.com/search",
            name: "q",
            img: "./static/icon/bing.ico"
        },
        '4': {
            id: 4,
            title: "多吉",
            url: "https://www.dogedoge.com/results",
            name: "q",
            img: "./static/icon/doge_ico.png"
        },
        '5': {
            id: 5,
            title: "秘迹",
            url: "https://mijisou.com",
            name: "q",
            img: "./static/icon/mijisou.png"
        },
        '6': {
            id: 6,
            title: "seeres*",
            url: "https://seeres.com/search",
            name: "q",
            img: "./static/icon/seeres.png"
        }
    };

    // ===== Preinstalled Quick Links =====
    const QUICK_LIST_PREINSTALL = {
        '1': {
            title: "Blog",
            url: "https://holger.one/",
            img: "https://mravatar.dragoncloud.win/avatar/holgerhuo@dragon-fly.club?no-cache=true&proxied=true",
            explain: "Holger's Blog"
        },
        '2': {
            title: "Island",
            url: "https://mast.dragon-fly.club",
            img: "https://island-media.icu/favicon.ico",
            explain: "Island 岛屿 | 一座属于你的岛屿"
        },
        '3': {
            title: "V2EX",
            url: "https://www.v2ex.com/",
            img: "./static/icon/v2ex.png",
            explain: "V2EX"
        },
        '4': {
            title: "Steam",
            url: "https://store.steampowered.com/",
            img: "./static/icon/steam.ico",
            explain: "Steam"
        },
        '5': {
            title: "GitHub",
            url: "https://github.com/",
            img: "./static/icon/github.ico",
            explain: "GitHub"
        }
    };

    // ===== Data Management Functions =====
    function getSeList() {
        const seListLocal = Cookies.get('se_list');
        if (seListLocal && seListLocal !== "{}") {
            return JSON.parse(seListLocal);
        }
        setSeList(SE_LIST_PREINSTALL);
        return SE_LIST_PREINSTALL;
    }

    function setSeList(seList) {
        if (seList) {
            Cookies.set('se_list', seList, { expires: COOKIE_EXPIRY });
            return true;
        }
        return false;
    }

    function getSeDefault() {
        return Cookies.get('se_default') || '1';
    }

    function getQuickList() {
        const quickListLocal = Cookies.get('quick_list');
        if (quickListLocal && quickListLocal !== "{}") {
            return JSON.parse(quickListLocal);
        }
        setQuickList(QUICK_LIST_PREINSTALL);
        return QUICK_LIST_PREINSTALL;
    }

    function setQuickList(quickList) {
        if (quickList) {
            Cookies.set('quick_list', quickList, { expires: COOKIE_EXPIRY });
            return true;
        }
        return false;
    }

    function isValidNumber(value) {
        return /^\+?[1-9][0-9]*$/.test(value);
    }

    // ===== Search Engine Functions =====
    function searchData() {
        const seDefault = getSeDefault();
        const seList = getSeList();
        const defaultSe = seList[seDefault];
        
        if (defaultSe) {
            $('.search').setAttribute('action', defaultSe.url);
            $('.se').setAttribute('src', defaultSe.img);
            $('.wd').setAttribute('name', defaultSe.name);
        }
    }

    function renderSeList() {
        const seList = getSeList();
        const html = Object.keys(seList).map(key => {
            const se = seList[key];
            return `<li style='float: left; width: 80px!important; height: 30px!important; line-height: 30px; text-align: left; font-size: 14px; left: 15px; padding: 5px 10px 5px 10px; margin: 0 10px 10px 0; cursor: pointer; list-style: none; position: relative; border-radius: 10px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;' class='se-li' data-url='${se.url}' data-name='${se.name}' data-img='${se.img}'><img src='${se.img}'></img>${se.title}</li>`;
        }).join('');
        
        $('.search-engine-list').innerHTML = html;
    }

    function setSeInit() {
        const seDefault = getSeDefault();
        const seList = getSeList();
        
        const html = Object.keys(seList).map(key => {
            const se = seList[key];
            const isDefault = key === seDefault;
            const homeIcon = isDefault ? "<span class='iconfont iconhome'></span>" : "";
            
            return `<tr>
                <td>${homeIcon}</td>
                <td>${key}. ${se.title}</td>
                <td>
                    <button class='set_se_default' value='${key}'><span class='iconfont iconstrore-add'></span></button>
                    <button class='edit_se' value='${key}'><span class='iconfont iconbook-edit'></span></button>
                    <button class='delete_se' value='${key}'><span class='iconfont icondelete'></span></button>
                </td>
            </tr>`;
        }).join('');
        
        $('.se_list_table').innerHTML = html;
    }

    // ===== Quick Links Functions =====
    function quickData() {
        const quickList = getQuickList();
        
        const html = Object.keys(quickList).map(key => {
            const quick = quickList[key];
            return `<li class='quick' target='_blank' title='${quick.explain}'>
                <a class='quick_div_a' target='_blank' href='${quick.url}'>
                    <i style='background-image: url(${quick.img});'></i>
                    <div id='txtq'>${quick.title}</div>
                </a>
            </li>`;
        }).join('');
        
        $('.quick-ul').innerHTML = html;
    }

    function setQuickInit() {
        const quickList = getQuickList();
        
        const html = Object.keys(quickList).map(key => {
            const quick = quickList[key];
            return `<tr>
                <td>${key}.&nbsp;</td>
                <td>${quick.title}</td>
                <td>
                    <button class='edit_quick' value='${key}'><span class='iconfont iconbook-edit'></span></button>
                    &nbsp;
                    <button class='delete_quick' value='${key}'><span class='iconfont icondelete'></span></button>
                </td>
            </tr>`;
        }).join('');
        
        $('.quick_list_table').innerHTML = html;
    }

    // ===== Event Handlers =====
    function initEventHandlers() {
        // Search engine selector toggle
        document.addEventListener('click', (e) => {
            const searchEngine = $('.search-engine');
            const seButton = $('.se');
            
            if (searchEngine.style.display === 'none' && e.target === seButton) {
                renderSeList();
                searchEngine.style.display = 'block';
            } else if (e.target !== searchEngine && !searchEngine.contains(e.target)) {
                searchEngine.style.display = 'none';
            }
        });

        // Search engine selection (event delegation)
        $('.search-engine-list').addEventListener('click', (e) => {
            const li = e.target.closest('.se-li');
            if (li) {
                const url = li.dataset.url;
                const name = li.dataset.name;
                const img = li.dataset.img;
                
                $('.search').setAttribute('action', url);
                $('.wd').setAttribute('name', name);
                $('.se').setAttribute('src', img);
                $('.search-engine').style.display = 'none';
            }
        });

        // Menu toggle
        $('#menu').addEventListener('click', () => {
            $('#menu').classList.toggle('on');
            $('.side').classList.toggle('closed');
        });

        $('#content').addEventListener('click', () => {
            $('#menu').classList.remove('on');
            $('.side').classList.add('closed');
        });

        // Set default search engine (event delegation)
        $('.se_list_table').addEventListener('click', (e) => {
            if (e.target.closest('.set_se_default')) {
                const button = e.target.closest('.set_se_default');
                const name = button.value;
                Cookies.set('se_default', name, { expires: COOKIE_EXPIRY });
                setSeInit();
            }
        });

        // Add search engine
        $('.set_se_list_add').addEventListener('click', () => {
            $$('.se_add_content input').forEach(input => input.value = '');
            $('.se_add_content').style.display = 'block';
        });

        // Save search engine
        $('.se_add_save').addEventListener('click', () => {
            const keyInhere = $('.se_add_content input[name="key_inhere"]').value;
            const key = $('.se_add_content input[name="key"]').value;
            const title = $('.se_add_content input[name="title"]').value;
            const url = $('.se_add_content input[name="url"]').value;
            const name = $('.se_add_content input[name="name"]').value;
            const img = $('.se_add_content input[name="img"]').value;

            if (!isValidNumber(key)) {
                alert(`Sequence ${key} is invalid!`);
                return;
            }

            const seList = getSeList();

            if (seList[key]) {
                alert(`Sequence ${key} has been taken!`);
                return;
            }

            if (keyInhere && key !== keyInhere) {
                delete seList[keyInhere];
            }

            seList[key] = { title, url, name, img };
            setSeList(seList);
            setSeInit();
            $('.se_add_content').style.display = 'none';
        });

        // Cancel search engine form
        $('.se_add_cancel').addEventListener('click', () => {
            $('.se_add_content').style.display = 'none';
        });

        // Edit search engine (event delegation)
        $('.se_list').addEventListener('click', (e) => {
            if (e.target.closest('.edit_se')) {
                const button = e.target.closest('.edit_se');
                const seList = getSeList();
                const key = button.value;
                const se = seList[key];
                
                $('.se_add_content input[name="key_inhere"]').value = key;
                $('.se_add_content input[name="key"]').value = key;
                $('.se_add_content input[name="title"]').value = se.title;
                $('.se_add_content input[name="url"]').value = se.url;
                $('.se_add_content input[name="name"]').value = se.name;
                $('.se_add_content input[name="img"]').value = se.img;
                $('.se_add_content').style.display = 'block';
            }
        });

        // Delete search engine (event delegation)
        $('.se_list').addEventListener('click', (e) => {
            if (e.target.closest('.delete_se')) {
                const button = e.target.closest('.delete_se');
                const seDefault = getSeDefault();
                const key = button.value;
                
                if (key === seDefault) {
                    alert("Cannot delete default search engine!");
                } else if (confirm(`Delete sequence ${key}?`)) {
                    const seList = getSeList();
                    delete seList[key];
                    setSeList(seList);
                    setSeInit();
                }
            }
        });

        // Reset search engines
        $('.set_se_list_preinstall').addEventListener('click', () => {
            if (confirm("Current settings will be removed! (You'd better backup before performing this)")) {
                setSeList(SE_LIST_PREINSTALL);
                Cookies.set('se_default', '1', { expires: COOKIE_EXPIRY });
                setSeInit();
            }
        });

        // Add quick link
        $('.set_quick_list_add').addEventListener('click', () => {
            $$('.quick_add_content input').forEach(input => input.value = '');
            $('.quick_add_content').style.display = 'block';
        });

        // Save quick link
        $('.quick_add_save').addEventListener('click', () => {
            const keyInhere = $('.quick_add_content input[name="key_inhere"]').value;
            const key = $('.quick_add_content input[name="key"]').value;
            const title = $('.quick_add_content input[name="title"]').value;
            const url = $('.quick_add_content input[name="url"]').value;
            const img = $('.quick_add_content input[name="img"]').value;

            if (!isValidNumber(key)) {
                alert(`Sequence ${key} is invalid!`);
                return;
            }

            const quickList = getQuickList();

            if (quickList[key]) {
                alert(`Sequence ${key} has been taken!`);
                return;
            }

            if (keyInhere && key !== keyInhere) {
                delete quickList[keyInhere];
            }

            quickList[key] = { title, url, img };
            setQuickList(quickList);
            setQuickInit();
            $('.quick_add_content').style.display = 'none';
        });

        // Cancel quick link form
        $('.quick_add_cancel').addEventListener('click', () => {
            $('.quick_add_content').style.display = 'none';
        });

        // Reset quick links
        $('.set_quick_list_preinstall').addEventListener('click', () => {
            if (confirm("Current settings will be removed! (You'd better backup before performing this)")) {
                setQuickList(QUICK_LIST_PREINSTALL);
                setQuickInit();
            }
        });

        // Edit quick link (event delegation)
        $('.quick_list').addEventListener('click', (e) => {
            if (e.target.closest('.edit_quick')) {
                const button = e.target.closest('.edit_quick');
                const quickList = getQuickList();
                const key = button.value;
                const quick = quickList[key];
                
                $('.quick_add_content input[name="key_inhere"]').value = key;
                $('.quick_add_content input[name="key"]').value = key;
                $('.quick_add_content input[name="title"]').value = quick.title;
                $('.quick_add_content input[name="url"]').value = quick.url;
                $('.quick_add_content input[name="img"]').value = quick.img;
                $('.quick_add_content').style.display = 'block';
            }
        });

        // Delete quick link (event delegation)
        $('.quick_list').addEventListener('click', (e) => {
            if (e.target.closest('.delete_quick')) {
                const button = e.target.closest('.delete_quick');
                const key = button.value;
                
                if (confirm(`Delete sequence ${key}?`)) {
                    const quickList = getQuickList();
                    delete quickList[key];
                    setQuickList(quickList);
                    setQuickInit();
                }
            }
        });

        // Export data
        $('#my_data_out').addEventListener('click', () => {
            const mydata = {
                se: getSeList(),
                se_default: getSeDefault(),
                quick: getQuickList()
            };
            $('#data_txt').value = JSON.stringify(mydata);
        });

        // Import data
        $('#my_data_in').addEventListener('click', () => {
            const json = $('#data_txt').value;

            try {
                const mydata = JSON.parse(json);
                
                if (typeof mydata !== 'object') {
                    alert("Invalid format!");
                    return;
                }

                if (confirm("Current settings will be erased, continue?")) {
                    setSeList(mydata.se);
                    if (mydata.se_default) {
                        Cookies.set('se_default', mydata.se_default, { expires: COOKIE_EXPIRY });
                    }
                    setQuickList(mydata.quick);

                    searchData();
                    quickData();
                    setSeInit();
                    setQuickInit();

                    alert("Success!");
                }
            } catch (e) {
                alert("Invalid backup!");
            }
        });
    }

    // ===== Initialization =====
    function init() {
        // Load search engine data
        searchData();

        // Load quick links data
        quickData();

        // Set autocomplete based on window size
        const wid = document.body.offsetWidth;
        if (wid < MOBILE_WIDTH_THRESHOLD) {
            $('.wd').setAttribute('autocomplete', 'off');
        } else {
            $('.wd').focus();
        }

        // Initialize settings
        setSeInit();
        setQuickInit();

        // Initialize sidebar tabs
        initTabs($('.side'));

        // Initialize event handlers
        initEventHandlers();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
