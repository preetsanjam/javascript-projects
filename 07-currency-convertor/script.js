const key = "fca_live_EAHIMFg2WJOUUCOCWQRw4jSGqNiRvmG571DhrtYm" 

const state = {
    openedDrawer: null, // Keeps track of which currency drawer (Base or Target) is currently open.
                        // Null means no drawer is open yet.
    currencies: [],
    filteredCurrencies: [],
    base: "USD",
    target: "EUR",
    rates: {},
    baseValue: 1 
}

// Selectors
const ui = {
    controls: document.getElementById("controls"),
    drawer: document.getElementById("drawer"),
    dismissBtn: document.getElementById("dismiss-btn"),
    currencyList: document.getElementById("currency-list"),
    searchInput: document.getElementById("search"),
    baseBtn: document.getElementById("base"),
    targetBtn: document.getElementById("target"),
    exchangeRate: document.getElementById("exchange-rate"),
    baseInput: document.getElementById("base-input"),
    targeInput: document.getElementById("target-input"),
    swapBtn: document.getElementById("swap-btn")
};

// Event listeners
// This function connects user actions (events) with functions (handlers)
const setupEventListeners = () => {
    document.addEventListener("DOMContentLoaded", initApp);
    ui.controls.addEventListener("click", showDrawer);
    ui.dismissBtn.addEventListener("click", hideDrawer);
    ui.searchInput.addEventListener("input", filteredCurrency);
    ui.currencyList.addEventListener("click", selectPair);
    ui.baseInput.addEventListener("change", convertInput);
    ui.swapBtn.addEventListener("click", switchPair);
}

// Event handlers
const initApp = () => {
    fetchCurrencies();
    fetchExchangeRate();
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
    clearSearchInput();
    state.openedDrawer = null;
    ui.drawer.classList.remove("show");
    console.log(state);
};

const filteredCurrency = () => {
    const keyword = ui.searchInput.value.trim().toLowerCase(); // toLowerCase() makes the input case-insensitive
    state.filteredCurrencies = getAvailableCurrencies().filter(({code, name}) => {
        return (
            code.toLowerCase().includes(keyword) ||
            name.toLowerCase().includes(keyword)
        );
    });
    displayCurrencies();
};

const selectPair = (e) => {
    console.log(e.target);
    if (e.target.hasAttribute("data-code")) {
        const{openedDrawer} = state;

        // Update the base or target in the state
        state[openedDrawer] = e.target.dataset.code;

        // Load the exchange rates and then update the buttons
        loadExchangeRate();

        // Close the drawer after selection
        hideDrawer();
    }
};

const convertInput = () => {
    state.baseValue = parseFloat(ui.baseInput.value) || 1;
    loadExchangeRate();
};

const switchPair = () => {
    const {base, target} = state;
    state.base = target;
    state.target = base;
    state.baseValue = parseFloat(ui.targeInput.value) || 1;
    loadExchangeRate();
}

// Render functions
const displayCurrencies = () => {
    ui.currencyList.innerHTML = state.filteredCurrencies.map(({code, name}) => {
        return `
         <li data-code="${code}">
            <img src="${getImageURL(code)}" alt="${name}">
            <div>
                <h4>${code}</h4>
                <p>${name}</p>
            </div>
        </li>
        `;
    })
    .join("");
}

const displayConversion = () => {
    updateButtons();
    updateInputs();
    updateExchangeRate();
}

// Helper functions
const updateButtons = () => {
    [ui.baseBtn, ui.targetBtn].forEach((btn) => {
            const code = state[btn.id];

            btn.textContent = code;
            btn.style.setProperty("--image", `url(${getImageURL(code)})`)
        });
}

const updateInputs = () => {
    const {base, baseValue, target, rates} = state;
    const result = baseValue * rates[base][target];
    ui.targeInput.value = result.toFixed(4);
    ui.baseInput.value = baseValue;
}

const updateExchangeRate = () => {
    const {base, target, rates} = state;
    const rate = rates[base][target].toFixed(4);
    ui.exchangeRate.textContent = `1 ${base} = ${rate} ${target}`;
}

const getAvailableCurrencies = () =>{
    return state.currencies.filter(({code}) => {
        return state.base !== code && state.target !== code;
    });
}; 

const clearSearchInput = () => {
    ui.searchInput.value = "";
    ui.searchInput.dispatchEvent(new Event("input"));
};

const getImageURL = (code) => {
    const flag = "https://wise.com/public-resources/assets/flags/rectangle/{code}.png"
    return flag.replace("{code}", code.toLowerCase());
} 

const loadExchangeRate = () => {
    const {base, rates } = state;
    if (typeof rates[base] !== "undefined") {
        // If the base rates are in state, then show them
        displayConversion();
    } else {
        // Else, fetch the exchange rate first
        fetchExchangeRate();
    }
}

// API functions
const fetchCurrencies = () => {
    fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=${key}`)
        .then((response) => response.json())
        .then(({data}) => {
            state.currencies = Object.values(data);
            state.filteredCurrencies = getAvailableCurrencies();
            displayCurrencies()
        })
        .catch(console.error);
}; 

const fetchExchangeRate = () => {
    const {base} = state 
    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${key}&base_currency=${base}`)
        .then((response) => response.json())
        .then(({data}) => {
            state.rates[base] = data;
            displayConversion();
        })
        .catch(error);
};

// Initialization

setupEventListeners();