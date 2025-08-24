const key = "fca_live_EAHIMFg2WJOUUCOCWQRw4jSGqNiRvmG571DhrtYm" 

const state = {
    openedDrawer: null, // Keeps track of which currency drawer (Base or Target) is currently open.
                        // Null means no drawer is open yet.
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
// This function connects user actions (events) with functions (handlers)
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
    fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=${key}`)
        .then(response => response.json())
        .then(console.log)
        .then(console.error)
}; 

// Initialization

setupEventListeners();