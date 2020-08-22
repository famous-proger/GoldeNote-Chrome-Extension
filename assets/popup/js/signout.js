"use strict";




function signOut(){

    let signout_button = document.querySelector(".main-menu__btn_signout");

    signout_button.addEventListener('click', function () {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            let url = 'https://accounts.google.com/o/oauth2/revoke?token=' + token;
            window.fetch(url);

            chrome.identity.removeCachedAuthToken({ token: token }, function () {
                let popup_container = document.querySelector(".main-menu");
                popup_container.innerHTML = "";
                popup_container.append(getTemplate("#auth-screen"));
                popup_container.classList.add("change-menu_auth");
                let auth_button = document.querySelector(".main-menu__google-button");
                auth_button.addEventListener("click", authorizeUser);
                chrome.storage.local.set({ authorized: false });
                chrome.storage.local.remove("sheet_data");
            });
        });
    });

}