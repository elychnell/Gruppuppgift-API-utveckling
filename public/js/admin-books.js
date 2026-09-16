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
           
        <button
            class="btn btn-primary edit-button"
            data-book-id="${book.id}"
          >
            edit
          </button>
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

// EDIT BOOK

async function editBook(bookId, updatedBook) {
  const response = await fetch(`/api/books/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedBook),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// When Edit button is clicked
document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('edit-button')) {
    const bookId = event.target.getAttribute('data-book-id');

    try {
      const books = await getBooks();

      const book = books.find((book) => book.id === bookId);

      if (!book) {
        throw new Error('Book not found');
      }

      document.getElementById('edit-book-id').value = book.id;
      document.getElementById('edit-title').value = book.title;
      document.getElementById('edit-author').value = book.author;
      document.getElementById('edit-description').value = book.description;
      document.getElementById('edit-genres').value = book.genres.join(', ');
      document.getElementById('edit-published-year').value =
        book.published_year;

      document.getElementById('edit-book-section').style.display = 'block';
    } catch (error) {
      console.error('Error loading book for editing:', error);
    }
  }
});

// When Save changes is clicked
document
  .getElementById('edit-book-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const bookId = document.getElementById('edit-book-id').value;

    const updatedBook = {
      title: document.getElementById('edit-title').value,
      author: document.getElementById('edit-author').value,
      description: document.getElementById('edit-description').value,
      genres: document
        .getElementById('edit-genres')
        .value.split(',')
        .map((genre) => genre.trim()),
      published_year: Number(
        document.getElementById('edit-published-year').value,
      ),
    };

    try {
      await editBook(bookId, updatedBook);

      console.log(`Book with ID ${bookId} edited successfully.`);

      document.getElementById('edit-book-section').style.display = 'none';

      await displayBooksToAdmin();
    } catch (error) {
      console.error(`Error editing book with ID ${bookId}:`, error);
    }
  });

// Cancel editing
document.getElementById('cancel-edit').addEventListener('click', () => {
  document.getElementById('edit-book-section').style.display = 'none';
});
