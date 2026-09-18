// Delete a book by its ID
async function deleteBook(bookId) {
  const response = await fetch(`/api/books/${bookId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

document.addEventListener('click', async (event) => {
  if (event.target && event.target.classList.contains('delete-btn')) {
    const bookId = event.target.getAttribute('data-book-id');

    // Show a confirmation dialog before deleting the book
    const confirmation = confirm(
      'Are you sure you want to delete this book? This action cannot be undone.',
    );

    if (!confirmation) {
      console.log('Book deletion canceled.');
      return;
    }

    try {
      // Delete the book and update the admin book list
      await deleteBook(bookId);

      console.log(`Book with ID ${bookId} deleted successfully.`);

      showDeleteConfirmation();

      displayBooksToAdmin();
    } catch (error) {
      console.error(`Error deleting book with ID ${bookId}:`, error);
    }
  }
});

function showDeleteConfirmation() {
  alert('Book deleted successfully.');
}
