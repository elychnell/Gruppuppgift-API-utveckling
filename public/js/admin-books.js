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

// Visa admin boklistan
function renderAdminBooks(books, container) {
  const booksHTML = books
    .map((book) => {
      const genresHTML = book.genres
        .map((genre) => `<span class="genre">${genre}</span>`)
        .join('');

      return `
        <div class="book">
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Description: ${book.description}</p>
          <p>Genres: ${genresHTML}</p>
          <p>Published Year: ${book.published_year}</p>

          <a
            class="btn btn-sm btn-outline-secondary edit-btn"
            href="edit-books.html?id=${book.id}"
          >
            Edit
          </a>

          <button
            class="btn btn-sm btn-outline-danger delete-btn"
            data-book-id="${book.id}"
          >
            Delete
          </button>

        </div>
      `;
    })
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
