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
      // Optionally, you can remove the deleted book from the DOM or refresh the list
      displayBooks(); // Refresh the book list after deletion
    } catch (error) {
      console.error(`Error deleting book with ID ${bookId}:`, error);
    }
  }
});
