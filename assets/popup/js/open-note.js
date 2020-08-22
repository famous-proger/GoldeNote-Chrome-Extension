"use strict";




function openNote() {

    let all_notes = document.querySelectorAll(".main-menu__list-item > p:nth-of-type(1)");
    let single_note = document.querySelector(".main-menu__single-note");
    let back_button = document.querySelector(".main-menu__back-button");


    for (let note of all_notes) {
        note.addEventListener('click', function () {
            single_note.classList.remove("note__swipe_left");
        });
    }

    back_button.addEventListener('click', function () {
        single_note.classList.add("note__swipe_left");
    });

}
