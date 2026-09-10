/* 
Hämta enskild bok med tillhörande reviews, med GET: http://localhost:3000/api/books/:id 
*/

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('bookId');

async function displayBookDetails(bookId) {
const bookImgContainer = document.getElementById('bookImg');
const bookDetailsContainer = document.getElementById('bookDetails');
const reviewsContainer = document.getElementById('reviews');

    try {
       fetch(`http://localhost:3000/api/books/${bookId}`)
            .then(response => response.json())
            .then(data => {

                const genresHTML = data.genres
                .map(genre => `<span class="genre">${genre}</span>`)
                .join('');

                const reviewsHTML = data.reviews
                .map(review => `
                    <div class="review">
                    <p class="rating">Rating: <span class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span></p>
                    <p class="content">${review.content}</p>
                    <p class="rAuthor">Av: ${review.name}</p>
                    <p class="rDate">Skapad: ${new Date(review.created_at).toLocaleString("sv-SE", {dateStyle: "short", timeStyle: "short"})}</p>
                    </div>`).join('');

                bookImgContainer.innerHTML = `<img src="${data.image}" width="350" alt="${data.title}">`;
                bookDetailsContainer.innerHTML = `
                    <h2 class="title">${data.title}</h2>
                    <p class="description">${data.description}</p>
                    <p class="author">Author: ${data.author}</p>
                    <p class="genres">Genres: ${genresHTML}</p>
                    <p class="published_year">Published Year: ${data.published_year}</p>
                `;
                reviewsContainer.innerHTML = reviewsHTML;
            });
    } catch (error) {
        console.error('Error displaying book details:', error);
    }
   
}

displayBookDetails(bookId);

const reviewForm = document.getElementById('reviewForm');
reviewForm.addEventListener('submit', submitReview);

async function submitReview(event) {
    
    event.preventDefault();

    const reviewerName = document.getElementById('reviewerName').value;
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    
try {
    const response = await fetch(`http://localhost:3000/api/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: reviewerName,
            content: reviewText,
            rating: parseInt(rating),
            book_id: bookId
        })
    });
    const data = await response.json();
        if (response.ok) {
            displayBookDetails(bookId);
            console.log('Review submitted successfully:', data);
        }
} catch (error) {
    console.error('Error submitting review:', error);
}

}