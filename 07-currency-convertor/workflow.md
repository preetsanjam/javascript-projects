### Currency convertor flow

```
1. Page Load
   ↓
2. initApp()
   → fetchCurrencies() → state.currencies → displayCurrencies()
   → fetchExchangeRate() → state.rates → displayConversion()
   ↓
3. User Action
   ├─ Click Base/Target button → showDrawer() → state.openedDrawer set
   ├─ Type in search box → filteredCurrency() → displayCurrencies()
   ├─ Select currency → selectPair()
   │     └─ Updates state.base/target
   │     └─ loadExchangeRate() → fetchExchangeRate() if needed
   │     └─ displayConversion() → hideDrawer()
   ├─ Enter value in base input → convertInput() → update state.baseValue → displayConversion()
   └─ Click swap button → switchPair() → swap base/target → loadExchangeRate()
   ↓
4. Rendering Cycle (always after state change)
   → updateButtons() (currency labels + flags)
   → updateInputs() (recalculate conversion)
   → updateExchangeRate() (display rate text)
   ↓
5. Updated UI displayed to user
```