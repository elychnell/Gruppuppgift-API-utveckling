const createBookForm = document.getElementById('createBookForm');

// Skapa en ny bok
async function createBook(bookData) {
  const response = await fetch('http://localhost:4000/api/books', {
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
    genres: document.getElementById('genres').value.split(','),
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

  // Clear the form after submission
  createBookForm.reset();
});
