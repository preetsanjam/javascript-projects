const state = {
    openedDrawer: null,
    currencies: []
}

// Selectors
const ui = {
    controls: document.getElementById("controls"),
    drawer: document.getElementById("drawer"),
    dismissBtn: document.getElementById("dismiss-btn"),
    currencyList: document.getElementById("currency-list")
};

// Event listeners
const setupEventListeners = () => {
    document.addEventListener("DOMContentLoaded", initApp);
    ui.controls.addEventListener("click", showDrawer);
    ui.dismissBtn.addEventListener("click", hideDrawer);
}

// Event handlers
const initApp = () => {
    fetchCurrencies()
}

const showDrawer = (e) => {
    const drawerBtn = e.target.closest("[data-drawer]");
    if(drawerBtn) {
        state.openedDrawer = drawerBtn.id;
        ui.drawer.classList.add("show");
        console.log(state);
    }
};

const hideDrawer = () => {
    state.openedDrawer = null;
    ui.drawer.classList.remove("show");
    console.log(state);
};

// Render functions

// Helper functions

// API functions
const fetchCurrencies = () => {
    
} 

// Initialization

setupEventListeners();