// Register functionality
document.getElementById('register-btn').addEventListener('click', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById("register-message")

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            messageEl.textContent = 'Registration successful!';
            messageEl.className = 'text-success';

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        } else {
            messageEl.textContent = data.message;
            messageEl.className = 'text-danger';
        }
    } catch (error) {
        console.error('Error during registration:', error);
        messageEl.textContent = 'Something went wrong. Please try again later.';
        messageEl.className = 'text-danger';
    }
});