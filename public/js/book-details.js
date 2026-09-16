import { checkAuthStatus, authStatusResult } from './auth.js';

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('bookId');

checkAuthStatus();

async function displayBookDetails(bookId) {
const bookImgContainer = document.getElementById('bookImg');
const bookDetailsContainer = document.getElementById('bookDetails');
const reviewsContainer = document.getElementById('reviews');

    try {
       await fetch(`http://localhost:3000/api/books/${bookId}`)
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
                    ${authStatusResult.is_admin ? `
                                <button class="editReview" onclick="editReview('${review._id}')">
                                    Edit
                                </button>
                                <button class="deleteReview" onclick="deleteReview('${review._id}')">
                                    Delete
                                </button>
                            ` : ''}
                    </div>`).join('');

                bookImgContainer.innerHTML = `<img src="${data.image}" width="350" alt="${data.title}">`;
                bookDetailsContainer.innerHTML = `
                <div class="detailsTop">
                    <h2 class="title">${data.title}</h2>
                    <a href="index.html" class="back-button">← Tillbaka</a>
                    </div>
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

async function deleteReview(reviewId) {
    console.log('Delete review with ID:', reviewId);
 
try {
    const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
        if (response.ok) {
            displayBookDetails(bookId);
            console.log('Review deleted successfully:', data);
        }
} catch (error) {
    console.error('Error deleting review:', error);
}


}

async function editReview(reviewId) {
    console.log('Edit review with ID:', reviewId);
    const dialog = document.createElement('dialog');

dialog.innerHTML = `
        <form id="editReviewForm">
            <h2>Redigera recension</h2>

            <label for="editReviewText">Recension:</label>
            <textarea id="editReviewText" required></textarea>

           <label>Betyg:</label>

            <div class="editRating">
            <input type="radio" id="editRating5" name="editRating" value="5">
            <label for="editRating5">★</label>

            <input type="radio" id="editRating4" name="editRating" value="4">
            <label for="editRating4">★</label>

            <input type="radio" id="editRating3" name="editRating" value="3">
            <label for="editRating3">★</label>

            <input type="radio" id="editRating2" name="editRating" value="2">
            <label for="editRating2">★</label>

            <input type="radio" id="editRating1" name="editRating" value="1">
            <label for="editRating1">★</label>
            </div>

            <button type="submit">Spara</button>
            <button type="button" id="cancelEdit">Avbryt</button>
        </form>
    `;
    document.body.appendChild(dialog);
    const editReviewText = dialog.querySelector('#editReviewText');
    const editRating = dialog.querySelectorAll('input[name="editRating"]');

try {
    const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`);
    const reviewData = await response.json();

    editReviewText.value = reviewData.content;
    editRating.forEach(input => {
    input.checked = parseInt(input.value) === reviewData.rating;
    });
} catch (error) {
    console.error('Error fetching review data:', error);
    return;
}

    dialog.showModal();
   
    const editReviewForm = dialog.querySelector('#editReviewForm');
    editReviewForm.addEventListener('submit', (event) => {
    updateReview(event, reviewId, dialog);
    });

    dialog.querySelector('#cancelEdit').addEventListener('click', () => {
        dialog.close();
    });

    dialog.addEventListener('close', () => {
        dialog.remove();
    });

}

async function updateReview(event,reviewId, dialog) {

        event.preventDefault();
        const updatedContent = dialog.querySelector('#editReviewText').value;
        const updatedRating = dialog.querySelector('input[name="editRating"]:checked').value;
    try {
        const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {

            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: updatedContent,
                rating: parseInt(updatedRating)
            })
        });
        const data = await response.json();
        if (response.ok) {
            dialog.close();
            displayBookDetails(bookId);
            console.log('Review updated successfully:', data);
        }
    } catch (error) {
        console.error('Error updating review:', error);
    }
}

window.deleteReview = deleteReview;
window.editReview = editReview;