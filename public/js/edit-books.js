const editBookForm = document.getElementById('editBookForm');

const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');

console.log('Book ID:', bookId);

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
