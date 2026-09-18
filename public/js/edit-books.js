const editBookForm = document.getElementById('editBookForm');

const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');

console.log('Book ID:', bookId);

if (!bookId) {
  console.error('No book ID found in URL');
}

// Fetch book details by ID
async function getBookById(bookId) {
  if (!bookId) {
    throw new Error('No book ID provided');
  }

  const response = await fetch(`/api/books/${bookId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return data;
}

// Edit a book
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

// Populate the form with the book details
async function populateForm() {
  try {
    const book = await getBookById(bookId);

    document.getElementById('edit-image').value = book.image;
    document.getElementById('edit-thumbnail').value = book.thumbnail;
    document.getElementById('edit-title').value = book.title;
    document.getElementById('edit-description').value = book.description;
    document.getElementById('edit-author').value = book.author;
    document.getElementById('edit-genres').value = book.genres.join(', ');
    document.getElementById('edit-published_year').value = book.published_year;
  } catch (error) {
    console.error('Error populating form:', error);
  }
}

// Save the edited book
editBookForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const updatedBook = {
    image: document.getElementById('edit-image').value,
    thumbnail: document.getElementById('edit-thumbnail').value,
    title: document.getElementById('edit-title').value,
    description: document.getElementById('edit-description').value,
    author: document.getElementById('edit-author').value,
    genres: document
      .getElementById('edit-genres')
      .value.split(',')
      .map((genre) => genre.trim()),
    published_year: parseInt(
      document.getElementById('edit-published_year').value,
    ),
  };

  try {
    await editBook(bookId, updatedBook);

    console.log(`Book with ID ${bookId} updated successfully.`);

    window.location.href = 'admin-books.html';
  } catch (error) {
    console.error('Error updating book:', error);
  }
});
//Bring back user to admin-books.html after clicking cancel button
const cancelButton = document.getElementById('cancel-edit');

cancelButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'admin-books.html';
});

populateForm();
