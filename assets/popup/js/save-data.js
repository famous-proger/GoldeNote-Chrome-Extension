"use strict";




 function saveData() {

    let click_event = new Event("click");

    chrome.storage.local.get(['sheet_data'], function (result) {
        if (result.sheet_data) {
            getElement("table_id").value = result.sheet_data.table_id;
            getElement("sheet_name").value = result.sheet_data.sheet_name;
            getElement("apply_button").dispatchEvent(click_event);
        }
    });

     getElement("apply_button").addEventListener("click", function () {

        let sheet_data = {
            table_id: getElement("table_id").value,
            sheet_name: getElement("sheet_name").value
        }

        chrome.storage.local.set({ sheet_data: sheet_data });
    });



}