// login.js

const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = this.querySelector('input[placeholder="Email"]').value.trim();
    const password = this.querySelector('input[placeholder="Password"]').value;

    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            let users = data.users || [];

            // Include users from localStorage
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            users = [...users, ...storedUsers];

            // Check credentials
            const loggedUser = users.find(user => user.email === email && user.password === password);

            if (loggedUser) {
                alert(`Welcome back, ${loggedUser.name}!`);
                localStorage.setItem('currentUser', JSON.stringify(loggedUser));
                window.location.href = "mainPageLegacy.html";
            } else {
                alert("Invalid email or password!");
            }
        })
        .catch(error => {
            console.error("Error loading users.json:", error);
            alert("Error connecting to database file!");
        });
});
