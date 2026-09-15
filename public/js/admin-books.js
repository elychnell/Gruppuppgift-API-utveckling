const adminBookListContainer = document.getElementById('adminBookList');

// Hämta böcker från API
async function getBooks() {
  const response = await fetch('/api/books');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const books = await response.json();

  return books;
}
// Visa adminlistan
function renderAdminBooks(books, container) {
  const booksHTML = books
    .map(
      (book) => `
        <div class="book">
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Genres: ${book.genres.join(', ')}</p>
          <p>Published Year: ${book.published_year}</p>
          <button id="deleteButton" data-book-id="${book.id}">delete</button>
        </div>
      `,
    )
    .join('');

  container.innerHTML = booksHTML;
}

// Hämta och visa böcker för admin
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
