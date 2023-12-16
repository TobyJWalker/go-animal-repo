var animal_name_val = animal_name_box.textContent;
var animal_breed_val = animal_breed_box.textContent;
var animal_species_val = animal_species_box.textContent;
var animal_dob_val = animal_dob_text.textContent;
var animal_group_val = animal_group_box.textContent;
var animal_description_val = animal_description_text.textContent;

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

function closeApp() {
    fetch("/quit")
    // wait a moment
    setTimeout(function() {
        location.href = "https://www.google.com";
    }, 500);
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

function showInfoForm(animal_id){

    var editBtn = document.getElementById("edit-info-btn");
    edit_btn_colour = editBtn.style.color;
    editBtn.textContent = "done";
    editBtn.style.color = "limegreen";
    var new_func = "saveInfo(" + animal_id + ")";
    editBtn.setAttribute("onclick", new_func);

    var animal_name_box = document.getElementById("animal-header");
    animal_name_val = animal_name_box.textContent;
    
    var animal_breed_box = document.getElementById("animal-breed");
    animal_breed_val = animal_breed_box.textContent;

    var animal_species_box = document.getElementById("animal-species");
    animal_species_val = animal_species_box.textContent;

    var animal_dob_text = document.getElementById("animal-dob");
    var animal_dob_input = document.getElementById("animal-dob-input");
    animal_dob_val = animal_dob_text.textContent;

    var animal_group_box = document.getElementById("animal-group");
    animal_group_val = animal_group_box.textContent;

    var animal_description_text = document.getElementById("animal-description");
    var animal_description_input = document.getElementById("animal-description-input");
    animal_description_val = animal_description_text.textContent;

    var animal_img_box = document.getElementById("animal-page-img");
    animal_img_box.onclick = promptImageUpload;
    animal_img_box.style.cursor = "pointer";

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

async function saveInfo(animal_id) {
    var animal_name_box = document.getElementById("animal-header");
    var new_name = animal_name_box.textContent;
    
    var animal_breed_box = document.getElementById("animal-breed");
    var new_breed = animal_breed_box.textContent;

    var animal_species_box = document.getElementById("animal-species");
    var new_species = animal_species_box.textContent;

    var animal_dob_input = document.getElementById("animal-dob-input");
    var new_dob = animal_dob_input.value;

    var animal_group_box = document.getElementById("animal-group");
    var new_group = animal_group_box.textContent;

    var animal_description_input = document.getElementById("animal-description-input");
    var new_description = animal_description_input.value;

    var animal_img_input = document.getElementById("animal-img-input");

    if (new_name == "") {
        new_name = animal_name_val;
    }
    if (new_breed == "") {
        new_breed = animal_breed_val;
    }
    if (new_species == "") {
        new_species = "n/a";
    }
    if (new_dob == "") {
        new_dob = animal_dob_val;
    }
    if (new_group == "") {
        new_group = "n/a";
    }
    if (new_description == "") {
        new_description = "Nothing here yet...";
    }

    var url = "/animals/" + animal_id + "/edit";

    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: new_name,
            breed: new_breed,
            species: new_species,
            dob: new_dob,
            group: new_group,
            description: new_description,
        })
    }).then(res => console.log(res));

    // send image data
    if (animal_img_input.files.length > 0) {
        var upload_url = "/animals/" + animal_id + "/image";

        var img_data = new FormData();
        img_data.append("file", animal_img_input.files[0]);

        await fetch(upload_url, {
            method: "POST",
            body: img_data
        }).then(res => console.log(res));
    }

    setTimeout(function() {
        location.reload();
    }, 500);
}

function deleteNote(note_id) {
    document.getElementById(note_id).style.display = "none";

    var delete_url = "/notes/delete/" + note_id;

    fetch(delete_url, {
        method: "DELETE",
    }).then(res => console.log(res));
}

function promptImageUpload() {
    document.getElementById("animal-img-input").click();
}