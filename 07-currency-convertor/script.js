const state = {
    openedDrawer: null
}

// Selectors
const ui = {
    controls: document.getElementbyId("controls"),
    drawer: document.getElementById("drawer"),
    dismissBtn: document.getElementById("dismiss-btn")
};

// Event listeners
const setupEventListeners = () => {
    ui.controls.addEventListener("click", showDrawer);
    ui.dismissBtn.addEventListener("click", hideDrawer);
}

// Event handlers
const showDrawer = (e) => {
    ui.drawer.classList.add("show");
};

const hideDrawer = (e) => {
    ui.drawer.classList.remove("show");
};

// Render functions

// Helper functions

// API functions

// Initialization