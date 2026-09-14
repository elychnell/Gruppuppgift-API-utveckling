// 1. FETCH GET to API_URL + "/greetings/admin" with credentials: "include". 
// Use async/await and try/catch to handle the response and any errors that may occur. 
// If the response is successful, display the data.message in #greeting

async function fetchGreeting() {
    try {
        const response = await fetch(API_URL + "/greetings/admin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if  (response.status === 401 || response.status === 403) {
            window.location.href = "index.html?message=You must be logged in to view this page";
        }

        const data = await response.json();
        console.log(response)
        if (response.ok) {
            // 2. Display the data.message in #greeting in a green fashioned label. Use bootstraps classes
            document.getElementById("greeting").className = "alert alert-success";
            document.getElementById("greeting").textContent = data.message;
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
fetchGreeting();

//Redirect to users.html when clicking on the button with id "users-btn"

document.getElementById("users-btn").addEventListener("click", function(event) {
    event.preventDefault()

    window.location.href = "admin-users.html";
})

// Redirect to books.html when clicking on the button with id "books-btn"

document.getElementById("books-btn").addEventListener("click", function(event) {
    event.preventDefault()

    window.location.href = "admin-books.html";
});