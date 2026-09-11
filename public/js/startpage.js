// Display all the books on the start page.
// Use fetch to get the data from the API and display it in the #bookList. Use a try/catch block to handle any errors that may occur. If the response is successful, display the books in a grid format with the book image, title, author, and published year. If the response is not successful, display an error message in the #bookList.

const bookListContainer = document.getElementById('bookList'); // Get the container element where the books will be displayed.

async function displayBooks() {
  // Define an asynchronous function to fetch and display the books.
  try {
    const response = await fetch('/api/books'); // Fetch the data from the API endpoint for books.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // If the response is not successful, throw an error with the status code.
    }
    const books = await response.json(); // Parse the JSON response.

    // Create the HTML for each book and display it in the #bookList container.
    const booksHTML = books
      .map(
        (book) => `
      <div class="book">
        <a href="book-details.html?bookId=${book.id}">
          <img src="${book.image}" alt="${book.title}" width="200">
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Published Year: ${book.published_year}</p>
        </a>
      </div>
    `,
      )
      .join('');

    bookListContainer.innerHTML = booksHTML;
  } catch (error) {
    console.error('Error displaying books:', error);
    bookListContainer.innerHTML = `<p class="error">Error loading books. Please try again later.</p>`;
  }
}
