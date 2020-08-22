"use strict";



function getTemplate(selector) {
    let template = document.querySelector(selector).content.cloneNode(true);
    return template;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function getDate() {
    let current_timestamp = Date.now();
    let formatter = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
    });
    let current_date = formatter.format(current_timestamp);
    return current_date;
}


function authorizeUser() {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        if (token) {
            let popup_container = document.querySelector(".main-menu");
            popup_container.innerHTML = "";
            popup_container.append(getTemplate("#main-screen"));
            popup_container.classList.remove("change-menu_auth");
            chrome.storage.local.set({ authorized: true });
            connectToSheet();
        }
    });
}

