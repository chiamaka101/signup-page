document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("login-form");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            validateAndStoreData();
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            loginUser();
        });
    }
});

function validateAndStoreData() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;

    if (typeof grecaptcha === "undefined" || !grecaptcha.getResponse) {
        alert("reCAPTCHA not loaded. Please refresh the page.");
        return;
    }

    const recaptchaResponse = grecaptcha.getResponse();
    
    if (!name || !email || !phone || !password) {
        alert("Please fill out all fields.");
        return;
    }

    if (recaptchaResponse.length === 0) {
        alert("Please complete the reCAPTCHA.");
        return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("password", btoa(password)); // Encrypt password

    alert("Sign-up successful!");
    window.location.href = "index.html";
}

function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    console.log("Entered Email:", email);
    console.log("Entered Password:", password);
    console.log("Stored Email:", storedEmail);
    console.log("Stored Password:", storedPassword);

    if (!storedEmail || !storedPassword) {
        alert("No account found. Please sign up first.");
        return;
    }

    if (email === storedEmail && password === atob(storedPassword)) { // Decrypt password
        alert("Login successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid email or password.");
    }
}
