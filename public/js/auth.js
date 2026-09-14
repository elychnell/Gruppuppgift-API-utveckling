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

