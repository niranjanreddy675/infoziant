const form = document.getElementById("myForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (name === "") {
        alert("Name is required");
        return;
    }

    if (email === "") {
        alert("Email is required");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Enter a valid email");
        return;
    }

    if (password.length < 8) {
        alert("Password must contain at least 8 characters");
        return;
    }

    alert("Form Submitted Successfully!");

    form.reset();

});