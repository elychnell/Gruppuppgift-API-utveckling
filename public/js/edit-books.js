const editBookForm = document.getElementById('editBookForm');

const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');

console.log('Book ID:', bookId);

// Fetch book details by ID
async function getBookById(bookId) {
  const response = await fetch(`/api/books/${bookId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const book = await response.json();

  return book;
}

// Populate the form with the book details
async function populateForm() {
  try {
    const book = await getBookById(bookId);

    document.getElementById('edit-thumbnail').value = book.thumbnail;
    document.getElementById('edit-image').value = book.image;
    document.getElementById('edit-title').value = book.title;
    document.getElementById('edit-description').value = book.description;
    document.getElementById('edit-author').value = book.author;
    document.getElementById('edit-genres').value = book.genres.join(', ');
    document.getElementById('edit-published_year').value = book.published_year;
  } catch (error) {
    console.error('Error populating form:', error);
  }
}

// Call the function to populate the form when the page loads
populateForm();
