const t={btStart:document.querySelector("button[data-start]"),btStop:document.querySelector("button[data-stop]"),body:document.querySelector("body")};t.btStart.addEventListener("click",(function(){t.btStart.disabled=!0,colorChangeInteval=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),t.btStop.addEventListener("click",(function(){t.btStart.disabled=!1,clearInterval(colorChangeInteval)}));
//# sourceMappingURL=01-color-switcher.765166dd.js.map