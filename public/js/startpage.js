const bookListContainer = document.getElementById('bookList');

// Hämta böcker från API
async function getBooks() {
  const response = await fetch('/api/books');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const books = await response.json();

  return books;
}

// Visa vanliga boklistan
function renderBooks(books, container) {
  const booksHTML = books
    .map(
      (book) => {
        const genresHTML = book.genres
          .map(genre => `<span class="genre">${genre}</span>`)
          .join('');

        const reviews = book.reviews || [];
        console.log(book.title, book.reviews);
        let totalRating = 0;

        for (const review of reviews) {
        totalRating += review.rating;
        }

        const averageRating = reviews.length > 0
        ? Math.round(totalRating / reviews.length)
        : 0;

        const ratingHTML = reviews.length > 0
        ? `<p class="rating">Rating: <span class="stars">${'★'.repeat(averageRating)}${'☆'.repeat(5 - averageRating)}</span></p>`
        : '';

        return `
          <div class="book">
            <a href="book-details.html?bookId=${book.id}">
              <img src="${book.image}" alt="${book.title}" width="300">
              <div class="bookInfo">
                <h2>${book.title}</h2>
                <p>${book.description}</p>
                <div class="genres">
                  ${genresHTML}
                </div>
                ${ratingHTML}
              </div>
            </a>
          </div>
        `;
      },
    )
    .join('');

  container.innerHTML = booksHTML;
}

// Hämta och visa böcker
async function displayBooks() {
  try {
    const books = await getBooks();

    renderBooks(books, bookListContainer);
  } catch (error) {
    console.error('Error displaying books:', error);

    bookListContainer.innerHTML =
      '<p class="error">Error loading books. Please try again later.</p>';
  }
}

displayBooks();