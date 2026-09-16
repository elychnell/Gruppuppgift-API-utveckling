const adminBookListContainer = document.getElementById('adminBookList');

// Fetch books from API
async function getBooks() {
  const response = await fetch('/api/books');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const books = await response.json();

  return books;
}
// Show admin book list
function renderAdminBooks(books, container) {
  const booksHTML = books
    .map(
      (book) => `
        <div class="book">
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Description: ${book.description}</p>
          <span class="genre ">Genres: ${book.genres.join(', ')}</span>
          <p>Published Year: ${book.published_year}</p>

            <button
            class="btn btn-primary delete-button"
            data-book-id="${book.id}"
          >
            delete
          </button>
           
<a
  class="btn btn-primary"
  href="edit-books.html?id=${book.id}"
>
  edit
</a>
        </div>
      `,
    )
    .join('');

  container.innerHTML = booksHTML;
}

// Display books to admin
async function displayBooksToAdmin() {
  try {
    const books = await getBooks();

    renderAdminBooks(books, adminBookListContainer);
  } catch (error) {
    console.error('Error displaying admin books:', error);

    adminBookListContainer.innerHTML =
      '<p class="error">Error loading admin books. Please try again later.</p>';
  }
}

displayBooksToAdmin();
