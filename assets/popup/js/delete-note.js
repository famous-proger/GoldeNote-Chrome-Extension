"use strict";





function deleteNote(id, list_item) {

    // IF REQUEST STATE IS FREE, ADD A NEW TASK
    if (delete_note_func_state === "free") {
        // AND CHANGE ITS STATE FOR LOADING
        delete_note_func_state = "loading";

        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            // SEARCH MATCH FOR THE ROW AND INSERT RESULT INTO CELL
            let add_counter = new XMLHttpRequest();
            add_counter.open("PUT", `https://sheets.googleapis.com/v4/spreadsheets/${getElement("table_id").value}/values/${getElement("sheet_name").value}!G1%3AH1?includeValuesInResponse=true&valueInputOption=USER_ENTERED&key=${API_KEY}`);
            add_counter.setRequestHeader('Authorization', `Bearer ${token}`);
            add_counter.setRequestHeader('Accept', 'application/json');
            add_counter.setRequestHeader('Content-Type', 'application/json');

            let add_counter_request = {
                "values": [
                    [
                        "Found at",
                        "=MATCH(" + `\"${id}\"` + ", A1:A1000,0)"
                    ]
                ]
            }
            add_counter.send(JSON.stringify(add_counter_request));

            // ON LOAD GET RESULT FROM CELL AND DELETE APPROPRIATE ROW
            add_counter.addEventListener("load", function () {

                let result = JSON.parse(add_counter.response);
                // RESULT FROM CELL 
                let row_number = result.updatedData.values[0][1];
                console.log(row_number);
                let delete_row = new XMLHttpRequest();
                delete_row.open("POST", `https://sheets.googleapis.com/v4/spreadsheets/${getElement("table_id").value}:batchUpdate?key=${API_KEY}`);
                delete_row.setRequestHeader('Authorization', `Bearer ${token}`);
                delete_row.setRequestHeader('Accept', 'application/json');
                delete_row.setRequestHeader('Content-Type', 'application/json');
                let delete_row_request = {
                    "requests": [
                        {
                            "deleteRange": {
                                "shiftDimension": "ROWS",
                                "range": {
                                    "startColumnIndex": 0,
                                    "endColumnIndex": 7,
                                    "startRowIndex": row_number - 1,
                                    "endRowIndex": row_number
                                }
                            }
                        }
                    ]
                }
                delete_row.send(JSON.stringify(delete_row_request));
                delete_row.addEventListener("load", function () {
                    list_item.remove();
                    delete_note_func_state = "free";
                    if (requests_container.length !== 0) {
                        deleteNote(requests_container[0].id, requests_container[0].list_item);
                        requests_container.shift();
                    }
                });
            });
        });

    }
    else {
        requests_container.push({id: id, list_item: list_item});
        return;
    }

}