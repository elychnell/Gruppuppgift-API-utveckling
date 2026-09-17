// Raderar en bok med ett angivet bookId
async function deleteBook(bookId) {
  const response = await fetch(`/api/books/${bookId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Event listener för delete-knapparna
document.addEventListener('click', async (event) => {
  if (event.target && event.target.classList.contains('delete-btn')) {
    const bookId = event.target.getAttribute('data-book-id');

    // Fråga användaren om bekräftelse innan boken raderas
    const confirmation = confirm(
      'Are you sure you want to delete this book? This action cannot be undone.',
    );

    if (!confirmation) {
      console.log('Book deletion canceled.');
      return;
    }

    try {
      // Radera boken
      await deleteBook(bookId);

      console.log(`Book with ID ${bookId} deleted successfully.`);

      // Visa bekräftelse efter att boken har raderats
      showDeleteConfirmation();

      // Uppdatera admin-boklistan
      displayBooksToAdmin();
    } catch (error) {
      console.error(`Error deleting book with ID ${bookId}:`, error);
    }
  }
});

// Visar en bekräftelseruta efter att boken har raderats
function showDeleteConfirmation() {
  alert('Book deleted successfully.');
}

