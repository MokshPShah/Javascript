document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;

    if (currentPage.includes("signup.html")) {
        const signupBtn = document.getElementById("signup");
        signupBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const username = document.getElementById('signupusername').value.trim();
            const email = document.getElementById('signupemail').value.trim();
            const password = document.getElementById('signuppassword').value.trim();
            const confirmPassword = document.getElementById('signupconfirmPassword').value.trim();

            if (!username || !email || !password || !confirmPassword) {
                alert("All Fields are required.");
                return;
            }

            if (password !== confirmPassword) {
                alert("passwords does not match");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            const userExists = users.some(user => user.email === email);

            if (userExists) {
                alert("Email already exists. Please Login");
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Signup successful! Please Login.");
            window.location.href = 'login.html';
        })
    }

    if (currentPage.includes("login.html")) {
        const loginBtn = document.getElementById("login");
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const email = document.getElementById('loginemail').value.trim();
            const password = document.getElementById('loginpassword').value.trim();

            if (!email || !password) {
                alert("All Fields are required.");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                alert("Invalid Email or Password");
                return;
            }

            localStorage.setItem("currentUser", JSON.stringify(user));
            alert("Login successful!");
            window.location.href = 'index.html';
        })
    }
})