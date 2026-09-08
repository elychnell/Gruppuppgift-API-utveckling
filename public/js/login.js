// 1. Create an addEventlistener for the login button on click. The buttons ID is "#login-btn"
document.getElementById("login-btn").addEventListener("click", function(event) {
    event.preventDefault();
    // 2. SHould make a POST request to API_URL + "/auth/login", 
    // with a body of {username: "username", password: "password"}. login credentials should be hardcoded.  
    // And include "credentials: "include"


    // 3. Use async/await and try/catch to handle the response and any errors that may occur. If the response is successful, console log the data returned from the server.
    async function login() {
        try {
            const response = await fetch(API_URL + "/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: "admin",
                    password: "123"
                }),
                credentials: "include"
            });
            const data = await response.json();
            // 4 On success, redirect to protected.html. On failure display an error message in #login-message
            if (response.ok) {
                window.location.href = "protected.html";
            } else {
                // 5. Make the error message display in a red fashioned label. Use bootstraps classes 
                document.getElementById("login-message").className = "alert alert-danger";
                document.getElementById("login-message").innerHTML = "Login failed. Please check your credentials";
            }
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    login();
});