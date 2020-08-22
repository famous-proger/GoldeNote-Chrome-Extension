"use strict";



function connectToSheet() {
    

    // ADD NEW NOTE FUNCTIONALITY
    addNewNote();
    // ADD SAVE DATE FUNCTIONALITY
    saveData();
    // ADD SIGN OUT FUNCTIONALITY
    signOut();

    // ON CLICK GET ALL DATA FROM THE GOOGLE SHEET AND INSERT INTO POP-UP SECTION
    getElement("apply_button").addEventListener("click", addListItem);

}

