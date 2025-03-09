// Google client ID (for demo, explicitly included; recommended via backend or environment)
const GOOGLE_CLIENT_ID = "812207263002-esec40hq8fc3jrknnfsj9mctiehfn0sq.apps.googleusercontent.com";

// DOM elements
const form = document.getElementById('authForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submitButton');
const toast = document.getElementById('toast');
const videoContainer = document.getElementById('videoContainer');
const welcomeVideo = document.getElementById('welcomeVideo');
// Existing variables
let isSignIn = true;

// DOM Elements
const formTitle = document.getElementById('formTitle');
const submitButton = document.getElementById('submitButton');
const toggleButton = document.getElementById('toggleMode');

toggleButton.addEventListener('click', () => {
    isSignIn = !isSignIn;
    formTitle.textContent = isSignIn ? 'Sign In' : 'Sign Up';
    submitButton.textContent = isSignIn ? 'Sign In' : 'Create Account';
    toggleButton.textContent = isSignIn
        ? "Don't have an account? Sign Up"
        : "Already have an account? Sign In";
    form.reset();
});

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
}

function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

function showWelcomeVideo() {
    document.getElementById('authForm').style.display = 'none';
    videoContainer.style.display = 'block';
    welcomeVideo.play();
}

// Regular login (local demo logic)
form.addEventListener('submit', e => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        showToast(`Welcome, ${username}!`, 'success');
        showWelcomeVideo();
    } else {
        showToast('Invalid username or password.', 'error');
    }
    form.reset();
}

// Google Sign-in handler
function handleGoogleSignIn(response) {
    const user = parseJwt(response.credential);
    showToast(`Signed in as ${user.name}`, 'success');
    showWelcomeVideo();
}

// Load Google Sign-in
window.onload = () => {
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn
    });
};