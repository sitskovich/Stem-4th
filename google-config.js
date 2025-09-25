// Google OAuth 2.0 Configuration
// Replace this with your actual Google Client ID from Google Cloud Console

const GOOGLE_CONFIG = {
    // Get your Client ID from: https://console.cloud.google.com/
    // Go to: APIs & Services → Credentials → OAuth 2.0 Client IDs
    CLIENT_ID: "REPLACE_WITH_YOUR_GOOGLE_CLIENT_ID",
    
    // Optional: Add your domain for production
    AUTHORIZED_DOMAINS: [
        "localhost",           // For local testing
        "yourdomain.com"       // Replace with your actual domain
    ]
};

// Function to get the client ID
function getGoogleClientId() {
    return GOOGLE_CONFIG.CLIENT_ID;
}

// Function to check if domain is authorized
function isDomainAuthorized(domain) {
    return GOOGLE_CONFIG.AUTHORIZED_DOMAINS.includes(domain);
}
