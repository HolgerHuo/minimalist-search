/* manual switch*/
function themeDark(){$('head').append('<link rel="stylesheet" href="static/css/sou_night.css" />');}
function themeLight(){$('head').append('<link rel="stylesheet" href="static/css/sou.css" />');}
function initThemeSwitch(){
    theme = Cookies.get('theme');
	if(theme == '1'){
		$("#theme-switch-icon").attr("src", "static/icon/icon-dark.svg");
    }
    if(theme == '0'){
		$("#theme-switch-icon").attr("src", "static/icon/icon-light.svg");
	}
}
function initTheme(){ 
    theme = Cookies.get('theme');
    if(theme =='1'){
        themeDark();
    }
    if(theme == '0'){
        themeLight();
    }
initThemeSwitch();
} 
initTheme();

$(document).ready(function(){
  theme = Cookies.get('theme');
  $("#theme-switch").click(function() {
    if(theme == "0" || window.matchMedia('(prefers-color-scheme: light)').matches){
      Cookies.set('theme', '1', { expires: 1 });
      themeDark();
      $("#theme-switch-icon").attr("src", "static/icon/icon-dark.svg");
    }
    else if (theme == "1" || window.matchMedia('(prefers-color-scheme: dark)').matches){
        Cookies.set('theme',0, { expires: 1 });
        themeLight();
        $("#theme-switch-icon").attr("src", "static/icon/icon-light.svg");
    }
    initThemeSwitch();
  });
});