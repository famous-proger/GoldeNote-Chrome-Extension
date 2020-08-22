"use strict";





function addListItem() {

    // ADD OPEN NOTE FUNCTIONALITY
    openNote();

    getElement("list_of_notes").innerHTML = "";
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        let get_table_items = new XMLHttpRequest();
        get_table_items.open('GET', `https://sheets.googleapis.com/v4/spreadsheets/${getElement("table_id").value}/values/${getElement("sheet_name").value}!A1%3Ak1000?key=${API_KEY}`);
        get_table_items.setRequestHeader('Authorization', `Bearer ${token}`);
        get_table_items.setRequestHeader('Accept', "application/json");
        get_table_items.send();

        get_table_items.addEventListener("load", function () {
            let all_rows = JSON.parse(get_table_items.response).values;
            // SORT OUT RESPONSE
            for (let row of all_rows) {


                let [id, date, title, description] = row;

                let list_item_template = getTemplate("#list-item-template");
                let list_item = list_item_template.querySelector(".main-menu__list-item");
                // ADD METADATA OF THE ITEM
                list_item.dataset.id = id;
                list_item.dataset.date = date;
                list_item.dataset.title = title;
                list_item.dataset.description = description;

                // DELETE NOTE ON BUTTON CLICK
                let delete_button = list_item_template.querySelector(".main-menu__delete-button");
                delete_button.addEventListener("click", function () {
                    deleteNote(list_item.dataset.id, list_item);
                });

                // COPY NOTE ON BUTTON CLICK
                let copy_button = list_item_template.querySelector(".main-menu__copy-button");
                copy_button.addEventListener("click", function () {
                    let text_content = `
                        ${date}\n
                        ${title}\n
                        ${description}\n
                        `;
                    navigator.clipboard.writeText(text_content)
                });

                // SET TITLE FOR NOTE
                let list_item_title = list_item_template.querySelector(".main-menu__item-title");
                list_item_title.innerHTML = title;
                // SET DATE FOR NOTE
                let list_item_date = list_item_template.querySelector(".main-menu__item-date");
                list_item_date.innerHTML = date;


                // ADD NOTE TO THE LIST
                getElement("list_of_notes").append(list_item_template);

                list_item_title.addEventListener('click', function () {
                    let single_note = document.querySelector(".main-menu__single-note");
                    single_note.classList.toggle("note__swipe_left");
                    // SET DATE FOR A SINGLE NOTE
                    let single_note_date = single_note.querySelector(".main-menu__single-note__date");
                    single_note_date.innerHTML = list_item.dataset.date;
                    // SET TITLE FOR A SINGLE NOTE
                    let single_note_title = single_note.querySelector(".main-menu__single-note__title");
                    single_note_title.innerHTML = list_item.dataset.title;
                    // SET DESCRIPTION FOR A SINGLE NOTE
                    let single_note_description = single_note.querySelector(".main-menu__single-note__description");
                    single_note_description.innerHTML = list_item.dataset.description;
                });



            }


        });

    });




}
