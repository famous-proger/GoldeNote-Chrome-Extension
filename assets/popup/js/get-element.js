"use strict";



function getElement(element) {

    let response_obj = {
        apply_button: document.querySelector(".main-menu__btn_apply"),
        list_of_notes: document.querySelector(".main-menu__list"),
        table_id: document.querySelector("#input_table-id"),
        sheet_name: document.querySelector("#input_sheet-name"),
        single_note: document.querySelector(".main-menu__single-note")

    };
    

    return response_obj[element];
}