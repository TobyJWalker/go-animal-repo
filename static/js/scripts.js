var sidebar_open = false;

function toggleSidebar() {
    if (sidebar_open) {
        document.getElementById("sidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        sidebar_open = false;
    } else {
        document.getElementById("sidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        sidebar_open = true;
    }
}

function showAnimalForm() {
    document.getElementById("animal-popup-container").style.width = "100%";
    document.getElementById("add-animal-form").style.height = "50%";
};

function hideAnimalForm() {
    document.getElementById("animal-popup-container").style.width = "0";
    document.getElementById("add-animal-form").style.height = "0";
}

function showNoteForm() {
    document.getElementById("note-popup-container").style.width = "100%";
    document.getElementById("add-note-form").style.height = "60%";
};

function hideNoteForm() {
    document.getElementById("note-popup-container").style.width = "0";
    document.getElementById("add-note-form").style.height = "0";
}

function showInfoForm(){

    var editBtn = document.getElementById("edit-info-btn");
    editBtn.textContent = "done";
    editBtn.style.color = "limegreen";

    var animal_name_box = document.getElementById("animal-header");
    var animal_breed_box = document.getElementById("animal-breed");
    var animal_species_box = document.getElementById("animal-species");
    var animal_dob_text = document.getElementById("animal-dob");
    var animal_dob_input = document.getElementById("animal-dob-input");
    var animal_group_box = document.getElementById("animal-group");
    var animal_description_text = document.getElementById("animal-description");
    var animal_description_input = document.getElementById("animal-description-input");

    animal_name_box.setAttribute("contenteditable", "true");
    animal_name_box.classList.add("editable-text")

    animal_breed_box.setAttribute("contenteditable", "true");
    animal_breed_box.classList.add("editable-text")

    animal_species_box.setAttribute("contenteditable", "true");
    animal_species_box.classList.add("editable-text")

    animal_dob_text.style.display = "none";
    animal_dob_input.style.display = "block";
    animal_dob_input.classList.add("editable-text")

    animal_group_box.setAttribute("contenteditable", "true");
    animal_group_box.classList.add("editable-text")

    animal_description_text.style.display = "none";
    animal_description_input.style.display = "block";
    animal_description_input.classList.add("editable-text")
}