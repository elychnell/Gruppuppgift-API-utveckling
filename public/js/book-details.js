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

const bookDetails = {
    title: "The Great Gatsby",
    description: "A novel set in the Roaring Twenties that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.",
    author: "F. Scott Fitzgerald",
    genres: ["Fiction", "Classic"],
    image: "the-great-gatsby.jpg",
    published_year: 1925
};

function displayBookDetails() {
    // TEST DATA bookId 
    const bookId = "6aa13597dd2d1b7f961b2597"; 
    // TEST DATA

    const bookDetailsContainer = document.getElementById('book-details');
    const bookImgContainer = document.getElementById('bookImg');
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
}

displayBookDetails();