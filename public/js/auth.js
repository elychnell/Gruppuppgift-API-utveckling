export let authStatusResult = { authenticated: false };

export async function checkAuthStatus() {
    try {
        const statusResponse = await fetch('/api/auth/status', {
            credentials: 'include'
        });
        authStatusResult = await statusResponse.json();
    } catch (error) {
        console.error('Error checking authentication status:', error);
    }
}

export async function toggleAdminNav() {
    await checkAuthStatus();

    const adminDropdown = document.getElementById('admin-dropdown');

    if (adminDropdown) {
        if (authStatusResult.authenticated && authStatusResult.is_admin) {
            adminDropdown.style.display = 'block';
        } else {
            adminDropdown.style.display = 'none';
        }
    }
}

export function setupAdminDropdown() {
    const btn = document.getElementById('admin-dropdown-btn');
    const menu = document.getElementById('admin-dropdown-menu');

    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('open');
        btn.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        menu.classList.remove('open');
        btn.classList.remove('open');
    });
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