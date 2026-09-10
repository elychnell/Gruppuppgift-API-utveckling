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
Hämta alla böcker med GET: http://localhost:3000/api/books 
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