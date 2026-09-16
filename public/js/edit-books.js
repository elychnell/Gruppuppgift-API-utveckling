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

// Event listener for edit buttons
document.addEventListener('click', async (event) => {
  if (event.target && event.target.id === 'editButton') {
    const bookId = event.target.getAttribute('data-book-id');

    try {
      await editBook(bookId, {
        title: 'Ny titel',
        author: 'Ny författare',
        description: 'Ny beskrivning',
        genres: ['Fantasy', 'Adventure'],
        published_year: 2025,
      });

      console.log(`Book with ID ${bookId} edited successfully.`);

      displayBooksToAdmin();
      displayBooks();
    } catch (error) {
      console.error(`Error editing book with ID ${bookId}:`, error);
    }
  }
});
