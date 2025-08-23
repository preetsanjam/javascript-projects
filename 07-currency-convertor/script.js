const state = {
    openedDrawer: null
}

// Selectors
const ui = {
    controls: document.getElementById("controls"),
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
    const drawerBtn = e.target.closest("[data-drawer]");
    if(drawerBtn) {
        state.openedDrawer = drawerBtn.id;
        ui.drawer.classList.add("show");
    }
};
// const showDrawer = (e) => {
//     if(e.target.hasAttribute("data-drawer")) {
//         state.openedDrawer = e.target.id;
//         ui.drawer.classList.add("show");
//     }
// };

const hideDrawer = (e) => {
    state.openedDrawer = null;
    ui.drawer.classList.remove("show");
    console.log(state);
};

// Render functions

// Helper functions

// API functions

// Initialization

setupEventListeners();