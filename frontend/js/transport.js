

document.addEventListener('DOMContentLoaded', () => {
    initTransportCalculator();
});

function initTransportCalculator() {
    const transportSelector = document.getElementById('transport-option-select');
    const displayCost = document.getElementById('transport-display-cost');

    if (transportSelector && displayCost) {
        transportSelector.addEventListener('change', (e) => {
            const val = parseFloat(e.target.value) || 0;
            displayCost.textContent = `PKR ${val.toLocaleString()}`;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTransportCalculator();
});

function initTransportCalculator() {
    const transportSelector = document.getElementById('transport-option-select');
    const displayCost = document.getElementById('transport-display-cost');

    if (transportSelector && displayCost) {
        transportSelector.addEventListener('change', (e) => {
            const val = parseFloat(e.target.value) || 0;
            displayCost.textContent = `PKR ${val.toLocaleString()}`;
        });
    }
}