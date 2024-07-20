document.addEventListener('DOMContentLoaded', () => {
    const users = []; // Simulate database

    // Registration Form
    document.getElementById('registration-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !email || !password) {
            document.getElementById('register-message').textContent = "All fields are required.";
            return;
        }

        const hashedPassword = btoa(password); // Simple encoding for demo purposes
        users.push({ username, email, password: hashedPassword, isAdmin: false });
        document.getElementById('register-message').textContent = "Registration successful!";
        document.getElementById('registration-form').reset();
    });

    // Login Form
    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const hashedPassword = btoa(password);

        const user = users.find(user => (user.username === username || user.email === username) && user.password === hashedPassword);

        if (user) {
            document.getElementById('login-message').textContent = "Login successful!";
            document.getElementById('login-form').reset();
        } else {
            document.getElementById('login-message').textContent = "Invalid login credentials.";
        }
    });

    // Admin Dashboard
    document.getElementById('view-users').addEventListener('click', () => {
        const usersList = document.getElementById('users-list');
        usersList.innerHTML = `
            <h3>User List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map((user, index) => `
                        <tr>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td><button class="delete-button" data-index="${index}">Delete</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                users.splice(index, 1);
                document.getElementById('view-users').click();
            });
        });
    });
});
