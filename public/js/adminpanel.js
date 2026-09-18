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