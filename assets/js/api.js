import { getAuthToken } from './auth.js';

/**
 * Fetches safety data.
 * In the future, this will make a real API call to the IUDX.
 * @returns {Promise<Array>} A promise that resolves to an array of safety data points.
 */
export async function fetchSafetyData(coords = null) {
    //Call Fetch auth token function, use it to decide how much data to return
    const token = getAuthToken();
    console.log("Fetching safety data...", coords ? `for coords ${coords.lat}, ${coords.lon}` : 'for entire city');

    // For now, we are returning the same simulated data.
    const simulatedData = [
        { "name": "Gachibowli", "lat": 17.4486, "lng": 78.3458, "safety_score": 8.5 },
        { "name": "HITECH City", "lat": 17.4435, "lng": 78.3772, "safety_score": 9.0 },
        { "name": "Banjara Hills", "lat": 17.4156, "lng": 78.4358, "safety_score": 7.2 },
        { "name": "Jubilee Hills", "lat": 17.4312, "lng": 78.4013, "safety_score": 7.8 },
        { "name": "Secunderabad", "lat": 17.4399, "lng": 78.4983, "safety_score": 6.5 },
        { "name": "Charminar", "lat": 17.3616, "lng": 78.4747, "safety_score": 4.8 },
        { "name": "Ameerpet", "lat": 17.4375, "lng": 78.4483, "safety_score": 5.5 },
        { "name": "Kukatpally", "lat": 17.4857, "lng": 78.4014, "safety_score": 6.1 },
        { "name": "Begumpet", "lat": 17.4428, "lng": 78.4632, "safety_score": 7.0 },
        { "name": "Uppal", "lat": 17.3963, "lng": 78.5574, "safety_score": 4.2 }
    ];

    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return simulatedData;
}

/**
 * Submits a new incident report to the Bubble backend.
 * @param {object} incidentData - { type, lat, lon }
 * @returns {Promise<boolean>} True on success.
 */
export async function logIncident(incidentData) {
    const token = getAuthToken();
    if (!token) {
        console.error("Authentication required to report an incident.");
        return false;
    }
    console.log("Logging incident:", incidentData);
    
    // Real fetch call to Bubble workflow
    // await fetch(`${BUBBLE_API_URL}/log_incident`, { ... });

    return true; // Assume success for demo
}

/**
 * Adds a user to the waitlist via the Bubble backend.
 * @param {string} name 
 * @param {string} phone 
 * @returns {Promise<boolean>} True on success.
 */
export async function addToWaitlist(name, phone) {
     console.log(`Adding ${name} (${phone}) to waitlist...`);
     // Real fetch call to Bubble workflow
     // await fetch(`${BUBBLE_API_URL}/add_to_waitlist`, { ... });
     return true; // Assume success for demo
}