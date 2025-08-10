import { initializeMap, addDataToMap, showMaskedMap } from './map.js';
import { fetchSafetyData, logIncident, addToWaitlist } from './api.js';
import { getAuthToken, verifyUserStatus } from './auth.js';

let userIsAuthenticated = false;
/**
 * Main function to set up the application.
 * It initializes the map and loads the initial data.
 */
async function main() {
    console.log(`Entering main function`);
    const token = getAuthToken();
    userIsAuthenticated = await verifyUserStatus(token);

    initializeMap();
    setupUI();

    if (userIsAuthenticated) {
        // If authenticated, load full map data
        const fullData = await fetchSafetyData();
        addDataToMap(fullData);
    } else {
        // If not authenticated, start the location-gated flow
        requestUserLocation();
    }
}

function requestUserLocation() {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            // Location Granted
            const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
            const localData = await fetchSafetyData(coords);
            console.log(`Coordinates`, coords);
            showMaskedMap(coords, localData); // Show blurred map with local data
        },
        async () => {
            // Location Denied
            const cityData = await fetchSafetyData(); // Get generic city data
            addDataToMap(cityData);
            document.getElementById('map-overlay').classList.remove('hidden'); // Show join prompt
        }
    );
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

    const reportBtn = document.getElementById('report-incident-btn');
    const waitlistBtn = document.getElementById('join-waitlist-btn');
    const waitlistModal = document.getElementById('waitlist-modal');
    const incidentModal = document.getElementById('incident-modal');
    
    if (userIsAuthenticated) {
        reportBtn.classList.remove('hidden');
        document.getElementById('map-overlay').classList.add('hidden');
    }

    // Modal open/close logic
    waitlistBtn.addEventListener('click', () => waitlistModal.classList.remove('hidden'));
    reportBtn.addEventListener('click', () => incidentModal.classList.remove('hidden'));
    
    document.querySelectorAll('.modal .close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            waitlistModal.classList.add('hidden');
            incidentModal.classList.add('hidden');
        });
    });

    // Form submission logic
    document.getElementById('waitlist-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        // ... call addToWaitlist() and show success message
        await addToWaitlist();
        waitlistModal.classList.add('hidden');
    });
    
    document.getElementById('incident-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        // ... get location, call logIncident() and show success message
        logIncident();
    });
}

// Run the main function to start the application
main();
