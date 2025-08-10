let addNote = document.getElementById("addNote"); // Selects an element with id="addNote"
let deleteIcon = document.querySelector(".icon"); // Selects first element with class="icon"
let addBtn = document.getElementById("addBtn");

addNote.addEventListener("click", function() {
    document.querySelector(".addForm").style.display="block"
})

deleteIcon.addEventListener("click", function() {
    document.querySelector(".addForm").style.display="none"
})

addBtn.addEventListener("click", function() {
    document.querySelector(".addForm").style.display="none"

    let div = document.createElement("div");
    div.classList.add("addNote");
    div.innerHTML = `
    <h2>${document.getElementById("title").value}</h2>
    <p>${document.getElementById("description").value}</p>
    <button>Delete</button>
    `
    document.querySelector(".newNotes").appendChild(div)
})