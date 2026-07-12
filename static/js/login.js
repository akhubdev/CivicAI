

// ======================================
// Password Toggle
// ======================================

const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

if (toggle) {

    toggle.addEventListener("click", () => {

        const type =
            password.getAttribute("type") === "password"
                ? "text"
                : "password";

        password.setAttribute("type", type);

        toggle.classList.toggle("fa-eye");
        toggle.classList.toggle("fa-eye-slash");

    });

}

// ======================================
// Login Button Animation
// ======================================

const form = document.getElementById("loginForm");
const loginBtn = document.querySelector(".login-btn");

form.addEventListener("submit", function (e) {
    

    const email = document.getElementById("email").value.trim();
    const pass = password.value.trim();

    if (email === "" || pass === "") {

        e.preventDefault();

        alert("Please fill all fields.");

        return;

    }

    loginBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';

    loginBtn.disabled = true;

});



// ======================================
// Input Glow
// ======================================

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {

    input.addEventListener("focus", () => {

        input.parentElement.style.boxShadow =
            "0 0 25px rgba(59,130,246,.30)";

    });

    input.addEventListener("blur", () => {

        input.parentElement.style.boxShadow = "none";

    });

});

// ======================================
// Mouse Glow
// ======================================

document.addEventListener("mousemove", (e) => {

    document.body.style.background =
        `radial-gradient(circle at ${e.clientX}px ${e.clientY}px,
        rgba(59,130,246,.10),
        transparent 280px),
        #060B17`;

});