"use strict";



function addNewNote() {

    let new_note_date = document.querySelector(".main-menu__note-date");
    new_note_date.innerHTML = getDate();

    let add_button = document.querySelector("#main-menu__add-new-button");
    let note_title = document.querySelector("#main-menu__note-title");
    let note_description = document.querySelector("#main-menu__note-description");

    add_button.addEventListener("click", function () {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {

            let add_new_row = new XMLHttpRequest();
            add_new_row.open("POST", `https://sheets.googleapis.com/v4/spreadsheets/${getElement("table_id").value}/values/${getElement("sheet_name").value}!A%3AA:append?valueInputOption=RAW&key=${API_KEY}`);
            add_new_row.setRequestHeader('Authorization', `Bearer ${token}`);
            add_new_row.setRequestHeader('Accept', 'application/json');
            add_new_row.setRequestHeader('Content-Type', 'application/json');
            let request = {
                "values": [
                    [
                        guid(),
                        getDate(),
                        `${note_title.value}`,
                        `${note_description.value}`
                    ]
                ]
            }
            add_new_row.send(JSON.stringify(request));
            add_new_row.addEventListener("load", function () {
                addListItem();
                note_title.value = "";
                note_description.value = "";
            });
        });
    });

}

