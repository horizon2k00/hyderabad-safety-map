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

/**
 * Adds a semi-transparent overlay with a rectangular hole to the map.
 * The hole is centered on the user's location.
 * @param {object} coords - {lat, lon} of the user's location.
 * @param {Array} localData - Data points to show within the clear area.
 */
export function showMaskedMap(coords, localData) {
    console.log('Generating masked map');
    console.log("coords", coords);
    // Add the local data first, so it's visible inside the hole
    addDataToMap(localData);

    // --- 1. Calculate the dimensions of the rectangular hole ---
    const screenRatio = window.innerWidth / window.innerHeight;

    // Area = width * height; ratio = width / height => width = height * ratio
    // Area = (height * ratio) * height = height^2 * ratio
    const heightInMeters = 5000;
    const widthInMeters = heightInMeters * screenRatio;

    // --- 2. Convert meters to latitude/longitude degrees ---
    // This is an approximation that works well for small distances.
    const latDegrees = heightInMeters / 111132;
    const lonDegrees = widthInMeters / (111320 * Math.cos(coords.lat * (Math.PI / 180)));

    const halfLat = latDegrees / 2;
    const halfLon = lonDegrees / 2;

    // --- 3. Define the coordinates for the hole (inner ring) ---
    const holeCoords = [
        [coords.lat + halfLat, coords.lon - halfLon], // top-left
        [coords.lat + halfLat, coords.lon + halfLon], // top-right
        [coords.lat - halfLat, coords.lon + halfLon], // bottom-right
        [coords.lat - halfLat, coords.lon - halfLon]  // bottom-left
    ];

    // --- 4. Define the outer polygon that covers the world ---
    const worldCoords = [
        [-90, -180], [90, -180], [90, 180], [-90, 180]
    ];

    console.log(holeCoords);

    // --- 5. Create the mask polygon with the hole and add it to the map ---
    // The first array is the outer boundary, the second is the hole.
    L.polygon([worldCoords, holeCoords], {
        color: 'rgba(20, 20, 20, 0.7)', // Dark, semi-transparent overlay
        fillOpacity: 0.9,
        stroke: false,
        interactive: false // The mask should not capture mouse events
    }).addTo(map);

    // --- 6. Show the overlay text and button ---
    // document.getElementById('map-overlay').classList.remove('hidden');
    
    console.log("Showing masked map with rectangular hole around user's location.");
}