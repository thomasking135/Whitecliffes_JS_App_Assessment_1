const users = {}; // Simulated user storage
let currentUser = null; // Store the current user's email
let currentToken = null; // Store the generated token

// Function to generate a random integer token within a specified range
function generateToken(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to check if a passcode key exists and is unexpired
function isPasscodeValid(passcodeKey, duration) {
    if (users[passcodeKey]) {
        const currentTime = new Date().getTime();
        const keyCreationTime = users[passcodeKey].timestamp;

        if (currentTime - keyCreationTime <= duration) {
            return true; // Passcode key exists and is unexpired
        }
    }
    return false; // Passcode key does not exist or is expired
}

document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Simulated user registration (store in memory) with a timestamp
    users[email] = { name, email, timestamp: new Date().getTime() };
    alert('Registration successful.');
});

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const loginEmail = document.getElementById('login-email').value;

    // Check if the user exists (simulated)
    if (isPasscodeValid(loginEmail, 300000)) { // 300000 milliseconds = 5 minutes
        currentUser = loginEmail;
        currentToken = generateToken(1000, 9999); // Generate a random integer token between 1000 and 9999

        // Display the generated token under the login form
        document.getElementById('generated-token').textContent = 'Generated Token: ' + currentToken;
        document.getElementById('token-display').style.display = 'block';

        // Show the Token Entry Form
        document.getElementById('token-entry').style.display = 'block';

        alert('Login successful.');
    } else {
        alert('User not found or passcode key is expired. Please register.');
    }
});

document.getElementById('token-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const enteredToken = document.getElementById('entered-token').value;

    // Check if the entered token matches the generated token
    if (currentUser && parseInt(enteredToken) === currentToken) {
        alert('Token is correct. Access granted.');

        // Show the new page
        document.getElementById('new-page').style.display = 'block';
    } else {
        alert('Token is invalid. Access denied.');
    }
});
