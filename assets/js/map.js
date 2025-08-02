// In assets/js/map.js

// This variable will hold the map instance.
let map;
// This layer group will hold the data points so we can easily clear them.
let dataLayer;

/**
 * Initializes the Leaflet map and adds the base tile layer.
 * @returns {L.Map} The initialized map object.
 */
export function initializeMap() {
    map = L.map('map').setView([17.3850, 78.4867], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Initialize the layer group for our data and add it to the map
    dataLayer = L.layerGroup().addTo(map);

    return map;
}

/**
 * Clears all existing data points from the map.
 */
function clearDataLayers() {
    dataLayer.clearLayers();
}

/**
 * Determines the color for a data point based on its safety score.
 * @param {number} score The safety score.
 * @returns {string} The color hex code.
 */
function getSafetyColor(score) {
    if (score >= 8) return '#28a745'; // Green
    if (score >= 5) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
}

/**
 * Adds an array of safety data points to the map.
 * @param {Array} dataPoints - An array of data point objects.
 */
export function addDataToMap(dataPoints) {
    // First, clear any old data from the map.
    clearDataLayers();

    // Loop through the new data and add it to the data layer.
    dataPoints.forEach(point => {
        const circle = L.circle([point.lat, point.lng], {
            color: getSafetyColor(point.safety_score),
            fillColor: getSafetyColor(point.safety_score),
            fillOpacity: 0.5,
            radius: 500
        }).bindPopup(`<b>${point.name}</b><br>Safety Score: ${point.safety_score}`);

        dataLayer.addLayer(circle);
    });
}