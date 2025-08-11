const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

// ===== FUNCTION TO SHOW SAVED NOTES FROM localStorage =====
function showNotes() {
    // Load saved notes from browser storage and display them
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes(); // Run immediately when page loads

// ===== FUNCTION TO UPDATE STORAGE =====
function updateStorage() {
    // Save current notes HTML into localStorage
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// ===== EVENT: CREATE A NEW NOTE =====
createBtn.addEventListener("click", () => {
    // Create a paragraph element for the note
    let inputBox = document.createElement("p"); 
    
    // Create a paragraph element for the note
    let img = document.createElement("img");
    
    // Assign CSS class to note
    inputBox.className = "input-box";
    
    // Make the note editable directly in browser
    inputBox.setAttribute("contenteditable", "true");
    
    // Set image source for delete icon
    img.src = "images/delete.png";
    
    // Add the note to container and append the delete icon inside it
    notesContainer.appendChild(inputBox).appendChild(img);
})

// ===== EVENT: HANDLE DELETE AND TYPING =====
notesContainer.addEventListener("click", function(e) {
    // If delete icon (IMG) is clicked
    if(e.target.tagName === "IMG") {
        e.target.parentElement.remove(); // Remove the note
        updateStorage(); // Save the changes
    }
    // If note (P) is clicked for editing
    else if(e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box"); // Get all notes again
        notes.forEach(nt => {
            // Save note to storage every time user types
            nt.onkeyup = function() {
                updateStorage();
            }
        })
    }
})

// ===== EVENT: PREVENT ENTER FROM CREATING NEW PARAGRAPH =====
document.addEventListener("keydown", event => {
    if(event.key === "Enter") {
        document.execCommand("insertLineBreak"); // Add line break instead
        event.preventDefault(); // Stop default paragraph break
    }
})

// SUMMARY – HOE IT WORKS
// Loads saved notes from localStorage on page load.
// Creates new editable notes with a delete icon when the button is clicked.
// Deletes notes when the trash icon is clicked.
// Saves any changes automatically to localStorage.
// Prevents Enter from breaking the note structure.