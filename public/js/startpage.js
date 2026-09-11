const bookListContainer = document.getElementById('bookList');
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

// Visa vanliga boklistan
function renderBooks(books, container) {
  const booksHTML = books
    .map(
      (book) => `
        <div class="book">
          <a href="book-details.html?bookId=${book.id}">
            <img src="${book.image}" alt="${book.title}" width="200">
            <h3>${book.title}</h3>
            <p>${book.description}</p>. 
            <p>Author: ${book.author}</p>
            <p>Genres: ${book.genres.join(', ')}</p>
            <p>Published Year: ${book.published_year}</p>
          </a>
        </div>
      `,
    )
    .join('');

  container.innerHTML = booksHTML;
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
        </div>
      `,
    )
    .join('');

  container.innerHTML = booksHTML;
}

// Visa adminlistan med redigeringsknapp
function renderAdminBooks(books, container) {
  const booksHTML = books
    .map(
      (book) => `
        <div class="book">
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Genres: ${book.genres.join(', ')}</p>
          <p>Published Year: ${book.published_year}</p>
   
        </div>
      `,
    )
    .join('');

  container.innerHTML = booksHTML;
}

// Hämta och visa böcker
async function displayBooks() {
  try {
    const books = await getBooks();

    renderBooks(books, bookListContainer);
    renderAdminBooks(books, adminBookListContainer);
  } catch (error) {
    console.error('Error displaying books:', error);

    bookListContainer.innerHTML =
      '<p class="error">Error loading books. Please try again later.</p>';

    adminBookListContainer.innerHTML =
      '<p class="error">Error loading books. Please try again later.</p>';
  }
}

displayBooks();
