/*
 * Book Details mock data
 * -  title: String 
 * -  description: String 
 * -  author: String 
 * -  genres: Array 
 * -  image: String 
 * -  published_year: Number
 */

 /* 
Hämta enskild bok med tillhörande reviews, med GET: http://localhost:3000/api/books/:id 
Skapa ny bok med POST: http://localhost:3000/api/books      (Token) 
Uppdatera befintlig bok med PATCH: http://localhost:3000/api/books/:id  (Token) 
Radera befintlig bok med DELETE: http://localhost:3000/api/books/:id  (Token)
*/

function displayBookDetails() {

const bookDetails = {
    title: "The Great Gatsby",
    description: "A novel set in the Roaring Twenties that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.",
    author: "F. Scott Fitzgerald",
    genres: ["Fiction", "Classic"],
    image: "../images/large-pics/book1-large.jpg",
    published_year: 1925
};


    /* TEST DATA bookId 
    //const bookId = "6aa13597dd2d1b7f961b2597"; 
    
    const bookImgContainer = document.getElementById('bookImg');
    const bookDetailsContainer = document.getElementById('book-details');
    try {
       fetch(`http://localhost:3000/api/books/${bookId}`)
            .then(response => response.json())
            .then(data => {
                bookImgContainer.innerHTML = `<img src="${data.image}" alt="${data.title}">`;
                bookDetailsContainer.innerHTML = `
                    <h2>${data.title}</h2>
                    <p>${data.description}</p>
                    <p>Author: ${data.author}</p>
                    <p>Genres: ${data.genres.join(', ')}</p>
                    <p>Published Year: ${data.published_year}</p>
                `;
            });
    } catch (error) {
        console.error('Error displaying book details:', error);
    }
    // TEST DATA  */

    const bookImgContainer = document.getElementById('bookImg');
    const bookDetailsContainer = document.getElementById('bookDetails');

    const genresHTML = bookDetails.genres
    .map(genre => `<span class="genre">${genre}</span>`)
    .join('');

    bookImgContainer.innerHTML = `<img src="${bookDetails.image}" width="350" alt="${bookDetails.title}">`;
    bookDetailsContainer.innerHTML = `
        <h2>${bookDetails.title}</h2>
        <p>${bookDetails.description}</p>
        <p>Author: ${bookDetails.author}</p>
        <p class="genres">Genres: ${genresHTML}</p>
        <p>Published Year: ${bookDetails.published_year}</p>
    `;
}

displayBookDetails();

function displayReviews() {

  const reviews = [
    {
        name: "John Doe",
        content: "A novel set in the Roaring Twenties that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.",
        rating: 5,
        created_at: "2023-06-15T10:30:00Z",
        book_id: "6aa13597dd2d1b7f961b2597"
    },
    {
        name: "Jane Smith",
        content: "A fascinating story with memorable characters and a great atmosphere.",
        rating: 4,
        created_at: "2023-07-20T14:15:00Z",
        book_id: "6aa13597dd2d1b7f961b2597"
    }
];


    /* TEST DATA bookId
    //const bookId = "6aa13597dd2d1b7f961b2597";
    try {
        const reviewsContainer = document.getElementById('reviews');
        const bookId = "6aa13597dd2d1b7f961b2597"; // Replace with the actual book ID
        fetch(`http://localhost:3000/api/books/${bookId}/reviews`)
            .then(response => response.json())
            .then(data => {
                const reviewsHTML = data.map(review => `
                    <div class="review">
                        <p>${review.text}</p>
                        <p>Rating: ${review.rating}</p>
                    </div>
                `).join('');
                reviewsContainer.innerHTML = reviewsHTML;
            });
    } catch (error) {
        console.error('Error displaying reviews:', error);
    }
    // TEST DATA  */

    const reviewsContainer = document.getElementById('reviews');
    const reviewsHTML = reviews.map(review => `
        <div class="review">
        <p class="rating">Rating: <span class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span></p>
        <p class="content">${review.content}</p>
        <p class="rAuthor">By: ${review.name}</p>
        <p class="rDate">Created at: ${review.created_at}</p>
        </div>
    `).join('');
    reviewsContainer.innerHTML = reviewsHTML;   
}

displayReviews();

const reviewForm = document.getElementById('reviewForm');
reviewForm.addEventListener('submit', submitReview);

async function submitReview(event) {
    
    event.preventDefault();

    const reviewerName = document.getElementById('reviewerName').value;
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');

    // http://localhost:3000/book-details.html?bookId=6aa13597dd2d1b7f961b2597
    //const bookId = "6aa13597dd2d1b7f961b2597"; // Replace with the actual book ID
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
            console.log('Review submitted successfully:', data);
        }
} catch (error) {
    console.error('Error submitting review:', error);
}

}