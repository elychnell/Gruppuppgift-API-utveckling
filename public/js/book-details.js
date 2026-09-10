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

    bookImgContainer.innerHTML = `<img src="${bookDetails.image}" width="350" alt="${bookDetails.title}">`;
    bookDetailsContainer.innerHTML = `
        <h2>${bookDetails.title}</h2>
        <p>${bookDetails.description}</p>
        <p>Author: ${bookDetails.author}</p>
        <p>Genres: ${bookDetails.genres.join(', ')}</p>
        <p>Published Year: ${bookDetails.published_year}</p>
    `;
}

displayBookDetails();