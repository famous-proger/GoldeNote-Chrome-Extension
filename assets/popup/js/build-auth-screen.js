"use strict";








function authProcess() {
    let popup_container = document.querySelector(".main-menu");
    // GET PREVIOUS TOKEN
    chrome.storage.local.get(['authorized'], function (result) {
        // IF IT EXISTS GET PREVIOUS STATE
        if (result.authorized) {
            popup_container.append(getTemplate("#main-screen"));
            connectToSheet();
        }
        else {
            // IF NOT, AUTHORIZE AND GET NEW TOKEN
            popup_container.append(getTemplate("#auth-screen"));
            popup_container.classList.add("change-menu_auth");
            let auth_button = document.querySelector(".main-menu__google-button");
            auth_button.addEventListener("click", authorizeUser);
        }
    });
}




