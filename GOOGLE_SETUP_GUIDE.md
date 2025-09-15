# Google Sign-In Setup Guide

## 🚨 Current Issue
The Google OAuth 2.0 error occurs because we're using a placeholder Client ID. Follow these steps to fix it.

## 📋 Step-by-Step Setup

### 1. Create Google Cloud Console Project

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Sign in** with your Google account
3. **Create a new project**:
   - Click "Select a project" → "New Project"
   - Name: "4th Grade STEM Portal"
   - Click "Create"

### 2. Enable Required APIs

1. **Go to "APIs & Services" → "Library"**
2. **Enable these APIs**:
   - Search for "Google+ API" → Click → Enable
   - Search for "Google Identity" → Click → Enable

### 3. Configure OAuth Consent Screen

1. **Go to "APIs & Services" → "OAuth consent screen"**
2. **Choose "External"** user type → Click "Create"
3. **Fill in required fields**:
   - App name: `4th Grade STEM Portal`
   - User support email: `your-email@gmail.com`
   - Developer contact: `your-email@gmail.com`
4. **Click "Save and Continue"**
5. **Skip "Scopes"** for now → Click "Save and Continue"
6. **Add test users** (optional for testing):
   - Add your email address
   - Click "Save and Continue"

### 4. Create OAuth 2.0 Credentials

1. **Go to "APIs & Services" → "Credentials"**
2. **Click "Create Credentials" → "OAuth 2.0 Client IDs"**
3. **Configure**:
   - Application type: **Web application**
   - Name: `STEM Portal Web Client`
   - Authorized JavaScript origins:
     - `http://localhost` (for local testing)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost` (for local testing)
     - `https://yourdomain.com` (for production)
4. **Click "Create"**

### 5. Get Your Client ID

After creating, you'll see a popup with your **Client ID** that looks like:
```
123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
```

### 6. Update the Code

Replace `REPLACE_WITH_YOUR_GOOGLE_CLIENT_ID` in these files with your actual Client ID:

- `admin-panel.html` (line 325)
- `collaboration-tools.html` (line 584)
- `google-config.js` (line 8)

## 🔧 Quick Fix

1. **Copy your Client ID** from Google Cloud Console
2. **Open each file** listed above
3. **Find** `REPLACE_WITH_YOUR_GOOGLE_CLIENT_ID`
4. **Replace** with your actual Client ID
5. **Save** the files

## 🧪 Testing

1. **Open** `admin-panel.html` in your browser
2. **Click** "Sign in with Google"
3. **You should see** the Google sign-in popup (not an error)
4. **Sign in** with your Google account
5. **You should be** redirected back to the admin panel

## 🚀 Production Deployment

For production, make sure to:
1. **Add your domain** to authorized origins
2. **Update** the Client ID in all files
3. **Test** the sign-in flow
4. **Monitor** for any errors

## ❓ Troubleshooting

### Error: "Access blocked: Authorization Error"
- **Cause**: Invalid or missing Client ID
- **Fix**: Make sure you've replaced the placeholder with your real Client ID

### Error: "redirect_uri_mismatch"
- **Cause**: Domain not authorized
- **Fix**: Add your domain to authorized JavaScript origins in Google Cloud Console

### Error: "invalid_client"
- **Cause**: Wrong Client ID
- **Fix**: Double-check you copied the correct Client ID

## 📞 Need Help?

If you're still having issues:
1. **Check** the Google Cloud Console for any error messages
2. **Verify** all APIs are enabled
3. **Make sure** your domain is in the authorized origins list
4. **Test** with a simple HTML file first

## 🔒 Security Notes

- **Never commit** your real Client ID to public repositories
- **Use environment variables** for production
- **Regularly rotate** your credentials
- **Monitor** usage in Google Cloud Console
