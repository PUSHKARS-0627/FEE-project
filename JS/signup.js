// signup.js

const signupForm = document.querySelector('form');

signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get input values
    const name = this.querySelector('input[placeholder="Full Name"]').value.trim();
    const email = this.querySelector('input[placeholder="Email Address"]').value.trim();
    const phone = this.querySelector('input[placeholder="Phone Number"]').value.trim();
    const password = this.querySelector('input[placeholder="Password"]').value;
    const confirmPassword = this.querySelector('input[placeholder="Confirm Password"]').value;

    // Validate password match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Step 1: Get all users from JSON Server
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        // Step 2: Check if email already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert("Email already registered!");
            return;
        }

        // Step 3: Create new user object
        const newUser = { name, email, phone, password };

        // Step 4: Send new user to JSON Server (POST request)
        const postResponse = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        if (!postResponse.ok) {
            throw new Error("Failed to save user to server");
        }

        // Step 5: Confirmation
        alert("Sign-Up Successful!");
        signupForm.reset();
        window.location.href = "loginPageLegacy.html";
        
    } catch (error) {
        console.error("Error:", error);
        alert("Error connecting to server! Please make sure JSON Server is running.");
    }
});
