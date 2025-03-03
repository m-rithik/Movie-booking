// Hardcoded users (simulating .txt file)
const users = [
    { username: "username", password: "admin123", role: "theater owner" },
    { username: "user123", password: "user123", role: "user" }
];

function loginUser(event) {
    event.preventDefault();

    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Check credentials
    const user = users.find(u => u.username === enteredUsername && u.password === enteredPassword);

    if (user) {
        localStorage.setItem("role", user.role); // Store role
        showDashboard(user.role); // Show respective dashboard
    } else {
        errorMessage.textContent = "Invalid username or password!";
    }
}

function showDashboard(role) {
    document.getElementById("login-container").classList.add("hidden"); // Hide login
    document.getElementById("main-content").classList.remove("hidden"); // Show dashboard
    document.getElementById("topbar").classList.remove("hidden"); // Show top nav bar
    document.getElementById("logout-container").classList.remove("hidden"); // Show logout button

    if (role === "theater owner") {
        document.getElementById("owner-menu").classList.remove("hidden");
        document.getElementById("owner-menu2").classList.remove("hidden");
        document.getElementById("owner-menu3").classList.remove("hidden");
        document.getElementById("owner-menu4").classList.remove("hidden");
    } else if (role === "user") {
        document.getElementById("user-menu").classList.remove("hidden");
        document.getElementById("user-menu2").classList.remove("hidden");
        document.getElementById("user-menu3").classList.remove("hidden");
        document.getElementById("user-menu4").classList.remove("hidden");
    }
}

function logout() {
    localStorage.removeItem("role");
    location.reload();
}

// Auto-login if session exists
document.addEventListener("DOMContentLoaded", function () {
    const role = localStorage.getItem("role");
    if (role) {
        showDashboard(role);
    }
});