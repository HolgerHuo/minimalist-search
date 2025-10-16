/*
    Copyright 2020 Holger https://holger.one Under GPLv3.0 @ https://github.com/holgerhuo/minimalist-search
*/

(function() {
    'use strict';
    
    let ping = 1;
    const urlList = ['http://holger.net.cn'];
    
    setInterval(() => {
        ping++;
    }, 100);
    
    function newRequest() {
        for (let i = 0; i < urlList.length; i++) {
            const pssElements = document.querySelectorAll('pss');
            if (pssElements[i]) {
                const pingElement = pssElements[i].querySelector('ping');
                if (pingElement) {
                    pingElement.innerHTML = 'Testing...';
                    
                    const img = document.createElement('img');
                    img.src = 'https://i.holger.net.cn/ping';
                    img.width = 1;
                    img.height = 1;
                    img.style.display = 'none';
                    img.onerror = () => autotest(i);
                    
                    pssElements[i].querySelector('ping').appendChild(img);
                }
            }
        }
    }
    
    function autotest(index) {
        const pssElements = document.querySelectorAll('pss');
        if (pssElements[index]) {
            const pingElement = pssElements[index].querySelector('ping');
            if (pingElement) {
                pingElement.textContent = (ping * 10) + 'ms';
            }
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', newRequest);
    } else {
        newRequest();
    }
})();
