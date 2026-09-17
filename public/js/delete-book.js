// function to delete a book with a given bookId
async function deleteBook(bookId) {
  const response = await fetch(`/api/books/${bookId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Event listener for delete buttons
document.addEventListener('click', async (event) => {
  if (event.target && event.target.id === 'deleteButton') {
    const bookId = event.target.getAttribute('data-book-id');

    try {
      await deleteBook(bookId);
      console.log(`Book with ID ${bookId} deleted successfully.`);

      displayBooksToAdmin(); // Refresh the admin book list after deletion

      // Refresh the public book list after deletion without having to reload the page
      try {
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        renderBooks(books, bookListContainer);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    } catch (error) {
      console.error(`Error deleting book with ID ${bookId}:`, error);
    }
  }
});
