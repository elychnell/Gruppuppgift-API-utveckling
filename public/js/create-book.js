const createBookForm = document.getElementById('createBookForm');

// Skapa en ny bok
async function createBook(bookData) {
  const response = await fetch('http://localhost:3000/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const newBook = await response.json();

  return newBook;
}

// Hantera formulärinlämning
createBookForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const bookData = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    author: document.getElementById('author').value,
    genres: document
      .getElementById('genres')
      .value.split(',')
      .map((genre) => genre.trim()),
    published_year: parseInt(document.getElementById('published_year').value),
    image: document.getElementById('image').value,
    thumbnail: document.getElementById('thumbnail').value,
  };

  try {
    const newBook = await createBook(bookData);
    console.log('New book created:', newBook);
  } catch (error) {
    console.error('Error creating book:', error);
  }

  //update the book list after creating a new book
  try {
    const response = await fetch('http://localhost:3000/api/books');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const books = await response.json();
    renderAdminBooks(books, adminBookListContainer);
  } catch (error) {
    console.error('Error fetching books:', error);
  }

  //Show success message
  const successMessage = document.createElement('p');
  successMessage.textContent = 'Book created successfully!';
  successMessage.classList.add('success-message');
  createBookForm.appendChild(successMessage);

  // Remove the success message after 3 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 3000);

  // Clear the form after submission
  createBookForm.reset();
});
