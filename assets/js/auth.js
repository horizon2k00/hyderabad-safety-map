const BUBBLE_API_URL = 'https://your-bubble-app.com/api/1.1/wf';
const API_KEY = 'YOUR_BUBBLE_PRIVATE_API_KEY'; // This should be kept secure

/**
 * Checks for an auth token in the URL or localStorage.
 * @returns {string|null} The auth token if found.
 */
export function getAuthToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
        localStorage.setItem('authToken', tokenFromUrl);
        // Clean the URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return tokenFromUrl;
    }

    return localStorage.getItem('authToken');
}

/**
 * Validates the token with the Bubble backend.
 * @param {string} token The user's auth token.
 * @returns {Promise<boolean>} True if the user is approved, false otherwise.
 */
export async function verifyUserStatus(token) {
    if (!token) return false;

    // Make a fetch call to the Bubble backend through workflow API
    console.log(`Verifying token: ${token} with Bubble...`);
    // const response = await fetch(`${BUBBLE_API_URL}/check_user_status`, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${API_KEY}`,
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ token: token })
    // });
    // const result = await response.json();
    // return result.status === 'approved';

    // For demonstration, we'll approve a dummy token
    return token === 'u-aBcDeF12345';
}