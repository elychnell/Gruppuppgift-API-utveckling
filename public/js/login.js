document.getElementById("login-btn").addEventListener("click", async function (e) {
    e.preventDefault()
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const messageEl = document.getElementById("login-message")

    try {
        const response = await fetch('/api/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password })
        })
        if (response.ok) {
            messageEl.textContent = 'Login successful!';
            messageEl.className = 'text-success';

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            messageEl.textContent = 'Login failed. Please check your username and password.';
            messageEl.className = 'text-danger';
        }
    } catch (error) {
        console.error(error)
        messageEl.textContent = 'Something went wrong. Please try again later.';
        messageEl.className = 'text-danger';
    }
})