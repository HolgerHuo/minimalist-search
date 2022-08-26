/* Deprecated */
var mql = window.matchMedia('(orientation: portrait)');
console.log(mql);
function onMatchMediaChange(mql){
    if(mql.matches){
        $("txtq").css("background-color","none"); 
        console.log('Portrait enabled.')
    }else{
        $("txtq").removeClass("quick_hid"); 
        console.log('Landscape activated.')
    }
}
onMatchMediaChange(mql);
mql.addListener(onMatchMediaChange);
/*
    Copyright 2020 Holger https://holger.one Under GPLv3.0 @ https://github.com/holgerhuo/minimalist-search
*/