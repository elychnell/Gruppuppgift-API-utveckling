export let authStatusResult = { authenticated: false };

export async function checkAuthStatus() {
    try {
        const statusResponse = await fetch('http://localhost:3000/api/auth/status', {
            credentials: 'include'
        });
        authStatusResult = await statusResponse.json();
    } catch (error) {
        console.error('Error checking authentication status:', error);
    }
}

export async function toggleAdminNav() {
    await checkAuthStatus();

    const adminNav = document.getElementById('admin-nav');
    if (adminNav) {
        adminNav.style.display = authStatusResult.is_admin ? 'flex' : 'none';
    }
}

export async function toggleLoginButtons() {
    await checkAuthStatus();

    const loginLink = document.getElementById('login-link');
    const logoutBtn = document.getElementById('logout-btn');
    const logoutMessage = document.getElementById('logout-message');


    if (loginLink && logoutBtn) {
        if (authStatusResult.authenticated) {
            loginLink.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
        } else {
            loginLink.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
        }
    }

    logoutBtn?.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                if (logoutMessage) {
                    logoutMessage.className = 'alert alert-danger';
                    logoutMessage.textContent = 'Logout failed. Please try again';
                }
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    });
}