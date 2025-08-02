// Import the functions we need from our other modules
import { initializeMap, addDataToMap } from './map.js';
import { fetchSafetyData } from './api.js';

/**
 * Main function to set up the application.
 * It initializes the map and loads the initial data.
 */
async function main() {
    // 1. Set up the map
    initializeMap();

    // 2. Fetch the initial safety data
    const initialData = await fetchSafetyData();

    // 3. Add the initial data to the map
    addDataToMap(initialData);

    // 4. Set up a timer to refresh the data every 60 seconds
    setInterval(async () => {
        const updatedData = await fetchSafetyData();
        addDataToMap(updatedData);
    }, 60000);

    // 5. Set up the UI event listeners
    setupUI();
}

/**
 * Sets up the event listeners for the UI elements, like the info panel.
 */
function setupUI() {
    const infoPanel = document.getElementById('info-panel');
    const toggleButton = document.getElementById('toggle-button');

    toggleButton.addEventListener('click', () => {
        infoPanel.classList.toggle('collapsed');
        if (infoPanel.classList.contains('collapsed')) {
            toggleButton.innerHTML = 'i';
            toggleButton.setAttribute('aria-label', 'Open info panel');
        } else {
            toggleButton.innerHTML = '×';
            toggleButton.setAttribute('aria-label', 'Close info panel');
        }
    });

    // Start with the panel collapsed on small screens for better map visibility
    if (window.innerWidth < 768) {
        infoPanel.classList.add('collapsed');
        toggleButton.innerHTML = 'i';
        toggleButton.setAttribute('aria-label', 'Open info panel');
    }
}

// Run the main function to start the application
main();
